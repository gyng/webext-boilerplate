import browser from "webextension-polyfill";

import {
  clearListeners,
  listen,
  Listener,
  listeners,
  registerListener,
  stop,
} from "@src/core/coreMessaging";

export const init = (additionalListeners?: Listener[]) => {
  if (additionalListeners) {
    additionalListeners.forEach((l) => registerListener(l));
  }

  listen();
};

// Add any additional deregistration/cleanup needed here
export const reset = (additionalListeners: Listener[] = listeners) => {
  // Only needed for browser.menus: use browser.contextMenus for MV3
  // TODO: browser.menus handling can be removed when fully on MV3
  if (browser.menus) {
    browser.menus.removeAll().then(() => {
      clearListeners();
      stop();
      init(additionalListeners);
    });
  } else {
    clearListeners();
    stop();
    init(additionalListeners);
  }
};
