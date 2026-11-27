import type { LanguageCode } from '#schemas';
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
import { sectionTypes, type Section_Configurator } from '../../sections';
import {
  lesson_Metadata_Config_Schema,
  lesson_Config_Schema,
  lesson_Data_Schema,
  lesson_Override_Metadata_Schema,
  type Lesson_Config,
  type Lesson_DataBase,
  type Lesson_Metadata_Config,
  type Lesson_Overrides,
} from './defineLesson.schemas';

type SectionResource = {
  base: Record<string, unknown>;
  locale: Partial<Record<LanguageCode, Record<string, unknown>>> | undefined;
};
type SectionBuild = {
  build: {
    data(options: PublicationLanguageOptions): SectionResource;
    overrides(patch: never, options: PublicationLanguageOptions): SectionResource;
  };
};
type LocaleBody = { locale?: { title?: string }; [placement: string]: unknown };
type Files = Partial<Record<LanguageCode, LocaleBody>>;
type Publication<Base> = { base: Base; locale: Files | undefined };
type OverrideBase = {
  params?: DeepPartial<Omit<Lesson_Config['params'], 'languages'>>;
  locale?: { title?: string };
  children?: string[];
  events?: Record<string, unknown>;
  [placement: string]: unknown;
};
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

// Skills and events are Lesson-owned metadata, not Section slugs. Other
// metadata keys are also excluded from the direct child-placement map.
const ownFields = new Set(['id', 'slug', 'type', 'params', 'locale', 'children', 'skills', 'events']);
const directSections = (config: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(config).filter(([key]) => !ownFields.has(key)));
const extraReserved = new Set<string>([...slugAddressedReservedKeys, 'skills', 'events']);

const validate = (config: Lesson_Config): void => {
  if (Object.hasOwn(config, 'programId')) {
    throw new Error('Lesson must not declare programId; Course ownership is defined by authoring composition');
  }
  const sections = directSections(config);
  const parsed = lesson_Config_Schema.safeParse(config);
  const errors = [
    ...(!parsed.success ? parsed.error.issues.map(issue => issue.path.join('.') + ': ' + issue.message) : []),
    ...validateOrderedKeys({ items: sections, order: config.children }, { path: 'children' }).map(issue => issue.message),
    ...validateSluggedConfiguratorMap(sections, sectionTypes, {
      path: 'children',
      itemLabel: 'Lesson Section',
      reservedKeys: [...extraReserved],
    }).map(issue => issue.message),
  ];
  const ids = new Set<string>();
  for (const [key, child] of Object.entries(sections)) {
    if (
      !isRecord(child) ||
      !isRecord(child.build) ||
      typeof child.build.data !== 'function' ||
      typeof child.build.overrides !== 'function' ||
      !isRecord(child.config) ||
      !isRecord(child.config.base) ||
      child.config.base.id !== child.id ||
      child.config.base.slug !== key ||
      child.config.base.type !== child.type
    ) {
      errors.push('Invalid Lesson Section Build API or identity: ' + key);
    }
    if (isRecord(child) && typeof child.id === 'string') {
      if (ids.has(child.id)) errors.push('Duplicate Lesson Section ID: ' + child.id);
      ids.add(child.id);
    }
  }
  if (config.params.quizRequiredForCompletion &&
      !config.children.some(key => {
        const section = sections[key];
        if (!isRecord(section) || section.type !== 'quiz' ||
            !isRecord(section.config) || !isRecord(section.config.base)) return false;
        const params = section.config.base.params;
        return !isRecord(params) || params.disabled !== true;
      })) {
    errors.push('Lesson requires at least one enabled Quiz section');
  }
  if (errors.length) throw new Error('Lesson validation failed: ' + errors.join('; '));
};

type LessonAuthoredInput<
  Slug extends string,
  Languages extends readonly LanguageCode[],
  Sections extends Record<string, Section_Configurator>,
> = Omit<Lesson_Metadata_Config, 'slug' | 'params' | 'locale'> & {
  slug: Slug;
  params: Omit<Lesson_Config['params'], 'languages'> & { languages: Languages };
  locale: RequireLanguages<Lesson_Config['locale'], Languages>;
  children: Extract<keyof Sections, string>[];
} & Sections & ChildrenSupporting<Languages, Sections> &
  SafePlacementMap<Sections> & { [Key in keyof Sections]: Key extends 'events' ? never : Sections[Key] };


