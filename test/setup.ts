import "@testing-library/jest-dom";

// @ts-expect-error test setup
global.crypto = require("crypto");
// @ts-expect-error test setup
browser.runtime.id = "test-extension-id";
