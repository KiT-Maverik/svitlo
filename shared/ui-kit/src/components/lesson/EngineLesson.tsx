'use client';

import { useMemo } from 'react';
import type { LanguageCode } from '@svitlo/contracts/localization';
import type { Lesson_Props } from '@svitlo/engine';
import { Lesson, type LessonProps } from './Lesson';
import { projectLessonProps } from './engineLessonProjection';

/**
 * Render assembled Engine Props without exposing the former published
 * LessonResponse contract to the host. The shared projection is temporary
 * until all UI Kit widgets directly consume Engine Props.
 */
export type EngineLessonProps = Omit<LessonProps, 'response'> & {
  response: Lesson_Props;
  language: LanguageCode;
};

export function EngineLesson({ response, language, ...ui }: EngineLessonProps) {
  const view = useMemo(() => projectLessonProps(response, language), [response, language]);
  return <Lesson {...ui} response={view} />;
}
