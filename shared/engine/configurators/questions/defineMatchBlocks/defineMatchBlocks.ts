import type { DeepPartial } from '#types';
import { onlyLocales, onlyStrings } from '../../_shared__configurators';
import { matchBlocks_Config_Schema, type Question_MatchBlocks_Config } from './defineMatchBlocks.schemas';

const validate = (candidate: Question_MatchBlocks_Config): void => {
  const { content, ...metadata } = candidate;
  matchBlocks_Config_Schema.parse(metadata);
  if (!Array.isArray(content?.question) || content.question.length === 0) {
    throw new Error('Question content.question must contain at least one ContentBlock');
  }
  if (
    !content.pairs ||
    typeof content.pairs !== 'object' ||
    Array.isArray(content.pairs) ||
    Object.values(content.pairs).some(pair => !pair || typeof pair !== 'object' || !('left' in pair) || !('right' in pair))
  ) {
    throw new Error('Question pairs must contain left and right blocks');
  }
};

/** Define matchBlocks with independently validated child ContentBlocks. */
export const defineMatchBlocks = <
  const Slug extends string,
  const Content extends Question_MatchBlocks_Config['content'],
>(
  config: Omit<Question_MatchBlocks_Config, 'slug' | 'content'> & {
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
  } satisfies DeepPartial<Question_MatchBlocks_Config>;
  const overrides: DeepPartial<Question_MatchBlocks_Config> = {};

  return {
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<Question_MatchBlocks_Config['locale']> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    content,
    override: {
      params: (value: DeepPartial<Question_MatchBlocks_Config['params']>) => (overrides.params = value),
      locale: (value: DeepPartial<Question_MatchBlocks_Config['locale']>) => (overrides.locale = value),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type Question_MatchBlocks_Configurator = ReturnType<typeof defineMatchBlocks>;
