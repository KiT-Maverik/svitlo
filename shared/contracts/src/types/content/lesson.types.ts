import type { ContentEntity_ConfigType } from './entity.types';
import type { Flashcard } from './flashcard.types';
import type { SkillId } from './skill.types';
import type { Lesson_Locale, Locale_Options } from './locale.types';
import type { Question_Catalog, Question_Catalog_ValidSlugs } from './questions';
import type { Section } from './section.types';
import type { LessonEventsField, LessonResponseEvents, SupportedLessonEvents } from './lesson.events.types';

type Lesson_Parameters<SupportedLanguages extends Lesson_Locale> = {
  requireQuiz: boolean;
  languages: SupportedLanguages;
  sections: {
    allowNavigation: boolean;
    allowSkipping: boolean;
    showIndexes: boolean;
  };
};

type Lesson_Definition<SupportedLanguages extends Lesson_Locale> = {
  type: 'lesson';
  /** Optional key to a registered runtime icon, never JSX. */
  iconKey?: string;
  skills?: readonly SkillId[];
  sections: readonly Section<'definition', SupportedLanguages>[];
};

type Lesson_Data<SupportedLanguages extends Lesson_Locale, CustomEvents extends string = never> = {
  id: string;
  slug: string;
  title: Locale_Options<SupportedLanguages>;
  flashcards: Flashcard<'data', SupportedLanguages>[];
  skills: readonly SkillId[];
  parameters: Lesson_Parameters<SupportedLanguages>;
  questions: Question_Catalog<'data', SupportedLanguages>;
  sections: readonly Section<'data', SupportedLanguages>[];
} & LessonEventsField<SupportedLanguages, CustomEvents>;

type Lesson_Response<SupportedLanguages extends Lesson_Locale, CustomEvents extends string = never> = {
  id: string;
  slug: string;
  title: string;
  flashcards: Flashcard<'response', SupportedLanguages>[];
  skills: readonly SkillId[];
  parameters: Lesson_Parameters<SupportedLanguages>;
  questions: Question_Catalog<'response', SupportedLanguages>;
  sections: readonly Section<'response', SupportedLanguages>[];
  events?: LessonResponseEvents<SupportedLanguages, CustomEvents>;
};

export type Lesson<
  ConfigType extends ContentEntity_ConfigType,
  SupportedLanguages extends Lesson_Locale,
  CustomEvents extends string = never,
> = {
  definition: Lesson_Definition<SupportedLanguages>;
  data: Lesson_Data<SupportedLanguages, CustomEvents>;
  response: Lesson_Response<SupportedLanguages, CustomEvents>;
}[ConfigType];

/** Reject custom event IDs that are not declared in Lesson's third generic, even in helper calls without satisfies. */
type LessonEventKeysValidated<T, CustomEvents extends string> = T extends { events: infer Events }
  ? { events: Record<Exclude<keyof Events, SupportedLessonEvents<CustomEvents>>, never> }
  : unknown;

export function defineLessonData<SupportedLanguages extends Lesson_Locale, CustomEvents extends string = never>() {
  return <const T extends Lesson<'data', SupportedLanguages, CustomEvents>>(
    lesson: T & {
      questions: Question_Catalog_ValidSlugs<T['questions'], SupportedLanguages>;
    } & LessonEventKeysValidated<T, CustomEvents>,
  ): T => lesson;
}
