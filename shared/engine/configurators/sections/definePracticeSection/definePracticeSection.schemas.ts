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

export const practiceSection_Config_Schema = sectionBase.extend({
  ...addUnifiedLocale(locale('config')),
  content: z.object({
    items: z.record(z.string(), z.custom<ContentBlock_Configurator>()),
    order: z.array(z.string()),
  }),
});
export type PracticeSection_Config = z.infer<typeof practiceSection_Config_Schema>;

export const practiceSection_Data_Schema = sectionBase.extend({
  ...addUnifiedLocale(locale('data')),
  content: z.array(contentBlockResolved_Schema),
});
export type PracticeSection_Data = Omit<z.infer<typeof practiceSection_Data_Schema>, 'content'> & {
  content: ContentBlock_Data[];
};

/** The complete base may omit translated child fields, which live in locale files. */
export type PracticeSection_DataBase = Pick<PracticeSection_Data, 'id' | 'slug' | 'type' | 'params'> & {
  locale?: DeepPartial<PracticeSection_Locale<'data'>>;
  content: ReturnType<ContentBlock_Configurator['build']['data']>['base'][];
};

/** Identity and authored collection organization cannot be changed via metadata patches. */
export type PracticeSection_MetadataOverrides = DeepPartial<Pick<PracticeSection_Config, 'params' | 'locale'>>;
export const practiceSection_Override_Config_Schema: z.ZodType<PracticeSection_MetadataOverrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: practiceSection_Config_Schema.shape.params,
      locale: practiceSection_Config_Schema.shape.locale,
    }),
  ),
);

export type PracticeSection_Overrides<
  Items extends Record<string, ContentBlock_Configurator>,
  Added extends Record<string, ContentBlock_Configurator> = {},
> = PracticeSection_MetadataOverrides & {
  content?: {
    items?: { [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false };
    additionalItems?: Added & { [Key in keyof Items]?: never };
    order?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
  };
};
