import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type { LanguageScope, PublicationLanguageOptions } from '#types';

import { resolvePublicationLanguages, scopeBuild } from '../../../_shared__configurators';
import type { ContentBlock_Scene_Overrides } from '../../../contentBlocks/primitive/defineScene/defineScene.schemas';
import { assertQuestChild, nestQuestPublication, projectQuestTree, validateQuestPublication } from '../quest.utils';
import { task_Config_Schema, task_Data_Schema, type Task_Config } from './defineTask.schemas';

export type Task_Overrides = { scene?: ContentBlock_Scene_Overrides };

/** A Task owns exactly one Scene; Scene calls Quest Actions for nonlinear progression. */
export const defineTask = <
  const Slug extends string,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: Task_Config & { slug: Slug },
) => {
  const validate = (value: Task_Config): void => {
    task_Config_Schema.parse(value);
    assertQuestChild(value.scene, 'scene', 'scene');
  };
  const { id, slug, type, scene } = config;
  const authored = { ...config };
  const data = (options: PublicationLanguageOptions<Languages>) => {
    const languages = resolvePublicationLanguages(options);
    validate(authored);
    const output = nestQuestPublication({ id, slug, type }, projectQuestTree({ scene }), 'unused');
    const normalized = {
      base: { id, slug, type, scene: (output.base.unused as Record<string, unknown>).scene },
      locale: output.locale
        ? Object.fromEntries(
            Object.entries(output.locale).map(([lang, value]) => [lang, value.unused as Record<string, unknown>]),
          )
        : undefined,
    };
    validateQuestPublication(task_Data_Schema, normalized, languages);
    return normalized;
  };
  const overrides = (patch: Task_Overrides, options: PublicationLanguageOptions<Languages>) => {
    const languages = resolvePublicationLanguages(options);
    validate(authored);
    if (!patch || typeof patch !== 'object' || Array.isArray(patch) || Object.keys(patch).some(key => key !== 'scene'))
      throw new Error('Invalid QuestTask overrides');
    const output = projectQuestTree({ scene }, patch);
    validateQuestPublication(task_Data_Schema, data(options), languages, output);
    return output;
  };
  const result = {
    id,
    slug,
    type,
    scene,
    validate,
    build: scopeBuild({ data, overrides }),
    config: { base: { id, slug, type }, locales: () => ({}), validate },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};
export type Task_Configurator = ReturnType<typeof defineTask>;
