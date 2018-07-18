import { OptionType } from "@src/schema";
import { OptionTypePrim } from "@src/core/options";
import { schema } from "@src/schema";

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

export const getKeys = () => Object.keys(schema);

export const loadOptions = browser.storage.local
  .get(getKeys())
  .then(loadedOptions => {
    const localKeys = Object.keys(loadedOptions);

    const options: { [k: string]: OptionTypePrim } = getKeys().reduce(
      (acc, val) => Object.assign(acc, { [val]: schema[val].default }),
      {}
    );

    localKeys.forEach(key => {
      const option = schema[key];
      const onLoad: ((x: any) => any) = option.onLoad || (x => x);
      const value = onLoad(loadedOptions[key]);
      if (typeof value !== "undefined") {
        options[key] = value;
      }
    });

    return options;
  });
