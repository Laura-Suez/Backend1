import { dirname } from "path";
import { fileURLToPath } from "url";

export const __dirname = dirname(fileURLToPath(import.meta.url));

export function isNil(ref) {
  return ref === null || ref === undefined;
}

export function getValueOrDefault(value, defaultValue) {
  return isNil(value) ? defaultValue : value;
}
