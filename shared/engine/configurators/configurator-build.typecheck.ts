import { defineCheckpoint } from './contentBlocks/composite/defineCheckpoint/defineCheckpoint';
import { defineCheckpointAnswer } from './contentBlocks/composite/defineCheckpoint/defineCheckpointAnswer';
import { defineCheckpointItem } from './contentBlocks/composite/defineCheckpoint/defineCheckpointItem';
import { defineText } from './contentBlocks/primitive/defineText/defineText';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Expect<T extends true> = T;

const text = defineText<'intro', ['en', 'uk']>({
  id: 'b775647f-203d-481a-a1c7-4d331c779d61',
  type: 'text',
  slug: 'intro',
  params: {},
  locale: { value: { en: 'Hello', uk: 'Привіт' } },
});
type TextSlug = Expect<Equal<typeof text.slug, 'intro'>>;
text.build.data({ languages: ['uk'] });
text.build.overrides({ locale: { value: { uk: 'Вітаю' } } }, { languages: ['uk'] });
// @ts-expect-error The authored language tuple does not support Polish.
text.build.data({ languages: ['pl'] });
// @ts-expect-error The publication scope is mandatory.
text.build.data();

const answer = defineCheckpointAnswer<'answer', { intro: typeof text }, ['en', 'uk']>({
  id: 'b775647f-203d-481a-a1c7-4d331c779d64',
  type: 'checkpointAnswer',
  slug: 'answer',
  children: ['intro'],
  intro: text,
});
const item = defineCheckpointItem<'item', typeof answer, typeof text, ['en', 'uk']>({
  id: 'b775647f-203d-481a-a1c7-4d331c779d62',
  type: 'checkpointItem',
  slug: 'item',
  question: text,
  answer,
});
const checkpoint = defineCheckpoint<'review', { item: typeof item }, ['en', 'uk']>({
  id: 'b775647f-203d-481a-a1c7-4d331c779d63',
  type: 'checkpoint',
  slug: 'review',
  params: {},
  locale: { title: 'Review' },
  children: ['item'],
  item,
});
type CheckpointSlug = Expect<Equal<typeof checkpoint.slug, 'review'>>;
checkpoint.build.data({ languages: ['en'] });
item.build.overrides({ question: { locale: { value: { uk: 'Питання' } } } }, { languages: ['uk'] });
