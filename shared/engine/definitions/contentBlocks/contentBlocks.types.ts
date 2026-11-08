export type ContentBlock_Type =
  'text' | 'markdown' | 'checkpoint' | 'code' | 'audio' | 'video' | 'youtube' | 'image' | 'carousel' | 'scene';

export type ContentBlock_Meta<T extends ContentBlock_Type> = {
  id: string;
  slug: string;
  type: T;
};
