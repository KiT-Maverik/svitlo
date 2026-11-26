import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import type { ContentBlock_Carousel_SlideProps, ContentBlock_Scene_Props } from '@svitlo/engine/runtime';

import { enUiKitMessages } from '../../../../../testing/uiKitMessages.unit.fx';
import { Carousel } from './Carousel';

function illustration(sky: string, center: string, accent: string) {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540">' +
    '<rect width="960" height="540" fill="' +
    sky +
    '"/>' +
    '<circle cx="480" cy="240" r="125" fill="' +
    center +
    '"/>' +
    '<path d="M0 470 Q230 300 480 445 T960 430 V540 H0Z" fill="' +
    accent +
    '"/>' +
    '</svg>';
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

const slides: ContentBlock_Carousel_SlideProps[] = [
  {
    id: 'story-morning',
    slug: 'morning',
    type: 'image',
    params: { fill: true, aspectRatio: 16 / 9 },
    locale: {
      src: illustration('#e8f4ff', '#ffcf74', '#85c2ae'),
      alt: 'Sunlit hills beneath a blue sky',
      caption: 'Slide 1 · The morning sky',
    },
  },
  {
    id: 'story-sunset',
    slug: 'sunset',
    type: 'image',
    params: { fill: true, aspectRatio: 16 / 9 },
    locale: {
      src: illustration('#fee7dd', '#fb9195', '#9980b8'),
      alt: 'A pink sunset over purple hills',
      caption: 'Slide 2 · Sunset',
    },
  },
  {
    id: 'story-night',
    slug: 'night',
    type: 'image',
    params: { fill: true, aspectRatio: 16 / 9 },
    locale: {
      src: illustration('#24345e', '#d5d9f9', '#416788'),
      alt: 'The moon over dark blue hills',
      caption: 'Slide 3 · Night',
    },
  },
];

function InteractiveDemo({ locales }: { locales: ContentBlock_Scene_Props['locale']['value'] }) {
  const [attempts, setAttempts] = useState(0);
  return (
    <div style={{ padding: '2rem', minHeight: '100%' }}>
      <p>{typeof locales === 'string' ? locales : 'Try the interaction'}</p>
      <button type="button" onClick={() => setAttempts(value => value + 1)}>
        Interact ({attempts})
      </button>
    </div>
  );
}

const meta = {
  title: 'Content blocks/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  args: {
    id: 'carousel-story',
    slug: 'carouselStory',
    type: 'carousel',
    locale: { title: 'Light throughout the day', slides },
    messages: enUiKitMessages,
    params: {
      transition: 'slide',
      transitionDurationMs: 450,
      autoplay: false,
      autoplayIntervalMs: 5000,
      loop: true,
      aspectRatio: 16 / 9,
      objectFit: 'cover',
      showArrows: true,
      showIndicators: true,
      allowFullscreen: true,
      allowSwipe: true,
      pauseOnHover: true,
      startIndex: 0,
    },
  },
  argTypes: {
    id: { control: false },
    slug: { control: false },
    type: { control: false },
    messages: { control: false },
    sceneRegistry: { control: false },
    locale: { control: 'object' },
    params: { control: 'object' },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const FadeAutoplay: Story = {
  args: { params: { ...meta.args.params, transition: 'fade', autoplay: true, autoplayIntervalMs: 3000 } },
};

export const Finite: Story = {
  args: { params: { ...meta.args.params, loop: false, startIndex: 2 } },
};

export const Contain: Story = {
  args: { params: { ...meta.args.params, objectFit: 'contain', aspectRatio: 4 / 3, allowFullscreen: false } },
};

/** Demonstrates real registry dispatch with a working interactive component. */
export const InteractiveScene: Story = {
  args: {
    locale: {
      title: 'Interactive and illustrated slides',
      slides: [
        slides[0],
        {
          id: 'story-interactive',
          slug: 'interactive',
          type: 'scene',
          params: {},
          locale: { value: 'Try the Scene interaction' },
        },
      ],
    },
    sceneRegistry: id => (id === 'story-interactive' ? InteractiveDemo : undefined),
    params: { ...meta.args.params, autoplay: true, autoplayIntervalMs: 2000 },
  },
};
