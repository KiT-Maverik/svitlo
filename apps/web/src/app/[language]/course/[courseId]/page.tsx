import { notFound } from 'next/navigation';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import { CoursePage } from '@svitlo/ui-kit/course';
import { getMockCourse, getMockCourseMessages, mockCourseOutline } from '@/lib/mockCourses';

type Props = { params: Promise<{ language: string; courseId: string }> };

export default async function CourseDetailRoute({ params }: Props) {
  const { language, courseId } = await params;
  if (!DEFAULT_SUPPORTED_LANGUAGES.some(item => item.language === language)) notFound();

  const course = getMockCourse(courseId, language);
  if (!course) notFound();

  return (
    <CoursePage
      course={course.preview}
      outline={mockCourseOutline(course, language)}
      messages={getMockCourseMessages(language)}
      catalogHref={`/${language}/courses`}
    />
  );
}
