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
  buildChildData,
  buildChildOverrides,
  mergeForValidation,
  onlyLocales,
  resolvePublicationLanguages,
  scopeBuild,
  selectPublicationLocales,
  slugAddressedReservedKeys,
  splitLocalizedFields,
  validateOrderedKeys,
  type AddedPlacementsFromPatch,
} from '../../_shared__configurators';
import type { ConfiguratorChild } from '../../../types/configuratorChild';
import type { ContentBlock_Primitive_Configurator } from '../../contentBlocks';
import { defineFlashcardSide, type FlashcardSide_Configurator } from '../defineFlashcardSide/defineFlashcardSide';
import { flashcardSideConfigurator_Schema } from '../defineFlashcardSide/defineFlashcardSide.schemas';
import {
  flashcard_Config_Schema,
  flashcard_Data_Schema,
  flashcard_Override_Metadata_Schema,
  flashcardFlag_Config_Schema,
  flashcardRelationship_Schema,
  type Flashcard_Config,
  type Flashcard_DataBase,
  type Flashcard_Flag_Config,
  type Flashcard_Overrides,
  type Flashcard_Relationship,
} from './defineFlashcard.schemas';

type Block = ContentBlock_Primitive_Configurator;
type Side = 'front' | 'back' | 'hint';
type AddedSideFromPatch<Patch, Items extends Record<string, Block>, Role extends Side> = Patch extends {
  content: { [Key in Role]: infer SidePatch };
}
  ? AddedPlacementsFromPatch<SidePatch, Items, Block, 'children'>
  : {};
type AddedRelationshipsFromPatch<Patch, Relationships extends Record<string, Flashcard_Relationship>> = Patch extends {
  parameters: { relationships: infer Group };
}
  ? AddedPlacementsFromPatch<Group, Relationships, Flashcard_Relationship, 'children'>
  : {};
type SidePublication = {
  base: Flashcard_DataBase['content']['front'];
  locale: Partial<Record<LanguageCode, Flashcard_DataBase['content']['front']>> | undefined;
};
type FlagFragment = Flashcard_DataBase['parameters']['flags'][number];
type LocaleBody = {
  parameters?: { flags?: FlagFragment[] };
  content?: Partial<Record<Side, Flashcard_DataBase['content']['front']>>;
};
type Files = Partial<Record<LanguageCode, LocaleBody>>;
type Publication<Base> = { base: Base; locale: Files | undefined };
type OverrideBase = {
  parameters?: DeepPartial<Flashcard_DataBase['parameters']>;
  content?: Partial<Flashcard_DataBase['content']>;
};
type NamedInput = { children: string[] } & Record<string, unknown>;
type NamedPatch = { children?: string[] } & Record<string, unknown>;
const isValidRelationshipKey = (key: string): boolean =>
  /^[a-z][A-Za-z0-9]*$/.test(key) && !slugAddressedReservedKeys.some(reserved => reserved === key);

const relationItems = (source: NamedInput): Record<string, unknown> =>
  Object.fromEntries(Object.entries(source).filter(([key]) => key !== 'children'));
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/** A complete side publication replaces the ordered group, not its individual keys. */
const mergeSideLayers = (original: Record<string, unknown>, changes: Record<string, unknown>) => {
  const merged = mergeForValidation(original, changes);
  if (isRecord(changes.content) && isRecord(merged.content)) {
    for (const side of ['front', 'back', 'hint'] as const) {
      if (isRecord(changes.content[side]) && Array.isArray(changes.content[side].children)) {
        merged.content[side] = structuredClone(changes.content[side]);
      }
    }
  }
  if (
    isRecord(changes.parameters) &&
    isRecord(merged.parameters) &&
    Object.hasOwn(changes.parameters, 'relationships')
  ) {
    merged.parameters.relationships = structuredClone(changes.parameters.relationships);
  }
  return merged;
};

