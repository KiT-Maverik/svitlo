'use client';

import { ContentBlockRenderer } from '@svitlo/ui-kit/widgets';
import { QuestionRenderer } from '@svitlo/ui-kit/questions';
import type { UiKit_Global } from '@svitlo/ui-kit';
import type { LessonRenderableBlock, LessonSectionResponse } from '@/lib/lessons/assembleLessonResponse';
import type { LanguageCode } from '@svitlo/engine/localization';
import { resolveScene } from '@/components/scenes/sceneLoader';
import { useLessonNavigation } from './LessonNavigation';

export function LessonSectionBlocks({ sections, language, messages }: {
  messages: UiKit_Global<'response'>;
  sections: readonly Pick<LessonSectionResponse, 'id' | 'type' | 'content' | 'questions'>[];
  language: LanguageCode;
}) {
  const { progress, dispatch } = useLessonNavigation();
  const section = sections[progress.step];
  if (!section) return null;
  const blocks = section.content.filter((block): block is LessonRenderableBlock => block.type !== 'quiz');
  return section.type === 'quiz'
    ? <QuestionRenderer
        messages={messages}
        key={section.id}
        questions={section.questions}
        language={language}
        sceneRegistry={resolveScene}
        onComplete={() => dispatch({ type: 'testDone' })}
      />
    : <ContentBlockRenderer messages={messages} key={section.id} blocks={blocks} sceneRegistry={resolveScene} language={language} />;
}
