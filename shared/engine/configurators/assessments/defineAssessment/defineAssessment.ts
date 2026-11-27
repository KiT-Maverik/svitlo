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
  splitLocalizedFields,
  validateOrderedKeys,
  validateRequestedPublication,
  validateSluggedConfiguratorMap,
} from '../../_shared__configurators';
import {
  assessment_Config_Schema,
  assessment_Data_Schema,
  assessment_Override_Metadata_Schema,
  type Assessment_Config,
  type Assessment_Content_Section_Configurator,
  type Assessment_DataBase,
  type Assessment_Overrides,
  type Assessment_Quiz_Configurator,
  type Assessment_Section_Configurator,
} from './defineAssessment.schemas';

const contentSectionTypes = ['content'] as const;

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
type LocaleBody = { locale?: { title?: string }; section?: Assessment_DataBase['section'] };
type Files = Partial<Record<LanguageCode, LocaleBody>>;
type Publication<Base> = { base: Base; locale: Files | undefined };
type OverrideBase = {
  params?: DeepPartial<Omit<Assessment_Config['params'], 'languages'>>;
  locale?: { title?: string };
  section?: Assessment_DataBase['section'];
};
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const emptyCollection = () => ({
  items: {} as Record<string, Assessment_Content_Section_Configurator>,
  order: [] as string[],
});

const composeSections = (input: Assessment_Config) => {
  const before = input.before ?? emptyCollection();
  const after = input.after ?? emptyCollection();
  if (input.quiz?.type !== 'quiz') throw new Error('Assessment must define exactly one Quiz in quiz');
  if (input.quiz.config?.base?.params?.disabled === true) throw new Error('Assessment Quiz cannot be disabled');
  const quizKey = input.quiz.slug;
  const names = [...before.order, quizKey, ...after.order];
  if (new Set(names).size !== names.length)
    throw new Error('Assessment Section slugs must be unique across before, quiz and after');
  return {
    items: { ...before.items, [quizKey]: input.quiz, ...after.items },
    order: names,
  };
};
const validate = (config: Assessment_Config): void => {
  assessment_Config_Schema.parse(config);
  const before = config.before ?? emptyCollection();
  const after = config.after ?? emptyCollection();
  const issues = [
    ...validateOrderedKeys(before, { path: 'before' }),
    ...validateOrderedKeys(after, { path: 'after' }),
    ...validateSluggedConfiguratorMap(before.items, contentSectionTypes, {
      path: 'before.items',
      itemLabel: 'Assessment Content Section',
    }),
    ...validateSluggedConfiguratorMap(after.items, contentSectionTypes, {
      path: 'after.items',
      itemLabel: 'Assessment Content Section',
    }),
  ];
  if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
  const section = composeSections(config);
  const ids = new Set<string>();
  for (const [key, child] of Object.entries(section.items)) {
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
    )
      throw new Error('Invalid Assessment Section Build API or identity: ' + key);
    if (ids.has(child.id)) throw new Error('Duplicate Assessment Section ID: ' + child.id);
    ids.add(child.id);
  }
};

/**
 * A Course-owned Assessment selects already-authored Questions through Quiz Sections.
 * It never owns Question/Flashcard banks, Lesson Skills or Episode events.
 * The Configurator is only for complete Assessments; Course drafts use
 * separate typed placeholders and cannot be published as finished Props.
 */
export const defineAssessment = <
  const Slug extends string,
  const Languages extends readonly [LanguageCode, ...LanguageCode[]],
  const Before extends Record<string, Assessment_Content_Section_Configurator> = {},
  const Quiz extends Assessment_Quiz_Configurator = Assessment_Quiz_Configurator,
  const After extends Record<string, Assessment_Content_Section_Configurator> = {},
