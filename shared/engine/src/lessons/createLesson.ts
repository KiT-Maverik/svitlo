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
import { assembleLessonResponse, type LessonResponse } from './assembleLessonResponse';
import { assertLessonData } from './assertLessonData';
import { mergeLessonResources } from './mergeLessonResources';
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
export type LessonResource = Record<
  LessonPublicationKind,
  { base: LessonDocument; locale: LessonLocaleDocument }
>;

export type LessonCreator<
  L extends Lesson_Locale,
  Data extends Lesson<'data', L> = Lesson<'data', L>,
> = Entity_Creator<Data, { language: L[number] }, LessonResource> & {
  /** Complete, path-addressed resources. No builder methods enter JSON. */
  getPublicationItems(): ReadonlyMap<string, string>;
  /** Optional build-time preview of the same published-resource assembly used by runtime. */
  toResponse(context: { language: L[number] }): LessonResponse;
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

function resourceFor(partitions: Partitions, language: LanguageCode): LessonResource {
  const document = (kind: LessonPublicationKind) => {
    const { base, locales, pointers } = partitions[kind];
    return {
      base: { data: base },
      locale: {
        data: locales[language] ?? {},
        localeSources: Object.fromEntries(pointers.map(pointer => [pointer, { code: language }])),
      },
    };
  };
  return {
    config: document('config'),
    flashcards: document('flashcards'),
    questions: document('questions'),
  };
}

function makeLessonCreator<L extends Lesson_Locale, Events extends string, const Source extends LessonSource<L, Events>>(
  input: Source,
): LessonCreator<L, LessonDataOf<Source> & Lesson<'data', L, Events>> {
  const getData = (): LessonDataOf<Source> & Lesson<'data', L, Events> => {
    const data = {
      ...input,
      sections: input.sections.map(section => ('getData' in section ? section.getData() : section)),
    } as LessonDataOf<Source> & Lesson<'data', L, Events>;
    assertLessonData(data);
    return data;
  };
  const toResource = (context: { language: L[number] }): LessonResource => {
    const data = getData();
    if (!data.parameters.languages.includes(context.language)) {
      throw new Error(`Lesson ${data.id} does not support language ${context.language}`);
    }
    return resourceFor(partitionsFor(data), context.language);
  };
  const getPublicationItems = (): ReadonlyMap<string, string> => {
    const data = getData();
    const basePath = resolveEntityPath(data.id);
    const partitions = partitionsFor(data);
    const files = new Map<string, string>();
    for (const kind of kinds) {
      const { base, locales, pointers } = partitions[kind];
      files.set(`${basePath}/${kind}/base.json`, JSON.stringify({ data: base }) + '\n');
      for (const language of data.parameters.languages) {
        const localeSources = Object.fromEntries(pointers.map(pointer => [pointer, { code: language }]));
        files.set(
          `${basePath}/${kind}/${language}.json`,
          JSON.stringify({ data: locales[language] ?? {}, localeSources }) + '\n',
        );
      }
    }
    return files;
  };
  const toResponse = (context: { language: L[number] }): LessonResponse => {
    const resources = toResource(context);
    const merged = (kind: LessonPublicationKind) =>
      mergeLessonResources(resources[kind].base, resources[kind].locale);
    return assembleLessonResponse(getData().id, context.language, {
      config: merged('config'),
      flashcards: merged('flashcards'),
      questions: merged('questions'),
    });
  };
  return { getData, toResource, getPublicationItems, toResponse };
}

/**
 * Curried form retains literal Section/Block slugs and validates each localized
 * field against one declared language tuple, including Quiz and event data.
 */
export function createLesson<const L extends Lesson_Locale, Events extends string = never>(): <
  const Source extends LessonSource<L, Events>,
>(
  input: Source &
    { questions: Question_Catalog_ValidSlugs<Source['questions'], L> } &
    LessonEventKeysValidated<Source, Events>,
) => LessonCreator<L, LessonDataOf<Source> & Lesson<'data', L, Events>>;
/** Direct form accepts an already-typed Lesson, as Course creators do. */
export function createLesson<const L extends Lesson_Locale, Events extends string = never>(
  data: Lesson<'data', L, Events>,
): LessonCreator<L>;
export function createLesson<L extends Lesson_Locale, Events extends string = never>(
  data?: LessonSource<L, Events>,
) {
  const build = <const Source extends LessonSource<L, Events>>(source: Source) =>
    makeLessonCreator<L, Events, Source>(source);
  return data === undefined ? build : build(data);
}

/** Filesystem loaders validate their unknown result here, not inside the generator. */
export function createLessonFromUnknown(source: unknown): LessonCreator<Lesson_Locale> {
  assertLessonData(source);
  return createLesson(source);
}
