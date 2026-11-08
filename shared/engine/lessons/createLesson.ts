import type { LanguageCode } from '@svitlo/contracts/localization';
import type {
  Entity_Creator,
  Lesson,
  LessonEventKeysValidated,
  Lesson_Locale,
  Question_Catalog_ValidSlugs,
  Section,
} from '@svitlo/contracts/content';
import { DEFAULT_SUPPORTED_LANGUAGES } from '../types/languages';
import { resolveEntityPath } from '../utils/entityPath/resolveEntityPath.utils';
import { assertLessonData } from './assertLessonData';
import { splitLessonValue, type SparseLessonValue } from './splitLessonValue';
import type { SectionCreator } from './createSection';

type SectionSource<L extends Lesson_Locale> = Section<'data', L> | SectionCreator<L>;
type LessonSource<L extends Lesson_Locale, Events extends string> = Omit<Lesson<'data', L, Events>, 'sections'> & {
  sections: readonly SectionSource<L>[];
};

type Materialized<Value> = Value extends { getData(): infer Data } ? Data : Value;
export type LessonDataOf<Source extends { sections: readonly unknown[] }> = Omit<Source, 'sections'> & {
  sections: { readonly [Index in keyof Source['sections']]: Materialized<Source['sections'][Index]> };
};

export type LessonPublicationKind = 'config' | 'flashcards' | 'questions';
export type LessonDocument = { data: unknown };
export type LessonLocaleDocument = LessonDocument & {
  localeSources: Record<string, { code: LanguageCode }>;
};
export type LessonBase = Record<LessonPublicationKind, LessonDocument>;
export type LessonLocale = Record<LessonPublicationKind, LessonLocaleDocument>;

export type LessonCreator<
  L extends Lesson_Locale,
  Data extends Lesson<'data', L> = Lesson<'data', L>,
> = Entity_Creator<Data> & {
  /** Structural and invariant values for all three independent published collections. */
  getBase(): LessonBase;
  /** Only sparse localized fields plus language source pointers, never invariant data. */
  getLocale(language: L[number]): LessonLocale;
};

const kinds = ['config', 'flashcards', 'questions'] as const;
type Partitions = Record<LessonPublicationKind, SparseLessonValue>;

function partitionsFor<L extends Lesson_Locale>(data: Lesson<'data', L>): Partitions {
  const supported = new Set(DEFAULT_SUPPORTED_LANGUAGES.map(item => item.language));
  const languages = data.parameters.languages;
  const relativePath = resolveEntityPath(data.id);
  if (new Set(languages).size !== languages.length || languages.some(code => !supported.has(code))) {
    throw new Error(`Lesson ${relativePath} has duplicate or unsupported languages`);
  }
  const { flashcards, questions, sections, ...config } = data;
  return {
    config: splitLessonValue({ ...config, sections }, languages),
    flashcards: splitLessonValue(flashcards, languages),
    questions: splitLessonValue(questions, languages),
  };
}

function makeLessonCreator<
  L extends Lesson_Locale,
  Events extends string,
  const Source extends LessonSource<L, Events>,
>(input: Source): LessonCreator<L, LessonDataOf<Source> & Lesson<'data', L, Events>> {
  let normalized: (LessonDataOf<Source> & Lesson<'data', L, Events>) | undefined;
  let partitions: Partitions | undefined;
  const getData = (): LessonDataOf<Source> & Lesson<'data', L, Events> => {
    if (!normalized) {
      const data = {
        ...input,
        sections: input.sections.map(section => ('getData' in section ? section.getData() : section)),
      } as LessonDataOf<Source> & Lesson<'data', L, Events>;
      assertLessonData(data);
      normalized = data;
    }
    return normalized;
  };
  const getPartitions = (): Partitions => (partitions ??= partitionsFor(getData()));
  const getBase = (): LessonBase => {
    const parts = getPartitions();
    return Object.fromEntries(kinds.map(kind => [kind, { data: parts[kind].base }])) as LessonBase;
  };
  const getLocale = (language: L[number]): LessonLocale => {
    const data = getData();
    if (!data.parameters.languages.includes(language)) {
      throw new Error(`Lesson ${data.id} does not support language ${language}`);
    }
    const parts = getPartitions();
    return Object.fromEntries(
      kinds.map(kind => {
        const { locales, pointers } = parts[kind];
        return [
          kind,
          {
            data: locales[language] ?? {},
            localeSources: Object.fromEntries(pointers.map(pointer => [pointer, { code: language }])),
          },
        ];
      }),
    ) as LessonLocale;
  };
  return { getData, getBase, getLocale };
}

/** Curried form retains literal Section/Block slugs and validates all locale dictionaries. */
export function createLesson<const L extends Lesson_Locale, Events extends string = never>(): <
  const Source extends LessonSource<L, Events>,
>(
  input: Source & { questions: Question_Catalog_ValidSlugs<Source['questions'], L> } & LessonEventKeysValidated<
      Source,
      Events
    >,
) => LessonCreator<L, LessonDataOf<Source> & Lesson<'data', L, Events>>;
/** Direct form accepts an already-typed Lesson, as Course creators do. */
export function createLesson<const L extends Lesson_Locale, Events extends string = never>(
  data: Lesson<'data', L, Events>,
): LessonCreator<L>;
export function createLesson<L extends Lesson_Locale, Events extends string = never>(
  data?: LessonSource<L, Events>,
): unknown {
  const build = <const Source extends LessonSource<L, Events>>(source: Source) =>
    makeLessonCreator<L, Events, Source>(source);
  return data === undefined ? build : build(data);
}

/** Filesystem loaders validate unknown input here; creators do not write files. */
export function createLessonFromUnknown(source: unknown): LessonCreator<Lesson_Locale> {
  assertLessonData(source);
  return createLesson(source);
}
