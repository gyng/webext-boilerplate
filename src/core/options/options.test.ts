import { getKeys, loadOptions, saveOptions, SchemataItem } from "./options";

export class TestOptions {
  bar: SchemataItem<string> = {
    type: "string",
    value: "baz",
    ser: (v) => `${v}moo` || ".",
    deser: (v) => v.trim() || ".",
  };

  baz: SchemataItem<string> = {
    type: "string",
    value: "a",
    ser: (v) => v.trim(),
  };

  foo: SchemataItem<boolean> = {
    type: "boolean",
    value: true,
  };

  qix: SchemataItem<string> = {
    type: "string",
    value: "hello",
  };
}

const testSchema = new TestOptions();

describe("options management", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let storage: Record<string, any> = {};

  beforeEach(async () => {
    storage = {};
    browser.storage.local.get = () => {
      return new Promise((resolve) => {
        // @ts-expect-error test mock
        resolve(storage);
      });
    };
    browser.storage.local.set = (v) => {
      storage = Object.assign(storage, v);
      return new Promise(() => {
        return;
      });
    };
    browser.storage.local.clear = () => {
      storage = {};
      return new Promise(() => {
        return;
      });
    };
  });

  it("gets keys", async () => {
    const keys = await getKeys(testSchema);
    await expect(keys).toEqual(["bar", "baz", "foo", "qix"]);
  });

  it("loads default options", async () => {
    const options = await loadOptions(testSchema);
    expect(options).toEqual(testSchema);
  });

  it("saves and loads options to/from localStorage with serialization/deserialization", async () => {
    // @ts-expect-error Mock Options
    saveOptions({ bar: "   deadbeef   " }, new TestOptions());
    const options = await loadOptions(testSchema);
    await expect(options).toEqual(testSchema);
    await expect(options.bar.value).toBe("deadbeef   moo");
  });
});
