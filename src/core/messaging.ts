import { reset } from "@src/core";
import { getKeys, IOptions, loadOptions } from "@src/core/options";
import { schema } from "@src/schema";

export enum CoreMessageType {
  OPTIONS_UPDATE = "OPTIONS_UPDATE",
  OPTIONS_UPDATED = "OPTIONS_UPDATED",
  OPTIONS_RESET = "OPTIONS_RESET",
  RELOAD = "RELOAD"
}

export interface IMessage {
  type: string; // Generic, users can extend from this
  body: {
    [k: string]: any;
  };
}

export interface ICoreMessage extends IMessage {
  type: CoreMessageType;
}

export const CoreActions = {
  optionKeysGet: (sch = schema) => {
    return () => Object.keys(sch);
  },
  optionsGet: (sch = schema) => {
    const keys = getKeys(sch);

    // Need to fill out options in storage with defaults if the key is undefined
    const defaults: IOptions = keys.reduce(
      (acc, k) => ({ ...acc, [k]: sch[k].default }),
      {}
    );

    return browser.storage.local
      .get(keys)
      .then(opts => ({ ...defaults, ...(opts as IOptions) }));
  },
  optionsReset: () => {
    return browser.runtime.sendMessage({
      type: CoreMessageType.OPTIONS_RESET
    });
  },
  optionsUpdate: (newValues: IOptions) => {
    return browser.runtime.sendMessage({
      body: {
        newValues
      },
      type: CoreMessageType.OPTIONS_UPDATE
    });
  }
};

export const Emit = {
  optionsUpdated: () =>
    loadOptions(schema).then(options => {
      browser.runtime.sendMessage({
        body: { options },
        type: CoreMessageType.OPTIONS_UPDATED
      });
    })
};

export type Listener = (
  requestObj: object,
  sender: browser.runtime.MessageSender,
  sendResponse: any
) => boolean | void | Promise<any>;

const optionsListener: Listener = (requestObj, sender) => {
  const request = requestObj as ICoreMessage;

  switch (request.type) {
    case CoreMessageType.OPTIONS_UPDATE:
      Object.keys(request.body.newValues).forEach(key => {
        if (!Object.keys(schema).includes(key)) {
          // tslint:disable-next-line
          console.warn(`Setting option "${key}", but it is not in the schema!`);
        }
      });

      return browser.storage.local
        .set(request.body.newValues)
        .then(Emit.optionsUpdated);
    case CoreMessageType.OPTIONS_RESET:
      return browser.storage.local.clear().then(Emit.optionsUpdated);
    case CoreMessageType.RELOAD:
      reset();
      break;
    default:
      break;
  }
};

export let listeners: Listener[] = [optionsListener];

export const registerListener = (l: Listener) => {
  listeners.push(l);
};

export const unregisterListener = (toRemove: Listener) => {
  listeners = listeners.filter(l => l !== toRemove);
};

export const clearListeners = () => {
  listeners = [optionsListener];
};

export const listen = () => {
  listeners.forEach(l => {
    browser.runtime.onMessage.removeListener(l);
    browser.runtime.onMessage.addListener(l);
  });
};

export const stop = () => {
  listeners.forEach(l => {
    browser.runtime.onMessage.removeListener(l);
  });
};
