import { enUiKitMessages } from '../../../../../testing/uiKitMessages.unit.fx';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { ContentBlock_Audio_Props } from '@svitlo/engine/runtime';
import { Audio } from './Audio';
import { ContentLanguageContext } from '../../ContentLanguageContext';
import { formatAudioTime } from './Audio.utils';

const response: ContentBlock_Audio_Props = {
  id: 'audio-1',
  slug: 'audio-1',
  type: 'audio',
  params: {},
  locale: {
    fileLocation: '/lesson.mp3',
    title: 'Запис уроку',
    description: 'Прослухайте пояснення',
    fallback: {
      offline: 'Аудіо недоступне без мережі',
      unavailable: 'Аудіо не знайдено',
      playbackError: 'Помилка відтворення',
      retry: 'Повторити',
    },
  },
};

const originalOnline = Object.getOwnPropertyDescriptor(Navigator.prototype, 'onLine');
const originalAudioError = Object.getOwnPropertyDescriptor(HTMLAudioElement.prototype, 'error');

function setOnline(value: boolean) {
  Object.defineProperty(Navigator.prototype, 'onLine', { configurable: true, get: () => value });
}

function failAudio(audio: HTMLAudioElement, code: number) {
  Object.defineProperty(audio, 'error', { configurable: true, value: { code } });
  fireEvent.error(audio);
}

afterEach(() => {
  if (originalOnline) Object.defineProperty(Navigator.prototype, 'onLine', originalOnline);
  if (originalAudioError) Object.defineProperty(HTMLAudioElement.prototype, 'error', originalAudioError);
  else delete (HTMLAudioElement.prototype as { error?: MediaError | null }).error;
});

