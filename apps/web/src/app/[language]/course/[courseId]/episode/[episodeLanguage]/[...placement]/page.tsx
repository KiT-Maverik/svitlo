import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { loadPublishedUiKitMessages } from '@svitlo/adapter-nextjs';
import {
  DEFAULT_SUPPORTED_LANGUAGES,
  findCourseActivityByPlacement,
  validateEpisodeRuntime,
} from '@svitlo/engine/runtime';
import { toEpisodeProps } from '@svitlo/ui-kit';

import WebEpisode from '@/components/pages/Episode/Episode';
import {
  assertCourseTocMatchesTree,
  coursePlacementHref,
  courseTocToTopics,
  flattenCourseTopics,
  parseCoursePlacement,
} from '@/lib/courseNavigation';
import { loadCourseToc, loadExistingCourseTree } from '@/lib/courseResources';

type Props = {
  params: Promise<{
    language: string;
    courseId: string;
    episodeLanguage: string;
    placement: string[];
  }>;
};

async function Content({ params }: Props) {
  const { language, courseId, episodeLanguage, placement: segments } = await params;
  const ui = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === language);
  const selected = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === episodeLanguage);
  const placement = parseCoursePlacement(segments);
  if (!ui || !selected || placement === null) notFound();

  const course = await loadExistingCourseTree(courseId, selected.language);
  if (!course) notFound();
  const activity = findCourseActivityByPlacement(course, placement);
  if (!activity || activity.node.type !== 'episode') notFound();

  if ('draft' in activity.node && activity.node.draft === true) {
    return (
      <main aria-label="Draft Episode preview">
        <h1>Not implemented</h1>
        <p>This Episode has a reserved place in the Course but has not been produced.</p>
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
  const href = coursePlacementHref(course.id, language, episodeLanguage, 'episode', placement);
  const topics = courseTocToTopics(toc, language, episodeLanguage);
  const flat = flattenCourseTopics(topics);
  const position = flat.findIndex(topic => topic.href === href);
  const next = position === -1 ? undefined : flat[position + 1];

  return (
    <WebEpisode
      response={toEpisodeProps(validateEpisodeRuntime(activity.node, selected.language))}
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

export default function EpisodePage(props: Props) {
  return (
    <Suspense
      fallback={
        <div role="status" aria-busy="true">
          Loading episode…
        </div>
      }
    >
      <Content {...props} />
    </Suspense>
  );
}
