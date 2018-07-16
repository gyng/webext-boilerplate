export enum OptionType {
  BOOLEAN = "BOOLEAN",
  STRING = "STRING"
}

// TODO: There is no contstraint between type and onSave, this can be improved
export interface OptionKey<T> {
  type: OptionType;
  onSave?: (value: any) => any;
  onLoad?: (value: any) => void;
  default: T;
}

export type OptionTypePrim = boolean | string;

export const OPTION_KEYS: {
  [k: string]: OptionKey<boolean> | OptionKey<string>;
} = {
  foo: { type: OptionType.BOOLEAN, default: false },
  bar: {
    type: OptionType.STRING,
    onSave: (v: string) => v.trim() || ".",
    default: "baz"
  }
};

export const getKeys = () => Object.keys(OPTION_KEYS);

export const setOption = (name: string, value: OptionTypePrim) => {
  if (typeof value !== "undefined") {
    options[name] = value;
  }
};

export const loadOptions = () =>
  browser.storage.local.get(getKeys()).then(loadedOptions => {
    const localKeys = Object.keys(loadedOptions);

    localKeys.forEach(key => {
      const option = OPTION_KEYS[key];
      const onLoad: ((x: any) => any) = option.onLoad || (x => x);
      const value = onLoad(loadedOptions[key]);
      setOption(key, value);
    });

    return options;
  });

// Initialised to default options
export let options: { [k: string]: OptionTypePrim } = Object.keys(
  OPTION_KEYS
).reduce(
  (acc, val) => Object.assign(acc, { [val]: OPTION_KEYS[val].default }),
  {}
);
