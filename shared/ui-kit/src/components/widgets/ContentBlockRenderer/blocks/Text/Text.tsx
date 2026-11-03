import Typography, { type TypographyProps } from '@mui/material/Typography';

import type { NonEmptyArray } from '@svitlo/engine';

import { parseText } from './parseText';
import styles from './Text.module.css';

type TextStyle = 'highlight' | 'bold' | 'cursive' | 'underscore' | 'crossed' | 'variable';

type HighlightTone = 'neutral' | 'info' | 'warning' | 'success';

interface FragmentStyle {
  id: string;
  applyStyle: NonEmptyArray<TextStyle>;
  applyColor?: string;
  tone?: HighlightTone;
}

export interface TextProps {
  text: string;
  wrap?: {
    enabled?: false;
    typographyProps?: Omit<TypographyProps, 'children'>;
  };
  styling?: NonEmptyArray<FragmentStyle>;
}

export const Text = ({ text, wrap, styling }: TextProps) => {
  const content = parseText(text).map((part, index) => {
    if (part.kind === 'text') return part.value;

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

  const rendered = content.every(part => typeof part === 'string') ? content.join('') : content;

  if (wrap?.enabled === false) return rendered;

  return <Typography component="p" {...wrap?.typographyProps}>{rendered}</Typography>;
};
