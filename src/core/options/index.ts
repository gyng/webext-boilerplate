import { OptionTypePrim } from "@src/core/options";
import { OptionType } from "@src/schema";

// TODO: There is no contstraint between type and onSave, this can be improved
export interface IOptionKey<T> {
  type: OptionType;
  onSave?: (value: any) => any;
  onLoad?: (value: any) => void;
  default: T;
}

export type OptionTypePrim = boolean | string;

export interface IOptionsSchema {
  [k: string]: IOptionKey<boolean> | IOptionKey<string>;
}

export interface IOptions {
  [k: string]: boolean | string;
}

export const getKeys = (sch: IOptionsSchema) => Object.keys(sch);

export const loadOptions = (sch: IOptionsSchema) =>
  browser.storage.local.get(getKeys(sch)).then(loadedOptions => {
    const localKeys = Object.keys(loadedOptions);

    const options: { [k: string]: OptionTypePrim } = getKeys(sch).reduce(
      (acc, val) => ({ ...acc, [val]: sch[val].default }),
      {}
    );

    localKeys.forEach(key => {
      const option = sch[key];
      const onLoad: ((x: any) => any) = option.onLoad || (x => x);
      const value = onLoad(loadedOptions[key]);
      if (typeof value !== "undefined") {
        options[key] = value;
      }
    });

    return options;
  });
