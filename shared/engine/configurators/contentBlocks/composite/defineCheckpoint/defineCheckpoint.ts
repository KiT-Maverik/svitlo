import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type {
  ChildrenSupporting,
  ConfigWithLanguages,
  DeepPartial,
  LanguageScope,
  PublicationLanguageOptions,
} from '#types';

import {
  buildChildData,
  buildChildOverrides,
  mergeForValidation,
  onlyLocales,
  onlyStrings,
  requireBuildContext,
  resolvePublicationLanguages,
  scopeBuild,
  selectPublicationLocales,
  slugAddressedReservedKeys,
  splitLocalizedFields,
  validateOrderedKeys,
  validateRequestedPublication,
  validateSluggedConfiguratorMap,
  type SafePlacementMap,
} from '../../../_shared__configurators';
import {
  checkpoint_Metadata_Config_Schema,
  checkpoint_Config_Schema,
  checkpoint_Data_Schema,
  checkpoint_Override_Config_Schema,
  type Checkpoint_Metadata_Overrides,
  type Checkpoint_Overrides,
  type ContentBlock_Checkpoint_Config,
  type ContentBlock_Checkpoint_DataBase,
  type ContentBlock_Checkpoint_Locale,
} from './defineCheckpoint.schemas';
import type { ContentBlock_CheckpointItem_Configurator } from './defineCheckpointItem';

type CheckpointItem = ContentBlock_CheckpointItem_Configurator;
type ItemResource = {
  base: Record<string, unknown>;
  locale: Partial<Record<LanguageCode, Record<string, unknown>>> | undefined;
};
type ItemPatch = {
  base: DeepPartial<Record<string, unknown>>;
  locale: Partial<Record<LanguageCode, Record<string, unknown>>> | undefined;
};
type CheckpointLocaleBody = {
  locale?: DeepPartial<ContentBlock_Checkpoint_Locale<'data'>>;
  [placement: string]: unknown;
};
type CheckpointLocaleFiles = Partial<Record<LanguageCode, CheckpointLocaleBody>>;
type CheckpointPublication<Base> = { base: Base; locale: CheckpointLocaleFiles | undefined };
type CheckpointOverrideBase = {
  params?: Checkpoint_Metadata_Overrides['params'];
  locale?: DeepPartial<ContentBlock_Checkpoint_Locale<'data'>>;
  children?: string[];
  [placement: string]: unknown;
};
type CheckpointSubject = { id?: string; slug?: string; type?: string };

