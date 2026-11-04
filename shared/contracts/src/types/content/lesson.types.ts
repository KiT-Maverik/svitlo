import type { LanguageCode } from '../languages';
import type { DefineValidKeysFromSlugs, NonEmptyArray } from '../misc.types';
import type { ContentEntity_ConfigType } from './entity.types';
import type { Flashcard } from './flashcard.types';
import type { New_Locale_Options, Locale_ResponseParams } from './locale.types';
import type { Question_Catalog, Question_Catalog_ValidSlugs } from './questions';
import type { Section } from './section.types';

type Lesson_Parameters<SupportedLanguages extends LanguageCode> = {
  requireQuiz: boolean;
  languages: NonEmptyArray<SupportedLanguages>;
  sections: {
    allowNavigation: boolean;
    allowSkipping: boolean;
    showIndexes: boolean;
  };
};

type Lesson_Definition = {
  type: 'lesson';
  /** Optional key to a registered runtime icon, never JSX. */
  iconKey?: string;
  sections: Record<string, Section<'definition'>>;
  /** Explicit presentation order, independent of record insertion. */
  sectionOrder?: readonly string[];
};

type Lesson_Data<SupportedLanguages extends LanguageCode> = {
  id: string;
  slug: string;
  title: New_Locale_Options<SupportedLanguages>;
  flashcards: Flashcard<'data', SupportedLanguages>[];
  parameters: Lesson_Parameters<SupportedLanguages>;
  questions: Question_Catalog<'data', SupportedLanguages>;
  sections: Record<string, Section<'data', SupportedLanguages>>;
  sectionOrder?: readonly string[];
};

type Lesson_Response = Locale_ResponseParams & {
  id: string;
  slug: string;
  title: string;
  flashcards: Flashcard<'response'>[];
  parameters: Lesson_Parameters<LanguageCode>;
  questions: Question_Catalog<'response'>;
  sections: Record<string, Section<'response'>>;
  sectionOrder?: readonly string[];
};

export type Lesson<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends LanguageCode = LanguageCode> = {
  definition: Lesson_Definition;
  data: Lesson_Data<SupportedLanguages>;
  response: Lesson_Response;
}[ConfigType];

export function defineLessonData<SupportedLanguages extends LanguageCode>():
  <const T extends Lesson<'data', SupportedLanguages>>(
    lesson: T & {
      questions: Question_Catalog_ValidSlugs<T['questions'], SupportedLanguages>;
      sections: DefineValidKeysFromSlugs<keyof T['sections'] & string, Section<'data', SupportedLanguages>>;
    },
  ) => T;
export function defineLessonData<const T extends Lesson<'data'>>(
  lesson: T & {
    questions: Question_Catalog_ValidSlugs<T['questions'], LanguageCode>;
    sections: DefineValidKeysFromSlugs<keyof T['sections'] & string, Section<'data'>>;
  },
): T;
export function defineLessonData(lesson?: unknown): unknown {
  return lesson === undefined ? <T>(value: T): T => value : lesson;
}
