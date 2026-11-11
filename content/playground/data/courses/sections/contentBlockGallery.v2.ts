import {
  defineAudio,
  defineCarousel,
  defineCheckpoint,
  defineCode,
  defineImage,
  defineLearningFlowSection,
  defineMarkdown,
  defineScene,
  defineText,
  defineVideo,
  defineYoutube,
} from '@svitlo/engine';
import { lightRayDiagram } from '../../lessons/c/d3048d21-8690-5255-b62c-984c69ac272c/sections/theory/scenes/lightRayDiagram';

/**
 * Staged Playground fixture for the new define* authoring API.
 *
 * Do not insert this into the legacy Course yet: its publisher still expects
 * createCourse/getData objects, rather than nested configurators. Once the
 * publisher can assemble define* objects, replace contentBlockGallery.data.ts.
 *
 * UUIDv5 identifiers below replace the old non-UUID gallery block IDs.
 */
const legacySceneLocales = lightRayDiagram.locales;

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
    value: "## Markdown\n\nThis block shows **bold**, *italic* and `inline code`.\n\n- First item\n- Second item\n\n> A short quotation.",
  },
});

const highlightedCode = defineCode({
  id: '3a6f684f-498a-5923-b97a-fdaa35e882f2',
  slug: 'highlightedCode',
  type: 'code',
  params: {
    language: 'typescript',
    codeAsText: "const lesson = { topic: \"light\", speed: 299_792_458 };\nconsole.log(lesson.topic);",
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
  locale: {
    title: 'CAROUSEL · Interactive image gallery',
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

// Reuse the existing Scene translations, but express them as localized leaves
// rather than a language-keyed collection of entire Scene objects.
const lightRayDiagramScene = defineScene({
  id: '72d22bea-d787-4c6d-9a83-144830c6d325',
  slug: 'lightRayDiagram',
  type: 'scene',
  params: {},
  locale: {
    value: {
      scene: {
        title: {
            en: legacySceneLocales.en.scene.title,
            ar: legacySceneLocales.ar.scene.title,
            be: legacySceneLocales.be.scene.title,
            bn: legacySceneLocales.bn.scene.title,
            de: legacySceneLocales.de.scene.title,
            es: legacySceneLocales.es.scene.title,
            et: legacySceneLocales.et.scene.title,
            fr: legacySceneLocales.fr.scene.title,
            he: legacySceneLocales.he.scene.title,
            hi: legacySceneLocales.hi.scene.title,
            id: legacySceneLocales.id.scene.title,
            ja: legacySceneLocales.ja.scene.title,
            ka: legacySceneLocales.ka.scene.title,
            kk: legacySceneLocales.kk.scene.title,
            ko: legacySceneLocales.ko.scene.title,
            lt: legacySceneLocales.lt.scene.title,
            lv: legacySceneLocales.lv.scene.title,
            mr: legacySceneLocales.mr.scene.title,
            ms: legacySceneLocales.ms.scene.title,
            pl: legacySceneLocales.pl.scene.title,
            pt: legacySceneLocales.pt.scene.title,
            qm: legacySceneLocales.qm.scene.title,
            ta: legacySceneLocales.ta.scene.title,
            te: legacySceneLocales.te.scene.title,
            tr: legacySceneLocales.tr.scene.title,
            uk: legacySceneLocales.uk.scene.title,
            ur: legacySceneLocales.ur.scene.title,
            vi: legacySceneLocales.vi.scene.title,
            zh: legacySceneLocales.zh.scene.title,
        },
        description: {
            en: legacySceneLocales.en.scene.description,
            ar: legacySceneLocales.ar.scene.description,
            be: legacySceneLocales.be.scene.description,
            bn: legacySceneLocales.bn.scene.description,
            de: legacySceneLocales.de.scene.description,
            es: legacySceneLocales.es.scene.description,
            et: legacySceneLocales.et.scene.description,
            fr: legacySceneLocales.fr.scene.description,
            he: legacySceneLocales.he.scene.description,
            hi: legacySceneLocales.hi.scene.description,
            id: legacySceneLocales.id.scene.description,
            ja: legacySceneLocales.ja.scene.description,
            ka: legacySceneLocales.ka.scene.description,
            kk: legacySceneLocales.kk.scene.description,
            ko: legacySceneLocales.ko.scene.description,
            lt: legacySceneLocales.lt.scene.description,
            lv: legacySceneLocales.lv.scene.description,
            mr: legacySceneLocales.mr.scene.description,
            ms: legacySceneLocales.ms.scene.description,
            pl: legacySceneLocales.pl.scene.description,
            pt: legacySceneLocales.pt.scene.description,
            qm: legacySceneLocales.qm.scene.description,
            ta: legacySceneLocales.ta.scene.description,
            te: legacySceneLocales.te.scene.description,
            tr: legacySceneLocales.tr.scene.description,
            uk: legacySceneLocales.uk.scene.description,
            ur: legacySceneLocales.ur.scene.description,
            vi: legacySceneLocales.vi.scene.description,
            zh: legacySceneLocales.zh.scene.description,
        },
      },
      labels: {
        source: {
            en: legacySceneLocales.en.labels.source,
            ar: legacySceneLocales.ar.labels.source,
            be: legacySceneLocales.be.labels.source,
            bn: legacySceneLocales.bn.labels.source,
            de: legacySceneLocales.de.labels.source,
            es: legacySceneLocales.es.labels.source,
            et: legacySceneLocales.et.labels.source,
            fr: legacySceneLocales.fr.labels.source,
            he: legacySceneLocales.he.labels.source,
            hi: legacySceneLocales.hi.labels.source,
            id: legacySceneLocales.id.labels.source,
            ja: legacySceneLocales.ja.labels.source,
            ka: legacySceneLocales.ka.labels.source,
            kk: legacySceneLocales.kk.labels.source,
            ko: legacySceneLocales.ko.labels.source,
            lt: legacySceneLocales.lt.labels.source,
            lv: legacySceneLocales.lv.labels.source,
            mr: legacySceneLocales.mr.labels.source,
            ms: legacySceneLocales.ms.labels.source,
            pl: legacySceneLocales.pl.labels.source,
            pt: legacySceneLocales.pt.labels.source,
            qm: legacySceneLocales.qm.labels.source,
            ta: legacySceneLocales.ta.labels.source,
            te: legacySceneLocales.te.labels.source,
            tr: legacySceneLocales.tr.labels.source,
            uk: legacySceneLocales.uk.labels.source,
            ur: legacySceneLocales.ur.labels.source,
            vi: legacySceneLocales.vi.labels.source,
            zh: legacySceneLocales.zh.labels.source,
        },
        direction: {
            en: legacySceneLocales.en.labels.direction,
            ar: legacySceneLocales.ar.labels.direction,
            be: legacySceneLocales.be.labels.direction,
            bn: legacySceneLocales.bn.labels.direction,
            de: legacySceneLocales.de.labels.direction,
            es: legacySceneLocales.es.labels.direction,
            et: legacySceneLocales.et.labels.direction,
            fr: legacySceneLocales.fr.labels.direction,
            he: legacySceneLocales.he.labels.direction,
            hi: legacySceneLocales.hi.labels.direction,
            id: legacySceneLocales.id.labels.direction,
            ja: legacySceneLocales.ja.labels.direction,
            ka: legacySceneLocales.ka.labels.direction,
            kk: legacySceneLocales.kk.labels.direction,
            ko: legacySceneLocales.ko.labels.direction,
            lt: legacySceneLocales.lt.labels.direction,
            lv: legacySceneLocales.lv.labels.direction,
            mr: legacySceneLocales.mr.labels.direction,
            ms: legacySceneLocales.ms.labels.direction,
            pl: legacySceneLocales.pl.labels.direction,
            pt: legacySceneLocales.pt.labels.direction,
            qm: legacySceneLocales.qm.labels.direction,
            ta: legacySceneLocales.ta.labels.direction,
            te: legacySceneLocales.te.labels.direction,
            tr: legacySceneLocales.tr.labels.direction,
            uk: legacySceneLocales.uk.labels.direction,
            ur: legacySceneLocales.ur.labels.direction,
            vi: legacySceneLocales.vi.labels.direction,
            zh: legacySceneLocales.zh.labels.direction,
        },
        screen: {
            en: legacySceneLocales.en.labels.screen,
            ar: legacySceneLocales.ar.labels.screen,
            be: legacySceneLocales.be.labels.screen,
            bn: legacySceneLocales.bn.labels.screen,
            de: legacySceneLocales.de.labels.screen,
            es: legacySceneLocales.es.labels.screen,
            et: legacySceneLocales.et.labels.screen,
            fr: legacySceneLocales.fr.labels.screen,
            he: legacySceneLocales.he.labels.screen,
            hi: legacySceneLocales.hi.labels.screen,
            id: legacySceneLocales.id.labels.screen,
            ja: legacySceneLocales.ja.labels.screen,
            ka: legacySceneLocales.ka.labels.screen,
            kk: legacySceneLocales.kk.labels.screen,
            ko: legacySceneLocales.ko.labels.screen,
            lt: legacySceneLocales.lt.labels.screen,
            lv: legacySceneLocales.lv.labels.screen,
            mr: legacySceneLocales.mr.labels.screen,
            ms: legacySceneLocales.ms.labels.screen,
            pl: legacySceneLocales.pl.labels.screen,
            pt: legacySceneLocales.pt.labels.screen,
            qm: legacySceneLocales.qm.labels.screen,
            ta: legacySceneLocales.ta.labels.screen,
            te: legacySceneLocales.te.labels.screen,
            tr: legacySceneLocales.tr.labels.screen,
            uk: legacySceneLocales.uk.labels.screen,
            ur: legacySceneLocales.ur.labels.screen,
            vi: legacySceneLocales.vi.labels.screen,
            zh: legacySceneLocales.zh.labels.screen,
        },
      },
    },
  },
});

const interactiveCheckpoint = defineCheckpoint({
  id: 'cd8762a1-7924-55d8-b2b6-90752c6b5e72',
  slug: 'interactiveCheckpoint',
  type: 'checkpoint',
  params: { enableChecks: true, showIndices: true },
  locale: { title: 'CHECKPOINT · Expand and mark the answer' },
  content: {
    items: {
      revealAnswer: {
        question: defineText({
          id: 'bb5ec842-bd22-5dd4-9996-3d46765ce025',
          slug: 'revealQuestion',
          type: 'text',
          params: {},
          locale: { value: 'How do I reveal this answer?' },
        }),
        check: true,
        answer: {
          items: {
            checkpointAnswer: defineText({
              id: '3fe35315-ae2e-57bf-9fa7-ec8ce278852d',
              slug: 'checkpointAnswer',
              type: 'text',
              params: {},
              locale: { value: 'Open the checkpoint row, then mark it complete.' },
            }),
          },
          order: ['checkpointAnswer'],
        },
      },
    },
    order: ['revealAnswer'],
  },
});

/** Complete ten-renderer gallery, ready for future Course assembly. */
export const contentBlockGalleryV2 = defineLearningFlowSection({
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
      lightRayDiagram: lightRayDiagramScene,
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
