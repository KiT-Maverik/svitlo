import type { DeepPartial, ConfigWithLanguages, LanguageScope, ChildrenSupporting, PublicationLanguageOptions } from '#types';
import type { LanguageCodes } from '#schemas';
import {
  mergeForValidation,
  resolvePublicationLanguages,
  selectPublicationLocales,
  onlyLocales,
  onlyStrings,
  splitLocalizedFields,
  validateOrderedKeys,
  validateSluggedConfiguratorMap,
} from '../../_shared__configurators';
import { contentBlockTypes, type ContentBlock_Configurator } from '../../contentBlocks';
import {
  contentSection_Config_Schema,
  contentSection_Override_Config_Schema,
  type Content_Section_Config,
  type ContentSection_Locale,
  type ContentSection_Overrides,
  type ContentSection_PropsBase,
  type ContentSection_MetadataOverrides,
} from './defineContentSection.schemas';

type Block = ContentBlock_Configurator;
type ChildResource = {
  base: Record<string, unknown>;
  locale: Partial<Record<LanguageCodes, Record<string, unknown>>> | undefined;
};
type ChildPatch = {
  base: DeepPartial<Record<string, unknown>>;
  locale: Partial<Record<LanguageCodes, Record<string, unknown>>> | undefined;
};
type LocaleBody = { locale?: DeepPartial<ContentSection_Locale<'props'>>; content?: ContentSection_PropsBase['content'] };
type Files = Partial<Record<LanguageCodes, LocaleBody>>;
type Publication<Base> = { base: Base; locale: Files | undefined };
type OverrideBase = {
  params?: ContentSection_MetadataOverrides['params'];
  locale?: DeepPartial<ContentSection_Locale<'props'>>;
  content?: ContentSection_PropsBase['content'];
};
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const validate = (config: Content_Section_Config): void => {
  contentSection_Config_Schema.parse(config);
  const issues = [
    ...validateOrderedKeys(config.content, { path: 'content' }),
    ...validateSluggedConfiguratorMap(config.content?.items, contentBlockTypes, {
      path: 'content.items', itemLabel: 'ContentBlock',
    }),
  ];
  if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
  for (const [key, child] of Object.entries(config.content.items)) {
    if (!isRecord(child) || !isRecord(child.build) ||
        typeof child.build.props !== 'function' || typeof child.build.overrides !== 'function' ||
        !isRecord(child.config?.base) || child.config.base.id !== child.id ||
        child.config.base.type !== child.type || child.config.base.slug !== key) {
      throw new Error('Invalid Section ContentBlock Build API or identity: ' + key);
    }
  }
};

/** Stateless Section authoring with ordered ContentBlock children. */
export const defineContentSection = <
  const Slug extends string,
  const Items extends Record<string, Block>,
  const Languages extends readonly LanguageCodes[] = [],
