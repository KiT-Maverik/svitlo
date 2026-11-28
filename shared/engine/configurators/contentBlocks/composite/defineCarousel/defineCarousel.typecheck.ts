import { defineImage } from '../../primitive/defineImage';
import { defineScene } from '../../primitive/defineScene';
import { defineText } from '../../primitive/defineText';
import { defineCarousel } from './defineCarousel';

const picture = defineImage<'picture', ['en', 'uk']>({
  id: 'b775647f-203d-481a-a1c7-4d331c779d71',
  slug: 'picture',
  type: 'image',
  params: { fill: true, aspectRatio: 1 },
  locale: { fileName: 'https://example.com/a.png', alt: { en: 'A', uk: 'А' } },
});
const scene = defineScene<'activity', ['en', 'uk']>({
  id: 'b775647f-203d-481a-a1c7-4d331c779d72',
  slug: 'activity',
  type: 'scene',
  params: {},
  locale: { value: { en: 'Choose', uk: 'Обери' } },
});
const carousel = defineCarousel<'gallery', { picture: typeof picture; activity: typeof scene }, ['uk']>({
  id: 'b775647f-203d-481a-a1c7-4d331c779d73',
  slug: 'gallery',
  type: 'carousel',
  params: { autoplay: false, startIndex: 0 },
  locale: { title: 'Slides' },
  children: ['picture', 'activity'],
  picture,
  activity: scene,
});
carousel.build.data({ languages: ['uk'] });
carousel.build.overrides({ picture: { locale: { alt: { uk: 'Зображення' } } } }, { languages: ['uk'] });
carousel.build.overrides({ picture: false, children: ['activity'] }, { languages: ['uk'] });

// @ts-expect-error Publication languages must be a subset of declared Carousel languages.
carousel.build.data({ languages: ['en'] });
// @ts-expect-error Carousel IDs are immutable metadata, never valid override keys.
carousel.build.overrides({ id: 'b775647f-203d-481a-a1c7-4d331c779d70' }, { languages: ['uk'] });
// @ts-expect-error Unknown child placement is not a valid override key.
carousel.build.overrides({ missing: false }, { languages: ['uk'] });
// @ts-expect-error Unknown names cannot be inserted into the typed order without a typed addition.
carousel.build.overrides({ children: ['unknown'] }, { languages: ['uk'] });
const text = defineText({
  id: 'b775647f-203d-481a-a1c7-4d331c779d74',
  slug: 'text',
  type: 'text',
  params: {},
  locale: { value: 'Not a slide' },
});
// @ts-expect-error Carousel accepts only Image and Scene Configurators.
defineCarousel<'invalid', { text: typeof text }, ['uk']>({
  id: 'b775647f-203d-481a-a1c7-4d331c779d75',
  slug: 'invalid',
  type: 'carousel',
  params: {},
  locale: {},
  children: ['text'],
  text,
});
