import { z } from 'zod';

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
});

export const inProgressLessonState_Schema = z.strictObject({
  ...progress,
  status: z.literal('in-progress'),
});

export const contentCompleteLessonState_Schema = z.strictObject({
  ...progress,
  status: z.literal('content-complete'),
  contentCompletedAt: z.string(),
});

export const finishedLessonState_Schema = z.strictObject({
  ...progress,
  status: z.literal('finished'),
  contentCompletedAt: z.string(),
  completedAt: z.string(),
});

export const lessonState_Schema = z.discriminatedUnion('status', [
  newLessonState_Schema,
  inProgressLessonState_Schema,
  contentCompleteLessonState_Schema,
  finishedLessonState_Schema,
]);

/** Persisted v1 Lesson state shape, derived from its existing strict validator. */
export type LessonState = z.infer<typeof lessonState_Schema>;
