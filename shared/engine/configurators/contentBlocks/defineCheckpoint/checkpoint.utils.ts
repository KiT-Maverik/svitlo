import { camelCase_Schema } from '#schemas';

import { checkpoint_Config_Schema, type ContentBlock_Checkpoint_Config } from './defineCheckpoint.schemas';

type KeyedCollection = { items: Record<string, unknown>; order: readonly string[] };

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/** Verify identity, completeness and order without inspecting the children's own data. */
export function checkCheckpointOrder(value: unknown, location: string, allowEmpty = false): asserts value is KeyedCollection {
  if (!isRecord(value) || !isRecord(value.items) || !Array.isArray(value.order)) {
    throw new Error(`${location} requires { items, order }`);
  }
  const keys = Object.keys(value.items);
  if (!allowEmpty && !keys.length) throw new Error(`${location} must contain at least one item`);

  for (const key of keys) {
    if (!camelCase_Schema.safeParse(key).success) {
      throw new Error(`${location} contains a non-camelCase slug: ${key}`);
    }
  }

  const seen = new Set<string>();
  for (const slug of value.order) {
    if (typeof slug !== 'string' || !camelCase_Schema.safeParse(slug).success) {
      throw new Error(`${location}.order has an invalid slug: ${String(slug)}`);
    }
    if (seen.has(slug)) throw new Error(`${location}.order has a duplicate slug: ${slug}`);
    if (!Object.hasOwn(value.items, slug)) throw new Error(`${location}.order references an unknown slug: ${slug}`);
    seen.add(slug);
  }
  for (const key of keys) {
    if (!seen.has(key)) throw new Error(`${location}.order is missing slug: ${key}`);
  }
}

type ConfiguratorBase = { id: string; slug: string; type: string };

/** Structural inspection only: each nested define* factory already validated its own fields. */
function getConfiguratorBase(value: unknown, location: string): ConfiguratorBase {
  if (!isRecord(value) || !isRecord(value.config)) throw new Error(`${location} must be a ContentBlock configurator`);
  const { base, locales } = value.config;
  if (
    !isRecord(base) ||
    typeof base.id !== 'string' ||
    typeof base.slug !== 'string' ||
    typeof base.type !== 'string' ||
    typeof locales !== 'function'
  ) {
    throw new Error(`${location} must be a ContentBlock configurator`);
  }
  return base as ConfiguratorBase;
}

const permittedAnswerTypes = new Set([
  'text', 'markdown', 'code', 'image', 'video', 'audio', 'youtube', 'carousel', 'scene',
]);

/**
 * Validate Checkpoint metadata with Zod, then check only collection integrity
 * and child configurator identity. No recursive re-validation of child configs.
 */
export function checkCheckpointIntegrity(config: ContentBlock_Checkpoint_Config): void {
  checkpoint_Config_Schema.parse(config);
  checkCheckpointOrder(config.content, 'Checkpoint content');

  for (const slug of config.content.order) {
    const item = config.content.items[slug];
    if (!isRecord(item)) throw new Error(`Checkpoint item ${slug} must be an object`);
    if (item.check !== undefined && item.check !== true) {
      throw new Error(`Checkpoint item ${slug}.check must be true when present`);
    }

    const question = getConfiguratorBase(item.question, `Checkpoint ${slug}.question`);
    if (question.type !== 'text') {
      throw new Error(`Checkpoint ${slug}.question must be a Text configurator`);
    }

    checkCheckpointOrder(item.answer, `Checkpoint ${slug}.answer`);
    for (const answerSlug of item.answer.order) {
      const answer = getConfiguratorBase(item.answer.items[answerSlug], `Checkpoint ${slug}.answer.${answerSlug}`);
      if (!permittedAnswerTypes.has(answer.type)) {
        throw new Error(`Checkpoint ${slug}.answer.${answerSlug} has unsupported type: ${answer.type}`);
      }
      if (answer.slug !== answerSlug) {
        throw new Error(`Checkpoint ${slug}.answer key ${answerSlug} does not match configurator slug ${answer.slug}`);
      }
    }
  }
}
