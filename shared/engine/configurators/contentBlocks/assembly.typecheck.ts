import {
  defineText,
  defineAudio,
  defineCarousel,
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
  locale: { slides: [{ src: 'https://example.com/image.png', alt: 'Alt' }] },
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
  locale: { fileLocation: 'https://example.com/movie.mp4', label: { en: 'Movie' } },
});
const youtube = defineYoutube({
  id,
  slug: 'youtube',
  type: 'youtube',
  params: { mode: 'link' },
  locale: { href: 'https://youtube.com/watch?v=example', label: { en: 'Watch' } },
});

const textPublished = text.build.props();
const textEmbedded = text.build.props({ embed: true });
void textEmbedded.locale?.en?.locale;
// @ts-expect-error Published language files do not have a nested locale wrapper.
void textPublished.locale?.en?.locale;
// @ts-expect-error Embedded locale fragments expose their fields under locale.
void textEmbedded.locale?.en?.value;
// @ts-expect-error The only explicit embed value permitted is true.
text.build.props({ embed: false });
// @ts-expect-error Text no longer exposes the assembly API.
text.build.props();
// @ts-expect-error Props-shaped nested locale input is not an authored Overrides patch.
text.build.overrides({ locale: { value: { locale: { value: 'Hi' } } } });
// @ts-expect-error Identity is not overridable.
text.build.overrides({ id });

const audioPublished = audio.build.props();
const audioEmbedded = audio.build.props({ embed: true });
void audioEmbedded.locale?.en?.locale;
// @ts-expect-error Published language files do not have a nested locale wrapper.
void audioPublished.locale?.en?.locale;
// @ts-expect-error Embedded locale fragments expose their fields under locale.
void audioEmbedded.locale?.en?.title;
// @ts-expect-error The only explicit embed value permitted is true.
audio.build.props({ embed: false });

const carouselPublished = carousel.build.props();
const carouselEmbedded = carousel.build.props({ embed: true });
void carouselEmbedded.locale?.en?.locale;
// @ts-expect-error Published language files do not have a nested locale wrapper.
void carouselPublished.locale?.en?.locale;
// @ts-expect-error Embedded locale fragments expose their fields under locale.
void carouselEmbedded.locale?.en?.slides;
// @ts-expect-error The only explicit embed value permitted is true.
carousel.build.props({ embed: false });

const codePublished = code.build.props();
const codeEmbedded = code.build.props({ embed: true });
void codeEmbedded.locale?.en?.locale;
// @ts-expect-error Published language files do not have a nested locale wrapper.
void codePublished.locale?.en?.locale;
// @ts-expect-error Embedded locale fragments expose their fields under locale.
void codeEmbedded.locale?.en?.variables;
// @ts-expect-error The only explicit embed value permitted is true.
code.build.props({ embed: false });

const imagePublished = image.build.props();
const imageEmbedded = image.build.props({ embed: true });
void imageEmbedded.locale?.en?.locale;
// @ts-expect-error Published language files do not have a nested locale wrapper.
void imagePublished.locale?.en?.locale;
// @ts-expect-error Embedded locale fragments expose their fields under locale.
void imageEmbedded.locale?.en?.alt;
// @ts-expect-error The only explicit embed value permitted is true.
image.build.props({ embed: false });

const markdownPublished = markdown.build.props();
const markdownEmbedded = markdown.build.props({ embed: true });
void markdownEmbedded.locale?.en?.locale;
// @ts-expect-error Published language files do not have a nested locale wrapper.
void markdownPublished.locale?.en?.locale;
// @ts-expect-error Embedded locale fragments expose their fields under locale.
void markdownEmbedded.locale?.en?.value;
// @ts-expect-error The only explicit embed value permitted is true.
markdown.build.props({ embed: false });

const scenePublished = scene.build.props();
const sceneEmbedded = scene.build.props({ embed: true });
void sceneEmbedded.locale?.en?.locale;
// @ts-expect-error Published language files do not have a nested locale wrapper.
void scenePublished.locale?.en?.locale;
// @ts-expect-error Embedded locale fragments expose their fields under locale.
void sceneEmbedded.locale?.en?.value;
// @ts-expect-error The only explicit embed value permitted is true.
scene.build.props({ embed: false });

const videoPublished = video.build.props();
const videoEmbedded = video.build.props({ embed: true });
void videoEmbedded.locale?.en?.locale;
// @ts-expect-error Published language files do not have a nested locale wrapper.
void videoPublished.locale?.en?.locale;
// @ts-expect-error Embedded locale fragments expose their fields under locale.
void videoEmbedded.locale?.en?.label;
// @ts-expect-error The only explicit embed value permitted is true.
video.build.props({ embed: false });

const youtubePublished = youtube.build.props();
const youtubeEmbedded = youtube.build.props({ embed: true });
void youtubeEmbedded.locale?.en?.locale;
// @ts-expect-error Published language files do not have a nested locale wrapper.
void youtubePublished.locale?.en?.locale;
// @ts-expect-error Embedded locale fragments expose their fields under locale.
void youtubeEmbedded.locale?.en?.label;
// @ts-expect-error The only explicit embed value permitted is true.
youtube.build.props({ embed: false });

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
