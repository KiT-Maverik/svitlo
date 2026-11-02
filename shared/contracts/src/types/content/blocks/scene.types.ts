import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Config, Locale_ResponseParams } from '../locale.types';

/** Preserve the scene's keys while rejecting non-string leaves at any depth. */
type ContentBlock_Scene_Locales_Strings<TLocales> = TLocales extends string
  ? TLocales
  : TLocales extends object
    ? { [Key in keyof TLocales]: ContentBlock_Scene_Locales_Strings<TLocales[Key]> }
    : never;

type ContentBlock_Scene_LocaleShape = {
  [Key: string]: string | ContentBlock_Scene_LocaleShape;
};

type ContentBlock_Scene_Definition = ContentBlock_Definition_Meta<'scene'> & {
  /** Stable runtime Scene registry key (no JSX in authored configuration). */
  rendererKey: string;
};

type ContentBlock_Scene_Locales_Data<TLocales> = TLocales extends string
  ? Locale_Config
  : TLocales extends object
    ? { [Key in keyof TLocales]: ContentBlock_Scene_Locales_Data<TLocales[Key]> }
    : never;

type ContentBlock_Scene_Data<TLocales extends object> = ContentBlock_Data_Meta & {
  locales: ContentBlock_Scene_Locales_Data<ContentBlock_Scene_Locales_Strings<TLocales>>;
};

type ContentBlock_Scene_Response<TLocales extends object> = ContentBlock_Response_Meta<'scene'> &
  Locale_ResponseParams & {
    /** Translated scene props, separate from the locale selection metadata. */
    messages: ContentBlock_Scene_Locales_Strings<TLocales>;
    rendererKey: string;
  };

export type ContentBlock_Scene<
  ConfigType extends ContentEntity_ConfigType,
  TLocales extends object = ContentBlock_Scene_LocaleShape,
> = {
  definition: ContentBlock_Scene_Definition;
  data: ContentBlock_Scene_Data<TLocales>;
  response: ContentBlock_Scene_Response<TLocales>;
}[ConfigType];