export type CheckpointValidationIssue = { check: string; path: string; message: string };
export type CheckpointValidationResult = {
  success: boolean;
  subject: CheckpointSubject;
  errors: CheckpointValidationIssue[];
};
export class CheckpointValidationError extends Error {
  constructor(readonly result: CheckpointValidationResult) {
    super('Checkpoint validation failed: ' + JSON.stringify(result));
    this.name = 'CheckpointValidationError';
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const ownFields = new Set(['id', 'slug', 'type', 'params', 'locale', 'children']);
const directItems = (config: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(config).filter(([key]) => !ownFields.has(key)));

/** Checkpoint owns Item order and identity, not the Item's question/answer internals. */
const validate = (config: ContentBlock_Checkpoint_Config): void => {
  const result: CheckpointValidationResult = {
    success: true,
    subject: { id: config?.id, slug: config?.slug, type: config?.type },
    errors: [],
  };
  const fail = (check: string, path: string, message: string) => {
    result.errors.push({ check, path, message });
  };
  const parsed = checkpoint_Config_Schema.safeParse(config);
  if (!parsed.success)
    for (const issue of parsed.error.issues) fail('metadata', issue.path.join('.'), issue.message);
  const items = isRecord(config) ? directItems(config) : {};
  for (const issue of validateOrderedKeys(
    { items, order: config?.children }, { path: 'children', requireNonEmpty: true },
  ))
    fail(issue.check, issue.path, issue.message);
  for (const issue of validateSluggedConfiguratorMap(items, ['checkpointItem'], {
    path: 'children', itemLabel: 'Checkpoint Item', reservedKeys: slugAddressedReservedKeys,
  }))
    fail(issue.check, issue.path, issue.message);
  if (!Array.isArray(config?.children) || !config.children.length)
    fail('children', 'children', 'At least one active Checkpoint item is required');
  const ids = new Set<string>();
  for (const [key, child] of Object.entries(items)) {
    if (!isRecord(child) || !isRecord(child.build) ||
        typeof child.build.data !== 'function' || typeof child.build.overrides !== 'function' ||
        !isRecord(child.config) || !isRecord(child.config.base) ||
        child.config.base.id !== child.id || child.config.base.slug !== key ||
        child.config.base.type !== child.type)
      fail('item', key, 'Invalid Checkpoint Item Build API or identity: ' + key);
    if (isRecord(child) && typeof child.id === 'string') {
      if (ids.has(child.id)) fail('id', key, 'Duplicate Checkpoint Item ID: ' + child.id);
      ids.add(child.id);
    }
  }
  result.success = result.errors.length === 0;
  if (!result.success) throw new CheckpointValidationError(result);
};

type AuthoredInput<
  Slug extends string,
  Items extends Record<string, CheckpointItem>,
  Languages extends readonly LanguageCode[],
> = Pick<ContentBlock_Checkpoint_Config, 'id' | 'type' | 'params' | 'locale'> & {
  slug: Slug;
  children: Extract<keyof Items, string>[];
} & Items & ChildrenSupporting<Languages, Items> & SafePlacementMap<Items> &
  ConfigWithLanguages<ContentBlock_Checkpoint_Config, Languages>;

/**
 * Knowledge Checkpoint embedded in a Section, not a scored Quiz.
 *
 * Its `children` order references direct `defineCheckpointItem` properties.
 * Only the last completed Item satisfies requireCompletion when enabled;
 * Item.check and enableChecks remain independent of the collection layout.
 */
export const defineCheckpoint = <
  const Slug extends string,
  const Items extends Record<string, CheckpointItem>,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(config: AuthoredInput<Slug, Items, Languages>) => {
  // Snapshot serializable metadata, retaining separate immutable child references.
  const authored = structuredClone({
    id: config.id, slug: config.slug, type: config.type,
    params: config.params, locale: config.locale,
  });
  const metadataSchema = checkpoint_Metadata_Config_Schema;
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id, slug, type } = authored;
  const initialItems = directItems(config) as unknown as Items;
  const initialOrder = [...config.children];
  const originalConfig = () => ({ ...copyAuthored(), children: [...initialOrder], ...initialItems });

  const base = {
    id, slug, type,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  };

  const ownLocale = (input: DeepPartial<ContentBlock_Checkpoint_Locale<'config'>>) => {
    const { base: invariant, locale } = splitLocalizedFields(input);
    const files: CheckpointLocaleFiles = {};
    for (const [language, fields] of Object.entries(locale ?? {}))
      files[language as LanguageCode] = {
        locale: fields as DeepPartial<ContentBlock_Checkpoint_Locale<'data'>>,
      };
    return {
      invariant: invariant as DeepPartial<ContentBlock_Checkpoint_Locale<'data'>>,
      files,
    };
  };

  const buildItems = (
    items: Record<string, CheckpointItem>,
    order: readonly string[],
    changes: Record<string, unknown> = {},
  ) => {
    const { languages } = requireBuildContext();
    const entries = order.map(key => {
      const child = items[key];
      if (!child) throw new Error('Missing Checkpoint Item: ' + key);
      const resource = buildChildData(child) as unknown as ItemResource;
      const patch = Object.hasOwn(changes, key)
        ? (buildChildOverrides(child, changes[key] as never) as unknown as ItemPatch)
        : undefined;
      return { key, resource, patch };
    });
    const base: Record<string, unknown> = {};
    const childPatches: Record<string, ItemPatch> = {};
    for (const { key, resource, patch } of entries) {
      base[key] = patch ? mergeForValidation(resource.base, patch.base) : resource.base;
      if (patch) childPatches[key] = patch;
    }
    const locale: Partial<Record<LanguageCode, Record<string, unknown>>> = {};
    for (const language of languages) {
      const fragments: Record<string, unknown> = {};
      for (const { key, resource, patch } of entries) {
        if (resource.locale?.[language] === undefined && patch?.locale?.[language] === undefined) continue;
        const translated = mergeForValidation(resource.base, resource.locale?.[language] ?? {});
        const withBase = patch ? mergeForValidation(translated, patch.base) : translated;
        fragments[key] = patch?.locale?.[language]
          ? mergeForValidation(withBase, patch.locale[language])
          : withBase;
      }
      if (Object.keys(fragments).length) locale[language] = fragments;
    }
    return { base, locale, childPatches };
  };

  const data = (options: PublicationLanguageOptions<Languages>): CheckpointPublication<ContentBlock_Checkpoint_DataBase> => {
    const languages = resolvePublicationLanguages(options);
    validate(originalConfig());
    const metadata = copyAuthored();
    const own = ownLocale(metadata.locale);
    const built = buildItems(initialItems, initialOrder);
    const files = selectPublicationLocales(own.files, languages) ?? {};
    for (const [language, fragments] of Object.entries(built.locale))
      Object.assign((files[language as LanguageCode] ??= {}), fragments);
    const output: CheckpointPublication<ContentBlock_Checkpoint_DataBase> = structuredClone({
      base: {
        id, slug, type,
        params: metadata.params,
        ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}),
        children: [...initialOrder],
        ...built.base,
      },
      locale: Object.keys(files).length ? files : undefined,
    });
    validateRequestedPublication(checkpoint_Data_Schema, output, languages);
    return output;
  };

  const overrides = <const Added extends Record<string, CheckpointItem> = {}>(
    patch: Checkpoint_Overrides<Items, Added> & ChildrenSupporting<Languages, Added>,
    options: PublicationLanguageOptions<Languages>,
  ): CheckpointPublication<CheckpointOverrideBase> => {
    try {
      const languages = resolvePublicationLanguages(options);
      validate(originalConfig());
      if (!isRecord(patch)) throw new Error('Expected a Checkpoint overrides object');
      const metadataPatch = checkpoint_Override_Config_Schema.parse(
        Object.fromEntries(Object.entries(patch).filter(([key]) => key === 'params' || key === 'locale')),
      );
      metadataSchema.parse(mergeForValidation(copyAuthored(), metadataPatch));
      const own = ownLocale(metadataPatch.locale ?? {});
      const files = selectPublicationLocales(own.files, languages) ?? {};
      const output: CheckpointPublication<CheckpointOverrideBase> = {
        base: {
          ...(metadataPatch.params !== undefined ? { params: metadataPatch.params } : {}),
          ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}),
        },
        locale: undefined,
      };

      if (patch.children !== undefined && !Array.isArray(patch.children))
        throw new Error('children must be a replacement order array');
      const changes: Record<string, unknown> = {};
      const additions: Record<string, CheckpointItem> = {};
      for (const [key, value] of Object.entries(patch)) {
        if (ownFields.has(key)) {
          if (key !== 'params' && key !== 'locale' && key !== 'children')
            throw new Error('Immutable Checkpoint override field: ' + key);
          continue;
        }
        if (Object.hasOwn(initialItems, key)) changes[key] = value;
        else additions[key] = value as CheckpointItem;
      }
      const issues = validateSluggedConfiguratorMap(additions, ['checkpointItem'], {
        path: 'children', itemLabel: 'Checkpoint Item', reservedKeys: slugAddressedReservedKeys,
      });
      if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
      const active: Record<string, CheckpointItem | false> = { ...initialItems };
      const childPatches: Record<string, unknown> = {};
      let structureChanged = Object.keys(additions).length > 0;
      for (const [key, child] of Object.entries(additions)) {
        if (Object.hasOwn(initialItems, key)) throw new Error('Duplicate Checkpoint item slug: ' + key);
        active[key] = child;
      }
      for (const [key, value] of Object.entries(changes)) {
        if (value === false) {
          active[key] = false;
          structureChanged = true;
        } else if (isRecord(value)) {
          childPatches[key] = value;
        } else {
          throw new Error('Checkpoint Item patch must be an object or false: ' + key);
        }
      }
      if (structureChanged && patch.children === undefined)
        throw new Error('children is required when adding or disabling Checkpoint Items');
      const order = patch.children ?? initialOrder;
      const orderIssues = validateOrderedKeys(
        { items: active, order }, { path: 'children', allowDisabled: true, requireNonEmpty: true },
      );
      if (orderIssues.length) throw new Error(orderIssues.map(issue => issue.message).join('; '));
      if (!order.length) throw new Error('At least one active Checkpoint item is required');
      const enabled = Object.fromEntries(
        Object.entries(active).filter((entry): entry is [string, CheckpointItem] => entry[1] !== false),
      );
      validate({ ...copyAuthored(), children: [...order], ...enabled });
      const built = buildItems(enabled, order, childPatches);

      if (Object.keys(changes).length || Object.keys(additions).length || patch.children !== undefined) {
        if (structureChanged || patch.children !== undefined) output.base.children = [...order];
        for (const [key, value] of Object.entries(changes))
          output.base[key] = value === false ? false : (built.childPatches[key]?.base ?? {});
        for (const key of Object.keys(additions)) output.base[key] = built.base[key];
        for (const language of languages) {
          const fragments: Record<string, unknown> = {};
          for (const key of Object.keys(additions))
            if (built.locale[language]?.[key] !== undefined) fragments[key] = built.locale[language][key];
          for (const key of Object.keys(childPatches)) {
            const translated = built.childPatches[key]?.locale?.[language];
            if (translated !== undefined) fragments[key] = translated;
          }
          Object.assign((files[language] ??= {}), fragments);
        }
      }
      output.locale = Object.keys(files).length ? files : undefined;

      // Resolve tombstones only for validation, including the Item's named
      // Answer role. The emitted patch remains sparse and addressable.
      const source = data(options);
      for (const language of languages) {
        const original = mergeForValidation(source.base, source.locale?.[language] ?? {});
        const withBase = mergeForValidation(original, output.base);
        const effective = mergeForValidation(withBase, output.locale?.[language] ?? {});
        if (!isRecord(effective)) throw new Error('Invalid Checkpoint Data');
        for (const [key, value] of Object.entries(output.base)) {
          if (value === false && !ownFields.has(key)) delete effective[key];
          if (isRecord(value) && isRecord(value.answer) && isRecord(effective[key])) {
            const item = { ...effective[key] };
            if (isRecord(item.answer)) {
              const answer = { ...item.answer };
              for (const [answerKey, answerPatch] of Object.entries(value.answer)) {
                if (answerPatch === false) delete answer[answerKey];
              }
              item.answer = answer;
              effective[key] = item;
            }
          }
        }
        checkpoint_Data_Schema.parse(effective);
      }
      return output;
    } catch (error) {
      throw new Error(
        'Invalid Checkpoint overrides for ' + id + ': ' +
          (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const result = {
    id, slug, type,
    children: [...initialOrder],
    ...initialItems,
    validate,
    build: scopeBuild({ data, overrides }),
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Checkpoint_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export type ContentBlock_Checkpoint_Configurator = ReturnType<typeof defineCheckpoint>;
