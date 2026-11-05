'use client';

import { ContentBlockRenderer } from '@svitlo/ui-kit/widgets';
import { QuestionRenderer } from '@svitlo/ui-kit/questions';
import type { LessonSectionResponse } from '@/lib/lessons/assembleLessonResponse';
import type { LanguageCode } from '@svitlo/engine/localization';
import { resolveScene } from '@/components/scenes/sceneLoader';
import { useLessonNavigation } from './LessonNavigation';

export function LessonSectionBlocks({ sections, language }: {
  sections: readonly Pick<LessonSectionResponse, 'id' | 'type' | 'blocks' | 'questions'>[];
  language: LanguageCode;
}) {
  const { progress, dispatch } = useLessonNavigation();
  const section = sections[progress.step];
  if (!section) return null;
  return section.type === 'quiz'
    ? <QuestionRenderer
        key={section.id}
        questions={section.questions}
        language={language}
        sceneRegistry={resolveScene}
        onComplete={() => dispatch({ type: 'testDone' })}
      />
    : <ContentBlockRenderer key={section.id} blocks={section.blocks} sceneRegistry={resolveScene} language={language} />;
}
