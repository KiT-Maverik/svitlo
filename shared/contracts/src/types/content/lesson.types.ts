import type { LanguageCode } from '../languages';
import type { DefineValidKeysFromSlugs, NonEmptyArray } from '../misc.types';
import type { ContentEntity_ConfigType } from './entity.types';
import type { Flashcard } from './flashcard.types';
import type { Locale_Config, Locale_ResponseParams } from './locale.types';
import type { Question_Catalog, Question_Catalog_ValidSlugs } from './questions';
import type { Section } from './section.types';

type Lesson_Parameters = {
  requireQuiz: boolean;
  languages: NonEmptyArray<LanguageCode>;
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

type Lesson_Data = {
  id: string;
  group: string;
  slug: string;
  title: Locale_Config;
  flashcards: Flashcard<'data'>[];
  parameters: Lesson_Parameters;
  questions: Question_Catalog<'data'>;
  sections: Record<string, Section<'data'>>;
  sectionOrder?: readonly string[];
};

type Lesson_Response = Locale_ResponseParams & {
  id: string;
  group: string;
  slug: string;
  title: string;
  flashcards: Flashcard<'response'>[];
  parameters: Lesson_Parameters;
  questions: Question_Catalog<'response'>;
  sections: Record<string, Section<'response'>>;
  sectionOrder?: readonly string[];
};

export type Lesson<ConfigType extends ContentEntity_ConfigType> = {
  definition: Lesson_Definition;
  data: Lesson_Data;
  response: Lesson_Response;
}[ConfigType];

export function defineLessonData<const T extends Lesson<'data'>>(
  lesson: T & {
    questions: Question_Catalog_ValidSlugs<T['questions']>;
    sections: DefineValidKeysFromSlugs<keyof T['sections'] & string, Section<'data'>>;
  },
): T {
  return lesson;
}
