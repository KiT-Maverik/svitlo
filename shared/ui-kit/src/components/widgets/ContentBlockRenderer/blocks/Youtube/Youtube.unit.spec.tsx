import { act, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import type { ContentBlockResponse } from '../../types';
import { ContentBlock_Youtube } from './Youtube';
import { youtubeEmbedUrl, youtubeVideoId } from './Youtube.utils';

const response: ContentBlockResponse<'youtube'> = {
  id: 'youtube-1',
  type: 'youtube',
  mode: 'embed',
  locale: { code: 'uk' },
  href: 'https://youtu.be/M7lc1UVf-VE',
  title: 'Приклад відео',
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
    const { container } = render(<ContentBlock_Youtube response={response} />);
    expect(screen.getByRole('status')).toHaveTextContent('Немає з’єднання');
    expect(container.querySelector('iframe')).toBeNull();
  });

  it('shows a link only while online', () => {
    setOnline(false);
    const linkResponse: ContentBlockResponse<'youtube'> = { ...response, mode: 'link' };
    render(<ContentBlock_Youtube response={linkResponse} />);
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
        constructor(_iframe: HTMLIFrameElement, options: { events: { onReady: () => void; onError: (event: { data: number }) => void } }) {
          reportError = options.events.onError;
          options.events.onReady();
        }
        destroy() {}
      },
    };

    const { container } = render(<ContentBlock_Youtube response={response} />);
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
