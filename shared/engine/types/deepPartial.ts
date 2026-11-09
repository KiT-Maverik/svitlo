/** Makes properties optional at every object level while preserving function types. */
export type DeepPartial<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends object
    ? { [Key in keyof T]?: DeepPartial<T[Key]> }
    : T;
