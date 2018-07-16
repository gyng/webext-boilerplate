"use strict";
// Unfortunately you cannot import any TS types in here because content scripts
// cannot be loaded as modules
(function contentScript() {
    if (typeof chrome === "undefined") {
        // @ts-ignore
        chrome = browser;
    }
    chrome.runtime.sendMessage({
        type: "OPTIONS"
    }, response => {
        if (!response || !response.body) {
            return;
        }
        const options = response.body;
        console.log("Hello from the content script!"); // eslint-disable-line
        console.log("Options: ", options); // eslint-disable-line
    });
})();
//# sourceMappingURL=index.js.map