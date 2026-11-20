'use client';

import { useReducer } from 'react';
import type { SceneLocales } from '../../sceneText';
import { sceneText } from '../../sceneText';
import styles from '../../Scene.module.css';
import { dayReducer, initialDayState } from './dayModel';

type DaySceneProps = { locales: SceneLocales };
type LandscapeTime = 'day' | 'night';

/** Identical fictional horizon, tree, hill and house in both conditions. */
function Landscape({ time, description }: { time: LandscapeTime; description: string }) {
  const day = time === 'day';
  return (
    <svg className={styles.fig} viewBox="0 0 440 260" role="img" aria-label={description}>
      <title>{description}</title>
      <rect width="440" height="260" fill={day ? '#90c9ec' : '#182943'} />
      <path d="M0 171 Q110 115 217 172 T440 165 V260 H0Z" fill={day ? '#88b57a' : '#4b655b'} />
      <path d="M0 222 Q145 169 263 222 T440 218 V260 H0Z" fill={day ? '#6b9657' : '#3b5547'} />
      <path d="M255 140 V207 H359 V140Z" fill={day ? '#e8cba6' : '#827d79'} stroke="#263c46" strokeWidth="3" />
      <path d="M243 143 L307 98 L372 143Z" fill={day ? '#a95e4c' : '#754d48'} stroke="#263c46" strokeWidth="3" />
      <path d="M285 207 V167 H322 V207Z" fill={day ? '#91654a' : '#534b48'} stroke="#263c46" strokeWidth="2" />
      <path d="M337 156 H351 V174 H337Z" fill={day ? '#c4def2' : '#44566c'} stroke="#263c46" strokeWidth="2" />
      <path d="M92 218 V125" stroke={day ? '#73523d' : '#574c41'} strokeWidth="16" strokeLinecap="round" />
      <path d="M39 153 Q27 110 65 94 Q69 51 113 69 Q142 46 153 98 Q188 117 157 154Z"
        fill={day ? '#487d49' : '#365a46'} stroke="#354b3e" strokeWidth="3" />
    </svg>
  );
}

/**
 * TODO (BLOCKER): Lesson #661 dayScene evidence-step needs two independently
 * verified, licensed photos containing a real visible sky at documented day/night
 * capture times. Record provenance/author/license/place/time zone, astronomically
 * verify each shot and add localized captions + nonvisual descriptions before
 * enabling this step. Fictional SVGs must NEVER be presented as photographic proof.
 */
const verifiedDayNightPhotographs: null = null;

export function DayScene({ locales }: DaySceneProps) {
  const t = (key: string) => sceneText(locales, key);
  const [state, dispatch] = useReducer(dayReducer, initialDayState);
  const visibleDay = state.view === 'day' || state.view === 'both';
  const visibleNight = state.view === 'night' || state.view === 'both';
  const feedback = state.choice === 'light' ? 'lightFeedback' : 'placeFeedback';

  return (
    <section className={styles.scene} aria-label={t('prompt')}>
      <div className={styles.stack}>
        <h2>{t('prompt')}</h2>
        <p>{t('hint')}</p>
        <div className={styles.controls} role="group" aria-label={t('prompt')}>
          <button type="button" className={styles.button} aria-pressed={state.view === 'day'}
            onClick={() => dispatch({ type: 'view', view: 'day' })}>{t('showDay')}</button>
          <button type="button" className={styles.button} aria-pressed={state.view === 'night'}
            onClick={() => dispatch({ type: 'view', view: 'night' })}>{t('showNight')}</button>
          <button type="button" className={styles.button} aria-pressed={state.view === 'both'}
            onClick={() => dispatch({ type: 'view', view: 'both' })}>{t('showBoth')}</button>
        </div>
        <div className={styles.gallery}>
          {visibleDay && (
            <figure className={styles.card}>
              <Landscape time="day" description={t('skyDayDescription')} />
              <figcaption><strong>{t('dayLabel')}</strong><p>{t('first')}</p>{t('skyDayDescription')}</figcaption>
            </figure>
          )}
          {visibleNight && (
            <figure className={styles.card}>
              <Landscape time="night" description={t('skyNightDescription')} />
              <figcaption><strong>{t('nightLabel')}</strong><p>{t('second')}</p>{t('skyNightDescription')}</figcaption>
            </figure>
          )}
        </div>
        <fieldset className={styles.card}>
          <legend>{t('whatChanged')}</legend>
          <div className={styles.controls}>
            <button type="button" className={styles.button} aria-pressed={state.choice === 'light'}
              onClick={() => dispatch({ type: 'answer', choice: 'light' })}>{t('lightChoice')}</button>
            <button type="button" className={styles.button} aria-pressed={state.choice === 'place'}
              onClick={() => dispatch({ type: 'answer', choice: 'place' })}>{t('placeChoice')}</button>
          </div>
          {state.choice !== null && (
            <div className={styles.feedback} role="status" aria-live="polite">
              <p>{t(feedback)}</p><p>{t('skyFeedback')}</p><p>{t('whatSame')} {t('sameFeedback')}</p>
            </div>
          )}
        </fieldset>
        <div className={styles.controls}>
          <button type="button" className={styles.button}
            onClick={() => dispatch({ type: 'reset' })}>{t('again')}</button>
          <button type="button" className={styles.button} disabled={!verifiedDayNightPhotographs}>
            {t('evidenceStep')}
          </button>
        </div>
      </div>
    </section>
  );
}

export default DayScene;
