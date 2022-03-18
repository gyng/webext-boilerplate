import { init } from "@src/core";
import { CoreActions } from "@src/core/messaging";
import { isMyMessage, MyActions, MyMessageTypes } from "@src/messaging";

// Wrapped in an IIFE to avoid contaminating host site
(function contentScript() {
  const myContentListener: browser.runtime.onMessageVoid = (request) => {
    if (!isMyMessage(request)) {
      return;
    }
    switch (request.type) {
      case MyMessageTypes.ECHO:
        // Typically, web extension APIs return Promises
        console.log("Received a message from the background script!", request);
        break;
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
    MyActions.foo("bar").then((fooResult) => {
      console.log("Received return value from the background:", fooResult);
    });
  });
})();
