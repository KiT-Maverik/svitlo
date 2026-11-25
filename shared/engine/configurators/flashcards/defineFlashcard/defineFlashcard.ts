import { z } from 'zod';

import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type {
  ChildrenSupporting,
  DeepPartial,
  LanguageScope,
  PublicationLanguageOptions,
  RequireLanguages,
} from '#types';

import {
  mergeForValidation,
  onlyLocales,
  resolvePublicationLanguages,
  selectPublicationLocales,
  splitLocalizedFields,
  validateOrderedKeys,
} from '../../_shared__configurators';
import type { ConfiguratorChild } from '../../../types/configuratorChild';
import type { ContentBlock_Configurator } from '../../contentBlocks';
import { defineFlashcardSide, type FlashcardSide_Configurator } from '../defineFlashcardSide/defineFlashcardSide';
import { flashcardSideConfigurator_Schema } from '../defineFlashcardSide/defineFlashcardSide.schemas';
import {
  flashcard_Config_Schema,
  flashcard_Override_Metadata_Schema,
  flashcard_Props_Schema,
  flashcardFlag_Config_Schema,
  flashcardRelationship_Schema,
  type Flashcard_Config,
  type Flashcard_Flag_Config,
  type Flashcard_Overrides,
  type Flashcard_PropsBase,
  type Flashcard_Relationship,
} from './defineFlashcard.schemas';

