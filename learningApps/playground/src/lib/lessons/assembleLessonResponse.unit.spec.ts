import { describe, expect, it } from 'vitest';
import { assembleLessonResponse } from '@svitlo/engine/lesson';

const id = 'd3048d21-8690-5255-b62c-984c69ac272c';

function fixture() {
  return {
    config: {
      localeSources: { '/title': { code: 'uk' as const } },
      data: {
        id,
        slug: 'howLightMoves',
        title: 'Світло',
        parameters: {
          requireQuiz: true,
          languages: ['uk', 'en'],
          sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
        },
        sections: [
          {
            id: 'section-id', slug: 'theory', type: 'theory', title: 'Теорія', navigationLabel: 'Теорія',
            content: [
              { type: 'markdown', id: 'markdown-id', slug: 'p1', locales: '# Світло' },
              { type: 'scene', id: 'scene-id', slug: 'ray', locales: { scene: { title: 'Промінь' } } },
              { type: 'checkpoint', id: 'check-id', slug: 'checkpoint', title: 'Перевірка', items: [] },
            ],
          },
          {
            id: 'quiz-section', slug: 'quiz', type: 'quiz', title: 'Тест', navigationLabel: 'Тест',
            content: [{ type: 'quiz', id: 'quiz-id', slug: 'quiz', questionSlugs: ['q1'] }],
          },
        ],
      },
    },
    flashcards: { localeSources: {}, data: [{ id: 'card-id' }] },
    questions: { localeSources: {}, data: { selectOneAnswer: {
      q1: {
        id: 'question-id', slug: 'q1', type: 'selectOneAnswer',
        question: [{ id: 'prompt-id', slug: 'prompt', type: 'text', value: 'Запитання' }],
      },
    } } },
  };
}

describe('assembleLessonResponse', () => {
  it('retains array ordering, locale sources, markdown, scene locales and quiz references', () => {
    const lesson = assembleLessonResponse(id, 'uk', fixture());
    expect(lesson.sections.map(section => section.slug)).toEqual(['theory', 'quiz']);
    expect(lesson.sections[0].content.map(block => block.type)).toEqual(['markdown', 'scene', 'checkpoint']);
    expect(lesson.sections[1].content.map(block => block.type)).toEqual(['quiz']);
    expect(lesson.sections[1].questions.map(question => question.id)).toEqual(['question-id']);
    expect(lesson.sections[0].questions).toEqual([]);
    expect(lesson.sections[0].type).toBe('theory');
    expect(lesson.sections[1].type).toBe('quiz');
    const markdown = lesson.sections[0].content[0];
    expect(markdown.type).toBe('markdown');
    if (markdown.type === 'markdown') expect(markdown.text).toBe('# Світло');
    const scene = lesson.sections[0].content[1];
    expect(scene.type).toBe('scene');
    if (scene.type === 'scene') {
      expect(scene.rendererKey).toBe('scene-id');
      expect(scene.locales).toEqual({ scene: { title: 'Промінь' } });
    }
    const quiz = lesson.sections[1].content[0];
    expect(quiz.type).toBe('quiz');
    if (quiz.type === 'quiz') expect(quiz.questionSlugs).toEqual(['q1']);
    expect(lesson.localeSources.config['/title']).toEqual({ code: 'uk' });
    expect(lesson.flashcards).toHaveLength(1);
  });

  it('rejects contradictory locale fallback provenance', () => {
    const raw = fixture();
    (raw.config.localeSources as Record<string, { code: string }>)['/title'].code = 'en';
    expect(() => assembleLessonResponse(id, 'uk', raw)).toThrow(/Contradictory fallback metadata/);
  });

  it('rejects duplicate section identity rather than silently overwriting a section', () => {
    const raw = fixture();
    raw.config.data.sections[1].slug = 'theory';
    expect(() => assembleLessonResponse(id, 'uk', raw)).toThrow(/Duplicate section identity/);
  });

  it('rejects a dangling quiz reference', () => {
    const raw = fixture();
    (raw.config.data.sections[1].content[0] as { questionSlugs: string[] }).questionSlugs = ['missing'];
    expect(() => assembleLessonResponse(id, 'uk', raw)).toThrow(/missing or ambiguous question/);
  });

  it('rejects an unknown section type or a quiz section without quiz content', () => {
    const invalidType = fixture();
    invalidType.config.data.sections[0].type = 'unknown';
    expect(() => assembleLessonResponse(id, 'uk', invalidType)).toThrow(/Unsupported section type/);
    const mismatchedQuiz = fixture();
    mismatchedQuiz.config.data.sections[1].type = 'theory';
    expect(() => assembleLessonResponse(id, 'uk', mismatchedQuiz)).toThrow(/Quiz section type and content disagree/);
  });

  it('rejects duplicate or undiscriminated blocks', () => {
    const duplicate = fixture();
    duplicate.config.data.sections[0].content[1].type = 'markdown';
    duplicate.config.data.sections[0].content[1].slug = 'p1';
    expect(() => assembleLessonResponse(id, 'uk', duplicate)).toThrow(/Duplicate content block/);
    const missingType = fixture();
    (missingType.config.data.sections[0].content[0] as { type?: string }).type = undefined;
    expect(() => assembleLessonResponse(id, 'uk', missingType)).toThrow(/Invalid lesson resource.*type/);
  });

  it('rejects the wrong identity or an unsupported locale', () => {
    expect(() => assembleLessonResponse('00000000-0000-5000-8000-000000000002', 'uk', fixture())).toThrow(/identity mismatch/);
    const unsupported = fixture();
    expect(() => assembleLessonResponse(id, 'fr', {
      ...unsupported,
      config: { ...unsupported.config, localeSources: {} },
    })).toThrow(/does not support language/);
  });
});
