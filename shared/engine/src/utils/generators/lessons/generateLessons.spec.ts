import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { mergeLessonResources } from '../../../lessons/mergeLessonResources';
import { renderLessonFiles, writeLessonFiles } from './generateLessons.utils';

const id = 'd3048d21-8690-5255-b62c-984c69ac272c';
const lesson = {
  id,
  slug: 'howLightMoves',
  title: { en: 'Light', uk: 'Світло' },
  parameters: { languages: ['en', 'uk'] },
  flashcards: [{ id: 'card-id', label: 'H₂O', front: [{ text: { en: 'Ray', uk: 'Промінь' } }] }],
  questions: { selectOneAnswer: { q1: { id: 'question-id', slug: 'q1', title: { en: 'What?', uk: 'Що?' } } } },
  sections: [
    {
      id: 'quiz-section',
      slug: 'quiz',
      type: 'quiz',
      title: { en: 'Quiz', uk: 'Тест' },
      content: [{ type: 'quiz', id: 'quiz-block', slug: 'quiz', questions: { q1: { id: 'question-id', slug: 'q1' } } }],
    },
  ],
};

describe('renderLessonFiles', () => {
  it('publishes three invariant bases and sparse locale patches with strict sources', () => {
    const files = renderLessonFiles(lesson);
    assert.equal(files.size, 9);
    const base = JSON.parse(files.get(`c/${id}/config/base.json`)!);
    const localized = JSON.parse(files.get(`c/${id}/config/uk.json`)!);
    const cardsBase = JSON.parse(files.get(`c/${id}/flashcards/base.json`)!);
    const cardsLocale = JSON.parse(files.get(`c/${id}/flashcards/uk.json`)!);
    assert.equal(base.data.title, undefined);
    assert.equal(localized.data.title, 'Світло');
    assert.equal(base.data.sections[0].title, undefined);
    assert.deepEqual(base.data.sections[0].content[0].questionSlugs, ['q1']);
    assert.equal(base.data.flashcards, undefined);
    assert.equal(base.data.questions, undefined);
    assert.deepEqual(localized.localeSources['/sections/0/title'], { code: 'uk' });
    assert.equal(cardsBase.data[0].label, 'H₂O');
    assert.equal(cardsLocale.data['0'].front['0'].text, 'Промінь');
    assert.deepEqual(cardsLocale.localeSources['/0/front/0/text'], { code: 'uk' });
    const restored = mergeLessonResources(base, localized) as { data: { title: string; sections: { title: string }[] } };
    assert.equal(restored.data.title, 'Світло');
    assert.equal(restored.data.sections[0].title, 'Тест');
  });

  it('rejects missing and legacy fallback translations at build time', () => {
    assert.throws(() => renderLessonFiles({ ...lesson, title: { en: 'Light' } }), /Incomplete locale dictionary/);
    assert.throws(() => renderLessonFiles({ ...lesson, title: { fallback: 'en', en: 'Light' } }),
      /Field-level fallback/);
  });

  it('rejects invalid UUID and malformed slug', () => {
    assert.throws(() => renderLessonFiles({ ...lesson, id: 'invalid' }), /canonical UUID/);
    assert.throws(() => renderLessonFiles({ ...lesson, slug: '../bad' }), /camelCase slug/);
  });

  it('writes files and removes stale output', () => {
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lesson-test-'));
    try {
      fs.mkdirSync(temp, { recursive: true });
      fs.writeFileSync(path.join(temp, 'stale.json'), '{}');
      const files = renderLessonFiles(lesson);
      writeLessonFiles(temp, files);
      assert.equal(fs.existsSync(path.join(temp, 'stale.json')), false);
      assert.equal(
        fs.readFileSync(path.join(temp, `c/${id}/config/base.json`), 'utf8'),
        files.get(`c/${id}/config/base.json`),
      );
    } finally {
      fs.rmSync(temp, { recursive: true, force: true });
    }
  });
});
