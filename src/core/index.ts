import * as messaging from "@src/core/messaging";

export const init = () => {
  messaging.listen();
};

// Add any additional deregistration/cleanup needed here
export const reset = () => {
  if (browser.contextMenus) {
    browser.contextMenus.removeAll().then(() => {
      messaging.stop();
      init();
    });
  } else {
    messaging.stop();
    init();
  }
};
