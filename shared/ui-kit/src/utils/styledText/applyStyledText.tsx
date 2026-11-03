import type { StyledText_Rules } from '@svitlo/engine/content';

import { parseText } from '../text/parseText';
import styles from './StyledText.module.css';

export interface ApplyStyledTextOptions {
  text: string;
  styling?: StyledText_Rules;
}

export function applyStyledText({ text, styling }: ApplyStyledTextOptions) {
  const content = parseText(text).map((part, index) => {
    if (part.kind === 'text') return part.value.replaceAll('}}', '');

    const rule = styling?.find(item => item.id === part.id);
    if (!rule) return part.value;

    const applied = new Set(rule.applyStyle);
    const className = [
      applied.has('highlight') && styles.highlight,
      applied.has('highlight') && rule.tone === 'neutral' && styles.highlightNeutral,
      applied.has('highlight') && rule.tone === 'info' && styles.highlightInfo,
      applied.has('highlight') && rule.tone === 'success' && styles.highlightSuccess,
      applied.has('bold') && styles.bold,
      applied.has('cursive') && styles.cursive,
      applied.has('variable') && styles.variable,
    ].filter(Boolean).join(' ');
    const decoration = [
      applied.has('underscore') && 'underline',
      applied.has('crossed') && 'line-through',
    ].filter(Boolean).join(' ');

    return (
      <span
        key={`${part.id}:${index}`}
        className={className || undefined}
        style={{ color: rule.applyColor, textDecorationLine: decoration || undefined }}
      >
        {part.value}
      </span>
    );
  });

  return content.every(part => typeof part === 'string') ? content.join('') : content;
}
