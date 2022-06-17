// This is a helper utlity that picks out all properties with string or undefined as value.
export type IsStringValue<T> = {
  [P in keyof T]: T[P] extends string | undefined ? P : never;
}[keyof T];
// This is an array of those keys.
export type TableKeyArray<T> = IsStringValue<T>[];
// Object with string values.
export type ObjectWithStringValues<T> = { [P in keyof T]: string };
