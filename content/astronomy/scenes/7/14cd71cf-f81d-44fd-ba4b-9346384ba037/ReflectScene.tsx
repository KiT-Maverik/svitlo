'use client';

import { useEffect, useReducer, useRef, useState, useId } from 'react';
import type { SceneLocales } from '../../sceneText';
import { sceneText } from '../../sceneText';
import styles from '../../Scene.module.css';
import { initialReflectionState, reflectionReducer } from './reflectModel';
import type { ReflectionTopic } from './reflectModel';

type ReflectSceneProps = { locales: SceneLocales };

function TopicSymbol({ topic }: { topic: ReflectionTopic }) {
  return topic === 'day' ? (
    <svg aria-hidden="true" width="54" height="54" viewBox="0 0 54 54" focusable="false">
      <rect x="3" y="4" width="48" height="46" rx="9" fill="#b8dceb" />
      <path d="M3 32 Q27 17 51 32 V42 Q45 50 38 50 H16 Q3 50 3 40Z" fill="#759a69" />
      <path d="M27 5 V28" stroke="#354962" strokeDasharray="3 4" />
      <path d="M27 29 H51 V5 H27Z" fill="#25334b" />
    </svg>
  ) : (
    <svg aria-hidden="true" width="54" height="54" viewBox="0 0 54 54" focusable="false">
      <circle cx="27" cy="27" r="24" fill="#33445e" />
      <path d="M27 3 A24 24 0 0 0 27 51 A18 24 0 0 0 27 3Z" fill="#e1e4de" />
    </svg>
  );
}

export function ReflectScene({ locales }: ReflectSceneProps) {
  // TODO (BLOCKER): Provide verified offline Ukrainian clips and accessible
  // listen/repeat/pause actions for BOTH independent reflection steps,
  // complete prepared questions, own-question route, confirmations, feedback,
  // skip and navigation controls. Do not treat text, screen-reader output,
  // microphone recording or untested device/network TTS as prerecorded audio.
  const t = (key: string) => sceneText(locales, key);
  const [state, dispatch] = useReducer(reflectionReducer, initialReflectionState);
  const [draft, setDraft] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  const ownQuestionInputId = useId();
  useEffect(() => { heading.current?.focus(); }, [state.step]);

  const topic = state.step === 'moon' ? 'moon' : 'day';
  const titleKey = topic === 'day' ? 'dayTopic' : 'moonTopic';
  const questionKey = topic === 'day' ? 'dayQuestion' : 'moonQuestion';
  const choiceKey = topic === 'day' ? 'chooseDay' : 'chooseMoon';
  const ownKey = topic === 'day' ? 'ownDayQuestion' : 'ownMoonQuestion';
  const confirmKey = topic === 'day' ? 'confirmOwnDayQuestion' : 'confirmOwnMoonQuestion';
  const allDone = state.acknowledged.day && state.acknowledged.moon;
  const feedbackKey = {
    readyDay: 'dayQuestionFeedback',
    readyMoon: 'moonQuestionFeedback',
    ownRoute: 'ownQuestionRouteFeedback',
    confirmed: 'ownQuestionFeedback',
    skipped: 'skippedFeedback',
  } as const;
  const stepTo = (next: 'day' | 'moon' | 'review') => {
    setDraft('');
    dispatch({ type: 'step', step: next });
  };

  return (
    <section className={styles.scene} aria-label={t('prompt')}>
      <div className={styles.stack}>
        <h2>{t('prompt')}</h2>
        <p>{t('noGrades')}</p>
        {state.step !== 'review' ? (
          <>
            <h3 ref={heading} tabIndex={-1}>{t(topic === 'day' ? 'dayPrompt' : 'moonPrompt')}</h3>
            <figure className={styles.card}>
              <TopicSymbol topic={topic} />
              <figcaption>
                <strong>{t(titleKey)}</strong>
                <p>{t(topic === 'day' ? 'dayObservation' : 'moonObservation')}</p>
                <p>{t(questionKey)}</p>
              </figcaption>
            </figure>
            <p>{t('topicFeedback')}</p>
            <div className={styles.controls}>
              <button type="button" className={styles.button}
                aria-pressed={state.routes[topic] === 'ready' && state.acknowledged[topic]}
                onClick={() => dispatch({ type: 'chooseReady', topic })}>
                {t(choiceKey)}
              </button>
              <button type="button" className={styles.button}
                aria-pressed={state.routes[topic] === 'own'}
                onClick={() => { setDraft(''); dispatch({ type: 'own', topic }); }}>
                {t(ownKey)}
              </button>
            </div>
            {state.routes[topic] === 'own' && (
              <div className={styles.card}>
                <p>{t('ownQuestionPrompt')}</p>
                <p>{t('sayQuestion')}</p>
                <label htmlFor={ownQuestionInputId}>{t('writeQuestion')}</label>
                <textarea id={ownQuestionInputId} className={styles.field} value={draft}
                  onChange={event => setDraft(event.target.value)} rows={3} />
                <div className={styles.controls}>
                  <button type="button" className={styles.button}
                    aria-pressed={state.acknowledged[topic]}
                    onClick={() => { setDraft(''); dispatch({ type: 'confirmOwn', topic }); }}>
                    {t(confirmKey)}
                  </button>
                </div>
              </div>
            )}
            <div aria-live="polite" role="status">
              {state.feedback && (
                <p className={styles.feedback}>{t(feedbackKey[state.feedback])}</p>
              )}
            </div>
            <div className={styles.controls}>
              <button type="button" className={styles.button}
                onClick={() => { setDraft(''); dispatch({ type: 'skip', topic }); }}>
                {t('skipQuestion')}
              </button>
              {state.step === 'day' ? (
                <button type="button" className={styles.button}
                  onClick={() => stepTo('moon')}>{t('continueToMoon')}</button>
              ) : (
                <>
                  <button type="button" className={styles.button}
                    onClick={() => stepTo('day')}>{t('returnToDay')}</button>
                  <button type="button" className={styles.button}
                    onClick={() => stepTo('review')}>{t('reviewBoth')}</button>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <h3 ref={heading} tabIndex={-1}>{t('reviewBoth')}</h3>
            <div className={styles.gallery}>
              {(['day', 'moon'] as const).map(item => (
                <div className={styles.card} key={item}>
                  <TopicSymbol topic={item} />
                  <h3>{t(item === 'day' ? 'dayTopic' : 'moonTopic')}</h3>
                  <p>{t(item === 'day' ? 'dayObservation' : 'moonObservation')}</p>
                  {state.acknowledged[item] ? (
                    <p>{t(state.routes[item] === 'ready'
                      ? (item === 'day' ? 'dayQuestion' : 'moonQuestion')
                      : 'ownQuestionFeedback')}</p>
                  ) : (
                    <p>{t('incompleteFeedback')}</p>
                  )}
                </div>
              ))}
            </div>
            <p className={styles.feedback} role="status" aria-live="polite">
              {t(allDone ? 'bothQuestionsFeedback' : 'incompleteFeedback')}
            </p>
            <div className={styles.controls}>
              <button type="button" className={styles.button}
                onClick={() => stepTo('day')}>{t('returnToDay')}</button>
              <button type="button" className={styles.button}
                onClick={() => stepTo('moon')}>{t('continueToMoon')}</button>
              <button type="button" className={styles.button}
                onClick={() => { setDraft(''); dispatch({ type: 'reset' }); }}>
                {t('again')}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ReflectScene;
