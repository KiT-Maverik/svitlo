/**
 * Deep compile-time immutability for authoring Data builder output.
 * Recursively marks nested objects, tuples and arrays readonly while retaining functions.
 * This is a TypeScript guarantee, not runtime Object.freeze.
 */
export type DeepReadonly<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;
