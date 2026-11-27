import type { ComponentType, ReactNode } from 'react';

import type { LanguageCode } from '@svitlo/engine/runtime';
import type { ContentBlockViewProps } from '../../../presentation';

import type { UiKitMessages } from '#types/uiKitMessages';

/** Quiz is a Section; ContentBlock contains renderable resources only. */
export type ContentBlockResponse = ContentBlockViewProps;
export type ContentBlockType = ContentBlockResponse['type'];
export type ResponseOf<Type extends ContentBlockType> = Extract<ContentBlockResponse, { type: Type }>;

/** Resolve a scene by its stable content ID. */
export type SceneRegistry = (
  id: string,
) => ComponentType<{ locales: ResponseOf<'scene'>['locale']['value'] }> | undefined;

export type ContentBlockRendererProps = {
  messages: UiKitMessages;
  /** Lesson-owned callback; standalone widgets do not need a controller. */
  onCheckpointComplete?: (checkpointId: string) => void;
  isCheckpointCompleted?: (checkpointId: string) => boolean;
  blocks?: readonly ContentBlockResponse[];
  sceneRegistry?: SceneRegistry;
  /** Selected lesson language, independent of localized content block responses. */
  language?: LanguageCode;
};

export type RenderNested = (response: ContentBlockResponse) => ReactNode;
