import assert from 'node:assert/strict';
import test from 'node:test';

import { defineText } from '../../contentBlocks/defineText/defineText';
import { defineMarkdown } from '../../contentBlocks/defineMarkdown/defineMarkdown';
import { defineTheorySection } from '../../sections/defineTheorySection/defineTheorySection';
import { defineScenarioSection } from '../../sections/defineScenarioSection/defineScenarioSection';
import { defineFlashcard } from '../../flashcards/defineFlashcard/defineFlashcard';
import { defineLesson } from '../../lessons/defineLesson/defineLesson';
import { defineEpisode } from '../defineEpisode/defineEpisode';
import { defineChapter } from '../defineChapter/defineChapter';
import { defineModule } from '../defineModule/defineModule';
import { defineCourse } from './defineCourse';
import { chapter_Config_Schema } from '../defineChapter/defineChapter.schemas';
import { course_Config_Schema } from './defineCourse.schemas';

function containsFunction(value: unknown): boolean {
  if (typeof value === 'function') return true;
  if (Array.isArray(value)) return value.some(containsFunction);
  if (value !== null && typeof value === 'object') return Object.values(value).some(containsFunction);
  return false;
}

const id = (suffix: string) => 'b775647f-203d-481a-a1c7-4d331c779d' + suffix;
const languages = ['en', 'uk'] as const;
const text = defineText({
  id: id('c1'), type: 'text', slug: 'title', params: {},
  value: { en: 'Hello', uk: 'Привіт' },
});
const description = defineMarkdown({
  id: id('c2'), type: 'markdown', slug: 'description',
  locales: { en: 'Intro', uk: 'Вступ' },
});
const scenario = defineScenarioSection({
  id: id('c3'), type: 'scenario', slug: 'scene',
  title: { en: 'Story', uk: 'Історія' },
  navigationLabel: 'S', content: [text],
});
const theory = defineTheorySection({
  id: id('c4'), type: 'theory', slug: 'intro',
  title: { en: 'Theory', uk: 'Теорія' },
  navigationLabel: '1', content: [text],
});
const card = defineFlashcard({
  id: id('c5'), type: 'flashcard', front: [text], back: [text], hint: [],
  tags: [], flags: [],
});
const lesson = defineLesson({
  id: id('c6'), type: 'lesson', slug: 'lesson',
  title: { en: 'Lesson', uk: 'Урок' },
  flashcards: [card], skills: [],
  parameters: {
    requireQuiz: false, languages,
    sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
  },
  sections: [theory],
});
const episode = defineEpisode({ type: 'episode', id: id('c7'), title: text, sections: [scenario] });
const chapter = defineChapter({ type: 'chapter', id: id('c8'), title: text, content: [lesson, episode] });
const module = defineModule({ type: 'module', id: id('c9'), title: text, content: [chapter] });
const course = defineCourse({
  type: 'course', id: id('ca'), title: text, description, parameters: { languages },
  content: [module],
});

test('typed ContentBlock to Flashcard/Section/Lesson/Course composition preserves order and identity', () => {
  assert.deepEqual(course.content, [module]);
  assert.deepEqual(module.content, [chapter]);
  assert.deepEqual(chapter.content, [lesson, episode]);
  assert.deepEqual(episode.sections, [scenario]);
  assert.deepEqual(lesson.flashcards, [card]);
  assert.deepEqual(lesson.sections, [theory]);
  assert.deepEqual(theory.content, [text]);
  assert.equal(course.title, text);
  assert.equal(course.description, description);
  assert.equal(course.config.base.type, 'course');
  assert.equal(lesson.config.base.slug, 'lesson');
  assert.equal(containsFunction(course.config.base), false);
  assert.equal(containsFunction(lesson.config.base), false);
  assert.deepEqual(lesson.config.locales(), { title: { en: 'Lesson', uk: 'Урок' } });
  assert.equal(course_Config_Schema.safeParse({
    type: 'course', id: id('ca'), title: text, description,
    parameters: { languages }, content: [module],
  }).success, true);
});

test('Course child kinds, Scenario-only Episode, and nested authored inputs are validated', () => {
  assert.equal(chapter_Config_Schema.safeParse({
    type: 'chapter', id: id('cc'), title: text, content: [module],
  }).success, false);
  assert.throws(() => defineEpisode({
    type: 'episode', id: id('cd'), title: text,
    // @ts-expect-error An Episode only accepts Scenario Section configurators.
    sections: [theory],
  }));
  assert.equal(course_Config_Schema.safeParse({
    type: 'course', id: id('ce'), title: text.config.base,
    description, parameters: { languages }, content: [module],
  }).success, false);
  assert.equal(course_Config_Schema.safeParse({
    type: 'course', id: id('cf'), title: text,
    description, parameters: { languages: ['en', 'en'] }, content: [module],
  }).success, false);
});
