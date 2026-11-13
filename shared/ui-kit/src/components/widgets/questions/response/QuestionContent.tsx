import type { UiKitMessages } from '#types/uiKitMessages';
import type { ContentBlock_Props } from '@svitlo/engine/runtime';
import { ContentBlockRenderer } from '../../ContentBlockRenderer';
import type { SceneRegistry } from '../../ContentBlockRenderer';

export type QuestionBlock = ContentBlock_Props;

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
  return <ContentBlockRenderer blocks={blocks} sceneRegistry={sceneRegistry} messages={messages} />;
}

/** Plain text is for accessible names only; visual content uses ContentBlockRenderer. */
export function questionBlockLabel(block: QuestionBlock): string {
  switch (block.type) {
    case 'text':
    case 'markdown':
      return block.locale.value;
    case 'image':
      return block.locale.alt;
    case 'carousel':
      return block.locale.title ?? block.locale.slides[0]?.alt ?? '';
    case 'audio':
      return block.locale.title;
    case 'video':
    case 'youtube':
      return block.locale.title ?? block.locale.label;
    case 'code':
      return block.locale?.title ?? block.params.language;
    case 'checkpoint':
      return block.locale.title;
    case 'scene': {
      const value = block.locale.value;
      if (typeof value === 'string') return value;
      return typeof value.title === 'string' ? value.title : '';
    }
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
