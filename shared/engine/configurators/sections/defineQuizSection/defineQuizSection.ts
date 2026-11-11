import type { DeepPartial } from '#types';

import {
  onlyLocales,
  onlyStrings,
  validateOrderedKeys,
  validateSluggedConfiguratorMap,
} from '../../_shared__configurators';
import { contentBlockTypes, type ContentBlock_Configurator } from '../../contentBlocks';
import {
  quizSection_Config_Schema,
  type QuizSection_Config,
  type QuizSection_Locale,
} from './defineQuizSection.schemas';

type ContentPatch = {
  items?: Record<string, ContentBlock_Configurator | false>;
  order?: string[];
};

const validate = (config: QuizSection_Config): void => {
  quizSection_Config_Schema.parse(config);
  // Child configurators validate themselves; check only the collection boundary.
  const issues = [
    ...validateOrderedKeys(config.content),
    ...validateSluggedConfiguratorMap(config.content?.items, contentBlockTypes),
  ];
  if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));

  // Quiz screens reference content slugs; they do not embed ContentBlocks.
  const screen = config.params.screen;
  const screens = [screen?.starting, screen?.ending?.success, screen?.ending?.fail, screen?.ending?.retry];
  for (const entry of screens) {
    for (const slug of entry?.content ?? []) {
      if (!Object.hasOwn(config.content.items, slug)) {
        throw new Error('Quiz screen references unknown ContentBlock: ' + slug);
      }
    }
  }
};

/**
 * Define a Quiz Section with independently owned schemas and lifecycle.
 *
 * `content.items` contains ContentBlock configurators, keyed by slug.
 * `content.order` lists their slugs once each. Overrides stay sparse and
 * never mutate the authored collection; children own their own validation.
 */
export const defineQuizSection = <
  const Slug extends string,
  const Items extends Record<string, ContentBlock_Configurator>,
>(
  config: Omit<QuizSection_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: { items: Items; order: string[] };
  },
) => {
  validate(config);

  const { id, slug, type, params, locale } = config;
  const content = {
    items: { ...config.content.items },
    order: [...config.content.order],
  };

  const base = {
    id,
    slug,
    type,
    params,
    locale: onlyStrings(locale),
  } satisfies DeepPartial<QuizSection_Config>;

  const overrides: {
    params?: DeepPartial<QuizSection_Config['params']>;
    locale?: DeepPartial<QuizSection_Locale<'config'>>;
    content?: ContentPatch;
  } = {};
  const currentOrder = () => overrides.content?.order ?? content.order;

  return {
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<QuizSection_Locale<'config'>> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    override: {
      params: (value: DeepPartial<QuizSection_Config['params']>) => (overrides.params = value),
      locale: (value: DeepPartial<QuizSection_Locale<'config'>>) => (overrides.locale = value),
      content: {
        add: (childSlug: string, child: ContentBlock_Configurator) => {
          if (
            Object.hasOwn(content.items, childSlug) ||
            Object.hasOwn(overrides.content?.items ?? {}, childSlug) ||
            validateSluggedConfiguratorMap({ [childSlug]: child }, contentBlockTypes).length
          ) {
            throw new Error('Invalid or duplicate Section ContentBlock slug: ' + childSlug);
          }

          const patch = (overrides.content ??= {});
          (patch.items ??= {})[childSlug] = child;
          patch.order = [...currentOrder(), childSlug];
        },
        disable: (slugs: string[]) => {
          const selected = new Set<string>(slugs);
          const items: Record<string, ContentBlock_Configurator | false> = {
            ...content.items,
            ...overrides.content?.items,
          };
          for (const key of selected) {
            if (!Object.hasOwn(items, key) || items[key] === false) {
              throw new Error('Unknown active Section ContentBlock: ' + key);
            }
          }
          if (!selected.size) return;

          const patch = (overrides.content ??= {});
          for (const key of selected) (patch.items ??= {})[key] = false;
          patch.order = currentOrder().filter(key => !selected.has(key));
        },
        order: (slugs: string[]) => {
          const items = { ...content.items, ...overrides.content?.items };
          if (validateOrderedKeys({ items, order: slugs }, { allowDisabled: true }).length) {
            throw new Error('Section order must contain every active ContentBlock slug exactly once');
          }
          (overrides.content ??= {}).order = [...slugs];
        },
      },
    },
    disable: () => (overrides.params = { disabled: true }),
    content,
  } as const;
};

export type QuizSection_Configurator = ReturnType<typeof defineQuizSection>;
