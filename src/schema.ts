import { SchemataItem } from "@src/core/options";

/**
 * Define your schema in this class. Set `value` to the default value.
 * Individual `SchemataItem`s will be populated with a `default` field after loading.
 * See the docstring/typedef/impl of `SchemataItem` for more details.
 *
 * - `ser`:  serialization, used to save options into `localStorage`. Must serialize into a JSON-serializable string.
 * - `deser`: deserialization, the opposite of `ser`.
 * - `value`: default value that gets overwritten with values from `localStorage`
 * - `type`: `"string" | "number" | "boolean"`, used to automatically create options
 *
 * (NB. this is a class due to TS typesystem limitations)
 */
export class Options {
  bar: SchemataItem<string> = {
    type: "string",
    value: "baz",
    ser: (v) => v.trim() || ".",
  };

  baz: SchemataItem<string> = {
    type: "string",
    value: "a",
    ser: (v) => v.trim(),
  };

  foo: SchemataItem<boolean> = {
    type: "boolean",
    value: true,
  };

  qix: SchemataItem<string> = {
    type: "string",
    value: "hello",
  };
}
