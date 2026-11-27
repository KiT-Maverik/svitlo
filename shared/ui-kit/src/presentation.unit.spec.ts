import { describe, expect, it } from 'vitest';

import type { Lesson_Data, LocalizedAssessment, LocalizedEpisode } from '@svitlo/engine/runtime';

import {
  toAssessmentProps, toContentBlockProps, toEpisodeProps, toLessonProps, toPrimitiveBlockProps,
} from './presentation';
import { toQuestionProps, type DomainQuestion } from './questionPresentation';

const uuid = (n: number) => '00000000-0000-4000-8000-' + String(n).padStart(12, '0');
const text = (n: number, slug: string, value: string) => ({
  id: uuid(n), slug, type: 'text' as const, params: {}, locale: { value },
});

const checkpoint = {
  id: uuid(1), slug: 'checkpoint', type: 'checkpoint' as const,
  params: { enableChecks: true, requireCompletion: true }, locale: { title: 'Review' },
  children: ['one'],
  one: {
    id: uuid(2), slug: 'one', type: 'checkpointItem' as const, check: true as const,
    question: text(3, 'question', 'What is light?'),
    answer: {
      id: uuid(4), slug: 'answer', type: 'checkpointAnswer' as const,
      children: ['first', 'second'],
      first: text(5, 'first', 'Electromagnetic'),
      second: text(6, 'second', 'radiation'),
    },
  },
};

const gallery = {
  id: uuid(7), slug: 'gallery', type: 'carousel' as const,
  params: {}, locale: { title: 'Gallery' },
  children: ['second', 'first'],
  second: {
    id: uuid(9), slug: 'second', type: 'image' as const, params: {},
    locale: { src: '/second.png', alt: 'Second image' },
  },
  first: {
    id: uuid(8), slug: 'first', type: 'image' as const, params: {},
    locale: { src: '/first.png', alt: 'First image' },
  },
};

const intro = {
  id: uuid(10), slug: 'intro', type: 'content' as const,
  params: {}, locale: { title: 'Introduction', navigationLabel: 'Intro' },
  children: ['gallery', 'checkpoint'], gallery, checkpoint,
};

describe('host-neutral presentation boundary', () => {
  it('projects nested Checkpoint Answers and Carousel slides in authored order without mutating Data', () => {
    const source = {
      id: uuid(11), slug: 'lesson', type: 'lesson' as const,
      params: {
        languages: ['en'], quizRequiredForCompletion: false,
        sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
      },
      locale: { title: 'Lesson' }, skills: [], children: ['intro'], intro,
    } as unknown as Lesson_Data;
    const view = toLessonProps(source);
    expect(view.section).toHaveLength(1);
    expect(view.section[0].content.map(item => item.type)).toEqual(['carousel', 'checkpoint']);
    const slides = view.section[0].content[0];
    expect(slides.type).toBe('carousel');
    if (slides.type !== 'carousel') throw Error('Expected Carousel Props');
    expect(slides.locale.slides.map(item => item.id)).toEqual([uuid(9), uuid(8)]);
    expect('children' in slides).toBe(false);

    const review = view.section[0].content[1];
    if (review.type !== 'checkpoint') throw Error('Expected Checkpoint Props');
    expect(review.content[0].answer.map(item => item.type === 'text' ? item.locale.value : undefined)).toEqual([
      'Electromagnetic', 'radiation',
    ]);
    expect('children' in review).toBe(false);
    expect('section' in source).toBe(false);
    expect(intro.children).toEqual(['gallery', 'checkpoint']);
    expect(checkpoint.one.answer.children).toEqual(['first', 'second']);
  });

  it('projects Episode and named Assessment phases without making them Lessons', () => {
    const episode = {
      id: uuid(12), slug: 'story', type: 'episode',
      params: { languages: ['en'] }, locale: { title: 'Story' },
      children: ['intro'], intro,
    } as unknown as LocalizedEpisode;
    expect(toEpisodeProps(episode).section.map(item => item.id)).toEqual([uuid(10)]);
    const quiz = {
      id: uuid(13), slug: 'quiz', type: 'quiz',
      params: { selection: { mode: 'all', questionIds: [uuid(20)] } },
      locale: { title: 'Quiz', navigationLabel: 'Quiz' }, children: [],
    };
    const assessment = {
      id: uuid(14), slug: 'assessment', type: 'assessment',
      params: { languages: ['en'] }, locale: { title: 'Assessment' },
      before: { children: ['intro'], intro }, quiz, after: { children: [] },
    } as unknown as LocalizedAssessment;
    expect(toAssessmentProps(assessment).section.map(item => item.type)).toEqual(['content', 'quiz']);
  });

  it('rejects missing, unsafe or duplicate direct child placements', () => {
    expect(() => toContentBlockProps({ ...gallery, children: ['missing'] })).toThrow();
    expect(() => toContentBlockProps({ ...gallery, children: ['second', 'second'] })).toThrow();
    expect(() => toContentBlockProps({ ...gallery, children: ['constructor'] })).toThrow('placement');
  });

  it('projects independently published Question prompt and answer groups', () => {
    const question = {
      id: uuid(15), slug: 'prompt', type: 'selectOneAnswer',
      params: { assessmentMethod: 'testing', restrictions: [] }, locale: {},
      content: {
        question: { children: ['prompt'], prompt: text(16, 'prompt', 'Which travels?') },
        answers: {
          correct: { children: ['sun'], sun: text(17, 'sun', 'Light') },
          incorrect: { children: ['stone'], stone: text(18, 'stone', 'Stone') },
          distractors: { children: [] },
        },
      },
    } as unknown as DomainQuestion;
    const view = toQuestionProps(question);
    expect(view.content.question.map(item => item.id)).toEqual([uuid(16)]);
    if (view.type !== 'selectOneAnswer') throw Error('Expected Select One Props');
    expect(view.content.answers.correct[0]?.type === 'text' && view.content.answers.correct[0].locale.value).toBe('Light');
    expect(toPrimitiveBlockProps({
      children: ['a', 'b'], a: text(17, 'a', 'A'), b: text(18, 'b', 'B'),
    }).map(item => item.slug)).toEqual(['a', 'b']);
  });
});
