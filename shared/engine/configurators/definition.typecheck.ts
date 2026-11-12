import { defineText } from './contentBlocks/defineText/defineText';
import { defineCheckpointItem } from './contentBlocks/defineCheckpoint/defineCheckpointItem';
import { defineCheckpoint } from './contentBlocks/defineCheckpoint/defineCheckpoint';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Expect<T extends true> = T;

const text = defineText<'intro', ['en', 'uk']>({
  id: 'b775647f-203d-481a-a1c7-4d331c779d61',
  type: 'text', slug: 'intro', params: {},
  locale: { value: { en: 'Hello', uk: 'Привіт' } },
});
type TextSlug = Expect<Equal<typeof text.slug, 'intro'>>;
text.build.props({ languages: ['uk'] });
text.build.overrides({ locale: { value: { uk: 'Вітаю' } } }, { languages: ['uk'] });
// @ts-expect-error The authored language tuple does not support Polish.
text.build.props({ languages: ['pl'] });
// @ts-expect-error The publication scope is mandatory.
text.build.props();

const item = defineCheckpointItem({
  id: 'b775647f-203d-481a-a1c7-4d331c779d62',
  type: 'checkpointItem', slug: 'item', question: text,
  answer: { items: { intro: text }, order: ['intro'] },
});
const checkpoint = defineCheckpoint({
  id: 'b775647f-203d-481a-a1c7-4d331c779d63',
  type: 'checkpoint', slug: 'review', params: {}, locale: { title: 'Review' },
  content: { items: { item }, order: ['item'] },
});
type CheckpointSlug = Expect<Equal<typeof checkpoint.slug, 'review'>>;
checkpoint.build.props({ languages: ['en'] });
item.build.overrides({ question: { locale: { value: { uk: 'Питання' } } } }, { languages: ['uk'] });
