import { BROWSERS, getBrowser } from "@src/core/browser-detector";
import { CoreActions } from "@src/core/messaging";

export const exportSettings = CoreActions.optionsGet();

export const importSettings = () => {
  const load = (w: Window) => {
    CoreActions.optionsGet().then(schema => {
      const json = w.prompt("Paste settings to import");
      try {
        if (json) {
          const imported = JSON.parse(json);
          CoreActions.optionsUpdate(imported);
          w.alert("Settings loaded.");
        }
      } catch (e) {
        w.alert(`Failed to load settings ${e}`);
      }
    });
  };

  getBrowser().then(currentBrowser => {
    if (currentBrowser === BROWSERS.CHROME) {
      browser.runtime.getBackgroundPage().then(load);
    } else {
      load(window);
    }
  });
};

export const resetSettings = () => {
  const resetFn = (win: Window) => {
    const reset = win.confirm("Reset settings to defaults?");
    if (reset) {
      CoreActions.optionsReset();
    }
  };

  getBrowser().then(currentBrowser => {
    if (currentBrowser === BROWSERS.CHROME) {
      browser.runtime.getBackgroundPage().then(resetFn);
    } else {
      resetFn(window);
    }
  });
};
