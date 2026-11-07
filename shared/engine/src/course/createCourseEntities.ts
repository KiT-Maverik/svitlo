import type {
  Chapter,
  Chapter_Content,
  Course_Creator,
  Course_LessonAuthoringOverride,
  Course_Resource,
  Course_TocChapter,
  Course_TocContext,
  Course_TocEpisode,
  Course_TocLesson,
  Course_TocModule,
  Episode,
  Lesson,
  Locale_Languages,
  Module,
} from '@svitlo/contracts/content';
import { collectCoursePublicationItems, isCourseLesson } from './collectCoursePublicationItems';

type EpisodeCreator<L extends Locale_Languages> = Course_Creator<Episode<'data', L>, Course_TocEpisode, L>;
type ChapterCreator<L extends Locale_Languages> = Course_Creator<Chapter<'data', L>, Course_TocChapter, L>;

type LessonEntry<L extends Locale_Languages> = Lesson<'data', L> | Course_LessonAuthoringOverride<L>;
type ChapterEntry<L extends Locale_Languages> = LessonEntry<L> | Episode<'data', L> | EpisodeCreator<L>;
type ModuleEntry<L extends Locale_Languages> = ChapterEntry<L> | Chapter<'data', L> | ChapterCreator<L>;

function isCreator<Data, Toc, L extends Locale_Languages>(value: unknown): value is Course_Creator<Data, Toc, L> {
  return (
    !!value &&
    typeof value === 'object' &&
    'getData' in value &&
    typeof value.getData === 'function' &&
    'toToc' in value &&
    typeof value.toToc === 'function' &&
    'toResource' in value &&
    typeof value.toResource === 'function'
  );
}

function localizeTitle<L extends Locale_Languages>(
  text: { value: string | Record<L[number], string> },
  context: Course_TocContext<L>,
): string {
  if (typeof text.value === 'string') return text.value;
  const title = text.value[context.language];
  if (typeof title !== 'string') throw new Error(`Missing title for ${context.language}`);
  return title;
}

export function lessonToc<L extends Locale_Languages>(entry: LessonEntry<L>, context: Course_TocContext<L>): Course_TocLesson {
  const lesson = isCourseLesson(entry) ? entry : entry.lesson;
  const title = isCourseLesson(entry) ? lesson.title : entry.overrides.title ?? lesson.title;
  const localizedTitle = typeof title === 'string' ? title : title[context.language];
  if (typeof localizedTitle !== 'string') {
    throw new Error(`Missing Lesson title for ${context.language}`);
  }
  return { type: 'lesson', id: lesson.id, title: localizedTitle };
}

function episodeToc<L extends Locale_Languages>(
  entry: Episode<'data', L> | EpisodeCreator<L>,
  context: Course_TocContext<L>,
): Course_TocEpisode {
  return isCreator<Episode<'data', L>, Course_TocEpisode, L>(entry)
    ? entry.toToc(context)
    : createEpisode(entry).toToc(context);
}

function chapterChildToc<L extends Locale_Languages>(
  item: ChapterEntry<L>,
  context: Course_TocContext<L>,
): Course_TocLesson | Course_TocEpisode {
  if (isCourseLesson(item) || ('type' in item && item.type === 'lessonOverride')) {
    return lessonToc(item, context);
  }
  return episodeToc(item, context);
}

function moduleChildToc<L extends Locale_Languages>(
  item: ModuleEntry<L>,
  context: Course_TocContext<L>,
): Course_TocChapter | Course_TocLesson | Course_TocEpisode {
  if (isCourseLesson(item) || ('type' in item && item.type === 'lessonOverride')) {
    return lessonToc(item, context);
  }
  if (isCreator<Chapter<'data', L> | Episode<'data', L>, Course_TocChapter | Course_TocEpisode, L>(item)) {
    return item.toToc(context);
  }
  if (item.type === 'chapter') return createChapter(item).toToc(context);
  return episodeToc(item, context);
}