type Block = ContentBlock_Configurator;
type Side = 'front' | 'back' | 'hint';
type SidePublication = {
  base: Flashcard_PropsBase['content']['front'];
  locale: Partial<Record<LanguageCode, Flashcard_PropsBase['content']['front']>> | undefined;
};
type FlagFragment = Flashcard_PropsBase['parameters']['flags'][number];
type LocaleBody = {
  parameters?: { flags?: FlagFragment[] };
  content?: Partial<Record<Side, Flashcard_PropsBase['content']['front']>>;
};
type Files = Partial<Record<LanguageCode, LocaleBody>>;
type Publication<Base> = { base: Base; locale: Files | undefined };
type OverrideBase = {
  parameters?: DeepPartial<Flashcard_PropsBase['parameters']>;
  content?: Partial<Flashcard_PropsBase['content']>;
};
type NamedInput = { items: Record<string, unknown>; order: string[] };
type NamedPatch = {
  items?: Record<string, unknown>;
  additionalItems?: Record<string, unknown>;
  order?: string[];
};
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/** Ensure each requested language materializes a complete Flashcard, not a partial UI value. */
const validatePublication = (
  resource: Publication<unknown>,
  languages: readonly LanguageCode[],
  patch?: Publication<unknown>,
): void => {
  for (const language of languages) {
    const original = mergeForValidation(
      resource.base as Record<string, unknown>,
      (resource.locale?.[language] ?? {}) as DeepPartial<Record<string, unknown>>,
    );
    const withPatch = patch
      ? mergeForValidation(original, patch.base as DeepPartial<Record<string, unknown>>)
      : original;
    const effective = patch
      ? mergeForValidation(withPatch, (patch.locale?.[language] ?? {}) as DeepPartial<Record<string, unknown>>)
      : withPatch;
    try {
      flashcard_Props_Schema.parse(effective);
    } catch (error) {
      throw new Error(
        'Invalid Flashcard Props for language ' +
          language +
          ': ' +
          (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  }
};

const validate = (config: Flashcard_Config): void => {
  flashcard_Config_Schema.parse(config);
  for (const side of ['front', 'back', 'hint'] as const) {
    const collection = config.content?.[side];
    if (!collection && side === 'hint') continue;
    if (!collection) throw new Error('Flashcard content.' + side + ' is required');
    if (!flashcardSideConfigurator_Schema.safeParse(collection).success)
      throw new Error('Flashcard side must be a Configurator: ' + side);
    (collection as FlashcardSide_Configurator).validate(side !== 'hint');
  }
  if (config.parameters.relationships) {
    const issues = validateOrderedKeys(config.parameters.relationships, { path: 'parameters.relationships' });
    if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
  }
  const flags = new Set<string>();
  for (const flag of config.parameters.flags) {
    if (flag.type !== 'custom') {
      if (flags.has(flag.type)) throw new Error('Duplicate built-in Flashcard flag: ' + flag.type);
      flags.add(flag.type);
    }
  }
  const ids = new Set<string>();
  for (const relation of Object.values(config.parameters.relationships?.items ?? {})) {
    if (ids.has(relation.relationshipId))
      throw new Error('Duplicate Flashcard relationship ID: ' + relation.relationshipId);
    ids.add(relation.relationshipId);
  }
};

/**
 * Apply one plain, named Flashcard collection patch.
 * Entries are JSON data, not configurators. The owning Config schema validates
 * each completed entry; patch field validation is derived from the original schema.
 */
const resolveNamed = (
  label: 'relationships',
  source: NamedInput,
  patch: NamedPatch | undefined,
  parseItem: (value: unknown) => unknown,
  parseUpdate: (original: Record<string, unknown>, value: unknown) => unknown,
) => {
  if (patch !== undefined && !isRecord(patch)) throw new Error('parameters.' + label + ' must be an object');
  for (const key of Object.keys(patch ?? {})) {
    if (!['items', 'additionalItems', 'order'].includes(key)) {
      throw new Error('Unknown parameters.' + label + ' override field: ' + key);
    }
  }
  const changes = patch?.items ?? {};
  const additions = patch?.additionalItems ?? {};
  if (!isRecord(changes) || !isRecord(additions)) throw new Error('Invalid named Flashcard ' + label + ' map');
  const enabled: Record<string, unknown | false> = { ...source.items };
  let structureChanged = Object.keys(additions).length > 0;
  for (const [key, value] of Object.entries(additions)) {
    if (Object.hasOwn(source.items, key)) throw new Error('Duplicate Flashcard ' + label + ' slug: ' + key);
    enabled[key] = parseItem(value);
  }
  for (const [key, change] of Object.entries(changes)) {
    if (!Object.hasOwn(source.items, key)) throw new Error('Unknown existing Flashcard ' + label + ': ' + key);
    if (change === false) {
      enabled[key] = false;
      structureChanged = true;
    } else enabled[key] = parseUpdate(source.items[key] as Record<string, unknown>, change);
  }
  if (structureChanged && patch?.order === undefined) {
    throw new Error('parameters.' + label + '.order is required when adding or disabling items');
  }
  const order = patch?.order ?? source.order;
  const issues = validateOrderedKeys({ items: enabled, order }, { path: 'parameters.' + label, allowDisabled: true });
  if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
  return {
    items: Object.fromEntries(Object.entries(enabled).filter(entry => entry[1] !== false)),
    order: [...order],
    changed:
      patch !== undefined &&
      (Object.keys(changes).length > 0 || Object.keys(additions).length > 0 || patch.order !== undefined),
  };
};

/**
 * Author one focused recall target with a front, back and optional hint.
 *
 * @remarks
 * Flags are presentation metadata, not extra answer content:
 * - `list`: the learner should recall a meaningful list (`count >= 2`).
 * - `warning`: draw attention to an important caution.
 * - `acronym`: display a mnemonic; localize `value` when wording changes.
 * - `custom`: provide a localized label, palette color and optional icon key.
 * Each built-in flag may appear only once; multiple custom flags are allowed.
 *
 * Relationships connect distinct Flashcards by the OTHER card's UUID in
 * `relatedFlashcardId` (not by slug). Choose a semantic relationship:
 * - Symmetric: `reverse` (opposite recall direction), `equivalent` (same
 *   meaning), `contrast` (a distinction), `complementary` (related facts).
 * - Directed: `prerequisite` (foundation -> dependent), `partOf` (part ->
 *   whole), `exampleOf` (example -> category), `causes` (cause -> effect),
 *   `precedes` (earlier -> later).
 * Use `position: 'peer'` on symmetric links; use `'source'` on the source
 * card and `'target'` on the destination card for directed links.
 * The mirrored entry must reuse the same `relationshipId`, but
 * `defineFlashcard` does not generate mirrored entries automatically;
 * use `linkFlashcards` when building from a canonical one-edge graph.
 *
 * @example
 * ```ts
 * relationships: {
 *   items: {
 *     exampleToCategory: {
 *       relationshipId: 'example-category',
 *       type: 'exampleOf',
 *       relatedFlashcardId: 'a0000000-0000-4000-8000-000000000002',
 *       position: 'source',
 *     },
 *   },
 *   order: ['exampleToCategory'],
 * }
 * ```
 */
export function defineFlashcard<
  const Slug extends string,
  const Front extends Record<string, Block>,
  const Back extends Record<string, Block>,
  const Hint extends Record<string, Block> = {},
  const Flags extends Flashcard_Flag_Config[] = Flashcard_Flag_Config[],
  const Relationships extends Record<string, Flashcard_Relationship> = Record<string, Flashcard_Relationship>,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: Omit<Flashcard_Config, 'slug' | 'content' | 'parameters'> & {
    slug: Slug;
    parameters: Omit<Flashcard_Config['parameters'], 'flags' | 'relationships'> & {
      flags: Flags & RequireLanguages<Flags, Languages>;
      relationships?: { items: Relationships; order: string[] };
    };
    content: {
      front: FlashcardSide_Configurator<Front, Languages> & { items: Front & ChildrenSupporting<Languages, Front> };
      back: FlashcardSide_Configurator<Back, Languages> & { items: Back & ChildrenSupporting<Languages, Back> };
      hint?: FlashcardSide_Configurator<Hint, Languages> & { items: Hint & ChildrenSupporting<Languages, Hint> };
    };
  },
) {
  const metadataSchema = flashcard_Config_Schema.omit({ content: true });
  const { content: _content, ...metadataInput } = config;
  const authored = structuredClone(metadataInput);
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id, slug } = authored;
  const type = 'flashcard' as const;
  const initialContent = {
    front: config.content.front,
    back: config.content.back,
    ...(config.content.hint ? { hint: config.content.hint } : {}),
  };
  const content = { ...initialContent };
  // Keep invariant flag fields in base; localized values belong in locale files.
  const base = {
    id,
    slug,
    type,
    parameters: {
      ...structuredClone(authored.parameters),
      disabilities: authored.parameters.disabilities ?? [],
      flags: authored.parameters.flags.map(flag => splitLocalizedFields(flag).base),
    },
  } satisfies DeepPartial<Flashcard_Config> & { type: 'flashcard' };

  const buildSide = <Items extends Record<string, Block>>(
    side: FlashcardSide_Configurator<Items, Languages>,
    languages: readonly LanguageCode[],
  ): SidePublication => (side.build.props as (options: PublicationLanguageOptions) => SidePublication)({ languages });

  const buildFlags = (flags: Flashcard_Config['parameters']['flags'], languages: readonly LanguageCode[]) => {
    const entries = flags.map(flag => splitLocalizedFields(flag));
    const bases = entries.map(entry => entry.base) as FlagFragment[];
    const locales: Partial<Record<LanguageCode, FlagFragment[]>> = {};
    for (const code of languages) {
      if (!entries.some(entry => entry.locale?.[code] !== undefined)) continue;
      locales[code] = entries.map(entry =>
        mergeForValidation(entry.base, (entry.locale?.[code] ?? {}) as DeepPartial<typeof entry.base>),
      ) as FlagFragment[];
    }
    return { bases, locales };
  };

  const buildRelationships = (relations: Flashcard_Config['parameters']['relationships']) =>
    relations?.order.map(key => structuredClone(relations.items[key]));

  const addSideFiles = (files: Files, side: Side, built: SidePublication) => {
    for (const [code, values] of Object.entries(built.locale ?? {})) {
      ((files[code as LanguageCode] ??= {}).content ??= {})[side] = values;
    }
  };
  const addFlagFiles = (files: Files, built: ReturnType<typeof buildFlags>) => {
    for (const [code, values] of Object.entries(built.locales)) {
      (files[code as LanguageCode] ??= {}).parameters = { flags: values };
    }
  };

  const props = (options: PublicationLanguageOptions<Languages>): Publication<Flashcard_PropsBase> => {
    const languages = resolvePublicationLanguages(options);
    validate({ ...copyAuthored(), content: initialContent });
    const source = copyAuthored();
    const files: Files = {};
    const front = buildSide(initialContent.front, languages);
    const back = buildSide(initialContent.back, languages);
    const hint = initialContent.hint && buildSide(initialContent.hint, languages);
    const flags = buildFlags(source.parameters.flags, languages);
    const { flags: authoredFlags, relationships: authoredRelationships, ...publishedParameters } = source.parameters;
    void authoredFlags;
    void authoredRelationships;
    addSideFiles(files, 'front', front);
    addSideFiles(files, 'back', back);
    if (hint) addSideFiles(files, 'hint', hint);
    addFlagFiles(files, flags);
    const result = structuredClone({
      base: {
        id,
        slug,
        type,
        parameters: {
          ...publishedParameters,
          disabilities: publishedParameters.disabilities ?? [],
          flags: flags.bases,
          ...(source.parameters.relationships
            ? {
                relationships: buildRelationships(source.parameters.relationships),
              }
            : {}),
        },
        content: {
          front: front.base,
          back: back.base,
          ...(hint ? { hint: hint.base } : {}),
        },
      },
      locale: selectPublicationLocales(Object.keys(files).length ? files : undefined, languages),
    });
    validatePublication(result, languages);
    return result;
  };

  const overrides = <
    const AddedFront extends Record<string, Block> = {},
    const AddedBack extends Record<string, Block> = {},
    const AddedHint extends Record<string, Block> = {},
    const AddedRelationships extends Record<string, Flashcard_Relationship> = {},
  >(
    patch: Flashcard_Overrides<
      Front,
      Back,
      Hint,
      Relationships,
      AddedFront,
      AddedBack,
      AddedHint,
      AddedRelationships
    > & {
      content?: {
        front?: { additionalItems?: AddedFront & ChildrenSupporting<Languages, AddedFront> };
        back?: { additionalItems?: AddedBack & ChildrenSupporting<Languages, AddedBack> };
        hint?: { additionalItems?: AddedHint & ChildrenSupporting<Languages, AddedHint> };
      };
    },
    options: PublicationLanguageOptions<Languages>,
  ): Publication<OverrideBase> => {
    try {
      const languages = resolvePublicationLanguages(options);
      validate({ ...copyAuthored(), content: initialContent });
      if (!isRecord(patch)) throw new Error('Expected a Flashcard overrides object');
      for (const key of Object.keys(patch)) {
        if (!['parameters', 'content'].includes(key)) throw new Error('Unknown Flashcard override field: ' + key);
      }
      if (patch.parameters !== undefined && !isRecord(patch.parameters))
        throw new Error('parameters must be an object');
      for (const key of Object.keys(patch.parameters ?? {})) {
        if (!['disabled', 'tags', 'disabilities', 'flags', 'relationships'].includes(key)) {
          throw new Error('Unknown Flashcard parameter override field: ' + key);
        }
      }
      const metadataPatch = flashcard_Override_Metadata_Schema.parse({
        parameters: Object.fromEntries(
          Object.entries(patch.parameters ?? {}).filter(([key]) => key !== 'flags' && key !== 'relationships'),
        ),
      });
      const candidate = copyAuthored();
      const newParams = mergeForValidation<Flashcard_Config['parameters']>(
        candidate.parameters,
        metadataPatch.parameters ?? {},
      );
      const output: Publication<OverrideBase> = {
        base: {
          ...(Object.keys(metadataPatch.parameters ?? {}).length
            ? {
                parameters: metadataPatch.parameters,
              }
            : {}),
        },
        locale: undefined,
      };
      const files: Files = {};
      // Flags have no identity or meaningful order: override the entire array.
      // Relationships retain their independently keyed patch contract.
      if (patch.parameters?.flags !== undefined) {
        newParams.flags = z.array(flashcardFlag_Config_Schema).parse(patch.parameters.flags);
        const built = buildFlags(newParams.flags, languages);
        (output.base.parameters ??= {}).flags = built.bases;
        addFlagFiles(files, built);
      }
      const relationshipChange = patch.parameters?.relationships as NamedPatch | undefined;
      const relationships = resolveNamed(
        'relationships',
        candidate.parameters.relationships ?? { items: {}, order: [] },
        relationshipChange,
        value => flashcardRelationship_Schema.parse(value),
        (previous, value) => {
          const sparse = z
            .deepPartial(flashcardRelationship_Schema.omit({ relationshipId: true, type: true }).strict())
            .parse(value);
          return flashcardRelationship_Schema.parse(mergeForValidation(previous, sparse));
        },
      );
      newParams.relationships =
        candidate.parameters.relationships || relationships.changed
          ? { items: relationships.items as Record<string, Flashcard_Relationship>, order: relationships.order }
          : undefined;
      if (relationships.changed) {
        (output.base.parameters ??= {}).relationships = buildRelationships(newParams.relationships);
      }
      candidate.parameters = newParams;
      if (patch.content !== undefined && !isRecord(patch.content)) throw new Error('content must be an object');
      for (const key of Object.keys(patch.content ?? {})) {
        if (!['front', 'back', 'hint'].includes(key)) throw new Error('Unknown Flashcard content side: ' + key);
      }
      const effective: Flashcard_Config['content'] = { ...initialContent };
      for (const side of ['front', 'back', 'hint'] as const) {
        const change = patch.content?.[side];
        if (change === undefined) continue;
        if (!isRecord(change)) throw new Error('content.' + side + ' must be an object');
        // Optional hint can be introduced through additionalItems without
        // inventing a separate side UUID or changing the authored card.
        const current = initialContent[side] ?? defineFlashcardSide({ items: {}, order: [] });
        const built = (
          current.build.overrides as (patch: never, options: PublicationLanguageOptions) => SidePublication
        )(change as never, { languages });
        if (side !== 'hint' && built.base.length === 0) {
          throw new Error('At least one item is required in Flashcard content.' + side);
        }
        (output.base.content ??= {})[side] = built.base;
        addSideFiles(files, side, built);
      }
      validate({ ...candidate, content: effective });
      output.locale = selectPublicationLocales(Object.keys(files).length ? files : undefined, languages);
      const result = structuredClone(output);
      validatePublication(props(options), languages, result);
      return result;
    } catch (error) {
      throw new Error(
        'Invalid Flashcard overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const result = {
    id,
    slug,
    type,
    content,
    validate,
    build: { props, overrides },
    config: {
      base,
      locales: () => ({
        parameters: { flags: copyAuthored().parameters.flags.map(flag => onlyLocales(flag)) },
      }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
}

export type Flashcard_Configurator = ConfiguratorChild<ReturnType<typeof defineFlashcard>>;
