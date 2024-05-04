import { init } from "@src/core";
import { CoreActions } from "@src/core/coreMessaging";
import { isMyMessage, MyActions, MyMessageTypes } from "@src/messaging";

// Wrapped in an IIFE to avoid contaminating host site
(function contentScript() {
  const myContentListener: unknown = (message: any) => {
    if (!isMyMessage(message)) {
      return;
    }
    switch (message.type) {
      case MyMessageTypes.ECHO:
        // Typically, web extension APIs return Promises
        console.log("Received ECHO from the background script!", message);
        return new Promise((resolve) => {
          resolve("ok");
        });
      default:
        break;
    }
    return false;
  };

  CoreActions.optionsGet().then((options) => {
    console.log("Hello from the content script!");
    console.log("Options: ", options);

    // Receive from background
    init([myContentListener]);

    // Dispatch to background
    MyActions.echo(JSON.stringify(options))
      .then((fooResult) => {
        console.log("Received return value from the background:", fooResult);
      })
      .catch(console.error);
  });
})();
