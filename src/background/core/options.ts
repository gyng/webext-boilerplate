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

export const OptionSchema: {
  [k: string]: OptionKey<boolean> | OptionKey<string>;
} = {
  foo: { type: OptionType.BOOLEAN, default: false },
  bar: {
    type: OptionType.STRING,
    onSave: (v: string) => v.trim() || ".",
    default: "baz"
  }
};

export const getKeys = () => Object.keys(OptionSchema);

export const loadOptions = browser.storage.local
  .get(getKeys())
  .then(loadedOptions => {
    const localKeys = Object.keys(loadedOptions);

    const options: { [k: string]: OptionTypePrim } = getKeys().reduce(
      (acc, val) => Object.assign(acc, { [val]: OptionSchema[val].default }),
      {}
    );

    localKeys.forEach(key => {
      const option = OptionSchema[key];
      const onLoad: ((x: any) => any) = option.onLoad || (x => x);
      const value = onLoad(loadedOptions[key]);
      if (typeof value !== "undefined") {
        options[key] = value;
      }
    });

    console.log('loaded options', getKeys(), loadedOptions, options);

    return options;
  });
