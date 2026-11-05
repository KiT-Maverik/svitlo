import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Languages, Locale_Options } from '../locale.types';

/** Preserve the scene's keys while rejecting non-string leaves at any depth. */
type ContentBlock_Scene_Locales_Strings<TLocales> = TLocales extends string
  ? TLocales
  : TLocales extends object
    ? { [Key in keyof TLocales]: ContentBlock_Scene_Locales_Strings<TLocales[Key]> }
    : never;

export type ContentBlock_Scene_LocaleShape = {
  [Key: string]: string | ContentBlock_Scene_LocaleShape;
};

type ContentBlock_Scene_Definition = ContentBlock_Definition_Meta<'scene'> & {
  /** Stable runtime Scene registry key (no JSX in authored configuration). */
  rendererKey: string;
};

type ContentBlock_Scene_Locales_Data<TLocales, SupportedLanguages extends Locale_Languages> = TLocales extends string
  ? Locale_Options<SupportedLanguages>
  : TLocales extends object
    ? { [Key in keyof TLocales]: ContentBlock_Scene_Locales_Data<TLocales[Key], SupportedLanguages> }
    : never;

type ContentBlock_Scene_Data<TLocales extends object, SupportedLanguages extends Locale_Languages> = ContentBlock_Data_Meta<'scene'> & {
  locales: ContentBlock_Scene_Locales_Data<ContentBlock_Scene_Locales_Strings<TLocales>, SupportedLanguages>;
};

type ContentBlock_Scene_Response<TLocales extends object> = ContentBlock_Response_Meta<'scene'> & {
    /** Localized scene props supplied directly to the renderer. */
    locales: ContentBlock_Scene_Locales_Strings<TLocales>;
    rendererKey: string;
  };

export type ContentBlock_Scene<
  ConfigType extends ContentEntity_ConfigType,
  SupportedLanguages extends Locale_Languages,
  TLocales extends object = ContentBlock_Scene_LocaleShape,
> = {
  definition: ContentBlock_Scene_Definition;
  data: ContentBlock_Scene_Data<TLocales, SupportedLanguages>;
  response: ContentBlock_Scene_Response<TLocales>;
}[ConfigType];
