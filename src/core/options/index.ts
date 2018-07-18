import { OptionType } from "@src/schema";

export * from "@src/core/options/options";

// TODO: There is no contstraint between type and onSave, this can be improved
export interface OptionKey<T> {
  type: OptionType;
  onSave?: (value: any) => any;
  onLoad?: (value: any) => void;
  default: T;
}

export type OptionTypePrim = boolean | string;

export type OptionsSchema = {
  [k: string]: OptionKey<boolean> | OptionKey<string>;
};
