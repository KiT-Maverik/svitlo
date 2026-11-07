import type {
  Chapter,
  Chapter_Content,
  Course_Creator,
  Course_CompatibleLesson,
  Course_CompatibleOverride,
  Episode,
  Locale_Languages,
  Module,
} from '@svitlo/contracts/content';
import { collectCoursePublicationItems } from './collectCoursePublicationItems';
import type { LessonCreator } from '../lessons/createLesson';

type EpisodeCreator<L extends Locale_Languages> = Course_Creator<Episode<'data', L>, L>;
type ChapterCreator<L extends Locale_Languages> = Course_Creator<Chapter<'data', L>, L>;

type LessonEntry<L extends Locale_Languages> = Course_CompatibleLesson<L> | Course_CompatibleOverride<L> | LessonCreator<L>;
type ChapterEntry<L extends Locale_Languages> = LessonEntry<L> | Episode<'data', L> | EpisodeCreator<L>;
type ModuleEntry<L extends Locale_Languages> = ChapterEntry<L> | Chapter<'data', L> | ChapterCreator<L>;

function unwrapChild<L extends Locale_Languages>(
  child: ModuleEntry<L>,
): Course_CompatibleLesson<L> | Course_CompatibleOverride<L> | Chapter<'data', L> | Episode<'data', L> {
  return 'getData' in child ? child.getData() : child;
}

function unwrapChapterChild<L extends Locale_Languages>(child: ChapterEntry<L>): Chapter_Content<'data', L> {
  return 'getData' in child ? child.getData() : child;
}

type ChapterInput<L extends Locale_Languages> = Omit<Chapter<'data', L>, 'content'> & {
  content: readonly ChapterEntry<L>[];
};
type ModuleInput<L extends Locale_Languages> = Omit<Module<'data', L>, 'content'> & {
  content: readonly ModuleEntry<L>[];
};

/** Chapter, Module and Episode are authored nodes; Course alone owns TOC projection. */
export function createChapter<const L extends Locale_Languages>(
  input: ChapterInput<L>,
): Course_Creator<Chapter<'data', L>, L> {
  const getData = (): Chapter<'data', L> => ({
    ...input,
    content: input.content.map(child => unwrapChapterChild(child)),
  });
  return {
    getData,
    getContentEntries: () => collectCoursePublicationItems<L>(getData().content),
  };
}

export function createModule<const L extends Locale_Languages>(
  input: ModuleInput<L>,
): Course_Creator<Module<'data', L>, L> {
  const getData = (): Module<'data', L> => ({
    ...input,
    content: input.content.map(child => unwrapChild(child)),
  });
  return {
    getData,
    getContentEntries: () => collectCoursePublicationItems<L>(getData().content),
  };
}

/** Episode source can be localized independently when Course publishes it. */
export function createEpisode<const L extends Locale_Languages>(
  input: Episode<'data', L>,
): Course_Creator<Episode<'data', L>, L> {
  const getData = (): Episode<'data', L> => ({ ...input, sections: [...input.sections] });
  return {
    getData,
    getContentEntries: () => ({ lessons: [], groups: [], overrides: [], episodes: [getData()] }),
  };
}
