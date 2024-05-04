import browser from "webextension-polyfill";

import { reset } from "@src/core";
import {
  loadOptions,
  OptionKV,
  resetOptions,
  saveOptions,
} from "@src/core/options";
import { Options } from "@src/schema";

export enum CoreMessageType {
  OPTIONS_UPDATE_REQUEST = "OPTIONS_UPDATE_REQUEST",
  OPTIONS_UPDATE_SUCCESS = "OPTIONS_UPDATE_SUCCESS",
  EXTENSION_RELOAD_REQUEST = "EXTENSION_RELOAD_REQUEST",
}

export type MessageBase = {
  id: string;
  extid: string;
  timestamp: number;
  /** postMessage/sendMessage can only pass clonable objects around */
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities#data_cloning_algorithm
};

export type CoreMessageSchema =
  | {
      type: CoreMessageType.OPTIONS_UPDATE_REQUEST;
      body: { newValues: OptionKV };
    }
  | {
      type: CoreMessageType.EXTENSION_RELOAD_REQUEST;
      body: null;
    }
  | {
      type: CoreMessageType.OPTIONS_UPDATE_SUCCESS;
      body: { options: Options };
    };

export type Message = CoreMessageSchema & MessageBase;

export const makeMessage = (
  opts: CoreMessageSchema & Partial<MessageBase>,
  replyingTo?: MessageBase
): Message => {
  return {
    type: opts.type,
    body: JSON.parse(JSON.stringify(opts.body)),
    id: opts?.id ?? replyingTo?.id ?? crypto.randomUUID(),
    extid: opts?.extid ?? browser.runtime.id,
    timestamp: Date.now(),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMessage(obj: any): obj is Message {
  return obj.type != null && obj.id != null && obj.timestamp != null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isOwnMessage(obj: any): obj is Message {
  return isMessage(obj) && obj.extid === browser.runtime.id;
}

export const CoreActions = {
  optionKeysGet: (sch = new Options()) => {
    return () => Object.keys(sch);
  },
  optionsGet: (sch = new Options()) => {
    return loadOptions(sch);
  },
  optionsUpdated: (sch = new Options()) =>
    loadOptions(sch).then((options) => {
      browser.runtime.sendMessage(
        makeMessage({
          type: CoreMessageType.OPTIONS_UPDATE_SUCCESS,
          body: { options },
        })
      );
    }),
  optionsReset: () => {
    return resetOptions().then(() => {
      browser.runtime.sendMessage(
        makeMessage({
          type: CoreMessageType.EXTENSION_RELOAD_REQUEST,
          body: null,
        })
      );
    });
  },
  optionsUpdate: (newValues: OptionKV) => {
    saveOptions(newValues).then(() => {
      browser.runtime.sendMessage(
        makeMessage({
          type: CoreMessageType.OPTIONS_UPDATE_REQUEST,
          body: { newValues },
        })
      );
    });
  },
};

export type Listener = any;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const optionsListener: unknown = (
  request: object
  // sender: browser.runtime.MessageSender,
  // sendResponse: (response: object) => boolean | Promise<void> | void
) => {
  if (!isOwnMessage(request)) {
    return;
  }

  switch (request.type) {
    case CoreMessageType.OPTIONS_UPDATE_REQUEST:
      return saveOptions(request.body.newValues)
        .then(() => {
          CoreActions.optionsUpdated();
        })
        .catch(console.error);
    case CoreMessageType.OPTIONS_UPDATE_SUCCESS:
      return browser.storage.local
        .clear()
        .then(() => CoreActions.optionsUpdated);
    case CoreMessageType.EXTENSION_RELOAD_REQUEST:
      reset();
      break;
    default:
      break;
  }
};

const coreListeners = [optionsListener];
export let listeners: Listener[] = coreListeners;

export const registerListener = (l: Listener) => {
  listeners.push(l);
};

export const unregisterListener = (toRemove: Listener) => {
  listeners = listeners.filter((l) => l !== toRemove);
};

export const clearListeners = () => {
  listeners = coreListeners;
};

export const listen = () => {
  listeners.forEach((l) => {
    browser.runtime.onMessage.removeListener(l);
    browser.runtime.onMessage.addListener(l);
  });
};

export const stop = () => {
  listeners.forEach((l) => {
    browser.runtime.onMessage.removeListener(l);
  });
};
