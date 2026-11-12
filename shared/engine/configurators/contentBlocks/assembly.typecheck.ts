import {
  defineText,
  defineAudio,
  defineCarousel,
  defineCarouselSlide,
  defineCode,
  defineImage,
  defineMarkdown,
  defineScene,
  defineVideo,
  defineYoutube,
} from './index';

const id = 'c2cc84f3-f057-493d-b1b6-1880aad8023b';

const text = defineText({ id, slug: 'text', type: 'text', params: {}, locale: { value: { en: 'Hi' } } });
const audio = defineAudio({
  id,
  slug: 'audio',
  type: 'audio',
  params: {},
  locale: { title: { en: 'Narration' }, fileLocation: 'https://example.com/a.mp3' },
});
const carousel = defineCarousel({
  id,
  slug: 'carousel',
  type: 'carousel',
  params: {},
  locale: {},
  slides: {
    items: {
      first: defineCarouselSlide({
        id,
        slug: 'first',
        type: 'carouselSlide',
        locale: { src: 'https://example.com/image.png', alt: 'Alt' },
      }),
    },
    order: ['first'],
  },
});
const code = defineCode({
  id,
  slug: 'code',
  type: 'code',
  params: { language: 'python', codeAsText: 'print(1)' },
  locale: { title: { en: 'Code' } },
});
const image = defineImage({
  id,
  slug: 'image',
  type: 'image',
  params: { width: 100, height: 100 },
  locale: { src: 'https://example.com/image.png', alt: { en: 'Diagram' } },
});
const markdown = defineMarkdown({
  id,
  slug: 'markdown',
  type: 'markdown',
  params: {},
  locale: { value: { en: 'Hello' } },
});
const scene = defineScene({
  id,
  slug: 'scene',
  type: 'scene',
  params: {},
  locale: { value: { heading: { en: 'Hello' } } },
});
const video = defineVideo({
  id,
  slug: 'video',
  type: 'video',
  params: {},
  locale: { fileLocation: 'https://example.com/movie.mp4', poster: 'https://example.com/movie.jpg', label: { en: 'Movie' } },
});
const youtube = defineYoutube({
  id,
  slug: 'youtube',
  type: 'youtube',
  params: { mode: 'link' },
  locale: { href: 'https://youtube.com/watch?v=example', label: { en: 'Watch' } },
});

const textPublished = text.build.props();
void textPublished.locale?.en?.locale;
// @ts-expect-error Localized fields are nested under the Props locale field.
void textPublished.locale?.en?.value;
// @ts-expect-error The Build API does not support conditional embedding.
text.build.props({ embed: true });

// @ts-expect-error Props-shaped nested locale input is not an authored Overrides patch.
text.build.overrides({ locale: { value: { locale: { value: 'Hi' } } } });
// @ts-expect-error Identity ID is not overridable.
text.build.overrides({ id });
// @ts-expect-error Identity slug is not overridable.
text.build.overrides({ slug: 'renamed' });
// @ts-expect-error Identity type is not overridable.
text.build.overrides({ type: 'text' });
// @ts-expect-error Authored locale values must not contain positional arrays.
text.build.overrides({ locale: { value: ['not a locale dictionary'] } });

const audioPublished = audio.build.props();
void audioPublished.locale?.en?.locale;
// @ts-expect-error Localized fields are nested under the Props locale field.
void audioPublished.locale?.en?.title;
// @ts-expect-error The Build API does not support conditional embedding.
audio.build.props({ embed: true });

const carouselPublished = carousel.build.props();
void carouselPublished.locale?.en?.locale;
// @ts-expect-error Localized fields are nested under the Props locale field.
void carouselPublished.locale?.en?.slides;
// @ts-expect-error The Build API does not support conditional embedding.
carousel.build.props({ embed: true });

const codePublished = code.build.props();
void codePublished.locale?.en?.locale;
// @ts-expect-error Localized fields are nested under the Props locale field.
void codePublished.locale?.en?.variables;
// @ts-expect-error The Build API does not support conditional embedding.
code.build.props({ embed: true });

const imagePublished = image.build.props();
void imagePublished.locale?.en?.locale;
// @ts-expect-error Localized fields are nested under the Props locale field.
void imagePublished.locale?.en?.alt;
// @ts-expect-error The Build API does not support conditional embedding.
image.build.props({ embed: true });

