import type { CoursePreview } from '@svitlo/ui-kit';
import type { LanguageCode } from '@svitlo/engine/runtime';
import type { LocalizedCourse, LocalizedCourseContent } from './courseResources';

function counts(content: LocalizedCourseContent): { lessons: number; modules: number } {
  return content.order.reduce(
    (total, slug) => {
      const item = content.items[slug];
      if (item.type === 'lesson') return { ...total, lessons: total.lessons + 1 };
      if (item.type === 'episode') return total;
      const nested = counts(item.content);
      return {
        lessons: total.lessons + nested.lessons,
        modules: total.modules + nested.modules + (item.type === 'module' ? 1 : 0),
      };
    },
    { lessons: 0, modules: 0 },
  );
}

/** Adapter fields come from the published Course, never mock preview content. */
export function toCoursePreview(course: LocalizedCourse): CoursePreview {
  const total = counts(course.content);
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
