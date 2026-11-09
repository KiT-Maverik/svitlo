import { z } from 'zod';
import type { LessonState } from '@svitlo/contracts/content';

const id = z.string().min(1);
const base = { id, lessonId: id };
const progress = {
  ...base,
  startedAt: z.string(),
  currentSectionId: id.optional(),
  sectionCompletion: z.record(id, z.boolean()),
  skippedSectionIds: z.array(id),
  quizStateIds: z.record(id, id),
};

export const newLessonState_Schema = z.strictObject({
  ...base,
  status: z.literal('new'),
}) satisfies z.ZodType<Extract<LessonState, { status: 'new' }>>;

export const inProgressLessonState_Schema = z.strictObject({
  ...progress,
  status: z.literal('in-progress'),
}) satisfies z.ZodType<Extract<LessonState, { status: 'in-progress' }>>;

export const contentCompleteLessonState_Schema = z.strictObject({
  ...progress,
  status: z.literal('content-complete'),
  contentCompletedAt: z.string(),
}) satisfies z.ZodType<Extract<LessonState, { status: 'content-complete' }>>;

export const finishedLessonState_Schema = z.strictObject({
  ...progress,
  status: z.literal('finished'),
  contentCompletedAt: z.string(),
  completedAt: z.string(),
}) satisfies z.ZodType<Extract<LessonState, { status: 'finished' }>>;

export const lessonState_Schema: z.ZodType<LessonState> = z.discriminatedUnion('status', [
  newLessonState_Schema,
  inProgressLessonState_Schema,
  contentCompleteLessonState_Schema,
  finishedLessonState_Schema,
]);
