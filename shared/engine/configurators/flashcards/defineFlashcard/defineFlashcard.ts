import type { DeepPartial, LanguageScope, ChildrenSupporting, RequireLanguages } from '#types';
import type { LanguageCodes } from '#schemas';

import {
  mergeForValidation,
  onlyLocales,
  splitLocalizedFields,
  validateOrderedKeys,
  validateSluggedConfiguratorMap,
} from '../../_shared__configurators';
import { contentBlockTypes, type ContentBlock_Configurator } from '../../contentBlocks';
import {
  flashcard_Config_Schema,
  flashcardFlag_Config_Schema,
  flashcardRelationship_Schema,
  flashcard_Override_Metadata_Schema,
  type Flashcard_Config,
  type Flashcard_Flag_Config,
  type Flashcard_Relationship,
  type Flashcard_PropsBase,
  type Flashcard_Overrides,
} from './defineFlashcard.schemas';
import { z } from 'zod';

type Block = ContentBlock_Configurator;
type Side = 'front' | 'back' | 'hint';
type BlockResource = {
  base: Record<string, unknown>;
  locale: Partial<Record<LanguageCodes, Record<string, unknown>>> | undefined;
};
type BlockPatch = {
  base: DeepPartial<Record<string, unknown>>;
  locale: Partial<Record<LanguageCodes, Record<string, unknown>>> | undefined;
};
type FlagFragment = Flashcard_PropsBase['parameters']['flags'][number];
type LocaleBody = {
  parameters?: { flags?: FlagFragment[] };
  content?: Partial<Record<Side, Flashcard_PropsBase['content']['front']>>;
};
type Files = Partial<Record<LanguageCodes, LocaleBody>>;
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

const validate = (config: Flashcard_Config): void => {
  flashcard_Config_Schema.parse(config);
  for (const side of ['front', 'back', 'hint'] as const) {
    const collection = config.content?.[side];
    if (!collection && side === 'hint') continue;
    const path = 'content.' + side;
    const issues = [
      ...validateOrderedKeys(collection, { path, requireNonEmpty: side !== 'hint' }),
      ...validateSluggedConfiguratorMap(collection?.items, contentBlockTypes, {
        path: path + '.items', itemLabel: 'Flashcard ContentBlock',
      }),
    ];
    if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
    for (const [key, child] of Object.entries(collection.items)) {
      if (!isRecord(child) || !isRecord(child.build) ||
          typeof child.build.props !== 'function' || typeof child.build.overrides !== 'function' ||
          !isRecord(child.config?.base) || child.config.base.id !== child.id ||
          child.config.base.slug !== key || child.config.base.type !== child.type) {
        throw new Error('Invalid Flashcard ContentBlock Build API or identity: ' + key);
      }
    }
  }
  for (const name of ['flags', 'relationships'] as const) {
    const collection = config.parameters[name];
    if (!collection) continue;
    const issues = validateOrderedKeys(collection, { path: 'parameters.' + name });
    if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
  }
  const flags = new Set<string>();
  for (const flag of Object.values(config.parameters.flags.items)) {
    if (flag.type !== 'custom') {
      if (flags.has(flag.type)) throw new Error('Duplicate built-in Flashcard flag: ' + flag.type);
      flags.add(flag.type);
    }
  }
  const ids = new Set<string>();
  for (const relation of Object.values(config.parameters.relationships?.items ?? {})) {
    if (ids.has(relation.relationshipId)) throw new Error('Duplicate Flashcard relationship ID: ' + relation.relationshipId);
    ids.add(relation.relationshipId);
  }
};

/**
 * Apply one plain, named Flashcard collection patch.
 * Entries are JSON data, not configurators. The owning Config schema validates
 * each completed entry; patch field validation is derived from the original schema.
 */
const resolveNamed = (
  label: 'flags' | 'relationships',
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
    if (change === false) { enabled[key] = false; structureChanged = true; }
    else enabled[key] = parseUpdate(source.items[key] as Record<string, unknown>, change);
  }
  if (structureChanged && patch?.order === undefined) {
    throw new Error('parameters.' + label + '.order is required when adding or disabling items');
  }
  const order = patch?.order ?? source.order;
  const issues = validateOrderedKeys(
    { items: enabled, order }, { path: 'parameters.' + label, allowDisabled: true },
  );
  if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
  return {
    items: Object.fromEntries(Object.entries(enabled).filter((entry) => entry[1] !== false)),
    order: [...order],
    changed: patch !== undefined && (
      Object.keys(changes).length > 0 || Object.keys(additions).length > 0 || patch.order !== undefined
    ),
  };
};

