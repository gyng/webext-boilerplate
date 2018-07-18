import {
  OptionSchema,
  OptionType,
  loadOptions,
  getKeys
} from "@src/background/core/options";
import { reset } from "@src/background/core";

export enum MessageType {
  OPTIONS_GET = "OPTIONS_GET",
  OPTIONS_SCHEMA = "OPTIONS_SCHEMA",
  OPTIONS_UPDATE = "OPTIONS_UPDATE",
  OPTIONS_UPDATED = "OPTIONS_UPDATED",
  RELOAD = "RELOAD",
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
    schema: typeof OptionSchema;
    types: OptionType;
  };
}

export type RootMessage = IMessageOptionsSchema;

export const actions = {
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
    return () => Object.keys(OptionSchema);
  }
};

export const emit = {
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
        .then(emit.optionsUpdated);
      return true;
    case MessageType.OPTIONS_GET:
      browser.storage.local.get(getKeys()).then(val => sendResponse(val));
      return true;
    case MessageType.RELOAD:
      reset();
      return true;
    default:
      return true;
  }
};

export const listen = () => {
  browser.runtime.onMessage.addListener(optionsListener);
};

export const stop = () => {
  browser.runtime.onMessage.removeListener(optionsListener);
};
