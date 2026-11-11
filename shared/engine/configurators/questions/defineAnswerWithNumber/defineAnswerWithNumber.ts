import type { DeepPartial } from '#types';
import { onlyLocales, onlyStrings } from '../../_shared__configurators';
import {
  answerWithNumber_Config_Schema,
  type Question_AnswerWithNumber_Config,
} from './defineAnswerWithNumber.schemas';

const validate = (candidate: Question_AnswerWithNumber_Config): void => {
  const { content, ...metadata } = candidate;
  answerWithNumber_Config_Schema.parse(metadata);
  if (!Array.isArray(content?.question) || content.question.length === 0) {
    throw new Error('Question content.question must contain at least one ContentBlock');
  }
};

/** Define answerWithNumber with independently validated child ContentBlocks. */
export const defineAnswerWithNumber = <
  const Slug extends string,
  const Content extends Question_AnswerWithNumber_Config['content'],
>(
  config: Omit<Question_AnswerWithNumber_Config, 'slug' | 'content'> & {
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
  } satisfies DeepPartial<Question_AnswerWithNumber_Config>;
  const overrides: DeepPartial<Question_AnswerWithNumber_Config> = {};

  return {
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<Question_AnswerWithNumber_Config['locale']> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    content,
    override: {
      params: (value: DeepPartial<Question_AnswerWithNumber_Config['params']>) => (overrides.params = value),
      locale: (value: DeepPartial<Question_AnswerWithNumber_Config['locale']>) => (overrides.locale = value),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type Question_AnswerWithNumber_Configurator = ReturnType<typeof defineAnswerWithNumber>;
