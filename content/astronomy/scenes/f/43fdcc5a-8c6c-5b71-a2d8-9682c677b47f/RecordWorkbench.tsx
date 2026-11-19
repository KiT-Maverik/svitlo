'use client';

import { useState } from 'react';
import {
  initialRecord,
  recordFieldKeys,
  recordIssue,
  recordSuggestions,
  textualRecord,
  type RecordFields,
  type RecordLabels,
  type SourceMode,
} from './recordModel';

export interface RecordWorkbenchLocales {
  heading: string;
  instructions: string;
  modes: { own: string; example: string };
  example: { title: string; text: string; credit: string };
  sourceLink: string;
  labels: RecordLabels;
  actions: { review: string; edit: string; clear: string; finish: string; readBack: string };
  feedback: {
    complete: string;
    missingWhat: string;
    missingWhen: string;
    missingSource: string;
    missingMethod: string;
    missingConditions: string;
    wrongSource: string;
    guess: string;
    noScore: string;
  };
}

const layout = { display: 'grid', gap: '0.75rem', maxWidth: '100%' } as const;
const controls = { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' } as const;

/** Source-locale text arrives from the Engine's selected Scene response, not a global dictionary. */
export function RecordWorkbench({ locales }: { locales: RecordWorkbenchLocales }) {
  const [mode, setMode] = useState<SourceMode | null>(null);
  const [record, setRecord] = useState<RecordFields>(() => initialRecord('own', locales.labels));
  const [phase, setPhase] = useState<'edit' | 'preview' | 'complete'>('edit');
  const [feedback, setFeedback] = useState('');
  const [sourceChanged, setSourceChanged] = useState(false);

  function chooseSource(next: SourceMode) {
    if (mode === next) return;
    // Switching provenance never silently transfers unsupported answers.
    setSourceChanged(mode !== null);
    setMode(next);
    setRecord(initialRecord(next, locales.labels));
    setFeedback('');
    setPhase('edit');
  }
  function setField(field: keyof RecordFields, value: string) {
    setRecord(previous => ({ ...previous, [field]: value }));
    setFeedback('');
  }
  function preview() {
    if (!mode) return;
    const issue = recordIssue(mode, record, locales.labels);
    setFeedback(issue ? locales.feedback[issue] : locales.feedback.complete);
    setPhase('preview');
  }
  function finish() {
    if (!mode) return;
    const issue = recordIssue(mode, record, locales.labels);
    if (issue) {
      setFeedback(locales.feedback[issue]);
      return;
    }
    setFeedback(locales.feedback.noScore);
    setPhase('complete');
  }
  function clear() {
    // Native confirmation uses platform-localized dialog controls and prevents accidental data loss.
    if (typeof window !== 'undefined' && !window.confirm(locales.actions.clear)) return;
    setMode(null);
    setRecord(initialRecord('own', locales.labels));
    setFeedback('');
    setPhase('edit');
    setSourceChanged(false);
  }

  return (
    <section aria-labelledby="record-workbench-heading" style={layout}>
      <h2 id="record-workbench-heading">{locales.heading}</h2>
      <p>{locales.instructions}</p>
      <fieldset disabled={phase === 'complete'}>
        <legend>{locales.instructions}</legend>
        <div style={controls}>
          {(['own', 'example'] as const).map(choice => (
            <label key={choice}>
              <input
                type="radio"
                name="observation-source"
                checked={mode === choice}
                onChange={() => chooseSource(choice)}
              />{' '}
              {locales.modes[choice]}
            </label>
          ))}
        </div>
      </fieldset>
      {mode === 'example' && (
        <aside aria-label={locales.example.title}>
          <h3>{locales.example.title}</h3>
          <p>{locales.example.text}</p>
          <p>{locales.example.credit}</p>
          <a href={locales.sourceLink} rel="noopener noreferrer" target="_blank">
            {locales.example.title}
          </a>
        </aside>
      )}
      {sourceChanged && <p role="status">{locales.feedback.wrongSource}</p>}
      {mode && phase === 'edit' && (
        <form
          style={layout}
          onSubmit={event => {
            event.preventDefault();
            preview();
          }}
        >
          {recordFieldKeys.map(field => (
            <fieldset key={field} style={{ minWidth: 0 }}>
              <legend>{locales.labels[field]}</legend>
              <div style={controls}>
                {recordSuggestions(mode, field, locales.labels).map(choice => (
                  <button
                    type="button"
                    key={choice}
                    onClick={() => setField(field, choice)}
                    aria-pressed={record[field] === choice}
                  >
                    {choice}
                  </button>
                ))}
              </div>
              <label style={layout}>
                <span>{locales.labels.other} — {locales.labels[field]}</span>
                <input
                  type="text"
                  value={record[field]}
                  onChange={event => setField(field, event.target.value)}
                  maxLength={400}
                  style={{ width: '100%', maxWidth: '42rem', boxSizing: 'border-box' }}
                />
              </label>
            </fieldset>
          ))}
          <div style={controls}>
            <button type="submit">{locales.actions.review}</button>
            <button type="button" onClick={clear}>{locales.actions.clear}</button>
          </div>
        </form>
      )}
      {mode && phase !== 'edit' && (
        <section aria-label={locales.actions.review}>
          <dl>
            {recordFieldKeys.map(field => (
              <div key={field}>
                <dt><strong>{locales.labels[field]}</strong></dt>
                <dd style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
                  {record[field] || locales.labels.unknown}
                </dd>
              </div>
            ))}
          </dl>
          <details>
            <summary>{locales.actions.readBack}</summary>
            {/* Visible text is available to a screen reader or helper; this control never claims audio playback. */}
            <p style={{ whiteSpace: 'pre-line' }}>{textualRecord(record, locales.labels)}</p>
          </details>
          {phase === 'preview' && (
            <div style={controls}>
              <button type="button" onClick={() => setPhase('edit')}>{locales.actions.edit}</button>
              <button type="button" onClick={finish}>{locales.actions.finish}</button>
              <button type="button" onClick={clear}>{locales.actions.clear}</button>
            </div>
          )}
        </section>
      )}
      {feedback && <p role="status" aria-live="polite">{feedback}</p>}
      {mode && <p>{locales.feedback.noScore}</p>}
    </section>
  );
}

// Learners unable to read independently still need a human-assisted reading route
// offered in the adjacent approved Markdown recordTask/recordChecklist; this
// Scene deliberately offers a text-only screen-reader/helper transcript, not
// unverified offline TTS or nonexistent audio assets.
