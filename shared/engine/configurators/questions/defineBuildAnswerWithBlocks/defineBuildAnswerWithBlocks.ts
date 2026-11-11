import type { DeepPartial } from '#types';
import { onlyLocales, onlyStrings } from '../../_shared__configurators';
import { buildAnswerWithBlocks_Config_Schema, type Question_BuildAnswerWithBlocks_Config } from './defineBuildAnswerWithBlocks.schemas';

const validate = (candidate: Question_BuildAnswerWithBlocks_Config): void => {
  const { content, ...metadata } = candidate;
  buildAnswerWithBlocks_Config_Schema.parse(metadata);
  if (!Array.isArray(content?.question) || content.question.length === 0) {
    throw new Error('Question content.question must contain at least one ContentBlock');
  }
  if (!Array.isArray(content.correctSequence) || !content.correctSequence.length || !Array.isArray(content.distractors)) throw new Error('Question requires a nonempty correctSequence and distractors array');
};

/** Define buildAnswerWithBlocks with independently validated child ContentBlocks. */
export const defineBuildAnswerWithBlocks = <
  const Slug extends string,
  const Content extends Question_BuildAnswerWithBlocks_Config['content'],
>(
  config: Omit<Question_BuildAnswerWithBlocks_Config, 'slug' | 'content'> & {
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
  } satisfies DeepPartial<Question_BuildAnswerWithBlocks_Config>;
  const overrides: DeepPartial<Question_BuildAnswerWithBlocks_Config> = {};

  return {
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<Question_BuildAnswerWithBlocks_Config['locale']> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    content,
    override: {
      params: (value: DeepPartial<Question_BuildAnswerWithBlocks_Config['params']>) => (overrides.params = value),
      locale: (value: DeepPartial<Question_BuildAnswerWithBlocks_Config['locale']>) => (overrides.locale = value),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type Question_BuildAnswerWithBlocks_Configurator = ReturnType<typeof defineBuildAnswerWithBlocks>;
