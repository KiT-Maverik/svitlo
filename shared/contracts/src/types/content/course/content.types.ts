import type { ContentEntity_ConfigType } from '../entity.types';
import type { Lesson } from '../lesson.types';
import type { Locale_Languages } from '../locale.types';
import type { Chapter } from './chapter.types';
import type { Episode } from './episode.types';
import type { Module } from './module.types';
import type { Course_LessonAuthoringOverride } from './source.types';

/** Published Lesson reference. Authored Courses instead contain the complete Lesson Data. */
export type Course_LessonId = string;

/** Only authored Course Data may contain a build-time Lesson override. */
type Course_LessonEntry<ConfigType extends ContentEntity_ConfigType, Languages extends Locale_Languages> =
  ConfigType extends 'data' ? Lesson<'data', Languages> | Course_LessonAuthoringOverride<Languages> : Course_LessonId;

/** Top-level course content can contain any grouping or navigable unit. */
export type Course_Content<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends Locale_Languages> =
  | Module<ConfigType, SupportedLanguages>
  | Chapter<ConfigType, SupportedLanguages>
  | Episode<ConfigType, SupportedLanguages>
  | Course_LessonEntry<ConfigType, SupportedLanguages>;

export type Module_Content<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends Locale_Languages> =
  | Chapter<ConfigType, SupportedLanguages>
  | Episode<ConfigType, SupportedLanguages>
  | Course_LessonEntry<ConfigType, SupportedLanguages>;

export type Chapter_Content<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends Locale_Languages> =
  Episode<ConfigType, SupportedLanguages> | Course_LessonEntry<ConfigType, SupportedLanguages>;
