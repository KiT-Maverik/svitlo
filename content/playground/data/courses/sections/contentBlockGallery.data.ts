import { createSection, createContentBlock } from '@svitlo/engine/builders';
import type { HowLightMoves_Languages } from '../../lessons/c/d3048d21-8690-5255-b62c-984c69ac272c/constants';
import { lightRayDiagramData } from '../../lessons/c/d3048d21-8690-5255-b62c-984c69ac272c/sections/theory/scenes/lightRayDiagram';

/**
 * Course-only content fixture. It demonstrates every ContentBlock renderer in
 * the actual Lesson UI without changing the standalone How Light Moves Lesson.
 * As with the existing demo Course, example prose is English-only test copy;
 * this fixture is not localized instructional material.
 */
export const contentBlockGallery_Creator = createSection<HowLightMoves_Languages>()({
  id: '4b60ac47-8d6e-55f1-8aaa-641abe18550d',
  slug: 'contentBlockGallery' as const,
  type: 'learningFlow',
  title: 'Content blocks · gallery',
  navigationLabel: 'Content blocks',
  skippable: true,
  content: [
    createContentBlock<HowLightMoves_Languages>()({
      id: 'playground-gallery-text',
      slug: 'plainText',
      type: 'text',
      value: 'TEXT · A short, plain-text content block, rendered by the shared UI Kit.',
    }),
    createContentBlock<HowLightMoves_Languages>()({
      id: 'playground-gallery-markdown',
      slug: 'formattedMarkdown',
      type: 'markdown',
      locales:
        '## Markdown\n\nThis block shows **bold**, *italic* and `inline code`.\n\n- First item\n- Second item\n\n> A short quotation.',
    }),
    createContentBlock<HowLightMoves_Languages>()({
      id: 'playground-gallery-code',
      slug: 'highlightedCode',
      type: 'code',
      title: 'CODE · TypeScript',
      language: 'typescript',
      code: 'const lesson = { topic: "light", speed: 299_792_458 };\nconsole.log(lesson.topic);',
    }),
    createContentBlock<HowLightMoves_Languages>()({
      id: 'playground-gallery-image',
      slug: 'localImage',
      type: 'image',
      src: '/textbooks/playground/whale.png',
      alt: 'A cartoon whale used as the Playground image demo.',
      caption: 'IMAGE · A locally published PNG with alternative text and a caption.',
      fill: true,
      aspectRatio: 16 / 9,
      objectFit: 'contain',
    }),
    createContentBlock<HowLightMoves_Languages>()({
      id: 'playground-gallery-carousel',
      slug: 'localCarousel',
      type: 'carousel',
      title: 'CAROUSEL · Interactive image gallery',
      aspectRatio: 16 / 9,
      objectFit: 'contain',
      loop: true,
      transition: 'slide',
      autoplay: false,
      allowFullscreen: true,
      slides: [
        {
          src: '/textbooks/playground/whale.png',
          alt: 'A friendly cartoon whale on a light background.',
          caption: 'The Playground whale illustration.',
        },
        {
          src: '/textbooks/playground/carousel-light.svg',
          alt: 'A glowing yellow sun with light rays against a blue sky.',
          caption: 'An illustration of a light source.',
        },
        {
          src: '/textbooks/playground/carousel-prism.svg',
          alt: 'A triangular prism splitting a beam of white light into a rainbow.',
          caption: 'An illustration of light dispersion.',
        },
      ],
    }),
    createContentBlock<HowLightMoves_Languages>()({
      id: 'playground-gallery-video',
      slug: 'localVideo',
      type: 'video',
      fileLocation: '/textbooks/playground/barabaka.mp4',
      poster: '/textbooks/playground/whale.png',
      title: 'VIDEO · Locally published MP4',
    }),
    createContentBlock<HowLightMoves_Languages>()({
      id: 'playground-gallery-audio',
      slug: 'localAudio',
      type: 'audio',
      fileLocation: '/textbooks/playground/demo-tone.wav',
      title: 'AUDIO · Local demo tone',
      description: 'A short original test tone, used only to demonstrate audio playback.',
    }),
    createContentBlock<HowLightMoves_Languages>()({
      id: 'playground-gallery-youtube',
      slug: 'youtubeEmbed',
      type: 'youtube',
      mode: 'embed',
      href: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
      title: 'YOUTUBE · External embedded video',
      hint: 'Requires an internet connection; offline mode shows a fallback.',
    }),
    // Use an existing registered Scene so this course-only fixture needs no
    // separate Scene implementation or changes to the generated Scene registry.
    createContentBlock<HowLightMoves_Languages>()(lightRayDiagramData),
    createContentBlock<HowLightMoves_Languages>()({
      id: 'playground-gallery-checkpoint',
      slug: 'interactiveCheckpoint',
      type: 'checkpoint',
      title: 'CHECKPOINT · Expand and mark the answer',
      enableChecks: true,
      showIndices: true,
      items: [
        {
          question: 'How do I reveal this answer?',
          check: true,
          answer: [
            {
              id: 'playground-gallery-checkpoint-answer',
              slug: 'checkpointAnswer',
              type: 'text',
              value: 'Open the checkpoint row, then mark it complete.',
            },
          ],
        },
      ],
    }),
  ],
});

export const contentBlockGallery_Section = contentBlockGallery_Creator.getData();
