'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Question, Locale_Languages } from '@svitlo/engine/content';
import type { LanguageCode } from '@svitlo/engine/localization';
import type { UiKit_Global } from '@svitlo/engine/content';
import { ContentLanguageContext, useContentLanguage } from '../../ContentBlockRenderer/ContentLanguageContext';
import { QuestionCompletionContext } from './QuestionCompletion';
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

export type QuestionResponse = Question<'response', Locale_Languages>;

export type QuestionRendererProps = {
  messages: UiKit_Global<'response'>;
  questions?: readonly QuestionResponse[];
  sceneRegistry?: SceneRegistry;
  language?: LanguageCode;
  /** Called exactly once after all questions have been checked. */
  onComplete?: () => void;
};

function QuestionBlock({
  response,
  sceneRegistry,
  messages,
}: {
  response: QuestionResponse;
  sceneRegistry?: SceneRegistry;
  messages: UiKit_Global<'response'>;
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

/** Consume the server-assembled responses directly; no legacy question model. */
export function QuestionRenderer({
  questions = [],
  sceneRegistry,
  language,
  onComplete,
  messages,
}: QuestionRendererProps) {
  const inheritedLanguage = useContentLanguage();
  const [checkedIds, setCheckedIds] = useState<ReadonlySet<string>>(() => new Set());
  const completed = useRef<string | null>(null);
  const signature = questions.map(question => question.type + ':' + question.id).join('|');
  const allChecked =
    questions.length > 0 && questions.every(question => checkedIds.has(question.type + ':' + question.id));

  useEffect(() => {
    if (!allChecked && completed.current === signature) completed.current = null;
    if (allChecked && completed.current !== signature) {
      completed.current = signature;
      onComplete?.();
    }
  }, [allChecked, onComplete, signature]);

  const context = useMemo(
    () => ({
      markChecked(id: string) {
        setCheckedIds(previous => (previous.has(id) ? previous : new Set([...previous, id])));
      },
      markUnchecked(id: string) {
        setCheckedIds(previous => {
          if (!previous.has(id)) return previous;
          const next = new Set(previous);
          next.delete(id);
          return next;
        });
      },
    }),
    [],
  );

  if (!questions.length) return null;
  return (
    <ContentLanguageContext.Provider value={language ?? inheritedLanguage}>
      <QuestionCompletionContext.Provider value={context}>
        {questions.map(response => (
          <QuestionBlock
            key={response.type + ':' + response.id}
            response={response}
            sceneRegistry={sceneRegistry}
            messages={messages}
          />
        ))}
      </QuestionCompletionContext.Provider>
    </ContentLanguageContext.Provider>
  );
}
