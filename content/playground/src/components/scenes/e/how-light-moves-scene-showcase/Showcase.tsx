'use client';

import { useState, type CSSProperties } from 'react';
import { LIGHT_SPEED_KM_S, media } from './Showcase.constants';
import styles from './Showcase.module.css';
import { useSceneLocale } from '@svitlo/ui-kit/scene-locale';
import type { Showcase_ContentBlock } from '../../../../../data/lessons/c/d3048d21-8690-5255-b62c-984c69ac272c/sections/practice/scenes/showcase';

export function Showcase({ locales }: Pick<Showcase_ContentBlock<'response'>, 'locales'>) {
  const locale = useSceneLocale();
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(true);
  const medium = media[selected];
  return (
    <section className={styles.showcase} aria-labelledby="showcase-title">
      <p className={styles.eyebrow}>{locales.header.eyebrow}</p>
      <h1 id="showcase-title">{locales.header.title}</h1>
      <p>{locales.header.description}</p>
      <div className={styles.media} role="group" aria-label={locales.selector.label}>
        {media.map((item, index) => (
          <button key={item.id} aria-pressed={index === selected} onClick={() => setSelected(index)}>
            {locales.selector.media[item.key]}
          </button>
        ))}
      </div>
      <div className={styles.experiment} style={{ '--travel-time': `${2 * medium.index}s` } as CSSProperties}>
        <div className={styles.readout} aria-live="polite">
          <strong>{locales.selector.media[medium.key]}</strong>
          <span>
            ≈ {Math.round(LIGHT_SPEED_KM_S / medium.index).toLocaleString(locale)} {locales.simulation.speedUnit}
          </span>
        </div>
        <div
          className={styles.track}
          role="img"
          aria-label={`${locales.simulation.trackPrefix}${locales.selector.media[medium.key]}.`}
        >
          <div className={styles.source} />
          <div className={styles.beam} />
          <div className={styles.travel}>
            <span className={styles.pulse} style={{ animationPlayState: paused ? 'paused' : 'running' }} />
          </div>
          <div className={styles.screen} />
        </div>
        <div className={styles.trackLabels}>
          <span>{locales.simulation.source}</span>
          <span>{locales.simulation.screen}</span>
        </div>
        <button className={styles.play} onClick={() => setPaused(value => !value)}>
          {paused ? locales.simulation.play : locales.simulation.pause}
        </button>
      </div>
      <blockquote className={styles.quote}>{locales.insight.quote}</blockquote>
      <p className={styles.caption}>{locales.notes.caption}</p>
      <p className={styles.caption}>
        {locales.notes.model}{' '}
        <a
          href="https://openstax.org/books/university-physics-volume-3/pages/1-1-the-propagation-of-light"
          target="_blank"
          rel="noreferrer"
        >
          {locales.notes.sourceLink}
        </a>
        .
      </p>
    </section>
  );
}
