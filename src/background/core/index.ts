import * as messaging from "./messaging.js";
import * as options from "./options.js";

export const init = () => {
  messaging.listen();
  options.loadOptions();
}

// Add any additional deregistration/cleanup needed here
export const reset = () => {
  browser.contextMenus.removeAll().then(() => {
    messaging.stop();
    init();
  });
}
