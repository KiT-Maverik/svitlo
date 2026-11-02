import type { ReactNode } from 'react';
import type { Locale } from '@svitlo/engine/localization';
import type { ContentBlock } from '@svitlo/engine/content';

export interface KnowledgeCheckpointItem {
  id: string;
  question: string;
  answer: readonly ContentBlock<'response'>[];
  /** Overrides the checkpoint-wide setting for this question. */
  enableCheck?: boolean;
  /** Renders a content block using a lesson-specific renderer when needed. */
  answerSlot?: ReactNode;
  iconSlot?: ReactNode;
}

export interface KnowledgeCheckpointProgress {
  checkedIds: string[];
  checkedCount: number;
  requiredCount: number;
  complete: boolean;
}

export interface KnowledgeCheckpointProps {
  items: readonly KnowledgeCheckpointItem[];
  locale?: Locale;
  title?: ReactNode;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  showIndices?: boolean;
  showChevron?: boolean;
  showIcon?: boolean;
  indexPosition?: 'left' | 'right';
  iconPosition?: 'left' | 'right';
  chevronPosition?: 'left' | 'right';
  enableChecks?: boolean;
  renderAsGroup?: boolean;
  checkedIds?: readonly string[];
  defaultCheckedIds?: readonly string[];
  onProgressChange?: (progress: KnowledgeCheckpointProgress) => void;
  slots?: {
    icon?: ReactNode;
    chevron?: ReactNode;
    checkLabel?: ReactNode;
    renderAnswer?: (answer: readonly ContentBlock<'response'>[]) => ReactNode;
  };
}
