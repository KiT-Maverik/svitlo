'use client';

import type { Lesson_Locale } from '../../../data/locale/lesson';

import { useEffect, useState, type CSSProperties, type ElementType } from 'react';
import styles from './Lesson.module.css';

/** Audio feedback is optional and never blocks lesson completion. */
export async function playCelebration() {
  try {
    const context = new AudioContext();
    await context.resume();
    [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const start = context.currentTime + index * 0.12;
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.09, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.45);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.5);
      if (index === 3)
        oscillator.onended = () => {
          void context.close();
        };
    });
  } catch {
    /* A blocked audio device must not interrupt lesson completion. */
  }
}

export type CelebrationProps = {
  score: number;
  total: number;
  messages: Lesson_Locale;
  homeHref?: string;
  /** A Next Link, Electron link, or plain anchor supplied by the host. */
  linkComponent?: ElementType;
};

export function Celebration({ score, total, messages, homeHref = '/', linkComponent: Link = 'a' }: CelebrationProps) {
  const { celebration } = messages;
  const [showConfetti, setShowConfetti] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3200);
    return () => clearTimeout(timer);
  }, []);
  const displayScore = celebration.scoreTemplate
    .replaceAll('{score}', String(score))
    .replaceAll('{total}', String(total));

  return (
    <section className={styles.finish} aria-labelledby="lesson-complete">
      {showConfetti && (
        <div className={styles.confetti} aria-hidden="true">
          {Array.from({ length: 48 }, (_, i) => (
            <i
              key={i}
              style={
                {
                  '--origin': i % 2 ? '100%' : '0%',
                  '--dx': `${(i % 2 ? -1 : 1) * (180 + i * 7)}px`,
                  '--dy': `${-240 + (i % 12) * 48}px`,
                  '--spin': `${180 + i * 31}deg`,
                  animationDelay: `${(i % 8) * 45}ms`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}
      <span className={styles.badge} aria-hidden="true">
        ✦
      </span>
      <h1 id="lesson-complete">{celebration.title}</h1>
      <p>{celebration.description}</p>
      <p>
        {celebration.correctAnswers} <strong>{displayScore}</strong>. {celebration.note}
      </p>
      <Link className={styles.primary} href={homeHref}>
        {celebration.home}
      </Link>
    </section>
  );
}
