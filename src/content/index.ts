// Unfortunately you cannot import any TS types in here because content scripts
// cannot be loaded as modules

(function contentScript() {
  if (typeof chrome === "undefined") {
    // @ts-ignore
    chrome = browser;
  }

  chrome.runtime.sendMessage(
    {
      type: "OPTIONS"
    },
    response => {
      if (!response || !response.body) {
        return;
      }

      const options = response.body;

      // tslint:disable-next-line:no-console
      console.log("Hello from the content script!");
      // tslint:disable-next-line:no-console
      console.log("Options: ", options);
    }
  );
})();
