import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { renderLessonFiles, writeLessonFiles } from './generateLessons.utils';

const lesson = {
  id: 'lesson-id',
  group: '1',
  slug: 'howLightMoves',
  title: { en: 'Light', uk: 'Світло' },
  parameters: { languages: ['en', 'uk'] },
  flashcards: [{ id: 'card-id', front: [{ text: { fallback: 'en', en: 'Ray' } }] }],
  questions: { selectOneAnswer: { q1: { id: 'question-id', slug: 'q1', title: { en: 'What?', uk: 'Що?' } } } },
  sections: {
    quiz: {
      title: { language: 'en', value: 'Quiz' },
      content: { quiz: { quiz: { questions: { q1: { id: 'question-id', slug: 'q1' } } } } },
    },
  },
};

describe('renderLessonFiles', () => {
  it('publishes separate localized collections and tracks field-level fallback', () => {
    const files = renderLessonFiles(lesson, '1', 'howLightMoves');
    assert.equal(files.size, 6);
    const config = JSON.parse(files.get('1/howLightMoves/config/uk.json')!);
    const cards = JSON.parse(files.get('1/howLightMoves/flashcards/uk.json')!);
    const questions = JSON.parse(files.get('1/howLightMoves/questions/uk.json')!);
    assert.equal(config.data.title, 'Світло');
    assert.deepEqual(config.data.sections.quiz.content.quiz.quiz.questionSlugs, ['q1']);
    assert.equal(config.data.flashcards, undefined);
    assert.equal(config.data.questions, undefined);
    assert.deepEqual(config.localeSources['/sections/quiz/title'], { code: 'en', isFallback: true });
    assert.equal(cards.data[0].front[0].text, 'Ray');
    assert.deepEqual(cards.localeSources['/0/front/0/text'], { code: 'en', isFallback: true });
    assert.equal(questions.data.selectOneAnswer.q1.title, 'Що?');
  });

  it('rejects a mismatched group or slug', () => {
    assert.throws(() => renderLessonFiles(lesson, '2', 'howLightMoves'), /must declare group 2/);
    assert.throws(() => renderLessonFiles(lesson, '1', 'other'), /must declare group 1 and slug other/);
  });

  it('writes files and removes stale output', () => {
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lesson-test-'));
    try {
      fs.mkdirSync(temp, { recursive: true });
      fs.writeFileSync(path.join(temp, 'stale.json'), '{}');
      const files = renderLessonFiles(lesson, '1', 'howLightMoves');
      writeLessonFiles(temp, files);
      assert.equal(fs.existsSync(path.join(temp, 'stale.json')), false);
      assert.equal(fs.readFileSync(path.join(temp, '1/howLightMoves/config/uk.json'), 'utf8'), files.get('1/howLightMoves/config/uk.json'));
    } finally {
      fs.rmSync(temp, { recursive: true, force: true });
    }
  });
});
