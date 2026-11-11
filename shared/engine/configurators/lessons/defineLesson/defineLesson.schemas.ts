import { z } from 'zod';
import { languageCode_Schema } from '#schemas';
import { identityBase_Schema, paramsBase_Schema, addUnifiedLocale } from '../../_shared';
import type { OrderedConfiguratorCollection } from '../../_shared/orderedConfiguratorCollection.utils';
import { localizationSwitch } from '../../contentBlocks/_shared';
import type { Section_Configurator, Section_Props } from '../../sections/section.types';
import type { Flashcard_Configurator } from '../../flashcards/defineFlashcard/defineFlashcard';
import type { Flashcard_Props } from '../../flashcards/defineFlashcard/defineFlashcard.schemas';
import type { Question_Configurator } from '../../questions/question.types';

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
export type Lesson_QuestionBank = Partial<Record<Lesson_Question_Type, Record<string, Question_Configurator>>>;

const languages = z
  .array(languageCode_Schema)
  .nonempty()
  .refine(list => new Set(list).size === list.length, 'Lesson languages must be unique');

const params = paramsBase_Schema.shape.params.extend({
  requireQuiz: z.boolean(),
  languages,
  sections: z.strictObject({
    allowNavigation: z.boolean(),
    allowSkipping: z.boolean(),
    showIndexes: z.boolean(),
  }),
});

const identity = identityBase_Schema.extend({
  type: z.literal('lesson'),
  /**
   * Course/program-owned Lesson marker. When omitted, the Lesson is reusable
   * across courses; when present, its content belongs to this specific Course.
   */
  programId: z.uuid().optional(),
  skills: z.array(z.uuid()),
  params,
});

/**
 * Config and Props schemas validate the Lesson's own metadata.
 * Nested Section, Flashcard and Question configurators are typed separately,
 * because each child owns validation and must not be parsed recursively.
 */
export const lesson_Config_Schema = identity.extend(addUnifiedLocale({ title: localizationSwitch.config }));
export type Lesson_Config = z.infer<typeof lesson_Config_Schema> & {
  section: OrderedConfiguratorCollection<Section_Configurator>;
  flashcards: readonly Flashcard_Configurator[];
  questions?: Lesson_QuestionBank;
  events?: Record<string, unknown>;
};

export const lesson_Props_Schema = identity.extend(addUnifiedLocale({ title: localizationSwitch.props }));
export type Lesson_Props = z.infer<typeof lesson_Props_Schema> & {
  section: OrderedConfiguratorCollection<Section_Props>;
  flashcards: readonly Flashcard_Props[];
  questions?: Record<string, unknown>;
};

/** Nest a Lesson configurator, never its authored config. */
export const lessonConfigurator_Schema = z.custom<{
  readonly id: string;
  readonly slug: string;
  readonly type: 'lesson';
  readonly config: {
    readonly base: { readonly type: 'lesson'; readonly id: string; readonly slug: string };
    readonly locales: () => unknown;
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
