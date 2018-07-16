"use strict";
const script = document.createElement("script");
let url;
if (typeof browser !== "undefined") {
    url = chrome.extension.getURL("bundle/content/index.js");
}
else {
    url = browser.extension.getURL("bundle/content/index.js");
}
script.setAttribute("type", "module");
script.setAttribute("src", url);
const head = document.head ||
    document.getElementsByTagName("head")[0] ||
    document.documentElement;
head.insertBefore(script, head.lastChild);
//# sourceMappingURL=loader.js.map