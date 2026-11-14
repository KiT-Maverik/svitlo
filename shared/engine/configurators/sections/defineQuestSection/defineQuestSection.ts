import type { ConfigWithLanguages, LanguageScope, PublicationLanguageOptions, ChildrenSupporting, DeepPartial } from '#types';
import type { AllLanguageCodes, LanguageCode } from '#schemas';
import { mergeForValidation, onlyLocales, onlyStrings, resolvePublicationLanguages,
  selectPublicationLocales, splitLocalizedFields } from '../../_shared__configurators';
import { questSection_Config_Schema, questSection_Props_Schema, questSection_Override_Metadata_Schema,
  type QuestSection_Config, type QuestSection_Metadata_Overrides } from './defineQuestSection.schemas';
import type { Stage_Configurator, Stage_Overrides } from './defineStage';
import type { Task_Configurator, Task_Overrides } from './defineTask';
import { assertQuestMap, projectQuestTree, nestQuestPublication,
  mergeQuestPatches, validateQuestPublication } from './quest.utils';

export type QuestSection_Overrides<
  Stages extends Record<string, Stage_Configurator>,
  Tasks extends Record<string, Task_Configurator>,
> = QuestSection_Metadata_Overrides & {
  stages?: { [Key in keyof Stages]?: Stage_Overrides };
  tasks?: { [Key in keyof Tasks]?: Task_Overrides };
};

/**
 * Build-only Quest Section contract. Runtime integration and Quest UI are deliberately
 * not part of this configurator PR.
 *
 * Stages and Tasks are camelCase slug maps without order. The mandatory start
 * entries supply the entry points; subsequent transitions are imperative Quest
 * Actions invoked by the active Task Scene. No authored transition graph.
 *
 * A Stage requires medium/small video, localized dialogue/narration/background
 * audio slots, an image and localized subtitles. An audio slot can be null when
 * that track has no content, but a missing accessible presentation is not
 * publication-ready. The player must preserve the paused base Stage behind a
 * transient reaction Stage, block Task input during async playback, and restore
 * the previous frame after the reaction; no playback is implemented here.
 */
export const defineQuestSection = <
  const Slug extends string,
  const Stages extends Record<string, Stage_Configurator> & { start: Stage_Configurator },
  const Tasks extends Record<string, Task_Configurator> & { start: Task_Configurator },
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: Omit<QuestSection_Config, 'slug' | 'stages' | 'tasks'> & {
    slug: Slug;
    stages: Stages & ChildrenSupporting<Languages, Stages>;
    tasks: Tasks & ChildrenSupporting<Languages, Tasks>;
  } & ConfigWithLanguages<QuestSection_Config, Languages>,
) => {
  const validate = (value: QuestSection_Config): void => {
    questSection_Config_Schema.parse(value);
    assertQuestMap(value.stages, 'questStage', 'stages');
    assertQuestMap(value.tasks, 'questTask', 'tasks');
  };
  validate(config);
  const { id, slug, type } = config;
  const metadataSchema = questSection_Config_Schema.omit({ stages: true, tasks: true });
  const metadata = structuredClone(metadataSchema.parse({
    id: config.id, slug: config.slug, type: config.type,
    params: config.params, locale: config.locale,
  }));
  const stages = { ...config.stages };
  const tasks = { ...config.tasks };
  const ownLocale = (locale: DeepPartial<QuestSection_Config['locale']>) => {
    const split = splitLocalizedFields(locale);
    return {
      base: Object.keys(split.base).length ? { locale: split.base } : {},
      locale: split.locale === undefined ? undefined :
        Object.fromEntries(Object.entries(split.locale).map(([lang, props]) => [lang, { locale: props }])) as
          Partial<Record<LanguageCode, { locale: unknown }>>,
    };
  };
  const props = (options: PublicationLanguageOptions<Languages>) => {
    const languages = resolvePublicationLanguages(options);
    const own = ownLocale(metadata.locale);
    const root = { id, slug, type, params: metadata.params, ...own.base };
    const withStages = nestQuestPublication(root, projectQuestTree(stages, languages), 'stages');
    const withTasks = nestQuestPublication({}, projectQuestTree(tasks, languages), 'tasks');
    const output = mergeQuestPatches(withStages, withTasks);
    output.locale = mergeQuestPatches(output, { base: {}, locale: selectPublicationLocales(own.locale, languages) }).locale;
    validateQuestPublication(questSection_Props_Schema, output, languages);
    return output;
  };
  const overrides = (
    patch: QuestSection_Overrides<Stages, Tasks>,
    options: PublicationLanguageOptions<Languages>,
  ) => {
    const languages = resolvePublicationLanguages(options);
    if (!patch || typeof patch !== 'object' || Array.isArray(patch) ||
        Object.keys(patch).some(key => !['params', 'locale', 'stages', 'tasks'].includes(key))) {
      throw new Error('Invalid QuestSection overrides');
    }
    const own = questSection_Override_Metadata_Schema.parse({
      ...(patch.params !== undefined ? { params: patch.params } : {}),
      ...(patch.locale !== undefined ? { locale: patch.locale } : {}),
    });
    metadataSchema.parse(mergeForValidation(metadata, own));
    const ownPatch = ownLocale(own.locale ?? {});
    const root = {
      base: { ...(own.params !== undefined ? { params: own.params } : {}), ...ownPatch.base },
      locale: selectPublicationLocales(ownPatch.locale, languages),
    };
    const stagePatch = patch.stages === undefined ? { base: {}, locale: undefined } :
      nestQuestPublication({}, projectQuestTree(stages, languages, patch.stages), 'stages');
    const taskPatch = patch.tasks === undefined ? { base: {}, locale: undefined } :
      nestQuestPublication({}, projectQuestTree(tasks, languages, patch.tasks), 'tasks');
    const output = mergeQuestPatches(mergeQuestPatches(root, stagePatch), taskPatch);
    validateQuestPublication(questSection_Props_Schema, props(options), languages, output);
    return output;
  };
  const result = {
    id, slug, type, stages, tasks, validate, build: { props, overrides },
    config: {
      base: { id, slug, type, params: structuredClone(metadata.params), locale: onlyStrings(metadata.locale) },
      locales: () => ({ locale: onlyLocales(metadata.locale) }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};
export type QuestSection_Configurator = ReturnType<typeof defineQuestSection>;
