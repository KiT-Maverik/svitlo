import type { ContentBlock_Audio } from './audio.types';
import type { ContentBlock_Checkpoint } from './checkpoint.types';
import type { ContentBlock_Code } from './code.types';
import type { ContentBlock_Type } from './common.types';
import type { DefineValidKeysFromSlugs } from '../../misc.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { ContentBlock_Image } from './image.types';
import type { ContentBlock_Markdown } from './markdown.types';
import type { ContentBlock_Quiz } from './quiz.types';
import type { ContentBlock_Scene } from './scene.types';
import type { ContentBlock_Text } from './text.types';
import type { ContentBlock_Video } from './video.types';
import type { ContentBlock_Youtube } from './youtube.types';

export type ContentBlock<ConfigType extends ContentEntity_ConfigType> =
  | ContentBlock_Text<ConfigType>
  | ContentBlock_Checkpoint<ConfigType>
  | ContentBlock_Scene<ConfigType>
  | ContentBlock_Markdown<ConfigType>
  | ContentBlock_Code<ConfigType>
  | ContentBlock_Audio<ConfigType>
  | ContentBlock_Video<ConfigType>
  | ContentBlock_Youtube<ConfigType>
  | ContentBlock_Image<ConfigType>
  | ContentBlock_Quiz<ConfigType>;

export interface ContentBlock_Map<ConfigType extends ContentEntity_ConfigType> {
  text: ContentBlock_Text<ConfigType>;
  checkpoint: ContentBlock_Checkpoint<ConfigType>;
  scene: ContentBlock_Scene<ConfigType>;
  markdown: ContentBlock_Markdown<ConfigType>;
  code: ContentBlock_Code<ConfigType>;
  audio: ContentBlock_Audio<ConfigType>;
  video: ContentBlock_Video<ConfigType>;
  youtube: ContentBlock_Youtube<ConfigType>;
  image: ContentBlock_Image<ConfigType>;
  quiz: ContentBlock_Quiz<ConfigType>;
}

export type ContentBlock_Catalog<ConfigType extends ContentEntity_ConfigType> = {
  [Type in ContentBlock_Type & keyof ContentBlock_Map<ConfigType>]?: Readonly<Record<string, ContentBlock_Map<ConfigType>[Type]>>;
};

/** Ordered references to blocks in a Section catalog. */
export type ContentBlock_Reference = {
  [Type in keyof ContentBlock_Map<'response'>]: { type: Type; slug: string };
}[keyof ContentBlock_Map<'response'>];

export type ContentBlock_Catalog_DataFor<Definition extends ContentBlock_Catalog<'definition'>> = {
  [Type in keyof Definition]: Type extends keyof ContentBlock_Map<'data'>
    ? Record<keyof Definition[Type] & string, ContentBlock_Map<'data'>[Type]>
    : never;
};

type ContentBlock_Catalog_ValidSlugs<T extends ContentBlock_Catalog<'data'>> = {
  [Type in keyof T]: Type extends keyof ContentBlock_Map<'data'>
    ? DefineValidKeysFromSlugs<keyof NonNullable<T[Type]> & string, ContentBlock_Map<'data'>[Type]>
    : never;
};

export function defineContentBlockCatalog<const T extends ContentBlock_Catalog<'data'>>(
  catalog: T & ContentBlock_Catalog_ValidSlugs<T>,
): T {
  return catalog;
}

export type {
  ContentBlock_Audio,
  ContentBlock_Checkpoint,
  ContentBlock_Code,
  ContentBlock_Image,
  ContentBlock_Markdown,
  ContentBlock_Quiz,
  ContentBlock_Scene,
  ContentBlock_Text,
  ContentBlock_Video,
  ContentBlock_Youtube,
};

export type { ContentBlock_Type } from './common.types';
