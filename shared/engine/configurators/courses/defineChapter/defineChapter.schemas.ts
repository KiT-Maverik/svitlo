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
  type: z.literal('chapter'),
  params,
});
const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: localizationSwitch[mode],
});
export type Chapter_Locale<Mode extends Configurator_Mode> = z.infer<z.ZodObject<ReturnType<typeof locale<Mode>>>>;
export type Chapter_Child = ConfiguratorChild<
  | Lesson_Configurator
  | Episode_Configurator
  | Assessment_Configurator
  | Assessment_Draft_Configurator
  | Lesson_Stub_Configurator
  | Episode_Stub_Configurator
  | Assessment_Stub_Configurator
>;
export type Chapter_Child_Data = Lesson_Data | Episode_Data | Assessment_Data | Lesson_Draft_Data | Episode_Draft_Data;

export const chapter_Metadata_Config_Schema = identity.extend({
  ...addUnifiedLocale(locale('config')),
});
export const chapter_Config_Schema = chapter_Metadata_Config_Schema.extend({
  children: z.array(z.string()),
}).catchall(z.unknown()).superRefine((value, context) => {
  for (const issue of validateSlugAddressedContainer(value, ['lesson', 'episode', 'assessment'])) {
    context.addIssue({ code: 'custom', path: issue.path, message: issue.message });
  }
});
export type Chapter_Config = z.infer<typeof chapter_Config_Schema>;

export type Chapter_Metadata_Overrides = {
  params?: DeepPartial<Chapter_Config['params']>;
  locale?: DeepPartial<Chapter_Config['locale']>;
};
export const chapter_Override_Config_Schema: z.ZodType<Chapter_Metadata_Overrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: chapter_Config_Schema.shape.params,
      locale: chapter_Config_Schema.shape.locale,
    }),
  ),
);
export type Chapter_Overrides<
  Items extends Record<string, Chapter_Child> = Record<string, Chapter_Child>,
  Added extends Record<string, Chapter_Child> = {},
> = Chapter_Metadata_Overrides & {
  /** Complete replacement order when adding, removing or reordering placements. */
  children?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
} & {
  [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false;
} & Added & SafePlacementMap<Added> & { [Key in Extract<keyof Items, keyof Added>]?: never };

export const chapter_Data_Schema = identity
  .extend({
    ...addUnifiedLocale(locale('data')),
    children: z.array(z.string()),
  })
  // Dynamic placement keys are validated at this boundary; never recursively
  // reparse child-owned internal content or treat semantic roles as children.
  .catchall(z.unknown())
  .superRefine((value, context) => {
    for (const issue of validateSlugAddressedContainer(value, ['lesson', 'episode', 'assessment'])) {
      context.addIssue({ code: 'custom', path: issue.path, message: issue.message });
    }
  });
export type Chapter_Data = z.infer<typeof chapter_Data_Schema>;
