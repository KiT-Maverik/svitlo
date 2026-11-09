import { z } from 'zod';
import type { QuizState } from '@svitlo/contracts/content';

const id = z.string().min(1);
const stringArray = z.array(id);
const answerSchema = z.discriminatedUnion('type', [
  z.strictObject({ type: z.literal('select-one-answer'), value: id }),
  z.strictObject({ type: z.literal('select-multiple-answers'), value: stringArray }),
  z.strictObject({ type: z.literal('match-blocks'), value: z.record(id, id) }),
  z.strictObject({ type: z.literal('answer-with-text'), value: z.string() }),
  z.strictObject({ type: z.literal('answer-with-number'), value: z.string() }),
  z.strictObject({ type: z.literal('order-sequence'), value: stringArray }),
  z.strictObject({ type: z.literal('build-answer-with-blocks'), value: stringArray }),
  z.strictObject({ type: z.literal('fill-blanks-with-blocks'), value: z.record(id, id.nullable()) }),
  z.strictObject({ type: z.literal('fill-blanks-with-text'), value: z.record(id, z.string()) }),
]);

const questionResultSchema = z.strictObject({
  status: z.enum(['correct', 'incorrect']),
  earnedWeight: z.number().finite().nonnegative(),
});

const questionStateSchema = z.discriminatedUnion('status', [
  z.strictObject({ status: z.literal('draft'), answer: answerSchema }),
  z.strictObject({ status: z.literal('deferred'), answer: answerSchema.optional() }),
  z.strictObject({ status: z.literal('submitted'), answer: answerSchema, result: questionResultSchema.optional() }),
]);

const resultSchema = z.discriminatedUnion('status', [
  z.strictObject({ status: z.literal('graded'), success: z.boolean(), value: z.number().finite() }),
  z.strictObject({ status: z.literal('ungraded') }),
]);

const base = { id, quizId: id };
const progress = { ...base, startedAt: z.string(), answers: z.record(id, questionStateSchema) };

export const quizStateSchema: z.ZodType<QuizState> = z.discriminatedUnion('status', [
  z.strictObject({ ...base, status: z.literal('new') }),
  z.strictObject({ ...progress, status: z.literal('in-progress') }),
  z.strictObject({ ...progress, status: z.literal('finished'), completedAt: z.string(), result: resultSchema }),
]);
