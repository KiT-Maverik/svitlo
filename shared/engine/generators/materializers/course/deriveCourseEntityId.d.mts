/** Stable Course-owned UUID, derived from root UUID, kind and full placement. */
export function deriveCourseEntityId(
  courseId: string,
  kind: 'module' | 'chapter' | 'episode' | 'lesson',
  placement: string,
): string;
