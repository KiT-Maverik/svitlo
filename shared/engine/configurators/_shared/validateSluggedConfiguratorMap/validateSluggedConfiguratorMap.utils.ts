import { camelCase_Schema } from '#schemas';

export type SlugMapValidationIssue = {
  check: 'slug' | 'item';
  path: string;
  message: string;
};

type Options = {
  path?: string;
  itemLabel?: string;
  allowDisabled?: boolean;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/**
 * Validate only the slug-keyed child boundary, never nested child metadata.
 * The child configurator remains responsible for its own config.validate().
 */
export function validateSluggedConfiguratorMap(
  items: unknown,
  allowedTypes: readonly string[],
  { path = 'items', itemLabel = 'child', allowDisabled = false }: Options = {},
): SlugMapValidationIssue[] {
  if (!isRecord(items)) {
    return [{ check: 'item', path, message: 'Expected a slug-keyed configurator map' }];
  }

  const issues: SlugMapValidationIssue[] = [];
  for (const [slug, child] of Object.entries(items)) {
    const at = path + '.' + slug;
    if (!camelCase_Schema.safeParse(slug).success) {
      issues.push({ check: 'slug', path: at, message: 'Invalid item slug: ' + slug });
    }
    if (child === false && allowDisabled) continue;
    if (!isRecord(child)) {
      issues.push({ check: 'item', path: at, message: 'Expected a matching ' + itemLabel + ' configurator at ' + slug });
      continue;
    }
    if (child.slug !== slug) {
      issues.push({
        check: 'slug',
        path: at,
        message: 'Key ' + slug + ' does not match configurator slug ' + String(child.slug),
      });
    }
    if (typeof child.type !== 'string' || !allowedTypes.includes(child.type)) {
      issues.push({
        check: 'item',
        path: at,
        message: 'Unsupported ' + itemLabel + ' type: ' + String(child.type),
      });
    }
    if (!isRecord(child.config) || typeof child.config.locales !== 'function') {
      issues.push({
        check: 'item',
        path: at,
        message: 'Expected a matching ' + itemLabel + ' configurator at ' + slug,
      });
    }
  }
  return issues;
}
