import type { LanguageScope, PublicationLanguageOptions } from '#types';
import type { AllLanguageCodes, LanguageCode } from '#schemas';
import { resolvePublicationLanguages } from '../../_shared__configurators';
import type { ContentBlock_Scene_Overrides } from '../../contentBlocks/defineScene/defineScene.schemas';
import { questTask_Config_Schema, questTask_Props_Schema, type QuestTask_Config } from './defineQuestSection.schemas';
import { assertQuestChild, projectQuestTree, nestQuestPublication, validateQuestPublication } from './quest.utils';

export type QuestTask_Overrides = { scene?: ContentBlock_Scene_Overrides };

/** A Task owns exactly one Scene; Scene calls Quest Actions for nonlinear progression. */
export const defineQuestTask = <
  const Slug extends string,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(config: QuestTask_Config & { slug: Slug }) => {
  const validate = (value: QuestTask_Config): void => {
    questTask_Config_Schema.parse(value);
    assertQuestChild(value.scene, 'scene', 'scene');
  };
  validate(config);
  const { id, slug, type, scene } = config;
  const props = (options: PublicationLanguageOptions<Languages>) => {
    const languages = resolvePublicationLanguages(options);
    const output = nestQuestPublication({ id, slug, type }, projectQuestTree({ scene }, languages), 'unused');
    const normalized = { base: { id, slug, type, scene: (output.base.unused as Record<string, unknown>).scene },
      locale: output.locale ? Object.fromEntries(Object.entries(output.locale).map(([lang, value]) =>
        [lang, (value.unused as Record<string, unknown>)])) : undefined };
    validateQuestPublication(questTask_Props_Schema, normalized, languages);
    return normalized;
  };
  const overrides = (patch: QuestTask_Overrides, options: PublicationLanguageOptions<Languages>) => {
    const languages = resolvePublicationLanguages(options);
    if (!patch || typeof patch !== 'object' || Array.isArray(patch) ||
      Object.keys(patch).some(key => key !== 'scene')) throw new Error('Invalid QuestTask overrides');
    const output = projectQuestTree({ scene }, languages, patch);
    validateQuestPublication(questTask_Props_Schema, props(options), languages, output);
    return output;
  };
  const result = { id, slug, type, scene, validate, build: { props, overrides },
    config: { base: { id, slug, type }, locales: () => ({}), validate } } as const;
  return result as typeof result & LanguageScope<Languages>;
};
export type QuestTask_Configurator = ReturnType<typeof defineQuestTask>;
