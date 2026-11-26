/** Leaf nodes in the authored Configurator tree, not necessarily static UI. */
export const primitiveContentBlockTypes = [
  'text',
  'markdown',
  'code',
  'image',
  'audio',
  'video',
  'youtube',
  'subtitles',
  'scene',
] as const;
export type ContentBlock_Primitive_Type = (typeof primitiveContentBlockTypes)[number];

/** Nodes that themselves own ContentBlock composition. */
export const compositeContentBlockTypes = ['carousel', 'checkpoint'] as const;
export type ContentBlock_Composite_Type = (typeof compositeContentBlockTypes)[number];

export const contentBlockTypes = [...primitiveContentBlockTypes, ...compositeContentBlockTypes] as const;
export type ContentBlock_Type = (typeof contentBlockTypes)[number];

export const textStylePresets = ['highlight', 'bold', 'cursive', 'underscore', 'crossed', 'variable'] as const;
export type TextStylePreset = (typeof textStylePresets)[number];

export const textTonePresets = ['neutral', 'info', 'warning', 'success'] as const;
export type TextTonePreset = (typeof textTonePresets)[number];
