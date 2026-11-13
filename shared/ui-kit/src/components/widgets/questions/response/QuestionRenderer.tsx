'use client';

import type { UiKitMessages } from '#types/uiKitMessages';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import type { QuizSection_Props } from '@svitlo/engine/runtime';
import type { QuestionResponse } from '#types/questions';
import type { LanguageCode } from '@svitlo/engine/runtime';
import { ContentLanguageContext, useContentLanguage } from '../../ContentBlockRenderer/ContentLanguageContext';
import { QuestionCompletionContext } from './QuestionCompletion';
import { QuestionProgress } from '../../../lesson/QuestionProgress';
import type { SceneRegistry } from '../../ContentBlockRenderer';
import { AnswerWithNumber } from '../AnswerWithNumber/AnswerWithNumber';
import { AnswerWithText } from '../AnswerWithText/AnswerWithText';
import { BuildAnswerWithBlocks } from '../BuildAnswerWithBlocks/BuildAnswerWithBlocks';
import { FillBlanksWithBlocks } from '../FillBlanksWithBlocks/FillBlanksWithBlocks';
import { FillBlanksWithText } from '../FillBlanksWithText/FillBlanksWithText';
import { MatchBlocks } from '../MatchBlocks/MatchBlocks';
import { OrderSequence } from '../OrderSequence/OrderSequence';
import { SelectMultipleAnswers } from '../SelectMultipleAnswers/SelectMultipleAnswers';
import { SelectOneAnswer } from '../SelectOneAnswer/SelectOneAnswer';

export type { QuestionResponse } from '#types/questions';
export type QuizCompletion = { passed: boolean; correct: number; total: number; timedOut: boolean };
export type QuestionRendererProps = {
  messages: UiKitMessages;
  questions?: readonly QuestionResponse[];
  parameters?: QuizSection_Props['params'];
  sceneRegistry?: SceneRegistry;
  language?: LanguageCode;
  onComplete?: (result: QuizCompletion) => void;
};

function QuestionBlock({
  response,
  sceneRegistry,
  messages,
}: {
  response: QuestionResponse;
  sceneRegistry?: SceneRegistry;
  messages: UiKitMessages;
}) {
  switch (response.type) {
    case 'selectOneAnswer':
      return <SelectOneAnswer response={response} sceneRegistry={sceneRegistry} messages={messages} />;
    case 'selectMultipleAnswers':
      return <SelectMultipleAnswers response={response} sceneRegistry={sceneRegistry} messages={messages} />;
    case 'matchBlocks':
      return <MatchBlocks response={response} sceneRegistry={sceneRegistry} messages={messages} />;
    case 'answerWithText':
      return <AnswerWithText response={response} sceneRegistry={sceneRegistry} messages={messages} />;
    case 'answerWithNumber':
      return <AnswerWithNumber response={response} sceneRegistry={sceneRegistry} messages={messages} />;
    case 'orderSequence':
      return <OrderSequence response={response} sceneRegistry={sceneRegistry} messages={messages} />;
    case 'buildAnswerWithBlocks':
      return <BuildAnswerWithBlocks response={response} sceneRegistry={sceneRegistry} messages={messages} />;
    case 'fillBlanksWithBlocks':
      return <FillBlanksWithBlocks response={response} sceneRegistry={sceneRegistry} messages={messages} />;
    case 'fillBlanksWithText':
      return <FillBlanksWithText response={response} sceneRegistry={sceneRegistry} messages={messages} />;
    default: {
      const unreachable: never = response;
      throw new Error('Unsupported question type: ' + String(unreachable));
    }
  }
}

