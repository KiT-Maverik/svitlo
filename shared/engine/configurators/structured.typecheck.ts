import { defineText } from './contentBlocks/defineText/defineText';
import { defineTheorySection } from './sections';
import { defineLesson } from './lessons';
import { defineSkill, defineSkillGroup, type Skill_Config } from './skills';
import { allLanguageCodes } from '../schemas/languages.schemas';

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
const allLocales = Object.fromEntries(allLanguageCodes.map(code => [code, 'Reading'])) as Skill_Config['name'];
const skill = defineSkill({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6a',
  slug: 'reading',
  name: allLocales,
  description: { methodological: 'Reading', frontend: allLocales },
});
defineSkillGroup({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6b',
  slug: 'literacy',
  name: allLocales,
  description: { methodological: 'Literacy', frontend: allLocales },
  skills: [skill],
});
defineSkillGroup({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6b',
  slug: 'invalid',
  name: allLocales,
  description: { methodological: 'Literacy', frontend: allLocales },
  // @ts-expect-error A raw Skill configuration is not a child configurator.
  skills: [{ id: 'x', slug: 'x', name: allLocales }],
});
void defineLesson;
