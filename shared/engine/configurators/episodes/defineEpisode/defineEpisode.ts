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
  type AddedPlacementsFromPatch,
} from '../../_shared__configurators';
import { sectionTypes, type Section_Configurator } from '../../sections';
import {
  episode_Metadata_Config_Schema,
  episode_Config_Schema,
  episode_Data_Schema,
  episode_Override_Metadata_Schema,
  type Episode_Config,
  type Episode_DataBase,
  type Episode_Metadata_Config,
  type Episode_Overrides,
} from './defineEpisode.schemas';

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
  params?: DeepPartial<Omit<Episode_Config['params'], 'languages'>>;
  locale?: { title?: string };
  children?: string[];
  events?: Record<string, unknown>;
  [placement: string]: unknown;
};
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

// "events" is an Episode-owned semantic field, not a Section slug. Other
// metadata keys are also excluded from the direct child-placement map.
const ownFields = new Set(['id', 'slug', 'type', 'params', 'locale', 'children', 'events']);
const directSections = (config: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(config).filter(([key]) => !ownFields.has(key)));
const extraReserved = new Set<string>([...slugAddressedReservedKeys, 'events']);

const validate = (config: Episode_Config): void => {
  const sections = directSections(config);
  const parsed = episode_Config_Schema.safeParse(config);
  const errors = [
    ...(!parsed.success ? parsed.error.issues.map(issue => issue.path.join('.') + ': ' + issue.message) : []),
    ...validateOrderedKeys({ items: sections, order: config.children }, { path: 'children' }).map(issue => issue.message),
    ...validateSluggedConfiguratorMap(sections, sectionTypes, {
      path: 'children',
      itemLabel: 'Episode Section',
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
      errors.push('Invalid Episode Section Build API or identity: ' + key);
    }
    if (isRecord(child) && typeof child.id === 'string') {
      if (ids.has(child.id)) errors.push('Duplicate Episode Section ID: ' + child.id);
      ids.add(child.id);
    }
  }
  if (errors.length) throw new Error('Episode validation failed: ' + errors.join('; '));
};

type EpisodeAuthoredInput<
  Slug extends string,
  Languages extends readonly LanguageCode[],
  Sections extends Record<string, Section_Configurator>,
> = Omit<Episode_Metadata_Config, 'slug' | 'params' | 'locale'> & {
  slug: Slug;
  params: Omit<Episode_Config['params'], 'languages'> & { languages: Languages };
  locale: RequireLanguages<Episode_Config['locale'], Languages>;
  children: Extract<keyof Sections, string>[];
} & Sections & ChildrenSupporting<Languages, Sections> &
  SafePlacementMap<Sections> & { [Key in keyof Sections]: Key extends 'events' ? never : Sections[Key] };

type EpisodeChildKeys<Input> = Exclude<keyof Input, keyof Episode_Metadata_Config | 'children'>;
type InferredEpisodeSections<Input> = {
  [Key in EpisodeChildKeys<Input>]: Input[Key] extends Section_Configurator ? Input[Key] : Section_Configurator;
};

/**
 * Author a Course-owned narrative Episode independently of Lesson.
 * Episode Sections are directly addressable by their placement slugs; "events"
 * retains its own semantic meaning and never becomes a child.
 */
const defineEpisodeImpl = <
  const Slug extends string,
  const Languages extends readonly [LanguageCode, ...LanguageCode[]],
  const Sections extends Record<string, Section_Configurator>,
>(
  config: EpisodeAuthoredInput<Slug, Languages, Sections>,
) => {
  const metadataSchema = episode_Metadata_Config_Schema;
  const metadataInput = {
    id: config.id,
    slug: config.slug,
    type: config.type,
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
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
    ...(authored.events !== undefined ? { events: structuredClone(authored.events) } : {}),
  };

  const splitLocale = (value: DeepPartial<Episode_Config['locale']>) => {
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
      if (!child) throw new Error('Unknown Episode Section: ' + key);
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
        throw new Error('Episode does not support publication language: ' + language);
    }
    return languages;
  };

  const originalConfig = () => ({
    ...copyAuthored(), children: [...initialOrder], ...initialSections,
  });

  const data = (options: PublicationLanguageOptions<Languages>): Publication<Episode_DataBase> => {
    const languages = publicationLanguages(options);
    validate(originalConfig());
    const own = copyAuthored();
    const translated = splitLocale(own.locale);
    const sections = buildSections(initialSections, initialOrder);
    const files = selectPublicationLocales(translated.files, languages) ?? {};
    for (const [language, values] of Object.entries(sections.locale)) {
      Object.assign((files[language as LanguageCode] ??= {}), values);
    }
    const result: Publication<Episode_DataBase> = structuredClone({
      base: {
        id, slug, type,
        params: { ...own.params, languages: [...languages] },
        ...(Object.keys(translated.invariant).length ? { locale: translated.invariant } : {}),
        ...(own.events !== undefined ? { events: own.events } : {}),
        children: [...initialOrder],
        ...sections.base,
      },
      locale: Object.keys(files).length ? files : undefined,
    });
    for (const language of languages) {
      episode_Data_Schema.parse(
        mergeForValidation(result.base, result.locale?.[language] ?? {}),
      );
    }
    return result;
  };

  const overridesImplementation = <const Added extends Record<string, Section_Configurator> = {}>(
    patch: Episode_Overrides<Sections, Added> & ChildrenSupporting<Languages, Added>,
    options: PublicationLanguageOptions<Languages>,
  ): Publication<OverrideBase> => {
    try {
      const languages = publicationLanguages(options);
      validate(originalConfig());
      if (!isRecord(patch)) throw new Error('Expected Episode overrides object');
      const metadataPatch = episode_Override_Metadata_Schema.parse(
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
        throw new Error('Episode children must be an ordered array');
      const changes: Record<string, unknown> = {};
      const additions: Record<string, Section_Configurator> = {};
      for (const [key, value] of Object.entries(patch)) {
        if (ownFields.has(key)) {
          if (key !== 'params' && key !== 'locale' && key !== 'events' && key !== 'children')
            throw new Error('Immutable Episode override field: ' + key);
          continue;
        }
        if (Object.hasOwn(initialSections, key)) changes[key] = value;
        else additions[key] = value as Section_Configurator;
      }
      const issues = validateSluggedConfiguratorMap(additions, sectionTypes, {
        path: 'children', itemLabel: 'Episode Section', reservedKeys: [...extraReserved],
      });
      if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
      const active: Record<string, Section_Configurator | false> = { ...initialSections };
      const childPatches: Record<string, unknown> = {};
      let structureChanged = Object.keys(additions).length > 0;
      for (const [key, child] of Object.entries(additions)) {
        if (Object.hasOwn(initialSections, key)) throw new Error('Duplicate Episode Section slug: ' + key);
        active[key] = child;
      }
      for (const [key, change] of Object.entries(changes)) {
        if (change === false) {
          active[key] = false;
          structureChanged = true;
        } else if (isRecord(change)) {
          childPatches[key] = change;
        } else {
          throw new Error('Episode Section patch must be an object or false: ' + key);
        }
      }
      if (structureChanged && patch.children === undefined)
        throw new Error('Episode children order is required when adding or disabling Sections');
      const order = patch.children ?? initialOrder;
      const orderIssues = validateOrderedKeys({items: active, order}, {path:'children', allowDisabled:true});
      if (orderIssues.length) throw new Error(orderIssues.map(issue => issue.message).join('; '));
      const enabled = Object.fromEntries(
        Object.entries(active).filter((entry): entry is [string, Section_Configurator] => entry[1] !== false),
      );
      validate({ ...mergedMetadata, children: [...order], ...enabled });
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
      const result = structuredClone(output);
      validateSlugAddressedPublication(episode_Data_Schema, data(options), languages, result);
      return result;
    } catch (error) {
      throw new Error(
        'Invalid Episode overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const overrides: {
    <const Patch extends Record<string, unknown>>(
      patch: Patch & Episode_Overrides<Sections, AddedPlacementsFromPatch<
        Patch, Sections, Section_Configurator, 'params' | 'locale' | 'events' | 'children'
      >> & ChildrenSupporting<Languages, AddedPlacementsFromPatch<
        Patch, Sections, Section_Configurator, 'params' | 'locale' | 'events' | 'children'
      >>,
      options: PublicationLanguageOptions<Languages>,
    ): Publication<OverrideBase>;
    (
      patch: Episode_Overrides<Sections, {}>,
      options: PublicationLanguageOptions<Languages>,
    ): Publication<OverrideBase>;
  } = overridesImplementation;

  const result = {
    ...initialSections,
    id, slug, type,
    draft: false as const,
    children: [...initialOrder],
    validate,
    build: scopeBuild({ data, overrides }),
    config: {
      base: configBase,
      locales: (): { locale: DeepPartial<Episode_Config['locale']> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export const defineEpisode: {
  <const Input extends Omit<Episode_Metadata_Config, 'slug' | 'params' | 'locale'> & {
    slug: string;
    params: Omit<Episode_Config['params'], 'languages'> & {
      languages: readonly [LanguageCode, ...LanguageCode[]];
    };
    locale: Episode_Config['locale'];
    children: string[];
  }>(
    config: Input & EpisodeAuthoredInput<
      Input['slug'], Input['params']['languages'], InferredEpisodeSections<Input>
    >,
  ): ReturnType<typeof defineEpisodeImpl<
    Input['slug'], Input['params']['languages'], InferredEpisodeSections<Input>
  >>;
  <
    const Slug extends string,
    const Languages extends readonly [LanguageCode, ...LanguageCode[]],
    const Sections extends Record<string, Section_Configurator>,
  >(
    config: EpisodeAuthoredInput<Slug, Languages, Sections>,
  ): ReturnType<typeof defineEpisodeImpl<Slug, Languages, Sections>>;
} = defineEpisodeImpl;

type EpisodeBaseConfigurator = ReturnType<typeof defineEpisodeImpl<
  string, readonly [LanguageCode, ...LanguageCode[]], {}
>>;
export type Episode_Configurator = Omit<
  EpisodeBaseConfigurator, 'children' | '__svitloLanguageScope' | 'build'
> & {
  readonly children: readonly string[];
  readonly __svitloLanguageScope: readonly LanguageCode[];
  readonly build: Omit<EpisodeBaseConfigurator['build'], 'data' | 'overrides'> & {
    data(options: PublicationLanguageOptions): ReturnType<EpisodeBaseConfigurator['build']['data']>;
    overrides(patch: never, options: PublicationLanguageOptions): ReturnType<EpisodeBaseConfigurator['build']['overrides']>;
  };
};
