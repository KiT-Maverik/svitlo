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
  validateSlugAddressedPublication,
  validateSluggedConfiguratorMap,
  type SafePlacementMap,
} from '../../_shared__configurators';
import { contentBlockTypes, type ContentBlock_Configurator } from '../../contentBlocks';
import {
  codingTaskSection_Metadata_Config_Schema,
  codingTaskSection_Config_Schema,
  codingTaskSection_Data_Schema,
  codingTaskSection_Override_Config_Schema,
  type CodingTaskSection_Config,
  type CodingTaskSection_DataBase,
  type CodingTaskSection_Locale,
  type CodingTaskSection_MetadataOverrides,
  type CodingTaskSection_Overrides,
} from './defineCodingTaskSection.schemas';

type Block = ContentBlock_Configurator;
type ChildResource = {
  base: Record<string, unknown>;
  locale: Partial<Record<LanguageCode, Record<string, unknown>>> | undefined;
};
type ChildPatch = {
  base: DeepPartial<Record<string, unknown>>;
  locale: Partial<Record<LanguageCode, Record<string, unknown>>> | undefined;
};
type LocaleBody = { locale?: DeepPartial<CodingTaskSection_Locale<'data'>>; [placement: string]: unknown };
type Files = Partial<Record<LanguageCode, LocaleBody>>;
type Publication<Base> = { base: Base; locale: Files | undefined };
type OverrideBase = {
  params?: CodingTaskSection_MetadataOverrides['params'];
  locale?: DeepPartial<CodingTaskSection_Locale<'data'>>;
  children?: string[];
  [placement: string]: unknown;
};
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const ownFields = new Set(['id', 'slug', 'type', 'params', 'locale', 'children']);
const directBlocks = (config: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(config).filter(([key]) => !ownFields.has(key)));


/** Each Section owns only the ContentBlock collection boundary, not child internals. */
const validate = (config: CodingTaskSection_Config): void => {
  const items = directBlocks(config);
  const parsed = codingTaskSection_Config_Schema.safeParse(config);
  const errors = [
    ...(!parsed.success ? parsed.error.issues.map(issue => issue.path.join('.') + ': ' + issue.message) : []),
    ...validateOrderedKeys({ items, order: config.children }, { path: 'children' }).map(issue => issue.message),
    ...validateSluggedConfiguratorMap(items, contentBlockTypes, {
      path: 'children', itemLabel: 'Section ContentBlock', reservedKeys: slugAddressedReservedKeys,
    }).map(issue => issue.message),
  ];
  const ids = new Set<string>();
  for (const [key, child] of Object.entries(items)) {
    if (!isRecord(child) || !isRecord(child.build) ||
        typeof child.build.data !== 'function' || typeof child.build.overrides !== 'function' ||
        !isRecord(child.config) || !isRecord(child.config.base) ||
        child.config.base.id !== child.id || child.config.base.slug !== key ||
        child.config.base.type !== child.type) {
      errors.push('Invalid Section ContentBlock Build API or identity: ' + key);
    }
    if (isRecord(child) && typeof child.id === 'string') {
      if (ids.has(child.id)) errors.push('Duplicate Section ContentBlock ID: ' + child.id);
      ids.add(child.id);
    }
  }
  
  if (errors.length) throw new Error('Section validation failed: ' + errors.join('; '));
};

type AuthoredInput<
  Slug extends string,
  Items extends Record<string, Block>,
  Languages extends readonly LanguageCode[],
> = Pick<CodingTaskSection_Config, 'id' | 'type' | 'params' | 'locale'> & {
  slug: Slug;
  children: Extract<keyof Items, string>[];
} & Items & ChildrenSupporting<Languages, Items> & SafePlacementMap<Items> &
  ConfigWithLanguages<CodingTaskSection_Config, Languages>;

