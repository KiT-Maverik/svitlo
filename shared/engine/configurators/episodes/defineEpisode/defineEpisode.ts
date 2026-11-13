import type { LanguageCodes } from '#schemas';
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
  onlyStrings,
  resolvePublicationLanguages,
  selectPublicationLocales,
  splitLocalizedFields,
  validateOrderedKeys,
  validateRequestedPublication,
  validateSluggedConfiguratorMap,
} from '../../_shared__configurators';
import { sectionTypes, type Section_Configurator } from '../../sections';
import {
  episode_Config_Schema,
  episode_Override_Metadata_Schema,
  episode_Props_Schema,
  type Episode_Config,
  type Episode_Overrides,
  type Episode_PropsBase,
} from './defineEpisode.schemas';

type SectionResource = {
  base: Record<string, unknown>;
  locale: Partial<Record<LanguageCodes, Record<string, unknown>>> | undefined;
};
type SectionBuild = {
  build: {
    props(options: PublicationLanguageOptions): SectionResource;
    overrides(patch: never, options: PublicationLanguageOptions): SectionResource;
  };
};
type LocaleBody = { locale?: { title?: string }; section?: Episode_PropsBase['section'] };
type Files = Partial<Record<LanguageCodes, LocaleBody>>;
type Publication<Base> = { base: Base; locale: Files | undefined };
type OverrideBase = {
  params?: DeepPartial<Omit<Episode_Config['params'], 'languages'>>;
  locale?: { title?: string };
  section?: Episode_PropsBase['section'];
  events?: Record<string, unknown>;
};
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const validate = (config: Episode_Config): void => {
  episode_Config_Schema.parse(config);
  const issues = [
    ...validateOrderedKeys(config.section, { path: 'section' }),
    ...validateSluggedConfiguratorMap(config.section.items, sectionTypes, {
      path: 'section.items',
      itemLabel: 'Episode Section',
    }),
  ];
  if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
  const ids = new Set<string>();
  for (const [key, child] of Object.entries(config.section.items)) {
    if (
      !isRecord(child) ||
      !isRecord(child.build) ||
      typeof child.build.props !== 'function' ||
      typeof child.build.overrides !== 'function' ||
      !isRecord(child.config) ||
      !isRecord(child.config.base) ||
      child.config.base.id !== child.id ||
      child.config.base.slug !== key ||
      child.config.base.type !== child.type
    ) {
      throw new Error('Invalid Episode Section Build API or identity: ' + key);
    }
    if (ids.has(child.id)) throw new Error('Duplicate Episode Section ID: ' + child.id);
    ids.add(child.id);
  }
};

/**
 * Author a Course-owned narrative Episode independently of Lesson.
 *
 * @remarks
 * Use Episodes for plot, characters, missions and story transitions. Use
 * Lessons for Course-neutral teaching, practice and assessment of Skills.
 * An Episode owns its own ordered Sections; it does not inherit Lesson
 * questions, flashcards, required quizzes or pedagogical parameters.
 *
 * Only author an Episode under its owning Course. Its Build API is stateless
 * and emits plain Section Props arrays; localized arrays replace atomically.
 */
export const defineEpisode = <
  const Slug extends string,
  const Languages extends readonly [LanguageCodes, ...LanguageCodes[]],
  const Sections extends Record<string, Section_Configurator>,
