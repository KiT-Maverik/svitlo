export type ContentBlock_Type = 'text' | 'markdown' | 'checkpoint' | 'code' | 'audio' | 'video' | 'youtube' | 'image' | 'scene' | 'quiz';

export type ContentBlock_Definition_Meta<T extends ContentBlock_Type> = {
  type: T;
}

export type ContentBlock_Data_Meta = {
  id: string;
  slug: string;
}

export type ContentBlock_Response_Meta<T extends ContentBlock_Type> = {
  id: string;
  /** Discriminant retained in localized JSON, including nested blocks. */
  type: T;
}
