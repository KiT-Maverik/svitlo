import type { LanguageCodes } from '#schemas';
import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';
import type { Lesson_Configurator } from '../../lessons/defineLesson/defineLesson';
import type { Episode_Configurator } from '../defineEpisode/defineEpisode';
import type { Chapter_Configurator } from '../defineChapter/defineChapter';
import type { Module_Configurator } from '../defineModule/defineModule';
import { course_Config_Schema, type Course_Config } from './defineCourse.schemas';

const validate = (config: unknown) => {
  course_Config_Schema.parse(config);
};

export function defineCourse<
  const Languages extends readonly [LanguageCodes, ...LanguageCodes[]],
  const Content extends readonly (
    Module_Configurator | Chapter_Configurator | Episode_Configurator | Lesson_Configurator
  )[],
>(
  config: Omit<Course_Config, 'parameters' | 'content'> & {
    parameters: { languages: Languages };
    content: Content;
  },
) {
  validate(config);
  const { type, id, title, description, scenarioMode, prerequisites, parameters, content } = config;
  const { text: prerequisiteText, ...invariantPrerequisites } = prerequisites ?? {};

  // The Text/Markdown configurators retain their own base/locale projections.
  // Children must be materialized by the publisher, never copied into base.
  const localeEntries = {} as const;
  const base = {
    type,
    id,
    scenarioMode,
    parameters,
    ...(prerequisites ? { prerequisites: invariantPrerequisites } : {}),
    ...onlyStrings(localeEntries),
  } satisfies DeepPartial<Course_Config>;

  return {
    id,
    type,
    config: {
      base,
      validate,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<Course_Config>,
    },
    title,
    description,
    prerequisites: prerequisites ? { ...invariantPrerequisites, text: prerequisiteText } : undefined,
    content,
  };
}

export type Course_Configurator = ReturnType<typeof defineCourse>;
