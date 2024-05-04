import {
  makeMyMessage,
  myBackgroundListener,
  MyMessageTypes,
} from "@src/messaging";

describe("background script", () => {
  describe("background listener", () => {
    it("handles ECHO", async () => {
      const message = makeMyMessage({
        type: MyMessageTypes.ECHO,
        body: { value: "bar" },
      });
      // @ts-expect-error no sender provided for test
      const response = await myBackgroundListener(message);
      expect(response).toBe("bar");
    });

    it("handles ECHO", async () => {
      const message = makeMyMessage({
        type: MyMessageTypes.ECHO,
        body: { value: "bar" },
      });
      // @ts-expect-error no sender provided for test
      const response = await myBackgroundListener(message);
      expect(response).toBe("bar");
    });

    it("ignores other messages", async () => {
      const message = makeMyMessage({
        type: MyMessageTypes.FOO,
        body: { baz: 1 },
      });
      // @ts-expect-error no sender provided for test
      const response = await myBackgroundListener(message);
      expect(response).toBe(false);
    });
  });
});