const markdownPublished = markdown.build.props();
void markdownPublished.locale?.en?.locale;
// @ts-expect-error Localized fields are nested under the Props locale field.
void markdownPublished.locale?.en?.value;
// @ts-expect-error The Build API does not support conditional embedding.
markdown.build.props({ embed: true });

const scenePublished = scene.build.props();
void scenePublished.locale?.en?.locale;
// @ts-expect-error Localized fields are nested under the Props locale field.
void scenePublished.locale?.en?.value;
// @ts-expect-error The Build API does not support conditional embedding.
scene.build.props({ embed: true });

const videoPublished = video.build.props();
void videoPublished.locale?.en?.locale;
// @ts-expect-error Localized fields are nested under the Props locale field.
void videoPublished.locale?.en?.label;
// @ts-expect-error The Build API does not support conditional embedding.
video.build.props({ embed: true });

const youtubePublished = youtube.build.props();
void youtubePublished.locale?.en?.locale;
// @ts-expect-error Localized fields are nested under the Props locale field.
void youtubePublished.locale?.en?.label;
// @ts-expect-error The Build API does not support conditional embedding.
youtube.build.props({ embed: true });

// @ts-expect-error Audio no longer exposes the legacy assemble API.
audio.assemble.resource();
const audioSlug: 'audio' = audio.slug;
void audioSlug;

// @ts-expect-error Carousel no longer exposes the legacy assemble API.
carousel.assemble.resource();
const carouselSlug: 'carousel' = carousel.slug;
void carouselSlug;

// @ts-expect-error Code no longer exposes the legacy assemble API.
code.assemble.resource();
const codeSlug: 'code' = code.slug;
void codeSlug;

// @ts-expect-error Image no longer exposes the legacy assemble API.
image.assemble.resource();
const imageSlug: 'image' = image.slug;
void imageSlug;

// @ts-expect-error Markdown no longer exposes the legacy assemble API.
markdown.assemble.resource();
const markdownSlug: 'markdown' = markdown.slug;
void markdownSlug;

// @ts-expect-error Scene no longer exposes the legacy assemble API.
scene.assemble.resource();
const sceneSlug: 'scene' = scene.slug;
void sceneSlug;

// @ts-expect-error Video no longer exposes the legacy assemble API.
video.assemble.resource();
const videoSlug: 'video' = video.slug;
void videoSlug;

// @ts-expect-error Youtube no longer exposes the legacy assemble API.
youtube.assemble.resource();
const youtubeSlug: 'youtube' = youtube.slug;
void youtubeSlug;

/** Required language tuples are compile-time only; overrides may remain sparse. */
const multilingual = defineText<'multilingual', ['uk', 'en']>({
  id, slug: 'multilingual', type: 'text', params: {},
  locale: { value: { uk: 'Привіт', en: 'Hello', pl: 'Cześć' } },
});
multilingual.build.overrides({ locale: { value: { uk: 'Вітаю' } } });
// @ts-expect-error Missing a required dictionary language ('en').
defineText<'missingLanguage', ['uk', 'en']>({ id, slug: 'missingLanguage', type: 'text', params: {}, locale: { value: { uk: 'Привіт' } } });
// @ts-expect-error Unknown locale code ('ru') is not a supported language.
defineText<'unsupportedLanguage', ['uk', 'en']>({ id, slug: 'unsupportedLanguage', type: 'text', params: {}, locale: { value: { uk: 'Привіт', en: 'Hello', ru: 'Hi' } } });
// @ts-expect-error Required languages also apply to nested Markdown variable dictionaries.
defineMarkdown<'missingVariableLanguage', ['uk', 'en']>({ id, slug: 'missingVariableLanguage', type: 'markdown', params: {}, locale: { value: 'Hello %_%NAME%_%', variables: { NAME: { uk: 'Ада' } } } });

const bilingualSlide = defineCarouselSlide<'bilingualSlide', ['uk', 'en']>({
  id, slug: 'bilingualSlide', type: 'carouselSlide',
  locale: { src: 'https://example.com/image.png', alt: { uk: 'Фото', en: 'Photo' } },
});
void bilingualSlide;
