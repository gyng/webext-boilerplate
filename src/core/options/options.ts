import browser from "webextension-polyfill";

import { Options } from "@src/schema";

export type OptionsKeys = keyof Options;

// new type to track populated value
export type OptionsSchemaWithValues = Options;

/**
 * ### Generics
 * - `T`: Primitive value type that is directly serializable to JSON (`boolean`, `number`, `string`)
 * - `DeserT`: Deserialized option type, defaults to `T`
 */
export type SchemataItem<T = unknown, DeserT = T> = {
  /** Used for options page input controls autocreation, can be `boolean`, `number`, or `string` */
  type: T extends boolean ? "boolean" : T extends number ? "number" : "string";
  /** Will be populated on load */
  default?: T;
  /** Serialization function, identity if not supplied */
  ser?: (v: DeserT) => T;
  /** Deserialization function, identity if not supplied */
  deser?: (v: T) => DeserT;
  /** In schema definition: default value; after loading: actual value */
  value: DeserT;
};

export type OptionKV = Partial<
  Record<keyof Options, string | boolean | number>
>;

export const getKeys = (schema: Options): (keyof Options)[] =>
  Object.keys(schema) as (keyof Options)[];

/** Loads options from `localStorage`. Options without values in `localStorage` will be left as the default value
 * as defined in the `value` field on `OptionsSchema`
 */
export const loadOptions = (schema: Options): Promise<Options> =>
  browser.storage.local.get(getKeys(schema)).then((loadedOptions) => {
    const localKeys = Object.keys(loadedOptions);

    // populate with defaults
    // we do this instead of defining a `default` property in the schema
    // as TS can't tell when `value` should exist or not, even with generics-magic
    // and type-wizardry. Tried a few approaches (marker generics, conditional generics, union types, ...)
    // but it wasn't working out. Maybe this should be a JSON schema, but then ser/deser functions will be difficult
    const optionKeys = getKeys(schema);
    const populatedOptions = { ...schema };
    optionKeys.forEach((k) => {
      populatedOptions[k].default = populatedOptions[k].value;
    });

    localKeys.forEach((key) => {
      if (key in schema) {
        const schemataKey = key as keyof typeof schema;
        const localVal = loadedOptions[schemataKey]?.valueOf();

        if (
          typeof localVal === "string" ||
          typeof localVal === "boolean" ||
          typeof localVal === "number"
        ) {
          // We lose type information on `schemata` here
          const schemata = schema[schemataKey];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const deser = schemata.deser ?? ((x: any) => x);
          // @ts-expect-error type is checked
          const value: string | number | boolean = deser(localVal);
          if (typeof value !== "undefined") {
            // @ts-expect-error type is checked
            populatedOptions[schemataKey].value = value;
          }
        }
      }
    });

    return populatedOptions;
  });

export const saveOptions = (
  options: OptionKV,
  schema = Options
): Promise<void> => {
  const kv: Record<string, string> = {};

  Object.entries(options).forEach(([key, val]) => {
    if (!Object.keys(new Options()).includes(key)) {
      console.warn(
        `Setting option "${key}", but it is not in the schema ${Object.keys(
          Options
        )}!`
      );
    }
    // @ts-expect-error just trying our luck
    const def = schema[key];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ser = def?.ser ?? ((x: any) => x);
    kv[key] = ser(val);
  });

  return browser.storage.local.set(kv).catch(console.error);
};

export const resetOptions = (schema = Options): Promise<void> => {
  const defaults = new schema();
  const keys = getKeys(defaults);
  const kv: Record<string, string | boolean | undefined> = {};
  keys.forEach((key) => {
    if (defaults[key]?.value) {
      kv[key] = defaults[key].value;
    }
  });
  return browser.storage.local.set(kv).catch(console.error);
};