describe('Audio content block', () => {
  it('renders the player and caption, then offers a retry if the file fails offline', () => {
    setOnline(false);
    const { container } = render(<Audio messages={enUiKitMessages.audio} {...response} />);
    const audio = container.querySelector('audio');
    expect(audio).toHaveAttribute('src', '/lesson.mp3');
    expect(audio).toHaveAttribute('aria-label', 'Запис уроку');
    expect(screen.getByText('Прослухайте пояснення').tagName).toBe('FIGCAPTION');

    fireEvent.stalled(audio!);
    expect(screen.getByRole('alert')).toHaveTextContent('Аудіо недоступне без мережі');
    fireEvent.click(screen.getByRole('button', { name: 'Повторити' }));
    expect(container.querySelector('audio')).not.toBeNull();
  });

  it('distinguishes unavailable audio from a decoding error', () => {
    setOnline(true);
    const { container, rerender } = render(<Audio messages={enUiKitMessages.audio} {...response} />);
    failAudio(container.querySelector('audio')!, 4);
    expect(screen.getByRole('alert')).toHaveTextContent('Аудіо не знайдено');

    rerender(<Audio messages={enUiKitMessages.audio} {...response} locale={{ ...response.locale, fileLocation: '/other.mp3' }} />);
    failAudio(container.querySelector('audio')!, 3);
    expect(screen.getByRole('alert')).toHaveTextContent('Помилка відтворення');
  });

  it('detects a media error that happened before the handler was attached', () => {
    setOnline(true);
    Object.defineProperty(HTMLAudioElement.prototype, 'error', { configurable: true, get: () => ({ code: 4 }) });
    render(<Audio messages={enUiKitMessages.audio} {...response} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Аудіо не знайдено');
  });
});

describe('Audio fallback lifecycle', () => {
  it('automatically retries an offline stalled player when connectivity returns', () => {
    setOnline(false);
    const { container } = render(<Audio messages={enUiKitMessages.audio} {...response} />);
    fireEvent.waiting(container.querySelector('audio')!);
    expect(screen.getByRole('alert')).toHaveTextContent('Аудіо недоступне без мережі');

    setOnline(true);
    fireEvent(window, new Event('online'));
    expect(screen.queryByRole('alert')).toBeNull();
    expect(container.querySelector('audio')).toHaveAttribute('src', '/lesson.mp3');
  });

  it('does not retain an unavailable fallback when the source changes', () => {
    setOnline(true);
    const { container, rerender } = render(<Audio messages={enUiKitMessages.audio} {...response} />);
    failAudio(container.querySelector('audio')!, 4);
    expect(screen.getByRole('alert')).toBeInTheDocument();

    rerender(<Audio messages={enUiKitMessages.audio} {...response} locale={{ ...response.locale, fileLocation: '/new-lesson.mp3' }} />);
    expect(screen.queryByRole('alert')).toBeNull();
    expect(container.querySelector('audio')).toHaveAttribute('src', '/new-lesson.mp3');
  });

  it('uses the built-in English fallback without author overrides', () => {
    setOnline(true);
    const { container } = render(<Audio messages={enUiKitMessages.audio} {...response} locale={{ ...response.locale, fallback: undefined }} />);
    failAudio(container.querySelector('audio')!, 4);
    expect(screen.getByRole('alert')).toHaveTextContent('This audio is unavailable.');
    expect(screen.getByRole('button', { name: 'Try again' })).toBeVisible();
  });

  it('ignores media errors caused by an aborted load', () => {
    setOnline(true);
    const { container } = render(<Audio messages={enUiKitMessages.audio} {...response} />);
    failAudio(container.querySelector('audio')!, 1);
    expect(screen.queryByRole('alert')).toBeNull();
    expect(container.querySelector('audio')).toBeInTheDocument();
  });
});

describe('Waveform audio player', () => {
  it('shows accessible playback, seeking, volume and speed controls without message metadata', () => {
    const { container } = render(<Audio messages={enUiKitMessages.audio} {...response} />);
    expect(container.querySelector('audio')).toHaveAttribute('preload', 'metadata');
    expect(container.querySelector('audio')).not.toHaveAttribute('controls');
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Playback position' })).toBeDisabled();
    expect(screen.getByRole('slider', { name: 'Volume' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Playback speed' })).toHaveValue('1');
    expect(screen.getByLabelText('English')).toBeInTheDocument();
    expect(screen.getByText(/00:00.*00:00/)).toBeInTheDocument();
  });

  it('seeks by time and synchronizes play, pause, volume and speed with the media element', () => {
    const { container } = render(<Audio messages={enUiKitMessages.audio} {...response} />);
    const media = container.querySelector('audio')!;
    const play = vi.spyOn(media, 'play').mockResolvedValue(undefined);
    const pause = vi.spyOn(media, 'pause').mockImplementation(() => {});
    Object.defineProperty(media, 'duration', { configurable: true, value: 135 });

    fireEvent.loadedMetadata(media);
    expect(screen.getByText(/00:00.*02:15/)).toBeInTheDocument();
    fireEvent.change(screen.getByRole('slider', { name: 'Playback position' }), { target: { value: '42' } });
    expect(media.currentTime).toBe(42);
    expect(screen.getByText(/00:42.*02:15/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    expect(play).toHaveBeenCalledOnce();
    fireEvent.play(media);
    fireEvent.click(screen.getByRole('button', { name: 'Pause' }));
    expect(pause).toHaveBeenCalledOnce();

    fireEvent.change(screen.getByRole('slider', { name: 'Volume' }), { target: { value: '0.4' } });
    expect(media.volume).toBeCloseTo(0.4);
    fireEvent.click(screen.getByRole('button', { name: 'Mute' }));
    expect(media.muted).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Unmute' }));
    expect(media.muted).toBe(false);

    fireEvent.change(screen.getByRole('combobox', { name: 'Playback speed' }), { target: { value: '1.5' } });
    expect(media.playbackRate).toBe(1.5);
  });

  it('restores sound from zero volume and honors RTL lesson direction', () => {
    const { container } = render(
      <ContentLanguageContext.Provider value="ar">
        <Audio messages={enUiKitMessages.audio} {...response} />
      </ContentLanguageContext.Provider>,
    );
    expect(container.querySelector('figure')).toHaveAttribute('dir', 'rtl');
    expect(screen.getByLabelText('العربية')).toBeInTheDocument();

    const media = container.querySelector('audio')!;
    fireEvent.change(screen.getByRole('slider', { name: 'Volume' }), { target: { value: '0' } });
    expect(media.volume).toBe(0);
    fireEvent.click(screen.getByRole('button', { name: 'Unmute' }));
    expect(media.volume).toBe(1);
    expect(media.muted).toBe(false);
  });

  it('resets stale timestamps when the source changes', () => {
    const { container, rerender } = render(<Audio messages={enUiKitMessages.audio} {...response} />);
    const media = container.querySelector('audio')!;
    Object.defineProperty(media, 'duration', { configurable: true, value: 120 });
    fireEvent.loadedMetadata(media);
    fireEvent.timeUpdate(Object.assign(media, { currentTime: 60 }));
    expect(screen.getByText(/01:00.*02:00/)).toBeInTheDocument();

    rerender(<Audio messages={enUiKitMessages.audio} {...response} locale={{ ...response.locale, fileLocation: '/another.mp3' }} />);
    expect(screen.getByText(/00:00.*00:00/)).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Playback position' })).toBeDisabled();
  });
});

describe('Audio time formatting', () => {
  it('handles unknown, short and long media durations', () => {
    expect(formatAudioTime(Infinity)).toBe('00:00');
    expect(formatAudioTime(-1)).toBe('00:00');
    expect(formatAudioTime(12.9)).toBe('00:12');
    expect(formatAudioTime(135)).toBe('02:15');
    expect(formatAudioTime(3661)).toBe('1:01:01');
  });
});
