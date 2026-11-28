import type { LanguageCode, LocalizedCourse } from '@svitlo/engine/runtime';
import type { CoursePreview } from '@svitlo/ui-kit';

type Count = { lessons: number; modules: number };

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Invalid Course placement');
  return value as Record<string, unknown>;
}

/** Count placement occurrences, not unique Lesson IDs: a Lesson may be reused. */
function counts(owner: Record<string, unknown>): Count {
  if (!Array.isArray(owner.children)) throw Error('Missing Course child order');
  return owner.children.reduce<Count>(
    (total, key: string) => {
      const node = record(owner[key]);
      if (node.type === 'lesson') return { ...total, lessons: total.lessons + 1 };
      if (node.type === 'episode' || node.type === 'assessment') return total;
      if (node.type !== 'module' && node.type !== 'chapter') throw Error('Invalid Course activity');
      const nested = counts(node);
      return {
        lessons: total.lessons + nested.lessons,
        modules: total.modules + nested.modules + (node.type === 'module' ? 1 : 0),
      };
    },
    { lessons: 0, modules: 0 },
  );
}

/** Presentation-only preview; resolved Course domain Data remains slug-addressable. */
export function toCoursePreview(course: LocalizedCourse): CoursePreview {
  const total = counts(course);
  return {
    id: course.id,
    title: course.locale.title,
    description: typeof course.locale.description === 'string' ? course.locale.description : '',
    category: '',
    level: '',
    lessons: total.lessons,
    modules: total.modules,
    languages: course.params.languages as readonly LanguageCode[],
  };
}
