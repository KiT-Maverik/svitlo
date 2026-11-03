import type { ComponentType, ReactNode } from 'react';
import type { ContentBlock_Catalog, Question_Catalog } from '@svitlo/engine/content';

/** Only the new, serialized response catalog is accepted here. */
export type ResponseCatalog = ContentBlock_Catalog<'response'>;
export type ContentBlockType = keyof ResponseCatalog;
export type ContentBlockResponse<Type extends ContentBlockType> = NonNullable<ResponseCatalog[Type]>[string];

type SceneResponse = ContentBlockResponse<'scene'>;

/** The key is a stable, explicitly registered scene identifier, never a JSON component. */
export type SceneRegistry = Readonly<
  Record<string, ComponentType<{ locale: SceneResponse['locale'] }>>
>;

export interface ContentBlockRenderContext {
  sceneRegistry?: SceneRegistry;
  questions?: Question_Catalog<'response'>;
}

export type ContentBlockRendererProps = {
  [Type in ContentBlockType]: ContentBlockRenderContext & {
    type: Type;
    response: ContentBlockResponse<Type>;
  };
}[ContentBlockType];

export type ContentBlockReference = {
  [Type in ContentBlockType]: { type: Type; key: string };
}[ContentBlockType];

export type NestedResponse = { [Type in ContentBlockType]: ContentBlockResponse<Type> }[ContentBlockType];
export type TaggedResponse = {
  [Type in ContentBlockType]: ContentBlockResponse<Type> & { type: Type };
}[ContentBlockType];

export type RenderNested = (response: NestedResponse) => ReactNode;
