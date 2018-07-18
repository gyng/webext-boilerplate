import {  actions } from "@src/core/messaging";

export const exportSettings = (cb: (body: { [k: string]: any }) => void) => {
  actions.optionsGet().then(body => cb(body));
}

export const importSettings = () => {
  const load = (w: Window) => {
    actions.optionsGet().then(_schema => {
      const json = w.prompt("Paste settings to import");
      try {
        if (json) {
          const imported = JSON.parse(json);
          actions.optionsUpdate(imported);
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
      actions.optionsReset();
    }
  }
  
  // @ts-ignore
  if (browser === chrome) {
    browser.runtime.getBackgroundPage().then(resetFn);
  } else {
    resetFn(window);
  }
};
