import {
  restoreOptionsHandler
} from "@src/options/core/options";
import {  actions } from "@src/background/core/messaging";

export const exportSettings = (cb: (body: { [k: string]: any }) => void) => {
  actions.optionsGet().then(body => cb(body));
}

export const importSettings = () => {
  const load = (w: Window) => {
    actions.optionsGet().then(schema => {
      const json = w.prompt("Paste settings to import");
      try {
        if (json) {
          const imported = JSON.parse(json);
          actions.optionsUpdate(imported);
          // restoreOptionsHandler(settings, schema);
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
