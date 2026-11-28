import { describe, expect, it } from 'vitest';

import { toQuestionProps, type DomainQuestion } from './questionPresentation';

const id = (n: number) => '11111111-1111-4111-8111-' + String(n).padStart(12, '0');
const text = (n: number, slug: string, value: string) => ({
  id: id(n),
  slug,
  type: 'text' as const,
  params: {},
  locale: { value },
});
const group = (entries: Record<string, unknown>, children = Object.keys(entries)) => ({
  children,
  ...entries,
});
const source = (type: DomainQuestion['type'], content: Record<string, unknown>, locale: Record<string, unknown> = {}) =>
  ({
    id: id(1),
    slug: 'question',
    type,
    params: {},
    locale,
    content: { question: group({ prompt: text(2, 'prompt', 'Question') }), ...content },
  }) as unknown as DomainQuestion;

describe('Question Data → interactive presentation Props', () => {
  it('projects single- and multiple-choice keyed groups in authored order without mutating them', () => {
    const correct = group({ right: text(3, 'right', 'Correct') });
    const incorrect = group(
      {
        second: text(4, 'second', 'Second'),
        first: text(5, 'first', 'First'),
      },
      ['first', 'second'],
    );
    const answers = { correct, incorrect, distractors: group({ extra: text(6, 'extra', 'Extra') }) };

    for (const type of ['selectOneAnswer', 'selectMultipleAnswers'] as const) {
      const question = source(type, { answers });
      const result = toQuestionProps(question);
      expect(result.type).toBe(type);
      if (result.type !== 'selectOneAnswer' && result.type !== 'selectMultipleAnswers')
        throw Error('Wrong Question kind');
      expect(result.content.answers.correct.map(item => item.slug)).toEqual(['right']);
      expect(result.content.answers.incorrect.map(item => item.slug)).toEqual(['first', 'second']);
      expect(result.content.answers.distractors.map(item => item.slug)).toEqual(['extra']);
      expect(result.content.question.map(item => item.slug)).toEqual(['prompt']);
    }
    expect(incorrect.children).toEqual(['first', 'second']);
    expect('children' in incorrect).toBe(true);
  });

  it('projects matching pairs and ordered-sequence items without changing paired identities', () => {
    const pairs = group(
      {
        secondPair: { left: text(7, 'leftSecond', 'L2'), right: text(8, 'rightSecond', 'R2') },
        firstPair: { left: text(9, 'leftFirst', 'L1'), right: text(10, 'rightFirst', 'R1') },
      },
      ['firstPair', 'secondPair'],
    );
    const matching = toQuestionProps(source('matchBlocks', { pairs }));
    if (matching.type !== 'matchBlocks') throw Error('Wrong Question kind');
    expect(Object.keys(matching.content.pairs)).toEqual(['firstPair', 'secondPair']);
    expect(matching.content.pairs.firstPair.left.slug).toBe('leftFirst');
    expect(matching.content.pairs.secondPair.right.slug).toBe('rightSecond');

    const sequence = group({ last: text(11, 'last', 'Last'), first: text(12, 'first', 'First') }, ['first', 'last']);
    const ordered = toQuestionProps(source('orderSequence', { sequence }));
    if (ordered.type !== 'orderSequence') throw Error('Wrong Question kind');
    expect(ordered.content.sequence.map(item => item.slug)).toEqual(['first', 'last']);

    const built = toQuestionProps(
      source('buildAnswerWithBlocks', {
        correctSequence: sequence,
        distractors: group({ other: text(13, 'other', 'Other') }),
      }),
    );
    if (built.type !== 'buildAnswerWithBlocks') throw Error('Wrong Question kind');
    expect(built.content.correctSequence.map(item => item.slug)).toEqual(['first', 'last']);
    expect(built.content.distractors.map(item => item.slug)).toEqual(['other']);
  });

  it('projects block and text blank slots while keeping their selector identity', () => {
    const slots = group(
      {
        second: { correctAnswer: text(14, 'answerSecond', 'B') },
        first: { correctAnswer: text(15, 'answerFirst', 'A') },
      },
      ['first', 'second'],
    );
    const blocks = toQuestionProps(
      source('fillBlanksWithBlocks', {
        slots,
        distractors: group({ wrong: text(16, 'wrong', 'Wrong') }),
      }),
    );
    if (blocks.type !== 'fillBlanksWithBlocks') throw Error('Wrong Question kind');
    expect(blocks.content.slots.map(slot => slot.selector)).toEqual(['first', 'second']);
    expect(blocks.content.slots.map(slot => slot.correctAnswer.slug)).toEqual(['answerFirst', 'answerSecond']);
    expect(blocks.content.distractors.map(item => item.slug)).toEqual(['wrong']);

    const locale = {
      placeholder: 'Type',
      slots: group(
        {
          second: { correctAnswers: ['b'] },
          first: { correctAnswers: ['a', 'A'] },
        },
        ['first', 'second'],
      ),
    };
    const blanks = toQuestionProps(source('fillBlanksWithText', {}, locale));
    if (blanks.type !== 'fillBlanksWithText') throw Error('Wrong Question kind');
    expect(blanks.locale.slots).toEqual([
      { selector: 'first', correctAnswers: ['a', 'A'] },
      { selector: 'second', correctAnswers: ['b'] },
    ]);
    expect(locale.slots.children).toEqual(['first', 'second']);
  });

  it('preserves free-text and numeric answer contracts without rendering domain arrays prematurely', () => {
    for (const type of ['answerWithText', 'answerWithNumber'] as const) {
      const question = source(type, {}, { placeholder: 'Your answer' });
      const result = toQuestionProps(question);
      expect(result.type).toBe(type);
      expect(result.content.question.map(item => item.slug)).toEqual(['prompt']);
      expect(result.locale.placeholder).toBe('Your answer');
    }
  });

  it('fails closed on malformed, duplicated and prototype placement keys', () => {
    for (const invalid of [
      group({ a: text(17, 'a', 'A') }, ['a', 'a']),
      group({ a: text(17, 'a', 'A') }, ['missing']),
      group({ a: text(17, 'a', 'A') }, ['constructor']),
      group({ a: text(17, 'a', 'A') }, ['a/b']),
    ]) {
      expect(() => toQuestionProps(source('orderSequence', { sequence: invalid }))).toThrow();
    }
  });
});