/** One Quiz renderer for Lesson sections and standalone practice. */
export function QuestionRenderer({
  questions = [],
  parameters,
  sceneRegistry,
  language,
  onComplete,
  messages,
}: QuestionRendererProps) {
  const inheritedLanguage = useContentLanguage();
  const [statuses, setStatuses] = useState<ReadonlyMap<string, boolean>>(() => new Map());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remaining, setRemaining] = useState(parameters?.timeLimitSeconds);
  const completed = useRef<string | null>(null);
  const signature = questions.map(question => question.type + ':' + question.id).join('|');
  const allChecked =
    questions.length > 0 && questions.every(question => statuses.has(question.type + ':' + question.id));
  const correct = questions.filter(question => statuses.get(question.type + ':' + question.id) === true).length;
  const score = parameters?.grading?.mode === 'percentage' ? (correct * 100) / (questions.length || 1) : correct;
  const passed = parameters?.grading ? score >= parameters.grading.successThreshold : correct === questions.length;
  const timedOut = remaining !== undefined && remaining <= 0;

  useEffect(() => {
    if (parameters?.timeLimitSeconds === undefined) return;
    const handle = setInterval(() => {
      if (completed.current !== signature)
        setRemaining(value => (value === undefined ? undefined : Math.max(0, value - 1)));
    }, 1000);
    return () => clearInterval(handle);
  }, [parameters?.timeLimitSeconds, signature]);

  useEffect(() => {
    if (!allChecked && !timedOut && completed.current === signature) completed.current = null;
    if (questions.length && (allChecked || timedOut) && completed.current !== signature) {
      completed.current = signature;
      onComplete?.({ passed: !timedOut && passed, correct, total: questions.length, timedOut });
    }
  }, [allChecked, correct, onComplete, passed, questions.length, signature, timedOut]);

  const context = useMemo(
    () => ({
      parameters,
      revealFeedback: allChecked || timedOut,
      locked: timedOut,
      markChecked(id: string, isCorrect: boolean) {
        setStatuses(previous => {
          if (previous.get(id) === isCorrect) return previous;
          const next = new Map(previous);
          next.set(id, isCorrect);
          return next;
        });
      },
      markUnchecked(id: string) {
        setStatuses(previous => {
          if (!previous.has(id)) return previous;
          const next = new Map(previous);
          next.delete(id);
          return next;
        });
      },
    }),
    [parameters, allChecked, timedOut],
  );

  if (!questions.length) return null;
  const stepper = parameters?.layout.mode === 'stepper';
  const showProgress = stepper && (parameters?.layout.showProgress ?? true);
  const active = Math.min(currentIndex, questions.length - 1);
  const progressStatuses = questions.map(question => {
    const status = statuses.get(question.type + ':' + question.id);
    return status === undefined ? ('unanswered' as const) : status ? ('correct' as const) : ('incorrect' as const);
  });
  return (
    <ContentLanguageContext.Provider value={language ?? inheritedLanguage}>
      <QuestionCompletionContext.Provider value={context}>
        <Stack spacing={2}>
          {remaining !== undefined && (
            <Box role="timer" aria-live="off" sx={{ textAlign: 'end', fontVariantNumeric: 'tabular-nums' }}>
              {String(Math.floor(remaining / 60)).padStart(2, '0')}:{String(remaining % 60).padStart(2, '0')}
            </Box>
          )}
          {showProgress && (
            <QuestionProgress
              statuses={progressStatuses}
              currentIndex={active}
              messages={messages.lesson}
              allowNavigation={parameters?.interaction.allowQuestionNavigation}
              onNavigate={setCurrentIndex}
            />
          )}
          {questions.map((response, index) => (
            <Box
              key={response.type + ':' + response.id}
              sx={{ display: !stepper || index === active ? 'block' : 'none' }}
            >
              <QuestionBlock response={response} sceneRegistry={sceneRegistry} messages={messages} />
            </Box>
          ))}
          {stepper && (
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
              <Button disabled={active === 0} onClick={() => setCurrentIndex(active - 1)}>
                {messages.learningLayout.actions.previous}
              </Button>
              <Button
                disabled={
                  active >= questions.length - 1 ||
                  (progressStatuses[active] === 'unanswered' && !parameters?.interaction.allowDeferring)
                }
                onClick={() => setCurrentIndex(active + 1)}
              >
                {messages.learningLayout.actions.next}
              </Button>
            </Stack>
          )}
          {timedOut && <Typography role="status">{messages.questionFrame.incorrect}</Typography>}
        </Stack>
      </QuestionCompletionContext.Provider>
    </ContentLanguageContext.Provider>
  );
}
