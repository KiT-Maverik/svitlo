import type { DeepPartial } from '#types';
import { onlyLocales, onlyStrings } from '../../_shared__configurators';
import { fillBlanksWithText_Config_Schema, type Question_FillBlanksWithText_Config } from './defineFillBlanksWithText.schemas';

const validate = (candidate: Question_FillBlanksWithText_Config): void => {
  const { content, ...metadata } = candidate;
  fillBlanksWithText_Config_Schema.parse(metadata);
  if (!Array.isArray(content?.question) || content.question.length === 0) {
    throw new Error('Question content.question must contain at least one ContentBlock');
  }
  
};

/** Define fillBlanksWithText with independently validated child ContentBlocks. */
export const defineFillBlanksWithText = <
  const Slug extends string,
  const Content extends Question_FillBlanksWithText_Config['content'],
>(
  config: Omit<Question_FillBlanksWithText_Config, 'slug' | 'content'> & {
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
  } satisfies DeepPartial<Question_FillBlanksWithText_Config>;
  const overrides: DeepPartial<Question_FillBlanksWithText_Config> = {};

  return {
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<Question_FillBlanksWithText_Config['locale']> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    content,
    override: {
      params: (value: DeepPartial<Question_FillBlanksWithText_Config['params']>) => (overrides.params = value),
      locale: (value: DeepPartial<Question_FillBlanksWithText_Config['locale']>) => (overrides.locale = value),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type Question_FillBlanksWithText_Configurator = ReturnType<typeof defineFillBlanksWithText>;
