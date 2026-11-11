import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';
import type { ScenarioSection_Configurator } from '../../sections/defineScenarioSection/defineScenarioSection';
import { episode_Config_Schema, type Episode_Config } from './defineEpisode.schemas';

const validate = (config: Episode_Config) => {
  episode_Config_Schema.parse(config);
};

export function defineEpisode<const Sections extends readonly ScenarioSection_Configurator[]>(
  config: Omit<Episode_Config, 'sections'> & { sections: Sections },
) {
  validate(config);
  const { type, id, iconKey, title, sections } = config;
  // Title and Sections are child configurators and resolve their own locales.
  const localeEntries = {} as const;
  const base = { type, id, iconKey, ...onlyStrings(localeEntries) } satisfies DeepPartial<Episode_Config>;

  return {
    id,
    type,
    config: {
      base,
      validate,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<Episode_Config>,
    },
    title,
    sections,
  };
}
export type Episode_Configurator = ReturnType<typeof defineEpisode>;
