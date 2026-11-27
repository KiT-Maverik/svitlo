import { z } from 'zod';

import { validateSlugAddressedContainer, type SafePlacementMap } from '../../_shared__configurators/slugAddressedContainer/slugAddressedContainer.utils';

import { deepStrict_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { identityBase_Schema, paramsBase_Schema } from '../../_shared__configurators/common.schemas';
import type { ConfiguratorChild } from '../../../types/configuratorChild';
import type { Assessment_Configurator } from '../../assessments/defineAssessment/defineAssessment';
import type { Assessment_Data } from '../../assessments/defineAssessment/defineAssessment.schemas';
import type { Assessment_Draft_Configurator } from '../../assessments/defineAssessment/defineAssessmentDraft';
import type { Configurator_Mode } from '../../configurator.schemas';
import { localizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import type { Episode_Configurator } from '../../episodes/defineEpisode/defineEpisode';
import type { Episode_Data, Episode_Draft_Data } from '../../episodes/defineEpisode/defineEpisode.schemas';
import type { Lesson_Configurator } from '../../lessons/defineLesson/defineLesson';
import type { Lesson_Data, Lesson_Draft_Data } from '../../lessons/defineLesson/defineLesson.schemas';
import type { Chapter_Configurator } from '../defineChapter/defineChapter';
import type { Chapter_Data } from '../defineChapter/defineChapter.schemas';
import type {
  Assessment_Stub_Configurator,
  Episode_Stub_Configurator,
  Lesson_Stub_Configurator,
} from '../defineCourseChildStubs/defineCourseChildStubs';

const params = z.strictObject({
  ...paramsBase_Schema.shape.params.shape,
  iconKey: z.string().optional(),
});
const identity = identityBase_Schema.extend({
  type: z.literal('module'),
  params,
});
const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: localizationSwitch[mode],
});
export type Module_Locale<Mode extends Configurator_Mode> = z.infer<z.ZodObject<ReturnType<typeof locale<Mode>>>>;
export type Module_Child = ConfiguratorChild<
  | Chapter_Configurator
  | Lesson_Configurator
  | Episode_Configurator
  | Assessment_Configurator
  | Assessment_Draft_Configurator
  | Lesson_Stub_Configurator
  | Episode_Stub_Configurator
  | Assessment_Stub_Configurator
>;
export type Module_Child_Data =
  Chapter_Data | Lesson_Data | Episode_Data | Assessment_Data | Lesson_Draft_Data | Episode_Draft_Data;

export const module_Config_Schema = identity.extend({
  ...addUnifiedLocale(locale('config')),
  content: z.object({
    items: z.record(z.string(), z.custom<Module_Child>()),
    order: z.array(z.string()),
  }),
});
export type Module_Config = z.infer<typeof module_Config_Schema>;

export type Module_Metadata_Overrides = {
  params?: DeepPartial<Module_Config['params']>;
  locale?: DeepPartial<Module_Config['locale']>;
};
export const module_Override_Config_Schema: z.ZodType<Module_Metadata_Overrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: module_Config_Schema.shape.params,
      locale: module_Config_Schema.shape.locale,
    }),
  ),
);
export type Module_Overrides<
  Items extends Record<string, Module_Child> = Record<string, Module_Child>,
  Added extends Record<string, Module_Child> = {},
> = Module_Metadata_Overrides & {
  content?: {
    items?: { [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false };
    additionalItems?: Added & SafePlacementMap<Added> & { [Key in keyof Items]?: never };
    order?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
  };
};

export const module_Data_Schema = identity
  .extend({
    ...addUnifiedLocale(locale('data')),
    children: z.array(z.string()),
  })
  // Dynamic placement keys are validated at this boundary; never recursively
  // reparse child-owned internal content or treat semantic roles as children.
  .catchall(z.unknown())
  .superRefine((value, context) => {
    for (const issue of validateSlugAddressedContainer(value, ['chapter', 'lesson', 'episode', 'assessment'])) {
      context.addIssue({ code: 'custom', path: issue.path, message: issue.message });
    }
  });
export type Module_Data = z.infer<typeof module_Data_Schema>;
