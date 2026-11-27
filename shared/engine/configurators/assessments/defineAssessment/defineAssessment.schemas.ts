import { z } from 'zod';

import { deepStrict_Schema, languageCode_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { identityBase_Schema, paramsBase_Schema } from '../../_shared__configurators/common.schemas';
import type { ConfiguratorChild } from '../../../types/configuratorChild';
import { localizationSwitch as contentBlockLocalizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import type { ContentSection_Configurator } from '../../sections/defineContentSection/defineContentSection';
import { contentSection_Data_Schema } from '../../sections/defineContentSection/defineContentSection.schemas';
import type { QuizSection_Configurator } from '../../sections/defineQuizSection/defineQuizSection';
import { quizSection_Data_Schema } from '../../sections/defineQuizSection/defineQuizSection.schemas';

/** The one Quiz is structurally separate from optional supporting Content Sections. */
export type Assessment_Content_Section_Configurator = ConfiguratorChild<ContentSection_Configurator>;
export type Assessment_Quiz_Configurator = QuizSection_Configurator;
export type Assessment_Section_Configurator = Assessment_Content_Section_Configurator | Assessment_Quiz_Configurator;

const languages = z
  .array(languageCode_Schema)
  .nonempty()
  .refine(values => new Set(values).size === values.length, 'Assessment languages must be unique');
const identity = identityBase_Schema.extend({
  type: z.literal('assessment'),
  params: paramsBase_Schema.shape.params.extend({ languages }),
});

/** A phase is an ordered slug-addressable collection; quiz is a separate semantic role. */
const supportingSections = z.looseObject({
  children: z.array(z.string()),
});

export const assessment_Config_Schema = identity
  .extend({
    ...addUnifiedLocale({ title: contentBlockLocalizationSwitch.config }),
    before: supportingSections.optional(),
    quiz: z.custom<Assessment_Quiz_Configurator>(),
    after: supportingSections.optional(),
  })
  .strict();
export type Assessment_Config = z.infer<typeof assessment_Config_Schema>;

const completedAssessment_Data_Schema = identity
  .extend({
    ...addUnifiedLocale({ title: contentBlockLocalizationSwitch.data }),
    section: z.array(z.union([contentSection_Data_Schema, quizSection_Data_Schema])),
  })
  .strict()
  .refine(
    value =>
      value.section.filter(section => section.type === 'quiz').length === 1 &&
      value.section.some(section => section.type === 'quiz' && section.params.disabled !== true),
    'A completed Assessment must contain exactly one enabled Quiz',
  );

/** Course Stage 5 drafts can be rendered, but never count as a completed Quiz. */
export const assessment_Draft_Data_Schema = identity
  .extend({
    ...addUnifiedLocale({ title: contentBlockLocalizationSwitch.data }),
    draft: z.literal(true),
    section: z.array(contentSection_Data_Schema).nonempty(),
  })
  .strict()
  .refine(
    value =>
      value.section.some(
        section =>
          section.params.disabled !== true &&
          section.content.some(
            block =>
              block.type === 'text' &&
              typeof block.locale === 'object' &&
              block.locale !== null &&
              'value' in block.locale &&
              block.locale.value === 'Not implemented',
          ),
      ),
    'Assessment draft preview requires a real Not implemented Text ContentBlock',
  );
export const assessment_Completed_Data_Schema = completedAssessment_Data_Schema;
export const assessment_Data_Schema = z.union([completedAssessment_Data_Schema, assessment_Draft_Data_Schema]);
export type Assessment_Draft_Data = z.infer<typeof assessment_Draft_Data_Schema>;
export type Assessment_Data = z.infer<typeof assessment_Data_Schema>;
export type Assessment_DataBase = Pick<Assessment_Data, 'id' | 'slug' | 'type' | 'params'> & {
  draft?: true;
  locale?: { title?: string };
  section: ReturnType<Assessment_Section_Configurator['build']['data']>['base'][];
};

export type Assessment_Metadata_Overrides = {
  params?: DeepPartial<Omit<Assessment_Config['params'], 'languages'>>;
  locale?: DeepPartial<Assessment_Config['locale']>;
};
export const assessment_Override_Metadata_Schema: z.ZodType<Assessment_Metadata_Overrides> = z.strictObject({
  params: z.deepPartial(deepStrict_Schema(assessment_Config_Schema.shape.params.omit({ languages: true }))).optional(),
  locale: z.deepPartial(deepStrict_Schema(assessment_Config_Schema.shape.locale)).optional(),
});

/** Existing child patches stay sparse; new direct keys contain whole Configurators. */
type SupportingSectionOverrides<
  Sections extends Record<string, Assessment_Content_Section_Configurator>,
  Added extends Record<string, Assessment_Content_Section_Configurator>,
> = {
  children?: Extract<keyof Sections | keyof NoInfer<Added>, string>[];
} & { [Key in keyof Sections]?: Parameters<Sections[Key]['build']['overrides']>[0] | false } &
  Added & { [Key in Extract<keyof Added, keyof Sections>]?: never };

export type Assessment_Overrides<
  Before extends Record<string, Assessment_Content_Section_Configurator>,
  Quiz extends Assessment_Quiz_Configurator,
  After extends Record<string, Assessment_Content_Section_Configurator>,
  AddedBefore extends Record<string, Assessment_Content_Section_Configurator> = {},
  AddedAfter extends Record<string, Assessment_Content_Section_Configurator> = {},
> = Assessment_Metadata_Overrides & {
  before?: SupportingSectionOverrides<Before, AddedBefore>;
  quiz?: Parameters<Quiz['build']['overrides']>[0];
  after?: SupportingSectionOverrides<After, AddedAfter>;
};

export const assessmentConfigurator_Schema = z.custom<{
  readonly id: string;
  readonly slug: string;
  readonly type: 'assessment';
  readonly build: { readonly data: () => unknown; readonly overrides: (patch: never) => unknown };
}>(
  value =>
    value !== null &&
    typeof value === 'object' &&
    'type' in value &&
    value.type === 'assessment' &&
    !('draft' in value && value.draft === true) &&
    'id' in value &&
    typeof value.id === 'string' &&
    'slug' in value &&
    typeof value.slug === 'string' &&
    'build' in value &&
    value.build !== null &&
    typeof value.build === 'object' &&
    'data' in value.build &&
    typeof value.build.data === 'function' &&
    'overrides' in value.build &&
    typeof value.build.overrides === 'function',
  { message: 'Expected defineAssessment Build configurator, not an editorial draft' },
);
