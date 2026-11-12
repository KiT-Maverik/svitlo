import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema } from '#schemas';

import { identityBase_Schema, paramsBase_Schema, addUnifiedLocale } from '../../_shared__configurators';
import { contentBlockLocalizationSwitch, contentBlockResolved_Schema } from '../../contentBlocks';
import type { ContentBlock_Configurator, ContentBlock_Props } from '../../contentBlocks';
import type { Configurator_Mode } from '../../configurator.schemas';

const params = paramsBase_Schema.shape.params.extend({
  skippable: z.literal(true).optional(),
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

export const codingTaskSection_Config_Schema = sectionBase.extend({ ...addUnifiedLocale(locale('config')),
  content: z.object({
    items: z.record(z.string(), z.custom<ContentBlock_Configurator>()),
    order: z.array(z.string()),
  }),
});
export type CodingTaskSection_Config = z.infer<typeof codingTaskSection_Config_Schema>;

export const codingTaskSection_Props_Schema = sectionBase.extend({ ...addUnifiedLocale(locale('props')),
  content: z.array(contentBlockResolved_Schema),
});
export type CodingTaskSection_Props = Omit<z.infer<typeof codingTaskSection_Props_Schema>, 'content'> & {
  content: ContentBlock_Props[];
};

/** The complete base may omit translated child fields, which live in locale files. */
export type defineCodingTaskSection_PropsBase = Pick<CodingTaskSection_Props, 'id' | 'slug' | 'type' | 'params'> & {
  locale?: DeepPartial<CodingTaskSection_Locale<'props'>>;
  content: ReturnType<ContentBlock_Configurator['build']['props']>['base'][];
};

/** Identity and authored collection organization cannot be changed via metadata patches. */
export type defineCodingTaskSection_MetadataOverrides = DeepPartial<Pick<CodingTaskSection_Config, 'params' | 'locale'>>;
export const defineCodingTaskSection_Override_Config_Schema: z.ZodType<defineCodingTaskSection_MetadataOverrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: codingTaskSection_Config_Schema.shape.params,
      locale: codingTaskSection_Config_Schema.shape.locale,
    }),
  ),
);

export type defineCodingTaskSection_Overrides<
  Items extends Record<string, ContentBlock_Configurator>,
  Added extends Record<string, ContentBlock_Configurator> = {},
> = defineCodingTaskSection_MetadataOverrides & {
  content?: {
    items?: { [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false };
    additionalItems?: Added & { [Key in keyof Items]?: never };
    order?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
  };
};
