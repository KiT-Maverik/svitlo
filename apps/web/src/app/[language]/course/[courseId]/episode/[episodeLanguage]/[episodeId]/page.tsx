import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { loadPublishedUiKitMessages } from '@svitlo/adapter-nextjs';
import { DEFAULT_SUPPORTED_LANGUAGES, findCourseEpisode, validateEpisodeRuntime } from '@svitlo/engine/runtime';

import WebEpisode from '@/components/pages/Episode/Episode';
import { coursePropsToTopics, flattenCourseTopics } from '@/lib/courseNavigation';
import { loadCourseLessonTitles, loadCourseTree } from '@/lib/courseResources';

type Props = { params: Promise<{ language: string; courseId: string; episodeLanguage: string; episodeId: string }> };

async function Content({ params }: Props) {
  const { language, courseId, episodeLanguage, episodeId } = await params;
  const ui = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === language);
  const content = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === episodeLanguage);
  if (!ui || !content) notFound();
  let course;
  try {
    course = await loadCourseTree(courseId, content.language);
  } catch {
    notFound();
  }
  const episode = findCourseEpisode(course, episodeId);
  if (!episode) notFound();
  if ('draft' in episode && episode.draft === true) {
    return (
      <main aria-label="Draft Episode preview">
        <h1>Not implemented</h1>
        <p>This Episode has a reserved place in the Course but has not been produced.</p>
        <a href={'/' + language + '/course/' + courseId}>Back to Course</a>
      </main>
    );
  }
  const [messages, titles] = await Promise.all([
    loadPublishedUiKitMessages(ui.locale),
    loadCourseLessonTitles(course, content.language),
  ]);
  const courseHref = '/' + language + '/course/' + courseId;
  const href = courseHref + '/episode/' + episodeLanguage + '/' + episodeId;
  const topics = coursePropsToTopics(course, language, episodeLanguage, titles);
  const flat = flattenCourseTopics(topics);
  const position = flat.findIndex(topic => topic.href === href);
  const next = flat[position + 1];
  return (
    <WebEpisode
      response={validateEpisodeRuntime(episode, content.language)}
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

export default function EpisodePage(props: Props) {
  return (
    <Suspense fallback={null}>
      <Content {...props} />
    </Suspense>
  );
}
