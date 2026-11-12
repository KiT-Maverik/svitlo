import type { DeepPartial } from '#types';

import {
  onlyLocales,
  onlyStrings,
  validateOrderedKeys,
  validateSluggedConfiguratorMap,
} from '../../_shared__configurators';
import { camelCase_Schema } from '#schemas';
import {
  checkpoint_Config_Schema,
  type ContentBlock_Checkpoint_Config,
  type ContentBlock_Checkpoint_Locale,
} from './defineCheckpoint.schemas';

type CheckpointContent = ContentBlock_Checkpoint_Config['content'];
type CheckpointItem = Exclude<CheckpointContent['items'][string], false>;
type CheckpointSubject = { id?: string; slug?: string; type?: string };

export type CheckpointValidationIssue = {
  check: string;
  path: string;
  message: string;
};
export type CheckpointValidationResult = {
  success: boolean;
  subject: CheckpointSubject;
  errors: CheckpointValidationIssue[];
};

export class CheckpointValidationError extends Error {
  constructor(readonly result: CheckpointValidationResult) {
    super('Checkpoint validation failed: ' + JSON.stringify(result));
    this.name = 'CheckpointValidationError';
  }
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const validate = (config: ContentBlock_Checkpoint_Config): void => {
  const result: CheckpointValidationResult = {
    success: true,
    subject: { id: config?.id, slug: config?.slug, type: config?.type },
    errors: [],
  };
  const fail = (check: string, path: string, message: string) => {
    result.errors.push({ check, path, message });
  };

  const metadata = checkpoint_Config_Schema.safeParse(config);
  if (!metadata.success) {
    for (const issue of metadata.error.issues) {
      fail('metadata', issue.path.join('.'), issue.message);
    }
  }

  const content = config?.content;
  for (const issue of validateOrderedKeys(content, { path: 'content', requireNonEmpty: true })) {
    fail(issue.check, issue.path, issue.message);
  }

  if (isObject(content) && isObject(content.items) && Array.isArray(content.order)) {
    for (const [slug, item] of Object.entries(content.items)) {
      if (item === false) fail('item', 'content.items.' + slug, 'false is reserved for overrides');
    }
    for (const issue of validateSluggedConfiguratorMap(content.items, ['checkpointItem'], {
      path: 'content.items',
      itemLabel: 'Checkpoint item',
    })) {
      fail(issue.check, issue.path, issue.message);
    }
  }

  result.success = result.errors.length === 0;
  if (!result.success) throw new CheckpointValidationError(result);
};

/**
 * Define a Checkpoint containing ordered `defineCheckpointItem` configurators.
 *
 * Use `configuratorArrayToSlugMap([...])` for `content.items` and
 * `answer.items`. A Checkpoint validates its own metadata and the outer
 * collection, while each Checkpoint Item validates its Text question and
 * ordered answers. `false` is reserved for collection overrides.
 *
 * `override.content.add(slug, item)` appends a Checkpoint Item;
 * `disable(slugs)` disables existing entries, and `order(slugs)` replaces
 * the authored order without mutating the original collection.
 */
export const defineCheckpoint = <
  const Slug extends string,
  const Items extends Record<string, CheckpointContent['items'][string]>,
>(
  config: Omit<ContentBlock_Checkpoint_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: { items: Items; order: string[] };
  },
) => {
  validate(config);
  const { id, type, slug, locale, params } = config;
  const content = {
    items: { ...config.content.items },
    order: [...config.content.order],
  };

  const base = {
    id,
    type,
    slug,
    params,
    locale: onlyStrings(locale),
  } satisfies DeepPartial<ContentBlock_Checkpoint_Config>;

  const overrides: DeepPartial<ContentBlock_Checkpoint_Config> = {};
  const currentOrder = () => (overrides.content?.order ?? content.order) as string[];

  return {
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Checkpoint_Locale<'config'>> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    override: {
      params: (newParams: DeepPartial<ContentBlock_Checkpoint_Config['params']>) => (overrides.params = newParams),
      locale: (newLocale: DeepPartial<ContentBlock_Checkpoint_Locale<'config'>>) => (overrides.locale = newLocale),
      content: {
        add: (itemSlug: string, item: CheckpointItem) => {
          if (
            !camelCase_Schema.safeParse(itemSlug).success ||
            Object.hasOwn(content.items, itemSlug) ||
            Object.hasOwn(overrides.content?.items ?? {}, itemSlug)
          ) {
            throw new Error('Invalid or duplicate Checkpoint question slug: ' + itemSlug);
          }
          if (
            validateSluggedConfiguratorMap({ [itemSlug]: item }, ['checkpointItem'], {
              itemLabel: 'Checkpoint item',
            }).length
          ) {
            throw new Error('Expected a Checkpoint Item configurator with matching slug: ' + itemSlug);
          }
          const patch = (overrides.content ??= {});
          (patch.items ??= {})[itemSlug] = item;
          patch.order = [...currentOrder(), itemSlug];
        },
        disable: (slugs: (keyof Items & string)[]) => {
          const selected = new Set<string>(slugs);
          for (const key of selected) {
            if (!Object.hasOwn(content.items, key)) throw new Error('Unknown Checkpoint question slug: ' + key);
          }
          if (!selected.size) return;
          const patch = (overrides.content ??= {});
          for (const key of selected) (patch.items ??= {})[key] = false;
          patch.order = currentOrder().filter(key => !selected.has(key));
        },
        order: (slugs: string[]) => {
          const items = { ...content.items, ...overrides.content?.items };
          if (validateOrderedKeys({ items, order: slugs }, { allowDisabled: true }).length) {
            throw new Error('Checkpoint order must contain each active question slug exactly once');
          }
          (overrides.content ??= {}).order = [...slugs];
        },
      },
    },
    disable: () => (overrides.params = { disabled: true }),
    content,
  } as const;
};

export type ContentBlock_Checkpoint_Configurator = ReturnType<typeof defineCheckpoint>;
