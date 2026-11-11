import type { DeepPartial } from '#types';

import {
  onlyLocales,
  onlyStrings,
  validateOrderedKeys,
  validateSluggedConfiguratorMap,
} from '../../_shared__configurators';
import {
  module_Config_Schema,
  type Module_Child,
  type Module_Config,
  type Module_Locale,
} from './defineModule.schemas';

const allowedChildren = ['chapter', 'lesson'] as const;

const validate = (config: Module_Config): void => {
  const { content, ...metadata } = config;
  const parsed = module_Config_Schema.safeParse(metadata);
  const errors = [
    ...(!parsed.success ? parsed.error.issues.map(issue => issue.path.join('.') + ': ' + issue.message) : []),
    ...validateOrderedKeys(content, { path: 'content' }).map(issue => issue.path + ': ' + issue.message),
    ...validateSluggedConfiguratorMap(content?.items, allowedChildren, {
      path: 'content.items',
      itemLabel: 'Module child',
    }).map(issue => issue.path + ': ' + issue.message),
  ];
  if (errors.length) throw new Error('Module validation failed: ' + errors.join('; '));
};

/** Define a Module of Chapters and Lessons with an explicit content order. */
export const defineModule = <const Slug extends string, const Items extends Record<string, Module_Child>>(
  config: Omit<Module_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: { items: Items; order: string[] };
  },
): Module_Configurator<Slug, Items> => {
  validate(config);
  const { id, slug, type, params, locale } = config;
  const content = { items: { ...config.content.items }, order: [...config.content.order] };

  const base = {
    id,
    slug,
    type,
    params,
    locale: onlyStrings(locale),
  } satisfies DeepPartial<Module_Config>;

  const overrides: DeepPartial<Module_Config> = {};

  return {
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<Module_Locale<'config'>> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    override: {
      params: (newParams: DeepPartial<Module_Config['params']>) => (overrides.params = newParams),
      locale: (newLocale: DeepPartial<Module_Locale<'config'>>) => (overrides.locale = newLocale),
    },
    disable: () => (overrides.params = { disabled: true }),
    content,
  } as const;
};

/** Public Module shape. Explicitly named to keep declaration output bounded. */
export type Module_Configurator<
  Slug extends string = string,
  Items extends Record<string, Module_Child> = Record<string, Module_Child>,
> = {
  readonly id: string;
  readonly slug: Slug;
  readonly type: 'module';
  readonly config: {
    readonly base: {
      id: string;
      slug: Slug;
      type: 'module';
      params: Module_Config['params'];
      locale: DeepPartial<Module_Locale<'config'>>;
    };
    readonly locales: () => { locale: DeepPartial<Module_Locale<'config'>> };
    readonly overrides: DeepPartial<Module_Config>;
    readonly validate: (candidate: Module_Config) => void;
  };
  readonly override: {
    readonly params: (value: DeepPartial<Module_Config['params']>) => void;
    readonly locale: (value: DeepPartial<Module_Locale<'config'>>) => void;
  };
  readonly disable: () => void;
  readonly content: { items: Items; order: string[] };
};
