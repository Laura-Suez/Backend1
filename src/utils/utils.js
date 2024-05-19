export function isNil(ref) {
  return ref === null || ref === undefined;
}

export function getValueOrDefault(value, defaultValue) {
  return isNil(value) ? defaultValue : value;
}
