import browser from "webextension-polyfill";

export enum BROWSERS {
  CHROME = "CHROME",
  FIREFOX = "FIREFOX",
  UNKNOWN = "UNKNOWN",
}

export const getBrowser: () => Promise<BROWSERS> = () => {
  // If we don't have browser.runtime.getBrowserInfo, assume it's Chrome
  // Big assumption, but browser.runtime.getBrowserInfo is not well supported
  if (!browser.runtime.getBrowserInfo) {
    return new Promise((resolve) => {
      resolve(BROWSERS.CHROME);
    });
  }

  return browser.runtime.getBrowserInfo().then((res) => {
    return res.name === "Firefox" ? BROWSERS.FIREFOX : BROWSERS.UNKNOWN;
  });
};
