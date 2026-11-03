'use client';

import { Box } from '@mui/material';
import type { SceneRegistry } from '../../ContentBlockRenderer';
import { QuestionAttempt } from '../helpers/QuestionAttempt/QuestionAttempt';
import { renderQuestionBlocks, toQuestionAttempt, type QuestionResponse } from './toQuestionAttempt';

export type QuestionRendererProps = {
  questions?: readonly QuestionResponse[];
  sceneRegistry?: SceneRegistry;
};

export const QuestionRenderer = ({ questions, sceneRegistry }: QuestionRendererProps) => {
  if (!questions?.length) return null;

  return questions.map(response => {
    const question = toQuestionAttempt(response, sceneRegistry);
    const prompt = renderQuestionBlocks(response.question, sceneRegistry);
    const explanation = renderQuestionBlocks(response.explanation, sceneRegistry);
    const hint = renderQuestionBlocks(response.hint, sceneRegistry);
    const hintLabel = response.locale.code === 'uk' ? 'Підказка' : 'Hint';

    return (
      <QuestionAttempt
        key={`${response.type}:${response.id}:${response.locale.code}:${JSON.stringify(response)}`}
        question={question}
        explanationContent={explanation}
        slots={{ question: () => (
          <>
            <Box component="div" role="heading" aria-level={2}>{prompt}</Box>
            {hint && <Box component="details" sx={{ mt: 1 }}><summary>{hintLabel}</summary>{hint}</Box>}
          </>
        ) }}
      />
    );
  });
};
