import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_shared';
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

const camelCase = /^[a-z][a-zA-Z0-9]*$/;
const allowedAnswers = new Set(['text', 'markdown', 'code', 'image', 'video', 'audio', 'youtube', 'carousel', 'scene']);
const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const validate = (config: ContentBlock_Checkpoint_Config): void => {
  const subject = {
    id: config?.id,
    slug: config?.slug,
    type: config?.type,
  };
  const result: CheckpointValidationResult = { success: true, subject, errors: [] };
  const fail = (check: string, path: string, message: string) => {
    result.errors.push({ check, path, message });
  };

  const metadata = checkpoint_Config_Schema.safeParse(config);
  if (!metadata.success) {
    for (const issue of metadata.error.issues) {
      fail('metadata', issue.path.join('.'), issue.message);
    }
  }

  const validateCollection = (value: unknown, path: string): Record<string, unknown> | undefined => {
    if (!isObject(value) || !isObject(value.items) || !Array.isArray(value.order)) {
      fail('collection', path, 'Expected an object with items and order');
      return;
    }

    const keys = Object.keys(value.items);
    if (!keys.length) fail('collection', path + '.items', 'At least one item is required');
    for (const key of keys) {
      if (!camelCase.test(key)) fail('slug', path + '.items.' + key, 'Item key must be camelCase');
    }

    const seen = new Set<string>();
    for (const [index, slug] of value.order.entries()) {
      if (typeof slug !== 'string' || !camelCase.test(slug)) {
        fail('order', path + '.order[' + index + ']', 'Order entry must be a camelCase slug');
        continue;
      }
      if (seen.has(slug)) fail('order', path + '.order[' + index + ']', 'Duplicate slug: ' + slug);
      if (!Object.hasOwn(value.items, slug)) {
        fail('order', path + '.order[' + index + ']', 'Unknown slug: ' + slug);
      }
      seen.add(slug);
    }
    for (const key of keys) {
      if (!seen.has(key)) fail('order', path + '.order', 'Missing slug: ' + key);
    }
    return value.items;
  };

  const contentItems = validateCollection(config?.content, 'content');
  if (contentItems) {
    for (const [slug, item] of Object.entries(contentItems)) {
      const path = 'content.items.' + slug;
      if (!isObject(item)) {
        fail('item', path, item === false ? 'false is reserved for overrides' : 'Expected a question and answer item');
        continue;
      }
      if (item.check !== undefined && item.check !== true) {
        fail('item', path + '.check', 'check must be true when provided');
      }

      if (!isObject(item.question) || item.question.type !== 'text') {
        fail('question', path + '.question', 'Question must be a Text configurator');
      }

      const answers = validateCollection(item.answer, path + '.answer');
      if (!answers) continue;
      for (const [answerSlug, value] of Object.entries(answers)) {
        const answerPath = path + '.answer.items.' + answerSlug;
        if (!isObject(value)) {
          fail('answer', answerPath, 'Expected an answer ContentBlock configurator');
          continue;
        }
        if (typeof value.type !== 'string' || !allowedAnswers.has(value.type)) {
          fail('answer', answerPath, 'Unsupported answer type: ' + String(value.type));
        }
        if (value.slug !== answerSlug) {
          fail('slug', answerPath, 'Key ' + answerSlug + ' does not match configurator slug ' + String(value.slug));
        }
      }
    }
  }

  result.success = result.errors.length === 0;
  if (!result.success) throw new CheckpointValidationError(result);
};

/**
 * Define an ordered Checkpoint of questions and their permitted answer blocks.
 *
 * @remarks
 * `content.items` maps camelCase question keys to
 * `{ question, answer, check? }` entries; `question` must be a Text
 * configurator. Each `answer` contains `items`, a map of ContentBlock
 * configurators keyed by their own slugs, and an explicit `order` array.
 * Checkpoints cannot be nested inside answers.
 *
 * **Use `configuratorArrayToSlugMap([...])` to build `answer.items`**
 * instead of manually copying configurator slugs into map keys. The helper
 * derives keys from the top-level `slug`, retains literal keys for TypeScript
 * autocomplete, and rejects duplicate slugs. It does not build the outer
 * `content.items`, whose values are question/answer entries, not configurators.
 *
 * Both `content.order` and each `answer.order` must list every corresponding
 * item key exactly once. Their order, not object insertion order, controls the
 * authored sequence.
 *
 * The original `content` stays unchanged. Use `override.content.add(slug, item)`
 * to append a question, `disable(slugs)` to write `false` for existing keys
 * and remove them from order, or `order(slugs)` to replace the complete
 * order. `false` is valid **only in overrides**, never in authored content.
 * Overrides are applied during assembly; validate the resolved collection
 * before publication.
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
          if (!camelCase.test(itemSlug) || Object.hasOwn(content.items, itemSlug) ||
              Object.hasOwn(overrides.content?.items ?? {}, itemSlug)) {
            throw new Error(`Invalid or duplicate Checkpoint question slug: ${itemSlug}`);
          }
          const patch = (overrides.content ??= {});
          (patch.items ??= {})[itemSlug] = item;
          patch.order = [...currentOrder(), itemSlug];
        },
        disable: (slugs: (keyof Items & string)[]) => {
          const selected = new Set(slugs);
          for (const key of selected) {
            if (!Object.hasOwn(content.items, key)) throw new Error(`Unknown Checkpoint question slug: ${key}`);
          }
          if (!selected.size) return;
          const patch = (overrides.content ??= {});
          for (const key of selected) (patch.items ??= {})[key] = false;
          patch.order = currentOrder().filter(key => !selected.has(key));
        },
        order: (slugs: string[]) => {
          const active = Object.entries({ ...content.items, ...overrides.content?.items })
            .filter(([, item]) => item !== false)
            .map(([key]) => key);
          const ordered = new Set(slugs);
          if (ordered.size !== active.length || slugs.length !== active.length ||
              active.some(key => !ordered.has(key))) {
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
