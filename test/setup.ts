import "@testing-library/jest-dom";

// @ts-ignore-error
import { webcrypto } from "node:crypto";

Object.defineProperty(globalThis, "crypto", {
  value: webcrypto,
});

// @ts-expect-error test setup
browser.runtime.id = "test-extension-id";
