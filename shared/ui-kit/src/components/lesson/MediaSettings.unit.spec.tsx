import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { enUiKitMessages } from '../../testing/uiKitMessages.unit.fx';
import { Audio } from '../widgets/ContentBlockRenderer/blocks/Audio/Audio';
import { Video } from '../widgets/ContentBlockRenderer/blocks/Video/Video';
import { MediaSettingsProvider, useMediaSettings } from './MediaSettings';
import { MediaVolumeControl } from './MediaVolumeControl';

function TestControls() {
  const { volume, muted, setVolume, setMuted } = useMediaSettings();
  return (
    <>
      <output data-testid="media-state">{volume + ':' + muted}</output>
      <button onClick={() => setVolume(40)}>Set 40%</button>
      <button onClick={() => setVolume(-5)}>Set negative volume</button>
      <button onClick={() => setVolume(120)}>Set excess volume</button>
      <button onClick={() => setMuted(true)}>Mute via context</button>
    </>
  );
}

describe('Lesson media settings', () => {
  it('keeps a single bounded volume and mute state without losing volume on mute', () => {
    render(
      <MediaSettingsProvider>
        <TestControls />
        <MediaVolumeControl messages={enUiKitMessages.navbarPreferences.volume} />
      </MediaSettingsProvider>,
    );
    const state = screen.getByTestId('media-state');
    expect(state).toHaveTextContent('100:false');
    fireEvent.click(screen.getByRole('button', { name: 'Set 40%' }));
    expect(state).toHaveTextContent('40:false');
    fireEvent.click(screen.getByRole('button', { name: 'Mute' }));
    expect(state).toHaveTextContent('40:true');
    fireEvent.click(screen.getByRole('button', { name: 'Unmute' }));
    expect(state).toHaveTextContent('40:false');
    fireEvent.click(screen.getByRole('button', { name: 'Set negative volume' }));
    expect(state).toHaveTextContent('0:false');
    fireEvent.click(screen.getByRole('button', { name: 'Set excess volume' }));
    expect(state).toHaveTextContent('100:false');
    fireEvent.click(screen.getByRole('button', { name: 'Mute via context' }));
    fireEvent.click(screen.getByRole('button', { name: 'Maximum volume' }));
    expect(state).toHaveTextContent('100:false');
  });

  it('synchronizes native audio and video elements with shared settings', () => {
    const { container } = render(
      <MediaSettingsProvider>
        <TestControls />
        <Audio
          id="test-audio"
          type="audio"
          fileLocation="/test.mp3"
          title="Test audio"
          messages={enUiKitMessages.audio}
        />
        <Video
          id="test-video"
          type="video"
          fileLocation="/test.mp4"
          poster="/poster.png"
          title="Test video"
          messages={enUiKitMessages.video}
        />
      </MediaSettingsProvider>,
    );
    const audio = container.querySelector('audio')!;
    const video = container.querySelector('video')!;
    fireEvent.click(screen.getByRole('button', { name: 'Set 40%' }));
    expect(audio.volume).toBe(0.4);
    expect(video.volume).toBe(0.4);
    fireEvent.click(screen.getByRole('button', { name: 'Mute via context' }));
    expect(audio.muted).toBe(true);
    expect(video.muted).toBe(true);
    expect(audio.volume).toBe(0.4);
    fireEvent.volumeChange(audio, { target: { volume: 0.8, muted: false } });
    expect(screen.getByTestId('media-state')).toHaveTextContent('80:false');
    expect(video.volume).toBe(0.8);
    expect(video.muted).toBe(false);
  });
});
