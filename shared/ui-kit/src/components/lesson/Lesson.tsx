'use client';

import { useMemo, type ComponentType } from 'react';

import type { AssessmentResourceLoader, Disability, LanguageCode, Lesson_Props } from '@svitlo/engine/runtime';

import type { UiKitMessages } from '#types/uiKitMessages';

import type { Topic } from '../layout/LearningLayout/CourseTopicList';
import type { LessonLearningLayoutProps } from '../layout/LearningLayout/createLessonLearningLayout';
import type { SceneRegistry } from '../widgets/ContentBlockRenderer';
import { LessonController, type EditableSectionParam } from './LessonController';
import type { LessonEventSceneMap } from './LessonEvents';

/** UI Kit accepts only complete, assembled, one-language Engine Props. */
export type LessonProps = {
  response: Lesson_Props;
  language: LanguageCode;
  href: string;
  topics?: readonly Topic[];
  messages: UiKitMessages;
  layout: ComponentType<LessonLearningLayoutProps>;
  sceneRegistry?: SceneRegistry;
  /** Host-provided reader for separately published, selected Question/Flashcard resources. */
  assessmentLoader?: AssessmentResourceLoader;
  /** Supplied voluntarily by the host; never inferred from lesson results. */
  accessNeeds?: readonly Disability[];
  contentLoading?: boolean;
  eventOverrides?: LessonEventSceneMap;
  editableSectionParams?: readonly EditableSectionParam[];
  contentError?: boolean;
  onRetryContent?: () => void;
};

export function Lesson(props: LessonProps) {
  const response = useMemo(
    () => ({
      ...props.response,
      section: props.response.section.filter(section => section.params.disabled !== true),
    }),
    [props.response],
  );
  return (
    <LessonController
      key={props.href + ':' + props.response.id + ':' + props.language}
      {...props}
      response={response}
    />
  );
}
