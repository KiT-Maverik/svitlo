'use client';

import { Box, Button, Checkbox, FormControlLabel, MenuItem, Radio, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';

import {
  answerWithNumber_Data_Schema,
  answerWithText_Data_Schema,
  buildAnswerWithBlocks_Data_Schema,
  fillBlanksWithBlocks_Data_Schema,
  fillBlanksWithText_Data_Schema,
  matchBlocks_Data_Schema,
  orderSequence_Data_Schema,
  selectMultipleAnswers_Data_Schema,
  selectOneAnswer_Data_Schema,
  selectQuizQuestionIds,
  type AssessmentResourceLoader,
  type ContentBlock_Data,
  type LanguageCode,
  type Question_AnswerWithNumber_Data,
  type Question_AnswerWithText_Data,
  type Question_BuildAnswerWithBlocks_Data,
  type Question_FillBlanksWithBlocks_Data,
  type Question_FillBlanksWithText_Data,
  type Question_MatchBlocks_Data,
  type Question_OrderSequence_Data,
  type Question_SelectMultipleAnswers_Data,
  type Question_SelectOneAnswer_Data,
} from '@svitlo/engine/runtime';

import type { SectionViewProps } from '../../presentation';
type QuizSectionViewProps = Extract<SectionViewProps, { type: 'quiz' }>;

import type { UiKitMessages } from '#types/uiKitMessages';

import type { SceneRegistry } from '../widgets/ContentBlockRenderer';
import { EngineContentBlockRenderer } from './EngineContentBlockRenderer';
import { QuestionProgress } from './QuestionProgress';

type Question =
  | Question_SelectOneAnswer_Data
  | Question_SelectMultipleAnswers_Data
  | Question_MatchBlocks_Data
  | Question_AnswerWithText_Data
  | Question_AnswerWithNumber_Data
  | Question_OrderSequence_Data
  | Question_BuildAnswerWithBlocks_Data
  | Question_FillBlanksWithBlocks_Data
  | Question_FillBlanksWithText_Data;

const questionSchemas: Record<Question['type'], { parse(input: unknown): unknown }> = {
  selectOneAnswer: selectOneAnswer_Data_Schema,
  selectMultipleAnswers: selectMultipleAnswers_Data_Schema,
  matchBlocks: matchBlocks_Data_Schema,
  answerWithText: answerWithText_Data_Schema,
  answerWithNumber: answerWithNumber_Data_Schema,
  orderSequence: orderSequence_Data_Schema,
  buildAnswerWithBlocks: buildAnswerWithBlocks_Data_Schema,
  fillBlanksWithBlocks: fillBlanksWithBlocks_Data_Schema,
  fillBlanksWithText: fillBlanksWithText_Data_Schema,
};

function parseQuestion(raw: unknown, kind: string): Question {
  if (!raw || typeof raw !== 'object' || !('type' in raw) || raw.type !== kind || !(kind in questionSchemas))
    throw new Error('Invalid Question Bank kind: ' + kind);
  return questionSchemas[kind as Question['type']].parse(raw) as Question;
}

function stableHash(value: string): number {
  let result = 2166136261;
  for (const char of value) result = Math.imul(result ^ char.charCodeAt(0), 16777619);
  return result >>> 0;
}

function shuffle<T extends { id: string }>(items: T[], seed: string): T[] {
  return [...items].sort((a, b) => stableHash(seed + a.id) - stableHash(seed + b.id));
}

/** Resolve exactly the previously selected UUIDs; reject missing, extra or duplicated resources. */
export function selectQuizQuestions(raw: readonly Question[], ids: readonly string[]): Question[] {
  const byId = new Map<string, Question>();
  for (const entry of raw) {
    const question = parseQuestion(entry, entry.type);
    if (byId.has(question.id)) throw new Error('Duplicate loaded Question UUID: ' + question.id);
    byId.set(question.id, question);
  }
  if (byId.size !== ids.length) throw new Error('Loaded Quiz resources do not match selected UUIDs');
  return ids.map(id => {
    const question = byId.get(id);
    if (!question) throw new Error('Missing selected Quiz Question UUID: ' + id);
    return question;
  });
}

function plain(value: string): string {
  return value.trim().replace(/\s+/gu, ' ').toLocaleLowerCase();
}
const contentLabel = (block: ContentBlock_Data): string =>
  block.type === 'text' ? block.locale.value : block.type === 'markdown' ? block.locale.value : block.slug;

function QuestionCard({
  question,
  messages,
  sceneRegistry,
  parameters,
  onChecked,
  disabled,
}: {
  question: Question;
  messages: UiKitMessages;
  sceneRegistry?: SceneRegistry;
  parameters: QuizSectionViewProps['params'];
  onChecked: (correct: boolean | undefined) => void;
  disabled: boolean;
}) {
  const [answer, setAnswer] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [order, setOrder] = useState<string[]>([]);
  const [chosen, setChosen] = useState<string[]>([]);

  const choices = useMemo(() => {
    if (question.type !== 'selectOneAnswer' && question.type !== 'selectMultipleAnswers') return [];
    const answers = question.content.answers;
    const entries = (Object.keys(answers) as (keyof typeof answers)[]).flatMap(type =>
      Object.entries(answers[type]).map(([key, block]) => ({
        key: type + ':' + key,
        correct: type === 'correct',
        block,
      })),
    );
    return parameters.questionOptions?.selectOneAnswer?.shuffleAnswers
      ? shuffle(
          entries.map(item => ({ ...item, id: item.key })),
          question.id,
        )
      : entries;
  }, [question, parameters.questionOptions?.selectOneAnswer?.shuffleAnswers]);

  const correct = (() => {
    switch (question.type) {
      case 'selectOneAnswer':
        return choices.find(option => option.key === answer.choice)?.correct === true;
      case 'selectMultipleAnswers':
        return choices.every(option => (answer[option.key] === '1') === option.correct);
      case 'matchBlocks':
        return Object.keys(question.content.pairs).every(key => answer[key] === key);
      case 'answerWithText':
        return question.locale.correctAnswers.some(expected => plain(expected) === plain(answer.value ?? ''));
      case 'answerWithNumber': {
        const input = (answer.value ?? '').trim();
        if (!/^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)(?:e[+-]?\d+)?$/iu.test(input)) return false;
        return question.params.correctAnswers.includes(Number(input.replace(',', '.')));
      }
      case 'orderSequence':
        return (
          order.length === question.content.sequence.length &&
          order.every((id, index) => id === question.content.sequence[index].id)
        );
      case 'buildAnswerWithBlocks':
        return (
          chosen.length === question.content.correctSequence.length &&
          chosen.every((id, index) => id === question.content.correctSequence[index].id)
        );
      case 'fillBlanksWithBlocks':
        return question.content.slots.every(slot => answer[slot.selector] === slot.correctAnswer.id);
      case 'fillBlanksWithText':
        return question.locale.slots.every(slot =>
          slot.correctAnswers.some(expected => plain(expected) === plain(answer[slot.selector] ?? '')),
        );
    }
  })();

  const respond = (key: string, value: string) => setAnswer(previous => ({ ...previous, [key]: value }));
  const renderer = (blocks: readonly ContentBlock_Data[]) => (
    <EngineContentBlockRenderer blocks={blocks} messages={messages} sceneRegistry={sceneRegistry} />
  );
  const canRetry = attempts <= parameters.interaction.retries && !correct;
  const showFeedback = parameters.feedbackMode === 'immediate';

  return (
    <Box component="section" sx={{ border: 1, borderColor: 'divider', borderRadius: 2, p: 2 }}>
      <Box component="h2" sx={{ typography: 'h6' }}>
        {renderer(question.content.question)}
      </Box>
      {question.content.hint?.length ? (
        <Box component="details">
          <Box component="summary">{messages.questionFrame.hint}</Box>
          {renderer(question.content.hint)}
        </Box>
      ) : null}
      <Stack spacing={1}>
        {(question.type === 'selectOneAnswer' || question.type === 'selectMultipleAnswers') &&
          choices.map(option => (
            <FormControlLabel
              key={option.key}
              disabled={disabled || checked}
              label={renderer([option.block])}
              control={
                question.type === 'selectOneAnswer' ? (
                  <Radio checked={answer.choice === option.key} onChange={() => respond('choice', option.key)} />
                ) : (
                  <Checkbox
                    checked={answer[option.key] === '1'}
                    onChange={(_, value) => respond(option.key, value ? '1' : '')}
                  />
                )
              }
            />
          ))}
        {question.type === 'matchBlocks' &&
          Object.entries(question.content.pairs).map(([key, pair]) => (
            <Stack key={key} direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Box sx={{ flex: 1 }}>{renderer([pair.left])}</Box>
              <TextField
                select
                label={messages.questionFrame.answerLabel}
                value={answer[key] ?? ''}
                onChange={event => respond(key, event.target.value)}
                disabled={disabled || checked}
                sx={{ flex: 1 }}
              >
                {Object.entries(question.content.pairs).map(([candidate, value]) => (
                  <MenuItem key={candidate} value={candidate}>
                    {contentLabel(value.right)}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          ))}
        {(question.type === 'answerWithText' || question.type === 'answerWithNumber') && (
          <TextField
            fullWidth
            label={messages.questionFrame.answerLabel}
            placeholder={question.locale.placeholder}
            value={answer.value ?? ''}
            onChange={event => respond('value', event.target.value)}
            disabled={disabled || checked}
          />
        )}
        {question.type === 'fillBlanksWithText' &&
          question.locale.slots.map(slot => (
            <TextField
              key={slot.selector}
              label={slot.selector}
              placeholder={question.locale.placeholder}
              value={answer[slot.selector] ?? ''}
              onChange={event => respond(slot.selector, event.target.value)}
              disabled={disabled || checked}
            />
          ))}
        {question.type === 'fillBlanksWithBlocks' &&
          question.content.slots.map(slot => {
            const candidates = [slot.correctAnswer, ...question.content.distractors];
            return (
              <TextField
                key={slot.selector}
                select
                label={slot.selector}
                value={answer[slot.selector] ?? ''}
                onChange={event => respond(slot.selector, event.target.value)}
                disabled={disabled || checked}
              >
                {candidates.map(block => (
                  <MenuItem key={block.id} value={block.id}>
                    {contentLabel(block)}
                  </MenuItem>
                ))}
              </TextField>
            );
          })}
        {question.type === 'orderSequence' &&
          (() => {
            const blocks = question.content.sequence;
            const ids = order.length ? order : [...blocks].reverse().map(item => item.id);
            return ids.map((id, index) => {
              const block = blocks.find(item => item.id === id);
              if (!block) throw new Error('Quiz sequence references missing ContentBlock: ' + id);
              return (
                <Stack key={id} direction="row" sx={{ alignItems: 'center' }}>
                  <Box sx={{ flex: 1 }}>{renderer([block])}</Box>
                  <Button
                    disabled={disabled || checked || index === 0}
                    onClick={() => {
                      const next = [...ids];
                      [next[index], next[index - 1]] = [next[index - 1], next[index]];
                      setOrder(next);
                    }}
                  >
                    ↑
                  </Button>
                  <Button
                    disabled={disabled || checked || index === ids.length - 1}
                    onClick={() => {
                      const next = [...ids];
                      [next[index], next[index + 1]] = [next[index + 1], next[index]];
                      setOrder(next);
                    }}
                  >
                    ↓
                  </Button>
                </Stack>
              );
            });
          })()}
        {question.type === 'buildAnswerWithBlocks' && (
          <>
            <Typography>{question.locale.placeholder}</Typography>
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
              {[...question.content.correctSequence, ...question.content.distractors].map(block => (
                <Button
                  key={block.id}
                  variant={chosen.includes(block.id) ? 'contained' : 'outlined'}
                  disabled={disabled || checked}
                  onClick={() =>
                    setChosen(previous =>
                      previous.includes(block.id) ? previous.filter(id => id !== block.id) : [...previous, block.id],
                    )
                  }
                >
                  {contentLabel(block)}
                </Button>
              ))}
            </Stack>
          </>
        )}
      </Stack>
      {checked && showFeedback && (
        <Typography role="status" color={correct ? 'success.main' : 'error.main'}>
          {correct ? messages.questionFrame.correct : messages.questionFrame.incorrect}
        </Typography>
      )}
      {checked && parameters.interaction.allowExplanations && question.content.explanation?.length ? (
        <Box component="details">
          <Box component="summary">{messages.questionFrame.explanation}</Box>
          {renderer(question.content.explanation)}
        </Box>
      ) : null}
      <Stack direction="row" sx={{ justifyContent: 'center', mt: 2 }}>
        {checked && canRetry && !disabled ? (
          <Button
            onClick={() => {
              setChecked(false);
              setAnswer({});
              setOrder([]);
              setChosen([]);
              onChecked(undefined);
            }}
          >
            {messages.questionFrame.retry}
          </Button>
        ) : (
          <Button
            disabled={checked || disabled}
            onClick={() => {
              setChecked(true);
              setAttempts(previous => previous + 1);
              onChecked(correct);
            }}
          >
            {messages.questionFrame.check}
          </Button>
        )}
      </Stack>
    </Box>
  );
}

export function EngineQuestionRenderer({
  lessonId,
  language,
  assessmentLoader,
  section,
  messages,
  sceneRegistry,
  onComplete,
}: {
  lessonId: string;
  language: LanguageCode;
  assessmentLoader?: AssessmentResourceLoader;
  section: QuizSectionViewProps;
  messages: UiKitMessages;
  sceneRegistry?: SceneRegistry;
  onComplete?: (result: { passed: boolean; correct: number; total: number; timedOut: boolean }) => void;
}) {
  const ids = useMemo(() => selectQuizQuestionIds(section.params.selection, section.id), [section]);
  const identity = lessonId + ':' + language + ':' + section.id + ':' + ids.join(',');
  const [attempt, setAttempt] = useState(0);
  const [load, setLoad] = useState<{
    identity: string;
    status: 'loading' | 'ready' | 'error';
    questions: Question[];
    fallbackIds: string[];
  }>({ identity, status: 'loading', questions: [], fallbackIds: [] });

  useEffect(() => {
    const controller = new AbortController();
    setLoad({ identity, status: 'loading', questions: [], fallbackIds: [] });
    if (!assessmentLoader) {
      setLoad({ identity, status: 'error', questions: [], fallbackIds: [] });
    } else {
      assessmentLoader
        .loadQuestions({ language, ids, signal: controller.signal })
        .then(result => ({
          questions: selectQuizQuestions(result.items, ids),
          fallbackIds: result.fallbacks.map(item => item.id),
        }))
        .then(
          ({ questions, fallbackIds }) => {
            if (!controller.signal.aborted) setLoad({ identity, status: 'ready', questions, fallbackIds });
          },
          () => {
            if (!controller.signal.aborted) setLoad({ identity, status: 'error', questions: [], fallbackIds: [] });
          },
        );
    }
    return () => controller.abort();
  }, [assessmentLoader, lessonId, language, identity, attempt]);

  const current = load.identity === identity ? load : { status: 'loading' as const, questions: [], fallbackIds: [] };
  if (current.status === 'loading')
    return <Typography role="status">{messages.learningLayout.preparingLesson}</Typography>;
  if (current.status === 'error')
    return (
      <Stack spacing={2}>
        <Typography role="alert">{messages.learningLayout.preparingLessonError}</Typography>
        <Button onClick={() => setAttempt(value => value + 1)}>{messages.learningLayout.actions.retry}</Button>
      </Stack>
    );
  return (
    <ResolvedQuiz
      key={identity}
      questions={current.questions}
      fallbackIds={current.fallbackIds}
      section={section}
      messages={messages}
      sceneRegistry={sceneRegistry}
      onComplete={onComplete}
    />
  );
}

function ResolvedQuiz({
  questions,
  fallbackIds,
  section,
  messages,
  sceneRegistry,
  onComplete,
}: {
  questions: Question[];
  fallbackIds: readonly string[];
  section: QuizSectionViewProps;
  messages: UiKitMessages;
  sceneRegistry?: SceneRegistry;
  onComplete?: (result: { passed: boolean; correct: number; total: number; timedOut: boolean }) => void;
}) {
  const [statuses, setStatuses] = useState<Readonly<Record<string, boolean>>>({});
  const [index, setIndex] = useState(0);
  const [remaining, setRemaining] = useState(section.params.timeLimitSeconds);
  const emitted = useRef(false);
  const completed = questions.length > 0 && questions.every(question => Object.hasOwn(statuses, question.id));
  const count = questions.filter(question => statuses[question.id]).length;
  const timedOut = remaining !== undefined && remaining <= 0;
  const score = section.params.grading?.mode === 'percentage' ? (count * 100) / (questions.length || 1) : count;
  const passed = section.params.grading ? score >= section.params.grading.successThreshold : count === questions.length;

  useEffect(() => {
    if (remaining === undefined || emitted.current) return;
    const timer = setInterval(
      () => setRemaining(value => (value === undefined ? undefined : Math.max(0, value - 1))),
      1000,
    );
    return () => clearInterval(timer);
  }, [remaining === undefined]);
  useEffect(() => {
    if (emitted.current || (!completed && !timedOut)) return;
    emitted.current = true;
    onComplete?.({ passed: !timedOut && passed, correct: count, total: questions.length, timedOut });
  }, [completed, timedOut, passed, count, questions.length, onComplete]);

  if (!questions.length) throw new Error('Quiz has no selected Questions: ' + section.id);
  const stepper = section.params.layout.mode === 'stepper';
  return (
    <Stack spacing={2}>
      {remaining !== undefined && (
        <Typography role="timer">
          {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, '0')}
        </Typography>
      )}
      {stepper && section.params.layout.showProgress !== false && (
        <QuestionProgress
          statuses={questions.map(question =>
            !Object.hasOwn(statuses, question.id) ? 'unanswered' : statuses[question.id] ? 'correct' : 'incorrect',
          )}
          currentIndex={index}
          messages={messages.lesson}
          allowNavigation={section.params.interaction.allowQuestionNavigation}
          onNavigate={setIndex}
        />
      )}
      {questions.map((question, position) => (
        <Box
          key={question.id}
          lang={fallbackIds.includes(question.id) ? 'en' : undefined}
          sx={{ display: stepper && index !== position ? 'none' : 'block' }}
        >
          <QuestionCard
            question={question}
            messages={messages}
            sceneRegistry={sceneRegistry}
            parameters={section.params}
            disabled={timedOut}
            onChecked={correct =>
              setStatuses(previous => {
                const next = { ...previous };
                if (correct === undefined) delete next[question.id];
                else next[question.id] = correct;
                return next;
              })
            }
          />
        </Box>
      ))}
      {stepper && (
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Button disabled={index === 0} onClick={() => setIndex(value => value - 1)}>
            {messages.learningLayout.actions.previous}
          </Button>
          <Button
            disabled={
              index >= questions.length - 1 ||
              (!section.params.interaction.allowDeferring && !Object.hasOwn(statuses, questions[index].id))
            }
            onClick={() => setIndex(value => value + 1)}
          >
            {messages.learningLayout.actions.next}
          </Button>
        </Stack>
      )}
      {timedOut && <Typography role="status">{messages.questionFrame.incorrect}</Typography>}
    </Stack>
  );
}
