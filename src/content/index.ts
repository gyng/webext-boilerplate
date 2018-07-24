import { CoreActions } from "@src/core/messaging";
import { MyActions } from "@src/listeners";

// Wrapped in an IIFE to avoid contaminating host site
(function contentScript() {
  CoreActions.optionsGet().then(options => {
    console.log("Hello from the content script!"); // tslint:disable-line: no-console
    console.log("Options: ", options); // tslint:disable-line: no-console

    MyActions.foo("bar").then(fooResult => {
      console.log("From custom action foo:", fooResult); // tslint:disable-line:no-console
    });
  });
})();
