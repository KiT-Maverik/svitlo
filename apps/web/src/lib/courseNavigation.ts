import { courseActivities } from '@svitlo/engine/runtime';

import type { LocalizedCourse, LocalizedCourseNode } from './courseResources';

export type CourseNavigationTopic = {
  id: string;
  title: string;
  type: 'module' | 'chapter' | 'lesson' | 'episode' | 'assessment';
  href?: string;
  children?: readonly CourseNavigationTopic[];
};

export function coursePropsToTopics(
  course: LocalizedCourse,
  interfaceLanguage: string,
  lessonLanguage: string = interfaceLanguage,
  lessonTitles: Readonly<Record<string, string>>,
): CourseNavigationTopic[] {
  const root = '/' + interfaceLanguage + '/course/' + course.id;
  const counts = new Map<string, number>();
  for (const { node } of courseActivities(course))
    if (node.type === 'lesson') counts.set(node.id, (counts.get(node.id) ?? 0) + 1);
  function convert(node: LocalizedCourseNode, slot: string): CourseNavigationTopic {
    const isDraft = 'draft' in node && node.draft === true;
    if (node.type === 'lesson') {
      const title = isDraft ? 'Not implemented' : (lessonTitles['placement:' + slot] ?? lessonTitles[node.id]);
      if (!title) throw Error('Missing localized Lesson title in Course ' + course.id + ': ' + node.id);
      const repeated = (counts.get(node.id) ?? 0) > 1;
      return {
        id: repeated ? slot : node.id,
        title,
        type: 'lesson',
        ...(!isDraft
          ? {
              href:
                root +
                '/lesson/' +
                lessonLanguage +
                '/' +
                node.id +
                (repeated ? '?placement=' + encodeURIComponent(slot) : ''),
            }
          : {}),
      };
    }
    if (node.type === 'episode')
      return {
        id: node.id,
        title: node.locale.title,
        type: 'episode',
        ...(!isDraft ? { href: root + '/episode/' + lessonLanguage + '/' + node.id } : {}),
      };
    if (node.type === 'assessment')
      return {
        id: node.id,
        title: node.locale.title,
        type: 'assessment',
        ...(!isDraft ? { href: root + '/assessment/' + lessonLanguage + '/' + node.id } : {}),
      };
    return {
      id: node.id,
      title: node.locale.title,
      type: node.type,
      children: node.content.order.map(key => convert(node.content.items[key], slot + '/' + key)),
    };
  }
  return course.content.order.map(key => convert(course.content.items[key], key));
}
export function flattenCourseTopics(topics: readonly CourseNavigationTopic[]): CourseNavigationTopic[] {
  return topics.flatMap(topic => (topic.href ? [topic] : flattenCourseTopics(topic.children ?? [])));
}
