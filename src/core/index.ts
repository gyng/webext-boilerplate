import {
  clearListeners,
  listen,
  Listener,
  listeners,
  registerListener,
  stop
} from "@src/core/messaging";

export const init = (additionalListeners?: Listener[]) => {
  if (additionalListeners) {
    additionalListeners.forEach(l => registerListener(l));
  }

  listen();
};

// Add any additional deregistration/cleanup needed here
export const reset = (additionalListeners: Listener[] = listeners) => {
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
