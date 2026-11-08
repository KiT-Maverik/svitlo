import assert from 'node:assert/strict';
import test from 'node:test';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/contracts/localization';
import { allLanguageCodes } from '../schemas/languages.schemas';
import { locale_All_Schema } from '../schemas/locale.schemas';
import { defineText } from './contentBlocks/defineText/defineText';
import { defineMarkdown } from './contentBlocks/defineRemaining';
import { defineTheorySection, regularSectionSchema } from './sections';
import { defineLesson } from './lessons';
import { defineCourse } from './courses';
import { defineSkill, defineSkillGroup, defineSkillDomain } from './skills';
import { defineAssessmentMethod } from './assessmentMethods/defineAssessmentMethod';
import { assessmentMethod_Config_Schema } from './assessmentMethods/defineAssessmentMethod.schemas';

const languages = ['en', 'uk'] as const;
const id = (last: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + last;
const textBlock = () =>
  defineText<typeof languages>({
    type: 'text',
    id: id('6a'),
    slug: 'introduction',
    params: {},
    value: { en: 'Hello', uk: 'Привіт' },
  });
test('nested Definition objects are required instead of raw configs', () => {
  const text = textBlock();
  const section = defineTheorySection<typeof languages>({
    type: 'theory',
    id: id('6b'),
    slug: 'intro',
    title: { en: 'Theory', uk: 'Теорія' },
    navigationLabel: '1',
    content: [text],
  });
  assert.equal(section.config.test.config(languages).success, true);
  const invalid = regularSectionSchema('theory', languages).safeParse({
    type: 'theory',
    id: id('6b'),
    slug: 'intro',
    title: 'Theory',
    navigationLabel: '1',
    content: [{ type: 'text', id: id('6a'), slug: 'bad', value: 'Raw' }],
  });
  assert.equal(invalid.success, false);
  assert.equal((section.config.base.content as unknown[]).length, 1);
  const contentPatch = section.config.locales();
  assert.ok(contentPatch);
});
test('Course-local overrides do not mutate a standalone Lesson', () => {
  const lesson = defineLesson<typeof languages>({
    type: 'lesson',
    id: id('6c'),
    slug: 'lesson',
    title: { en: 'Lesson', uk: 'Урок' },
    flashcards: [],
    skills: [],
    questions: {},
    parameters: {
      requireQuiz: false,
      languages,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
    },
    sections: [],
  });
  const courseVersion = lesson.withOverrides({ title: { en: 'Course Lesson', uk: 'Урок у курсі' } });
  assert.equal(lesson.config.overrides(), null);
  assert.ok(courseVersion.config.overrides());
  const description = defineMarkdown<typeof languages>({
    type: 'markdown',
    id: id('6d'),
    slug: 'description',
    locales: { en: 'Overview', uk: 'Огляд' },
  });
  const course = defineCourse<typeof languages>({
    type: 'course',
    id: id('6e'),
    title: textBlock(),
    description,
    parameters: { languages },
    content: [courseVersion],
  });
  assert.equal(course.config.test.config(languages).success, true);
  assert.deepEqual(course.config.overrides(), {
    content: { 0: { title: { en: 'Course Lesson', uk: 'Урок у курсі' } } },
  });
  assert.equal(JSON.stringify(course.config.base).includes('function'), false);
});
test('Skills use child Definition objects and assessment IDs are valid UUIDs', () => {
  const skill = defineSkill<typeof languages>({
    type: 'skill',
    id: id('6f'),
    slug: 'reading',
    name: { en: 'Read', uk: 'Читати' },
    description: { methodological: 'Identify written text', frontend: { en: 'Reading', uk: 'Читання' } },
  });
  const group = defineSkillGroup<typeof languages>({
    type: 'skillGroup',
    id: id('70'),
    slug: 'literacy',
    name: { en: 'Literacy', uk: 'Грамотність' },
    skills: { reading: skill },
  });
  const domain = defineSkillDomain<typeof languages>({
    type: 'skillDomain',
    id: id('71'),
    slug: 'language',
    name: { en: 'Language', uk: 'Мова' },
    groups: { literacy: group },
  });
  assert.equal(skill.config.test.config(languages).success, true);
  assert.equal(group.config.test.config(languages).success, true);
  assert.equal(domain.config.test.config(languages).success, true);
  assert.deepEqual([...allLanguageCodes].sort(), DEFAULT_SUPPORTED_LANGUAGES.map(({ language }) => language).sort());
  const allLocales = (value: string) =>
    locale_All_Schema.parse(Object.fromEntries(allLanguageCodes.map(code => [code, value])));
  const methodSource = {
    slug: 'retrieval',
    id: 'b775647f-203d-481a-a1c7-4d331c779d72',
    title: allLocales('Retrieval'),
    description: allLocales('Recall'),
  } satisfies Parameters<typeof defineAssessmentMethod>[0];
  const method = defineAssessmentMethod(methodSource);
  assert.equal(method.config.test.config(), true);
  assert.deepEqual(method.config.base, { id: methodSource.id, slug: methodSource.slug });
  assert.deepEqual(method.config.locales(), { title: methodSource.title, description: methodSource.description });
  assert.equal(assessmentMethod_Config_Schema.safeParse({ ...methodSource, id: 'not-a-uuid' }).success, false);
  assert.equal(
    assessmentMethod_Config_Schema.safeParse({ ...methodSource, title: { en: 'Retrieval' } }).success,
    false,
  );
});
