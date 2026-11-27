import type { LanguageCode } from '#schemas';
import type { SafePlacementMap } from '../../_shared__configurators';
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
  validateSlugAddressedContainer,
  slugAddressedReservedKeys,
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
  type Assessment_Phase_DataBase,
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
type LocaleBody = {
  locale?: { title?: string };
  before?: Assessment_Phase_DataBase;
  quiz?: Assessment_DataBase['quiz'];
  after?: Assessment_Phase_DataBase;
};
type Files = Partial<Record<LanguageCode, LocaleBody>>;
type Publication<Base> = { base: Base; locale: Files | undefined };
type OverrideBase = {
  params?: DeepPartial<Omit<Assessment_Config['params'], 'languages'>>;
  locale?: { title?: string };
  before?: Record<string, unknown>;
  quiz?: Record<string, unknown>;
  after?: Record<string, unknown>;
};
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
type Phase = { children: string[] } & Record<string, unknown>;
const emptyCollection = (): Phase => ({ children: [] });
const phaseItems = (phase: Phase): Record<string, Assessment_Content_Section_Configurator> =>
  Object.fromEntries(Object.entries(phase).filter(([key]) => key !== 'children')) as Record<
    string,
    Assessment_Content_Section_Configurator
  >;
const validatePhase = (phase: Phase, name: string): void => {
  const issues = validateSlugAddressedContainer(phase, contentSectionTypes);
  const members = phaseItems(phase);
  const errors = validateSluggedConfiguratorMap(members, contentSectionTypes, {
    path: name,
    itemLabel: 'Assessment Content Section',
    reservedKeys: slugAddressedReservedKeys,
  });
  if (issues.length || errors.length) {
    throw new Error(
      [...issues.map(issue => name + '.' + issue.path.join('.') + ': ' + issue.message),
       ...errors.map(issue => issue.message)].join('; '),
    );
  }
};