/**
 * Infer child keys from the entire authoring literal before validating the
 * placement map. An unconstrained Record<string, Section> inferred from an
 * intersection would incorrectly classify id/params as Section children.
 */
type LessonChildKeys<Input> = Exclude<keyof Input, keyof Lesson_Metadata_Config | 'children'>;
type InferredLessonSections<Input> = {
  [Key in LessonChildKeys<Input>]: Input[Key] extends Section_Configurator
    ? Input[Key]
    : Section_Configurator;
};
type InferredLessonLanguages<Input extends { params: { languages: readonly LanguageCode[] } }> =
  Input['params']['languages'] extends readonly [LanguageCode, ...LanguageCode[]]
    ? Input['params']['languages']
    : readonly [LanguageCode, ...LanguageCode[]];

/**
 * Author a reusable, Course-neutral Lesson with ordered instructional Sections.
 * Quiz and Flashcards Sections hold stable bank UUID references, not inline
 * bank resources. Event metadata remains separate from direct Section placements.
 */
const defineLessonImpl = <
  const Slug extends string,
  const Languages extends readonly [LanguageCode, ...LanguageCode[]],
  const Sections extends Record<string, Section_Configurator>,
>(
  config: LessonAuthoredInput<Slug, Languages, Sections>,
) => {
  const metadataSchema = lesson_Metadata_Config_Schema;
  const metadataInput = {
    id: config.id,
    slug: config.slug,
    type: config.type,
    skills: [...config.skills],
    params: config.params,
    locale: config.locale,
    ...(config.events === undefined ? {} : { events: config.events }),
  };
  const authored = structuredClone(metadataInput);
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id, slug, type } = authored;
  const initialSections = directSections(config) as unknown as Sections;
  const initialOrder = [...config.children];

  const configBase = {
    id, slug, type,
    skills: [...authored.skills],
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
    ...(authored.events !== undefined ? { events: structuredClone(authored.events) } : {}),
  };

  const splitLocale = (value: DeepPartial<Lesson_Config['locale']>) => {
    const split = splitLocalizedFields(value);
    const files: Files = {};
    for (const [language, fields] of Object.entries(split.locale ?? {})) {
      files[language as LanguageCode] = { locale: fields as LocaleBody['locale'] };
    }
    return { invariant: split.base as { title?: string }, files };
  };

  const buildSections = (
    items: Record<string, Section_Configurator>,
    order: readonly string[],
    patches: Record<string, unknown> = {},
  ) => {
    const { languages } = requireBuildContext();
    const entries = order.map(key => {
      const child = items[key];
      if (!child) throw new Error('Unknown Lesson Section: ' + key);
      const build = (child as unknown as SectionBuild).build;
      const resource = buildChildData({ build });
      const patch = Object.hasOwn(patches, key) ? buildChildOverrides({ build }, patches[key] as never) : undefined;
      return { key, resource, patch };
    });
    const base: Record<string, unknown> = {};
    const childPatches: Record<string, SectionResource> = {};
    for (const { key, resource, patch } of entries) {
      base[key] = patch ? mergeForValidation(resource.base, patch.base) : resource.base;
      if (patch) childPatches[key] = patch;
    }
    const locale: Partial<Record<LanguageCode, Record<string, unknown>>> = {};
    for (const language of languages) {
      const fragments: Record<string, unknown> = {};
      for (const { key, resource, patch } of entries) {
        if (resource.locale?.[language] === undefined && patch?.locale?.[language] === undefined) continue;
        const translated = mergeForValidation(
          resource.base,
          (resource.locale?.[language] ?? {}) as DeepPartial<typeof resource.base>,
        );
        const withBasePatch = patch ? mergeForValidation(translated, patch.base) : translated;
        fragments[key] = patch?.locale?.[language]
          ? mergeForValidation(withBasePatch, patch.locale[language])
          : withBasePatch;
      }
      if (Object.keys(fragments).length) locale[language] = fragments;
    }
    return { base, locale, childPatches };
  };

  const publicationLanguages = (options: PublicationLanguageOptions<Languages>) => {
    const languages = resolvePublicationLanguages(options);
    for (const language of languages) {
      if (!authored.params.languages.includes(language))
        throw new Error('Lesson does not support publication language: ' + language);
    }
    return languages;
  };

  const originalConfig = () => ({
    ...copyAuthored(), children: [...initialOrder], ...initialSections,
  });

  const data = (options: PublicationLanguageOptions<Languages>): Publication<Lesson_DataBase> => {
    const languages = publicationLanguages(options);
    validate(originalConfig());
    const own = copyAuthored();
    const translated = splitLocale(own.locale);
    const sections = buildSections(initialSections, initialOrder);
    const files = selectPublicationLocales(translated.files, languages) ?? {};
    for (const [language, values] of Object.entries(sections.locale)) {
      Object.assign((files[language as LanguageCode] ??= {}), values);
    }
    const result: Publication<Lesson_DataBase> = structuredClone({
      base: {
        id, slug, type,
        skills: [...own.skills],
        params: { ...own.params, languages: [...languages] },
        ...(Object.keys(translated.invariant).length ? { locale: translated.invariant } : {}),
        ...(own.events !== undefined ? { events: own.events } : {}),
        children: [...initialOrder],
        ...sections.base,
      },
      locale: Object.keys(files).length ? files : undefined,
    });
    for (const language of languages) {
      lesson_Data_Schema.parse(
        mergeForValidation(result.base, result.locale?.[language] ?? {}),
      );
    }
    return result;
  };

  const overridesImplementation = <const Added extends Record<string, Section_Configurator> = {}>(
    patch: Lesson_Overrides<Sections, Added> & ChildrenSupporting<Languages, Added>,
    options: PublicationLanguageOptions<Languages>,
  ): Publication<OverrideBase> & Pick<Lesson_Metadata_Config, 'id'> => {
    try {
      const languages = publicationLanguages(options);
      validate(originalConfig());
      if (!isRecord(patch)) throw new Error('Expected Lesson overrides object');
      const metadataPatch = lesson_Override_Metadata_Schema.parse(
        Object.fromEntries(Object.entries(patch).filter(([key]) =>
          key === 'params' || key === 'locale' || key === 'events')),
      );
      const mergedMetadata = metadataSchema.parse(mergeForValidation<Record<string, unknown>>(
        copyAuthored() as Record<string, unknown>,
        metadataPatch as Record<string, unknown>,
      ));
      const own = splitLocale(metadataPatch.locale ?? {});
      const files = selectPublicationLocales(own.files, languages) ?? {};
      const output: Publication<OverrideBase> = {
        base: {
          ...(metadataPatch.params !== undefined ? { params: metadataPatch.params } : {}),
          ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}),
          ...(metadataPatch.events !== undefined ? { events: metadataPatch.events } : {}),
        },
        locale: undefined,
      };

      if (patch.children !== undefined && !Array.isArray(patch.children))
        throw new Error('Lesson children must be an ordered array');
      const changes: Record<string, unknown> = {};
      const additions: Record<string, Section_Configurator> = {};
      for (const [key, value] of Object.entries(patch)) {
        if (ownFields.has(key)) {
          if (key !== 'params' && key !== 'locale' && key !== 'events' && key !== 'children')
            throw new Error('Immutable Lesson override field: ' + key);
          continue;
        }
        if (Object.hasOwn(initialSections, key)) changes[key] = value;
        else additions[key] = value as Section_Configurator;
      }
      const issues = validateSluggedConfiguratorMap(additions, sectionTypes, {
        path: 'children', itemLabel: 'Lesson Section', reservedKeys: [...extraReserved],
      });
      if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
      const active: Record<string, Section_Configurator | false> = { ...initialSections };
      const childPatches: Record<string, unknown> = {};
      let structureChanged = Object.keys(additions).length > 0;
      for (const [key, child] of Object.entries(additions)) {
        if (Object.hasOwn(initialSections, key)) throw new Error('Duplicate Lesson Section slug: ' + key);
        active[key] = child;
      }
      for (const [key, change] of Object.entries(changes)) {
        if (change === false) {
          active[key] = false;
          structureChanged = true;
        } else if (isRecord(change)) {
          childPatches[key] = change;
        } else {
          throw new Error('Lesson Section patch must be an object or false: ' + key);
        }
      }
      if (structureChanged && patch.children === undefined)
        throw new Error('Lesson children order is required when adding or disabling Sections');
      const order = patch.children ?? initialOrder;
      const orderIssues = validateOrderedKeys({items: active, order}, {path:'children', allowDisabled:true});
      if (orderIssues.length) throw new Error(orderIssues.map(issue => issue.message).join('; '));
      const enabled = Object.fromEntries(
        Object.entries(active).filter((entry): entry is [string, Section_Configurator] => entry[1] !== false),
      );
      validate({ ...mergedMetadata, children: [...order], ...enabled });
      // A Section override may disable the last Quiz even when its placement stays.
      const effectiveSections = buildSections(enabled, order, childPatches);
      if (mergedMetadata.params.quizRequiredForCompletion &&
          !Object.values(effectiveSections.base).some(section =>
            isRecord(section) && section.type === 'quiz' &&
            (!isRecord(section.params) || section.params.disabled !== true))) {
        throw new Error('Lesson requires at least one enabled Quiz section');
      }
      if (Object.keys(changes).length || Object.keys(additions).length || patch.children !== undefined) {
        const sections = buildSections(enabled, order, childPatches);
        if (structureChanged || patch.children !== undefined) output.base.children = [...order];
        for (const [key, value] of Object.entries(changes)) {
          output.base[key] = value === false ? false : (sections.childPatches[key]?.base ?? {});
        }
        for (const key of Object.keys(additions)) output.base[key] = sections.base[key];
        for (const language of languages) {
          const fragments: Record<string, unknown> = {};
          for (const key of Object.keys(changes)) {
            if (changes[key] === false) continue;
            const translated = sections.childPatches[key]?.locale?.[language];
            if (translated !== undefined) fragments[key] = translated;
          }
          for (const key of Object.keys(additions)) {
            const translated = sections.locale[language]?.[key];
            if (translated !== undefined) fragments[key] = translated;
          }
          if (Object.keys(fragments).length) Object.assign((files[language] ??= {}), fragments);
        }
      }
      output.locale = Object.keys(files).length ? files : undefined;
      // The owning Lesson ID is reference metadata, never a Data patch.
      const result = structuredClone({ id, ...output });
      validateSlugAddressedPublication(lesson_Data_Schema, data(options), languages, output);
      return result;
    } catch (error) {
      throw new Error(
        'Invalid Lesson overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
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
    <const Added extends Record<string, Section_Configurator>>(
      patch: Lesson_Overrides<Sections, Added> & ChildrenSupporting<Languages, Added>,
      options: PublicationLanguageOptions<Languages>,
    ): Publication<OverrideBase> & Pick<Lesson_Metadata_Config, 'id'>;
    (
      patch: Lesson_Overrides<Sections, {}>,
      options: PublicationLanguageOptions<Languages>,
    ): Publication<OverrideBase> & Pick<Lesson_Metadata_Config, 'id'>;
  } = overridesImplementation;

  const result = {
    id, slug, type,
    draft: false as const,
    children: [...initialOrder],
    ...initialSections,
    validate,
    build: scopeBuild({ data, overrides }),
    config: {
      base: configBase,
      locales: (): { locale: DeepPartial<Lesson_Config['locale']> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

/**
 * Literal-first inference preserves actual Section/Block Build signatures.
 * Keep the explicit three-generic API for existing specialized authoring.
 */
export const defineLesson: {
  <const Input extends Omit<Lesson_Metadata_Config, 'slug' | 'params' | 'locale'> & {
    slug: string;
    params: Omit<Lesson_Config['params'], 'languages'> & {
      languages: readonly [LanguageCode, ...LanguageCode[]];
    };
    locale: Lesson_Config['locale'];
  }>(
    config: Input & LessonAuthoredInput<
      Input['slug'], InferredLessonLanguages<Input>, InferredLessonSections<Input>
    >,
  ): ReturnType<typeof defineLessonImpl<
    Input['slug'], InferredLessonLanguages<Input>, InferredLessonSections<Input>
  >>;
  <
    const Slug extends string,
    const Languages extends readonly [LanguageCode, ...LanguageCode[]],
    const Sections extends Record<string, Section_Configurator>,
  >(
    config: LessonAuthoredInput<Slug, Languages, Sections>,
  ): ReturnType<typeof defineLessonImpl<Slug, Languages, Sections>>;
} = defineLessonImpl;

export type Lesson_Configurator = ReturnType<typeof defineLesson>;
