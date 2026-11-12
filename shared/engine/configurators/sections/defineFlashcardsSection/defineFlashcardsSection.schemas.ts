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
  type: z.literal('flashcards'),
  params,
});

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: contentBlockLocalizationSwitch[mode],
  navigationLabel: contentBlockLocalizationSwitch[mode],
});
export type FlashcardsSection_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

export const flashcardsSection_Config_Schema = sectionBase.extend({ ...addUnifiedLocale(locale('config')),
  content: z.object({
    items: z.record(z.string(), z.custom<ContentBlock_Configurator>()),
    order: z.array(z.string()),
  }),
});
export type FlashcardsSection_Config = z.infer<typeof flashcardsSection_Config_Schema>;

export const flashcardsSection_Props_Schema = sectionBase.extend({ ...addUnifiedLocale(locale('props')),
  content: z.array(contentBlockResolved_Schema),
});
export type FlashcardsSection_Props = Omit<z.infer<typeof flashcardsSection_Props_Schema>, 'content'> & {
  content: ContentBlock_Props[];
};

/** The complete base may omit translated child fields, which live in locale files. */
export type defineFlashcardsSection_PropsBase = Pick<FlashcardsSection_Props, 'id' | 'slug' | 'type' | 'params'> & {
  locale?: DeepPartial<FlashcardsSection_Locale<'props'>>;
  content: ReturnType<ContentBlock_Configurator['build']['props']>['base'][];
};

/** Identity and authored collection organization cannot be changed via metadata patches. */
export type defineFlashcardsSection_MetadataOverrides = DeepPartial<Pick<FlashcardsSection_Config, 'params' | 'locale'>>;
export const defineFlashcardsSection_Override_Config_Schema: z.ZodType<defineFlashcardsSection_MetadataOverrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: flashcardsSection_Config_Schema.shape.params,
      locale: flashcardsSection_Config_Schema.shape.locale,
    }),
  ),
);

export type defineFlashcardsSection_Overrides<
  Items extends Record<string, ContentBlock_Configurator>,
  Added extends Record<string, ContentBlock_Configurator> = {},
> = defineFlashcardsSection_MetadataOverrides & {
  content?: {
    items?: { [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false };
    additionalItems?: Added & { [Key in keyof Items]?: never };
    order?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
  };
};
