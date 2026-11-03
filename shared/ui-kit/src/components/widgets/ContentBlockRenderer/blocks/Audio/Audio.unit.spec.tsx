import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import type { ContentBlock_Audio_Response } from '@svitlo/engine/content';
import { Audio } from './Audio';

const response: ContentBlock_Audio_Response = {
  id: 'audio-1',
  type: 'audio',
  locale: { code: 'uk' },
  fileLocation: '/lesson.mp3',
  title: 'Запис уроку',
  description: 'Прослухайте пояснення',
  fallback: {
    offline: 'Аудіо недоступне без мережі',
    unavailable: 'Аудіо не знайдено',
    playbackError: 'Помилка відтворення',
    retry: 'Повторити',
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
    const { container } = render(<Audio {...response} />);
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
    const { container, rerender } = render(<Audio {...response} />);
    failAudio(container.querySelector('audio')!, 4);
    expect(screen.getByRole('alert')).toHaveTextContent('Аудіо не знайдено');

    rerender(<Audio {...response} fileLocation="/other.mp3" />);
    failAudio(container.querySelector('audio')!, 3);
    expect(screen.getByRole('alert')).toHaveTextContent('Помилка відтворення');
  });

  it('detects a media error that happened before the handler was attached', () => {
    setOnline(true);
    Object.defineProperty(HTMLAudioElement.prototype, 'error', { configurable: true, get: () => ({ code: 4 }) });
    render(<Audio {...response} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Аудіо не знайдено');
  });
});


describe('Audio fallback lifecycle', () => {
  it('automatically retries an offline stalled player when connectivity returns', () => {
    setOnline(false);
    const { container } = render(<Audio {...response} />);
    fireEvent.waiting(container.querySelector('audio')!);
    expect(screen.getByRole('alert')).toHaveTextContent('Аудіо недоступне без мережі');

    setOnline(true);
    fireEvent(window, new Event('online'));
    expect(screen.queryByRole('alert')).toBeNull();
    expect(container.querySelector('audio')).toHaveAttribute('src', '/lesson.mp3');
  });

  it('does not retain an unavailable fallback when the source changes', () => {
    setOnline(true);
    const { container, rerender } = render(<Audio {...response} />);
    failAudio(container.querySelector('audio')!, 4);
    expect(screen.getByRole('alert')).toBeInTheDocument();

    rerender(<Audio {...response} fileLocation="/new-lesson.mp3" />);
    expect(screen.queryByRole('alert')).toBeNull();
    expect(container.querySelector('audio')).toHaveAttribute('src', '/new-lesson.mp3');
  });

  it('uses the built-in English fallback without author overrides', () => {
    setOnline(true);
    const { container } = render(<Audio {...response} locale={{ code: 'en' }} fallback={undefined} />);
    failAudio(container.querySelector('audio')!, 4);
    expect(screen.getByRole('alert')).toHaveTextContent('This audio is unavailable.');
    expect(screen.getByRole('button', { name: 'Try again' })).toBeVisible();
  });

  it('ignores media errors caused by an aborted load', () => {
    setOnline(true);
    const { container } = render(<Audio {...response} />);
    failAudio(container.querySelector('audio')!, 1);
    expect(screen.queryByRole('alert')).toBeNull();
    expect(container.querySelector('audio')).toBeInTheDocument();
  });
});
