import { defineText } from './contentBlocks/primitive/defineText';
import { defineContentSection } from './sections/defineContentSection';
import { defineSkill, defineSkillGroup } from './skills';

const text = defineText<'greeting', ['en', 'uk']>({
  id: 'b775647f-203d-481a-a1c7-4d331c779d61',
  slug: 'greeting',
  type: 'text',
  params: {},
  locale: { value: { en: 'Hello', uk: 'Привіт' } },
});
const section = defineContentSection<'intro', { greeting: typeof text }, ['uk']>({
  id: 'b775647f-203d-481a-a1c7-4d331c779d62',
  slug: 'intro',
  type: 'content',
  params: {},
  locale: { title: 'Introduction', navigationLabel: '1' },
  content: { items: { greeting: text }, order: ['greeting'] },
});
section.build.data({ languages: ['uk'] });
// @ts-expect-error A Section with only Ukrainian support cannot publish English.
section.build.data({ languages: ['en'] });

const skill = defineSkill({
  id: 'b775647f-203d-481a-a1c7-4d331c779d63',
  slug: 'reading',
  name: 'Reading',
  description: { methodological: 'Reading', frontend: 'Read' },
});
const group = defineSkillGroup({
  id: 'b775647f-203d-481a-a1c7-4d331c779d64',
  slug: 'literacy',
  name: 'Literacy',
  description: { methodological: 'Foundations', frontend: 'Learning' },
  skills: { reading: skill },
});
group.build.data({ languages: ['uk'] });
