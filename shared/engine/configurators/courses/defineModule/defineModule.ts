import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';
import type { Lesson_Configurator } from '../../lessons/defineLesson';
import type { Chapter_Configurator } from '../defineChapter';
import type { Episode_Configurator } from '../defineEpisode';
import { module_Config_Schema, type Module_Config } from './defineModule.schemas';

const validate = (config: unknown) => {
  module_Config_Schema.parse(config);
};

export function defineModule<
  const Content extends readonly (Lesson_Configurator | Episode_Configurator | Chapter_Configurator)[],
>(config: Omit<Module_Config, 'content'> & { content: Content }) {
  validate(config);
  const { type, id, iconKey, title, content } = config;
  const localeEntries = {} as const;
  const base = { type, id, iconKey, ...onlyStrings(localeEntries) } satisfies DeepPartial<Module_Config>;

  return {
    id,
    type,
    config: {
      base,
      validate,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<Module_Config>,
    },
    title,
    content,
  };
}
export type Module_Configurator = ReturnType<typeof defineModule>;
