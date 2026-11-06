import type {
  Course,
  Course_Creator,
  Course_Toc,
  Course_TocContent,
  Course_TocContext,
  Course_LessonOverride,
  Locale_Languages,
} from '@svitlo/contracts/content';
import { createChapter, createEpisode, createModule } from './createCourseEntities';

function localized<Languages extends Locale_Languages>(
  value: string | Record<Languages[number], string>,
  language: Languages[number],
): string {
  if (typeof value === 'string') return value;
  const title = value[language];
  if (typeof title !== 'string') throw new Error('Missing course title for ' + language);
  return title;
}

/** Pure Course creator. Filesystem access and JSON publication belong to the caller. */
export function createCourse<const Languages extends Locale_Languages>(
  course: Course<'data', Languages>,
): Course_Creator<Course<'data', Languages>, Course_Toc, Languages> {
  const getData = () => ({ ...course, content: [...course.content] });
  const toToc = (context: Course_TocContext<Languages>): Course_Toc => {
    const children = course.content.map((entry): Course_TocContent => {
      if (typeof entry === 'string') return context.resolveLesson(entry);
      switch (entry.type) {
        case 'module': return createModule<Languages>(entry).toToc(context);
        case 'chapter': return createChapter<Languages>(entry).toToc(context);
        case 'episode': return createEpisode<Languages>(entry).toToc(context);
        case 'lessonOverride': {
          const lesson = context.resolveLesson(entry.lessonId);
          const title = entry.overrides.title;
          return title === undefined ? lesson : { ...lesson, title: localized(title, context.language) };
        }
      }
    });
    return {
      id: course.id,
      type: course.type,
      title: localized(course.title.value, context.language),
      children,
    };
  };
  const toResource = (context: Course_TocContext<Languages>) => ({
    data: getData(),
    toc: toToc(context),
  });
  return { getData, toToc, toResource };
}
