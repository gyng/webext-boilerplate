// tslint:disable:no-console

import { IMessage, Listener } from "@src/core/messaging";

export enum MyMessageTypes {
  FOO = "FOO"
}

export interface IMyMessage extends IMessage {
  type: MyMessageTypes;
}

const myBackgroundListener: Listener = (requestObj, sender) => {
  const request = requestObj as IMyMessage;

  switch (request.type) {
    case MyMessageTypes.FOO:
      console.log(
        "Received a message from background or content script!",
        request
      );
      // Typically, web extension APIs return Promises
      return new Promise((resolve, reject) => resolve(request.body.value));
    default:
      break;
  }

  return false;
};

export const myListeners = [myBackgroundListener];

export const MyActions = {
  foo: (value: string) =>
    browser.runtime.sendMessage({
      body: {
        value
      },
      type: MyMessageTypes.FOO
    }),
  toCurrentTab: (value: string) =>
    browser.tabs.query({ currentWindow: true }).then(tabs => {
      tabs.forEach(t => {
        browser.tabs.sendMessage((t && t.id) || 0, {
          body: {
            value: t.id
          },
          type: MyMessageTypes.FOO
        });
      });
    })
};
