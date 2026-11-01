'use client';

import { createElement, useId, useState, type ReactNode } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import LightbulbOutlineRounded from '@mui/icons-material/LightbulbOutlineRounded';
import RadioButtonUncheckedRounded from '@mui/icons-material/RadioButtonUncheckedRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import type { ContentBlock } from '@svitlo/engine/content';
import { getLanguageCode, getLocaleDirection } from '@svitlo/engine/localization';
import type { LanguageCode } from '@svitlo/engine/localization';
import { locales, type KnowledgeCheckpoint_Locale } from './KnowledgeCheckpoint.locale';
import type { KnowledgeCheckpointProps, KnowledgeCheckpointProgress } from './KnowledgeCheckpoint.types';
import styles from './KnowledgeCheckpoint.module.css';

function defaultBlockAnswer(answer: ContentBlock<'response'>): ReactNode {
  switch (answer.type) {
    case 'text':
      return <p className={styles.answerText}>{answer.value}</p>;
    case 'image':
      return <Box component="img" className={styles.media} src={answer.src} alt={answer.alt} />;
    case 'audio':
      return <audio className={styles.media} src={answer.fileLocation} controls aria-label={answer.title} />;
    case 'video':
      return <video className={styles.media} src={answer.fileLocation} poster={answer.poster} controls />;
    default:
      throw new Error(`Provide an answerSlot or slots.renderAnswer for ${answer.type} content blocks`);
  }
}

function defaultAnswer(answers: readonly ContentBlock<'response'>[]): ReactNode {
  return answers.map((answer, index) => <div key={`${answer.id}:${index}`}>{defaultBlockAnswer(answer)}</div>);
}

export default function KnowledgeCheckpoint({
  items,
  locale = 'en-US',
  title,
  headingLevel = 2,
  showIndices = true,
  showChevron = true,
  showIcon = false,
  indexPosition = 'left',
  iconPosition = 'left',
  chevronPosition = 'right',
  enableChecks = true,
  renderAsGroup = true,
  checkedIds,
  defaultCheckedIds = [],
  onProgressChange,
  slots,
}: KnowledgeCheckpointProps) {
  const id = useId();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [internalCheckedIds, setInternalCheckedIds] = useState<string[]>(() => [...defaultCheckedIds]);
  const checked = new Set(checkedIds ?? internalCheckedIds);
  const messages =
    (locales as Partial<Record<LanguageCode, KnowledgeCheckpoint_Locale>>)[getLanguageCode(locale)] ?? locales.en;
  const direction = getLocaleDirection(locale);
  const accordionHeading = `h${Math.min(headingLevel + 1, 6)}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  function markChecked(itemId: string) {
    if (checked.has(itemId)) return;
    const next = new Set(checked);
    next.add(itemId);
    if (checkedIds === undefined) setInternalCheckedIds([...next]);
    const required = items.filter(item => item.enableCheck ?? enableChecks);
    const checkedRequired = required.filter(item => next.has(item.id));
    const progress: KnowledgeCheckpointProgress = {
      checkedIds: checkedRequired.map(item => item.id),
      checkedCount: checkedRequired.length,
      requiredCount: required.length,
      complete: checkedRequired.length === required.length,
    };
    onProgressChange?.(progress);
  }

  return (
    <section className={styles.root} lang={locale} dir={direction}>
      {createElement(`h${headingLevel}`, { className: styles.title }, title ?? messages.title)}
      <div className={renderAsGroup ? styles.group : styles.list}>
        {items.map(({ id: itemId, question, answer, answerSlot, iconSlot, enableCheck }, index) => {
          const needsCheck = enableCheck ?? enableChecks;
          const isChecked = checked.has(itemId);
          const side = (position: 'left' | 'right') => (
            <>
              {showIndices && indexPosition === position && (
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}
              {showIcon && iconPosition === position && (
                <span className={styles.icon} aria-hidden="true">
                  {iconSlot ?? slots?.icon ?? <LightbulbOutlineRounded fontSize="small" />}
                </span>
              )}
              {showChevron && chevronPosition === position && (
                <span
                  className={[styles.chevron, expanded === itemId ? styles.chevronOpen : ''].join(' ')}
                  aria-hidden="true"
                >
                  {slots?.chevron ?? <ExpandMoreRounded fontSize="small" />}
                </span>
              )}
            </>
          );
          return (
            <Accordion
              key={itemId}
              className={styles.item}
              disableGutters
              expanded={expanded === itemId}
              onChange={(_, open) => setExpanded(open ? itemId : null)}
              slots={{ heading: accordionHeading }}
            >
              <AccordionSummary
                className={styles.summary}
                id={`${id}-question-${itemId}`}
                aria-controls={`${id}-answer-${itemId}`}
                aria-describedby={needsCheck ? `${id}-status-${itemId}` : undefined}
              >
                <span className={styles.summaryRow}>
                  <span className={styles.adornment}>{side('left')}</span>
                  <span className={styles.question} dir={direction}>
                    {question}
                  </span>
                  <span className={styles.adornment}>
                    {side('right')}
                    {needsCheck && (
                      <span className={isChecked ? styles.checked : styles.unchecked} aria-hidden="true">
                        {isChecked ? (
                          <CheckCircleRounded fontSize="small" />
                        ) : (
                          <RadioButtonUncheckedRounded fontSize="small" />
                        )}
                      </span>
                    )}
                  </span>
                </span>
                {needsCheck && (
                  <span className={styles.visuallyHidden} id={`${id}-status-${itemId}`}>
                    {isChecked ? messages.checked : messages.check}
                  </span>
                )}
              </AccordionSummary>
              <AccordionDetails className={styles.details}>
                <div className={styles.answer} dir={direction}>
                  {answerSlot ?? slots?.renderAnswer?.(answer) ?? defaultAnswer(answer)}
                </div>
                {needsCheck && (
                  <div className={styles.actions}>
                    <Button
                      className={styles.checkButton}
                      variant="contained"
                      color="success"
                      size="small"
                      disabled={isChecked}
                      onClick={() => markChecked(itemId)}
                      aria-pressed={isChecked}
                      dir={direction}
                    >
                      {isChecked ? messages.checked : (slots?.checkLabel ?? messages.check)}
                    </Button>
                  </div>
                )}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </section>
  );
}
