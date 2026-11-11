import type { DeepPartial } from '#types';

import {
  onlyLocales,
  onlyStrings,
  validateOrderedKeys,
  validateSluggedConfiguratorMap,
} from '../../_shared__configurators';
import { chapter_Config_Schema, type Chapter_Config, type Chapter_Locale } from './defineChapter.schemas';

const allowedChildren = ['lesson'] as const;

const validate = (config: Chapter_Config): void => {
  const { content, ...metadata } = config;
  const parsed = chapter_Config_Schema.safeParse(metadata);
  const errors = [
    ...(!parsed.success ? parsed.error.issues.map(issue => issue.path.join('.') + ': ' + issue.message) : []),
    ...validateOrderedKeys(content, { path: 'content' }).map(issue => issue.path + ': ' + issue.message),
    ...validateSluggedConfiguratorMap(content?.items, allowedChildren, {
      path: 'content.items',
      itemLabel: 'Chapter child',
    }).map(issue => issue.path + ': ' + issue.message),
  ];
  if (errors.length) throw new Error('Chapter validation failed: ' + errors.join('; '));
};

/** Define a Chapter of Lessons with an explicit content order. */
export const defineChapter = <
  const Slug extends string,
  const Items extends Record<string, import('../../lessons/defineLesson').Lesson_Configurator>,
>(
  config: Omit<Chapter_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: { items: Items; order: string[] };
  },
): Chapter_Configurator<Slug, Items> => {
  validate(config);
  const { id, slug, type, params, locale } = config;
  const content = { items: { ...config.content.items }, order: [...config.content.order] };

  const base = {
    id,
    slug,
    type,
    params,
    locale: onlyStrings(locale),
  } satisfies DeepPartial<Chapter_Config>;

  const overrides: DeepPartial<Chapter_Config> = {};

  return {
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<Chapter_Locale<'config'>> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    override: {
      params: (newParams: DeepPartial<Chapter_Config['params']>) => (overrides.params = newParams),
      locale: (newLocale: DeepPartial<Chapter_Locale<'config'>>) => (overrides.locale = newLocale),
    },
    disable: () => (overrides.params = { disabled: true }),
    content,
  } as const;
};

/** Public Chapter shape. Explicitly named to keep declaration output bounded. */
export type Chapter_Configurator<
  Slug extends string = string,
  Items extends Record<string, import('../../lessons/defineLesson').Lesson_Configurator> = Record<
    string,
    import('../../lessons/defineLesson').Lesson_Configurator
  >,
> = {
  readonly id: string;
  readonly slug: Slug;
  readonly type: 'chapter';
  readonly config: {
    readonly base: {
      id: string;
      slug: Slug;
      type: 'chapter';
      params: Chapter_Config['params'];
      locale: DeepPartial<Chapter_Locale<'config'>>;
    };
    readonly locales: () => { locale: DeepPartial<Chapter_Locale<'config'>> };
    readonly overrides: DeepPartial<Chapter_Config>;
    readonly validate: (candidate: Chapter_Config) => void;
  };
  readonly override: {
    readonly params: (value: DeepPartial<Chapter_Config['params']>) => void;
    readonly locale: (value: DeepPartial<Chapter_Locale<'config'>>) => void;
  };
  readonly disable: () => void;
  readonly content: { items: Items; order: string[] };
};
