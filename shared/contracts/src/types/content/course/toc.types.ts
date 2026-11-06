import type { Locale_Languages } from '../locale.types';
import type { Lesson } from '../lesson.types';
import type { Course } from './course.types';
import type { Chapter } from './chapter.types';
import type { Episode } from './episode.types';
import type { Module } from './module.types';

type NavigationLabel = {
  id: string;
  title: string;
  iconKey?: string;
};

/** Leaf nodes of the table of contents. */
export type Course_TocLesson = NavigationLabel & {
  type: Lesson<'definition', Locale_Languages>['type'];
};
export type Course_TocEpisode = NavigationLabel & {
  type: Episode<'data', Locale_Languages>['type'];
};

/** A Chapter contains Lesson and Episode navigation nodes only. */
export type Course_TocChapter = NavigationLabel & {
  type: Chapter<'data', Locale_Languages>['type'];
  children: readonly (Course_TocLesson | Course_TocEpisode)[];
};

/** A Module may also contain Chapters, but never nested Modules. */
export type Course_TocModule = NavigationLabel & {
  type: Module<'data', Locale_Languages>['type'];
  children: readonly (Course_TocChapter | Course_TocLesson | Course_TocEpisode)[];
};

export type Course_TocContent = Course_TocModule | Course_TocChapter | Course_TocLesson | Course_TocEpisode;

export type Course_Toc = NavigationLabel & {
  type: Course<'data', Locale_Languages>['type'];
  children: readonly Course_TocContent[];
};

/** A Course creator uses the locale to localize titles and a Lesson resolver for ID references. */
export type Course_TocContext<Languages extends Locale_Languages> = {
  language: Languages[number];
  resolveLesson: (lessonId: string) => Course_TocLesson;
};

/**
 * Pure creator output: data stays authored/locale-complete and TOC is localized.
 * The publisher performs final locale projection, reference validation and IO.
 */
export type Course_Resource<Data, Toc> = {
  data: Data;
  toc: Toc;
};

export type Course_Creator<Data, Toc, Languages extends Locale_Languages> = {
  getData(): Data;
  toToc(context: Course_TocContext<Languages>): Toc;
  toResource(context: Course_TocContext<Languages>): Course_Resource<Data, Toc>;
};
