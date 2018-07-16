import { OPTION_KEYS, OptionType, options } from "./options.js";
import { reset } from "./index";

export enum MessageType {
  OPTIONS = "OPTIONS",
  OPTIONS_SCHEMA = "OPTIONS_SCHEMA",
  RELOAD = "RELOAD",
  FOO = "FOO"
}

export interface IMessage {
  type: MessageType;
  body: {
    [k: string]: any;
  };
}

export interface IMessageOptions extends IMessage {
  type: MessageType.OPTIONS,
  body: typeof options
}

export interface IMessageOptionsSchema extends IMessage {
  type: MessageType.OPTIONS_SCHEMA,
  body: {
    keys: typeof OPTION_KEYS,
    types: OptionType
  }
}

export type RootMessage = IMessageOptions | IMessageOptionsSchema;

export const emit = {
  foo: (value: any) => {
    browser.runtime.sendMessage({
      type: MessageType.FOO,
      body: { value }
    });
  }
};

const listener = (
  requestObj: object,
  sender: browser.runtime.MessageSender,
  sendResponse: any
) => {
  const request = requestObj as IMessage;

  switch (request.type) {
    case MessageType.OPTIONS:
      sendResponse({
        type: MessageType.OPTIONS,
        body: options
      });
      break;
    case MessageType.OPTIONS_SCHEMA:
      sendResponse({
        type: MessageType.OPTIONS_SCHEMA,
        body: {
          keys: OPTION_KEYS,
          types: OptionType
        }
      });
      break;
    case MessageType.RELOAD:
      reset();
      break;
    default:
      break; // noop
  }
};

export const listen = () => browser.runtime.onMessage.addListener(listener);
export const stop = () => browser.runtime.onMessage.removeListener(listener);
