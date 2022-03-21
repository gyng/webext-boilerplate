import {
  clearListeners,
  CoreMessageType,
  isMessage,
  isOwnMessage,
  listeners,
  makeMessage,
  registerListener,
  unregisterListener,
} from "@src/core/coreMessaging";

describe("core messaging", () => {
  describe("makeMessage", () => {
    beforeEach(() => {
      // @ts-expect-error for test
      browser.runtime.id = "extension-id";
    });

    it("makes a core message", () => {
      const message = makeMessage({
        type: CoreMessageType.OPTIONS_UPDATE_REQUEST,
        body: { newValues: { qix: "qax" } },
      });

      expect(message.body).toEqual({ newValues: { qix: "qax" } });
      expect(message.timestamp).toBeGreaterThan(Date.now() - 10);
      expect(message.extid).toEqual("extension-id");
      expect(message.type).toEqual(CoreMessageType.OPTIONS_UPDATE_REQUEST);
      expect(message.id).toBeTruthy();
    });

    it("checks a core message", () => {
      const message = makeMessage({
        type: CoreMessageType.OPTIONS_UPDATE_REQUEST,
        body: { newValues: { qix: "qax" } },
      });
      expect(isMessage(message)).toBe(true);
      expect(isOwnMessage(message)).toBe(true);

      expect(isMessage({ type: "not-a-message" })).toBe(false);
      expect(isOwnMessage({ type: "not-a-message" })).toBe(false);
    });
  });

  describe("default listeners list", () => {
    beforeEach(() => {
      clearListeners();
    });

    it("re/unregisters a listener", () => {
      const listener = () => {
        /** noop */
      };
      expect(listeners.length === 1);
      registerListener(listener);
      expect(listeners.length === 2);
      unregisterListener(listener);
      expect(listeners.length === 1);
    });

    it("clears listeners", () => {
      const listener = () => {
        /** noop */
      };
      expect(listeners.length === 1);
      registerListener(listener);
      registerListener(listener);
      expect(listeners.length === 3);
      clearListeners();
      expect(listeners.length === 1);
    });
  });
});
