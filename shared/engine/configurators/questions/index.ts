import { z } from 'zod';
import { ASSESSMENT_METHOD_KEYS } from '@svitlo/contracts/content';
import { childDefinition, defineStructured, localizedText, uuid, slug, resolvedProps } from '../structured';
import type { DefinitionLanguages } from '../structured';
import type { ContentBlockDefinition } from '../contentBlocks/defineRemaining';

const block = () => childDefinition<ContentBlockDefinition>();
const blocks = () => z.tuple([block()], block());
const texts = <L extends DefinitionLanguages>(l: L) => localizedText(l);
const common = <Kind extends string, L extends DefinitionLanguages>(kind: Kind, l: L) => ({
  id: uuid,
  slug,
  type: z.literal(kind),
  assessmentMethod: z.enum(ASSESSMENT_METHOD_KEYS),
  restrictions: z.array(z.string()),
  question: blocks(),
  hint: blocks().optional(),
  explanation: blocks().optional(),
});
const answerGroups = () =>
  z.strictObject({
    correct: z.record(z.string(), block()),
    incorrect: z.record(z.string(), block()),
    distractors: z.record(z.string(), block()),
  });
export const selectOneAnswerSchema = <L extends DefinitionLanguages>(l: L) =>
  z.strictObject({ ...common('selectOneAnswer', l), answers: answerGroups() });
export const selectMultipleAnswersSchema = <L extends DefinitionLanguages>(l: L) =>
  z.strictObject({ ...common('selectMultipleAnswers', l), answers: answerGroups() });
export const matchBlocksSchema = <L extends DefinitionLanguages>(l: L) =>
  z.strictObject({
    ...common('matchBlocks', l),
    pairs: z.record(z.string(), z.strictObject({ left: block(), right: block() })),
  });
export const answerWithTextSchema = <L extends DefinitionLanguages>(l: L) =>
  z.strictObject({ ...common('answerWithText', l), correctAnswers: z.array(texts(l)), placeholder: texts(l) });
export const answerWithNumberSchema = <L extends DefinitionLanguages>(l: L) =>
  z.strictObject({ ...common('answerWithNumber', l), correctAnswers: z.array(z.number()), placeholder: texts(l) });
export const orderSequenceSchema = <L extends DefinitionLanguages>(l: L) =>
  z.strictObject({ ...common('orderSequence', l), sequence: blocks() });
export const buildAnswerWithBlocksSchema = <L extends DefinitionLanguages>(l: L) =>
  z.strictObject({
    ...common('buildAnswerWithBlocks', l),
    correctSequence: blocks(),
    distractors: z.array(block()),
    placeholder: texts(l),
  });
export const fillBlanksWithBlocksSchema = <L extends DefinitionLanguages>(l: L) =>
  z.strictObject({
    ...common('fillBlanksWithBlocks', l),
    slots: z.array(z.strictObject({ selector: z.string(), correctAnswer: block() })),
    distractors: z.array(block()),
    placeholder: texts(l),
  });
export const fillBlanksWithTextSchema = <L extends DefinitionLanguages>(l: L) =>
  z.strictObject({
    ...common('fillBlanksWithText', l),
    slots: z.array(z.strictObject({ selector: z.string(), correctAnswers: z.array(texts(l)) })),
    placeholder: texts(l),
  });

export function defineSelectOneAnswer<const L extends DefinitionLanguages>(
  source: z.input<ReturnType<typeof selectOneAnswerSchema<L>>>,
) {
  return defineStructured('selectOneAnswer', source, selectOneAnswerSchema<L>, resolvedProps('selectOneAnswer'), []);
}
export function defineSelectMultipleAnswers<const L extends DefinitionLanguages>(
  source: z.input<ReturnType<typeof selectMultipleAnswersSchema<L>>>,
) {
  return defineStructured(
    'selectMultipleAnswers',
    source,
    selectMultipleAnswersSchema<L>,
    resolvedProps('selectMultipleAnswers'),
    [],
  );
}
export function defineMatchBlocks<const L extends DefinitionLanguages>(
  source: z.input<ReturnType<typeof matchBlocksSchema<L>>>,
) {
  return defineStructured('matchBlocks', source, matchBlocksSchema<L>, resolvedProps('matchBlocks'), []);
}
export function defineAnswerWithText<const L extends DefinitionLanguages>(
  source: z.input<ReturnType<typeof answerWithTextSchema<L>>>,
) {
  return defineStructured('answerWithText', source, answerWithTextSchema<L>, resolvedProps('answerWithText'), [
    'correctAnswers.*',
    'placeholder',
  ]);
}
export function defineAnswerWithNumber<const L extends DefinitionLanguages>(
  source: z.input<ReturnType<typeof answerWithNumberSchema<L>>>,
) {
  return defineStructured('answerWithNumber', source, answerWithNumberSchema<L>, resolvedProps('answerWithNumber'), [
    'placeholder',
  ]);
}
export function defineOrderSequence<const L extends DefinitionLanguages>(
  source: z.input<ReturnType<typeof orderSequenceSchema<L>>>,
) {
  return defineStructured('orderSequence', source, orderSequenceSchema<L>, resolvedProps('orderSequence'), []);
}
export function defineBuildAnswerWithBlocks<const L extends DefinitionLanguages>(
  source: z.input<ReturnType<typeof buildAnswerWithBlocksSchema<L>>>,
) {
  return defineStructured(
    'buildAnswerWithBlocks',
    source,
    buildAnswerWithBlocksSchema<L>,
    resolvedProps('buildAnswerWithBlocks'),
    ['placeholder'],
  );
}
export function defineFillBlanksWithBlocks<const L extends DefinitionLanguages>(
  source: z.input<ReturnType<typeof fillBlanksWithBlocksSchema<L>>>,
) {
  return defineStructured(
    'fillBlanksWithBlocks',
    source,
    fillBlanksWithBlocksSchema<L>,
    resolvedProps('fillBlanksWithBlocks'),
    ['placeholder'],
  );
}
export function defineFillBlanksWithText<const L extends DefinitionLanguages>(
  source: z.input<ReturnType<typeof fillBlanksWithTextSchema<L>>>,
) {
  return defineStructured(
    'fillBlanksWithText',
    source,
    fillBlanksWithTextSchema<L>,
    resolvedProps('fillBlanksWithText'),
    ['slots.*.correctAnswers.*', 'placeholder'],
  );
}