/** Define a reusable, stateless Flashcard with three independently ordered ContentBlock sides. */
export function defineFlashcard<
  const Slug extends string,
  const Front extends Record<string, Block>,
  const Back extends Record<string, Block>,
  const Hint extends Record<string, Block> = {},
  const Flags extends Record<string, Flashcard_Flag_Config> = Record<string, Flashcard_Flag_Config>,
  const Relationships extends Record<string, Flashcard_Relationship> = Record<string, Flashcard_Relationship>,
  const Languages extends readonly LanguageCodes[] = [],
>(
  config: Omit<Flashcard_Config, 'slug' | 'content' | 'parameters'> & {
    slug: Slug;
    parameters: Omit<Flashcard_Config['parameters'], 'flags' | 'relationships'> & {
      flags: { items: Flags & RequireLanguages<Flags, Languages>; order: string[] };
      relationships?: { items: Relationships; order: string[] };
    };
    content: {
      front: { items: Front & ChildrenSupporting<Languages, Front>; order: string[] };
      back: { items: Back & ChildrenSupporting<Languages, Back>; order: string[] };
      hint?: { items: Hint & ChildrenSupporting<Languages, Hint>; order: string[] };
    };
  },
) {
  validate(config);
  const metadataSchema = flashcard_Config_Schema.omit({ content: true });
  const authored = structuredClone(metadataSchema.parse(config));
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id, type, slug } = authored;
  const initialContent = {
    front: { items: { ...config.content.front.items }, order: [...config.content.front.order] },
    back: { items: { ...config.content.back.items }, order: [...config.content.back.order] },
    ...(config.content.hint ? {
      hint: { items: { ...config.content.hint.items }, order: [...config.content.hint.order] },
    } : {}),
  };
  const content = {
    front: { items: { ...initialContent.front.items }, order: [...initialContent.front.order] },
    back: { items: { ...initialContent.back.items }, order: [...initialContent.back.order] },
    ...(initialContent.hint ? {
      hint: { items: { ...initialContent.hint.items }, order: [...initialContent.hint.order] },
    } : {}),
  };
  const base = {
    id, slug, type,
    parameters: structuredClone(authored.parameters),
  } satisfies DeepPartial<Flashcard_Config>;

  const buildSide = (
    items: Record<string, Block>,
    order: readonly string[],
    changes: Record<string, unknown> = {},
  ) => {
    const entries = order.map(key => {
      const child = items[key];
      const resource = child.build.props() as unknown as BlockResource;
      const patch = Object.hasOwn(changes, key)
        ? (child.build.overrides as (value: never) => BlockPatch)(changes[key] as never)
        : undefined;
      return { resource, patch };
    });
    const bases = entries.map(({ resource, patch }) =>
      patch ? mergeForValidation(resource.base, patch.base) : resource.base,
    ) as Flashcard_PropsBase['content']['front'];
    const languages = new Set<LanguageCodes>();
    for (const { resource, patch } of entries) {
      for (const code of Object.keys(resource.locale ?? {})) languages.add(code as LanguageCodes);
      for (const code of Object.keys(patch?.locale ?? {})) languages.add(code as LanguageCodes);
    }
    const locales: Partial<Record<LanguageCodes, Flashcard_PropsBase['content']['front']>> = {};
    for (const code of languages) {
      locales[code] = entries.map(({ resource, patch }) => {
        const first = mergeForValidation(
          resource.base, (resource.locale?.[code] ?? {}) as DeepPartial<typeof resource.base>,
        );
        const second = patch ? mergeForValidation(first, patch.base) : first;
        return patch?.locale?.[code] ? mergeForValidation(second, patch.locale[code]) : second;
      }) as Flashcard_PropsBase['content']['front'];
    }
    return { bases, locales };
  };

  const buildFlags = (flags: Flashcard_Config['parameters']['flags']) => {
    const entries = flags.order.map(key => splitLocalizedFields(flags.items[key]));
    const bases = entries.map(entry => entry.base) as FlagFragment[];
    const languages = new Set<LanguageCodes>();
    for (const entry of entries) for (const code of Object.keys(entry.locale ?? {})) languages.add(code as LanguageCodes);
    const locales: Partial<Record<LanguageCodes, FlagFragment[]>> = {};
    for (const code of languages) {
      locales[code] = entries.map(entry =>
        mergeForValidation(entry.base, (entry.locale?.[code] ?? {}) as DeepPartial<typeof entry.base>),
      ) as FlagFragment[];
    }
    return { bases, locales };
  };

  const buildRelationships = (relations: Flashcard_Config['parameters']['relationships']) =>
    relations?.order.map(key => structuredClone(relations.items[key]));

  const addSideFiles = (files: Files, side: Side, built: ReturnType<typeof buildSide>) => {
    for (const [code, values] of Object.entries(built.locales)) {
      ((files[code as LanguageCodes] ??= {}).content ??= {})[side] = values;
    }
  };
  const addFlagFiles = (files: Files, built: ReturnType<typeof buildFlags>) => {
    for (const [code, values] of Object.entries(built.locales)) {
      (files[code as LanguageCodes] ??= {}).parameters = { flags: values };
    }
  };

  const props = (): Publication<Flashcard_PropsBase> => {
    const source = copyAuthored();
    const files: Files = {};
    const front = buildSide(initialContent.front.items, initialContent.front.order);
    const back = buildSide(initialContent.back.items, initialContent.back.order);
    const hint = initialContent.hint && buildSide(initialContent.hint.items, initialContent.hint.order);
    const flags = buildFlags(source.parameters.flags);
    addSideFiles(files, 'front', front);
    addSideFiles(files, 'back', back);
    if (hint) addSideFiles(files, 'hint', hint);
    addFlagFiles(files, flags);
    return structuredClone({
      base: {
        id, slug, type,
        parameters: {
          ...source.parameters,
          flags: flags.bases,
          ...(source.parameters.relationships ? {
            relationships: buildRelationships(source.parameters.relationships),
          } : {}),
        },
        content: {
          front: front.bases, back: back.bases,
          ...(hint ? { hint: hint.bases } : {}),
        },
      },
      locale: Object.keys(files).length ? files : undefined,
    });
  };

  const overrides = <
    const AddedFront extends Record<string, Block> = {},
    const AddedBack extends Record<string, Block> = {},
    const AddedHint extends Record<string, Block> = {},
    const AddedFlags extends Record<string, Flashcard_Flag_Config> = {},
    const AddedRelationships extends Record<string, Flashcard_Relationship> = {},
  >(
    patch: Flashcard_Overrides<
      Front, Back, Hint, Flags, Relationships,
      AddedFront, AddedBack, AddedHint, AddedFlags, AddedRelationships
    > & {
      content?: {
        front?: { additionalItems?: AddedFront & ChildrenSupporting<Languages, AddedFront> };
        back?: { additionalItems?: AddedBack & ChildrenSupporting<Languages, AddedBack> };
        hint?: { additionalItems?: AddedHint & ChildrenSupporting<Languages, AddedHint> };
      };
    },
  ): Publication<OverrideBase> => {
    try {
      if (!isRecord(patch)) throw new Error('Expected a Flashcard overrides object');
      for (const key of Object.keys(patch)) {
        if (!['parameters', 'content'].includes(key)) throw new Error('Unknown Flashcard override field: ' + key);
      }
      if (patch.parameters !== undefined && !isRecord(patch.parameters)) throw new Error('parameters must be an object');
      for (const key of Object.keys(patch.parameters ?? {})) {
        if (!['disabled', 'tags', 'flags', 'relationships'].includes(key)) {
          throw new Error('Unknown Flashcard parameter override field: ' + key);
        }
      }
      const metadataPatch = flashcard_Override_Metadata_Schema.parse({
        parameters: Object.fromEntries(
          Object.entries(patch.parameters ?? {}).filter(([key]) => key !== 'flags' && key !== 'relationships'),
        ),
      });
      const candidate = copyAuthored();
      const newParams = mergeForValidation(candidate.parameters, metadataPatch.parameters ?? {});
      const output: Publication<OverrideBase> = {
        base: { ...(Object.keys(metadataPatch.parameters ?? {}).length ? {
          parameters: metadataPatch.parameters,
        } : {}) },
        locale: undefined,
      };
      const files: Files = {};
      const flagChange = patch.parameters?.flags as NamedPatch | undefined;
      const flagSource = candidate.parameters.flags;
      const flags = resolveNamed(
        'flags', flagSource, flagChange,
        (value) => flashcardFlag_Config_Schema.parse(value),
        (previous, value) => {
          if (!isRecord(value)) throw new Error('Flag patch must be an object');
          const branch = flashcardFlag_Config_Schema.options.find(
            option => option.shape.type.safeParse(previous.type).success,
          );
          if (!branch) throw new Error('Unknown Flashcard flag type');
          const sparse = z.deepPartial(branch.omit({ type: true }).strict()).parse(value);
          return flashcardFlag_Config_Schema.parse(mergeForValidation(previous, sparse));
        },
      );
      newParams.flags = flags as Flashcard_Config['parameters']['flags'];
      if (flags.changed) {
        const built = buildFlags(newParams.flags);
        (output.base.parameters ??= {}).flags = built.bases;
        addFlagFiles(files, built);
      }
      const relationshipChange = patch.parameters?.relationships as NamedPatch | undefined;
      const relationships = resolveNamed(
        'relationships', candidate.parameters.relationships ?? { items: {}, order: [] },
        relationshipChange,
        value => flashcardRelationship_Schema.parse(value),
        (previous, value) => {
          const sparse = z.deepPartial(
            flashcardRelationship_Schema.omit({ relationshipId: true, type: true }).strict(),
          ).parse(value);
          return flashcardRelationship_Schema.parse(mergeForValidation(previous, sparse));
        },
      );
      newParams.relationships = (
        candidate.parameters.relationships || relationships.changed
          ? relationships as Flashcard_Config['parameters']['relationships']
          : undefined
      );
      if (relationships.changed) {
        (output.base.parameters ??= {}).relationships = buildRelationships(newParams.relationships);
      }
      candidate.parameters = newParams;
      if (patch.content !== undefined && !isRecord(patch.content)) throw new Error('content must be an object');
      for (const key of Object.keys(patch.content ?? {})) {
        if (!['front', 'back', 'hint'].includes(key)) throw new Error('Unknown Flashcard content side: ' + key);
      }
      const effective: Flashcard_Config['content'] = {
        front: initialContent.front, back: initialContent.back,
        ...(initialContent.hint ? { hint: initialContent.hint } : {}),
      };
      for (const side of ['front', 'back', 'hint'] as const) {
        const change = patch.content?.[side];
        if (change === undefined) continue;
        if (!isRecord(change)) throw new Error('content.' + side + ' must be an object');
        for (const key of Object.keys(change)) {
          if (!['items', 'additionalItems', 'order'].includes(key)) {
            throw new Error('Unknown Flashcard content.' + side + ' override field: ' + key);
          }
        }
        const current = initialContent[side] ?? { items: {}, order: [] };
        const changes = change.items ?? {};
        const additions = change.additionalItems ?? {};
        if (!isRecord(changes) || !isRecord(additions)) {
          throw new Error('Flashcard content.' + side + ' needs keyed maps');
        }
        const issues = validateSluggedConfiguratorMap(additions, contentBlockTypes, {
          path: 'content.' + side + '.additionalItems', itemLabel: 'Flashcard ContentBlock',
        });
        if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
        const enabled: Record<string, Block | false> = { ...current.items };
        const patches: Record<string, unknown> = {};
        let structureChanged = Object.keys(additions).length > 0;
        for (const [key, child] of Object.entries(additions)) {
          if (Object.hasOwn(current.items, key)) throw new Error('Duplicate Flashcard ContentBlock slug: ' + key);
          if (!isRecord(child) || !isRecord(child.build) ||
              typeof child.build.props !== 'function' || typeof child.build.overrides !== 'function' ||
              !isRecord(child.config?.base) || child.config.base.id !== child.id ||
              child.config.base.type !== child.type || child.config.base.slug !== key) {
            throw new Error('New Flashcard ContentBlock must expose a valid Build API: ' + key);
          }
          enabled[key] = child as Block;
        }
        for (const [key, value] of Object.entries(changes)) {
          if (!Object.hasOwn(current.items, key)) throw new Error('Unknown existing Flashcard ContentBlock: ' + key);
          if (value === false) { enabled[key] = false; structureChanged = true; }
          else {
            if (!isRecord(value)) throw new Error('Flashcard child patch must be an object or false: ' + key);
            patches[key] = value;
          }
        }
        if (structureChanged && change.order === undefined) {
          throw new Error('content.' + side + '.order is required when adding or disabling items');
        }
        const order = change.order ?? current.order;
        const orderIssues = validateOrderedKeys(
          { items: enabled, order }, { path: 'content.' + side, allowDisabled: true, requireNonEmpty: side !== 'hint' },
        );
        if (orderIssues.length) throw new Error(orderIssues.map(issue => issue.message).join('; '));
        const active = Object.fromEntries(
          Object.entries(enabled).filter((entry): entry is [string, Block] => entry[1] !== false),
        );
        effective[side] = { items: active, order: [...order] };
        if (Object.keys(changes).length || Object.keys(additions).length || change.order !== undefined) {
          const built = buildSide(active, order, patches);
          (output.base.content ??= {})[side] = built.bases;
          addSideFiles(files, side, built);
        }
      }
      validate({ ...candidate, content: effective });
      output.locale = Object.keys(files).length ? files : undefined;
      return structuredClone(output);
    } catch (error) {
      throw new Error(
        'Invalid Flashcard overrides for ' + id + ': ' +
          (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const result = {
    id, slug, type, content, validate,
    build: { props, overrides },
    config: {
      base,
      locales: () => ({
        parameters: { flags: { items: onlyLocales(copyAuthored().parameters.flags.items) } },
      }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
}

export type Flashcard_Configurator = ReturnType<typeof defineFlashcard>;
