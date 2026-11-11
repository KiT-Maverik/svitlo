import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';
import type { Lesson_Configurator } from '../../lessons/defineLesson/defineLesson';
import type { Episode_Configurator } from '../defineEpisode/defineEpisode';
import { chapter_Config_Schema, type Chapter_Config } from './defineChapter.schemas';

const validate = (config: Chapter_Config) => {
  chapter_Config_Schema.parse(config);
};

export function defineChapter<const Content extends readonly (Lesson_Configurator | Episode_Configurator)[]>(
  config: Omit<Chapter_Config, 'content'> & { content: Content },
) {
  validate(config);
  const { type, id, iconKey, title, content } = config;
  const localeEntries = {} as const;
  const base = { type, id, iconKey, ...onlyStrings(localeEntries) } satisfies DeepPartial<Chapter_Config>;

  return {
    id,
    type,
    config: {
      base,
      validate,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<Chapter_Config>,
    },
    title,
    content,
  };
}
export type Chapter_Configurator = ReturnType<typeof defineChapter>;
