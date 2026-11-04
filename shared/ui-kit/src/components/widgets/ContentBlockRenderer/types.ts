import type { ComponentType, ReactNode } from 'react';
import type { ContentBlock, Locale_Languages } from '@svitlo/engine/content';
import type { LanguageCode } from '@svitlo/engine/localization';

/** Quiz has its own flow and is not rendered as page content. */
export type ContentBlockResponse = Exclude<ContentBlock<'response', Locale_Languages>, { type: 'quiz' }>;
export type ContentBlockType = ContentBlockResponse['type'];
export type ResponseOf<Type extends ContentBlockType> = Extract<ContentBlockResponse, { type: Type }>;

/** Scenes read their translated messages from the lesson-level provider. */
export type SceneRegistry = Readonly<Record<string, ComponentType>>;

export type ContentBlockRendererProps = {
  blocks?: readonly ContentBlockResponse[];
  sceneRegistry?: SceneRegistry;
  /** Selected lesson language, independent of localized content block responses. */
  language?: LanguageCode;
};

export type RenderNested = (response: ContentBlockResponse) => ReactNode;
