import type {
  Chapter,
  Course_Creator,
  Course_LessonAuthoringOverride,
  Episode,
  Lesson,
  Locale_Languages,
  Module,
} from '@svitlo/contracts/content';
import { collectCoursePublicationItems } from '../collectCoursePublicationItems';
import type { LessonCreator } from '../../../lessons/createLesson';

type EpisodeCreator<L extends Locale_Languages> = Course_Creator<Episode<'data', L>, L>;
type ChapterCreator<L extends Locale_Languages> = Course_Creator<Chapter<'data', L>, L>;

type LessonEntry<L extends Locale_Languages> = Lesson<'data', L> | Course_LessonAuthoringOverride<L> | LessonCreator<L>;
type ChapterEntry<L extends Locale_Languages> = LessonEntry<L> | Episode<'data', L> | EpisodeCreator<L>;
type ModuleEntry<L extends Locale_Languages> = ChapterEntry<L> | Chapter<'data', L> | ChapterCreator<L>;

function unwrapChild<L extends Locale_Languages>(
  child: ModuleEntry<L>,
): Lesson<'data', L> | Course_LessonAuthoringOverride<L> | Chapter<'data', L> | Episode<'data', L> {
  return 'getData' in child ? child.getData() : child;
}

type ModuleInput<L extends Locale_Languages> = Omit<Module<'data', L>, 'content'> & {
  content: readonly ModuleEntry<L>[];
};

export function createModuleConfigurator<const L extends Locale_Languages>(
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
