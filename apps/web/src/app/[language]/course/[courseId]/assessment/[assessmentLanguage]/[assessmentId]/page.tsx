import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { loadPublishedUiKitMessages } from '@svitlo/adapter-nextjs';
import { DEFAULT_SUPPORTED_LANGUAGES, findCourseAssessment, validateAssessmentRuntime } from '@svitlo/engine/runtime';

import WebAssessment from '@/components/pages/Assessment/Assessment';
import { assertCourseTocMatchesTree, courseTocToTopics, flattenCourseTopics } from '@/lib/courseNavigation';
import { loadCourseToc, loadExistingCourseTree } from '@/lib/courseResources';

type Props = {
  params: Promise<{
    language: string;
    courseId: string;
    assessmentLanguage: string;
    assessmentId: string;
  }>;
};

async function Content({ params }: Props) {
  const { language, courseId, assessmentLanguage, assessmentId } = await params;
  const ui = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === language);
  const content = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === assessmentLanguage);
  if (!ui || !content) notFound();
  const course = await loadExistingCourseTree(courseId, content.language);
  if (!course) notFound();
  const assessment = findCourseAssessment(course, assessmentId);
  if (!assessment) notFound();
  if ('draft' in assessment && assessment.draft === true) {
    return (
      <main aria-label="Draft Assessment preview">
        <h1>Not implemented</h1>
        <p>This Assessment has a reserved place in the Course but has not been produced.</p>
        <a href={'/' + language + '/course/' + courseId}>Back to Course</a>
      </main>
    );
  }
  const [messages, toc] = await Promise.all([
    loadPublishedUiKitMessages(ui.locale),
    loadCourseToc(course.id, content.language),
  ]);
  assertCourseTocMatchesTree(course, toc);
  const courseHref = '/' + language + '/course/' + courseId;
  const href = courseHref + '/assessment/' + assessmentLanguage + '/' + assessmentId;
  const topics = courseTocToTopics(toc, language, assessmentLanguage);
  const flat = flattenCourseTopics(topics);
  const position = flat.findIndex(topic => topic.href === href);
  const next = flat[position + 1];
  return (
    <WebAssessment
      response={validateAssessmentRuntime(assessment, content.language)}
      language={content.language}
      href={href}
      courseHref={courseHref}
      courseTitle={course.locale.title}
      topics={topics}
      messages={messages}
      nextActivity={next?.href ? { href: next.href, title: next.title } : undefined}
    />
  );
}

export default function AssessmentPage(props: Props) {
  return (
    <Suspense fallback={null}>
      <Content {...props} />
    </Suspense>
  );
}
