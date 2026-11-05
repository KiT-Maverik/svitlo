import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { renderLessonFiles, writeLessonFiles } from './generateLessons.utils';

const id = 'd3048d21-8690-5255-b62c-984c69ac272c';
const lesson = {
  id,
  slug: 'howLightMoves',
  title: { en: 'Light', uk: 'Світло' },
  parameters: { languages: ['en', 'uk'] },
  flashcards: [{ id: 'card-id', front: [{ text: { fallback: 'en', en: 'Ray' } }] }],
  questions: { selectOneAnswer: { q1: { id: 'question-id', slug: 'q1', title: { en: 'What?', uk: 'Що?' } } } },
  sections: [
    {
      id: 'quiz-section',
      slug: 'quiz',
      type: 'quiz',
      title: { language: 'en', value: 'Quiz' },
      content: [{ type: 'quiz', id: 'quiz-block', slug: 'quiz', questions: { q1: { id: 'question-id', slug: 'q1' } } }],
    },
  ],
};

describe('renderLessonFiles', () => {
  it('publishes separate localized collections and tracks field-level fallback', () => {
    const files = renderLessonFiles(lesson);
    assert.equal(files.size, 6);
    const config = JSON.parse(files.get(`c/${id}/config/uk.json`)!);
    const cards = JSON.parse(files.get(`c/${id}/flashcards/uk.json`)!);
    const questions = JSON.parse(files.get(`c/${id}/questions/uk.json`)!);
    assert.equal(config.data.title, 'Світло');
    assert.deepEqual(config.data.sections[0].content[0].questionSlugs, ['q1']);
    assert.equal(config.data.flashcards, undefined);
    assert.equal(config.data.questions, undefined);
    assert.deepEqual(config.localeSources['/sections/0/title'], { code: 'en', isFallback: true });
    assert.equal(cards.data[0].front[0].text, 'Ray');
    assert.deepEqual(cards.localeSources['/0/front/0/text'], { code: 'en', isFallback: true });
    assert.equal(questions.data.selectOneAnswer.q1.title, 'Що?');
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
        fs.readFileSync(path.join(temp, `c/${id}/config/uk.json`), 'utf8'),
        files.get(`c/${id}/config/uk.json`),
      );
    } finally {
      fs.rmSync(temp, { recursive: true, force: true });
    }
  });
});
