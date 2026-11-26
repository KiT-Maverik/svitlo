import type { CourseToc, CourseTocContent, CourseTocNode } from '@svitlo/engine/runtime';

export type CourseNavigationTopic = {
  id: string;
  title: string;
  type: 'module' | 'chapter' | 'lesson' | 'episode' | 'assessment';
  href?: string;
  children?: readonly CourseNavigationTopic[];
};

/** Derive host URLs from the validated, localized Course TOC and current route context. */
export function courseTocToTopics(
  toc: CourseToc,
  interfaceLanguage: string,
  lessonLanguage: string = interfaceLanguage,
): CourseNavigationTopic[] {
  const root = '/' + interfaceLanguage + '/course/' + toc.id;
  const counts = new Map<string, number>();
  function count(content: CourseTocContent): void {
    for (const key of content.order) {
      const node = content.items[key];
      if (node.type === 'lesson') counts.set(node.id, (counts.get(node.id) ?? 0) + 1);
      else if (node.type === 'module' || node.type === 'chapter') count(node.content);
    }
  }
  count(toc.content);

  function convert(node: CourseTocNode, placement: string): CourseNavigationTopic {
    if (node.type === 'module' || node.type === 'chapter') {
      return {
        id: node.id,
        title: node.label,
        type: node.type,
        children: node.content.order.map(key => convert(node.content.items[key], placement + '/' + key)),
      };
    }
    if (node.type === 'lesson') {
      const repeated = (counts.get(node.id) ?? 0) > 1;
      return {
        id: repeated ? placement : node.id,
        title: node.label,
        type: 'lesson',
        ...(!node.draft
          ? {
              href:
                root +
                '/lesson/' +
                lessonLanguage +
                '/' +
                node.id +
                (repeated ? '?placement=' + encodeURIComponent(placement) : ''),
            }
          : {}),
      };
    }
    return {
      id: node.id,
      title: node.label,
      type: node.type,
      ...(!('draft' in node && node.draft === true)
        ? { href: root + '/' + node.type + '/' + lessonLanguage + '/' + node.id }
        : {}),
    };
  }
  return toc.content.order.map(key => convert(toc.content.items[key], key));
}

export function flattenCourseTopics(topics: readonly CourseNavigationTopic[]): CourseNavigationTopic[] {
  return topics.flatMap(topic => (topic.href ? [topic] : flattenCourseTopics(topic.children ?? [])));
}
