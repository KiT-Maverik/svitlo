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
text.assemble.resource();
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

const audioPublished = audio.assemble.resource();
const audioEmbedded = audio.assemble.resource({ embed: true });
void audioEmbedded.locale?.en?.locale;
// @ts-expect-error Published language files do not have a nested locale wrapper.
void audioPublished.locale?.en?.locale;
// @ts-expect-error Embedded locale fragments expose their fields under locale.
void audioEmbedded.locale?.en?.title;
// @ts-expect-error The only explicit embed value permitted is true.
audio.assemble.resource({ embed: false });

const carouselPublished = carousel.assemble.resource();
const carouselEmbedded = carousel.assemble.resource({ embed: true });
void carouselEmbedded.locale?.en?.locale;
// @ts-expect-error Published language files do not have a nested locale wrapper.
void carouselPublished.locale?.en?.locale;
// @ts-expect-error Embedded locale fragments expose their fields under locale.
void carouselEmbedded.locale?.en?.slides;
// @ts-expect-error The only explicit embed value permitted is true.
carousel.assemble.resource({ embed: false });

const codePublished = code.assemble.resource();
const codeEmbedded = code.assemble.resource({ embed: true });
void codeEmbedded.locale?.en?.locale;
// @ts-expect-error Published language files do not have a nested locale wrapper.
void codePublished.locale?.en?.locale;
// @ts-expect-error Embedded locale fragments expose their fields under locale.
void codeEmbedded.locale?.en?.variables;
// @ts-expect-error The only explicit embed value permitted is true.
code.assemble.resource({ embed: false });

const imagePublished = image.assemble.resource();
const imageEmbedded = image.assemble.resource({ embed: true });
void imageEmbedded.locale?.en?.locale;
// @ts-expect-error Published language files do not have a nested locale wrapper.
void imagePublished.locale?.en?.locale;
// @ts-expect-error Embedded locale fragments expose their fields under locale.
void imageEmbedded.locale?.en?.alt;
// @ts-expect-error The only explicit embed value permitted is true.
image.assemble.resource({ embed: false });

const markdownPublished = markdown.assemble.resource();
const markdownEmbedded = markdown.assemble.resource({ embed: true });
void markdownEmbedded.locale?.en?.locale;
// @ts-expect-error Published language files do not have a nested locale wrapper.
void markdownPublished.locale?.en?.locale;
// @ts-expect-error Embedded locale fragments expose their fields under locale.
void markdownEmbedded.locale?.en?.value;
// @ts-expect-error The only explicit embed value permitted is true.
markdown.assemble.resource({ embed: false });

const scenePublished = scene.assemble.resource();
const sceneEmbedded = scene.assemble.resource({ embed: true });
void sceneEmbedded.locale?.en?.locale;
// @ts-expect-error Published language files do not have a nested locale wrapper.
void scenePublished.locale?.en?.locale;
// @ts-expect-error Embedded locale fragments expose their fields under locale.
void sceneEmbedded.locale?.en?.value;
// @ts-expect-error The only explicit embed value permitted is true.
scene.assemble.resource({ embed: false });

const videoPublished = video.assemble.resource();
const videoEmbedded = video.assemble.resource({ embed: true });
void videoEmbedded.locale?.en?.locale;
// @ts-expect-error Published language files do not have a nested locale wrapper.
void videoPublished.locale?.en?.locale;
// @ts-expect-error Embedded locale fragments expose their fields under locale.
void videoEmbedded.locale?.en?.label;
// @ts-expect-error The only explicit embed value permitted is true.
video.assemble.resource({ embed: false });

const youtubePublished = youtube.assemble.resource();
const youtubeEmbedded = youtube.assemble.resource({ embed: true });
void youtubeEmbedded.locale?.en?.locale;
// @ts-expect-error Published language files do not have a nested locale wrapper.
void youtubePublished.locale?.en?.locale;
// @ts-expect-error Embedded locale fragments expose their fields under locale.
void youtubeEmbedded.locale?.en?.label;
// @ts-expect-error The only explicit embed value permitted is true.
youtube.assemble.resource({ embed: false });
