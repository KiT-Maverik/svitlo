import type { ContentBlock_Configurator } from '../../contentBlocks/contentBlock.types';
import { createSectionConfigurator } from '../_shared';
import { quizSection_Config_Schema, type QuizSection_Config } from './defineQuizSection.schemas';

/**
 * Define a Quiz Section using the same content/override lifecycle as all Sections.
 * Screen.content contains block slugs pointing into content.items, not nested
 * ContentBlock configs. The actual configurators live only in Section.content.
 */
export function defineQuizSection<
  const Slug extends string,
  const Items extends Record<string, ContentBlock_Configurator>,
>(
  config: Omit<QuizSection_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: { items: Items; order: string[] };
  },
) {
  const validateScreens = (value: QuizSection_Config) => {
    const screen = value.params.screen;
    const screens = [screen?.starting, screen?.ending?.success, screen?.ending?.fail, screen?.ending?.retry];
    for (const entry of screens) {
      for (const slug of entry?.content ?? []) {
        if (!Object.hasOwn(value.content.items, slug)) {
          throw new Error('Quiz screen references unknown ContentBlock: ' + slug);
        }
      }
    }
  };
  return createSectionConfigurator(config, quizSection_Config_Schema, validateScreens);
}

export type QuizSection_Configurator = ReturnType<typeof defineQuizSection>;
