import { useState } from 'react';
import type { Question_Catalog } from '@svitlo/engine/content';
import type { ContentBlockResponse, RenderNested } from '../types';
import { localizedAttributes } from '../utils';

function stableHash(value: string): number {
  let hash = 2166136261;
  for (const char of value) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return hash >>> 0;
}

export function QuizBlock({
  response,
  questions: questionCatalog,
  renderNested,
}: {
  response: ContentBlockResponse<'quiz'>;
  questions?: Question_Catalog<'response'>;
  renderNested: RenderNested;
}) {
  const questions = response.questionSlugs.map(slug => {
    const question = questionCatalog?.selectOneAnswer?.[slug];
    if (!question) throw new Error('Missing selectOneAnswer question: ' + slug);
    return question;
  });
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [retriesUsed, setRetriesUsed] = useState(0);
  const score = questions.filter(question => Object.entries(question.answers.correct)
    .some(([key, item]) => (answers[question.id] === key || answers[question.id] === item.id))).length;
  const attrs = localizedAttributes(response);
  return (
    <section {...attrs} aria-label={response.welcome}>
      <p>{response.welcome}</p>
      <form onSubmit={event => { event.preventDefault(); setSubmitted(true); }}>
        {questions.map((question, index) => {
          const options = [
            ...Object.entries(question.answers.correct),
            ...Object.entries(question.answers.incorrect),
            ...Object.entries(question.answers.distractors),
          ].sort((a, b) => stableHash(question.id + ':' + a[0]) - stableHash(question.id + ':' + b[0]));
          const name = 'quiz-' + response.id + '-' + question.id;
          return (
            <fieldset key={question.id} disabled={submitted}>
              <legend>{index + 1}</legend>
              <div id={name + '-prompt'}>
                {question.question.map((block, blockIndex) => (
                  <div key={block.id + ':' + blockIndex}>{renderNested(block)}</div>
                ))}
              </div>
              <div role="group" aria-labelledby={name + '-prompt'}>
                {options.map(([key, block]) => {
                  const optionId = name + '-' + key;
                  return (
                    <div key={key}>
                      <input
                        id={optionId}
                        type="radio"
                        name={name}
                        value={key}
                        aria-labelledby={optionId + '-content'}
                        checked={answers[question.id] === key}
                        onChange={() => setAnswers(previous => ({ ...previous, [question.id]: key }))}
                      />
                      <div id={optionId + '-content'}>{renderNested(block)}</div>
                    </div>
                  );
                })}
              </div>
              {submitted && response.interaction.allowExplanations && question.explanation?.map((block, blockIndex) => (
                <div key={block.id + ':' + blockIndex}>{renderNested(block)}</div>
              ))}
            </fieldset>
          );
        })}
        {!submitted && questions.length > 0 && <input type="submit" disabled={questions.some(q => !answers[q.id])} />}
        {submitted && response.results.showScore && response.results.visibility !== 'hidden' && (
          <output aria-live="polite">{score} / {questions.length}</output>
        )}
        {submitted && retriesUsed < response.interaction.retries && (
          <input type="reset" onClick={() => {
            setSubmitted(false);
            setAnswers({});
            setRetriesUsed(previous => previous + 1);
          }} />
        )}
      </form>
    </section>
  );
}
