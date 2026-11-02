'use client';

import { useState, type CSSProperties } from 'react';
import { LIGHT_SPEED_KM_S, media } from './Showcase.constants';
import styles from './Showcase.module.css';
import { getLocaleDirection } from '@svitlo/engine/localization';
import { useSceneLocales } from '@/components/pages/Lesson/SceneLocaleContext';
import type { Showcase_Locale } from './Showcase.types';

export function Showcase() {
  const { locale, scenes } = useSceneLocales<{ practice: Showcase_Locale }>();
  const messages = scenes.practice;
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(true);
  const medium = media[selected];
  return (
    <section
      className={styles.showcase}
      lang={locale}
      dir={getLocaleDirection(locale)}
      aria-labelledby="showcase-title"
    >
      <p className={styles.eyebrow}>{messages.header.eyebrow}</p>
      <h1 id="showcase-title">{messages.header.title}</h1>
      <p>{messages.header.description}</p>
      <div className={styles.media} role="group" aria-label={messages.selector.label}>
        {media.map((item, index) => (
          <button key={item.id} aria-pressed={index === selected} onClick={() => setSelected(index)}>
            {messages.selector.media[item.key]}
          </button>
        ))}
      </div>
      <div className={styles.experiment} style={{ '--travel-time': `${2 * medium.index}s` } as CSSProperties}>
        <div className={styles.readout} aria-live="polite">
          <strong>{messages.selector.media[medium.key]}</strong>
          <span>
            ≈ {Math.round(LIGHT_SPEED_KM_S / medium.index).toLocaleString(locale)} {messages.simulation.speedUnit}
          </span>
        </div>
        <div
          className={styles.track}
          role="img"
          aria-label={`${messages.simulation.trackPrefix}${messages.selector.media[medium.key]}.`}
        >
          <div className={styles.source} />
          <div className={styles.beam} />
          <div className={styles.travel}>
            <span className={styles.pulse} style={{ animationPlayState: paused ? 'paused' : 'running' }} />
          </div>
          <div className={styles.screen} />
        </div>
        <div className={styles.trackLabels}>
          <span>{messages.simulation.source}</span>
          <span>{messages.simulation.screen}</span>
        </div>
        <button className={styles.play} onClick={() => setPaused(value => !value)}>
          {paused ? messages.simulation.play : messages.simulation.pause}
        </button>
      </div>
      <blockquote className={styles.quote}>{messages.insight.quote}</blockquote>
      <p className={styles.caption}>{messages.notes.caption}</p>
      <p className={styles.caption}>
        {messages.notes.model}{' '}
        <a
          href="https://openstax.org/books/university-physics-volume-3/pages/1-1-the-propagation-of-light"
          target="_blank"
          rel="noreferrer"
        >
          {messages.notes.sourceLink}
        </a>
        .
      </p>
    </section>
  );
}
