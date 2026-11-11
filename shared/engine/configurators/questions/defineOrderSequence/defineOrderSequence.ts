import type { DeepPartial } from '#types';
import { onlyLocales, onlyStrings } from '../../_shared__configurators';
import { orderSequence_Config_Schema, type Question_OrderSequence_Config } from './defineOrderSequence.schemas';

const validate = (candidate: Question_OrderSequence_Config): void => {
  const { content, ...metadata } = candidate;
  orderSequence_Config_Schema.parse(metadata);
  if (!Array.isArray(content?.question) || content.question.length === 0) {
    throw new Error('Question content.question must contain at least one ContentBlock');
  }
  if (!Array.isArray(content.sequence) || !content.sequence.length)
    throw new Error('Question sequence cannot be empty');
};

/** Define orderSequence with independently validated child ContentBlocks. */
export const defineOrderSequence = <
  const Slug extends string,
  const Content extends Question_OrderSequence_Config['content'],
>(
  config: Omit<Question_OrderSequence_Config, 'slug' | 'content'> & {
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
  } satisfies DeepPartial<Question_OrderSequence_Config>;
  const overrides: DeepPartial<Question_OrderSequence_Config> = {};

  return {
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<Question_OrderSequence_Config['locale']> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    content,
    override: {
      params: (value: DeepPartial<Question_OrderSequence_Config['params']>) => (overrides.params = value),
      locale: (value: DeepPartial<Question_OrderSequence_Config['locale']>) => (overrides.locale = value),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type Question_OrderSequence_Configurator = ReturnType<typeof defineOrderSequence>;
