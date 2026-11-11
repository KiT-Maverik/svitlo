import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_shared';
import {
  checkpoint_Config_Schema,
  type Checkpoint_Allowed_Configurator,
  type Checkpoint_Config_Item,
  type ContentBlock_Checkpoint_Config,
  type ContentBlock_Checkpoint_Locale,
} from './defineCheckpoint.schemas';

type CheckpointContent = ContentBlock_Checkpoint_Config['content'];
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
const allowedAnswers = new Set([
  'text', 'markdown', 'code', 'image', 'video', 'audio', 'youtube', 'carousel', 'scene',
]);
const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/**
 * One module-level validator, reused for initial creation and every content
 * override. Collect all independent integrity errors before throwing one report.
 * Child definitions have already validated their own fields in their define*.
 */
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

  const inspectBlock = (value: unknown, path: string): { type: string; slug: string } | undefined => {
    if (!isObject(value) || !isObject(value.config) || !isObject(value.config.base)) {
      fail('configurator', path, 'Expected a ContentBlock configurator returned by define*');
      return;
    }
    const { base, locales, validate: validateChild } = value.config;
    if (
      typeof base.type !== 'string' ||
      typeof base.id !== 'string' ||
      typeof base.slug !== 'string' ||
      typeof locales !== 'function' ||
      typeof validateChild !== 'function'
    ) {
      fail('configurator', path, 'Invalid ContentBlock configurator identity or methods');
      return;
    }
    if (value.type !== base.type || value.slug !== base.slug || value.id !== base.id) {
      fail('identity', path, 'Top-level id, slug and type must match config.base');
    }
    return { type: base.type, slug: base.slug };
  };

  const contentItems = validateCollection(config?.content, 'content');
  if (contentItems) {
    for (const [slug, item] of Object.entries(contentItems)) {
      const path = 'content.items.' + slug;
      if (!isObject(item)) {
        fail('item', path, 'Expected a question and answer item');
        continue;
      }
      if (item.check !== undefined && item.check !== true) {
        fail('item', path + '.check', 'check must be true when provided');
      }

      const question = inspectBlock(item.question, path + '.question');
      if (question && question.type !== 'text') {
        fail('question', path + '.question', 'Question must be a Text configurator');
      }

      const answers = validateCollection(item.answer, path + '.answer');
      if (!answers) continue;
      for (const [answerSlug, value] of Object.entries(answers)) {
        const answerPath = path + '.answer.items.' + answerSlug;
        const answer = inspectBlock(value, answerPath);
        if (!answer) continue;
        if (!allowedAnswers.has(answer.type)) {
          fail('answer', answerPath, 'Unsupported answer type: ' + answer.type);
        }
        if (answer.slug !== answerSlug) {
          fail('slug', answerPath, 'Key ' + answerSlug + ' does not match configurator slug ' + answer.slug);
        }
      }
    }
  }

  result.success = result.errors.length === 0;
  if (!result.success) throw new CheckpointValidationError(result);
};

export const defineCheckpoint = <const Slug extends string>(
  config: Omit<ContentBlock_Checkpoint_Config, 'slug'> & { slug: Slug },
) => {
  validate(config);
  const { id, type, slug, locale, params } = config;
  // Shallow copies make overrides nonmutating for the original authored config.
  const content: CheckpointContent = {
    items: { ...config.content.items },
    order: [...config.content.order],
  };

  const base = {
    id, type, slug, params, locale: onlyStrings(locale),
  } satisfies DeepPartial<ContentBlock_Checkpoint_Config>;

  const overrides: DeepPartial<ContentBlock_Checkpoint_Config> = {};

  const updateContent = (next: CheckpointContent) => {
    validate({ ...config, content: next });
    content.items = next.items;
    content.order = next.order;
  };

  const updateAnswers = (
    questionSlug: string,
    change: (answer: Checkpoint_Config_Item['answer']) => Checkpoint_Config_Item['answer'],
  ) => {
    const item = content.items[questionSlug];
    if (!item) throw new Error('Unknown Checkpoint question: ' + questionSlug);
    updateContent({
      items: { ...content.items, [questionSlug]: { ...item, answer: change(item.answer) } },
      order: [...content.order],
    });
  };

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
        add: (itemSlug: string, item: Checkpoint_Config_Item) => updateContent({
          items: { ...content.items, [itemSlug]: item },
          order: [...content.order, itemSlug],
        }),
        remove: (itemSlug: string) => {
          const items = { ...content.items };
          if (!Object.hasOwn(items, itemSlug)) throw new Error('Unknown Checkpoint item: ' + itemSlug);
          delete items[itemSlug];
          updateContent({ items, order: content.order.filter(key => key !== itemSlug) });
        },
        setOrder: (order: string[]) => updateContent({ items: { ...content.items }, order }),
        answers: (questionSlug: string) => ({
          add: (answerSlug: string, answer: Checkpoint_Allowed_Configurator) =>
            updateAnswers(questionSlug, current => ({
              items: { ...current.items, [answerSlug]: answer },
              order: [...current.order, answerSlug],
            })),
          remove: (answerSlug: string) =>
            updateAnswers(questionSlug, current => {
              const items = { ...current.items };
              if (!Object.hasOwn(items, answerSlug)) throw new Error('Unknown answer: ' + answerSlug);
              delete items[answerSlug];
              return { items, order: current.order.filter(key => key !== answerSlug) };
            }),
          setOrder: (order: string[]) =>
            updateAnswers(questionSlug, current => ({ items: { ...current.items }, order })),
        }),
      },
    },
    disable: () => (overrides.params = { disabled: true }),
    content,
  } as const;
};

export type ContentBlock_Checkpoint_Configurator = ReturnType<typeof defineCheckpoint>;
