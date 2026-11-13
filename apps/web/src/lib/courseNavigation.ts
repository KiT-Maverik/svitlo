import type { LocalizedCourse, LocalizedCourseNode } from './courseResources';

/** Host-owned URLs; the portable UI Kit receives only navigable view data. */
export type CourseNavigationTopic = {
  id: string;
  title: string;
  type: 'module' | 'chapter' | 'lesson';
  href?: string;
  children?: readonly CourseNavigationTopic[];
};

/** Project the new slug-keyed Course hierarchy, not the retired TOC JSON. */
export function coursePropsToTopics(
  course: LocalizedCourse,
  interfaceLanguage: string,
  lessonLanguage: string = interfaceLanguage,
  lessonTitles: Readonly<Record<string, string>>,
): CourseNavigationTopic[] {
  const root = '/' + interfaceLanguage + '/course/' + course.id;
  function convert(node: LocalizedCourseNode): CourseNavigationTopic {
    if (node.type === 'lesson') {
      const title = lessonTitles[node.id];
      if (!title) throw new Error('Missing localized Lesson title in Course ' + course.id + ': ' + node.id);
      return {
        id: node.id,
        title,
        type: 'lesson',
        href: root + '/lesson/' + lessonLanguage + '/' + node.id,
      };
    }
    return {
      id: node.id,
      title: node.locale.title,
      type: node.type,
      children: node.content.order.map(slug => convert(node.content.items[slug])),
    };
  }
  return course.content.order.map(slug => convert(course.content.items[slug]));
}
