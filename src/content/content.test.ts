import browser from "webextension-polyfill";

import { init, reset } from "@src/core";
import { Listener } from "@src/core/coreMessaging";
import { myBackgroundListener } from "@src/messaging";
import { sleep } from "@test/util";

describe("content script", () => {
  const makeTestListener = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const received: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const testListener: Listener = (m: any) => {
      received.push(m);
    };
    browser.runtime.onMessage.addListener(testListener);
    return { received, testListener };
  };

  afterEach(() => {
    reset();
  });

  it("sends ECHO with options on init", async () => {
    const { received } = makeTestListener();

    init([myBackgroundListener]);
    require("./index");
    await sleep(1);

    const body = JSON.parse(received[0].body.value);
    await expect(body.bar).toEqual({
      type: "string",
      value: "baz",
      default: "baz",
    });
  });
});
