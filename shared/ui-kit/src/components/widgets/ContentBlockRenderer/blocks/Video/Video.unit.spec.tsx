import { enUiKitMessages } from '../../../../../testing/uiKitMessages.unit.fx';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import type { ContentBlock_Video_Response } from '@svitlo/contracts/content';
import { Video } from './Video';

const response: ContentBlock_Video_Response = {
  id: 'video-1',
  type: 'video',

  fileLocation: '/lesson.mp4',
  poster: '/poster.png',
  title: 'Приклад відео',
  fallback: {
    offline: 'Відео недоступне без мережі',
    unavailable: 'Відео не знайдено',
    playbackError: 'Помилка відтворення',
    retry: 'Повторити',
  },
};

const originalOnline = Object.getOwnPropertyDescriptor(Navigator.prototype, 'onLine');
const originalVideoError = Object.getOwnPropertyDescriptor(HTMLVideoElement.prototype, 'error');

function setOnline(value: boolean) {
  Object.defineProperty(Navigator.prototype, 'onLine', { configurable: true, get: () => value });
}

function failVideo(video: HTMLVideoElement, code: number) {
  Object.defineProperty(video, 'error', { configurable: true, value: { code } });
  fireEvent.error(video);
}

afterEach(() => {
  if (originalOnline) Object.defineProperty(Navigator.prototype, 'onLine', originalOnline);
  if (originalVideoError) Object.defineProperty(HTMLVideoElement.prototype, 'error', originalVideoError);
  else delete (HTMLVideoElement.prototype as { error?: MediaError | null }).error;
});

describe('Video content block', () => {
  it('keeps a potentially cached video available while offline, then shows a fallback if loading fails', () => {
    setOnline(false);
    const { container } = render(<Video messages={enUiKitMessages.video} {...response} />);
    const video = container.querySelector('video');
    expect(video).toHaveAttribute('src', '/lesson.mp4');
    expect(video).toHaveAttribute('poster', '/poster.png');

    fireEvent.stalled(video!);
    expect(screen.getByRole('alert')).toHaveTextContent('Відео недоступне без мережі');
    expect(container.querySelector('video')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Повторити' }));
    expect(container.querySelector('video')).not.toBeNull();
  });

  it('distinguishes an unavailable source from a decoding error', () => {
    setOnline(true);
    const { container, rerender } = render(<Video messages={enUiKitMessages.video} {...response} />);
    failVideo(container.querySelector('video')!, 4);
    expect(screen.getByRole('alert')).toHaveTextContent('Відео не знайдено');

    rerender(<Video messages={enUiKitMessages.video} {...response} fileLocation="/other.mp4" />);
    failVideo(container.querySelector('video')!, 3);
    expect(screen.getByRole('alert')).toHaveTextContent('Помилка відтворення');
  });

  it('detects a media error that happened before React attached the error handler', () => {
    setOnline(true);
    Object.defineProperty(HTMLVideoElement.prototype, 'error', { configurable: true, get: () => ({ code: 4 }) });
    render(<Video messages={enUiKitMessages.video} {...response} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Відео не знайдено');
  });
});

describe('Video fallback lifecycle', () => {
  it('automatically retries an offline waiting player when connectivity returns', () => {
    setOnline(false);
    const { container } = render(<Video messages={enUiKitMessages.video} {...response} />);
    fireEvent.waiting(container.querySelector('video')!);
    expect(screen.getByRole('alert')).toHaveTextContent('Відео недоступне без мережі');

    setOnline(true);
    fireEvent(window, new Event('online'));
    expect(screen.queryByRole('alert')).toBeNull();
    expect(container.querySelector('video')).toHaveAttribute('src', '/lesson.mp4');
  });

  it('discards a previous source failure after changing the file location', () => {
    setOnline(true);
    const { container, rerender } = render(<Video messages={enUiKitMessages.video} {...response} />);
    failVideo(container.querySelector('video')!, 4);
    expect(screen.getByRole('alert')).toBeInTheDocument();

    rerender(<Video messages={enUiKitMessages.video} {...response} fileLocation="/another.mp4" />);
    expect(screen.queryByRole('alert')).toBeNull();
    expect(container.querySelector('video')).toHaveAttribute('src', '/another.mp4');
  });

  it('shows default English fallback copy when no custom fallback exists', () => {
    setOnline(true);
    const { container } = render(<Video messages={enUiKitMessages.video} {...response} fallback={undefined} />);
    failVideo(container.querySelector('video')!, 4);
    expect(screen.getByRole('alert')).toHaveTextContent('This video is unavailable.');
    expect(screen.getByRole('button', { name: 'Try again' })).toBeVisible();
  });

  it('ignores errors from an aborted video request', () => {
    setOnline(true);
    const { container } = render(<Video messages={enUiKitMessages.video} {...response} />);
    failVideo(container.querySelector('video')!, 1);
    expect(screen.queryByRole('alert')).toBeNull();
  });
});
