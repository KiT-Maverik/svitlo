import type {
  DeepPartial,
  LanguageScope,
  ChildrenSupporting,
  RequireLanguages,
  PublicationLanguageOptions,
} from '#types';
import type { LanguageCode } from '#schemas';

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
import type { Section_Configurator } from '../../sections';
import { sectionTypes } from '../../sections';
import type { Flashcard_Configurator } from '../../flashcards';
import { questionTypes } from '../../questions';
import type { Question_Configurator } from '../../questions';
import {
  lesson_Config_Schema,
  lesson_Override_Metadata_Schema,
  lesson_Props_Schema,
  lessonQuestionTypes,
  type Lesson_Config,
  type Lesson_PropsBase,
  type Lesson_Overrides,
  type Lesson_QuestionBank,
  type Lesson_Question_Type,
} from './defineLesson.schemas';

type Child = {
  id: string;
  slug: string;
  type: string;
  config?: { base?: { id?: string; slug?: string; type?: string }; locales?: () => unknown };
  build: {
    props: (options: PublicationLanguageOptions) => ChildResource;
    overrides: (patch: never, options: PublicationLanguageOptions) => ChildPatch;
  };
};
type ChildResource = {
  base: Record<string, unknown>;
  locale: Partial<Record<LanguageCode, Record<string, unknown>>> | undefined;
};
type ChildPatch = {
  base: DeepPartial<Record<string, unknown>>;
  locale: Partial<Record<LanguageCode, Record<string, unknown>>> | undefined;
};
type LocaleBody = {
  locale?: { title?: string };
  section?: Lesson_PropsBase['section'];
  flashcards?: Lesson_PropsBase['flashcards'];
  questions?: Lesson_PropsBase['questions'];
};
type Files = Partial<Record<LanguageCode, LocaleBody>>;
type Publication<Base> = { base: Base; locale: Files | undefined };
type OverrideBase = {
  params?: DeepPartial<Omit<Lesson_Config['params'], 'languages'>>;
  locale?: { title?: string };
  section?: Lesson_PropsBase['section'];
  flashcards?: Lesson_PropsBase['flashcards'];
  questions?: Lesson_PropsBase['questions'];
  events?: NonNullable<Lesson_Config['events']>;
};
type CollectionPatch = { items?: Record<string, unknown>; additionalItems?: Record<string, unknown>; order?: string[] };
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
/** Verify complete Props for the requested language, including applied nested array patches. */
const validatePublication = (
  resource: Publication<unknown>,
  languages: readonly LanguageCode[],
  patch?: Publication<unknown>,
): void => {
  for (const language of languages) {
    const original = mergeForValidation(
      resource.base as Record<string, unknown>,
      (resource.locale?.[language] ?? {}) as DeepPartial<Record<string, unknown>>,
    );
    const withPatch = patch
      ? mergeForValidation(original, patch.base as DeepPartial<Record<string, unknown>>)
      : original;
    const effective = patch
      ? mergeForValidation(withPatch, (patch.locale?.[language] ?? {}) as DeepPartial<Record<string, unknown>>)
      : withPatch;
    try {
      lesson_Props_Schema.parse(effective);
    } catch (error) {
      throw new Error(
        'Invalid Lesson Props for language ' +
          language +
          ': ' +
          (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  }
};
const isBuildChild = (value: unknown): value is Child => {
  if (!isRecord(value) || !isRecord(value.build)) return false;
  return (
    typeof value.id === 'string' &&
    typeof value.slug === 'string' &&
    typeof value.type === 'string' &&
    typeof value.build.props === 'function' &&
    typeof value.build.overrides === 'function'
  );
};

/** A required Quiz must remain present and enabled in the effective Lesson sections. */
const hasEnabledQuiz = (sections: readonly { type: string; params?: { disabled?: boolean } }[]): boolean =>
  sections.some(section => section.type === 'quiz' && section.params?.disabled !== true);

/** Validate ownership/identity only; children handle their own schemas and semantics. */
const validate = (config: Lesson_Config): void => {
  if (Object.hasOwn(config, 'programId')) {
    throw new Error('Lesson must not declare programId; Course ownership is defined by authoring composition');
  }
  lesson_Config_Schema.parse(config);
  for (const [name, collection, kinds] of [
    ['section', config.section, sectionTypes],
    ['flashcards', config.flashcards, ['flashcard']],
  ] as const) {
    const issues = [
      ...validateOrderedKeys(collection, { path: name }),
      ...validateSluggedConfiguratorMap(collection.items, kinds, {
        path: name + '.items',
        itemLabel: name + ' child',
      }),
    ];
    if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
    for (const [key, child] of Object.entries(collection.items)) {
      if (
        !isBuildChild(child) ||
        !isRecord(child.config?.base) ||
        child.config.base.id !== child.id ||
        child.config.base.slug !== key ||
        child.config.base.type !== child.type
      ) {
        throw new Error('Invalid Lesson ' + name + ' Build API or identity: ' + key);
      }
    }
  }
  if (
    config.params.requireQuiz &&
    !hasEnabledQuiz(
      config.section.order.map(
        key => config.section.items[key].build.props({ languages: config.params.languages }).base,
      ),
    )
  ) {
    throw new Error('Lesson requires at least one enabled Quiz section');
  }
  for (const [kind, entries] of Object.entries(config.questions ?? {})) {
    if (!lessonQuestionTypes.includes(kind as Lesson_Question_Type)) {
      throw new Error('Unknown Lesson question type: ' + kind);
    }
    const issues = validateSluggedConfiguratorMap(entries, [kind], {
      path: 'questions.' + kind,
      itemLabel: 'Lesson Question',
    });
    if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
    for (const [key, child] of Object.entries(entries)) {
      if (!isRecord(child) || child.type !== kind || child.slug !== key) {
        throw new Error('Invalid Lesson Question identity: ' + kind + '.' + key);
      }
    }
  }
};

/**
 * Author a reusable, Course-neutral Lesson with Sections, Flashcards and a Question Bank.
 *
 * @remarks
 * `questions` is a separate bank keyed first by Question type and then by
 * Question slug. Quiz Sections select from this bank through `params.selection`,
 * allowing a Question to be reused without duplicating its content. Questions
 * are not Section ContentBlocks. Use `section` to organize the instructional
 * sequence and `flashcards` for independent recall material. Enable
 * `params.requireQuiz` when at least one enabled Quiz Section is mandatory.
 *
 * `params.sections.allowSkipping` controls whether Sections may be skipped
 * throughout the Lesson. Sections inherit that permission unless their own
 * `params.skippable: false` prohibits skipping. A Section cannot enable
 * skipping when the Lesson disallows it. Blocking Quizzes and Quiz interaction
 * settings may further restrict skipping.
 */
export function defineLesson<
  const Slug extends string,
  const Languages extends readonly [LanguageCode, ...LanguageCode[]],
  const Sections extends Record<string, Section_Configurator>,
  const Cards extends Record<string, Flashcard_Configurator> = {},
  const Questions extends Lesson_QuestionBank = {},
>(
  config: Omit<Lesson_Config, 'slug' | 'params' | 'locale' | 'section' | 'flashcards' | 'questions'> & {
    slug: Slug;
    params: Omit<Lesson_Config['params'], 'languages'> & { languages: Languages };
    locale: RequireLanguages<Lesson_Config['locale'], Languages>;
    section: { items: Sections & ChildrenSupporting<Languages, Sections>; order: string[] };
    flashcards: { items: Cards & ChildrenSupporting<Languages, Cards>; order: string[] };
    questions?: Questions & {
      [Kind in keyof Questions]: Questions[Kind] extends Record<string, Question_Configurator>
        ? Questions[Kind] & ChildrenSupporting<Languages, Questions[Kind]>
        : Questions[Kind];
    };
  },
) {
  validate(config as unknown as Lesson_Config);
  const metadataSchema = lesson_Config_Schema.omit({
    section: true,
    flashcards: true,
    questions: true,
  });
  const authored = structuredClone(metadataSchema.parse(config));
  const copyAuthored = () => metadataSchema.parse(structuredClone(authored));
  const { id, type, slug } = authored;
  const initialSections: Sections = { ...config.section.items };
  const sectionOrder = [...config.section.order];
  const initialCards: Cards = { ...config.flashcards.items };
  const flashcardOrder = [...config.flashcards.order];
  const initialQuestions: Lesson_QuestionBank = Object.fromEntries(
    Object.entries(config.questions ?? {}).map(([kind, entries]) => [kind, { ...entries }]),
  );
  const section = { items: { ...initialSections }, order: [...sectionOrder] };
  const flashcards = { items: { ...initialCards }, order: [...flashcardOrder] };
  // Configurators contain methods and cannot be structured-cloned. Copy only the bank maps.
  const questions = Object.fromEntries(Object.entries(initialQuestions).map(([kind, items]) => [kind, { ...items }]));
  const base = {
    id,
    slug,
    type,
    skills: [...authored.skills],
    params: structuredClone(authored.params),
    locale: onlyStrings(authored.locale),
    ...(authored.events !== undefined ? { events: structuredClone(authored.events) } : {}),
  };

  const buildOrdered = (
    items: Record<string, unknown>,
    order: readonly string[],
    languages: readonly LanguageCode[],
    changes: Record<string, unknown> = {},
  ) => {
    const entries = order.map(key => {
      const child = items[key];
      if (!isBuildChild(child)) throw new Error('Nested child is missing Build API: ' + key);
      const resource = child.build.props({ languages });
      const patch = Object.hasOwn(changes, key)
        ? child.build.overrides(changes[key] as never, { languages })
        : undefined;
      return { resource, patch };
    });
    const bases = entries.map(({ resource, patch }) =>
      patch ? mergeForValidation(resource.base, patch.base) : resource.base,
    );
    const locales: Partial<Record<LanguageCode, Record<string, unknown>[]>> = {};
    for (const code of languages) {
      if (
        !entries.some(
          ({ resource, patch }) => resource.locale?.[code] !== undefined || patch?.locale?.[code] !== undefined,
        )
      )
        continue;
      locales[code] = entries.map(({ resource, patch }) => {
        const original = mergeForValidation(
          resource.base,
          (resource.locale?.[code] ?? {}) as DeepPartial<typeof resource.base>,
        );
        const effective = patch ? mergeForValidation(original, patch.base) : original;
        return patch?.locale?.[code] ? mergeForValidation(effective, patch.locale[code]) : effective;
      });
    }
    return { bases, locales };
  };

  const buildQuestions = (
    bank: Lesson_QuestionBank,
    languages: readonly LanguageCode[],
    changes: Partial<Record<Lesson_Question_Type, Record<string, unknown>>> = {},
  ) => {
    const base: NonNullable<Lesson_PropsBase['questions']> = {};
    const locales: Partial<Record<LanguageCode, NonNullable<Lesson_PropsBase['questions']>>> = {};
    for (const [kind, items] of Object.entries(bank)) {
      const built = buildOrdered(
        items,
        Object.keys(items).sort(),
        languages,
        changes[kind as Lesson_Question_Type] ?? {},
      );
      (base as Record<string, unknown>)[kind] = built.bases;
      for (const [code, entries] of Object.entries(built.locales)) {
        const localized = (locales[code as LanguageCode] ??= {});
        (localized as Record<string, unknown>)[kind] = entries;
      }
    }
    return { base, locales };
  };

  const addLocalizedArray = (
    files: Files,
    key: 'section' | 'flashcards',
    values: ReturnType<typeof buildOrdered>['locales'],
  ) => {
    for (const [code, children] of Object.entries(values)) {
      (files[code as LanguageCode] ??= {})[key] = children as never;
    }
  };
  const addQuestionFiles = (files: Files, values: ReturnType<typeof buildQuestions>['locales']) => {
    for (const [code, children] of Object.entries(values)) {
      (files[code as LanguageCode] ??= {}).questions = children;
    }
  };

  const props = (options: PublicationLanguageOptions<Languages>): Publication<Lesson_PropsBase> => {
    const languages = resolvePublicationLanguages(options);
    const own = copyAuthored();
    for (const code of languages) {
      if (!own.params.languages.includes(code))
        throw new Error('Lesson does not support publication language: ' + code);
    }
    const split = splitLocalizedFields(own.locale);
    const files: Files = {};
    for (const [code, fields] of Object.entries(selectPublicationLocales(split.locale, languages) ?? {})) {
      files[code as LanguageCode] = { locale: fields as LocaleBody['locale'] };
    }
    const sections = buildOrdered(initialSections, sectionOrder, languages);
    const cards = buildOrdered(initialCards, flashcardOrder, languages);
    const bank = buildQuestions(initialQuestions, languages);
    addLocalizedArray(files, 'section', sections.locales);
    addLocalizedArray(files, 'flashcards', cards.locales);
    addQuestionFiles(files, bank.locales);
    const result = structuredClone({
      base: {
        id,
        slug,
        type,
        skills: own.skills,
        params: { ...own.params, languages: [...languages] },
        ...(Object.keys(split.base).length ? { locale: split.base as { title?: string } } : {}),
        section: sections.bases as Lesson_PropsBase['section'],
        flashcards: cards.bases as Lesson_PropsBase['flashcards'],
        ...(Object.keys(bank.base).length ? { questions: bank.base } : {}),
        ...(own.events !== undefined ? { events: own.events } : {}),
      },
      locale: Object.keys(files).length ? files : undefined,
    });
    validatePublication(result, languages);
    return result;
  };

  /** Nested patches rebuild only the changed, ordered collection, as a complete atomic array. */
  const resolveCollection = (
    label: 'section' | 'flashcards',
    original: Record<string, unknown>,
    sourceOrder: readonly string[],
    patch: CollectionPatch | undefined,
    allowedTypes: readonly string[],
  ) => {
    if (patch !== undefined && !isRecord(patch)) throw new Error(label + ' must be an object');
    for (const key of Object.keys(patch ?? {})) {
      if (!['items', 'additionalItems', 'order'].includes(key))
        throw new Error('Unknown ' + label + ' override field: ' + key);
    }
    const changes = patch?.items ?? {};
    const additions = patch?.additionalItems ?? {};
    if (!isRecord(changes) || !isRecord(additions)) throw new Error('Invalid ' + label + ' patch maps');
    const issues = validateSluggedConfiguratorMap(additions, allowedTypes, {
      path: label + '.additionalItems',
      itemLabel: label + ' child',
    });
    if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
    const enabled: Record<string, unknown | false> = { ...original };
    let structureChanged = Object.keys(additions).length > 0;
    for (const [key, child] of Object.entries(additions)) {
      if (Object.hasOwn(original, key)) throw new Error('Duplicate ' + label + ' slug: ' + key);
      if (
        !isBuildChild(child) ||
        !isRecord(child.config?.base) ||
        child.config.base.id !== child.id ||
        child.config.base.slug !== key ||
        child.config.base.type !== child.type
      ) {
        throw new Error('Invalid added ' + label + ' Build child: ' + key);
      }
      enabled[key] = child;
    }
    const childChanges: Record<string, unknown> = {};
    for (const [key, change] of Object.entries(changes)) {
      if (!Object.hasOwn(original, key)) throw new Error('Unknown existing ' + label + ' child: ' + key);
      if (change === false) {
        enabled[key] = false;
        structureChanged = true;
      } else {
        if (!isRecord(change)) throw new Error(label + ' child patch must be an object or false: ' + key);
        childChanges[key] = change;
      }
    }
    if (structureChanged && patch?.order === undefined) {
      throw new Error(label + '.order is required when adding or disabling children');
    }
    const order = patch?.order ?? sourceOrder;
    const orderIssues = validateOrderedKeys({ items: enabled, order }, { path: label, allowDisabled: true });
    if (orderIssues.length) throw new Error(orderIssues.map(issue => issue.message).join('; '));
    const active = Object.fromEntries(Object.entries(enabled).filter(entry => entry[1] !== false));
    return {
      active,
      order,
      childChanges,
      changed:
        patch !== undefined &&
        (Object.keys(changes).length > 0 || Object.keys(additions).length > 0 || patch.order !== undefined),
    };
  };

  const overrides = <
    const AddedSections extends Record<string, Section_Configurator> = {},
    const AddedCards extends Record<string, Flashcard_Configurator> = {},
    const AddedQuestions extends Lesson_QuestionBank = {},
  >(
    patch: Lesson_Overrides<Sections, Cards, Questions, AddedSections, AddedCards, AddedQuestions> & {
      section?: { additionalItems?: AddedSections & ChildrenSupporting<Languages, AddedSections> };
      flashcards?: { additionalItems?: AddedCards & ChildrenSupporting<Languages, AddedCards> };
      questions?: {
        [Kind in keyof AddedQuestions]?: {
          additionalItems?: AddedQuestions[Kind] extends Record<string, Question_Configurator>
            ? AddedQuestions[Kind] & ChildrenSupporting<Languages, AddedQuestions[Kind]>
            : AddedQuestions[Kind];
        };
      };
    },
    options: PublicationLanguageOptions<Languages>,
  ): Publication<OverrideBase> => {
    try {
      const languages = resolvePublicationLanguages(options);
      for (const code of languages) {
        if (!authored.params.languages.includes(code))
          throw new Error('Lesson does not support publication language: ' + code);
      }
      if (!isRecord(patch)) throw new Error('Expected Lesson overrides object');
      for (const key of Object.keys(patch)) {
        if (!['params', 'locale', 'events', 'section', 'flashcards', 'questions'].includes(key)) {
          throw new Error('Unknown Lesson override field: ' + key);
        }
      }
      const metadataPatch = lesson_Override_Metadata_Schema.parse(
        Object.fromEntries(Object.entries(patch).filter(([key]) => ['params', 'locale', 'events'].includes(key))),
      );
      const own = metadataSchema.parse(mergeForValidation(copyAuthored(), metadataPatch));
      const split = splitLocalizedFields(metadataPatch.locale ?? {});
      const files: Files = {};
      for (const [code, fields] of Object.entries(selectPublicationLocales(split.locale, languages) ?? {})) {
        files[code as LanguageCode] = { locale: fields as LocaleBody['locale'] };
      }
      const output: Publication<OverrideBase> = {
        base: {
          ...(metadataPatch.params !== undefined ? { params: metadataPatch.params } : {}),
          ...(Object.keys(split.base).length ? { locale: split.base as { title?: string } } : {}),
          ...(metadataPatch.events !== undefined ? { events: metadataPatch.events } : {}),
        },
        locale: undefined,
      };
      const sections = resolveCollection(
        'section',
        initialSections,
        sectionOrder,
        patch.section as CollectionPatch | undefined,
        sectionTypes,
      );
      const cards = resolveCollection(
        'flashcards',
        initialCards,
        flashcardOrder,
        patch.flashcards as CollectionPatch | undefined,
        ['flashcard'],
      );
      if (sections.changed) {
        const built = buildOrdered(sections.active, sections.order, languages, sections.childChanges);
        output.base.section = built.bases as Lesson_PropsBase['section'];
        addLocalizedArray(files, 'section', built.locales);
      }
      if (cards.changed) {
        const built = buildOrdered(cards.active, cards.order, languages, cards.childChanges);
        output.base.flashcards = built.bases as Lesson_PropsBase['flashcards'];
        addLocalizedArray(files, 'flashcards', built.locales);
      }

      const nextQuestions: Lesson_QuestionBank = { ...initialQuestions };
      const questionPatches: Partial<Record<Lesson_Question_Type, Record<string, unknown>>> = {};
      if (patch.questions !== undefined && !isRecord(patch.questions)) {
        throw new Error('questions must be a named Question Bank patch');
      }
      if (patch.questions) {
        for (const [kind, group] of Object.entries(patch.questions)) {
          if (!questionTypes.includes(kind as Lesson_Question_Type)) {
            throw new Error('Unknown Lesson Question type: ' + kind);
          }
          if (!isRecord(group)) throw new Error('Question group override must be an object: ' + kind);
          for (const key of Object.keys(group)) {
            if (!['items', 'additionalItems'].includes(key)) {
              throw new Error('Unknown Lesson Question group override field: ' + key);
            }
          }
          const originals = initialQuestions[kind as Lesson_Question_Type] ?? {};
          const changes = group.items ?? {};
          const additions = group.additionalItems ?? {};
          if (!isRecord(changes) || !isRecord(additions)) throw new Error('Invalid Question Bank patch maps');
          const addedIssues = validateSluggedConfiguratorMap(additions, [kind], {
            path: 'questions.' + kind + '.additionalItems',
            itemLabel: 'Question',
          });
          if (addedIssues.length) throw new Error(addedIssues.map(issue => issue.message).join('; '));
          const active: Record<string, Question_Configurator> = { ...originals };
          for (const [key, child] of Object.entries(additions)) {
            if (Object.hasOwn(originals, key)) throw new Error('Duplicate Question Bank slug: ' + key);
            if (!isBuildChild(child)) throw new Error('New Question must expose the Build API: ' + key);
            active[key] = child as Question_Configurator;
          }
          const childChanges: Record<string, unknown> = {};
          for (const [key, change] of Object.entries(changes)) {
            if (!Object.hasOwn(originals, key)) throw new Error('Unknown existing Question Bank slug: ' + key);
            if (change === false) delete active[key];
            else {
              if (!isRecord(change)) throw new Error('Question Bank patch must be an object or false: ' + key);
              childChanges[key] = change;
            }
          }
          nextQuestions[kind as Lesson_Question_Type] = active;
          questionPatches[kind as Lesson_Question_Type] = childChanges;
        }
        if (Object.keys(patch.questions).length) {
          const built = buildQuestions(nextQuestions, languages, questionPatches);
          output.base.questions = built.base;
          addQuestionFiles(files, built.locales);
        }
      }
      // Recheck parent collection, identity and cross-child invariants after changes.
      validate({
        ...own,
        section: { items: sections.active as Record<string, Section_Configurator>, order: [...sections.order] },
        flashcards: { items: cards.active as Record<string, Flashcard_Configurator>, order: [...cards.order] },
        questions: nextQuestions,
      });
      // Child overrides can disable a Quiz without removing its configurator from the map.
      if (
        own.params.requireQuiz &&
        !hasEnabledQuiz(
          sections.changed
            ? (output.base.section ?? [])
            : (buildOrdered(sections.active, sections.order, languages).bases as Lesson_PropsBase['section']),
        )
      ) {
        throw new Error('Lesson requires at least one enabled Quiz section');
      }
      output.locale = Object.keys(files).length ? files : undefined;
      const result = structuredClone(output);
      validatePublication(props(options), languages, result);
      return result;
    } catch (error) {
      throw new Error(
        'Invalid Lesson overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const result = {
    id,
    slug,
    type,
    section,
    flashcards,
    questions,
    validate,
    build: { props, overrides },
    config: {
      base,
      locales: (): { locale: DeepPartial<Lesson_Config['locale']> } => ({
        locale: onlyLocales(copyAuthored().locale),
      }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
}

export type Lesson_Configurator = ReturnType<typeof defineLesson>;
