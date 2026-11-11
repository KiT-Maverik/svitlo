import type { DeepPartial } from '#types';
import { onlyLocales, onlyStrings } from '../../_shared__configurators';
import { selectMultipleAnswers_Config_Schema, type Question_SelectMultipleAnswers_Config } from './defineSelectMultipleAnswers.schemas';

const validate = (candidate: Question_SelectMultipleAnswers_Config): void => {
  const { content, ...metadata } = candidate;
  selectMultipleAnswers_Config_Schema.parse(metadata);
  if (!Array.isArray(content?.question) || content.question.length === 0) {
    throw new Error('Question content.question must contain at least one ContentBlock');
  }
  if (!content.answers || !content.answers.correct || !content.answers.incorrect || !content.answers.distractors) throw new Error('Question answers must define correct, incorrect and distractors');
};

/** Define selectMultipleAnswers with independently validated child ContentBlocks. */
export const defineSelectMultipleAnswers = <
  const Slug extends string,
  const Content extends Question_SelectMultipleAnswers_Config['content'],
>(
  config: Omit<Question_SelectMultipleAnswers_Config, 'slug' | 'content'> & {
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
  } satisfies DeepPartial<Question_SelectMultipleAnswers_Config>;
  const overrides: DeepPartial<Question_SelectMultipleAnswers_Config> = {};

  return {
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<Question_SelectMultipleAnswers_Config['locale']> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    content,
    override: {
      params: (value: DeepPartial<Question_SelectMultipleAnswers_Config['params']>) => (overrides.params = value),
      locale: (value: DeepPartial<Question_SelectMultipleAnswers_Config['locale']>) => (overrides.locale = value),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type Question_SelectMultipleAnswers_Configurator = ReturnType<typeof defineSelectMultipleAnswers>;
