'use client';

import type { Checkpoint_Locale } from '../../../../../../data/locale/checkpoint';

import { createElement, useEffect, useId, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import LightbulbOutlineRounded from '@mui/icons-material/LightbulbOutlineRounded';
import RadioButtonUncheckedRounded from '@mui/icons-material/RadioButtonUncheckedRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import type { ContentBlock_Checkpoint_Props } from '@svitlo/engine/runtime';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/runtime';
import { getLocaleDirection } from '@svitlo/engine/runtime';

import type { RenderNested } from '../../types';
import { useContentLanguage } from '../../ContentLanguageContext';
import { useOptionalLessonActions } from '../../../../lesson/LessonOperationsContext';
import styles from './Checkpoint.module.css';

type CheckpointProps = ContentBlock_Checkpoint_Props & {
  messages: Checkpoint_Locale;
  renderNested: RenderNested;
  onComplete?: () => void;
  completed?: boolean;
};

export const Checkpoint = ({
  id,
  locale: { title },
  content: items,
  params: {
    headingLevel = 2,
    showIndices = true,
    showChevron = true,
    showIcon = false,
    indexPosition = 'left',
    iconPosition = 'left',
    chevronPosition = 'right',
    enableChecks = false,
    requireCompletion = false,
    renderAsGroup = true,
  },
  renderNested,
  messages,
  onComplete,
  completed = false,
}: CheckpointProps) => {
  const languageCode = useContentLanguage();
  const domId = useId();
  const actions = useOptionalLessonActions();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(() => new Set());
  const hasPendingChecks =
    requireCompletion &&
    !completed &&
    items.some((item, index) => (item.check ?? enableChecks) && !checkedIds.has(`${id}:${index}`));

  useEffect(() => {
    if (!hasPendingChecks) return;
    return actions?.blockNext(domId);
  }, [actions, domId, hasPendingChecks]);
  const language = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === languageCode)?.locale ?? 'en-US';
  const direction = getLocaleDirection(language);
  const accordionHeading = `h${Math.min(headingLevel + 1, 6)}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  return (
    <section className={styles.root} lang={language} dir={direction}>
      {createElement(`h${headingLevel}`, { className: styles.title }, title)}
      <div className={renderAsGroup ? styles.group : styles.list}>
        {items.map((item, index) => {
          const itemId = `${id}:${index}`;
          const needsCheck = item.check ?? enableChecks;
          const isChecked = completed || checkedIds.has(itemId);
          const side = (position: 'left' | 'right') => (
            <>
              {showIndices && indexPosition === position && (
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}
              {showIcon && iconPosition === position && (
                <span className={styles.icon} aria-hidden="true">
                  <LightbulbOutlineRounded fontSize="small" />
                </span>
              )}
              {showChevron && chevronPosition === position && (
                <span
                  className={[styles.chevron, expanded === index ? styles.chevronOpen : ''].join(' ')}
                  aria-hidden="true"
                >
                  <ExpandMoreRounded fontSize="small" />
                </span>
              )}
            </>
          );

          return (
            <Accordion
              key={itemId}
              className={styles.item}
              disableGutters
              expanded={expanded === index}
              onChange={(_, open) => setExpanded(open ? index : null)}
              slots={{ heading: accordionHeading }}
            >
              <AccordionSummary
                className={styles.summary}
                id={`${domId}-question-${index}`}
                aria-controls={`${domId}-answer-${index}`}
                aria-describedby={needsCheck ? `${domId}-status-${index}` : undefined}
              >
                <span className={styles.summaryRow}>
                  <span className={styles.adornment}>{side('left')}</span>
                  <span className={styles.question} dir={direction}>
                    {renderNested({
                      ...item.question,
                      params: {
                        ...item.question.params,
                        wrap: {
                          enabled: true,
                          typographyProps: {
                            ...item.question.params.wrap?.typographyProps,
                            component: 'span',
                          },
                        },
                      },
                    })}
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
                  <span className={styles.visuallyHidden} id={`${domId}-status-${index}`}>
                    {isChecked ? messages.checked : messages.check}
                  </span>
                )}
              </AccordionSummary>
              <AccordionDetails className={styles.details} id={`${domId}-answer-${index}`}>
                <div className={styles.answer} dir={direction}>
                  {item.answer.map((block, blockIndex) => (
                    <div key={`${block.id}:${blockIndex}`}>{renderNested(block)}</div>
                  ))}
                </div>
                {needsCheck && (
                  <div className={styles.actions}>
                    <Button
                      className={styles.checkButton}
                      variant="contained"
                      color="success"
                      size="small"
                      disabled={isChecked}
                      onClick={() => {
                        if (completed || checkedIds.has(itemId)) return;
                        const next = new Set(checkedIds).add(itemId);
                        setCheckedIds(next);
                        if (
                          requireCompletion &&
                          items.every(
                            (entry, position) => !(entry.check ?? enableChecks) || next.has(id + ':' + position),
                          )
                        )
                          onComplete?.();
                      }}
                      aria-pressed={isChecked}
                      dir={direction}
                    >
                      {isChecked ? messages.checked : messages.check}
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
};
