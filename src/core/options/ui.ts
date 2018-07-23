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

  // @ts-ignore
  if (browser === chrome) {
    browser.runtime.getBackgroundPage().then(load);
  } else {
    load(window);
  }
};

export const resetSettings = () => {
  const resetFn = (win: Window) => {
    const reset = win.confirm("Reset settings to defaults?");
    if (reset) {
      CoreActions.optionsReset();
    }
  };

  // @ts-ignore
  if (browser === chrome) {
    browser.runtime.getBackgroundPage().then(resetFn);
  } else {
    resetFn(window);
  }
};
