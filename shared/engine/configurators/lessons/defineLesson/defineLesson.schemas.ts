import { z } from 'zod';

import { languageCode_Schema } from '#schemas';
import { localizationSwitch } from '../../contentBlocks';
import { flashcardConfigurator_Schema } from '../../flashcards/defineFlashcard/defineFlashcard.schemas';
import { sectionConfigurator_Schema } from '../../sections/section.schemas';

export const lessonQuestionTypes = [
  'selectOneAnswer',
  'selectMultipleAnswers',
  'matchBlocks',
  'answerWithText',
  'answerWithNumber',
  'orderSequence',
  'buildAnswerWithBlocks',
  'fillBlanksWithBlocks',
  'fillBlanksWithText',
] as const;
export type Lesson_Question_Type = (typeof lessonQuestionTypes)[number];

/**
 * Structural authoring boundary shared with Agent 1. A Question must carry its
 * precise discriminator in config.base, never just an authored raw JSON record.
 */
export const lessonQuestionConfigurator_Schema = z.custom<{
  readonly config: {
    readonly base: { readonly type: Lesson_Question_Type; readonly id: string; readonly slug: string };
    readonly locales: () => object;
  };
}>(
  value => {
    if (value === null || typeof value !== 'object' || !('config' in value)) return false;
    const config = value.config;
    if (config === null || typeof config !== 'object' || !('base' in config) || !('locales' in config)) return false;
    const base = config.base;
    return (
      typeof config.locales === 'function' &&
      base !== null &&
      typeof base === 'object' &&
      'type' in base &&
      lessonQuestionTypes.some(type => type === base.type) &&
      'id' in base &&
      typeof base.id === 'string' &&
      'slug' in base &&
      typeof base.slug === 'string'
    );
  },
  { message: 'Expected a Question configurator, not raw Question data' },
);

const questions_Schema = z
  .partialRecord(z.enum(lessonQuestionTypes), z.record(z.string(), lessonQuestionConfigurator_Schema))
  .superRefine((bank, context) => {
    for (const [type, entries] of Object.entries(bank)) {
      if (!entries) continue;
      for (const [slug, question] of Object.entries(entries)) {
        if (question.config.base.type !== type || question.config.base.slug !== slug) {
          context.addIssue({
            code: 'custom',
            message: 'Question bank keys must match each configurator type and slug',
            path: [type, slug],
          });
        }
      }
    }
  });

const languages_Schema = z
  .array(languageCode_Schema)
  .nonempty()
  .refine(values => new Set(values).size === values.length, 'Declared languages must be unique');
function createLessonSchema<Mode extends keyof typeof localizationSwitch>(mode: Mode) {
  const title = localizationSwitch[mode];
  const childSchemas = {
    config: {
      flashcards: z.array(flashcardConfigurator_Schema),
      sections: z.array(sectionConfigurator_Schema),
      questions: questions_Schema.optional(),
    },
    props: {
      flashcards: z.array(z.object({ type: z.literal('flashcard'), id: z.uuid() }).catchall(z.unknown())),
      sections: z.array(
        z
          .object({
            type: z.enum(['theory', 'practice', 'codingTask', 'learningFlow', 'flashcards', 'scenario', 'quiz']),
            id: z.uuid(),
          })
          .catchall(z.unknown()),
      ),
      questions: z.record(z.string(), z.unknown()).optional(),
    },
  } as const;
  const children = childSchemas[mode];

  return z.strictObject({
    type: z.literal('lesson'),
    id: z.uuid(),
    slug: z.string().min(1),
    title,
    flashcards: children.flashcards,
    skills: z.array(z.uuid()),
    parameters: z.strictObject({
      requireQuiz: z.boolean(),
      languages: languages_Schema,
      sections: z.strictObject({
        allowNavigation: z.boolean(),
        allowSkipping: z.boolean(),
        showIndexes: z.boolean(),
      }),
    }),
    questions: children.questions,
    sections: children.sections,
    events: z.record(z.string(), z.unknown()).optional(),
  });
}

export const lesson_Config_Schema = createLessonSchema('config');
export type Lesson_Config = z.infer<typeof lesson_Config_Schema>;

export const lesson_Props_Schema = createLessonSchema('props');
export type Lesson_Props = z.infer<typeof lesson_Props_Schema>;

export const lessonConfigurator_Schema = z.custom<{
  readonly config: {
    readonly base: { readonly type: 'lesson'; readonly id: string; readonly slug: string };
    readonly locales: () => object;
  };
}>(
  value => {
    if (value === null || typeof value !== 'object' || !('config' in value)) return false;
    const config = value.config;
    if (config === null || typeof config !== 'object' || !('base' in config) || !('locales' in config)) return false;
    const base = config.base;
    return (
      typeof config.locales === 'function' &&
      base !== null &&
      typeof base === 'object' &&
      'type' in base &&
      base.type === 'lesson' &&
      'id' in base &&
      typeof base.id === 'string' &&
      'slug' in base &&
      typeof base.slug === 'string'
    );
  },
  { message: 'Expected defineLesson configurator, not authored Lesson data' },
);
