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
  type: z.literal('content'),
  params,
});

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: contentBlockLocalizationSwitch[mode],
  navigationLabel: contentBlockLocalizationSwitch[mode],
});
export type ContentSection_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

export const contentSection_Config_Schema = sectionBase.extend({
  ...addUnifiedLocale(locale('config')),
  content: z.object({
    items: z.record(z.string(), z.custom<ContentBlock_Configurator>()),
    order: z.array(z.string()),
  }),
});
export type Content_Section_Config = z.infer<typeof contentSection_Config_Schema>;

export const contentSection_Data_Schema = sectionBase.extend({
  ...addUnifiedLocale(locale('data')),
  content: z.array(contentBlockResolved_Schema),
});
export type Content_Section_Data = Omit<z.infer<typeof contentSection_Data_Schema>, 'content'> & {
  content: ContentBlock_Data[];
};

/** The complete base may omit translated child fields, which live in locale files. */
export type ContentSection_DataBase = Pick<Content_Section_Data, 'id' | 'slug' | 'type' | 'params'> & {
  locale?: DeepPartial<ContentSection_Locale<'data'>>;
  content: ReturnType<ContentBlock_Configurator['build']['data']>['base'][];
};

/** Identity and authored collection organization cannot be changed via metadata patches. */
export type ContentSection_MetadataOverrides = DeepPartial<Pick<Content_Section_Config, 'params' | 'locale'>>;
export const contentSection_Override_Config_Schema: z.ZodType<ContentSection_MetadataOverrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: contentSection_Config_Schema.shape.params,
      locale: contentSection_Config_Schema.shape.locale,
    }),
  ),
);

export type ContentSection_Overrides<
  Items extends Record<string, ContentBlock_Configurator>,
  Added extends Record<string, ContentBlock_Configurator> = {},
> = ContentSection_MetadataOverrides & {
  content?: {
    items?: { [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false };
    additionalItems?: Added & { [Key in keyof Items]?: never };
    order?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
  };
};
