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
import { selectQuizQuestionIds } from '../../../assemblers/assessmentResources/assessmentResources';
import {
  quizSection_Metadata_Config_Schema,
  quizSection_Config_Schema,
  quizSection_Data_Schema,
  quizSection_Override_Config_Schema,
  type QuizSection_Config,
  type QuizSection_DataBase,
  type QuizSection_Locale,
  type QuizSection_MetadataOverrides,
  type QuizSection_Overrides,
} from './defineQuizSection.schemas';

type Block = ContentBlock_Configurator;
type ChildResource = {
  base: Record<string, unknown>;
  locale: Partial<Record<LanguageCode, Record<string, unknown>>> | undefined;
};
type ChildPatch = {
  base: DeepPartial<Record<string, unknown>>;
  locale: Partial<Record<LanguageCode, Record<string, unknown>>> | undefined;
};
type LocaleBody = { locale?: DeepPartial<QuizSection_Locale<'data'>>; [placement: string]: unknown };
type Files = Partial<Record<LanguageCode, LocaleBody>>;
type Publication<Base> = { base: Base; locale: Files | undefined };
type OverrideBase = {
  params?: QuizSection_MetadataOverrides['params'];
  locale?: DeepPartial<QuizSection_Locale<'data'>>;
  children?: string[];
  [placement: string]: unknown;
};
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const ownFields = new Set(['id', 'slug', 'type', 'params', 'locale', 'children']);
const directBlocks = (config: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(config).filter(([key]) => !ownFields.has(key)));

/** Preserve Quiz grading and selection invariants independently of content placement. */
const validateGrading = (grading: QuizSection_Config['params']['grading']): void => {
  if (grading?.mode === 'percentage' && grading.successThreshold > 100)
    throw new Error('Quiz percentage successThreshold must be between 0 and 100');
};
const validateScreenReferences = (
  screen: QuizSection_Config['params']['screen'],
  activeSlugs: ReadonlySet<string>,
  disabledSlugs: ReadonlySet<string>,
): void => {
  const screens = [
    ['starting', screen?.starting],
    ['ending.success', screen?.ending?.success],
    ['ending.fail', screen?.ending?.fail],
    ['ending.retry', screen?.ending?.retry],
  ] as const;
  for (const [location, entry] of screens) {
    for (const slug of entry?.content ?? []) {
      if (!activeSlugs.has(slug))
        throw new Error('Quiz screen references unknown ContentBlock: ' + slug + ' (' + location + ')');
      if (disabledSlugs.has(slug))
        throw new Error('Quiz screen ' + location + ' references disabled ContentBlock: ' + slug);
    }
  }
};

/** Each Section owns only the ContentBlock collection boundary, not child internals. */
const validate = (config: QuizSection_Config): void => {
  const items = directBlocks(config);
  const parsed = quizSection_Config_Schema.safeParse(config);
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
  if (parsed.success) {
    validateGrading(parsed.data.params.grading);
    selectQuizQuestionIds(parsed.data.params.selection, parsed.data.id);
    const disabled = new Set(
      Object.entries(items).filter(([, value]) =>
        isRecord(value) && isRecord(value.config) && isRecord(value.config.base) &&
        isRecord(value.config.base.params) && value.config.base.params.disabled === true,
      ).map(([key]) => key),
    );
    validateScreenReferences(parsed.data.params.screen, new Set(Object.keys(items)), disabled);
  }
  if (errors.length) throw new Error('Section validation failed: ' + errors.join('; '));
};

type AuthoredInput<
  Slug extends string,
  Items extends Record<string, Block>,
  Languages extends readonly LanguageCode[],
> = Pick<QuizSection_Config, 'id' | 'type' | 'params' | 'locale'> & {
  slug: Slug;
  children: Extract<keyof Items, string>[];
} & Items & ChildrenSupporting<Languages, Items> & SafePlacementMap<Items> &
  ConfigWithLanguages<QuizSection_Config, Languages>;

/** Infer authored block slugs without treating Quiz metadata as child blocks. */
type QuizBlockKeys<Input> = Exclude<keyof Input, 'id' | 'slug' | 'type' | 'params' | 'locale' | 'children'>;
type InferredQuizBlocks<Input> = {
  [Key in QuizBlockKeys<Input>]: Input[Key] extends Block ? Input[Key] : Block;
};

