import { camelCase_Schema } from '#schemas';

export type OrderedKeysValidationIssue = {
  check: 'collection' | 'slug' | 'order';
  path: string;
  message: string;
};

type Options = {
  path?: string;
  allowDisabled?: boolean;
  requireNonEmpty?: boolean;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/**
 * Validate ordered keys independently of item shape. Checkpoint questions are
 * objects, while Lesson/Section children and Checkpoint answers are configurators.
 */
export function validateOrderedKeys(
  value: unknown,
  { path = 'content', allowDisabled = false, requireNonEmpty = false }: Options = {},
): OrderedKeysValidationIssue[] {
  if (!isRecord(value) || !isRecord(value.items) || !Array.isArray(value.order)) {
    return [{ check: 'collection', path, message: 'Expected an object with items and order' }];
  }

  const items = value.items;
  const issues: OrderedKeysValidationIssue[] = [];
  const keys = Object.keys(items);
  if (requireNonEmpty && !keys.length) {
    issues.push({ check: 'collection', path: path + '.items', message: 'At least one item is required' });
  }

  for (const key of keys) {
    if (!camelCase_Schema.safeParse(key).success) {
      issues.push({ check: 'slug', path: path + '.items.' + key, message: 'Item key must be camelCase' });
    }
  }

  const seen = new Set<string>();
  const active = keys.filter(key => !allowDisabled || items[key] !== false);
  const activeSet = new Set(active);
  for (const [index, slug] of value.order.entries()) {
    const at = path + '.order[' + index + ']';
    if (typeof slug !== 'string' || !camelCase_Schema.safeParse(slug).success) {
      issues.push({ check: 'order', path: at, message: 'Order entry must be a camelCase slug' });
      continue;
    }
    if (seen.has(slug)) {
      issues.push({ check: 'order', path: at, message: 'Duplicate slug: ' + slug });
    }
    if (!activeSet.has(slug)) {
      issues.push({ check: 'order', path: at, message: 'Unknown slug: ' + slug });
    }
    seen.add(slug);
  }
  for (const key of active) {
    if (!seen.has(key)) issues.push({ check: 'order', path: path + '.order', message: 'Missing slug: ' + key });
  }
  return issues;
}