>(
  config: Omit<Content_Section_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: { items: Items & ChildrenSupporting<Languages, Items>; order: string[] };
  } & ConfigWithLanguages<Content_Section_Config, Languages>,
) => {
  validate(config);
  // Metadata is copied; children hold independent, immutable authoring snapshots.
  const metadataSchema = contentSection_Config_Schema.omit({ content: true });
  const authored = structuredClone(metadataSchema.parse(config));
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id, type, slug } = authored;
  const initialItems: Items = { ...config.content.items };
  const initialOrder = [...config.content.order];
  const content = { items: { ...initialItems }, order: [...initialOrder] };

  const base = {
    id, slug, type,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  } satisfies DeepPartial<Content_Section_Config>;

  const ownLocale = (input: DeepPartial<ContentSection_Locale<'config'>>) => {
    const split = splitLocalizedFields(input);
    const files: Files = {};
    for (const [language, fields] of Object.entries(split.locale ?? {})) {
      files[language as LanguageCodes] = { locale: fields as DeepPartial<ContentSection_Locale<'props'>> };
    }
    return { invariant: split.base as DeepPartial<ContentSection_Locale<'props'>>, files };
  };

  const buildContent = (
    items: Record<string, Block>,
    order: readonly string[],
    languages: readonly LanguageCodes[],
    patches: Record<string, unknown> = {},
  ) => {
    const entries = order.map(key => {
      const child = items[key];
      const resource = child.build.props() as unknown as ChildResource;
      const patch = Object.hasOwn(patches, key)
        ? (child.build.overrides as (value: never) => ChildPatch)(patches[key] as never)
        : undefined;
      return { resource, patch };
    });
    const bases = entries.map(({ resource, patch }) =>
      patch ? mergeForValidation(resource.base, patch.base) : resource.base,
    ) as ContentSection_PropsBase['content'];
    const locales: Partial<Record<LanguageCodes, ContentSection_PropsBase['content']>> = {};
    for (const language of languages) {
      if (!entries.some(({ resource, patch }) => resource.locale?.[language] !== undefined || patch?.locale?.[language] !== undefined)) continue;
      locales[language] = entries.map(({ resource, patch }) => {
        const withResourceLocale = mergeForValidation(
          resource.base, (resource.locale?.[language] ?? {}) as DeepPartial<typeof resource.base>,
        );
        const withPatchBase = patch ? mergeForValidation(withResourceLocale, patch.base) : withResourceLocale;
        return patch?.locale?.[language]
          ? mergeForValidation(withPatchBase, patch.locale[language])
          : withPatchBase;
      }) as ContentSection_PropsBase['content'];
    }
    return { bases, locales };
  };

  const props = (options: PublicationLanguageOptions<Languages>): Publication<ContentSection_PropsBase> => {
    const languages = resolvePublicationLanguages(options);
    const metadata = copyAuthored();
    const own = ownLocale(metadata.locale);
    const children = buildContent(initialItems, initialOrder, languages);
    const files = selectPublicationLocales(own.files, languages) ?? {};
    for (const [language, entries] of Object.entries(children.locales)) {
      (files[language as LanguageCodes] ??= {}).content = entries;
    }
    return structuredClone({
      base: {
        id, slug, type, params: metadata.params,
        ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}),
        content: children.bases,
      },
      locale: Object.keys(files).length ? files : undefined,
    });
  };

  const overrides = <const Added extends Record<string, Block> = {}>(
    patch: ContentSection_Overrides<Items, Added> & {
      content?: { additionalItems?: Added & ChildrenSupporting<Languages, Added> };
    },
    options: PublicationLanguageOptions<Languages>,
  ): Publication<OverrideBase> => {
    try {
      const languages = resolvePublicationLanguages(options);
      if (!isRecord(patch)) throw new Error('Expected an overrides object');
      for (const key of Object.keys(patch)) {
        if (!['params', 'locale', 'content'].includes(key)) {
          throw new Error('Unknown Section override field: ' + key);
        }
      }
      const metadataPatch = contentSection_Override_Config_Schema.parse(
        Object.fromEntries(Object.entries(patch).filter(([key]) => key !== 'content')),
      );
      const candidate = metadataSchema.parse(mergeForValidation(copyAuthored(), metadataPatch));
      const own = ownLocale(metadataPatch.locale ?? {});
      const output: Publication<OverrideBase> = {
        base: {
          ...(metadataPatch.params !== undefined ? { params: metadataPatch.params } : {}),
          ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}),
        },
        locale: undefined,
      };
      const files = selectPublicationLocales(own.files, languages) ?? {};
      if (patch.content !== undefined && !isRecord(patch.content)) {
        throw new Error('content must be an object');
      }
      for (const key of Object.keys(patch.content ?? {})) {
        if (!['items', 'additionalItems', 'order'].includes(key)) {
          throw new Error('Unknown Section content override field: ' + key);
        }
      }
      const changes = patch.content?.items ?? {};
      const additions = patch.content?.additionalItems ?? {};
      if (!isRecord(changes)) throw new Error('content.items must be an object');
      if (!isRecord(additions)) throw new Error('content.additionalItems must be an object');
      const addedIssues = validateSluggedConfiguratorMap(additions, contentBlockTypes, {
        path: 'content.additionalItems', itemLabel: 'ContentBlock',
      });
      if (addedIssues.length) throw new Error(addedIssues.map(issue => issue.message).join('; '));

      const active: Record<string, Block | false> = { ...initialItems };
      const childPatches: Record<string, unknown> = {};
      let structureChanged = Object.keys(additions).length > 0;
      for (const [key, child] of Object.entries(additions)) {
        if (Object.hasOwn(initialItems, key)) throw new Error('Duplicate Section ContentBlock slug: ' + key);
        if (!isRecord(child) || !isRecord(child.build) ||
            typeof child.build.props !== 'function' || typeof child.build.overrides !== 'function' ||
            !isRecord(child.config?.base) || child.config.base.id !== child.id ||
            child.config.base.type !== child.type || child.config.base.slug !== key) {
          throw new Error('New Section ContentBlock must expose a valid Build API: ' + key);
        }
        active[key] = child as Block;
      }
      for (const [key, change] of Object.entries(changes)) {
        if (!Object.hasOwn(initialItems, key)) throw new Error('Unknown existing Section ContentBlock: ' + key);
        if (change === false) { active[key] = false; structureChanged = true; }
        else {
          if (!isRecord(change)) throw new Error('Section ContentBlock patch must be an object or false: ' + key);
          childPatches[key] = change;
        }
      }
      if (structureChanged && patch.content?.order === undefined) {
        throw new Error('content.order is required when adding or disabling Section ContentBlocks');
      }
      const order = patch.content?.order ?? initialOrder;
      const issues = validateOrderedKeys(
        { items: active, order }, { path: 'content', allowDisabled: true },
      );
      if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
      const enabled = Object.fromEntries(
        Object.entries(active).filter((entry): entry is [string, Block] => entry[1] !== false),
      );
      // Parent semantic invariants (notably Quiz screen references) must use the active collection.
      validate({ ...candidate, content: { items: enabled, order: [...order] } });
      if (Object.keys(changes).length || Object.keys(additions).length || patch.content?.order !== undefined) {
        const built = buildContent(enabled, order, languages, childPatches);
        output.base.content = built.bases;
        for (const [language, entries] of Object.entries(built.locales)) {
          (files[language as LanguageCodes] ??= {}).content = entries;
        }
      }
      output.locale = Object.keys(files).length ? files : undefined;
      return structuredClone(output);
    } catch (error) {
      throw new Error(
        'Invalid defineContentSection overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const result = {
    id, slug, type, content, validate,
    build: { props, overrides },
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentSection_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export type ContentSection_Configurator = ReturnType<typeof defineContentSection>;
