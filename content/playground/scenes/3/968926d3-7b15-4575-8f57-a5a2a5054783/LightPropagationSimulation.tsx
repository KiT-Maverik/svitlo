'use client';

import { useState, useSyncExternalStore } from 'react';
import { Box, Button, Paper, Slider, Typography } from '@mui/material';
import styles from './LightPropagationSimulation.module.css';
import type { LightPropagationSimulationLocale } from '../../../data/lessons/c/d3048d21-8690-5255-b62c-984c69ac272c/sections/content/scenes/lightPropagationSimulation';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

function subscribeToReducedMotion(callback: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function getReducedMotion() {
  return window.matchMedia(reducedMotionQuery).matches;
}

export function LightPropagationSimulation({
  locales,
}: { locales: LightPropagationSimulationLocale }) {
  const reducedMotion = useSyncExternalStore(subscribeToReducedMotion, getReducedMotion, () => false);
  const [playbackOverride, setPlaybackOverride] = useState<boolean | null>(null);
  const [speed, setSpeed] = useState(1);
  const paused = playbackOverride ?? reducedMotion;

  return (
    <Paper component="section" variant="outlined" className={styles.scene} aria-label={locales.scene.accessibleName}>
      <Typography component="h3" variant="h6">
        {locales.scene.title}
      </Typography>
      <Typography component="div" className={styles.description}>
        {locales.scene.description}
      </Typography>

      <Box role="img" aria-label={locales.track.accessibleDescription} className={styles.track}>
        <Box className={styles.line} />
        <Box className={styles.source} />
        <Box className={styles.path}>
          <Box
            className={styles.pulse}
            style={{ animationDuration: `${3 / speed}s`, animationPlayState: paused ? 'paused' : 'running' }}
          />
        </Box>
        <Box className={styles.screen} />
      </Box>

      <Box className={styles.labels}>
        <Typography variant="caption">{locales.track.source}</Typography>
        <Typography variant="caption">{locales.track.screen}</Typography>
      </Box>

      <Box className={styles.controls}>
        <Button variant="contained" type="button" onClick={() => setPlaybackOverride(!paused)} aria-pressed={paused}>
          {paused ? locales.controls.play : locales.controls.pause}
        </Button>
        <Box className={styles.speedControls}>
          <Typography component="span" variant="body2">
            {locales.controls.speed}
          </Typography>
          <Slider
            className={styles.slider}
            aria-label={locales.controls.speedAccessibleName}
            min={0.5}
            max={2}
            step={0.5}
            value={speed}
            onChange={(_, value) => {
              if (typeof value === 'number') setSpeed(value);
            }}
          />
          <Typography component="output" variant="body2" className={styles.speedValue}>
            {speed}
            {locales.controls.speedUnit}
          </Typography>
        </Box>
      </Box>
      <Typography component="div" variant="caption" className={styles.note}>
        {locales.hints.scale}
      </Typography>
    </Paper>
  );
}