function unwrapChild<L extends Locale_Languages>(
  child: ModuleEntry<L>,
): LessonEntry<L> | Chapter<'data', L> | Episode<'data', L> {
  return isCreator<Chapter<'data', L> | Episode<'data', L>, Course_TocChapter | Course_TocEpisode, L>(child)
    ? child.getData()
    : child;
}

function unwrapChapterChild<L extends Locale_Languages>(child: ChapterEntry<L>): Chapter_Content<'data', L> {
  return isCreator<Episode<'data', L>, Course_TocEpisode, L>(child) ? child.getData() : child;
}

type ChapterInput<L extends Locale_Languages> = Omit<Chapter<'data', L>, 'content'> & {
  content: readonly ChapterEntry<L>[];
};
type ModuleInput<L extends Locale_Languages> = Omit<Module<'data', L>, 'content'> & {
  content: readonly ModuleEntry<L>[];
};

/** Build-time, IO-free Chapter creator. */
export function createChapter<const L extends Locale_Languages>(
  input: ChapterInput<L>,
): Course_Creator<Chapter<'data', L>, Course_TocChapter, L> {
  const getData = (): Chapter<'data', L> => ({
    ...input,
    content: input.content.map(child => unwrapChapterChild(child)),
  });
  const toToc = (context: Course_TocContext<L>): Course_TocChapter => ({
    type: input.type,
    id: input.id,
    title: localizeTitle(input.title, context),
    ...(input.iconKey ? { iconKey: input.iconKey } : {}),
    children: input.content.map(child => chapterChildToc(child, context)),
  });
  const toResource = (context: Course_TocContext<L>): Course_Resource<Chapter<'data', L>, Course_TocChapter> => ({
    data: getData(),
    toc: toToc(context),
  });
  const getPublicationItems = () => collectCoursePublicationItems<L>(input.content);
  return { getData, toToc, toResource, getPublicationItems };
}

/** Build-time, IO-free Module creator. */
export function createModule<const L extends Locale_Languages>(
  input: ModuleInput<L>,
): Course_Creator<Module<'data', L>, Course_TocModule, L> {
  const getData = (): Module<'data', L> => ({
    ...input,
    content: input.content.map(child => unwrapChild(child)),
  });
  const toToc = (context: Course_TocContext<L>): Course_TocModule => ({
    type: input.type,
    id: input.id,
    title: localizeTitle(input.title, context),
    ...(input.iconKey ? { iconKey: input.iconKey } : {}),
    children: input.content.map(child => moduleChildToc(child, context)),
  });
  const toResource = (context: Course_TocContext<L>): Course_Resource<Module<'data', L>, Course_TocModule> => ({
    data: getData(),
    toc: toToc(context),
  });
  const getPublicationItems = () => collectCoursePublicationItems<L>(input.content);
  return { getData, toToc, toResource, getPublicationItems };
}

/** An Episode owns Scenario Sections but is not itself a Section. */
export function createEpisode<const L extends Locale_Languages>(
  input: Episode<'data', L>,
): Course_Creator<Episode<'data', L>, Course_TocEpisode, L> {
  const getData = (): Episode<'data', L> => ({
    ...input,
    sections: [...input.sections],
  });
  const toToc = (context: Course_TocContext<L>): Course_TocEpisode => ({
    type: input.type,
    id: input.id,
    title: localizeTitle(input.title, context),
    ...(input.iconKey ? { iconKey: input.iconKey } : {}),
  });
  const toResource = (context: Course_TocContext<L>): Course_Resource<Episode<'data', L>, Course_TocEpisode> => ({
    data: getData(),
    toc: toToc(context),
  });
  const getPublicationItems = () => ({ lessons: [], groups: [], overrides: [], episodes: [getData()] });
  return { getData, toToc, toResource, getPublicationItems };
}