/** Stateless Section authoring with direct ordered ContentBlock placements. */
export const defineCodingTaskSection = <
  const Slug extends string,
  const Items extends Record<string, Block>,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(config: AuthoredInput<Slug, Items, Languages>) => {
  const metadataSchema = codingTaskSection_Metadata_Config_Schema;
  const metadataInput = { id: config.id, slug: config.slug, type: config.type, params: config.params, locale: config.locale };
  const authored = structuredClone(metadataInput);
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id, slug, type } = authored;
  const initialItems = directBlocks(config) as unknown as Items;
  const initialOrder = [...config.children];

  const base = {
    id, slug, type,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  };

  const ownLocale = (input: DeepPartial<CodingTaskSection_Locale<'config'>>) => {
    const split = splitLocalizedFields(input);
    const files: Files = {};
    for (const [language, fields] of Object.entries(split.locale ?? {})) {
      files[language as LanguageCode] = { locale: fields as DeepPartial<CodingTaskSection_Locale<'data'>> };
    }
    return { invariant: split.base as DeepPartial<CodingTaskSection_Locale<'data'>>, files };
  };

  const buildBlocks = (
    items: Record<string, Block>,
    order: readonly string[],
    changes: Record<string, unknown> = {},
  ) => {
    const { languages } = requireBuildContext();
    const entries = order.map(key => {
      const child = items[key];
      if (!child) throw new Error('Missing ContentBlock: ' + key);
      const resource = buildChildData(child) as unknown as ChildResource;
      const patch = Object.hasOwn(changes, key)
        ? (buildChildOverrides(child, changes[key] as never) as unknown as ChildPatch)
        : undefined;
      return { key, resource, patch };
    });
    const base: Record<string, unknown> = {};
    const childPatches: Record<string, ChildPatch> = {};
    for (const { key, resource, patch } of entries) {
      base[key] = patch ? mergeForValidation(resource.base, patch.base) : resource.base;
      if (patch) childPatches[key] = patch;
    }
    const locale: Partial<Record<LanguageCode, Record<string, unknown>>> = {};
    for (const language of languages) {
      const fragments: Record<string, unknown> = {};
      for (const { key, resource, patch } of entries) {
        if (resource.locale?.[language] === undefined && patch?.locale?.[language] === undefined) continue;
        const translated = mergeForValidation(resource.base,
          (resource.locale?.[language] ?? {}) as DeepPartial<typeof resource.base>);
        const withPatch = patch ? mergeForValidation(translated, patch.base) : translated;
        fragments[key] = patch?.locale?.[language]
          ? mergeForValidation(withPatch, patch.locale[language])
          : withPatch;
      }
      if (Object.keys(fragments).length) locale[language] = fragments;
    }
    return { base, locale, childPatches };
  };

  const originalConfig = () => ({ ...copyAuthored(), children: [...initialOrder], ...initialItems });

  const data = (options: PublicationLanguageOptions<Languages>): Publication<CodingTaskSection_DataBase> => {
    const languages = resolvePublicationLanguages(options);
    validate(originalConfig());
    const metadata = copyAuthored();
    const own = ownLocale(metadata.locale);
    const children = buildBlocks(initialItems, initialOrder);
    const files = selectPublicationLocales(own.files, languages) ?? {};
    for (const [language, fragments] of Object.entries(children.locale)) {
      Object.assign((files[language as LanguageCode] ??= {}), fragments);
    }
    const result: Publication<CodingTaskSection_DataBase> = structuredClone({
      base: {
        id, slug, type,
        params: metadata.params,
        ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}),
        children: [...initialOrder],
        ...children.base,
      },
      locale: Object.keys(files).length ? files : undefined,
    });
    for (const language of languages) {
      const effective = mergeForValidation(result.base, result.locale?.[language] ?? {});
      const parsed = codingTaskSection_Data_Schema.parse(effective);
      
    }
    return result;
  };

  const overridesImplementation = <const Added extends Record<string, Block> = {}>(
    patch: CodingTaskSection_Overrides<Items, Added> & ChildrenSupporting<Languages, Added>,
    options: PublicationLanguageOptions<Languages>,
  ): Publication<OverrideBase> => {
    try {
      const languages = resolvePublicationLanguages(options);
      validate(originalConfig());
      if (!isRecord(patch)) throw new Error('Expected Section overrides object');
      const metadataPatch = codingTaskSection_Override_Config_Schema.parse(
        Object.fromEntries(Object.entries(patch).filter(([key]) => key === 'params' || key === 'locale')),
      );
      const mergedMetadata = metadataSchema.parse(mergeForValidation(copyAuthored(), metadataPatch));
      const own = ownLocale(metadataPatch.locale ?? {});
      const files = selectPublicationLocales(own.files, languages) ?? {};
      const output: Publication<OverrideBase> = {
        base: {
          ...(metadataPatch.params !== undefined ? { params: metadataPatch.params } : {}),
          ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}),
        },
        locale: undefined,
      };

      if (patch.children !== undefined && !Array.isArray(patch.children))
        throw new Error('children must be a replacement order array');
      const changes: Record<string, unknown> = {};
      const additions: Record<string, Block> = {};
      for (const [key, value] of Object.entries(patch)) {
        if (ownFields.has(key)) {
          if (key !== 'params' && key !== 'locale' && key !== 'children')
            throw new Error('Immutable Section override field: ' + key);
          continue;
        }
        if (Object.hasOwn(initialItems, key)) changes[key] = value;
        else additions[key] = value as Block;
      }
      const issues = validateSluggedConfiguratorMap(additions, contentBlockTypes, {
        path: 'children', itemLabel: 'Section ContentBlock', reservedKeys: slugAddressedReservedKeys,
      });
      if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
      const active: Record<string, Block | false> = { ...initialItems };
      const childPatches: Record<string, unknown> = {};
      let structureChanged = Object.keys(additions).length > 0;
      for (const [key, child] of Object.entries(additions)) {
        if (Object.hasOwn(initialItems, key)) throw new Error('Duplicate Section ContentBlock slug: ' + key);
        active[key] = child;
      }
      for (const [key, value] of Object.entries(changes)) {
        if (value === false) {
          active[key] = false;
          structureChanged = true;
        } else if (isRecord(value)) {
          childPatches[key] = value;
        } else {
          throw new Error('Section ContentBlock patch must be an object or false: ' + key);
        }
      }
      if (structureChanged && patch.children === undefined)
        throw new Error('children is required when adding or disabling ContentBlocks');
      const order = patch.children ?? initialOrder;
      const orderIssues = validateOrderedKeys({ items: active, order }, { path: 'children', allowDisabled: true });
      if (orderIssues.length) throw new Error(orderIssues.map(issue => issue.message).join('; '));
      const enabled = Object.fromEntries(
        Object.entries(active).filter((entry): entry is [string, Block] => entry[1] !== false),
      );
      validate({ ...mergedMetadata, children: [...order], ...enabled });
      const built = buildBlocks(enabled, order, childPatches);
      
      if (Object.keys(changes).length || Object.keys(additions).length || patch.children !== undefined) {
        if (structureChanged || patch.children !== undefined) output.base.children = [...order];
        for (const [key, value] of Object.entries(changes)) {
          output.base[key] = value === false ? false : (built.childPatches[key]?.base ?? {});
        }
        for (const key of Object.keys(additions)) output.base[key] = built.base[key];
        for (const language of languages) {
          const fragments: Record<string, unknown> = {};
          for (const key of Object.keys(changes)) {
            if (changes[key] === false) continue;
            const translated = built.childPatches[key]?.locale?.[language];
            if (translated !== undefined) fragments[key] = translated;
          }
          for (const key of Object.keys(additions)) {
            const translated = built.locale[language]?.[key];
            if (translated !== undefined) fragments[key] = translated;
          }
          if (Object.keys(fragments).length) Object.assign((files[language] ??= {}), fragments);
        }
      }
      output.locale = Object.keys(files).length ? files : undefined;
      const result = structuredClone(output);
      validateSlugAddressedPublication(codingTaskSection_Data_Schema, data(options), languages, result);
      return result;
    } catch (error) {
      throw new Error(
        'Invalid defineCodingTaskSection overrides for ' + id + ': ' +
          (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const overrides: {
    <const Added extends Record<string, Block>>(
      patch: CodingTaskSection_Overrides<Items, Added> & ChildrenSupporting<Languages, Added>,
      options: PublicationLanguageOptions<Languages>,
    ): Publication<OverrideBase>;
    (
      patch: CodingTaskSection_Overrides<Items, {}>,
      options: PublicationLanguageOptions<Languages>,
    ): Publication<OverrideBase>;
  } = overridesImplementation;

  const result = {
    id, slug, type,
    children: [...initialOrder],
    ...initialItems,
    validate,
    build: scopeBuild({ data, overrides }),
    config: {
      base,
      locales: (): { locale: DeepPartial<CodingTaskSection_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export type CodingTaskSection_Configurator = ReturnType<typeof defineCodingTaskSection>;
