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
  selection: z.strictObject({
    flashcardIds: z
      .array(z.uuid())
      .nonempty()
      .refine(ids => new Set(ids).size === ids.length, 'Flashcard UUIDs must be unique'),
  }),
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

export const flashcardsSection_Metadata_Config_Schema = sectionBase.extend({
  ...addUnifiedLocale(locale('config')),
});
export const flashcardsSection_Config_Schema = flashcardsSection_Metadata_Config_Schema
  .extend({ children: z.array(z.string()) })
  .catchall(z.unknown())
  .superRefine((value, ctx) => {
    for (const issue of validateSlugAddressedContainer(value, contentBlockTypes)) {
      ctx.addIssue({ code: 'custom', path: issue.path, message: issue.message });
    }
  });
export type FlashcardsSection_Config = z.infer<typeof flashcardsSection_Config_Schema>;

export const flashcardsSection_Data_Schema = sectionBase.extend({
  ...addUnifiedLocale(locale('data')),
  children: z.array(z.string()),
})
  .catchall(z.unknown())
  .superRefine((value, ctx) => {
    for (const issue of validateSlugAddressedContainer(value, contentBlockTypes)) {
      ctx.addIssue({ code: 'custom', path: issue.path, message: issue.message });
    }
  });
export type FlashcardsSection_Data = z.infer<typeof flashcardsSection_Data_Schema>;

/** The complete base may omit translated child fields, which live in locale files. */
export type FlashcardsSection_DataBase = Pick<FlashcardsSection_Data, 'id' | 'slug' | 'type' | 'params'> & {
  locale?: DeepPartial<FlashcardsSection_Locale<'data'>>;
  children: string[];
  [placementSlug: string]: unknown;
};

/** Identity and authored collection organization cannot be changed via metadata patches. */
export type FlashcardsSection_MetadataOverrides = DeepPartial<Pick<FlashcardsSection_Config, 'params' | 'locale'>>;
export const flashcardsSection_Override_Config_Schema: z.ZodType<FlashcardsSection_MetadataOverrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: flashcardsSection_Metadata_Config_Schema.shape.params,
      locale: flashcardsSection_Metadata_Config_Schema.shape.locale,
    }),
  ),
);

export type FlashcardsSection_Overrides<
  Items extends Record<string, ContentBlock_Configurator>,
  Added extends Record<string, ContentBlock_Configurator> = {},
> = FlashcardsSection_MetadataOverrides & {
  children?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
} & { [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false } &
  Added & SafePlacementMap<Added> & { [Key in keyof Items & keyof Added]?: never };
