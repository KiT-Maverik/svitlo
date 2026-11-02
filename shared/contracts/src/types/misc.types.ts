export type NonEmptyArray<T> = [T, ...T[]];

/** Require each entry's slug to match its key while preserving the entry's other fields. */
export type DefineValidKeysFromSlugs<
  Keys extends string,
  Value extends { slug: string } = { slug: string },
> = {
  [Key in Keys]: Omit<Value, 'slug'> & { slug: Key };
};

/** Catalog collection discriminator, supplied by the corresponding builder. */
export type Collection = 'skill' | 'skillGroup' | 'skillDomain' | 'lesson' | 'lessonSection';
