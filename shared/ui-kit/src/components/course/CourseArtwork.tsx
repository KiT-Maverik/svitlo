'use client';

import Box from '@mui/material/Box';
import AutoStoriesRounded from '@mui/icons-material/AutoStoriesRounded';
import LightModeRounded from '@mui/icons-material/LightModeRounded';
import RocketLaunchRounded from '@mui/icons-material/RocketLaunchRounded';
import type { CourseTone } from './types';

const artwork = {
  sky: { from: '#164E63', to: '#0E7490', accent: '#A5F3FC' },
  amber: { from: '#78350F', to: '#B45309', accent: '#FDE68A' },
  sage: { from: '#14532D', to: '#15803D', accent: '#BBF7D0' },
} as const;

export function CourseArtwork({ tone = 'sky', large = false }: { tone?: CourseTone; large?: boolean }) {
  const colors = artwork[tone];
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'relative',
        display: 'grid',
        placeItems: 'center',
        overflow: 'hidden',
        minHeight: large ? { xs: 180, md: 260 } : 156,
        width: '100%',
        background: `linear-gradient(130deg, ${colors.from}, ${colors.to})`,
        color: colors.accent,
      }}
    >
      <Box sx={{
        position: 'absolute',
        width: large ? 300 : 220,
        height: large ? 300 : 220,
        borderRadius: '50%',
        border: '1px solid',
        borderColor: 'rgba(255,255,255,.25)',
        insetInlineEnd: -50,
        top: -80,
      }} />
      <Box sx={{
        position: 'absolute',
        width: large ? 220 : 150,
        height: large ? 220 : 150,
        borderRadius: '50%',
        bgcolor: 'rgba(255,255,255,.09)',
        insetInlineStart: -60,
        bottom: -80,
      }} />
      {tone === 'sky' ? (
        <LightModeRounded sx={{ fontSize: large ? 104 : 72, filter: 'drop-shadow(0 8px 12px rgba(0,0,0,.2))' }} />
      ) : tone === 'amber' ? (
        <AutoStoriesRounded sx={{ fontSize: large ? 104 : 72, filter: 'drop-shadow(0 8px 12px rgba(0,0,0,.2))' }} />
      ) : (
        <RocketLaunchRounded sx={{ fontSize: large ? 104 : 72, filter: 'drop-shadow(0 8px 12px rgba(0,0,0,.2))' }} />
      )}
    </Box>
  );
}
