import { z } from 'zod';

import { deepStrict_Schema } from '#schemas';
import { validateSlugAddressedContainer, type SafePlacementMap } from '../../_shared__configurators/slugAddressedContainer/slugAddressedContainer.utils';
import { contentBlockTypes } from '../../contentBlocks/contentBlock.constants';
import type { DeepPartial } from '#types';

import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { identityBase_Schema, paramsBase_Schema } from '../../_shared__configurators/common.schemas';
import type { Configurator_Mode } from '../../configurator.schemas';
import {
  localizationSwitch as contentBlockLocalizationSwitch,
} from '../../contentBlocks/contentBlock.schemas';
import type { ContentBlock_Configurator } from '../../contentBlocks/contentBlock.types';

const params = paramsBase_Schema.shape.params.extend({
  skippable: z.boolean().optional(),
});

const sectionBase = identityBase_Schema.extend({
  type: z.literal('learningFlow'),
  params,
});

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: contentBlockLocalizationSwitch[mode],
  navigationLabel: contentBlockLocalizationSwitch[mode],
});
export type LearningFlowSection_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

export const learningFlowSection_Metadata_Config_Schema = sectionBase.extend({
  ...addUnifiedLocale(locale('config')),
});
export const learningFlowSection_Config_Schema = learningFlowSection_Metadata_Config_Schema
  .extend({ children: z.array(z.string()) })
  .catchall(z.unknown())
  .superRefine((value, ctx) => {
    for (const issue of validateSlugAddressedContainer(value, contentBlockTypes)) {
      ctx.addIssue({ code: 'custom', path: issue.path, message: issue.message });
    }
  });
export type LearningFlowSection_Config = z.infer<typeof learningFlowSection_Config_Schema>;

export const learningFlowSection_Data_Schema = sectionBase.extend({
  ...addUnifiedLocale(locale('data')),
  children: z.array(z.string()),
})
  .catchall(z.unknown())
  .superRefine((value, ctx) => {
    for (const issue of validateSlugAddressedContainer(value, contentBlockTypes)) {
      ctx.addIssue({ code: 'custom', path: issue.path, message: issue.message });
    }
  });
export type LearningFlowSection_Data = z.infer<typeof learningFlowSection_Data_Schema>;

/** The complete base may omit translated child fields, which live in locale files. */
export type LearningFlowSection_DataBase = Pick<LearningFlowSection_Data, 'id' | 'slug' | 'type' | 'params'> & {
  locale?: DeepPartial<LearningFlowSection_Locale<'data'>>;
  children: string[];
  [placementSlug: string]: unknown;
};

/** Identity and authored collection organization cannot be changed via metadata patches. */
export type LearningFlowSection_MetadataOverrides = DeepPartial<Pick<LearningFlowSection_Config, 'params' | 'locale'>>;
export const learningFlowSection_Override_Config_Schema: z.ZodType<LearningFlowSection_MetadataOverrides> =
  z.deepPartial(
    deepStrict_Schema(
      z.object({
        params: learningFlowSection_Metadata_Config_Schema.shape.params,
        locale: learningFlowSection_Metadata_Config_Schema.shape.locale,
      }),
    ),
  );

export type LearningFlowSection_Overrides<
  Items extends Record<string, ContentBlock_Configurator>,
  Added extends Record<string, ContentBlock_Configurator> = {},
> = LearningFlowSection_MetadataOverrides & {
  children?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
} & { [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false } &
  Added & SafePlacementMap<Added> & { [Key in keyof Items & keyof Added]?: never };
