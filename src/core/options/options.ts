import { OptionTypePrim } from "@src/core/options";
import { schema } from "@src/schema";

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
