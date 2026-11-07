'use client';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import type { NavbarPreferences_Locale } from '../../../data/locale/navbarPreferences';
import { useMediaSettings } from './MediaSettings';

/** Lesson-scoped volume control, rendered in the shared Quick Settings drawer. */
export function MediaVolumeControl({ messages }: { messages: NavbarPreferences_Locale['volume'] }) {
  const { volume, muted, setVolume, setMuted, toggleMuted } = useMediaSettings();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body2" component="h3" sx={{ fontWeight: 700 }}>
          {messages.label}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {muted ? 0 : volume}%
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title={muted ? messages.unmute : messages.mute}>
          <IconButton aria-label={muted ? messages.unmute : messages.mute} onClick={toggleMuted} size="small">
            <VolumeOffRoundedIcon color={muted || volume === 0 ? 'disabled' : 'inherit'} />
          </IconButton>
        </Tooltip>
        <Slider
          aria-label={messages.label}
          min={0}
          max={100}
          step={10}
          value={volume}
          valueLabelDisplay="auto"
          onChange={(_event, value) => {
            const next = Array.isArray(value) ? value[0] : value;
            setVolume(next);
            if (next > 0 && muted) setMuted(false);
          }}
        />
        <Tooltip title={messages.maximum}>
          <IconButton
            aria-label={messages.maximum}
            size="small"
            onClick={() => {
              setVolume(100);
              setMuted(false);
            }}
          >
            <VolumeUpRoundedIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
