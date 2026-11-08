import { enUiKitMessages } from '../../../../../testing/uiKitMessages.unit.fx';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import type { ContentBlock_Image_Response } from '@svitlo/contracts/content';
import { Image } from './Image';
import { ImageRendererProvider, type ImageRendererProps } from './ImageRenderer';
import { ContentLanguageContext } from '../../ContentLanguageContext';

const response: ContentBlock_Image_Response = {
  id: 'image-1',
  type: 'image',

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
  it('accepts an injected host image renderer without importing a framework', () => {
    let wasUnoptimized: boolean | undefined;
    function HostImage({ unoptimized, fill: _fill, ...attrs }: ImageRendererProps) {
      wasUnoptimized = unoptimized;
      return <img data-testid="injected-image" {...attrs} />;
    }
    render(
      <ImageRendererProvider renderer={HostImage}>
        <Image messages={enUiKitMessages.image} {...response} />
      </ImageRendererProvider>,
    );
    expect(screen.getByTestId('injected-image')).toHaveAttribute('src', '/diagram.png');
    expect(wasUnoptimized).toBe(false);
  });

  it('renders a responsive native image with authored intrinsic dimensions', () => {
    setOnline(true);
    render(
      <ContentLanguageContext.Provider value="uk">
        <Image messages={enUiKitMessages.image} {...response} />
      </ContentLanguageContext.Provider>,
    );
    const image = screen.getByAltText('Схема руху світла');
    expect(image).toHaveAttribute('width', '800');
    expect(image).toHaveAttribute('height', '450');
    expect(image.getAttribute('src')).toContain('diagram.png');
    expect(image.closest('figure')).toHaveAttribute('lang', 'uk-UA');
    expect(screen.getByText('Напрямок променя').tagName).toBe('FIGCAPTION');
  });

  it('preserves external image URLs unless their host is configured for optimization', () => {
    setOnline(true);
    render(<Image messages={enUiKitMessages.image} {...response} src="https://cdn.example.com/diagram.png" />);
    expect(screen.getByAltText('Схема руху світла')).toHaveAttribute('src', 'https://cdn.example.com/diagram.png');
  });

  it('renders fill mode within an aspect-ratio container', () => {
    setOnline(true);
    const fillResponse: ContentBlock_Image_Response = {
      id: response.id,
      type: 'image',
      src: response.src,
      alt: response.alt,
      fill: true,
      aspectRatio: 16 / 9,
      objectFit: 'cover',
    };
    render(<Image messages={enUiKitMessages.image} {...fillResponse} />);
    const image = screen.getByAltText('Схема руху світла');
    expect(image).not.toHaveAttribute('width');
    expect(image).toHaveStyle({ objectFit: 'cover' });
    expect(image.parentElement).toHaveStyle({ position: 'relative', aspectRatio: `${16 / 9}` });
  });

  it('attempts a cached image offline before showing the fallback', () => {
    setOnline(false);
    render(<Image messages={enUiKitMessages.image} {...response} />);
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
    render(<Image messages={enUiKitMessages.image} {...response} />);
    fireEvent.error(screen.getByAltText('Схема руху світла'));
    expect(screen.getByRole('alert')).toHaveTextContent('Зображення не знайдено');
  });
});

describe('Image fallback lifecycle', () => {
  it('retries an offline failure automatically when the connection returns', () => {
    setOnline(false);
    render(<Image messages={enUiKitMessages.image} {...response} />);
    fireEvent.error(screen.getByAltText('Схема руху світла'));
    expect(screen.getByRole('alert')).toHaveTextContent('Зображення не збережено офлайн');

    setOnline(true);
    fireEvent(window, new Event('online'));
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.getByAltText('Схема руху світла')).toBeInTheDocument();
  });

  it('does not carry a failed state across image source changes', () => {
    setOnline(true);
    const { rerender } = render(<Image messages={enUiKitMessages.image} {...response} />);
    fireEvent.error(screen.getByAltText('Схема руху світла'));
    expect(screen.getByRole('alert')).toBeInTheDocument();

    rerender(<Image messages={enUiKitMessages.image} {...response} src="/alternate-diagram.png" />);
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.getByAltText('Схема руху світла').getAttribute('src')).toContain('alternate-diagram.png');
  });

  it('uses its built-in fallback when localized overrides are absent', () => {
    setOnline(true);
    render(<Image messages={enUiKitMessages.image} {...response} fallback={undefined} />);
    fireEvent.error(screen.getByAltText('Схема руху світла'));
    expect(screen.getByRole('alert')).toHaveTextContent('This image is unavailable.');
    expect(screen.getByRole('button', { name: 'Try again' })).toBeVisible();
  });
});
