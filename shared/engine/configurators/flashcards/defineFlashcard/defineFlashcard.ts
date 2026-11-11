import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';
import type { ContentBlock_Configurator } from '../../contentBlocks';
import { flashcard_Config_Schema, type Flashcard_Config } from './defineFlashcard.schemas';

const validate = (config: unknown) => {
  flashcard_Config_Schema.parse(config);
};

export function defineFlashcard<
  const Front extends readonly ContentBlock_Configurator[],
  const Back extends readonly ContentBlock_Configurator[],
  const Hint extends readonly ContentBlock_Configurator[],
>(
  config: Omit<Flashcard_Config, 'front' | 'back' | 'hint'> & {
    front: Front;
    back: Back;
    hint: Hint;
  },
) {
  validate(config);

  const { type, id, isDefault, front, back, hint, tags, flags, relationships } = config;
  // TODO(#436): Array patch semantics for localized flag values remain unresolved.
  // Preserve the existing array projection; do not treat it as the final merge contract.
  const localeEntries = { flags } as const;
  const invariantStrings = onlyStrings(localeEntries);
  const base = {
    type,
    id,
    isDefault,
    tags,
    relationships,
    ...invariantStrings,
    // A list flag carries a numeric invariant. OnlyStrings intentionally
    // removes numbers; restore these from the original validated flags.
    flags: flags.map((flag, index) => ({
      ...(invariantStrings.flags?.[index] ?? {}),
      ...(flag.type === 'list' ? { count: flag.count } : {}),
    })),
  } satisfies DeepPartial<Flashcard_Config>;

  return {
    id,
    type,
    config: {
      base,
      validate,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<Flashcard_Config>,
    },
    front,
    back,
    hint,
  };
}

export type Flashcard_Configurator = ReturnType<typeof defineFlashcard>;
