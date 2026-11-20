'use client';

import { useState } from 'react';
import { comparisonChoices, comparisonFeedback, type ComparisonChoice } from './compareModel';

type RecordDetails = {
  title: string;
  what: string;
  when: string;
  where: string;
  how: string;
  conditions: string;
};
type RecordField = Exclude<keyof RecordDetails, 'title'>;
const recordFields = ['what', 'when', 'where', 'how', 'conditions'] as const satisfies readonly RecordField[];

export interface CompareWorkbenchLocales {
  heading: string;
  prompt: string;
  source: string;
  recordA: RecordDetails;
  recordB: RecordDetails;
  // These source-language labels already appear in the accepted record guide.
  labels: Record<RecordField, string>;
  choices: Record<ComparisonChoice, string>;
  actions: { check: string; retry: string; read: string };
  feedback: { valid: string; same: string; unknown: string; causal: string; retry: string };
}

const layout = { display: 'grid', gap: '0.75rem', maxWidth: '100%' } as const;
function RecordCard({ record, labels }: { record: RecordDetails; labels: CompareWorkbenchLocales['labels'] }) {
  return (
    <article aria-label={record.title} style={{ border: '1px solid currentColor', borderRadius: '0.5rem', padding: '0.75rem', minWidth: 0 }}>
      <h3>{record.title}</h3>
      <dl>
        {recordFields.map(field => (
          <div key={field}>
            <dt><strong>{labels[field]}</strong></dt>
            <dd style={{ marginInlineStart: '1rem', overflowWrap: 'anywhere' }}>{record[field]}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

/** Comparison reads only the localized response; no remote media, scoring or persistence. */
export function CompareWorkbench({ locales }: { locales: CompareWorkbenchLocales }) {
  const [choice, setChoice] = useState<ComparisonChoice | null>(null);
  const [explanation, setExplanation] = useState('');
  const [feedback, setFeedback] = useState('');

  function check() {
    if (!choice) {
      setFeedback(locales.feedback.retry);
      return;
    }
    setFeedback(locales.feedback[comparisonFeedback(choice)]);
  }

  return (
    <section aria-labelledby="compare-workbench-heading" style={layout}>
      <h2 id="compare-workbench-heading">{locales.heading}</h2>
      <p>{locales.prompt}</p>
      <p>{locales.source}</p>
      <details open>
        <summary>{locales.actions.read}</summary>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))', gap: '1rem' }}>
          <RecordCard record={locales.recordA} labels={locales.labels} />
          <RecordCard record={locales.recordB} labels={locales.labels} />
        </div>
      </details>
      <fieldset>
        <legend>{locales.prompt}</legend>
        <div style={layout}>
          {comparisonChoices.map(key => (
            <label key={key}>
              <input
                type="radio"
                name="comparison-choice"
                checked={choice === key}
                onChange={() => {
                  setChoice(key);
                  setFeedback('');
                }}
              />{' '}
              {locales.choices[key]}
            </label>
          ))}
        </div>
      </fieldset>
      {choice === 'other' && (
        <div style={layout}>
          <label htmlFor="comparison-open-explanation">{locales.choices.other}</label>
          <textarea
            id="comparison-open-explanation"
            value={explanation}
            onChange={event => setExplanation(event.target.value)}
            rows={3}
            maxLength={700}
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
          <p>{locales.feedback.causal}</p>
        </div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <button type="button" onClick={check}>{locales.actions.check}</button>
        <button type="button" onClick={() => {
          setChoice(null);
          setExplanation('');
          setFeedback('');
        }}>{locales.actions.retry}</button>
      </div>
      {feedback && <p role="status" aria-live="polite">{feedback}</p>}
    </section>
  );
}