const composeSections = (input: Assessment_Config) => {
  const before = input.before ?? emptyCollection();
  const after = input.after ?? emptyCollection();
  if (input.quiz?.type !== 'quiz') throw new Error('Assessment must define exactly one Quiz in quiz');
  if (input.quiz.config?.base?.params?.disabled === true) throw new Error('Assessment Quiz cannot be disabled');
  const quizKey = input.quiz.slug;
  const names = [...before.children, quizKey, ...after.children];
  if (new Set(names).size !== names.length)
    throw new Error('Assessment Section slugs must be unique across before, quiz and after');
  return {
    items: { ...phaseItems(before), [quizKey]: input.quiz, ...phaseItems(after) },
    order: names,
  };
};
const validate = (config: Assessment_Config): void => {
  assessment_Config_Schema.parse(config);
  const before = config.before ?? emptyCollection();
  const after = config.after ?? emptyCollection();
  validatePhase(before, 'before');
  validatePhase(after, 'after');
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

/** Exclude the structural order field from direct, literal-key child inference. */
type PhaseChildMap<Group extends { children: string[] }> = {
  [Key in Exclude<keyof Group, 'children'>]:
    Group[Key] extends Assessment_Content_Section_Configurator ? Group[Key] : never;
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
  const Before extends { children: string[] } = { children: string[] },
  const Quiz extends Assessment_Quiz_Configurator = Assessment_Quiz_Configurator,
  const After extends { children: string[] } = { children: string[] },
>(
  config: Omit<Assessment_Config, 'slug' | 'params' | 'locale' | 'before' | 'quiz' | 'after'> & {
    slug: Slug;
    params: Omit<Assessment_Config['params'], 'languages'> & { languages: Languages };
    locale: RequireLanguages<Assessment_Config['locale'], Languages>;
    before?: Before & { children: Extract<Exclude<keyof Before, 'children'>, string>[] } &
      PhaseChildMap<Before> & ChildrenSupporting<Languages, PhaseChildMap<Before>> &
      SafePlacementMap<PhaseChildMap<Before>>;
    quiz: Quiz;
    after?: After & { children: Extract<Exclude<keyof After, 'children'>, string>[] } &
      PhaseChildMap<After> & ChildrenSupporting<Languages, PhaseChildMap<After>> &
      SafePlacementMap<PhaseChildMap<After>>;
  },
) => {
  const metadataSchema = assessment_Config_Schema.omit({ before: true, quiz: true, after: true });
  const { before: _before, quiz: _quiz, after: _after, ...metadataInput } = config;
  const authored = structuredClone(metadataInput);
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id, slug, type } = authored;
  const before: Phase = { ...(config.before ?? {}), children: [...(config.before?.children ?? [])] };
  const after: Phase = { ...(config.after ?? {}), children: [...(config.after?.children ?? [])] };
  const quiz = config.quiz;
  // Composition validates shared child identities and phase/Quiz slug collisions.
  validate({
    ...metadataInput,
    params: { ...metadataInput.params, languages: [...metadataInput.params.languages] },
    before,
    quiz,
    after,
  } as Assessment_Config);

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
    ) as ReturnType<Assessment_Section_Configurator['build']['data']>['base'][];
    const locale: Partial<Record<LanguageCode, ReturnType<Assessment_Section_Configurator['build']['data']>['base'][]>> = {};
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
      }) as ReturnType<Assessment_Section_Configurator['build']['data']>['base'][];
    }
    return { base, locale };
  };

  /** Phase names remain semantic; direct child keys preserve stable source references. */
  const buildPhase = (phase: Phase, patches: Record<string, unknown> = {}) => {
    const built = buildSections(phaseItems(phase), phase.children, patches);
    const base = {
      children: [...phase.children],
      ...Object.fromEntries(phase.children.map((key, index) => [key, built.base[index]])),
    } as Assessment_Phase_DataBase;
    const locale: Partial<Record<LanguageCode, Assessment_Phase_DataBase>> = {};
    for (const [language, entries] of Object.entries(built.locale)) {
      locale[language as LanguageCode] = {
        children: [...phase.children],
        ...Object.fromEntries(phase.children.map((key, index) => [key, entries[index]])),
      } as Assessment_Phase_DataBase;
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
    const beforeBuilt = buildPhase(before);
    const afterBuilt = buildPhase(after);
    const quizBuilt = buildChildData(quiz) as SectionResource;
    const files = selectPublicationLocales(translated.files, languages) ?? {};
    for (const language of languages) {
      if (beforeBuilt.locale[language]) (files[language] ??= {}).before = beforeBuilt.locale[language];
      if (afterBuilt.locale[language]) (files[language] ??= {}).after = afterBuilt.locale[language];
      if (quizBuilt.locale?.[language]) {
        (files[language] ??= {}).quiz = mergeForValidation(quizBuilt.base, quizBuilt.locale[language]) as Assessment_DataBase['quiz'];
      }
    }
    const result: Publication<Assessment_DataBase> = structuredClone({
      base: {
        id,
        slug,
        type,
        params: { ...own.params, languages: [...languages] },
        ...(Object.keys(translated.invariant).length ? { locale: translated.invariant } : {}),
        before: beforeBuilt.base,
        quiz: quizBuilt.base as Assessment_DataBase['quiz'],
        after: afterBuilt.base,
      },
      locale: Object.keys(files).length ? files : undefined,
    }) as Publication<Assessment_DataBase>;
    validateRequestedPublication(assessment_Data_Schema, result, languages);
    return result;
  };

  const validatePhasePatch = (
    source: Publication<Assessment_DataBase>,
    patch: Publication<OverrideBase>,
    languages: readonly LanguageCode[],
  ): void => {
    const mergeLayer = (original: Record<string, unknown>, changes: Record<string, unknown>) => {
      const merged = mergeForValidation(original, changes);
      for (const role of ['before', 'after'] as const) {
        if (isRecord(changes[role]) && Array.isArray(changes[role].children)) {
          merged[role] = structuredClone(changes[role]);
        }
      }
      return merged;
    };
    for (const language of languages) {
      const original = mergeLayer(source.base as Record<string, unknown>, source.locale?.[language] ?? {});
      const basePatched = mergeLayer(original, patch.base as Record<string, unknown>);
      const localized = mergeLayer(basePatched, patch.locale?.[language] ?? {});
      assessment_Data_Schema.parse(localized);
    }
  };

  const overrides = <
    const AddedBefore extends Record<string, Assessment_Content_Section_Configurator> = {},
    const AddedAfter extends Record<string, Assessment_Content_Section_Configurator> = {},
  >(
    patch: Assessment_Overrides<PhaseChildMap<Before>, Quiz, PhaseChildMap<After>, AddedBefore, AddedAfter>,
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
      const phase = (name: 'before' | 'after', original: Phase, changeset: unknown): Phase => {
        if (changeset === undefined) return original;
        if (!isRecord(changeset)) throw new Error(name + ' must be an object');
        const originalItems = phaseItems(original);
        const active: Record<string, Assessment_Content_Section_Configurator | false> = { ...originalItems };
        let structural = false;
        for (const [key, change] of Object.entries(changeset)) {
          if (key === 'children') continue;
          if (slugAddressedReservedKeys.some(reserved => reserved === key)) {
            throw new Error('Reserved Assessment Section slug: ' + key);
          }
          if (Object.hasOwn(originalItems, key)) {
            if (change === false) {
              active[key] = false;
              structural = true;
            } else if (isRecord(change) && !isRecord(change.build)) {
              childPatches[key] = change;
            } else {
              throw new Error('Assessment Content Section patch must be a sparse object or false: ' + key);
            }
          } else {
            if (!isRecord(change) || change.type !== 'content') {
              throw new Error('New Assessment Section must be a Content Section Configurator: ' + key);
            }
            active[key] = change as Assessment_Content_Section_Configurator;
            structural = true;
          }
        }
        if (structural && changeset.children === undefined) {
          throw new Error(name + '.children is required when adding or disabling Sections');
        }
        const children = changeset.children ?? original.children;
        if (!Array.isArray(children)) throw new Error(name + '.children must be an array');
        const updated: Phase = {
          children: [...children],
          ...Object.fromEntries(Object.entries(active).filter(([, value]) => value !== false)),
        };
        validatePhase(updated, name);
        return updated;
      };
      if (patch.quiz !== undefined) {
        if (!isRecord(patch.quiz)) throw new Error('Assessment Quiz override must be an object, never false');
        if (isRecord(patch.quiz.params) && Object.hasOwn(patch.quiz.params, 'disabled'))
          throw new Error('Assessment Quiz cannot be disabled or re-enabled via overrides');
      }
      const updatedBefore = phase('before', before, patch.before);
      const updatedAfter = phase('after', after, patch.after);
      validate({ ...mergedMetadata, before: updatedBefore, quiz, after: updatedAfter });
      if (patch.before !== undefined) {
        const built = buildPhase(updatedBefore, childPatches);
        output.base.before = built.base;
        for (const [language, value] of Object.entries(built.locale)) {
          (files[language as LanguageCode] ??= {}).before = value;
        }
      }
      if (patch.after !== undefined) {
        const built = buildPhase(updatedAfter, childPatches);
        output.base.after = built.base;
        for (const [language, value] of Object.entries(built.locale)) {
          (files[language as LanguageCode] ??= {}).after = value;
        }
      }
      if (patch.quiz !== undefined) {
        const built = buildChildOverrides(quiz, patch.quiz as never) as SectionResource;
        output.base.quiz = built.base;
        for (const [language, value] of Object.entries(built.locale ?? {})) {
          (files[language as LanguageCode] ??= {}).quiz = value as Assessment_DataBase['quiz'];
        }
      }
      output.locale = Object.keys(files).length ? files : undefined;
      const result = structuredClone(output);
      validatePhasePatch(data(options), result, languages);
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
