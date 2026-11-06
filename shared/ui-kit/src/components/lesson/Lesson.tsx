'use client';

import type { UiKitMessages } from '#types/uiKitMessages';

import type { ComponentType } from 'react';
import { LessonController, type EditableSectionParam } from './LessonController';
import { MediaSettingsProvider } from './MediaSettings';
import type { Locale_Languages, Section, SkillId } from '@svitlo/engine/content';
import type { LessonEventSceneMap } from './LessonEvents';
import type { LanguageCode } from '@svitlo/engine/localization';
import type { SceneRegistry } from '../widgets/ContentBlockRenderer';
import type { LessonLearningLayoutProps } from '../layout/LearningLayout/createLessonLearningLayout';
import type { Topic } from '../layout/LearningLayout/CourseTopicList';

export type LessonView = {
  id: string;
  title: string;
  locale: { code: LanguageCode };
  parameters: {
    sections: {
      allowNavigation: boolean;
      allowSkipping: boolean;
      showIndexes: boolean;
    };
  };
  events?: LessonEventSceneMap;
  skills?: readonly SkillId[];
  sections: readonly Section<'response', Locale_Languages>[];
};

export type LessonProps = {
  response: LessonView;
  href: string;
  /** Optional Course navigation entries, instead of a single standalone Lesson entry. */
  topics?: readonly Topic[];
  messages: UiKitMessages;
  /** Host binding: Next.js, Electron, or ordinary React can supply a layout. */
  layout: ComponentType<LessonLearningLayoutProps>;
  /** Application-owned scene registry never leaks into the shared package. */
  sceneRegistry?: SceneRegistry;
  contentLoading?: boolean;
  /** Program-level replacement or false suppression of authored event scenes; events still publish. */
  eventOverrides?: LessonEventSceneMap;
  /** Host-allowed lesson parameter overrides. By default authors control all parameters. */
  editableSectionParams?: readonly EditableSectionParam[];
  contentError?: boolean;
  onRetryContent?: () => void;
};

export function Lesson(props: LessonProps) {
  return (
    <MediaSettingsProvider key={props.href + ':' + props.response.id + ':' + props.response.locale.code}>
      <LessonController {...props} />
    </MediaSettingsProvider>
  );
}
