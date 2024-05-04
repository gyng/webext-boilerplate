import { Options } from "@src/schema";

export function isValidOptionKey(key: string): key is keyof Options {
  return key in new Options();
}
