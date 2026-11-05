'use client';

import styles from './LightRayDiagram.module.css';
import { useTheme } from '@mui/material/styles';
import type { LightRayDiagram_ContentBlock } from '../../../../../data/lessons/c/d3048d21-8690-5255-b62c-984c69ac272c/sections/theory/scenes/lightRayDiagram';

export function LightRayDiagram({ locales }: Pick<LightRayDiagram_ContentBlock<'response'>, 'locales'>) {
  const rtl = useTheme().direction === 'rtl';

  return (
    <svg
      className={styles.scene}
      viewBox="0 0 960 340"
      role="img"
      aria-label={locales.scene.title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{locales.scene.title}</title>
      <desc>{locales.scene.description}</desc>
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
          {locales.labels.source}
        </text>
        <text x="500" y="115">
          {locales.labels.direction}
        </text>
        <text x={rtl ? 153 : 807} y="305">
          {locales.labels.screen}
        </text>
      </g>
    </svg>
  );
}
