import { z } from 'zod';

import { deepStrict_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { identityBase_Schema, paramsBase_Schema } from '../../_shared__configurators/common.schemas';
import {
  validateSlugAddressedContainer,
  type SafePlacementMap,
} from '../../_shared__configurators/slugAddressedContainer/slugAddressedContainer.utils';
import type { Configurator_Mode } from '../../configurator.schemas';
import { contentBlockTypes } from '../../contentBlocks/contentBlock.constants';
import { localizationSwitch as contentBlockLocalizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import type { ContentBlock_Configurator } from '../../contentBlocks/contentBlock.types';

const params = paramsBase_Schema.shape.params.extend({
  skippable: z.boolean().optional(),
});

const sectionBase = identityBase_Schema.extend({
  type: z.literal('practice'),
  params,
});

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: contentBlockLocalizationSwitch[mode],
  navigationLabel: contentBlockLocalizationSwitch[mode],
});
export type PracticeSection_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

export const practiceSection_Metadata_Config_Schema = sectionBase.extend({
  ...addUnifiedLocale(locale('config')),
});
export const practiceSection_Config_Schema = practiceSection_Metadata_Config_Schema
  .extend({ children: z.array(z.string()) })
  .catchall(z.unknown())
  .superRefine((value, ctx) => {
    for (const issue of validateSlugAddressedContainer(value, contentBlockTypes)) {
      ctx.addIssue({ code: 'custom', path: issue.path, message: issue.message });
    }
  });
export type PracticeSection_Config = z.infer<typeof practiceSection_Config_Schema>;

export const practiceSection_Data_Schema = sectionBase
  .extend({
    ...addUnifiedLocale(locale('data')),
    children: z.array(z.string()),
  })
  .catchall(z.unknown())
  .superRefine((value, ctx) => {
    for (const issue of validateSlugAddressedContainer(value, contentBlockTypes)) {
      ctx.addIssue({ code: 'custom', path: issue.path, message: issue.message });
    }
  });
export type PracticeSection_Data = z.infer<typeof practiceSection_Data_Schema>;

/** The complete base may omit translated child fields, which live in locale files. */
export type PracticeSection_DataBase = Pick<PracticeSection_Data, 'id' | 'slug' | 'type' | 'params'> & {
  locale?: DeepPartial<PracticeSection_Locale<'data'>>;
  children: string[];
  [placementSlug: string]: unknown;
};

/** Identity and authored collection organization cannot be changed via metadata patches. */
export type PracticeSection_MetadataOverrides = DeepPartial<Pick<PracticeSection_Config, 'params' | 'locale'>>;
export const practiceSection_Override_Config_Schema: z.ZodType<PracticeSection_MetadataOverrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: practiceSection_Metadata_Config_Schema.shape.params,
      locale: practiceSection_Metadata_Config_Schema.shape.locale,
    }),
  ),
);

export type PracticeSection_Overrides<
  Items extends Record<string, ContentBlock_Configurator>,
  Added extends Record<string, ContentBlock_Configurator> = {},
> = PracticeSection_MetadataOverrides & {
  children?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
} & { [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false } & Added &
  SafePlacementMap<Added> & { [Key in keyof Items & keyof Added]?: never };
