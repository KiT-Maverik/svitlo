import { z } from 'zod';
import { questionTypes as lessonQuestionTypes } from '../../questions';
import { languageCode_Schema } from '#schemas';
import { identityBase_Schema, paramsBase_Schema, addUnifiedLocale } from '../../_shared__configurators';
import type { OrderedConfiguratorCollection } from '../../_shared__configurators/orderedConfiguratorCollection/orderedConfiguratorCollection.utils';
import { contentBlockLocalizationSwitch as localizationSwitch } from '../../contentBlocks';
import type { Section_Configurator, Section_Props } from '../../sections';
import type { Flashcard_Configurator } from '../../flashcards';
import type { Flashcard_Props } from '../../flashcards';
import type { Question_Configurator } from '../../questions';

export { lessonQuestionTypes };
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
