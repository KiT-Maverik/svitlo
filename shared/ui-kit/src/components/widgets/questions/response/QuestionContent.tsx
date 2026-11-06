import type { UiKitMessages } from '#types/uiKitMessages';
import type { ContentBlock, Locale_Languages } from '@svitlo/engine/content';
import { ContentBlockRenderer } from '../../ContentBlockRenderer';
import type { ContentBlockResponse, SceneRegistry } from '../../ContentBlockRenderer';

export type QuestionBlock = ContentBlock<'response', Locale_Languages>;

function renderable(block: QuestionBlock): ContentBlockResponse {
  return block;
}

export function QuestionContent({
  blocks,
  sceneRegistry,
  messages,
}: {
  messages: UiKitMessages;
  blocks?: readonly QuestionBlock[];
  sceneRegistry?: SceneRegistry;
}) {
  if (!blocks?.length) return null;
  return <ContentBlockRenderer blocks={blocks.map(renderable)} sceneRegistry={sceneRegistry} messages={messages} />;
}

/** Plain text is for accessible names only; visual content uses ContentBlockRenderer. */
export function questionBlockLabel(block: QuestionBlock): string {
  switch (block.type) {
    case 'text':
      return block.value;
    case 'markdown':
      return block.text.replace(/[*_`#]/gu, '');
    case 'image':
      return block.alt;
    case 'audio':
      return block.title;
    case 'video':
      return block.title ?? '';
    case 'youtube':
      return block.title ?? block.hint ?? '';
    case 'code':
      return block.title ?? block.language;
    case 'checkpoint':
      return block.title;
    case 'scene':
      return block.rendererKey;
  }
}

export function questionLabel(blocks: readonly QuestionBlock[]): string {
  return blocks.map(questionBlockLabel).filter(Boolean).join(' ');
}

export type QuestionItem = { id: string; block: QuestionBlock };

/** A reproducible order, independent of hydration and render count. */
export function shuffleItems<T extends { id: string }>(items: readonly T[], seed: string): T[] {
  const hash = (id: string) => {
    let value = 2166136261;
    for (const character of seed + ':' + id) {
      value = Math.imul(value ^ character.charCodeAt(0), 16777619);
    }
    return value >>> 0;
  };
  const ordered = [...items].sort((a, b) => hash(a.id) - hash(b.id));
  if (ordered.length > 1 && ordered.every((item, index) => item.id === items[index].id)) {
    ordered.reverse();
  }
  return ordered;
}

export function normalizedAnswer(value: string): string {
  return value.trim().replace(/\s+/gu, ' ').toLocaleLowerCase();
}
