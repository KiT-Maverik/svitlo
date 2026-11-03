'use client';

import { useEffect, useId, useLayoutEffect, useState, useSyncExternalStore } from 'react';
import { alpha, Box, Button, IconButton, Tooltip, Paper, Stack, Typography } from '@mui/material';
import RestartAlt from '@mui/icons-material/RestartAlt';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Close from '@mui/icons-material/Close';
import type { SxProps, Theme } from '@mui/material';
import type { QuestionType } from '../../types';
import type { QuestionAttemptProps, QuestionSlotContext, SlotProps } from '../../slots';
import { createQuestionController } from '../../controller';
import { questionRegistry } from '../../registry';
import { QuestionActions } from '../QuestionActions/QuestionActions';
import { QuestionResult } from './QuestionResult';
import { uk } from '../../messages';

function resolve<P, K extends QuestionType>(
  props: SlotProps<P, K> | undefined,
  context: QuestionSlotContext<K>,
): P | undefined {
  return typeof props === 'function' ? (props as (context: QuestionSlotContext<K>) => P)(context) : props;
}
function sx(defaults: SxProps<Theme>, extra?: SxProps<Theme>): SxProps<Theme> {
  return [
    ...(Array.isArray(defaults) ? defaults : [defaults]),
    ...(Array.isArray(extra) ? extra : extra ? [extra] : []),
  ];
}
function Attempt<K extends QuestionType>(props: QuestionAttemptProps<K>) {
  const {
    question,
    disabled,
    readOnly,
    slots,
    slotProps,
    showResult = true,
    showExplanation = true,
    showErrors = true,
    showCorrectAnswers = true,
    showLetters = false,
  } = props;
  const entry = questionRegistry[question.type];
  const [controller] = useState(() => createQuestionController(question, entry.initial(question), entry.check, props));
  const [explanationVisible, setExplanationVisible] = useState(false);
  useLayoutEffect(() => controller.configure(props), [controller, props]);
  useEffect(() => {
    if (!explanationVisible) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExplanationVisible(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [explanationVisible]);
  const state = useSyncExternalStore(controller.subscribe, controller.getSnapshot, controller.getSnapshot);
  const heading = useId();
  const resultId = `${heading}-result`,
    checkId = `${heading}-check`,
    answersId = `${heading}-answers`;
  const isLocked = Boolean(state.result || disabled || readOnly);
  const focusResult = () => {
    if (showResult) requestAnimationFrame(() => document.getElementById(resultId)?.focus());
  };
  const focusEditor = () =>
    requestAnimationFrame(() => {
      const target =
        props.checkMode === 'on-change'
          ? document
              .getElementById(answersId)
              ?.querySelector<HTMLElement>('button:not(:disabled), input:not(:disabled)')
          : document.getElementById(checkId);
      target?.focus();
    });
  const context: QuestionSlotContext<K> = {
    ...state,
    answer: structuredClone(state.answer),
    result: structuredClone(state.result),
    question,
    props,
    isLocked,
    canCheck: !isLocked && controller.isReadyToCheck(),
    setAnswer: answer => {
      controller.setAnswer(answer);
      if (controller.getSnapshot().result) focusResult();
    },
    check: () => {
      if (!isLocked && controller.isReadyToCheck()) {
        controller.check();
        focusResult();
      }
    },
    retry: () => {
      controller.retry();
      focusEditor();
    },
    reset: () => {
      controller.reset();
      focusEditor();
    },
    children: null,
    rootProps: {},
  };
  const Interaction = entry.Interaction;
  const questionProps = resolve(slotProps?.question, context);
  const answerProps = resolve(slotProps?.answers, context);
  const actionProps = resolve(slotProps?.actions, context);
  const rootProps = resolve(slotProps?.root, context);
  const questionContent = (
    <Typography component="h2" variant="h6" id={heading} sx={{ textAlign: 'center' }}>
      {question.prompt}
    </Typography>
  );
  const answerContent = (
    <Interaction
      question={question}
      value={state.answer}
      onChange={context.setAnswer}
      result={showResult ? state.result : null}
      showErrors={showErrors}
      showCorrectAnswers={showCorrectAnswers}
      showLetters={showLetters}
      disabled={disabled}
      readOnly={readOnly || state.result !== null}
    />
  );
  const resetContent = (
    <Tooltip title={uk.reset} placement="top" arrow enterDelay={500} enterNextDelay={500}>
      <span>
        <IconButton
          aria-label={uk.reset}
          disabled={disabled || readOnly}
          onClick={() => {
            setExplanationVisible(false);
            context.reset();
          }}
        >
          <RestartAlt />
        </IconButton>
      </span>
    </Tooltip>
  );
  const explanationEnabled = !disabled && !readOnly && state.result !== null;
  const explanationIconColor = !explanationEnabled
    ? 'action.disabled'
    : explanationVisible
      ? (theme: Theme) => alpha(theme.palette.error.main, 0.72)
      : 'info.light';
  const explanationContent =
    showResult && showExplanation ? (
      <Tooltip
        title={explanationVisible ? uk.hideExplanation : uk.showExplanation}
        placement="top"
        arrow
        enterDelay={500}
        enterNextDelay={500}
      >
        <span>
          <IconButton
            aria-label={explanationVisible ? uk.hideExplanation : uk.showExplanation}
            disabled={!explanationEnabled}
            onClick={() => setExplanationVisible(value => !value)}
          >
            <Box
              component="span"
              aria-hidden="true"
              sx={{
                position: 'relative',
                display: 'inline-flex',
                width: 24,
                height: 24,
                color: explanationIconColor,
                '& > svg': {
                  position: 'absolute',
                  inset: 0,
                  transition: 'opacity 180ms ease-in-out, transform 180ms ease-in-out',
                },
                '@media (prefers-reduced-motion: reduce)': { '& > svg': { transition: 'none' } },
              }}
            >
              <InfoOutlined
                sx={{
                  opacity: explanationVisible ? 0 : 1,
                  transform: explanationVisible ? 'rotate(-90deg) scale(.7)' : 'rotate(0deg) scale(1)',
                }}
              />
              <Close
                sx={{
                  opacity: explanationVisible ? 1 : 0,
                  transform: explanationVisible ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(.7)',
                }}
              />
            </Box>
          </IconButton>
        </span>
      </Tooltip>
    ) : null;
  const checkContent = state.hasChecked ? (
    <Button
      variant="contained"
      disabled={disabled || readOnly}
      onClick={() => {
        setExplanationVisible(false);
        controller.retry(true);
        focusEditor();
      }}
    >
      {uk.retry}
    </Button>
  ) : (
    <Button
      id={checkId}
      variant="contained"
      disabled={!context.canCheck}
      onClick={context.check}
      sx={{ display: props.checkMode === 'on-change' ? 'none' : undefined }}
    >
      {uk.check}
    </Button>
  );
  const defaultLeft = (
    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
      {resetContent}
      {explanationContent}
    </Box>
  );
  const actionContent = (
    <QuestionActions
      left={props.actionSlots?.left ? props.actionSlots.left({ ...context, children: defaultLeft }) : defaultLeft}
      center={
        props.actionSlots?.center ? props.actionSlots.center({ ...context, children: checkContent }) : checkContent
      }
      right={props.actionSlots?.right?.({ ...context, children: null })}
    />
  );
  const contents = (
    <Box id={resultId} tabIndex={-1} sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: 2 }}>
      <Box {...questionProps} sx={sx({ width: '100%', flex: '0 0 auto' }, questionProps?.sx)}>
        {slots?.question ? slots.question({ ...context, children: questionContent }) : questionContent}
      </Box>
      <Box
        {...answerProps}
        id={answersId}
        role="group"
        aria-label={question.prompt}
        sx={sx(
          {
            position: 'relative',
            display: 'flex',
            flex: 1,
            minHeight: 0,
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          },
          answerProps?.sx,
        )}
      >
        {slots?.answers ? slots.answers({ ...context, children: answerContent }) : answerContent}
        <QuestionResult
          explanation={props.explanationContent ?? question.explanation}
          visible={explanationVisible && showResult && showExplanation}
          onClose={() => setExplanationVisible(false)}
        />
      </Box>
      <Stack
        direction="row"
        useFlexGap
        {...actionProps}
        sx={sx({ flex: '0 0 auto', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }, actionProps?.sx)}
      >
        {slots?.actions ? slots.actions({ ...context, children: actionContent }) : actionContent}
      </Stack>
    </Box>
  );
  const mergedRootProps = {
    variant: 'outlined' as const,
    ...rootProps,
    role: 'region',
    'aria-label': question.prompt,
    sx: sx(
      {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 2, sm: 3 },
        minWidth: 0,
        minHeight: 280,
        '& button.Mui-focusVisible, & button:focus-visible, & a:focus-visible': {
          outline: '3px solid',
          outlineColor: 'primary.main',
          outlineOffset: 3,
        },
      },
      rootProps?.sx,
    ),
  };
  return slots?.root ? (
    slots.root({ ...context, rootProps: mergedRootProps, children: contents })
  ) : (
    <Paper {...mergedRootProps} component="section">
      {contents}
    </Paper>
  );
}
/** A question ID identifies an immutable authored definition. Changing it starts fresh. */
export function QuestionAttempt<K extends QuestionType>(props: QuestionAttemptProps<K>) {
  return <Attempt<K> key={`${props.question.type}:${props.question.id}`} {...props} />;
}
export type { QuestionAttemptProps, QuestionSlotContext } from '../../slots';
