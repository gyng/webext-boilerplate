import { init } from "@src/core";
import { CoreActions } from "@src/core/messaging";

import { getBrowser } from "@src/core/browser-detector";
import { myListeners } from "@src/listeners";

// Load up additional, non-core onMessage listeners
init(myListeners);

console.log("Hello from the background script!"); // tslint:disable-line:no-console

CoreActions.optionsGet().then(options => {
  console.log("Loaded options:", options); // tslint:disable-line:no-console
});

getBrowser().then(browser => {
  console.log(`Detected browser: ${browser}`); // tslint:disable-line:no-console
});
