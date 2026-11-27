import { z } from 'zod';

import { deepStrict_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { identityBase_Schema, paramsBase_Schema } from '../../_shared__configurators/common.schemas';
import type { Configurator_Mode } from '../../configurator.schemas';
import {
  localizationSwitch as contentBlockLocalizationSwitch,
  contentBlockResolved_Schema,
} from '../../contentBlocks/contentBlock.schemas';
import type { ContentBlock_Configurator, ContentBlock_Data } from '../../contentBlocks/contentBlock.types';

const params = paramsBase_Schema.shape.params.extend({
  skippable: z.boolean().optional(),
});

const sectionBase = identityBase_Schema.extend({
  type: z.literal('codingTask'),
  params,
});

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: contentBlockLocalizationSwitch[mode],
  navigationLabel: contentBlockLocalizationSwitch[mode],
});
export type CodingTaskSection_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

export const codingTaskSection_Config_Schema = sectionBase.extend({
  ...addUnifiedLocale(locale('config')),
  content: z.object({
    items: z.record(z.string(), z.custom<ContentBlock_Configurator>()),
    order: z.array(z.string()),
  }),
});
export type CodingTaskSection_Config = z.infer<typeof codingTaskSection_Config_Schema>;

export const codingTaskSection_Data_Schema = sectionBase.extend({
  ...addUnifiedLocale(locale('data')),
  content: z.array(contentBlockResolved_Schema),
});
export type CodingTaskSection_Data = Omit<z.infer<typeof codingTaskSection_Data_Schema>, 'content'> & {
  content: ContentBlock_Data[];
};

/** The complete base may omit translated child fields, which live in locale files. */
export type CodingTaskSection_DataBase = Pick<CodingTaskSection_Data, 'id' | 'slug' | 'type' | 'params'> & {
  locale?: DeepPartial<CodingTaskSection_Locale<'data'>>;
  content: ReturnType<ContentBlock_Configurator['build']['data']>['base'][];
};

/** Identity and authored collection organization cannot be changed via metadata patches. */
export type CodingTaskSection_MetadataOverrides = DeepPartial<Pick<CodingTaskSection_Config, 'params' | 'locale'>>;
export const codingTaskSection_Override_Config_Schema: z.ZodType<CodingTaskSection_MetadataOverrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: codingTaskSection_Config_Schema.shape.params,
      locale: codingTaskSection_Config_Schema.shape.locale,
    }),
  ),
);

export type CodingTaskSection_Overrides<
  Items extends Record<string, ContentBlock_Configurator>,
  Added extends Record<string, ContentBlock_Configurator> = {},
> = CodingTaskSection_MetadataOverrides & {
  content?: {
    items?: { [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false };
    additionalItems?: Added & { [Key in keyof Items]?: never };
    order?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
  };
};
