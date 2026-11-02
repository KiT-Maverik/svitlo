'use client';

import { useState, useSyncExternalStore } from 'react';
import { Box, Button, Paper, Slider, Typography } from '@mui/material';
import styles from './LightPropagationSimulation.module.css';
import { getLocaleDirection } from '@svitlo/engine/localization';
import { useSceneLocales } from '@/components/pages/Lesson/SceneLocaleContext';
import type { LightPropagationSimulation_Locale } from './LightPropagationSimulation.types';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

function subscribeToReducedMotion(callback: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function getReducedMotion() {
  return window.matchMedia(reducedMotionQuery).matches;
}

export function LightPropagationSimulation() {
  const { locale, scenes } = useSceneLocales<{ simulation: LightPropagationSimulation_Locale }>();
  const messages = scenes.simulation;
  const reducedMotion = useSyncExternalStore(subscribeToReducedMotion, getReducedMotion, () => false);
  const [playbackOverride, setPlaybackOverride] = useState<boolean | null>(null);
  const [speed, setSpeed] = useState(1);
  const paused = playbackOverride ?? reducedMotion;

  return (
    <Paper
      component="section"
      variant="outlined"
      className={styles.scene}
      lang={locale}
      dir={getLocaleDirection(locale)}
      aria-label={messages.scene.accessibleName}
    >
      <Typography component="h3" variant="h6">
        {messages.scene.title}
      </Typography>
      <Typography component="div" className={styles.description}>
        {messages.scene.description}
      </Typography>

      <Box role="img" aria-label={messages.track.accessibleDescription} className={styles.track}>
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
        <Typography variant="caption">{messages.track.source}</Typography>
        <Typography variant="caption">{messages.track.screen}</Typography>
      </Box>

      <Box className={styles.controls}>
        <Button variant="contained" type="button" onClick={() => setPlaybackOverride(!paused)} aria-pressed={paused}>
          {paused ? messages.controls.play : messages.controls.pause}
        </Button>
        <Box className={styles.speedControls}>
          <Typography component="span" variant="body2">
            {messages.controls.speed}
          </Typography>
          <Slider
            className={styles.slider}
            aria-label={messages.controls.speedAccessibleName}
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
            {messages.controls.speedUnit}
          </Typography>
        </Box>
      </Box>
      <Typography component="div" variant="caption" className={styles.note}>
        {messages.hints.scale}
      </Typography>
    </Paper>
  );
}
