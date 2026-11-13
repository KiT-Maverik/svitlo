import {
  defineAudio,
  defineCarousel,
  defineCarouselSlide,
  defineCheckpoint,
  defineCheckpointItem,
  configuratorArrayToSlugMap,
  defineCode,
  defineImage,
  defineLearningFlowSection,
  defineMarkdown,
  defineText,
  defineVideo,
  defineYoutube,
} from '@svitlo/engine/build';
import { lightRayDiagram } from '../../lessons/c/d3048d21-8690-5255-b62c-984c69ac272c/sections/content/scenes/lightRayDiagram';

/** Playground gallery of all ten supported ContentBlock configurators. */
const plainText = defineText({
  id: '645e924a-de91-5fce-8bdc-095e9fd39c29',
  slug: 'plainText',
  type: 'text',
  params: {},
  locale: {
    value: 'TEXT · A short, plain-text content block, rendered by the shared UI Kit.',
  },
});

const formattedMarkdown = defineMarkdown({
  id: '816208c9-8875-5b86-869f-5ec6558372f0',
  slug: 'formattedMarkdown',
  type: 'markdown',
  params: {},
  locale: {
    value:
      '## Markdown\n\nThis block shows **bold**, *italic* and `inline code`.\n\n- First item\n- Second item\n\n> A short quotation.',
  },
});

const highlightedCode = defineCode({
  id: '3a6f684f-498a-5923-b97a-fdaa35e882f2',
  slug: 'highlightedCode',
  type: 'code',
  params: {
    language: 'typescript',
    codeAsText: 'const lesson = { topic: "light", speed: 299_792_458 };\nconsole.log(lesson.topic);',
  },
  locale: { title: 'CODE · TypeScript' },
});

const localImage = defineImage({
  id: '476a9257-6e4c-522a-b8fe-7adefd599e75',
  slug: 'localImage',
  type: 'image',
  params: { fill: true, aspectRatio: 16 / 9, objectFit: 'contain' },
  locale: {
    src: '/textbooks/playground/whale.png',
    alt: 'A cartoon whale used as the Playground image demo.',
    caption: 'IMAGE · A locally published PNG with alternative text and a caption.',
  },
});

const localCarousel = defineCarousel({
  id: '0afcf586-1e14-5583-a1c6-2bc8c7117e04',
  slug: 'localCarousel',
  type: 'carousel',
  params: {
    aspectRatio: 16 / 9,
    objectFit: 'contain',
    loop: true,
    transition: 'slide',
    autoplay: false,
    allowFullscreen: true,
  },
  locale: { title: 'CAROUSEL · Interactive image gallery' },
  slides: {
    items: {
      whale: defineCarouselSlide({
        id: '7cbc27a9-ed06-552b-a9e4-fb06d08e58cf',
        slug: 'whale',
        type: 'carouselSlide',
        locale: {
          src: '/textbooks/playground/whale.png',
          alt: 'A friendly cartoon whale on a light background.',
          caption: 'The Playground whale illustration.',
        },
      }),
      light: defineCarouselSlide({
        id: '1ee28a95-6c00-51c0-8c83-e4d1ddd09e02',
        slug: 'light',
        type: 'carouselSlide',
        locale: {
          src: '/textbooks/playground/carousel-light.svg',
          alt: 'A glowing yellow sun with light rays against a blue sky.',
          caption: 'An illustration of a light source.',
        },
      }),
      prism: defineCarouselSlide({
        id: '43f9c078-914c-57d5-9bc8-72a66483b1c6',
        slug: 'prism',
        type: 'carouselSlide',
        locale: {
          src: '/textbooks/playground/carousel-prism.svg',
          alt: 'A triangular prism splitting a beam of white light into a rainbow.',
          caption: 'An illustration of light dispersion.',
        },
      }),
    },
    order: ['whale', 'light', 'prism'],
  },
});

const localVideo = defineVideo({
  id: '885e2e35-0133-5642-a10b-ca49068d6ca0',
  slug: 'localVideo',
  type: 'video',
  params: {},
  locale: {
    fileLocation: '/textbooks/playground/barabaka.mp4',
    poster: '/textbooks/playground/whale.png',
    title: 'VIDEO · Locally published MP4',
    label: 'Local MP4 demonstration',
  },
});

const localAudio = defineAudio({
  id: 'c26e31ee-f158-5f2b-8c39-4c685ac95907',
  slug: 'localAudio',
  type: 'audio',
  params: {},
  locale: {
    fileLocation: '/textbooks/playground/demo-tone.wav',
    title: 'AUDIO · Local demo tone',
    description: 'A short original test tone, used only to demonstrate audio playback.',
  },
});

const youtubeEmbed = defineYoutube({
  id: '0abfc5ae-03f5-5971-8811-967d7985fa71',
  slug: 'youtubeEmbed',
  type: 'youtube',
  params: { mode: 'embed' },
  locale: {
    href: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
    title: 'YOUTUBE · External embedded video',
    label: 'Embedded YouTube demonstration',
  },
});

const interactiveCheckpoint = defineCheckpoint({
  id: 'cd8762a1-7924-55d8-b2b6-90752c6b5e72',
  slug: 'interactiveCheckpoint',
  type: 'checkpoint',
  params: { enableChecks: true, showIndices: true },
  locale: { title: 'CHECKPOINT · Expand and mark the answer' },
  content: {
    items: configuratorArrayToSlugMap([
      defineCheckpointItem({
        id: '327be513-a21f-5d66-9bb1-7890c672de14',
        slug: 'revealAnswer',
        type: 'checkpointItem',
        question: defineText({
          id: 'bb5ec842-bd22-5dd4-9996-3d46765ce025',
          slug: 'revealQuestion',
          type: 'text',
          params: {},
          locale: { value: 'How do I reveal this answer?' },
        }),
        check: true,
        answer: {
          items: configuratorArrayToSlugMap([
            defineText({
              id: '3fe35315-ae2e-57bf-9fa7-ec8ce278852d',
              slug: 'checkpointAnswer',
              type: 'text',
              params: {},
              locale: { value: 'Open the checkpoint row, then mark it complete.' },
            }),
          ]),
          order: ['checkpointAnswer'],
        },
      }),
    ]),
    order: ['revealAnswer'],
  },
});

/** Complete authoring fixture for all ten ContentBlock types. */
export const contentBlockGallery = defineLearningFlowSection({
  id: '4b60ac47-8d6e-55f1-8aaa-641abe18550d',
  slug: 'contentBlockGallery',
  type: 'learningFlow',
  params: { skippable: true },
  locale: {
    title: 'Content blocks · gallery',
    navigationLabel: 'Content blocks',
  },
  content: {
    items: {
      plainText,
      formattedMarkdown,
      highlightedCode,
      localImage,
      localCarousel,
      localVideo,
      localAudio,
      youtubeEmbed,
      lightRayDiagram,
      interactiveCheckpoint,
    },
    order: [
      'plainText',
      'formattedMarkdown',
      'highlightedCode',
      'localImage',
      'localCarousel',
      'localVideo',
      'localAudio',
      'youtubeEmbed',
      'lightRayDiagram',
      'interactiveCheckpoint',
    ],
  },
});
