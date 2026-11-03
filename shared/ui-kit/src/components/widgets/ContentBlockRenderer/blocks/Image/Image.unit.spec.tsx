import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import type { ContentBlock_Image_Response } from '@svitlo/engine/content';
import { Image } from './Image';

const response: ContentBlock_Image_Response = {
  id: 'image-1',
  type: 'image',
  locale: { code: 'uk' },
  src: '/diagram.png',
  alt: 'Схема руху світла',
  caption: 'Напрямок променя',
  width: 800,
  height: 450,
  fallback: {
    offline: 'Зображення не збережено офлайн',
    unavailable: 'Зображення не знайдено',
    retry: 'Повторити',
  },
};

const originalOnline = Object.getOwnPropertyDescriptor(Navigator.prototype, 'onLine');

function setOnline(value: boolean) {
  Object.defineProperty(Navigator.prototype, 'onLine', { configurable: true, get: () => value });
}

afterEach(() => {
  if (originalOnline) Object.defineProperty(Navigator.prototype, 'onLine', originalOnline);
});

describe('Image content block', () => {
  it('renders a responsive Next image with authored intrinsic dimensions', () => {
    setOnline(true);
    render(<Image {...response} />);
    const image = screen.getByAltText('Схема руху світла');
    expect(image).toHaveAttribute('width', '800');
    expect(image).toHaveAttribute('height', '450');
    expect(image.getAttribute('src')).toContain('diagram.png');
    expect(image.closest('figure')).toHaveAttribute('lang', 'uk-UA');
    expect(screen.getByText('Напрямок променя').tagName).toBe('FIGCAPTION');
  });

  it('preserves external image URLs unless their host is configured for optimization', () => {
    setOnline(true);
    render(<Image {...response} src="https://cdn.example.com/diagram.png" />);
    expect(screen.getByAltText('Схема руху світла')).toHaveAttribute('src', 'https://cdn.example.com/diagram.png');
  });

  it('renders fill mode within an aspect-ratio container', () => {
    setOnline(true);
    const fillResponse: ContentBlock_Image_Response = {
      id: response.id,
      type: 'image',
      locale: response.locale,
      src: response.src,
      alt: response.alt,
      fill: true,
      aspectRatio: 16 / 9,
      objectFit: 'cover',
    };
    render(<Image {...fillResponse} />);
    const image = screen.getByAltText('Схема руху світла');
    expect(image).not.toHaveAttribute('width');
    expect(image).toHaveStyle({ objectFit: 'cover' });
    expect(image.parentElement).toHaveStyle({ position: 'relative', aspectRatio: `${16 / 9}` });
  });

  it('attempts a cached image offline before showing the fallback', () => {
    setOnline(false);
    render(<Image {...response} />);
    const image = screen.getByAltText('Схема руху світла');
    expect(image).toBeInTheDocument();
    fireEvent.error(image);
    expect(screen.getByRole('alert')).toHaveTextContent('Зображення не збережено офлайн');
    expect(screen.queryByAltText('Схема руху світла')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Повторити' }));
    expect(screen.getByAltText('Схема руху світла')).toBeInTheDocument();
  });

  it('shows the unavailable fallback when loading fails online', () => {
    setOnline(true);
    render(<Image {...response} />);
    fireEvent.error(screen.getByAltText('Схема руху світла'));
    expect(screen.getByRole('alert')).toHaveTextContent('Зображення не знайдено');
  });
});


describe('Image fallback lifecycle', () => {
  it('retries an offline failure automatically when the connection returns', () => {
    setOnline(false);
    render(<Image {...response} />);
    fireEvent.error(screen.getByAltText('Схема руху світла'));
    expect(screen.getByRole('alert')).toHaveTextContent('Зображення не збережено офлайн');

    setOnline(true);
    fireEvent(window, new Event('online'));
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.getByAltText('Схема руху світла')).toBeInTheDocument();
  });

  it('does not carry a failed state across image source changes', () => {
    setOnline(true);
    const { rerender } = render(<Image {...response} />);
    fireEvent.error(screen.getByAltText('Схема руху світла'));
    expect(screen.getByRole('alert')).toBeInTheDocument();

    rerender(<Image {...response} src="/alternate-diagram.png" />);
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.getByAltText('Схема руху світла').getAttribute('src')).toContain('alternate-diagram.png');
  });

  it('uses its built-in fallback when localized overrides are absent', () => {
    setOnline(true);
    render(<Image {...response} locale={{ code: 'en' }} fallback={undefined} />);
    fireEvent.error(screen.getByAltText('Схема руху світла'));
    expect(screen.getByRole('alert')).toHaveTextContent('This image is unavailable.');
    expect(screen.getByRole('button', { name: 'Try again' })).toBeVisible();
  });
});
