import type { LanguageCode } from '../languages';

/** GitHub pull request numbers for completed content reviews. */
export type Review = {
  ai?: number;
  scientific?: number;
  languages?: Partial<Record<LanguageCode, number>>;
};

/** Reviews tracked outside published entity data, keyed by entity ID or slug. */
export type ReviewCatalog<Key extends string = string> = Partial<Record<Key, Review>>;
