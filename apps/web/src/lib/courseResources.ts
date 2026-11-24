import 'server-only';
import { loadPublishedCourseLessonProps, loadPublishedCourseTree } from '@svitlo/adapter-nextjs';
import { courseActivities, type LanguageCode, type LocalizedCourse } from '@svitlo/engine/runtime';
export type { LocalizedCourse, LocalizedCourseContent, LocalizedCourseNode } from '@svitlo/engine/runtime';
export const loadCourseTree = loadPublishedCourseTree;

export function courseHasLesson(course: LocalizedCourse, id: string): boolean {
  return courseActivities(course).some(({node}) => node.type === 'lesson' && node.id === id);
}
export function courseLessonIds(course: LocalizedCourse): string[] {
  return courseActivities(course).filter(({node}) => node.type === 'lesson').map(({node}) => node.id);
}
export async function loadCourseLessonTitles(course: LocalizedCourse, language: LanguageCode) {
  const pairs = await Promise.all(courseActivities(course).filter(({node}) => node.type === 'lesson').map(async ({node,placement}) => {
    const lesson = await loadPublishedCourseLessonProps(course.id, node.id, language, { placement });
    return { id: node.id, placement, title: lesson.locale.title };
  }));
  return Object.fromEntries(pairs.flatMap(({id,placement,title}) => [[id,title], ['placement:'+placement,title]])) as Record<string,string>;
}
