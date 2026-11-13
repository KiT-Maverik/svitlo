import { enUiKitMessages } from '../../../../../testing/uiKitMessages.unit.fx';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import type { ContentBlock_Youtube_Response } from '+@svitlo/contracts/content';
import { Youtube } from './Youtube';
import { youtubeEmbedUrl, youtubeVideoId } from './Youtube.utils';

const response: ContentBlock_Youtube_Response = {
  id: 'youtube-1',
  type: 'youtube',
  mode: 'embed',

  href: 'https://youtu.be/M7lc1UVf-VE',
  title: 'Назва блоку',
  label: 'Приклад відео',
  fallback: {
    offline: 'Немає з’єднання',
    unavailable: 'Відео не відтворюється',
    retry: 'Повторити',
  },
};

const originalOnline = Object.getOwnPropertyDescriptor(Navigator.prototype, 'onLine');

function setOnline(value: boolean) {
  Object.defineProperty(Navigator.prototype, 'onLine', { configurable: true, get: () => value });
  window.dispatchEvent(new Event(value ? 'online' : 'offline'));
}

afterEach(() => {
  if (originalOnline) Object.defineProperty(Navigator.prototype, 'onLine', originalOnline);
  delete window.YT;
});

describe('YouTube content block', () => {
  it('shows the offline placeholder without creating an iframe', () => {
    setOnline(false);
    const { container } = render(<Youtube messages={enUiKitMessages.youtube} {...response} />);
    expect(screen.getByRole('status')).toHaveTextContent('Немає з’єднання');
    expect(container.querySelector('iframe')).toBeNull();
  });

  it('shows a link only while online', () => {
    setOnline(false);
    const linkResponse: ContentBlock_Youtube_Response = { ...response, mode: 'link' };
    render(<Youtube messages={enUiKitMessages.youtube} {...linkResponse} />);
    expect(screen.queryByRole('link')).toBeNull();
    expect(screen.getByRole('status')).toHaveTextContent('Немає з’єднання');

    act(() => setOnline(true));
    expect(screen.getByRole('link', { name: 'Приклад відео' })).toHaveAttribute('href', response.href);
  });

  it('shows the unavailable placeholder when the YouTube player reports an error', async () => {
    setOnline(true);
    let reportError: ((event: { data: number }) => void) | undefined;
    window.YT = {
      Player: class {
        constructor(
          _iframe: HTMLIFrameElement,
          options: { events: { onReady: () => void; onError: (event: { data: number }) => void } },
        ) {
          reportError = options.events.onError;
          options.events.onReady();
        }
        destroy() {}
      },
    };

    const { container } = render(<Youtube messages={enUiKitMessages.youtube} {...response} />);
    await waitFor(() => expect(reportError).toBeTypeOf('function'));
    expect(container.querySelector('iframe')).toHaveAttribute('title', 'Приклад відео');

    act(() => reportError?.({ data: 100 }));
    expect(screen.getByRole('status')).toHaveTextContent('Відео не відтворюється');
    expect(screen.getByRole('button', { name: 'Повторити' })).toBeVisible();
    expect(container.querySelector('iframe')).toBeNull();
  });

  it('accepts only supported HTTPS video links', () => {
    expect(youtubeVideoId('https://www.youtube.com/watch?v=M7lc1UVf-VE')).toBe('M7lc1UVf-VE');
    expect(youtubeEmbedUrl('https://youtu.be/M7lc1UVf-VE')).toBe('https://www.youtube-nocookie.com/embed/M7lc1UVf-VE');
    expect(() => youtubeVideoId('https://example.com/watch?v=M7lc1UVf-VE')).toThrow();
    expect(() => youtubeVideoId('http://youtu.be/M7lc1UVf-VE')).toThrow();
  });
});

describe('YouTube links, validation, and retry', () => {
  it('opens external links safely and uses the label without a visible title', () => {
    setOnline(true);
    render(
      <Youtube
        messages={enUiKitMessages.youtube}
        {...response}
        mode="link"
        title={undefined}
        label="Watch the example"
      />,
    );
    const link = screen.getByRole('link', { name: 'Watch the example' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveAttribute('href', response.href);
  });

  it('keeps the block title separate from the link text', () => {
    setOnline(true);
    render(<Youtube messages={enUiKitMessages.youtube} {...response} mode="link" />);
    expect(screen.getByRole('link', { name: 'Приклад відео' })).toBeInTheDocument();
    expect(screen.getByText('Назва блоку')).toBeInTheDocument();
  });

  it('accepts watch, shorts and embed paths but rejects invalid identifiers', () => {
    expect(youtubeVideoId('https://youtube.com/shorts/M7lc1UVf-VE')).toBe('M7lc1UVf-VE');
    expect(youtubeVideoId('https://www.youtube-nocookie.com/embed/M7lc1UVf-VE')).toBe('M7lc1UVf-VE');
    expect(() => youtubeVideoId('https://youtu.be/short')).toThrow('Unsupported YouTube video identifier');
    expect(() => youtubeVideoId('https://youtube.com.evil.example/watch?v=M7lc1UVf-VE')).toThrow();
  });

  it('can retry an embed after the player reports an error', async () => {
    setOnline(true);
    let reportError: ((event: { data: number }) => void) | undefined;
    let playerCount = 0;
    let destroyedCount = 0;
    window.YT = {
      Player: class {
        constructor(
          _iframe: HTMLIFrameElement,
          options: { events: { onReady: () => void; onError: (event: { data: number }) => void } },
        ) {
          playerCount += 1;
          reportError = options.events.onError;
          options.events.onReady();
        }
        destroy() {
          destroyedCount += 1;
        }
      },
    };
    const { container } = render(<Youtube messages={enUiKitMessages.youtube} {...response} />);
    await waitFor(() => expect(playerCount).toBe(1));

    act(() => reportError?.({ data: 100 }));
    expect(screen.getByRole('status')).toHaveTextContent('Відео не відтворюється');
    fireEvent.click(screen.getByRole('button', { name: 'Повторити' }));

    await waitFor(() => expect(playerCount).toBe(2));
    expect(container.querySelector('iframe')).toHaveAttribute('title', 'Приклад відео');
    expect(destroyedCount).toBeGreaterThan(0);
  });
});
