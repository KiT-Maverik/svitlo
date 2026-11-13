'use client';

import type { ContentBlock_Props, LanguageCode } from '@svitlo/engine/runtime';
import type { UiKitMessages } from '#types/uiKitMessages';
import { ContentBlockRenderer, type SceneRegistry } from '../widgets/ContentBlockRenderer';

/** The lesson bridge accepts only assembled Engine Props, not authoring Config. */
export type EngineContentBlockRendererProps = {
  blocks: readonly ContentBlock_Props[];
  messages: UiKitMessages;
  sceneRegistry?: SceneRegistry;
  language?: LanguageCode;
  onCheckpointComplete?: (id: string) => void;
  isCheckpointCompleted?: (id: string) => boolean;
};

/** Reuse the canonical renderer so media, Scenes and checkpoints keep one implementation. */
export function EngineContentBlockRenderer(props: EngineContentBlockRendererProps) {
  return <ContentBlockRenderer {...props} />;
}
