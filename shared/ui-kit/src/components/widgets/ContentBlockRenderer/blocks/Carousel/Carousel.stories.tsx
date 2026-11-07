import type { Meta, StoryObj } from '@storybook/nextjs';
import { Carousel } from './Carousel';
import { enUiKitMessages } from '../../../../../testing/uiKitMessages.unit.fx';

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

const slides = [
  {
    src: illustration('#e8f4ff', '#ffcf74', '#85c2ae'),
    alt: 'Sunlit hills beneath a blue sky',
    caption: 'Slide 1 · The morning sky',
  },
  {
    src: illustration('#fee7dd', '#fb9195', '#9980b8'),
    alt: 'A pink sunset over purple hills',
    caption: 'Slide 2 · Sunset',
  },
  {
    src: illustration('#24345e', '#d5d9f9', '#416788'),
    alt: 'The moon over dark blue hills',
    caption: 'Slide 3 · Night',
  },
] as const;

const meta = {
  title: 'Content blocks/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  args: {
    id: 'carousel-story',
    type: 'carousel',
    title: 'Light throughout the day',
    slides,
    messages: enUiKitMessages,
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
  argTypes: {
    id: { control: false },
    type: { control: false },
    messages: { control: false },
    slides: { control: 'object' },
    transition: { control: 'radio', options: ['slide', 'fade'] },
    objectFit: { control: 'radio', options: ['cover', 'contain'] },
    autoplayIntervalMs: { control: { type: 'number', min: 1500, step: 500 } },
    transitionDurationMs: { control: { type: 'number', min: 0, max: 1500, step: 50 } },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const FadeAutoplay: Story = { args: { transition: 'fade', autoplay: true, autoplayIntervalMs: 3000 } };
export const Finite: Story = { args: { loop: false, startIndex: 2 } };
export const Contain: Story = { args: { objectFit: 'contain', aspectRatio: 4 / 3, allowFullscreen: false } };
