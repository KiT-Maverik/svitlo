import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Languages } from '../locale.types';
import type { Chapter } from './chapter.types';
import type { Episode } from './episode.types';
import type { Module } from './module.types';

/** Bare Lesson ID, referencing its canonical authored data (not a copied Lesson). */
export type Course_LessonId = string;

/** Top-level course content can contain any grouping or navigable unit. */
export type Course_Content<
  ConfigType extends ContentEntity_ConfigType,
  SupportedLanguages extends Locale_Languages,
> =
  | Module<ConfigType, SupportedLanguages>
  | Chapter<ConfigType, SupportedLanguages>
  | Episode<ConfigType, SupportedLanguages>
  | Course_LessonId;

export type Module_Content<
  ConfigType extends ContentEntity_ConfigType,
  SupportedLanguages extends Locale_Languages,
> =
  | Chapter<ConfigType, SupportedLanguages>
  | Episode<ConfigType, SupportedLanguages>
  | Course_LessonId;

export type Chapter_Content<
  ConfigType extends ContentEntity_ConfigType,
  SupportedLanguages extends Locale_Languages,
> = Episode<ConfigType, SupportedLanguages> | Course_LessonId;
