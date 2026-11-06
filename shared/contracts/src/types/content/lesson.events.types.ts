import type { ContentEntity_ConfigType } from './entity.types';
import type { Lesson_Locale } from './locale.types';
import type { ContentBlock_Scene } from './blocks/scene.types';

/** Controller-owned lifecycle event names are always supported, even without scene reactions. */
export const DEFAULT_LESSON_EVENTS = ['lessonStarted', 'lessonCompleted', 'quizCompleted', 'quizFailed'] as const;

export type DefaultLessonEvent = (typeof DEFAULT_LESSON_EVENTS)[number];

export type SupportedLessonEvents<CustomEvents extends string = never> = DefaultLessonEvent | CustomEvents;

type EventScene<ConfigType extends ContentEntity_ConfigType, Languages extends Lesson_Locale> = ContentBlock_Scene<
  ConfigType,
  Languages
>;

/** Authored reactions: standard events are optional; declared custom events MUST have a scene. */
export type LessonEvents<Languages extends Lesson_Locale, CustomEvents extends string = never> = Partial<
  Record<DefaultLessonEvent, EventScene<'data', Languages> | false>
> &
  Record<Exclude<CustomEvents, DefaultLessonEvent>, EventScene<'data', Languages>>;

/** A lesson with declared custom events must actually configure every custom reaction. */
export type LessonEventsField<Languages extends Lesson_Locale, CustomEvents extends string = never> = [
  CustomEvents,
] extends [never]
  ? { events?: LessonEvents<Languages, CustomEvents> }
  : { events: LessonEvents<Languages, CustomEvents> };

/** Programs may disable or replace reactions; they never remove the event itself. */
export type LessonEventOverrides<
  CustomEvents extends string = never,
  Languages extends Lesson_Locale = Lesson_Locale,
  ConfigType extends 'data' | 'response' = 'response',
> = Partial<Record<SupportedLessonEvents<CustomEvents>, EventScene<ConfigType, Languages> | false>>;

/** Published events are localized scene blocks, not callbacks or JSX. */
export type LessonResponseEvents<Languages extends Lesson_Locale, CustomEvents extends string = never> = Partial<
  Record<SupportedLessonEvents<CustomEvents>, EventScene<'response', Languages> | false>
>;
