import {
  loadOptions,
  getKeys
} from "@src/core/options";
import { reset } from "@src/core";
import { schema, OptionType } from "@src/schema";

export enum MessageType {
  OPTIONS_GET = "OPTIONS_GET",
  OPTIONS_SCHEMA = "OPTIONS_SCHEMA",
  OPTIONS_UPDATE = "OPTIONS_UPDATE",
  OPTIONS_UPDATED = "OPTIONS_UPDATED",
  OPTIONS_RESET = "OPTIONS_RESET",
  RELOAD = "RELOAD"
}

export interface IMessage {
  type: MessageType;
  body: {
    [k: string]: any;
  };
}

export interface IMessageOptionsSchema extends IMessage {
  type: MessageType.OPTIONS_SCHEMA;
  body: {
    schema: typeof schema;
    types: OptionType;
  };
}

export type RootMessage = IMessageOptionsSchema;

export const Actions = {
  optionsUpdate: (newValues: Partial<{ [k: string]: any }>) => {
    return browser.runtime.sendMessage({
      type: MessageType.OPTIONS_UPDATE,
      body: {
        newValues
      }
    });
  },
  optionsGet: () => {
    return browser.runtime.sendMessage({
      type: MessageType.OPTIONS_GET
    });
  },
  optionKeysGet: () => {
    return () => Object.keys(schema);
  },
  optionsReset: () => {
    return browser.runtime.sendMessage({
      type: MessageType.OPTIONS_RESET
    });
  }
};

export const Emit = {
  optionsUpdated: () =>
    loadOptions.then(options => {
      browser.runtime.sendMessage({
        type: MessageType.OPTIONS_UPDATED,
        body: { options }
      });
    })
};

export type Listener = (
  requestObj: object,
  sender: browser.runtime.MessageSender,
  sendResponse: any
) => boolean | void;

const optionsListener: Listener = (requestObj, sender, sendResponse) => {
  const request = requestObj as IMessage;

  switch (request.type) {
    case MessageType.OPTIONS_UPDATE:
      browser.storage.local
        .set(request.body.newValues)
        .then(Emit.optionsUpdated);
      break; // see if this breawks instead of return true
    case MessageType.OPTIONS_GET:
      browser.storage.local.get(getKeys()).then(val => sendResponse(val));
      return true;
    case MessageType.OPTIONS_RESET:
      browser.storage.local.clear().then(Emit.optionsUpdated);
      break;
    case MessageType.RELOAD:
      reset();
      break;
    default:
      break;
  }

  return false;
};

export const listen = () => {
  browser.runtime.onMessage.addListener(optionsListener);
};

export const stop = () => {
  browser.runtime.onMessage.removeListener(optionsListener);
};
