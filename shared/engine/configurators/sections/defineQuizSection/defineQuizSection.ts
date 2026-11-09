import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';
import { quizSection_Config_Schema, type QuizSection_Config } from './defineQuizSection.schemas';

export function defineQuizSection<
  const Slug extends string,
  const Parameters extends QuizSection_Config['parameters'],
>(config: Omit<QuizSection_Config, 'slug' | 'parameters'> & { slug: Slug; parameters: Parameters }) {
  quizSection_Config_Schema.parse(config);

  const { type, id, slug, title, navigationLabel, skippable, parameters } = config;
  // Screen content may contain nested ContentBlock configurators. Keep these
  // outside base; the publisher must explicitly resolve them as child data.
  const { screen, ...invariantParameters } = parameters;
  const localeEntries = { title, navigationLabel } as const;
  const base = {
    type, id, slug, skippable,
    parameters: invariantParameters,
    ...onlyStrings(localeEntries),
  } satisfies DeepPartial<QuizSection_Config>;

  return {
    sectionType: 'quiz' as const,
    config: {
      base,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<QuizSection_Config>,
    },
    parameters,
    screen,
  };
}

export type QuizSection_Configurator = ReturnType<typeof defineQuizSection>;
