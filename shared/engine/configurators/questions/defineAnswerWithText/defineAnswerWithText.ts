import type { DeepPartial } from '#types';
import { onlyLocales, onlyStrings } from '../../_shared__configurators';
import { answerWithText_Config_Schema, type Question_AnswerWithText_Config } from './defineAnswerWithText.schemas';

const validate = (candidate: Question_AnswerWithText_Config): void => {
  const { content, ...metadata } = candidate;
  answerWithText_Config_Schema.parse(metadata);
  if (!Array.isArray(content?.question) || content.question.length === 0) {
    throw new Error('Question content.question must contain at least one ContentBlock');
  }
  
};

/** Define answerWithText with independently validated child ContentBlocks. */
export const defineAnswerWithText = <
  const Slug extends string,
  const Content extends Question_AnswerWithText_Config['content'],
>(
  config: Omit<Question_AnswerWithText_Config, 'slug' | 'content'> & {
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
  } satisfies DeepPartial<Question_AnswerWithText_Config>;
  const overrides: DeepPartial<Question_AnswerWithText_Config> = {};

  return {
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<Question_AnswerWithText_Config['locale']> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    content,
    override: {
      params: (value: DeepPartial<Question_AnswerWithText_Config['params']>) => (overrides.params = value),
      locale: (value: DeepPartial<Question_AnswerWithText_Config['locale']>) => (overrides.locale = value),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type Question_AnswerWithText_Configurator = ReturnType<typeof defineAnswerWithText>;
