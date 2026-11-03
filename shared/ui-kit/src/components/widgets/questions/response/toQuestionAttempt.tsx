import type { ReactNode } from 'react';
import type { ContentBlock, Question as ContractQuestion } from '@svitlo/engine/content';
import { ContentBlockRenderer } from '../../ContentBlockRenderer';
import type { ContentBlockResponse, SceneRegistry } from '../../ContentBlockRenderer';
import type { FillBlankPart, Item, Question as AttemptQuestion } from '../types';

export type QuestionResponse = ContractQuestion<'response'>;
type Block = ContentBlock<'response'>;

function renderable(block: Block): ContentBlockResponse {
  if (block.type === 'quiz') throw new Error('Quiz cannot be rendered inside a question');
  return block;
}

export function renderQuestionBlocks(blocks: readonly Block[] | undefined, sceneRegistry?: SceneRegistry): ReactNode {
  if (!blocks?.length) return null;
  return <ContentBlockRenderer blocks={blocks.map(renderable)} sceneRegistry={sceneRegistry} />;
}

function blockLabel(block: Block): string {
  switch (block.type) {
    case 'text': return block.value;
    case 'markdown': return block.text.replace(/[*_#`]/gu, '');
    case 'image': return block.alt;
    case 'audio': return block.title;
    case 'video': return block.title ?? '';
    case 'youtube': return block.title ?? block.hint ?? '';
    case 'code': return block.title ?? block.language;
    case 'checkpoint': return block.title;
    case 'scene': return block.rendererKey;
    default: return '';
  }
}

export function questionLabel(blocks: readonly Block[] | undefined): string {
  return blocks?.map(blockLabel).filter(Boolean).join(' ') || '';
}

function item(id: string, block: Block, sceneRegistry?: SceneRegistry): Item {
  return { id, label: blockLabel(block) || id, content: renderQuestionBlocks([block], sceneRegistry) };
}

function stableOrder<T extends { id: string }>(items: T[], seed: string): T[] {
  const score = (id: string) => {
    let hash = 2166136261;
    for (const char of `${seed}:${id}`) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
    return hash >>> 0;
  };
  return [...items].sort((a, b) => score(a.id) - score(b.id));
}

function choices(
  answers: { correct: Readonly<Record<string, Block>>; incorrect: Readonly<Record<string, Block>>; distractors: Readonly<Record<string, Block>> },
  id: string,
  sceneRegistry?: SceneRegistry,
) {
  const records = Object.entries(answers).flatMap(([group, entries]) =>
    Object.entries(entries).map(([slug, block]) => ({ group, item: item(`${group}:${slug}`, block, sceneRegistry) })));
  return {
    options: stableOrder(records.map(entry => entry.item), id),
    correctIds: records.filter(entry => entry.group === 'correct').map(entry => entry.item.id),
  };
}

function blankParts(selectors: readonly string[]): FillBlankPart[] {
  return selectors.map(selector => ({ type: 'blank', id: selector }));
}

export function toQuestionAttempt(response: QuestionResponse, sceneRegistry?: SceneRegistry): AttemptQuestion {
  const base = {
    id: response.id,
    prompt: questionLabel(response.question) || response.id,
    explanation: questionLabel(response.explanation),
  };

  switch (response.type) {
    case 'selectOneAnswer': {
      const { options, correctIds } = choices(response.answers, response.id, sceneRegistry);
      return { ...base, type: 'single-select', options, correctId: correctIds[0] ?? '', acceptedIds: correctIds };
    }
    case 'selectMultipleAnswers': {
      const { options, correctIds } = choices(response.answers, response.id, sceneRegistry);
      return { ...base, type: 'multiple-select', options, correctIds };
    }
    case 'matchBlocks': {
      const pairs = Object.entries(response.pairs).map(([id, pair]) => ({
        id, left: item(`${id}:left`, pair.left, sceneRegistry), right: item(`${id}:right`, pair.right, sceneRegistry),
      }));
      return {
        ...base, type: 'matching', left: pairs.map(pair => pair.left),
        right: stableOrder(pairs.map(pair => pair.right), response.id),
        pairs: pairs.map(pair => ({ id: pair.id, leftId: pair.left.id, rightId: pair.right.id })),
      };
    }
    case 'answerWithText':
      return { ...base, type: 'short-text', acceptedAnswers: [...response.correctAnswers], placeholder: response.placeholder,
        normalization: { trim: true, ignoreCase: true, collapseWhitespace: true } };
    case 'answerWithNumber':
      return { ...base, type: 'numeric', expected: response.correctAnswers[0] ?? Number.NaN, placeholder: response.placeholder,
        acceptedNumbers: [...response.correctAnswers], tolerance: 0 };
    case 'orderSequence': {
      const ordered = response.sequence.map((block, index) => item(`${index}:${block.id}`, block, sceneRegistry));
      return { ...base, type: 'ordering', items: ordered.length > 1 ? [...ordered].reverse() : ordered,
        correctOrder: ordered.map(entry => entry.id) };
    }
    case 'buildAnswerWithBlocks': {
      const sequence = response.correctSequence.map((block, index) => item(`correct:${index}:${block.id}`, block, sceneRegistry));
      const distractors = response.distractors.map((block, index) => item(`distractor:${index}:${block.id}`, block, sceneRegistry));
      return { ...base, type: 'block-builder', blocks: stableOrder([...sequence, ...distractors], response.id),
        acceptedSequences: [sequence.map(entry => entry.id)] };
    }
    case 'fillBlanksWithBlocks': {
      const correct = response.slots.map(({ selector, correctAnswer }) => ({
        selector, item: item(`correct:${selector}`, correctAnswer, sceneRegistry),
      }));
      const distractors = response.distractors.map((block, index) => item(`distractor:${index}`, block, sceneRegistry));
      return { ...base, type: 'fill-blanks-drag', parts: blankParts(correct.map(entry => entry.selector)), placeholder: response.placeholder,
        blocks: stableOrder([...correct.map(entry => entry.item), ...distractors], response.id),
        correctBlocks: Object.fromEntries(correct.map(entry => [entry.selector, entry.item.id])) };
    }
    case 'fillBlanksWithText':
      return { ...base, type: 'fill-blanks-text', parts: blankParts(response.slots.map(slot => slot.selector)), placeholder: response.placeholder,
        acceptedAnswers: Object.fromEntries(response.slots.map(slot => [slot.selector, [...slot.correctAnswers]])),
        normalization: { trim: true, ignoreCase: true, collapseWhitespace: true } };
  }
}
