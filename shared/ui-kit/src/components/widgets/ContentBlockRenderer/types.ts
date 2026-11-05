import type { ComponentType, ReactNode } from 'react';
import type { ContentBlock, Locale_Languages } from '@svitlo/engine/content';
import type { LanguageCode } from '@svitlo/engine/localization';
import type { UiKit_Global } from '@svitlo/engine/content';

/** Quiz has its own flow and is not rendered as page content. */
export type ContentBlockResponse = Exclude<ContentBlock<'response', Locale_Languages>, { type: 'quiz' }>;
export type ContentBlockType = ContentBlockResponse['type'];
export type ResponseOf<Type extends ContentBlockType> = Extract<ContentBlockResponse, { type: Type }>;

/** Resolve a scene by its stable content ID. */
export type SceneRegistry = (id: string) => ComponentType<{ locales: ResponseOf<'scene'>['locales'] }> | undefined;

export type ContentBlockRendererProps = {
  messages: UiKit_Global<'response'>;
  blocks?: readonly ContentBlockResponse[];
  sceneRegistry?: SceneRegistry;
  /** Selected lesson language, independent of localized content block responses. */
  language?: LanguageCode;
};

export type RenderNested = (response: ContentBlockResponse) => ReactNode;
