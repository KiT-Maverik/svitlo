import type { ComponentType, ReactNode } from 'react';
import type { ContentBlock } from '@svitlo/engine/content';

/** Quiz has its own flow and is not rendered as page content. */
export type ContentBlockResponse = Exclude<ContentBlock<'response'>, { type: 'quiz' }>;
export type ContentBlockType = ContentBlockResponse['type'];
export type ResponseOf<Type extends ContentBlockType> = Extract<ContentBlockResponse, { type: Type }>;

type SceneResponse = ResponseOf<'scene'>;

export type SceneRegistry = Readonly<
  Record<string, ComponentType<{ locale: SceneResponse['locale'] }>>
>;

export type ContentBlockRendererProps = {
  blocks?: readonly ContentBlockResponse[];
  sceneRegistry?: SceneRegistry;
};

export type RenderNested = (response: ContentBlockResponse) => ReactNode;
