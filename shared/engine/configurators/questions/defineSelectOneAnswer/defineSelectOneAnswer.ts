import type { DeepPartial } from '#types';
import { onlyLocales, onlyStrings } from '../../_shared__configurators';
import { selectOneAnswer_Config_Schema, type Question_SelectOneAnswer_Config } from './defineSelectOneAnswer.schemas';

const validate = (candidate: Question_SelectOneAnswer_Config): void => {
  const { content, ...metadata } = candidate;
  selectOneAnswer_Config_Schema.parse(metadata);
  if (!Array.isArray(content?.question) || content.question.length === 0) {
    throw new Error('Question content.question must contain at least one ContentBlock');
  }
  const groups = content.answers;
  if (
    !groups ||
    [groups.correct, groups.incorrect, groups.distractors].some(
      group => group === null || typeof group !== 'object' || Array.isArray(group),
    )
  ) {
    throw new Error('Question answers must define correct, incorrect and distractors maps');
  }
};

/** Define selectOneAnswer with independently validated child ContentBlocks. */
export const defineSelectOneAnswer = <
  const Slug extends string,
  const Content extends Question_SelectOneAnswer_Config['content'],
>(
  config: Omit<Question_SelectOneAnswer_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: Content;
  },
) => {
  validate(config);
  const { id, slug, type, params, locale, content } = config;
  const base = {
    id,
    slug,
    type,
    params,
    locale: onlyStrings(locale),
  } satisfies DeepPartial<Question_SelectOneAnswer_Config>;
  const overrides: DeepPartial<Question_SelectOneAnswer_Config> = {};

  return {
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<Question_SelectOneAnswer_Config['locale']> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    content,
    override: {
      params: (value: DeepPartial<Question_SelectOneAnswer_Config['params']>) => (overrides.params = value),
      locale: (value: DeepPartial<Question_SelectOneAnswer_Config['locale']>) => (overrides.locale = value),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type Question_SelectOneAnswer_Configurator = ReturnType<typeof defineSelectOneAnswer>;
