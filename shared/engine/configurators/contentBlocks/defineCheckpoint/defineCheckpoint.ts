import type {
  DeepPartial,
  ConfigWithLanguages,
  LanguageScope,
  ChildrenSupporting,
  PublicationLanguageOptions,
} from '#types';
import type { LanguageCodes } from '#schemas';

import {
  mergeForValidation,
  resolvePublicationLanguages,
  selectPublicationLocales,
  validateRequestedPublication,
  onlyLocales,
  onlyStrings,
  splitLocalizedFields,
  validateOrderedKeys,
  validateSluggedConfiguratorMap,
} from '../../_shared__configurators';
import type {
  ContentBlock_CheckpointItem_Configurator,
  ContentBlock_CheckpointItem_Props,
} from './defineCheckpointItem';
import {
  checkpoint_Config_Schema,
  checkpoint_Props_Schema,
  checkpoint_Override_Config_Schema,
  type Checkpoint_Metadata_Overrides,
  type Checkpoint_Overrides,
  type ContentBlock_Checkpoint_Config,
  type ContentBlock_Checkpoint_Locale,
  type ContentBlock_Checkpoint_PropsBase,
} from './defineCheckpoint.schemas';

type CheckpointItem = ContentBlock_CheckpointItem_Configurator;
type ItemResource = ReturnType<CheckpointItem['build']['props']>;
type ItemOverride = ReturnType<CheckpointItem['build']['overrides']>;
type CheckpointLocaleBody = {
  locale?: DeepPartial<ContentBlock_Checkpoint_Locale<'props'>>;
  content?: ContentBlock_CheckpointItem_Props[];
};
type CheckpointLocaleFiles = Partial<Record<LanguageCodes, CheckpointLocaleBody>>;
type CheckpointPublication<Base> = { base: Base; locale: CheckpointLocaleFiles | undefined };
type CheckpointOverrideBase = {
  params?: Checkpoint_Metadata_Overrides['params'];
  locale?: DeepPartial<ContentBlock_Checkpoint_Locale<'props'>>;
  content?: ContentBlock_Checkpoint_PropsBase['content'];
};
type CheckpointSubject = { id?: string; slug?: string; type?: string };

export type CheckpointValidationIssue = {
  check: string;
  path: string;
  message: string;
};

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

const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/** Validate Checkpoint metadata and collection boundaries, not child internals. */
const validate = (config: ContentBlock_Checkpoint_Config): void => {
  const result: CheckpointValidationResult = {
    success: true,
    subject: { id: config?.id, slug: config?.slug, type: config?.type },
    errors: [],
  };
  const fail = (check: string, path: string, message: string) => {
    result.errors.push({ check, path, message });
  };

  const metadata = checkpoint_Config_Schema.safeParse(config);
  if (!metadata.success) {
    for (const issue of metadata.error.issues) {
      fail('metadata', issue.path.join('.'), issue.message);
    }
  }

  const content = config?.content;
  for (const issue of validateOrderedKeys(content, { path: 'content', requireNonEmpty: true })) {
    fail(issue.check, issue.path, issue.message);
  }

  if (isObject(content) && isObject(content.items) && Array.isArray(content.order)) {
    if (!content.order.length) {
      fail('order', 'content.order', 'At least one active Checkpoint item is required');
    }
    for (const issue of validateSluggedConfiguratorMap(content.items, ['checkpointItem'], {
      path: 'content.items',
      itemLabel: 'Checkpoint item',
    })) {
      fail(issue.check, issue.path, issue.message);
    }
    for (const [key, child] of Object.entries(content.items)) {
      if (
        !isObject(child) ||
        !isObject(child.build) ||
        typeof child.build.props !== 'function' ||
        typeof child.build.overrides !== 'function'
      ) {
        fail('item', 'content.items.' + key, 'Checkpoint item must expose the Build API');
      }
    }
  }

  result.success = result.errors.length === 0;
  if (!result.success) throw new CheckpointValidationError(result);
};

/** Define a Checkpoint with an ordered collection of CheckpointItem configurators. */
export const defineCheckpoint = <
  const Slug extends string,
  const Items extends Record<string, CheckpointItem>,
  const Languages extends readonly LanguageCodes[] = [],
