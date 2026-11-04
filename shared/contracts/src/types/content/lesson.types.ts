import type { DefineValidKeysFromSlugs } from '../misc.types';
import type { ContentEntity_ConfigType } from './entity.types';
import type { Flashcard } from './flashcard.types';
import type { Lesson_Locale, Locale_Options } from './locale.types';
import type { Question_Catalog, Question_Catalog_ValidSlugs } from './questions';
import type { Section } from './section.types';

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
  sections: Record<string, Section<'definition', SupportedLanguages>>;
  /** Explicit presentation order, independent of record insertion. */
  sectionOrder?: readonly string[];
};

type Lesson_Data<SupportedLanguages extends Lesson_Locale> = {
  id: string;
  slug: string;
  title: Locale_Options<SupportedLanguages>;
  flashcards: Flashcard<'data', SupportedLanguages>[];
  parameters: Lesson_Parameters<SupportedLanguages>;
  questions: Question_Catalog<'data', SupportedLanguages>;
  sections: Record<string, Section<'data', SupportedLanguages>>;
  sectionOrder?: readonly string[];
};

type Lesson_Response<SupportedLanguages extends Lesson_Locale> = {
  id: string;
  slug: string;
  title: string;
  flashcards: Flashcard<'response', SupportedLanguages>[];
  parameters: Lesson_Parameters<SupportedLanguages>;
  questions: Question_Catalog<'response', SupportedLanguages>;
  sections: Record<string, Section<'response', SupportedLanguages>>;
  sectionOrder?: readonly string[];
};

export type Lesson<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends Lesson_Locale> = {
  definition: Lesson_Definition<SupportedLanguages>;
  data: Lesson_Data<SupportedLanguages>;
  response: Lesson_Response<SupportedLanguages>;
}[ConfigType];

export function defineLessonData<SupportedLanguages extends Lesson_Locale>() {
  return <const T extends Lesson<'data', SupportedLanguages>>(
    lesson: T & {
      questions: Question_Catalog_ValidSlugs<T['questions'], SupportedLanguages>;
      sections: DefineValidKeysFromSlugs<keyof T['sections'] & string, Section<'data', SupportedLanguages>>;
    },
  ): T => lesson;
}