/** Ensure each selected locale can resolve every required semantic Side. */
const validatePublication = (
  resource: Publication<unknown>,
  languages: readonly LanguageCode[],
  patch?: Publication<unknown>,
): void => {
  for (const language of languages) {
    const original = mergeSideLayers(
      resource.base as Record<string, unknown>,
      (resource.locale?.[language] ?? {}) as Record<string, unknown>,
    );
    const withPatch = patch ? mergeSideLayers(original, patch.base as Record<string, unknown>) : original;
    const effective = patch
      ? mergeSideLayers(withPatch, (patch.locale?.[language] ?? {}) as Record<string, unknown>)
      : withPatch;
    try {
      flashcard_Data_Schema.parse(effective);
    } catch (error) {
      throw new Error(
        'Invalid Flashcard Data for language ' +
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
    const relationships = config.parameters.relationships as NamedInput;
    const issues = validateOrderedKeys(
      { items: relationItems(relationships), order: relationships.children },
      { path: 'parameters.relationships' },
    );
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
  for (const [key, value] of Object.entries(
    config.parameters.relationships ? relationItems(config.parameters.relationships as NamedInput) : {},
  )) {
    if (!isValidRelationshipKey(key)) throw new Error('Invalid Flashcard relationship slug: ' + key);
    const relation = flashcardRelationship_Schema.parse(value);
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
  const original = relationItems(source);
  const active: Record<string, unknown | false> = { ...original };
  let structureChanged = false;
  for (const [key, change] of Object.entries(patch ?? {})) {
    if (key === 'children') continue;
    if (!isValidRelationshipKey(key)) {
      throw new Error('Invalid Flashcard ' + label + ' slug: ' + key);
    }
    if (Object.hasOwn(original, key)) {
      if (change === false) {
        active[key] = false;
        structureChanged = true;
      } else active[key] = parseUpdate(original[key] as Record<string, unknown>, change);
    } else {
      active[key] = parseItem(change);
      structureChanged = true;
    }
  }
  if (structureChanged && patch?.children === undefined) {
    throw new Error('parameters.' + label + '.children is required when adding or disabling items');
  }
  const children = patch?.children ?? source.children;
  if (!Array.isArray(children)) throw new Error('parameters.' + label + '.children must be an array');
  const issues = validateOrderedKeys(
    { items: active, order: children },
    { path: 'parameters.' + label, allowDisabled: true },
  );
  if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
  const members = Object.fromEntries(Object.entries(active).filter(([, value]) => value !== false));
  return {
    collection: { children: [...children], ...members },
    changed: patch !== undefined && Object.keys(patch).length > 0,
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
 * `relatedFlashcardId` (not by placement key). Choose a semantic relationship:
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
      relationships?: { children: Extract<keyof Relationships, string>[] } & Relationships;
    };
    content: {
      front: FlashcardSide_Configurator<Front, Languages> & Front & ChildrenSupporting<Languages, Front>;
      back: FlashcardSide_Configurator<Back, Languages> & Back & ChildrenSupporting<Languages, Back>;
      hint?: FlashcardSide_Configurator<Hint, Languages> & Hint & ChildrenSupporting<Languages, Hint>;
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
  ): SidePublication => buildChildData(side) as SidePublication;

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
    relations ? structuredClone(relations) : undefined;

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

  const data = (options: PublicationLanguageOptions<Languages>): Publication<Flashcard_DataBase> => {
    const languages = resolvePublicationLanguages(options);
    validate({ ...copyAuthored(), content: initialContent });
    const source = copyAuthored();
    const files: Files = {};
    const front = buildSide(initialContent.front);
    const back = buildSide(initialContent.back);
    const hint = initialContent.hint && buildSide(initialContent.hint);
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

  const overridesImplementation = <
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
        front?: AddedFront & ChildrenSupporting<Languages, AddedFront>;
        back?: AddedBack & ChildrenSupporting<Languages, AddedBack>;
        hint?: AddedHint & ChildrenSupporting<Languages, AddedHint>;
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
        (candidate.parameters.relationships ?? { children: [] }) as NamedInput,
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
        candidate.parameters.relationships || relationships.changed ? relationships.collection : undefined;
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
        const current = initialContent[side] ?? defineFlashcardSide<{}, Languages>({ children: [] });
        const built = buildChildOverrides(current, change as never) as SidePublication;
        if (side !== 'hint' && Array.isArray(built.base.children) && built.base.children.length === 0) {
          throw new Error('At least one item is required in Flashcard content.' + side);
        }
        if (Object.keys(built.base).length) {
          (output.base.content ??= {})[side] = built.base;
        }
        addSideFiles(files, side, built);
      }
      validate({ ...candidate, content: effective });
      output.locale = selectPublicationLocales(Object.keys(files).length ? files : undefined, languages);
      const result = structuredClone(output);
      validatePublication(data(options), languages, result);
      return result;
    } catch (error) {
      throw new Error(
        'Invalid Flashcard overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const overrides: {
    <const Patch extends Record<string, unknown>>(
      patch: Patch &
        Flashcard_Overrides<
          Front,
          Back,
          Hint,
          Relationships,
          AddedSideFromPatch<Patch, Front, 'front'>,
          AddedSideFromPatch<Patch, Back, 'back'>,
          AddedSideFromPatch<Patch, Hint, 'hint'>,
          AddedRelationshipsFromPatch<Patch, Relationships>
        > & {
          content?: {
            front?: ChildrenSupporting<Languages, AddedSideFromPatch<Patch, Front, 'front'>>;
            back?: ChildrenSupporting<Languages, AddedSideFromPatch<Patch, Back, 'back'>>;
            hint?: ChildrenSupporting<Languages, AddedSideFromPatch<Patch, Hint, 'hint'>>;
          };
        },
      options: PublicationLanguageOptions<Languages>,
    ): Publication<OverrideBase>;
    (
      patch: Flashcard_Overrides<Front, Back, Hint, Relationships>,
      options: PublicationLanguageOptions<Languages>,
    ): Publication<OverrideBase>;
  } = overridesImplementation;

  const result = {
    id,
    slug,
    type,
    content,
    validate,
    build: scopeBuild({ data, overrides }),
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
