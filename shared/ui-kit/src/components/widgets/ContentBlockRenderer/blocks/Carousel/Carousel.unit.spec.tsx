import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ContentBlock_Carousel_Props } from '@svitlo/engine/runtime';
import { ContentBlockRenderer } from '../../ContentBlockRenderer';
import { enUiKitMessages } from '../../../../../testing/uiKitMessages.unit.fx';

const gallery: ContentBlock_Carousel_Props = {
  id: 'gallery',
  slug: 'gallery',
  type: 'carousel',
  params: {},
  locale: {
    title: 'Gallery',
    slides: [
      { src: '/one.png', alt: 'First image', caption: 'First caption' },
      { src: '/two.png', alt: 'Second image' },
      { src: '/three.png', alt: 'Third image' },
    ],
  },
};

function show(block: ContentBlock_Carousel_Props, language: 'en' | 'ar' = 'en') {
  return render(<ContentBlockRenderer language={language} messages={enUiKitMessages} blocks={[block]} />);
}

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('carousel content block', () => {
  it('dispatches a tagged carousel, shows active caption, and navigates using arrows and indicators', () => {
    show(gallery);
    const region = screen.getByRole('region', { name: 'Gallery' });
    expect(region).toHaveAttribute('lang', 'en-US');
    expect(screen.getByRole('img', { name: 'First image' })).toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('img', { name: 'Second image' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Second image' })).toHaveAttribute('aria-current', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Third image' }));
    expect(screen.getByRole('img', { name: 'Third image' })).toBeVisible();
  });

  it('supports loop and disables boundary arrows in finite mode', () => {
    const { rerender } = show({ ...gallery, params: { ...gallery.params, startIndex: 2 } });
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('img', { name: 'First image' })).toBeVisible();

    rerender(<ContentBlockRenderer messages={enUiKitMessages} blocks={[{ ...gallery, params: { ...gallery.params, loop: false } }]} />);
    expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('accepts keyboard navigation and respects RTL direction', () => {
    show({ ...gallery, params: { ...gallery.params, showArrows: false } }, 'ar');
    const region = screen.getByRole('region', { name: 'Gallery' });
    expect(region).toHaveAttribute('dir', 'rtl');
    region.focus();
    fireEvent.keyDown(region, { key: 'ArrowLeft' });
    expect(screen.getByRole('img', { name: 'Second image' })).toBeVisible();
    fireEvent.keyDown(region, { key: 'End' });
    expect(screen.getByRole('img', { name: 'Third image' })).toBeVisible();
  });

  it('autoplays on a timer and supports explicit pause and resume', () => {
    vi.useFakeTimers();
    show({ ...gallery, params: { ...gallery.params, autoplay: true, autoplayIntervalMs: 1600 } });
    act(() => vi.advanceTimersByTime(1600));
    expect(screen.getByRole('img', { name: 'Second image' })).toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Pause slideshow' }));
    act(() => vi.advanceTimersByTime(3200));
    expect(screen.getByRole('img', { name: 'Second image' })).toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Play slideshow' }));
    act(() => vi.advanceTimersByTime(1600));
    expect(screen.getByRole('img', { name: 'Third image' })).toBeVisible();
  });

  it('does not display multi-slide controls for a single image', () => {
    show({ ...gallery, params: { ...gallery.params, autoplay: true }, locale: { ...gallery.locale, slides: [gallery.locale.slides[0]] } });
    expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Pause slideshow' })).not.toBeInTheDocument();
  });

  it('requests fullscreen through the DOM API when available', () => {
    const fullscreen = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(HTMLElement.prototype, 'requestFullscreen', { value: fullscreen, configurable: true });
    show(gallery);
    fireEvent.click(screen.getByRole('button', { name: 'Full screen' }));
    expect(fullscreen).toHaveBeenCalledOnce();
  });
});
