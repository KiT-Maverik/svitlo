/**
 * Slug-keyed authoring children. Nested configurators are references, never
 * serialized raw configs; every child owns its own validation and overrides.
 */
export type OrderedChild = {
  readonly id: string;
  readonly slug: string;
  readonly type: string;
  readonly config: {
    readonly base: { readonly id: string; readonly slug: string; readonly type: string };
    readonly locales: () => unknown;
  };
};

export type OrderedConfiguratorCollection<Item> = {
  items: Record<string, Item>;
  order: string[];
};

export type OrderedConfiguratorPatch<Item> = {
  items?: Record<string, Item | false>;
  order?: string[];
};

const slugPattern = /^[a-z][a-zA-Z0-9]*$/;
const object = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/**
 * Validate ONLY collection integrity and the child configurator boundary.
 * Each concrete define* validates its own metadata and nested descendants.
 */
export function validateOrderedConfiguratorCollection(
  value: unknown,
  allowedTypes: readonly string[],
  allowDisabled = false,
): void {
  if (!object(value) || !object(value.items) || !Array.isArray(value.order)) {
    throw new Error('Expected an ordered collection with items and order');
  }

  const active = new Set<string>();
  for (const [slug, child] of Object.entries(value.items)) {
    if (!slugPattern.test(slug)) throw new Error('Invalid item slug: ' + slug);
    if (child === false && allowDisabled) continue;
    if (!object(child) || !object(child.config) || !object(child.config.base) ||
      typeof child.config.locales !== 'function' || child.slug !== slug ||
      child.config.base.slug !== slug || child.id !== child.config.base.id ||
      child.type !== child.config.base.type ||
      !allowedTypes.includes(child.type as string)) {
      throw new Error('Expected a matching child configurator at ' + slug);
    }
    active.add(slug);
  }
  const seen = new Set<string>();
  for (const slug of value.order) {
    if (typeof slug !== 'string' || !slugPattern.test(slug) || seen.has(slug) || !active.has(slug)) {
      throw new Error('Invalid, duplicate or unknown item in order: ' + String(slug));
    }
    seen.add(slug);
  }
  if (seen.size !== active.size) {
    throw new Error('Order must contain every active child slug exactly once');
  }
}

/** The original collection is never mutated. Only sparse patches are written. */
export function createOrderedConfiguratorCollection<
  Item extends OrderedChild,
  const Items extends Record<string, Item>,
>(value: { items: Items; order: string[] }, allowedTypes: readonly string[]) {
  validateOrderedConfiguratorCollection(value, allowedTypes);
  const content = { items: { ...value.items }, order: [...value.order] };
  const overrides: OrderedConfiguratorPatch<Item> = {};

  const effective = (patch: OrderedConfiguratorPatch<Item> = overrides) => ({
    items: { ...content.items, ...patch.items },
    order: patch.order ?? content.order,
  });
  const apply = (patch: OrderedConfiguratorPatch<Item>) => {
    validateOrderedConfiguratorCollection(effective(patch), allowedTypes, true);
    overrides.items = patch.items;
    overrides.order = patch.order;
  };

  return {
    content,
    overrides,
    override: {
      add: (slug: string, child: Item) => {
        const items = effective().items;
        if (!slugPattern.test(slug) || Object.hasOwn(items, slug)) {
          throw new Error('Invalid or duplicate child slug: ' + slug);
        }
        apply({
          items: { ...overrides.items, [slug]: child },
          order: [...effective().order, slug],
        });
      },
      disable: (slugs: (keyof Items & string)[]) => {
        const items = effective().items;
        const next = { ...overrides.items };
        const selected = new Set<string>(slugs);
        for (const slug of selected) {
          if (items[slug] === undefined || items[slug] === false) throw new Error('Unknown active child: ' + slug);
          next[slug] = false;
        }
        apply({ items: next, order: effective().order.filter(slug => !selected.has(slug)) });
      },
      order: (slugs: string[]) => apply({ items: { ...overrides.items }, order: [...slugs] }),
    },
  };
}
