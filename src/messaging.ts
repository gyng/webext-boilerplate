import browser from "webextension-polyfill";

import { isOwnMessage, MessageBase } from "@src/core/coreMessaging";

export enum MyMessageTypes {
  ECHO = "ECHO",
  FOO = "FOO",
}

export type MyMessageSchema =
  | {
      type: MyMessageTypes.ECHO;
      body: { value: string };
    }
  | {
      type: MyMessageTypes.FOO;
      body: { baz: number };
    };

export type MyMessage = MessageBase & MyMessageSchema;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMyMessage(request: any): request is MyMessage {
  return isOwnMessage(request);
}

export const makeMyMessage = (
  opts: MyMessageSchema & Partial<MessageBase>,
  replyingTo?: MessageBase,
): MyMessage => {
  return {
    type: opts.type,
    body: JSON.parse(JSON.stringify(opts.body)),
    id: opts?.id ?? replyingTo?.id ?? crypto.randomUUID(),
    extid: opts?.extid ?? browser.runtime.id,
    timestamp: Date.now(),
  } as MyMessage;
};

export const myBackgroundListener: unknown = (message: object) => {
  if (!isMyMessage(message)) {
    return;
  }

  switch (message.type) {
    case MyMessageTypes.ECHO:
      console.log("In background script: Received a message!", message);
      // Typically, web extension APIs return Promises
      return new Promise((resolve) => resolve(message.body.value));
    default:
      break;
  }

  return false;
};

export const myListeners = [myBackgroundListener];

export const MyActions = {
  echo: (value: string) =>
    browser.runtime.sendMessage(
      makeMyMessage({ type: MyMessageTypes.ECHO, body: { value } }),
    ),
  toCurrentTab: (message: string) =>
    browser.tabs.query({ currentWindow: true }).then((tabs) => {
      tabs.forEach((t) => {
        browser.tabs.sendMessage(
          t?.id ?? 0,
          makeMyMessage({
            type: MyMessageTypes.ECHO,
            body: { value: message },
          }),
        );
      });
    }),
};
