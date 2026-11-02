import { describe, expect, it } from 'vitest';
import { assembleLessonResponse } from './assembleLessonResponse';
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
        sectionOrder: ['theory', 'quiz'],
        sections: {
          theory: {
            id: 'section-id', slug: 'theory', type: 'theory', title: 'Теорія', navigationLabel: 'Теорія',
            order: [{ type: 'markdown', key: 'p1' }, { type: 'scene', key: 'ray' }, { type: 'checkpoint', key: 'checkpoint' }],
            content: {
              markdown: { p1: { id: 'markdown-id', slug: 'p1', locales: '# Світло' } },
              scene: { ray: { id: 'scene-id', slug: 'ray', locales: { scene: { title: 'Промінь' } } } },
              checkpoint: { checkpoint: { id: 'check-id', slug: 'checkpoint', title: 'Перевірка', items: [] } },
            },
          },
          quiz: {
            id: 'quiz-section', slug: 'quiz', type: 'quiz', title: 'Тест', navigationLabel: 'Тест',
            order: [{ type: 'quiz', key: 'quiz' }],
            content: { quiz: { quiz: { id: 'quiz-id', slug: 'quiz', questionSlugs: ['q1'] } } },
          },
        },
      },
    },
    flashcards: { localeSources: {}, data: [{ id: 'card-id' }] },
    questions: { localeSources: {}, data: { selectOneAnswer: {
      q1: { id: 'question-id', slug: 'q1', type: 'selectOneAnswer', question: [{ value: 'Запитання' }] },
    } } },
  };
}

describe('assembleLessonResponse', () => {
  it('preserves ordering, locale sources, markdown, scene identity and resolved questions', () => {
    const lesson = assembleLessonResponse(id, 'uk', fixture());
    expect(Object.keys(lesson.sections)).toEqual(['theory', 'quiz']);
    expect(lesson.sections.theory.order).toEqual([{ type: 'markdown', key: 'p1' }, { type: 'scene', key: 'ray' }, { type: 'checkpoint', key: 'checkpoint' }]);
    expect(lesson.sectionOrder).toEqual(['theory', 'quiz']);
    expect(lesson.sections.theory.type).toBe('theory');
    expect(lesson.sections.quiz.type).toBe('quiz');
    expect(lesson.sections.theory.content.markdown.p1.text).toEqual('# Світло');
    expect(lesson.sections.theory.content.scene.ray.sceneId).toEqual('c/'+id+'/theory/scene/ray');
    expect(lesson.sections.theory.content.scene.ray.locale).toEqual({
      scene: { title: 'Промінь' }, code: 'uk',
    });
    expect(lesson.sections.theory.content.checkpoint.checkpoint).toBeDefined();
    expect(lesson.sections.quiz.content.quiz.quiz.questions?.q1.id).toEqual('question-id');
    expect(lesson.localeSources.config['/title']).toEqual({ code: 'uk' });
    expect(lesson.flashcards).toHaveLength(1);
  });
  it('rejects contradictory locale fallback provenance', () => {
    const raw = fixture();
    (raw.config.localeSources as Record<string, { code: string }>)['/title'].code = 'en';
    expect(() => assembleLessonResponse(id, 'uk', raw)).toThrow(/Contradictory fallback metadata/);
  });
  it('rejects inconsistent section ordering', () => {
    const raw = fixture();
    raw.config.data.sectionOrder = ['quiz', 'missing'];
    expect(() => assembleLessonResponse(id, 'uk', raw)).toThrow(/sectionOrder/);
  });
  it('rejects a dangling quiz reference', () => {
    const raw = fixture();
    raw.config.data.sections.quiz.content.quiz.quiz.questionSlugs = ['missing'];
    expect(() => assembleLessonResponse(id, 'uk', raw)).toThrow(/missing or ambiguous question/);
  });
  it('rejects an unknown section type or a quiz section without quiz content', () => {
    const invalidType = fixture();
    invalidType.config.data.sections.theory.type = 'unknown';
    expect(() => assembleLessonResponse(id, 'uk', invalidType)).toThrow(/Unsupported section type/);
    const mismatchedQuiz = fixture();
    mismatchedQuiz.config.data.sections.quiz.type = 'theory';
    expect(() => assembleLessonResponse(id, 'uk', mismatchedQuiz)).toThrow(/Quiz section type and content disagree/);
  });
  it('rejects an invalid order rather than silently dropping blocks', () => {
    const raw = fixture();
    raw.config.data.sections.theory.order = [{ type: 'markdown', key: 'p1' }];
    expect(() => assembleLessonResponse(id, 'uk', raw)).toThrow(/content order/);
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
