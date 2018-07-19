import { IOptionsSchema } from "@src/core/options";

export enum OptionType {
  BOOLEAN = "BOOLEAN",
  STRING = "STRING"
}

export const schema: IOptionsSchema = {
  bar: {
    default: "baz",
    onSave: (v: string) => v.trim() || ".",
    type: OptionType.STRING
  },
  foo: { type: OptionType.BOOLEAN, default: false }
};
