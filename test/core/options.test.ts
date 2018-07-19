import { Actions, listen, stop } from "../../src/core/messaging";
import {
  getKeys,
  IOptions,
  IOptionsSchema,
  loadOptions
} from "../../src/core/options";
import { OptionType } from "../../src/schema";

const testSchema: IOptionsSchema = {
  foo: { type: OptionType.STRING, default: "baz" }
};

const testOptions: IOptions = {
  foo: "bar"
};

describe("options management", () => {
  it("gets keys", async done => {
    const keys = await getKeys(testSchema);
    expect(keys).toEqual(["foo"]);
    done();
  });

  it("loads default options", async done => {
    const options = await loadOptions(testSchema);
    expect(options).toEqual({ foo: "baz" });
    done();
  });
});
