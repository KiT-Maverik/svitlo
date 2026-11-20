'use client';

import { useReducer } from 'react';
import type { SceneLocales } from '../../sceneText';
import { sceneText } from '../../sceneText';
import styles from '../../Scene.module.css';
import { initialMoonState, moonReducer } from './moonModel';

type MoonSceneProps = { locales: SceneLocales };

/** Two equal physical disks: lit fraction varies, not the outer Moon silhouette. */
function MoonDisk({ phase, description, cloud = false }: {
  phase: 'quarter' | 'full'; description: string; cloud?: boolean;
}) {
  return (
    <svg className={styles.fig} viewBox="0 0 240 235" role="img" aria-label={description}>
      <title>{description}</title>
      <circle cx="120" cy="116" r="92" fill="#333e50" stroke="#9daab7" strokeWidth="3" />
      {phase === 'full' ? (
        <circle cx="120" cy="116" r="91" fill="#e4e8df" />
      ) : (
        <path d="M120 25 A91 91 0 0 0 120 207 Z" fill="#e4e8df" />
      )}
      <circle cx="120" cy="116" r="91" fill="none" stroke="#788898" strokeWidth="2" />
      {/* Cloud is rendered on top of the disk: it is NOT the phase boundary. */}
      {cloud && (
        <g fill="#9daabc" stroke="#2d435f" strokeWidth="4">
          <ellipse cx="115" cy="95" rx="58" ry="25" />
          <ellipse cx="86" cy="90" rx="32" ry="30" />
          <ellipse cx="142" cy="85" rx="35" ry="33" />
        </g>
      )}
    </svg>
  );
}

export function MoonScene({ locales }: MoonSceneProps) {
  // TODO (BLOCKER): Supply real offline Ukrainian speech clips and wire
  // listen/repeat/pause controls for each dated disk, question, answer,
  // cloud state, explanation and feedback in the approved moonScene spec.
  // Verify spoken phase dates, device offline use and nonreading-learner flow;
  // textual/SR labels alone do not satisfy required optional audio access.
  const t = (key: string) => sceneText(locales, key);
  const [state, dispatch] = useReducer(moonReducer, initialMoonState);
  const first = state.view === 'both' || state.view === 'first';
  const second = state.view === 'both' || state.view === 'second';
  const litFeedback = state.litAnswer === 'second' ? 'correct' : 'help';
  const shapeFeedback = state.shapeAnswer === 'same' ? 'sameShapeFeedback' : 'lostPieceFeedback';
  const cloudFeedback = state.cloudAnswer === 'cloudNotPhase'
    ? 'cloudNotPhaseFeedback' : 'cloudIsPhaseFeedback';

  return (
    <section className={styles.scene} aria-label={t('prompt')}>
      <div className={styles.stack}>
        <h2>{t('prompt')}</h2>
        <p className={styles.note}>{t('sourceNote')}</p>
        <div className={styles.controls} role="group" aria-label={t('prompt')}>
          <button type="button" className={styles.button} aria-pressed={state.view === 'first'}
            onClick={() => dispatch({ type: 'view', view: 'first' })}>{t('showFirst')}</button>
          <button type="button" className={styles.button} aria-pressed={state.view === 'second'}
            onClick={() => dispatch({ type: 'view', view: 'second' })}>{t('showSecond')}</button>
          <button type="button" className={styles.button} aria-pressed={state.view === 'both'}
            onClick={() => dispatch({ type: 'view', view: 'both' })}>{t('showBoth')}</button>
        </div>
        <div className={styles.gallery}>
          {first && (
            <figure className={styles.card}>
              <MoonDisk phase="quarter" description={t('firstDescription')} />
              <figcaption><strong>{t('firstLabel')}</strong><p>{t('firstDescription')}</p></figcaption>
            </figure>
          )}
          {second && (
            <figure className={styles.card}>
              <MoonDisk phase="full" description={t('secondDescription')} />
              <figcaption><strong>{t('secondLabel')}</strong><p>{t('secondDescription')}</p></figcaption>
            </figure>
          )}
        </div>
        <fieldset className={styles.card}>
          <legend>{t('prompt')}</legend>
          <div className={styles.controls}>
            <button type="button" className={styles.button} aria-pressed={state.litAnswer === 'first'}
              onClick={() => dispatch({ type: 'lit', answer: 'first' })}>{t('firstChoice')}</button>
            <button type="button" className={styles.button} aria-pressed={state.litAnswer === 'second'}
              onClick={() => dispatch({ type: 'lit', answer: 'second' })}>{t('secondChoice')}</button>
          </div>
          {state.litAnswer && (
            <p className={styles.feedback} role="status" aria-live="polite">{t(litFeedback)}</p>
          )}
        </fieldset>
        <fieldset className={styles.card}>
          <legend>{t('shapePrompt')}</legend>
          <div className={styles.controls}>
            <button type="button" className={styles.button} aria-pressed={state.shapeAnswer === 'same'}
              onClick={() => dispatch({ type: 'shape', answer: 'same' })}>{t('sameShape')}</button>
            <button type="button" className={styles.button} aria-pressed={state.shapeAnswer === 'lost'}
              onClick={() => dispatch({ type: 'shape', answer: 'lost' })}>{t('lostPiece')}</button>
          </div>
          {state.shapeAnswer && (
            <p className={styles.feedback} role="status" aria-live="polite">{t(shapeFeedback)}</p>
          )}
        </fieldset>
        <div className={styles.card}>
          <h3>{t('cloudPrompt')}</h3>
          <figure>
            <MoonDisk phase="full" cloud={state.cloudy}
              description={t(state.cloudy ? 'cloudDescription' : 'cloudFreeDescription')} />
            <figcaption>{t(state.cloudy ? 'cloudDescription' : 'cloudFreeDescription')}</figcaption>
          </figure>
          <div className={styles.controls}>
            <button type="button" className={styles.button} aria-pressed={state.cloudy}
              onClick={() => dispatch({ type: 'cloud', visible: true })}>{t('showCloud')}</button>
            <button type="button" className={styles.button} aria-pressed={!state.cloudy}
              onClick={() => dispatch({ type: 'cloud', visible: false })}>{t('hideCloud')}</button>
          </div>
          {state.cloudy && <fieldset className={styles.card}>
            <legend>{t('cloudPrompt')}</legend>
            <div className={styles.controls}>
              <button type="button" className={styles.button} aria-pressed={state.cloudAnswer === 'cloudNotPhase'}
                onClick={() => dispatch({ type: 'cloudAnswer', answer: 'cloudNotPhase' })}>
                {t('cloudNotPhase')}
              </button>
              <button type="button" className={styles.button} aria-pressed={state.cloudAnswer === 'cloudIsPhase'}
                onClick={() => dispatch({ type: 'cloudAnswer', answer: 'cloudIsPhase' })}>
                {t('cloudIsPhase')}
              </button>
            </div>
            {state.cloudAnswer && (
              <p className={styles.feedback} role="status" aria-live="polite">{t(cloudFeedback)}</p>
            )}
          </fieldset>}
        </div>
        <button type="button" className={styles.button}
          onClick={() => dispatch({ type: 'reset' })}>{t('again')}</button>
      </div>
    </section>
  );
}

export default MoonScene;
