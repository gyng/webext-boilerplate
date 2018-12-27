// tslint:disable:no-console

import { init } from "@src/core";
import { CoreActions } from "@src/core/messaging";

import { getBrowser } from "@src/core/browser-detector";
import { MyActions, myListeners } from "@src/messaging";

// Load up additional, non-core onMessage listeners
init(myListeners);

console.log("Hello from the background script!");

CoreActions.optionsGet()
  .then(options => {
    // This sends a message to the content script
    const exampleLocaleMessage = browser.i18n.getMessage("oFoo");
    browser.menus.create({
      contexts: ["all"],
      onclick: () => {
        console.log("Clicked menu item");
        MyActions.toCurrentTab("Message from the background script!")
          .then(() => {
            console.log("Message sent");
          })
          .catch(console.error);
      },
      title: `Send a message to the content script ${exampleLocaleMessage}`
    });

    console.log("Loaded options:", options);
  })
  .catch(e => {
    console.error(e);
  });

getBrowser()
  .then(browser => {
    console.log(`Detected browser: ${browser}`);
  })
  .catch(e => {
    console.error(e);
  });
