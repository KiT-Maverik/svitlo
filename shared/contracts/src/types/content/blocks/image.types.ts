import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Config, Locale_ResponseParams } from '../locale.types';

type ContentBlock_Image_Definition = ContentBlock_Definition_Meta<'image'>;

type Image_Fallback<Value> = {
  offline?: Value;
  unavailable?: Value;
  retry?: Value;
};

type Image_Layout =
  | { width: number; height: number; fill?: false; aspectRatio?: never; objectFit?: never }
  | { fill: true; aspectRatio: number; objectFit?: 'contain' | 'cover'; width?: never; height?: never };

type ContentBlock_Image_Data = ContentBlock_Data_Meta<'image'> & Image_Layout & {
  src: Locale_Config;
  alt: Locale_Config;
  caption?: Locale_Config;
  sizes?: string;
  unoptimized?: boolean;
  fallback?: Image_Fallback<Locale_Config>;
};

export type ContentBlock_Image_Response = ContentBlock_Response_Meta<'image'> & Locale_ResponseParams & Image_Layout & {
  src: string;
  alt: string;
  caption?: string;
  sizes?: string;
  unoptimized?: boolean;
  fallback?: Image_Fallback<string>;
};

export type ContentBlock_Image<ConfigType extends ContentEntity_ConfigType> = {
  definition: ContentBlock_Image_Definition;
  data: ContentBlock_Image_Data;
  response: ContentBlock_Image_Response;
}[ConfigType];
