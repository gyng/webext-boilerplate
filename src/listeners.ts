import { IMessage, Listener } from "@src/core/messaging";

enum MyMessageTypes {
  FOO = "FOO"
}

interface IMyMessage extends IMessage {
  type: MyMessageTypes;
}

const myListener: Listener = (requestObj, sender) => {
  const request = requestObj as IMyMessage;

  switch (request.type) {
    case MyMessageTypes.FOO:
      // Typically, web extension APIs return Promises
      return new Promise((resolve, reject) => resolve(request.body.value));
    default:
      break;
  }

  return false;
};

export const myListeners = [myListener];

export const MyActions = {
  foo: (value: string) =>
    browser.runtime.sendMessage({
      body: {
        value
      },
      type: MyMessageTypes.FOO
    })
};
