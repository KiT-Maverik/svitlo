import type { ContentEntity_ConfigType } from './entity.types';
import type { Flashcard } from './flashcard.types';
import type { Lesson_Locale, Locale_Options } from './locale.types';
import type { Question_Catalog, Question_Catalog_ValidSlugs } from './questions';
import type { Section } from './section.types';
import type { LessonEventsField, LessonResponseEvents } from './lesson.events.types';

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
  sections: readonly Section<'definition', SupportedLanguages>[];
};

type Lesson_Data<SupportedLanguages extends Lesson_Locale, CustomEvents extends string = never> = {
  id: string;
  slug: string;
  title: Locale_Options<SupportedLanguages>;
  flashcards: Flashcard<'data', SupportedLanguages>[];
  parameters: Lesson_Parameters<SupportedLanguages>;
  questions: Question_Catalog<'data', SupportedLanguages>;
  sections: readonly Section<'data', SupportedLanguages>[];
} & LessonEventsField<SupportedLanguages, CustomEvents>;

type Lesson_Response<SupportedLanguages extends Lesson_Locale, CustomEvents extends string = never> = {
  id: string;
  slug: string;
  title: string;
  flashcards: Flashcard<'response', SupportedLanguages>[];
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

export function defineLessonData<SupportedLanguages extends Lesson_Locale, CustomEvents extends string = never>() {
  return <const T extends Lesson<'data', SupportedLanguages, CustomEvents>>(
    lesson: T & {
      questions: Question_Catalog_ValidSlugs<T['questions'], SupportedLanguages>;
    },
  ): T => lesson;
}
