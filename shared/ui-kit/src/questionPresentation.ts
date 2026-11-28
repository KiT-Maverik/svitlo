/** Domain Question resources retain keyed groups. Only interactive UI uses these arrays. */
import type {
  ContentBlock_Primitive_Data,
  Question_AnswerWithNumber_Data,
  Question_AnswerWithText_Data,
  Question_BuildAnswerWithBlocks_Data,
  Question_FillBlanksWithBlocks_Data,
  Question_FillBlanksWithText_Data,
  Question_MatchBlocks_Data,
  Question_OrderSequence_Data,
  Question_SelectMultipleAnswers_Data,
  Question_SelectOneAnswer_Data,
} from '@svitlo/engine/runtime';

import { toPrimitiveBlockProps } from './presentation';

export type DomainQuestion =
  | Question_AnswerWithNumber_Data
  | Question_AnswerWithText_Data
  | Question_BuildAnswerWithBlocks_Data
  | Question_FillBlanksWithBlocks_Data
  | Question_FillBlanksWithText_Data
  | Question_MatchBlocks_Data
  | Question_OrderSequence_Data
  | Question_SelectMultipleAnswers_Data
  | Question_SelectOneAnswer_Data;

type Block = ContentBlock_Primitive_Data;
type Common = { question: Block[]; hint?: Block[]; explanation?: Block[] };
type Presented<T extends DomainQuestion, Additional extends object = object> = Omit<T, 'content'> & {
  content: Common & Additional;
};

type Answers = { answers: { correct: Block[]; incorrect: Block[]; distractors: Block[] } };
type Pairs = { pairs: Record<string, { left: Block; right: Block }> };
type Sequence = { sequence: Block[] };
type BlockSlots = { slots: { selector: string; correctAnswer: Block }[]; distractors: Block[] };
type TextSlots = { selector: string; correctAnswers: string[] }[];

export type QuestionViewProps =
  | Presented<Question_SelectOneAnswer_Data, Answers>
  | Presented<Question_SelectMultipleAnswers_Data, Answers>
  | Presented<Question_MatchBlocks_Data, Pairs>
  | Presented<Question_AnswerWithText_Data>
  | Presented<Question_AnswerWithNumber_Data>
  | Presented<Question_OrderSequence_Data, Sequence>
  | Presented<Question_BuildAnswerWithBlocks_Data, { correctSequence: Block[]; distractors: Block[] }>
  | Presented<Question_FillBlanksWithBlocks_Data, BlockSlots>
  | (Omit<Question_FillBlanksWithText_Data, 'locale' | 'content'> & {
      locale: Pick<Question_FillBlanksWithText_Data['locale'], 'placeholder'> & { slots: TextSlots };
      content: Common;
    });

function asRecord(value: unknown, name: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Invalid Question ' + name);
  return value as Record<string, unknown>;
}
const placement = /^[a-z][a-zA-Z0-9]*$/;
const reserved = new Set(['__proto__', 'prototype', 'constructor', 'children', 'order', 'items']);
function orderedEntries(value: unknown, name: string): [string, unknown][] {
  const group = asRecord(value, name);
  if (!Array.isArray(group.children) || new Set(group.children).size !== group.children.length)
    throw Error('Invalid Question order at ' + name);
  return group.children.map(key => {
    if (typeof key !== 'string' || !placement.test(key) || reserved.has(key) || !Object.hasOwn(group, key))
      throw Error('Invalid Question placement at ' + name);
    return [key, group[key]];
  });
}
function primitive(value: unknown): Block {
  const group = { children: ['item'], item: value };
  const blocks = toPrimitiveBlockProps(group);
  if (blocks.length !== 1) throw Error('Missing Question ContentBlock');
  return blocks[0];
}

export function toQuestionProps(question: DomainQuestion): QuestionViewProps {
  const base: Common = {
    question: toPrimitiveBlockProps(question.content.question),
    ...(question.content.hint ? { hint: toPrimitiveBlockProps(question.content.hint) } : {}),
    ...(question.content.explanation ? { explanation: toPrimitiveBlockProps(question.content.explanation) } : {}),
  };
  switch (question.type) {
    case 'selectOneAnswer':
    case 'selectMultipleAnswers':
      return {
        ...question,
        content: {
          ...base,
          answers: {
            correct: toPrimitiveBlockProps(question.content.answers.correct),
            incorrect: toPrimitiveBlockProps(question.content.answers.incorrect),
            distractors: toPrimitiveBlockProps(question.content.answers.distractors),
          },
        },
      } as QuestionViewProps;
    case 'matchBlocks':
      return {
        ...question,
        content: {
          ...base,
          pairs: Object.fromEntries(
            orderedEntries(question.content.pairs, 'matching pairs').map(([key, value]) => {
              const pair = asRecord(value, 'pair');
              return [key, { left: primitive(pair.left), right: primitive(pair.right) }];
            }),
          ),
        },
      } as QuestionViewProps;
    case 'orderSequence':
      return {
        ...question,
        content: { ...base, sequence: toPrimitiveBlockProps(question.content.sequence) },
      } as QuestionViewProps;
    case 'buildAnswerWithBlocks':
      return {
        ...question,
        content: {
          ...base,
          correctSequence: toPrimitiveBlockProps(question.content.correctSequence),
          distractors: toPrimitiveBlockProps(question.content.distractors),
        },
      } as QuestionViewProps;
    case 'fillBlanksWithBlocks':
      return {
        ...question,
        content: {
          ...base,
          slots: orderedEntries(question.content.slots, 'block slots').map(([selector, value]) => ({
            selector,
            correctAnswer: primitive(asRecord(value, 'slot').correctAnswer),
          })),
          distractors: toPrimitiveBlockProps(question.content.distractors),
        },
      } as QuestionViewProps;
    case 'fillBlanksWithText':
      return {
        ...question,
        locale: {
          ...question.locale,
          slots: orderedEntries(question.locale.slots, 'text slots').map(([selector, value]) => ({
            selector,
            correctAnswers: asRecord(value, 'text slot').correctAnswers as string[],
          })),
        },
        content: base,
      } as QuestionViewProps;
    case 'answerWithNumber':
    case 'answerWithText':
      return { ...question, content: base } as QuestionViewProps;
  }
}
