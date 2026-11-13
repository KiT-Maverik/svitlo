'use client';

import type { ComponentType } from 'react';
import type { LanguageCode } from '@svitlo/contracts/localization';
import type { Lesson_Props } from '@svitlo/engine';
import type { UiKitMessages } from '#types/uiKitMessages';
import { LessonController, type EditableSectionParam } from './LessonController';
import type { LessonEventSceneMap } from './LessonEvents';
import type { SceneRegistry } from '../widgets/ContentBlockRenderer';
import type { LessonLearningLayoutProps } from '../layout/LearningLayout/createLessonLearningLayout';
import type { Topic } from '../layout/LearningLayout/CourseTopicList';

/** UI Kit accepts only complete, assembled, one-language Engine Props. */
export type LessonProps = {
  response: Lesson_Props;
  language: LanguageCode;
  href: string;
  topics?: readonly Topic[];
  messages: UiKitMessages;
  layout: ComponentType<LessonLearningLayoutProps>;
  sceneRegistry?: SceneRegistry;
  contentLoading?: boolean;
  eventOverrides?: LessonEventSceneMap;
  editableSectionParams?: readonly EditableSectionParam[];
  contentError?: boolean;
  onRetryContent?: () => void;
};

export function Lesson(props: LessonProps) {
  return <LessonController key={props.href + ':' + props.response.id + ':' + props.language} {...props} />;
}
