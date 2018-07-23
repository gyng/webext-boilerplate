import { IOptionsSchema } from "@src/core/options";

export enum OptionType {
  BOOLEAN = "BOOLEAN",
  STRING = "STRING"
}

// TODO: Either change type to select/text or remove it
export const schema: IOptionsSchema = {
  bar: {
    default: "baz",
    onSave: (v: string) => v.trim() || ".",
    type: OptionType.STRING
  },
  baz: {
    default: "a",
    type: OptionType.STRING
  },
  foo: { type: OptionType.BOOLEAN, default: true },
  qix: { type: OptionType.STRING, default: "hello" }
};