/** Stateless Section authoring with direct ordered ContentBlock placements. */
const defineQuizSectionImpl = <
  const Slug extends string,
  const Items extends Record<string, Block>,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(config: AuthoredInput<Slug, Items, Languages>) => {
  const metadataSchema = quizSection_Metadata_Config_Schema;
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

  const ownLocale = (input: DeepPartial<QuizSection_Locale<'config'>>) => {
    const split = splitLocalizedFields(input);
    const files: Files = {};
    for (const [language, fields] of Object.entries(split.locale ?? {})) {
      files[language as LanguageCode] = { locale: fields as DeepPartial<QuizSection_Locale<'data'>> };
    }
    return { invariant: split.base as DeepPartial<QuizSection_Locale<'data'>>, files };
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

  const data = (options: PublicationLanguageOptions<Languages>): Publication<QuizSection_DataBase> => {
    const languages = resolvePublicationLanguages(options);
    validate(originalConfig());
    const metadata = copyAuthored();
    const own = ownLocale(metadata.locale);
    const children = buildBlocks(initialItems, initialOrder);
    const files = selectPublicationLocales(own.files, languages) ?? {};
    for (const [language, fragments] of Object.entries(children.locale)) {
      Object.assign((files[language as LanguageCode] ??= {}), fragments);
    }
    const result: Publication<QuizSection_DataBase> = structuredClone({
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
      const parsed = quizSection_Data_Schema.parse(effective);
      validateGrading(parsed.params.grading);
      selectQuizQuestionIds(parsed.params.selection, parsed.id);
    }
    return result;
  };

  const overridesImplementation = <const Added extends Record<string, Block> = {}>(
    patch: QuizSection_Overrides<Items, Added> & ChildrenSupporting<Languages, Added>,
    options: PublicationLanguageOptions<Languages>,
  ): Publication<OverrideBase> => {
    try {
      const languages = resolvePublicationLanguages(options);
      validate(originalConfig());
      if (!isRecord(patch)) throw new Error('Expected Section overrides object');
      const metadataPatch = quizSection_Override_Config_Schema.parse(
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
      const effectiveDisabled = new Set(
        Object.entries(built.base).filter(([, value]) =>
          isRecord(value) && isRecord(value.params) && value.params.disabled === true)
          .map(([key]) => key),
      );
      validateScreenReferences(mergedMetadata.params.screen, new Set(order), effectiveDisabled);
      validateGrading(mergedMetadata.params.grading);
      selectQuizQuestionIds(mergedMetadata.params.selection, id);
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
      validateSlugAddressedPublication(quizSection_Data_Schema, data(options), languages, result);
      return result;
    } catch (error) {
      throw new Error(
        'Invalid defineQuizSection overrides for ' + id + ': ' +
          (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  /**
   * Keep a non-generic existing-child call signature as the last overload.
   * An unspecialized generic Added map otherwise becomes Record<string, never>
   * when Parameters<> inspects a nested concrete Configurator.
   */
  const overrides: {
    <const Added extends Record<string, Block>>(
      patch: QuizSection_Overrides<Items, Added> & ChildrenSupporting<Languages, Added>,
      options: PublicationLanguageOptions<Languages>,
    ): Publication<OverrideBase>;
    (
      patch: QuizSection_Overrides<Items, {}>,
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
      locales: (): { locale: DeepPartial<QuizSection_Locale<'config'>> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

/** Preserve both literal-inferred and explicitly parameterized Quiz Sections. */
export const defineQuizSection: {
  <const Input extends Pick<QuizSection_Config, 'id' | 'slug' | 'type' | 'params' | 'locale'> & {
    children: string[];
  }>(
    config: Input & AuthoredInput<Input['slug'], InferredQuizBlocks<Input>, AllLanguageCodes>,
  ): ReturnType<typeof defineQuizSectionImpl<
    Input['slug'], InferredQuizBlocks<Input>, AllLanguageCodes
  >>;
  <
    const Slug extends string,
    const Items extends Record<string, Block>,
    const Languages extends readonly LanguageCode[] = AllLanguageCodes,
  >(
    config: AuthoredInput<Slug, Items, Languages>,
  ): ReturnType<typeof defineQuizSectionImpl<Slug, Items, Languages>>;
} = defineQuizSectionImpl;

/**
 * Widen only the parent-facing collection boundary. A concrete Section has
 * literal child keys and a narrowed language scope; the baseline public type
 * must not require a never[] child order or an all-language Build input.
 * At the authoring site typeof defineQuizSection(...) retains its full
 * Build signature and the actual child-key/locale constraints.
 */
type QuizSectionBase = ReturnType<typeof defineQuizSectionImpl<string, {}, AllLanguageCodes>>;
export type QuizSection_Configurator = Omit<
  QuizSectionBase, 'children' | '__svitloLanguageScope' | 'build'
> & {
  readonly children: readonly string[];
  readonly __svitloLanguageScope: readonly LanguageCode[];
  readonly build: Omit<QuizSectionBase['build'], 'data' | 'overrides'> & {
    data(options: PublicationLanguageOptions): ReturnType<QuizSectionBase['build']['data']>;
    overrides(patch: never, options: PublicationLanguageOptions): ReturnType<QuizSectionBase['build']['overrides']>;
  };
};
