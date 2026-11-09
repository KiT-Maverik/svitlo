import type { LanguageCodes } from '#schemas';
import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';
import type { Flashcard_Configurator } from '../../flashcards/defineFlashcard/defineFlashcard';
import type { Section_Configurator } from '../../sections/section.types';
import {
  lesson_Config_Schema, type Lesson_Config,
} from './defineLesson.schemas';

export function defineLesson<
  const Slug extends string,
  const Languages extends readonly [LanguageCodes, ...LanguageCodes[]],
  const Sections extends readonly Section_Configurator[],
  const Flashcards extends readonly Flashcard_Configurator[],
  const Questions extends Lesson_Config['questions'] = Lesson_Config['questions'],
>(config: Omit<Lesson_Config, 'slug' | 'sections' | 'flashcards' | 'questions' | 'parameters'> & {
  slug: Slug;
  sections: Sections;
  flashcards: Flashcards;
  questions?: Questions;
  parameters: Omit<Lesson_Config['parameters'], 'languages'> & { languages: Languages };
}) {
  lesson_Config_Schema.parse(config);

  const { type, id, slug, title, flashcards, sections, skills, parameters, questions, events } = config;
  const localeEntries = { title } as const;
  const base = {
    type, id, slug, skills, parameters,
    ...onlyStrings(localeEntries),
  } satisfies DeepPartial<Lesson_Config>;

  return {
    config: {
      base,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<Lesson_Config>,
    },
    sections,
    flashcards,
    questions,
    // Events are authoring-time behavioral configuration; a publisher must
    // explicitly project serializable values, rather than serializing callbacks.
    events,
  };
}

export type Lesson_Configurator = ReturnType<typeof defineLesson>;
