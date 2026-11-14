import type { UiKitMessages } from '#types/uiKitMessages';
import type { ContentBlock_Props, LanguageCode } from '@svitlo/engine/runtime';
import { assertNever, resolveLocalizedText, type LocalizedText } from '../../ContentBlockRenderer/utils';
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

/** A choice name may be read outside a React component; require a language for dictionary values. */
function labelText(value: LocalizedText, language: LanguageCode | undefined, field: string): string {
  if (typeof value === 'string') return value;
  if (!language) throw new Error('Selected content language is required at ' + field);
  return resolveLocalizedText(value, language, field);
}

function optionalLabelText(
  value: LocalizedText | undefined,
  language: LanguageCode | undefined,
  field: string,
): string | undefined {
  return value === undefined ? undefined : labelText(value, language, field);
}

/** Plain text is for accessible names only; visual content uses ContentBlockRenderer. */
export function questionBlockLabel(block: QuestionBlock, language?: LanguageCode): string {
  switch (block.type) {
    case 'text':
      return block.locale.value;
    case 'markdown':
      return block.locale.value.replace(/[*_`#]/gu, '');
    case 'image':
      return block.locale.alt;
    case 'carousel':
      return (
        optionalLabelText(block.locale.title, language, 'carousel.title') ?? block.locale.slides[0]?.alt ?? ''
      );
    case 'audio':
      return labelText(block.locale.title, language, 'audio.title');
    case 'video':
    case 'youtube':
      return optionalLabelText(block.locale.title, language, block.type + '.title') ?? block.locale.label;
    case 'code':
      return optionalLabelText(block.locale?.title, language, 'code.title') ?? block.params.language;
    case 'checkpoint':
      return labelText(block.locale.title, language, 'checkpoint.title');
    case 'scene': {
      const value = block.locale.value;
      if (typeof value === 'string') return value;
      return typeof value.title === 'string' ? value.title : '';
    }
    case 'subtitles':
      throw new Error('Subtitles cannot be used as standalone question labels');
    default:
      return assertNever(block);
  }
}
export function questionLabel(blocks: readonly QuestionBlock[], language?: LanguageCode): string {
  return blocks.map(block => questionBlockLabel(block, language)).filter(Boolean).join(' ');
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