>(
  config: Omit<ContentBlock_Checkpoint_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: { items: Items & ChildrenSupporting<Languages, Items>; order: string[] };
  } & ConfigWithLanguages<ContentBlock_Checkpoint_Config, Languages>,
) => {
  validate(config);
  // Snapshot only serializable metadata. Children are immutable configurator references.
  const metadataSchema = checkpoint_Config_Schema.omit({ content: true });
  const authored = metadataSchema.parse(config);
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id, type } = authored;
  const slug = config.slug;
  const initialItems: Items = { ...config.content.items };
  const initialOrder = [...config.content.order];
  // Transitional read-only-by-convention access for existing authoring consumers.
  const content = { items: { ...initialItems }, order: [...initialOrder] };

  const base = {
    id,
    slug,
    type,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  } satisfies DeepPartial<ContentBlock_Checkpoint_Config>;

  const splitOwnLocale = (input: DeepPartial<ContentBlock_Checkpoint_Locale<'config'>>) => {
    const { base: invariant, locale } = splitLocalizedFields(input);
    const files: CheckpointLocaleFiles = {};
    for (const [language, fields] of Object.entries(locale ?? {})) {
      files[language as LanguageCodes] = {
        locale: fields as DeepPartial<ContentBlock_Checkpoint_Locale<'props'>>,
      };
    }
    return {
      invariant: invariant as DeepPartial<ContentBlock_Checkpoint_Locale<'props'>>,
      files,
    };
  };

  /**
   * Arrays are atomic: build complete, ordered child Props for each affected language.
   * Every child fragment already uses the final Props paths.
   */
  const buildContent = (
    items: Record<string, CheckpointItem>,
    order: readonly string[],
    languages: readonly LanguageCodes[],
    patches: Record<string, unknown> = {},
  ) => {
    const entries = order.map(key => {
      const child = items[key];
      const resource = child.build.props({ languages });
      const patch = Object.hasOwn(patches, key)
        ? (child.build.overrides as (patch: never, options: PublicationLanguageOptions) => ItemOverride)(
            patches[key] as never,
            { languages },
          )
        : undefined;
      return { resource, patch };
    });
    const bases: ItemResource['base'][] = entries.map(({ resource, patch }) =>
      patch
        ? mergeForValidation<ItemResource['base']>(resource.base, patch.base as DeepPartial<ItemResource['base']>)
        : resource.base,
    );

    const translatedLanguages = languages.filter(language =>
      entries.some(
        ({ resource, patch }) => resource.locale?.[language] !== undefined || patch?.locale?.[language] !== undefined,
      ),
    );

    const locales: Partial<Record<LanguageCodes, ContentBlock_CheckpointItem_Props[]>> = {};
    for (const language of translatedLanguages) {
      locales[language] = entries.map(({ resource, patch }) => {
        const original = mergeForValidation(
          resource.base,
          (resource.locale?.[language] ?? {}) as DeepPartial<typeof resource.base>,
        );
        const withPatchBase = patch
          ? mergeForValidation(original, patch.base as DeepPartial<typeof resource.base>)
          : original;
        const translatedPatch = patch?.locale?.[language];
        return (
          translatedPatch
            ? mergeForValidation(withPatchBase, translatedPatch as DeepPartial<typeof resource.base>)
            : withPatchBase
        ) as ContentBlock_CheckpointItem_Props;
      });
    }
    return { bases, locales };
  };

  const props = (
    options: PublicationLanguageOptions<Languages>,
  ): CheckpointPublication<ContentBlock_Checkpoint_PropsBase> => {
    const languages = resolvePublicationLanguages(options);
    const metadata = copyAuthored();
    const own = splitOwnLocale(metadata.locale);
    const built = buildContent(initialItems, initialOrder, languages);
    const files = selectPublicationLocales(own.files, languages) ?? {};
    for (const [language, entries] of Object.entries(built.locales)) {
      (files[language as LanguageCodes] ??= {}).content = entries;
    }
    const result = {
      base: {
        id,
        slug,
        type,
        params: metadata.params,
        ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}),
        content: built.bases,
      },
      locale: Object.keys(files).length ? files : undefined,
    };
    validateRequestedPublication(checkpoint_Props_Schema, result, languages);
    return result;
  };

  const overrides = <const Added extends Record<string, CheckpointItem> = {}>(
    patch: Checkpoint_Overrides<Items, Added> & {
      content?: { additionalItems?: Added & ChildrenSupporting<Languages, Added> };
    },
    options: PublicationLanguageOptions<Languages>,
  ): CheckpointPublication<CheckpointOverrideBase> => {
    try {
      const languages = resolvePublicationLanguages(options);
      if (!isObject(patch)) throw new Error('Expected an overrides object');
      for (const key of Object.keys(patch)) {
        if (!['params', 'locale', 'content'].includes(key)) {
          throw new Error('Unknown Checkpoint override field: ' + key);
        }
      }
      const metadataPatch = checkpoint_Override_Config_Schema.parse(
        Object.fromEntries(Object.entries(patch).filter(([key]) => key !== 'content')),
      );
      // Validate metadata against the effective authored candidate, but publish only the patch.
      metadataSchema.parse(mergeForValidation(copyAuthored(), metadataPatch));
      const own = splitOwnLocale(metadataPatch.locale ?? {});
      const output: CheckpointPublication<CheckpointOverrideBase> = {
        base: {
          ...(metadataPatch.params !== undefined ? { params: metadataPatch.params } : {}),
          ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}),
        },
        locale: undefined,
      };
      const files = selectPublicationLocales(own.files, languages) ?? {};

      if (patch.content !== undefined && !isObject(patch.content)) {
        throw new Error('content must be an object');
      }
      if (patch.content) {
        for (const key of Object.keys(patch.content)) {
          if (!['items', 'additionalItems', 'order'].includes(key)) {
            throw new Error('Unknown Checkpoint content override field: ' + key);
          }
        }
      }
      const changes = patch.content?.items ?? {};
      if (!isObject(changes)) throw new Error('content.items must be a slug-keyed object');
      const additions = patch.content?.additionalItems ?? {};
      if (!isObject(additions)) throw new Error('content.additionalItems must be a slug-keyed configurator map');

      const addedIssues = validateSluggedConfiguratorMap(additions, ['checkpointItem'], {
        path: 'content.additionalItems',
        itemLabel: 'Checkpoint item',
      });
      if (addedIssues.length) throw new Error(addedIssues.map(issue => issue.message).join('; '));

      const active: Record<string, CheckpointItem | false> = { ...initialItems };
      const childPatches: Record<string, unknown> = {};
      let structureChanged = Object.keys(additions).length > 0;
      for (const [key, child] of Object.entries(additions)) {
        if (Object.hasOwn(initialItems, key)) throw new Error('Duplicate Checkpoint item slug: ' + key);
        if (
          !isObject(child) ||
          !isObject(child.build) ||
          typeof child.build.props !== 'function' ||
          typeof child.build.overrides !== 'function'
        ) {
          throw new Error('New Checkpoint item must expose the Build API: ' + key);
        }
        active[key] = child as CheckpointItem;
      }
      for (const [key, change] of Object.entries(changes)) {
        if (!Object.hasOwn(initialItems, key)) {
          throw new Error('Cannot override an unknown existing Checkpoint item: ' + key);
        }
        if (change === false) {
          active[key] = false;
          structureChanged = true;
        } else {
          if (!isObject(change)) throw new Error('Checkpoint item overrides must be objects or false: ' + key);
          childPatches[key] = change;
        }
      }

      if (structureChanged && patch.content?.order === undefined) {
        throw new Error('content.order is required when adding or disabling Checkpoint items');
      }
      const order = patch.content?.order ?? initialOrder;
      const issues = validateOrderedKeys(
        { items: active, order },
        { path: 'content', allowDisabled: true, requireNonEmpty: true },
      );
      if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
      if (!order.length) throw new Error('At least one active Checkpoint item is required');

      const modifiesContent =
        Object.keys(changes).length > 0 || Object.keys(additions).length > 0 || patch.content?.order !== undefined;
      if (modifiesContent) {
        const enabled = Object.fromEntries(
          Object.entries(active).filter((entry): entry is [string, CheckpointItem] => entry[1] !== false),
        );
        const built = buildContent(enabled, order, languages, childPatches);
        output.base.content = built.bases;
        for (const [language, entries] of Object.entries(built.locales)) {
          (files[language as LanguageCodes] ??= {}).content = entries;
        }
      }

      output.locale = Object.keys(files).length ? files : undefined;
      validateRequestedPublication(checkpoint_Props_Schema, props(options), languages, output);
      return output;
    } catch (error) {
      throw new Error(
        'Invalid Checkpoint overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
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
      locales: (): { locale: DeepPartial<ContentBlock_Checkpoint_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export type ContentBlock_Checkpoint_Configurator = ReturnType<typeof defineCheckpoint>;
