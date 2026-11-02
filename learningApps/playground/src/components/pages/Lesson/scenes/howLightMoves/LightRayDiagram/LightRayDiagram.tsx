'use client';

import styles from './LightRayDiagram.module.css';
import { getLocaleDirection } from '@svitlo/engine/localization';
import { useSceneLocales } from '@/components/pages/Lesson/SceneLocaleContext';
import type { LightRayDiagram_Locale } from './LightRayDiagram.types';

export function LightRayDiagram() {
  const { locale, scenes } = useSceneLocales<{ ray: LightRayDiagram_Locale }>();
  const messages = scenes.ray;
  const rtl = getLocaleDirection(locale) === 'rtl';

  return (
    <svg
      className={styles.scene}
      viewBox="0 0 960 340"
      role="img"
      aria-label={messages.scene.title}
      lang={locale}
      direction={rtl ? 'rtl' : 'ltr'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{messages.scene.title}</title>
      <desc>{messages.scene.description}</desc>
      <rect className={styles.background} width="960" height="340" rx="24" />
      <g transform={rtl ? 'translate(960 0) scale(-1 1)' : undefined}>
        <path className={styles.beam} d="M215 160 805 105 805 225 215 180Z" />
        <rect className={styles.flashlight} x="95" y="141" width="100" height="58" rx="12" />
        <path className={styles.flashlightHead} d="M185 141 220 123 220 217 185 199Z" />
        <path className={styles.ray} d="M245 170H758" />
        <path className={styles.arrow} d="m758 170-15-9m15 9-15 9" />
        <rect className={styles.screen} x="800" y="75" width="14" height="190" rx="7" />
      </g>
      <g className={styles.labels} textAnchor="middle">
        <text x={rtl ? 800 : 160} y="285">
          {messages.labels.source}
        </text>
        <text x="500" y="115">
          {messages.labels.direction}
        </text>
        <text x={rtl ? 153 : 807} y="305">
          {messages.labels.screen}
        </text>
      </g>
    </svg>
  );
}
