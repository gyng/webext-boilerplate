import { OptionsSchema } from "@src/core/options";

export enum OptionType {
  BOOLEAN = "BOOLEAN",
  STRING = "STRING"
}

export const schema: OptionsSchema = {
  foo: { type: OptionType.BOOLEAN, default: false },
  bar: {
    type: OptionType.STRING,
    onSave: (v: string) => v.trim() || ".",
    default: "baz"
  }
};
