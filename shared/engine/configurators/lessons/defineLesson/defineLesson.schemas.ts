import { z } from 'zod';
import type { DeepPartial } from '#types';
import { languageCode_Schema, deepStrict_Schema } from '#schemas';
import { identityBase_Schema, paramsBase_Schema } from '../../_shared__configurators/common.schemas';
import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { localizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import { sectionTypes } from '../../sections/section.constants';
import type { Section_Configurator, Section_Props } from '../../sections/section.types';
import { flashcard_Props_Schema } from '../../flashcards/defineFlashcard/defineFlashcard.schemas';
import type { Flashcard_Configurator } from '../../flashcards/defineFlashcard/defineFlashcard';
import type { Flashcard_Props } from '../../flashcards/defineFlashcard/defineFlashcard.schemas';
import { questionTypes as lessonQuestionTypes } from '../../questions/question.constants';
import type { Question_Configurator } from '../../questions/question.types';

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
const sectionCollection = z.strictObject({
  items: z.record(z.string(), z.custom<Section_Configurator>()),
  order: z.array(z.string()),
});
const flashcardCollection = z.strictObject({
  items: z.record(z.string(), z.custom<Flashcard_Configurator>()),
  order: z.array(z.string()),
});
const questionBank = z.partialRecord(
  z.enum(lessonQuestionTypes),
  z.record(z.string(), z.custom<Question_Configurator>()),
);

/** Metadata and collection boundaries are owned by Lesson; children own internal validation. */
export const lesson_Config_Schema = identity.extend({
  ...addUnifiedLocale({ title: localizationSwitch.config }),
  section: sectionCollection,
  flashcards: flashcardCollection,
  questions: questionBank.optional(),
  events: z.record(z.string(), z.json()).optional(),
});
export type Lesson_Config = z.infer<typeof lesson_Config_Schema>;

const sectionResolved = z
  .object({
    id: z.uuid(),
    slug: z.string().min(1),
    type: z.enum(sectionTypes),
  })
  .catchall(z.unknown());
export const lesson_Props_Schema = identity.extend({
  ...addUnifiedLocale({ title: localizationSwitch.props }),
  section: z.array(sectionResolved),
  flashcards: z.array(flashcard_Props_Schema),
  questions: z.partialRecord(z.enum(lessonQuestionTypes), z.array(z.record(z.string(), z.json()))).optional(),
  events: z.record(z.string(), z.json()).optional(),
});
export type Lesson_Props = Omit<z.infer<typeof lesson_Props_Schema>, 'section' | 'flashcards'> & {
  section: Section_Props[];
  flashcards: Flashcard_Props[];
};
export type Lesson_PropsBase = Pick<Lesson_Props, 'id' | 'slug' | 'type' | 'params' | 'skills'> & {
  locale?: { title?: string };
  section: ReturnType<Section_Configurator['build']['props']>['base'][];
  flashcards: ReturnType<Flashcard_Configurator['build']['props']>['base'][];
  questions?: Partial<Record<Lesson_Question_Type, Record<string, unknown>[]>>;
  events?: Record<string, unknown>;
};

export type Lesson_Metadata_Overrides = {
  params?: DeepPartial<Omit<Lesson_Config['params'], 'languages'>>;
  locale?: DeepPartial<Lesson_Config['locale']>;
};
export const lesson_Override_Metadata_Schema: z.ZodType<Lesson_Metadata_Overrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: lesson_Config_Schema.shape.params.omit({ languages: true }),
      locale: lesson_Config_Schema.shape.locale,
    }),
  ),
);

type ExistingPatches<Items extends Record<string, object>> = {
  [Key in keyof Items]?: Items[Key] extends { build: { overrides: (...args: never[]) => unknown } }
    ? Parameters<Items[Key]['build']['overrides']>[0] | false
    : never;
};
export type Lesson_Ordered_Overrides<
  Items extends Record<string, object>,
  Added extends Record<string, object> = {},
> = {
  items?: ExistingPatches<Items>;
  additionalItems?: Added & { [Key in keyof Items]?: never };
  order?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
};
type QuestionGroup<Bank extends Lesson_QuestionBank, Kind extends Lesson_Question_Type> = Kind extends keyof Bank
  ? NonNullable<Bank[Kind]> extends Record<string, Question_Configurator>
    ? NonNullable<Bank[Kind]>
    : {}
  : {};
export type Lesson_Question_Overrides<
  Questions extends Lesson_QuestionBank,
  AddedQuestions extends Lesson_QuestionBank,
> = Partial<{
  [Kind in Lesson_Question_Type]: Omit<
    Lesson_Ordered_Overrides<QuestionGroup<Questions, Kind>, QuestionGroup<AddedQuestions, Kind>>,
    'order'
  >;
}>;

export type Lesson_Overrides<
  Sections extends Record<string, Section_Configurator>,
  Cards extends Record<string, Flashcard_Configurator>,
  Questions extends Lesson_QuestionBank,
  AddedSections extends Record<string, Section_Configurator> = {},
  AddedCards extends Record<string, Flashcard_Configurator> = {},
  AddedQuestions extends Lesson_QuestionBank = {},
> = Lesson_Metadata_Overrides & {
  section?: Lesson_Ordered_Overrides<Sections, AddedSections>;
  flashcards?: Lesson_Ordered_Overrides<Cards, AddedCards>;
  questions?: Lesson_Question_Overrides<Questions, AddedQuestions>;
};

export const lessonConfigurator_Schema = z.custom<{
  readonly id: string;
  readonly slug: string;
  readonly type: 'lesson';
  readonly build: { readonly props: () => unknown; readonly overrides: (patch: never) => unknown };
}>(
  value =>
    value !== null &&
    typeof value === 'object' &&
    'type' in value &&
    value.type === 'lesson' &&
    'id' in value &&
    typeof value.id === 'string' &&
    'slug' in value &&
    typeof value.slug === 'string' &&
    'build' in value &&
    value.build !== null &&
    typeof value.build === 'object' &&
    'props' in value.build &&
    typeof value.build.props === 'function' &&
    'overrides' in value.build &&
    typeof value.build.overrides === 'function',
  { message: 'Expected defineLesson Build configurator, not authored Lesson data' },
);