>(
  config: Omit<Episode_Config, 'slug' | 'params' | 'locale' | 'section'> & {
    slug: Slug;
    params: Omit<Episode_Config['params'], 'languages'> & { languages: Languages };
    locale: RequireLanguages<Episode_Config['locale'], Languages>;
    section: { items: Sections & ChildrenSupporting<Languages, Sections>; order: string[] };
  },
) => {
  validate(config as unknown as Episode_Config);
  const metadataSchema = episode_Config_Schema.omit({ section: true });
  const { section: _section, ...metadataInput } = config;
  const authored = structuredClone(metadataSchema.parse(metadataInput));
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id, slug, type } = authored;
  const initialSections: Sections = { ...config.section.items };
  const initialOrder = [...config.section.order];
  const section = { items: { ...initialSections }, order: [...initialOrder] };

  const configBase = {
    id,
    slug,
    type,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
    ...(authored.events !== undefined ? { events: structuredClone(authored.events) } : {}),
  };

  const splitLocale = (value: DeepPartial<Episode_Config['locale']>) => {
    const split = splitLocalizedFields(value);
    const files: Files = {};
    for (const [language, fields] of Object.entries(split.locale ?? {})) {
      files[language as LanguageCodes] = { locale: fields as LocaleBody['locale'] };
    }
    return { invariant: split.base as { title?: string }, files };
  };

  const buildSections = (
    items: Record<string, Section_Configurator>,
    order: readonly string[],
    languages: readonly LanguageCodes[],
    patches: Record<string, unknown> = {},
  ) => {
    const entries = order.map(key => {
      const child = items[key];
      if (!child) throw new Error('Unknown Episode Section: ' + key);
      const build = (child as unknown as SectionBuild).build;
      const resource = build.props({ languages });
      const patch = Object.hasOwn(patches, key) ? build.overrides(patches[key] as never, { languages }) : undefined;
      return { resource, patch };
    });
    const base = entries.map(({ resource, patch }) =>
      patch ? mergeForValidation(resource.base, patch.base) : resource.base,
    ) as Episode_PropsBase['section'];
    const locale: Partial<Record<LanguageCodes, Episode_PropsBase['section']>> = {};
    for (const language of languages) {
      if (
        !entries.some(
          ({ resource, patch }) => resource.locale?.[language] !== undefined || patch?.locale?.[language] !== undefined,
        )
      )
        continue;
      locale[language] = entries.map(({ resource, patch }) => {
        const translated = mergeForValidation(
          resource.base,
          (resource.locale?.[language] ?? {}) as DeepPartial<typeof resource.base>,
        );
        const withBasePatch = patch ? mergeForValidation(translated, patch.base) : translated;
        return patch?.locale?.[language] ? mergeForValidation(withBasePatch, patch.locale[language]) : withBasePatch;
      }) as Episode_PropsBase['section'];
    }
    return { base, locale };
  };

  const publicationLanguages = (options: PublicationLanguageOptions<Languages>) => {
    const languages = resolvePublicationLanguages(options);
    for (const language of languages) {
      if (!authored.params.languages.includes(language))
        throw new Error('Episode does not support publication language: ' + language);
    }
    return languages;
  };

  const props = (options: PublicationLanguageOptions<Languages>): Publication<Episode_PropsBase> => {
    const languages = publicationLanguages(options);
    const own = copyAuthored();
    const translated = splitLocale(own.locale);
    const children = buildSections(initialSections, initialOrder, languages);
    const files = selectPublicationLocales(translated.files, languages) ?? {};
    for (const [language, values] of Object.entries(children.locale)) {
      (files[language as LanguageCodes] ??= {}).section = values;
    }
    const result: Publication<Episode_PropsBase> = structuredClone({
      base: {
        id,
        slug,
        type,
        params: { ...own.params, languages: [...languages] },
        ...(Object.keys(translated.invariant).length ? { locale: translated.invariant } : {}),
        section: children.base,
        ...(own.events !== undefined ? { events: own.events } : {}),
      },
      locale: Object.keys(files).length ? files : undefined,
    });
    validateRequestedPublication(episode_Props_Schema, result, languages);
    return result;
  };

  const overrides = <const Added extends Record<string, Section_Configurator> = {}>(
    patch: Episode_Overrides<Sections, Added> & {
      section?: { additionalItems?: Added & ChildrenSupporting<Languages, Added> };
    },
    options: PublicationLanguageOptions<Languages>,
  ): Publication<OverrideBase> => {
    try {
      const languages = publicationLanguages(options);
      if (!isRecord(patch)) throw new Error('Expected Episode overrides object');
      for (const key of Object.keys(patch)) {
        if (!['params', 'locale', 'section', 'events'].includes(key))
          throw new Error('Unknown Episode override field: ' + key);
      }
      const metadataPatch = episode_Override_Metadata_Schema.parse(
        Object.fromEntries(Object.entries(patch).filter(([key]) => key !== 'section')),
      );
      const mergedMetadata = metadataSchema.parse(mergeForValidation(copyAuthored(), metadataPatch));
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
      if (patch.section !== undefined) {
        if (!isRecord(patch.section)) throw new Error('section must be an object');
        for (const key of Object.keys(patch.section)) {
          if (!['items', 'additionalItems', 'order'].includes(key))
            throw new Error('Unknown Episode section override field: ' + key);
        }
        const changes = patch.section.items ?? {};
        const additions = patch.section.additionalItems ?? {};
        if (!isRecord(changes) || !isRecord(additions))
          throw new Error('Episode section override maps must be objects');
        const issues = validateSluggedConfiguratorMap(additions, sectionTypes, {
          path: 'section.additionalItems',
          itemLabel: 'Episode Section',
        });
        if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));

        const active: Record<string, Section_Configurator | false> = { ...initialSections };
        const childPatches: Record<string, unknown> = {};
        let structureChanged = Object.keys(additions).length > 0;
        for (const [key, child] of Object.entries(additions)) {
          if (Object.hasOwn(initialSections, key)) throw new Error('Duplicate Episode Section slug: ' + key);
          active[key] = child as Section_Configurator;
        }
        for (const [key, change] of Object.entries(changes)) {
          if (!Object.hasOwn(initialSections, key)) throw new Error('Unknown Episode Section: ' + key);
          if (change === false) {
            active[key] = false;
            structureChanged = true;
          } else if (isRecord(change)) {
            childPatches[key] = change;
          } else {
            throw new Error('Episode Section patch must be an object or false: ' + key);
          }
        }
        if (structureChanged && patch.section.order === undefined)
          throw new Error('section.order is required when adding or disabling Sections');
        const order = patch.section.order ?? initialOrder;
        const orderIssues = validateOrderedKeys({ items: active, order }, { path: 'section', allowDisabled: true });
        if (orderIssues.length) throw new Error(orderIssues.map(issue => issue.message).join('; '));
        const enabled = Object.fromEntries(
          Object.entries(active).filter((entry): entry is [string, Section_Configurator] => entry[1] !== false),
        );
        validate({
          ...mergedMetadata,
          section: { items: enabled, order: [...order] },
        });
        if (Object.keys(changes).length || Object.keys(additions).length || patch.section.order !== undefined) {
          const sections = buildSections(enabled, order, languages, childPatches);
          output.base.section = sections.base;
          for (const [language, values] of Object.entries(sections.locale)) {
            (files[language as LanguageCodes] ??= {}).section = values;
          }
        }
      }
      output.locale = Object.keys(files).length ? files : undefined;
      const result = structuredClone(output);
      validateRequestedPublication(episode_Props_Schema, props(options), languages, result);
      return result;
    } catch (error) {
      throw new Error(
        'Invalid Episode overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const result = {
    id,
    slug,
    type,
    section,
    validate,
    build: { props, overrides },
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

export type Episode_Configurator = ReturnType<typeof defineEpisode>;
