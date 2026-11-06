import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Languages } from '../locale.types';
import type { ContentBlock_Text } from '../blocks';
import type { Section } from '../section.types';

/** Scenario is a Section type; Episode is its navigable course container. */
export type Episode_ScenarioSection<
  ConfigType extends ContentEntity_ConfigType,
  SupportedLanguages extends Locale_Languages,
> = Section<ConfigType, SupportedLanguages> & { type: 'scenario' };

export type Episode<
  ConfigType extends ContentEntity_ConfigType,
  SupportedLanguages extends Locale_Languages,
> = {
  type: 'episode';
  id: string;
  /** Optional registered icon key for course navigation; never JSX. */
  iconKey?: string;
  title: ContentBlock_Text<ConfigType, SupportedLanguages>;
  sections: readonly Episode_ScenarioSection<ConfigType, SupportedLanguages>[];
};
