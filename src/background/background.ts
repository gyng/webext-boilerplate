import browser from "webextension-polyfill";

import { init } from "@src/core";
import { CoreActions } from "@src/core/coreMessaging";

import { getBrowser } from "@src/core/browser-detector";
import { MyActions, myListeners } from "@src/messaging";

// Load up additional, non-core onMessage listeners
init(myListeners);

console.log("Hello from the background script!");

browser.runtime.onInstalled.addListener(() => {
  CoreActions.optionsGet()
    .then((options) => {
      console.log("Background script loaded options", options);

      // This sends a message to the content script
      const exampleLocaleMessage = browser.i18n.getMessage("oFoo");

      browser.contextMenus.create({
        contexts: ["all"],
        id: "oFoo",
        title: `Send a message to the content script ${exampleLocaleMessage}`,
      });
      browser.contextMenus.onClicked.addListener((info) => {
        console.log("Clicked menu item", info);
        MyActions.toCurrentTab("Message from the background script!")
          .then(() => {
            console.log("Message sent");
          })
          .catch(console.error);
      });

      console.log("Loaded options:", options);
    })
    .catch((e) => {
      console.error(e);
    });
});

getBrowser()
  .then((browser) => {
    console.log(`Detected browser: ${browser}`);
  })
  .catch((e) => {
    console.error(e);
  });
