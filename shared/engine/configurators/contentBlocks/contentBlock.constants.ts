export const contentBlockTypes = [
  'text',
  'code',
  'image',
  'video',
  'youtube',
  'carousel',
  'scene',
  'checkpoint',
  'markdown',
  'audio',
] as const;
export type ContentBlock_Type = (typeof contentBlockTypes)[number];

export const textStylePresets = ['highlight', 'bold', 'cursive', 'underscore', 'crossed', 'variable'] as const;
export type TextStylePreset = (typeof textStylePresets)[number];

export const textTonePresets = ['neutral', 'info', 'warning', 'success'] as const;
export type TextTonePreset = (typeof textTonePresets)[number];
