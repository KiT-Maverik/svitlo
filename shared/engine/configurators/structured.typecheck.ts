import { defineText } from './contentBlocks/defineText/defineText';
import { defineTheorySection } from './sections';
import { defineLesson } from './lessons';
import { defineSkill, defineSkillGroup } from './skills/old';

const languages = ['en', 'uk'] as const;
const validText = defineText<typeof languages>({
  type: 'text',
  id: 'b775647f-203d-481a-a1c7-4d331c779d6a',
  slug: 'intro',
  params: {},
  value: 'Hello',
});
defineTheorySection<typeof languages>({
  type: 'theory',
  id: 'b775647f-203d-481a-a1c7-4d331c779d6b',
  slug: 'theory',
  title: 'Theory',
  navigationLabel: '1',
  content: [validText],
});
defineTheorySection<typeof languages>({
  type: 'theory',
  id: 'b775647f-203d-481a-a1c7-4d331c779d6b',
  slug: 'bad',
  title: 'Theory',
  navigationLabel: '1',
  // @ts-expect-error Nested blocks must be Definition objects, not raw configs.
  content: [{ type: 'text', id: 'b775647f-203d-481a-a1c7-4d331c779d6a', slug: 'raw', value: 'Raw' }],
});
const skill = defineSkill<typeof languages>({
  type: 'skill',
  id: 'b775647f-203d-481a-a1c7-4d331c779d6a',
  slug: 'reading',
  name: { en: 'Reading', uk: 'Читання' },
  description: { methodological: 'Reading', frontend: { en: 'Reading', uk: 'Читання' } },
});
defineSkillGroup<typeof languages>({
  type: 'skillGroup',
  id: 'b775647f-203d-481a-a1c7-4d331c779d6b',
  slug: 'literacy',
  name: { en: 'Literacy', uk: 'Грамотність' },
  skills: { reading: skill },
});
defineSkillGroup<typeof languages>({
  type: 'skillGroup',
  id: 'b775647f-203d-481a-a1c7-4d331c779d6b',
  slug: 'invalid',
  name: { en: 'Literacy', uk: 'Грамотність' },
  // @ts-expect-error A raw skill config is not a child Definition.
  skills: { reading: { type: 'skill', id: 'x', slug: 'x', name: { en: 'X', uk: 'X' } } },
});
void defineLesson;
