import { init } from "@src/core";
import { CoreActions, Listener } from "@src/core/messaging";
import { IMyMessage, MyActions, MyMessageTypes } from "@src/messaging";

// Wrapped in an IIFE to avoid contaminating host site
(function contentScript() {
  const myContentListener: Listener = (requestObj, sender) => {
    const request = requestObj as IMyMessage;

    switch (request.type) {
      case MyMessageTypes.FOO:
        // Typically, web extension APIs return Promises
        console.log("Received a message from the background script!", request); // tslint:disable-line: no-console
      default:
        break;
    }

    return false;
  };

  CoreActions.optionsGet().then(options => {
    console.log("Hello from the content script!"); // tslint:disable-line: no-console
    console.log("Options: ", options); // tslint:disable-line: no-console

    // Receive from background
    init([myContentListener]);

    // Dispatch to background
    MyActions.foo("bar").then(fooResult => {
      console.log("Received return value from the background:", fooResult); // tslint:disable-line:no-console
    });
  });
})();
