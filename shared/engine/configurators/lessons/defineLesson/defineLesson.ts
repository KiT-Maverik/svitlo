import type { LanguageCodes } from '#schemas';
import type { DeepPartial } from '#types';
import { onlyLocales, onlyStrings, createOrderedConfiguratorCollection, validateOrderedConfiguratorCollection, validateSluggedConfiguratorMap } from '../../_shared';
import type { Section_Configurator } from '../../sections/section.types';
import { sectionTypes } from '../../sections/_shared';
import { lesson_Config_Schema, lessonQuestionTypes, type Lesson_Config } from './defineLesson.schemas';

/**
 * Define a reusable Lesson with slug-keyed Section configurators.
 *
 * @remarks
 * The optional `programId` associates this Lesson with one specific program
 * (Course). Set it only for course-owned narrative or other course-specific
 * lessons which should not be treated as reusable universal content. Omit it
 * for standalone Lessons that may be used by multiple courses. Episode is not
 * needed to express this distinction; migrating Course/Episode consumers is a
 * separate change.
 *
 * `section.items` must contain actual define* Section configurators and
 * `section.order` must list their slugs exactly once. Override params/locale
 * and use `override.section.add/disable/order` to change a course-specific
 * composition without modifying the authored Lesson. Child Sections retain
 * their own override API.
 */
export function defineLesson<
  const Slug extends string,
  const Languages extends readonly [LanguageCodes, ...LanguageCodes[]],
  const Items extends Record<string, Section_Configurator>,
>(
  config: Omit<Lesson_Config, 'slug' | 'params' | 'section'> & {
    slug: Slug;
    params: Omit<Lesson_Config['params'], 'languages'> & { languages: Languages };
    section: { items: Items; order: string[] };
  },
) {
  const validate = (candidate: Lesson_Config) => {
    const { section, flashcards, questions, events, ...metadata } = candidate;
    lesson_Config_Schema.parse(metadata);
    validateOrderedConfiguratorCollection(section, sectionTypes);

    // Validate Question bank keys and the nested configurator boundary only;
    // every Question and Flashcard is responsible for its own validation.
    for (const [type, entries] of Object.entries(questions ?? {})) {
      if (!lessonQuestionTypes.includes(type as (typeof lessonQuestionTypes)[number])) {
        throw new Error('Unknown Lesson question type: ' + type);
      }
      const issues = validateSluggedConfiguratorMap(entries ?? {}, [type], {
        path: 'questions.' + type,
        itemLabel: 'Lesson Question',
      });
      if (issues.length) {
        throw new Error('Invalid Lesson Question configurator: ' + issues.map(issue => issue.message).join('; '));
      }
    }
    for (const flashcard of flashcards) {
      if (flashcard.type !== 'flashcard' || typeof flashcard.config.locales !== 'function') {
        throw new Error('Invalid Lesson Flashcard configurator');
      }
    }
    void events;
  };
  validate(config as unknown as Lesson_Config);

  const { id, slug, type, programId, skills, params, locale, flashcards, questions, events } = config;
  const sections = createOrderedConfiguratorCollection(config.section, sectionTypes);
  const overrides: {
    params?: DeepPartial<Lesson_Config['params']>;
    locale?: DeepPartial<Lesson_Config['locale']>;
    section?: typeof sections.overrides;
  } = {};

  return {
    id,
    slug,
    type,
    config: {
      base: { id, slug, type, programId, skills, params, locale: onlyStrings(locale) },
      locales: () => ({ locale: onlyLocales(locale) }),
      overrides,
      validate,
    },
    section: sections.content,
    flashcards,
    questions,
    events,
    override: {
      params: (value: DeepPartial<Lesson_Config['params']>) => {
        overrides.params = value;
      },
      locale: (value: DeepPartial<Lesson_Config['locale']>) => {
        overrides.locale = value;
      },
      section: {
        add: (sectionSlug: string, section: Section_Configurator) => {
          sections.override.add(sectionSlug, section);
          overrides.section = sections.overrides;
        },
        disable: (slugs: (keyof Items & string)[]) => {
          sections.override.disable(slugs);
          overrides.section = sections.overrides;
        },
        order: (slugs: string[]) => {
          sections.override.order(slugs);
          overrides.section = sections.overrides;
        },
      },
    },
    disable: () => {
      overrides.params = { disabled: true };
    },
  } as const;
}

export type Lesson_Configurator = ReturnType<typeof defineLesson>;
