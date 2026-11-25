import { z } from 'zod';

/** Audience boundaries shared by Course and Lesson without coupling their configurators. */
const audienceRange_Schema = (maximum: number) =>
  z
    .strictObject({
      min: z.int().min(0).max(maximum),
      max: z.int().min(0).max(maximum),
    })
    .refine(range => range.min <= range.max, 'Minimum must not exceed maximum');

export const ageRange_Schema = audienceRange_Schema(125);
export const gradeRange_Schema = audienceRange_Schema(40);
