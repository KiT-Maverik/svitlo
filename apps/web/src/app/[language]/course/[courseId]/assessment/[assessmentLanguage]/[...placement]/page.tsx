import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { loadPublishedUiKitMessages } from '@svitlo/adapter-nextjs';
import {
  DEFAULT_SUPPORTED_LANGUAGES, findCourseActivityByPlacement, validateAssessmentRuntime,
} from '@svitlo/engine/runtime';
import { toAssessmentProps } from '@svitlo/ui-kit';

import WebAssessment from '@/components/pages/Assessment/Assessment';
import {
  assertCourseTocMatchesTree, coursePlacementHref, courseTocToTopics,
  flattenCourseTopics, parseCoursePlacement,
} from '@/lib/courseNavigation';
import { loadCourseToc, loadExistingCourseTree } from '@/lib/courseResources';

type Props = {
  params: Promise<{
    language: string; courseId: string; assessmentLanguage: string; placement: string[];
  }>;
};

async function Content({ params }: Props) {
  const { language, courseId, assessmentLanguage, placement: segments } = await params;
  const ui = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === language);
  const selected = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === assessmentLanguage);
  const placement = parseCoursePlacement(segments);
  if (!ui || !selected || placement === null) notFound();

  const course = await loadExistingCourseTree(courseId, selected.language);
  if (!course) notFound();
  const activity = findCourseActivityByPlacement(course, placement);
  if (!activity || activity.node.type !== 'assessment') notFound();

  if ('draft' in activity.node && activity.node.draft === true) {
    return (
      <main aria-label="Draft Assessment preview">
        <h1>Not implemented</h1>
        <p>This Assessment has a reserved place in the Course but has not been produced.</p>
        <a href={'/' + language + '/course/' + course.id}>Back to Course</a>
      </main>
    );
  }

  const [messages, toc] = await Promise.all([
    loadPublishedUiKitMessages(ui.locale),
    loadCourseToc(course.id, selected.language),
  ]);
  assertCourseTocMatchesTree(course, toc);
  const courseHref = '/' + language + '/course/' + course.id;
  const href = coursePlacementHref(course.id, language, assessmentLanguage, 'assessment', placement);
  const topics = courseTocToTopics(toc, language, assessmentLanguage);
  const flat = flattenCourseTopics(topics);
  const position = flat.findIndex(topic => topic.href === href);
  const next = position === -1 ? undefined : flat[position + 1];

  return (
    <WebAssessment
      response={toAssessmentProps(validateAssessmentRuntime(activity.node, selected.language))}
      language={selected.language}
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
    <Suspense fallback={<div role="status" aria-busy="true">Loading assessment…</div>}>
      <Content {...props} />
    </Suspense>
  );
}
