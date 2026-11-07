import type {
  Course,
  Course_Creator,
  Course_Content,
  Chapter,
  Episode,
  Module,
  Course_Toc,
  Course_TocContext,
  Locale_Languages,
} from '@svitlo/contracts/content';
import { collectCoursePublicationItems, isCourseLesson } from './collectCoursePublicationItems';
import { mergeLessonResources } from '../lessons/mergeLessonResources';
import { splitLessonValue, type SparseLessonValue } from '../lessons/splitLessonValue';
import type { LessonCreator } from '../lessons/createLesson';

type CourseAuthoringEntry<L extends Locale_Languages> =
  | Course_Content<'data', L>
  | LessonCreator<L>
  | Course_Creator<Chapter<'data', L>, L>
  | Course_Creator<Episode<'data', L>, L>
  | Course_Creator<Module<'data', L>, L>;
type CourseInput<L extends Locale_Languages> = Omit<Course<'data', L>, 'content'> & {
  content: readonly CourseAuthoringEntry<L>[];
};

type TocTitle<L extends Locale_Languages> = string | Record<L[number], string>;
type AuthoredToc<L extends Locale_Languages> = {
  type: 'course' | 'module' | 'chapter' | 'lesson' | 'episode';
  id: string;
  title: TocTitle<L>;
  iconKey?: string;
  children?: readonly AuthoredToc<L>[];
};

/**
 * A reused Lesson can have more locales than its Course. Project only the
 * already-authored Course locales into navigation; never mutate Lesson Data or
 * weaken the strict shared locale splitter.
 */
function navigationTitle<L extends Locale_Languages>(
  title: string | Readonly<Record<string, string>>,
  languages: L,
): TocTitle<L> {
  if (typeof title === 'string') return title;
  const values = Object.fromEntries(
    languages.map(language => {
      if (typeof title[language] !== 'string') {
        throw new Error('Course TOC title missing required locale: ' + language);
      }
      return [language, title[language]];
    }),
  );
  return values as Record<L[number], string>;
}

function navigationItem<L extends Locale_Languages>(entry: Course_Content<'data', L>, languages: L): AuthoredToc<L> {
  if (isCourseLesson(entry)) {
    return { type: 'lesson', id: entry.id, title: navigationTitle(entry.title, languages) };
  }
  switch (entry.type) {
    case 'lessonOverride':
      return {
        type: 'lesson',
        id: entry.lesson.id,
        title: navigationTitle(entry.overrides.title ?? entry.lesson.title, languages),
      };
    case 'episode':
      return {
        type: 'episode',
        id: entry.id,
        title: navigationTitle(entry.title.value, languages),
        ...(entry.iconKey ? { iconKey: entry.iconKey } : {}),
      };
    case 'chapter':
      return {
        type: 'chapter',
        id: entry.id,
        title: entry.title.value,
        ...(entry.iconKey ? { iconKey: entry.iconKey } : {}),
        children: entry.content.map(child => navigationItem(child, languages)),
      };
    case 'module':
      return {
        type: 'module',
        id: entry.id,
        title: entry.title.value,
        ...(entry.iconKey ? { iconKey: entry.iconKey } : {}),
        children: entry.content.map(child => navigationItem(child, languages)),
      };
  }
}

export type CoursePublishedData = {
  /** Standalone TOC without embedded Lesson data. */
  toc: unknown;
  /** Standalone Episode content indexed by stable ID. */
  episodes: Readonly<Record<string, unknown>>;
  /** Course-local Lesson patches indexed by referenced Lesson ID. */
  overrides: Readonly<Record<string, unknown>>;
};
export type CourseCreator<L extends Locale_Languages> = Course_Creator<Course<'data', L>, L> & {
  getBase(): CoursePublishedData;
  getLocale(language: L[number]): CoursePublishedData;
  /** Build the fully assembled navigation tree for authoring previews only. */
  toToc(context: Course_TocContext<L>): Course_Toc;
};

type CoursePartitions = {
  toc: SparseLessonValue;
  episodes: Map<string, SparseLessonValue>;
  overrides: Map<string, SparseLessonValue>;
};

export function createCourse<const L extends Locale_Languages>(course: CourseInput<L>): CourseCreator<L> {
  const getData = (): Course<'data', L> => {
    const data: Course<'data', L> = {
      ...course,
      content: course.content.map(entry => ('getData' in entry ? entry.getData() : entry)),
    };
    // Every Course locale must be implemented by each standalone Lesson.
    // Extra Lesson locales are allowed and are not copied into Course assets.
    const languages = data.parameters.languages;
    for (const lesson of collectCoursePublicationItems<L>(data.content).lessons) {
      const actual = lesson.parameters.languages;
      if (new Set(actual).size !== actual.length || languages.some(language => !actual.includes(language))) {
        throw new Error(
          'Course ' + data.id + ': Lesson ' + lesson.id + ' does not cover Course languages ' + languages.join(', '),
        );
      }
    }
    return data;
  };
  const getContentEntries = () => collectCoursePublicationItems<L>(getData().content);

  let partitions: CoursePartitions | undefined;
  const getPartitions = (): CoursePartitions => {
    if (!partitions) {
      const data = getData();
      const languages = data.parameters.languages;
      const entries = getContentEntries();
      const toc: AuthoredToc<L> = {
        type: 'course',
        id: data.id,
        title: navigationTitle(data.title.value, languages),
        children: data.content.map(entry => navigationItem(entry, languages)),
      };
      partitions = {
        toc: splitLessonValue(toc, languages),
        episodes: new Map(entries.episodes.map(episode => [episode.id, splitLessonValue(episode, languages)])),
        overrides: new Map(
          entries.overrides.map(item => {
            const { lesson, ...patch } = item;
            return [item.lessonId, splitLessonValue(patch, languages)];
          }),
        ),
      };
    }
    return partitions;
  };
  const getBase = (): CoursePublishedData => {
    const parts = getPartitions();
    return {
      toc: parts.toc.base,
      episodes: Object.fromEntries([...parts.episodes].map(([id, part]) => [id, part.base])),
      overrides: Object.fromEntries([...parts.overrides].map(([id, part]) => [id, part.base])),
    };
  };
  const getLocale = (language: L[number]): CoursePublishedData => {
    if (!getData().parameters.languages.includes(language)) {
      throw new Error('Unsupported Course language: ' + language);
    }
    const parts = getPartitions();
    return {
      toc: parts.toc.locales[language] ?? {},
      episodes: Object.fromEntries([...parts.episodes].map(([id, part]) => [id, part.locales[language] ?? {}])),
      overrides: Object.fromEntries([...parts.overrides].map(([id, part]) => [id, part.locales[language] ?? {}])),
    };
  };
  const toToc = (context: Course_TocContext<L>): Course_Toc =>
    mergeLessonResources(getBase().toc, getLocale(context.language).toc) as Course_Toc;
  return { getData, getContentEntries, getBase, getLocale, toToc };
}
