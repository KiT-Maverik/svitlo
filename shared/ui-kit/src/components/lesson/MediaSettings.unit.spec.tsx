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

  it('applies shared volume and mute state to native audio and video', () => {
    const { container } = render(
      <MediaSettingsProvider>
        <TestControls />
        <Audio
          id="test-audio"
          slug="testAudio"
          type="audio"
          params={{}}
          locale={{ fileLocation: '/test.mp3', title: 'Test audio' }}
          messages={enUiKitMessages.audio}
        />
        <Video
          id="test-video"
          slug="testVideo"
          type="video"
          params={{}}
          locale={{ fileLocation: '/test.mp4', poster: '/poster.png', title: 'Test video', label: 'Test video' }}
          messages={enUiKitMessages.video}
        />
      </MediaSettingsProvider>,
    );
    const audio = container.querySelector('audio')!;
    const video = container.querySelector('video')!;
    fireEvent.click(screen.getByRole('button', { name: 'Set 40%' }));
    expect(audio.volume).toBe(0.4);
    expect(video.volume).toBe(0.4);
    fireEvent.change(screen.getByRole('slider', { name: enUiKitMessages.audio.volume }), {
      target: { value: '0.6' },
    });
    expect(screen.getByTestId('media-state')).toHaveTextContent('60:false');
    expect(video.volume).toBe(0.6);
    fireEvent.click(screen.getByRole('button', { name: 'Mute via context' }));
    expect(audio.muted).toBe(true);
    expect(video.muted).toBe(true);
    expect(audio.volume).toBe(0.6);
    fireEvent.click(screen.getByRole('button', { name: 'Unmute' }));
    expect(screen.getByTestId('media-state')).toHaveTextContent('60:false');
    expect(video.muted).toBe(false);
    fireEvent.click(screen.getByRole('button', { name: 'Mute via context' }));
    fireEvent.click(screen.getByRole('button', { name: 'Set excess volume' }));
    expect(audio.volume).toBe(1);
    expect(video.volume).toBe(1);
    expect(audio.muted).toBe(true);
    expect(video.muted).toBe(true);
  });
});
