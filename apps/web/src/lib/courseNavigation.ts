import type { Course_Toc, Course_TocContent } from '@svitlo/engine/content';

/** Host-owned URLs; the UI Kit receives only serializable navigation data. */
export type CourseNavigationTopic = {
  id: string;
  title: string;
  type: Course_TocContent['type'];
  href?: string;
  children?: readonly CourseNavigationTopic[];
};

export function courseTocToTopics(
  toc: Course_Toc,
  interfaceLanguage: string,
  lessonLanguage: string = interfaceLanguage,
): CourseNavigationTopic[] {
  const coursePath = '/' + interfaceLanguage + '/course/' + toc.id;

  function convert(node: Course_TocContent): CourseNavigationTopic {
    switch (node.type) {
      case 'lesson':
        return {
          id: node.id,
          title: node.title,
          type: node.type,
          href: coursePath + '/lesson/' + lessonLanguage + '/' + node.id,
        };
      case 'episode':
        return {
          id: node.id,
          title: node.title,
          type: node.type,
          href: coursePath + '/episode/' + node.id,
        };
      case 'module':
      case 'chapter':
        return {
          id: node.id,
          title: node.title,
          type: node.type,
          children: node.children.map(convert),
        };
    }
  }

  return toc.children.map(convert);
}
