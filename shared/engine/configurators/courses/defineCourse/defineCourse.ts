import type { LanguageCodes } from '#schemas';
import type { DeepPartial } from '#types';

import {
  onlyLocales,
  onlyStrings,
  validateOrderedKeys,
  validateSluggedConfiguratorMap,
} from '../../_shared__configurators';
import {
  course_Config_Schema,
  type Course_Child,
  type Course_Config,
  type Course_Locale,
} from './defineCourse.schemas';

const allowedChildren = ['module', 'chapter', 'lesson'] as const;

const validate = (config: Course_Config): void => {
  const { content, ...metadata } = config;
  const parsed = course_Config_Schema.safeParse(metadata);
  const errors = [
    ...(!parsed.success ? parsed.error.issues.map(issue => issue.path.join('.') + ': ' + issue.message) : []),
    ...validateOrderedKeys(content, { path: 'content' }).map(issue => issue.path + ': ' + issue.message),
    ...validateSluggedConfiguratorMap(content?.items, allowedChildren, {
      path: 'content.items',
      itemLabel: 'Course child',
    }).map(issue => issue.path + ': ' + issue.message),
  ];
  if (errors.length) throw new Error('Course validation failed: ' + errors.join('; '));
};

/**
 * Define a Course with direct Lesson, Chapter and Module children.
 *
 * @remarks
 * The Course owns its params, locale and ordered content. Use
 * configuratorArrayToSlugMap([...]) to derive content.items from child slugs.
 * Content is exposed for direct edits; call config.validate() after editing it.
 * Each nested configurator validates itself; Course only checks the collection boundary.
 */
export const defineCourse = <
  const Slug extends string,
  const Languages extends readonly [LanguageCodes, ...LanguageCodes[]],
  const Items extends Record<string, Course_Child>,
>(
  config: Omit<Course_Config, 'slug' | 'params' | 'content'> & {
    slug: Slug;
    params: Omit<Course_Config['params'], 'languages'> & { languages: Languages };
    content: { items: Items; order: string[] };
  },
): Course_Configurator<Slug, Items, Languages> => {
  validate(config as unknown as Course_Config);
  const { id, slug, type, params, locale } = config;
  const content = { items: { ...config.content.items }, order: [...config.content.order] };

  const base = {
    id,
    slug,
    type,
    params,
    locale: onlyStrings(locale),
  };

  const overrides: DeepPartial<Course_Config> = {};

  return {
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<Course_Locale<'config'>> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    override: {
      params: (newParams: DeepPartial<Course_Config['params']>) => (overrides.params = newParams),
      locale: (newLocale: DeepPartial<Course_Locale<'config'>>) => (overrides.locale = newLocale),
    },
    disable: () => (overrides.params = { disabled: true }),
    content,
  } as const;
};

/** Public Course shape. Explicitly named to keep declaration output bounded. */
export type Course_Configurator<
  Slug extends string = string,
  Items extends Record<string, Course_Child> = Record<string, Course_Child>,
  Languages extends readonly LanguageCodes[] = readonly LanguageCodes[],
> = {
  readonly id: string;
  readonly slug: Slug;
  readonly type: 'course';
  readonly config: {
    readonly base: {
      id: string;
      slug: Slug;
      type: 'course';
      params: Omit<Course_Config['params'], 'languages'> & { languages: Languages };
      locale: DeepPartial<Course_Locale<'config'>>;
    };
    readonly locales: () => { locale: DeepPartial<Course_Locale<'config'>> };
    readonly overrides: DeepPartial<Course_Config>;
    readonly validate: (candidate: Course_Config) => void;
  };
  readonly override: {
    readonly params: (value: DeepPartial<Course_Config['params']>) => void;
    readonly locale: (value: DeepPartial<Course_Locale<'config'>>) => void;
  };
  readonly disable: () => void;
  readonly content: { items: Items; order: string[] };
};
