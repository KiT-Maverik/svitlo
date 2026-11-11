import type { DeepPartial } from '#types';
import { onlyLocales, onlyStrings } from '../../_shared__configurators';
import { fillBlanksWithBlocks_Config_Schema, type Question_FillBlanksWithBlocks_Config } from './defineFillBlanksWithBlocks.schemas';

const validate = (candidate: Question_FillBlanksWithBlocks_Config): void => {
  const { content, ...metadata } = candidate;
  fillBlanksWithBlocks_Config_Schema.parse(metadata);
  if (!Array.isArray(content?.question) || content.question.length === 0) {
    throw new Error('Question content.question must contain at least one ContentBlock');
  }
  if (
    !Array.isArray(content.slots) ||
    content.slots.some(slot => !slot || typeof slot.selector !== 'string' || !slot.correctAnswer) ||
    !Array.isArray(content.distractors)
  ) {
    throw new Error('Question requires slots with selectors and answer blocks, and a distractors array');
  }
};

/** Define fillBlanksWithBlocks with independently validated child ContentBlocks. */
export const defineFillBlanksWithBlocks = <
  const Slug extends string,
  const Content extends Question_FillBlanksWithBlocks_Config['content'],
>(
  config: Omit<Question_FillBlanksWithBlocks_Config, 'slug' | 'content'> & {
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
  } satisfies DeepPartial<Question_FillBlanksWithBlocks_Config>;
  const overrides: DeepPartial<Question_FillBlanksWithBlocks_Config> = {};

  return {
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<Question_FillBlanksWithBlocks_Config['locale']> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    content,
    override: {
      params: (value: DeepPartial<Question_FillBlanksWithBlocks_Config['params']>) => (overrides.params = value),
      locale: (value: DeepPartial<Question_FillBlanksWithBlocks_Config['locale']>) => (overrides.locale = value),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type Question_FillBlanksWithBlocks_Configurator = ReturnType<typeof defineFillBlanksWithBlocks>;