>(
  config: Omit<Assessment_Config, 'slug' | 'params' | 'locale' | 'before' | 'quiz' | 'after'> & {
    slug: Slug;
    params: Omit<Assessment_Config['params'], 'languages'> & { languages: Languages };
    locale: RequireLanguages<Assessment_Config['locale'], Languages>;
    before?: { items: Before & ChildrenSupporting<Languages, Before>; order: string[] };
    quiz: Quiz;
    after?: { items: After & ChildrenSupporting<Languages, After>; order: string[] };
  },
) => {
  const metadataSchema = assessment_Config_Schema.omit({ before: true, quiz: true, after: true });
  const { before: _before, quiz: _quiz, after: _after, ...metadataInput } = config;
  const authored = structuredClone(metadataInput);
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id, slug, type } = authored;
  const before = { items: { ...(config.before?.items ?? {}) }, order: [...(config.before?.order ?? [])] };
  const after = { items: { ...(config.after?.items ?? {}) }, order: [...(config.after?.order ?? [])] };
  const quiz = config.quiz;
  const section = composeSections({
    ...metadataInput,
    params: { ...metadataInput.params, languages: [...metadataInput.params.languages] },
    before,
    quiz,
    after,
  } as Assessment_Config);
  const initialSections = section.items;
  const initialOrder = section.order;

  const configBase = {
    id,
    slug,
    type,
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
  };

  const splitLocale = (value: DeepPartial<Assessment_Config['locale']>) => {
    const split = splitLocalizedFields(value);
    const files: Files = {};
    for (const [language, fields] of Object.entries(split.locale ?? {})) {
      files[language as LanguageCode] = { locale: fields as LocaleBody['locale'] };
    }
    return { invariant: split.base as { title?: string }, files };
  };

  const buildSections = (
    items: Record<string, Assessment_Section_Configurator>,
    order: readonly string[],
    patches: Record<string, unknown> = {},
  ) => {
    const { languages } = requireBuildContext();
    const entries = order.map(key => {
      const child = items[key];
      if (!child) throw new Error('Unknown Assessment Section: ' + key);
      const build = (child as unknown as SectionBuild).build;
      const resource = buildChildData({ build });
      const patch = Object.hasOwn(patches, key) ? buildChildOverrides({ build }, patches[key] as never) : undefined;
      return { resource, patch };
    });
    const base = entries.map(({ resource, patch }) =>
      patch ? mergeForValidation(resource.base, patch.base) : resource.base,
    ) as Assessment_DataBase['section'];
    const locale: Partial<Record<LanguageCode, Assessment_DataBase['section']>> = {};
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
      }) as Assessment_DataBase['section'];
    }
    return { base, locale };
  };

  const publicationLanguages = (options: PublicationLanguageOptions<Languages>) => {
    const languages = resolvePublicationLanguages(options);
    for (const language of languages) {
      if (!authored.params.languages.includes(language))
        throw new Error('Assessment does not support publication language: ' + language);
    }
    return languages;
  };

  const data = (options: PublicationLanguageOptions<Languages>): Publication<Assessment_DataBase> => {
    const languages = publicationLanguages(options);
    validate({ ...copyAuthored(), before, quiz, after });
    const own = copyAuthored();
    const translated = splitLocale(own.locale);
    const children = buildSections(initialSections, initialOrder);
    const files = selectPublicationLocales(translated.files, languages) ?? {};
    for (const [language, values] of Object.entries(children.locale)) {
      (files[language as LanguageCode] ??= {}).section = values;
    }
    const result: Publication<Assessment_DataBase> = structuredClone({
      base: {
        id,
        slug,
        type,
        params: { ...own.params, languages: [...languages] },
        ...(Object.keys(translated.invariant).length ? { locale: translated.invariant } : {}),
        section: children.base,
      },
      locale: Object.keys(files).length ? files : undefined,
    });
    validateRequestedPublication(assessment_Data_Schema, result, languages);
    return result;
  };

  const overrides = <
    const AddedBefore extends Record<string, Assessment_Content_Section_Configurator> = {},
    const AddedAfter extends Record<string, Assessment_Content_Section_Configurator> = {},
  >(
    patch: Assessment_Overrides<Before, Quiz, After, AddedBefore, AddedAfter> & {
      before?: { additionalItems?: AddedBefore & ChildrenSupporting<Languages, AddedBefore> };
      after?: { additionalItems?: AddedAfter & ChildrenSupporting<Languages, AddedAfter> };
    },
    options: PublicationLanguageOptions<Languages>,
  ): Publication<OverrideBase> => {
    try {
      const languages = publicationLanguages(options);
      validate({ ...copyAuthored(), before, quiz, after });
      if (!isRecord(patch)) throw new Error('Expected Assessment overrides object');
      for (const key of Object.keys(patch)) {
        if (!['params', 'locale', 'before', 'quiz', 'after'].includes(key))
          throw new Error('Unknown Assessment override field: ' + key);
      }
      const metadataPatch = assessment_Override_Metadata_Schema.parse(
        Object.fromEntries(Object.entries(patch).filter(([key]) => key === 'params' || key === 'locale')),
      );
      const mergedMetadata = metadataSchema.parse(mergeForValidation(copyAuthored(), metadataPatch));
      const own = splitLocale(metadataPatch.locale ?? {});
      const files = selectPublicationLocales(own.files, languages) ?? {};
      const output: Publication<OverrideBase> = {
        base: {
          ...(metadataPatch.params !== undefined ? { params: metadataPatch.params } : {}),
          ...(Object.keys(own.invariant).length ? { locale: own.invariant } : {}),
        },
        locale: undefined,
      };
      const childPatches: Record<string, unknown> = {};
      const phase = (
        name: 'before' | 'after',
        original: { items: Record<string, Assessment_Content_Section_Configurator>; order: string[] },
        changeset: unknown,
      ) => {
        if (changeset === undefined) return original;
        if (!isRecord(changeset)) throw new Error(name + ' must be an object');
        for (const key of Object.keys(changeset)) {
          if (!['items', 'additionalItems', 'order'].includes(key))
            throw new Error('Unknown Assessment ' + name + ' override field: ' + key);
        }
        const changes = changeset.items ?? {};
        const additions = changeset.additionalItems ?? {};
        if (!isRecord(changes) || !isRecord(additions))
          throw new Error('Assessment ' + name + ' override maps must be objects');
        const issues = validateSluggedConfiguratorMap(additions, contentSectionTypes, {
          path: name + '.additionalItems',
          itemLabel: 'Assessment Content Section',
        });
        if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
        const active: Record<string, Assessment_Content_Section_Configurator | false> = { ...original.items };
        let structural = Object.keys(additions).length > 0;
        for (const [key, child] of Object.entries(additions)) {
          if (Object.hasOwn(original.items, key))
            throw new Error('Duplicate Assessment supporting Section slug: ' + key);
          active[key] = child as Assessment_Content_Section_Configurator;
        }
        for (const [key, change] of Object.entries(changes)) {
          if (!Object.hasOwn(original.items, key)) throw new Error('Unknown Assessment supporting Section: ' + key);
          if (change === false) {
            active[key] = false;
            structural = true;
          } else if (isRecord(change)) childPatches[key] = change;
          else throw new Error('Assessment Content Section patch must be an object or false: ' + key);
        }
        if (structural && changeset.order === undefined)
          throw new Error(name + '.order is required when adding or disabling Sections');
        const order = (changeset.order ?? original.order) as string[];
        const errors = validateOrderedKeys({ items: active, order }, { path: name, allowDisabled: true });
        if (errors.length) throw new Error(errors.map(issue => issue.message).join('; '));
        return {
          items: Object.fromEntries(
            Object.entries(active).filter(
              (entry): entry is [string, Assessment_Content_Section_Configurator] => entry[1] !== false,
            ),
          ),
          order: [...order],
        };
      };
      const updatedBefore = phase('before', before, patch.before);
      const updatedAfter = phase('after', after, patch.after);
      if (patch.quiz !== undefined) {
        if (!isRecord(patch.quiz)) throw new Error('Assessment Quiz override must be an object, never false');
        if (isRecord(patch.quiz.params) && Object.hasOwn(patch.quiz.params, 'disabled'))
          throw new Error('Assessment Quiz cannot be disabled or re-enabled via overrides');
        childPatches[quiz.slug] = patch.quiz;
      }
      const edited = {
        ...mergedMetadata,
        before: updatedBefore,
        quiz,
        after: updatedAfter,
      };
      validate(edited);
      if (patch.before !== undefined || patch.after !== undefined || patch.quiz !== undefined) {
        const sections = composeSections(edited);
        const keys = [...Object.keys(sections.items)];
        if (keys.length !== new Set(keys).size) throw new Error('Assessment Section slug collision');
        const resolved = buildSections(sections.items, sections.order, childPatches);
        output.base.section = resolved.base;
        for (const [language, values] of Object.entries(resolved.locale))
          (files[language as LanguageCode] ??= {}).section = values;
      }
      output.locale = Object.keys(files).length ? files : undefined;
      const result = structuredClone(output);
      validateRequestedPublication(assessment_Data_Schema, data(options), languages, result);
      return result;
    } catch (error) {
      throw new Error(
        'Invalid Assessment overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const result = {
    id,
    slug,
    type,
    draft: false as const,
    before,
    quiz,
    after,
    validate,
    build: scopeBuild({ data, overrides }),
    config: {
      base: configBase,
      locales: (): { locale: DeepPartial<Assessment_Config['locale']> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export type Assessment_Configurator = ReturnType<typeof defineAssessment>;
