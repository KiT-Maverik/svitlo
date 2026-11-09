import type {
  Chapter,
  Chapter_Content,
  Course_Creator,
  Course_LessonAuthoringOverride,
  Episode,
  Lesson,
  Locale_Languages,
} from '@svitlo/contracts/content';

import { collectCoursePublicationItems } from '../collectCoursePublicationItems';
import type { LessonCreator } from '../../../lessons/createLesson';

type EpisodeCreator<L extends Locale_Languages> = Course_Creator<Episode<'data', L>, L>;

type LessonEntry<L extends Locale_Languages> = Lesson<'data', L> | Course_LessonAuthoringOverride<L> | LessonCreator<L>;
type ChapterEntry<L extends Locale_Languages> = LessonEntry<L> | Episode<'data', L> | EpisodeCreator<L>;

function unwrapChapterChild<L extends Locale_Languages>(child: ChapterEntry<L>): Chapter_Content<'data', L> {
  return 'getData' in child ? child.getData() : child;
}

type ChapterInput<L extends Locale_Languages> = Omit<Chapter<'data', L>, 'content'> & {
  content: readonly ChapterEntry<L>[];
};

export function createChapterConfigurator<const L extends Locale_Languages>(
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
