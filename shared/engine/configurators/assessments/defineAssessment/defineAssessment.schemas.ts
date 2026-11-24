import type { ConfiguratorChild } from '../../../types/configuratorChild';
import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema, languageCode_Schema } from '#schemas';
import { identityBase_Schema, paramsBase_Schema } from '../../_shared__configurators/common.schemas';
import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { localizationSwitch as contentBlockLocalizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import { contentSection_Props_Schema } from '../../sections/defineContentSection/defineContentSection.schemas';
import type { ContentSection_Configurator } from '../../sections/defineContentSection/defineContentSection';
import { quizSection_Props_Schema } from '../../sections/defineQuizSection/defineQuizSection.schemas';
import type { QuizSection_Configurator } from '../../sections/defineQuizSection/defineQuizSection';

/** Assessment reuses genuine Course-independent Content and Quiz Sections. */
export type Assessment_Section_Configurator = ConfiguratorChild<
  ContentSection_Configurator | QuizSection_Configurator
>;

const languages = z.array(languageCode_Schema).nonempty()
  .refine(values => new Set(values).size === values.length, 'Assessment languages must be unique');
const identity = identityBase_Schema.extend({
  type: z.literal('assessment'),
  params: paramsBase_Schema.shape.params.extend({ languages }),
});

export const assessment_Config_Schema = identity.extend({
  ...addUnifiedLocale({ title: contentBlockLocalizationSwitch.config }),
  section: z.strictObject({
    items: z.record(z.string(), z.custom<Assessment_Section_Configurator>()),
    order: z.array(z.string()),
  }),
}).strict();
export type Assessment_Config = z.infer<typeof assessment_Config_Schema>;

export const assessment_Props_Schema = identity.extend({
  ...addUnifiedLocale({ title: contentBlockLocalizationSwitch.props }),
  section: z.array(z.union([contentSection_Props_Schema, quizSection_Props_Schema]))
    .refine(sections => sections.some(section =>
      section.type === 'quiz' && section.params.disabled !== true
    ), 'A completed Assessment must contain an enabled Quiz Section'),
}).strict();
export type Assessment_Props = z.infer<typeof assessment_Props_Schema>;
export type Assessment_PropsBase = Pick<Assessment_Props, 'id' | 'slug' | 'type' | 'params'> & {
  locale?: { title?: string };
  section: ReturnType<Assessment_Section_Configurator['build']['props']>['base'][];
};

export type Assessment_Metadata_Overrides = {
  params?: DeepPartial<Omit<Assessment_Config['params'], 'languages'>>;
  locale?: DeepPartial<Assessment_Config['locale']>;
};
export const assessment_Override_Metadata_Schema: z.ZodType<Assessment_Metadata_Overrides> = z.strictObject({
  params: z.deepPartial(deepStrict_Schema(assessment_Config_Schema.shape.params.omit({ languages: true }))).optional(),
  locale: z.deepPartial(deepStrict_Schema(assessment_Config_Schema.shape.locale)).optional(),
});

export type Assessment_Overrides<
  Sections extends Record<string, Assessment_Section_Configurator>,
  Added extends Record<string, Assessment_Section_Configurator> = {},
> = Assessment_Metadata_Overrides & {
  section?: {
    items?: { [Key in keyof Sections]?: Parameters<Sections[Key]['build']['overrides']>[0] | false };
    additionalItems?: Added & { [Key in keyof Sections]?: never };
    order?: Extract<keyof Sections | keyof NoInfer<Added>, string>[];
  };
};

export const assessmentConfigurator_Schema = z.custom<{
  readonly id: string;
  readonly slug: string;
  readonly type: 'assessment';
  readonly build: { readonly props: () => unknown; readonly overrides: (patch: never) => unknown };
}>(
  value => value !== null && typeof value === 'object'
    && 'type' in value && value.type === 'assessment'
    && 'id' in value && typeof value.id === 'string'
    && 'slug' in value && typeof value.slug === 'string'
    && 'build' in value && value.build !== null && typeof value.build === 'object'
    && 'props' in value.build && typeof value.build.props === 'function'
    && 'overrides' in value.build && typeof value.build.overrides === 'function',
  { message: 'Expected defineAssessment Build configurator, not an editorial draft' },
);
