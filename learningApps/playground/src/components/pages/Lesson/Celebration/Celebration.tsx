'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import styles from '../Lesson.module.css';
import { getLessonMessages } from '../locales';
import { useLessonLanguage } from '@/i18n/useLessonLocale';
import { aria } from './Celebration.constants';

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

export default function Celebration({ score, total }: { score: number; total: number }) {
  const { locale: activeLocale } = useLessonLanguage();
  const locale = getLessonMessages(activeLocale);
  const [showConfetti, setShowConfetti] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3200);
    return () => clearTimeout(timer);
  }, []);
  return (
    <section className={styles.finish} aria-labelledby={aria.headingId}>
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
      <h1 id={aria.headingId}>{locale.celebration.title}</h1>
      <p>{locale.celebration.description}</p>
      <p>
        {locale.celebration.correctAnswers} <strong>{locale.celebration.score(score, total)}</strong>.{' '}
        {locale.celebration.note}
      </p>
      <Link className={styles.primary} href="/">
        {locale.celebration.home}
      </Link>
    </section>
  );
}
