import type { ContentBlock_Audio } from './audio.types';
import type { ContentBlock_Checkpoint } from './checkpoint.types';
import type { ContentBlock_Code } from './code.types';
import type { ContentBlock_Type } from './common.types';
import type { DefineValidKeysFromSlugs } from '../../misc.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { LanguageCode } from '../../languages';
import type { ContentBlock_Image } from './image.types';
import type { ContentBlock_Markdown } from './markdown.types';
import type { ContentBlock_Quiz, ContentBlock_Quiz_Screen } from './quiz.types';
import type { ContentBlock_Scene, ContentBlock_Scene_LocaleShape } from './scene.types';
import type { ContentBlock_Text } from './text.types';
import type { ContentBlock_Video } from './video.types';
import type { ContentBlock_Youtube } from './youtube.types';

export type ContentBlock<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends LanguageCode = LanguageCode> =
  | ContentBlock_Text<ConfigType, SupportedLanguages>
  | ContentBlock_Checkpoint<ConfigType, SupportedLanguages>
  | ContentBlock_Scene<ConfigType, ContentBlock_Scene_LocaleShape, SupportedLanguages>
  | ContentBlock_Markdown<ConfigType, SupportedLanguages>
  | ContentBlock_Code<ConfigType, SupportedLanguages>
  | ContentBlock_Audio<ConfigType, SupportedLanguages>
  | ContentBlock_Video<ConfigType, SupportedLanguages>
  | ContentBlock_Youtube<ConfigType, SupportedLanguages>
  | ContentBlock_Image<ConfigType, SupportedLanguages>
  | ContentBlock_Quiz<ConfigType, SupportedLanguages>;

export interface ContentBlock_Map<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends LanguageCode = LanguageCode> {
  text: ContentBlock_Text<ConfigType, SupportedLanguages>;
  checkpoint: ContentBlock_Checkpoint<ConfigType, SupportedLanguages>;
  scene: ContentBlock_Scene<ConfigType, ContentBlock_Scene_LocaleShape, SupportedLanguages>;
  markdown: ContentBlock_Markdown<ConfigType, SupportedLanguages>;
  code: ContentBlock_Code<ConfigType, SupportedLanguages>;
  audio: ContentBlock_Audio<ConfigType, SupportedLanguages>;
  video: ContentBlock_Video<ConfigType, SupportedLanguages>;
  youtube: ContentBlock_Youtube<ConfigType, SupportedLanguages>;
  image: ContentBlock_Image<ConfigType, SupportedLanguages>;
  quiz: ContentBlock_Quiz<ConfigType, SupportedLanguages>;
}

export type ContentBlock_Catalog<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends LanguageCode = LanguageCode> = {
  [Type in ContentBlock_Type & keyof ContentBlock_Map<ConfigType, SupportedLanguages>]?: Readonly<Record<string, ContentBlock_Map<ConfigType, SupportedLanguages>[Type]>>;
};

/** Ordered references to blocks in a Section catalog. */
export type ContentBlock_Reference = {
  [Type in keyof ContentBlock_Map<'response'>]: { type: Type; slug: string };
}[keyof ContentBlock_Map<'response'>];

export type ContentBlock_Catalog_DataFor<Definition extends ContentBlock_Catalog<'definition'>, SupportedLanguages extends LanguageCode = LanguageCode> = {
  [Type in keyof Definition]: Type extends keyof ContentBlock_Map<'data'>
    ? Record<keyof Definition[Type] & string, ContentBlock_Map<'data', SupportedLanguages>[Type]>
    : never;
};

type ContentBlock_Catalog_ValidSlugs<T extends ContentBlock_Catalog<'data', SupportedLanguages>, SupportedLanguages extends LanguageCode> = {
  [Type in keyof T]: Type extends keyof ContentBlock_Map<'data'>
    ? DefineValidKeysFromSlugs<keyof NonNullable<T[Type]> & string, ContentBlock_Map<'data', SupportedLanguages>[Type]>
    : never;
};

export function defineContentBlockCatalog<SupportedLanguages extends LanguageCode>():
  <const T extends ContentBlock_Catalog<'data', SupportedLanguages>>(
    catalog: T & ContentBlock_Catalog_ValidSlugs<T, SupportedLanguages>,
  ) => T;
export function defineContentBlockCatalog<const T extends ContentBlock_Catalog<'data'>>(
  catalog: T & ContentBlock_Catalog_ValidSlugs<T, LanguageCode>,
): T;
export function defineContentBlockCatalog(catalog?: unknown): unknown {
  return catalog === undefined ? <T>(value: T): T => value : catalog;
}

export type {
  ContentBlock_Audio,
  ContentBlock_Checkpoint,
  ContentBlock_Code,
  ContentBlock_Image,
  ContentBlock_Markdown,
  ContentBlock_Quiz,
  ContentBlock_Quiz_Screen,
  ContentBlock_Scene,
  ContentBlock_Text,
  ContentBlock_Video,
  ContentBlock_Youtube,
};

export type {
  ContentBlock_Text_Data,
  ContentBlock_Text_Presentation,
  ContentBlock_Text_Response,
  ContentBlock_Text_Wrap,
} from './text.types';

export type { ContentBlock_Youtube_Response } from './youtube.types';
export type { ContentBlock_Video_Response } from './video.types';
export type { ContentBlock_Image_Response } from './image.types';
export type { ContentBlock_Checkpoint_Response } from './checkpoint.types';
export type { ContentBlock_Audio_Response } from './audio.types';
export type { ContentBlock_Code_Response } from './code.types';
export type { ContentBlock_Markdown_Response } from './markdown.types';

export type {
  HighlightTone,
  StyledText_Rule,
  StyledText_Rules,
  StyledTextStyle,
} from '../../text.types';

export type { ContentBlock_Type } from './common.types';
