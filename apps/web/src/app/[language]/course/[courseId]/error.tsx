'use client';

import { useParams } from 'next/navigation';

import { getCourseLoadFailureMessages } from '@/lib/courseMessages';

/** Render a visible, accessible publication failure instead of a silent streamed shell. */
export default function CourseDetailError({ reset }: { reset: () => void }) {
  const { language } = useParams<{ language: string }>();
  const messages = getCourseLoadFailureMessages(language);
  return (
    <main>
      <div role="alert" data-testid="course-load-error">
        <h1>{messages.title}</h1>
        <p>{messages.description}</p>
      </div>
      <button type="button" onClick={reset}>
        {messages.retry}
      </button>
      <a href={'/' + language + '/courses'}>{messages.back}</a>
    </main>
  );
}
