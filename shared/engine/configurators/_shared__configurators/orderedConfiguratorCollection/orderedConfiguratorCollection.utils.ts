import { camelCase_Schema } from '#schemas';
import { validateOrderedKeys } from '../validateOrderedKeys/validateOrderedKeys.utils';
import { validateSluggedConfiguratorMap } from '../validateSluggedConfiguratorMap/validateSluggedConfiguratorMap.utils';

/** Nested authoring children are configurators, never serialized raw configs. */
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

/** Check collection relationships, never recursively revalidate children. */
export function validateOrderedConfiguratorCollection(
  value: unknown,
  allowedTypes: readonly string[],
  allowDisabled = false,
): void {
  const orderIssues = validateOrderedKeys(value, { allowDisabled });
  if (orderIssues.some(issue => issue.check === 'collection')) {
    throw new Error(orderIssues.map(issue => issue.message).join('; '));
  }
  const items = (value as { items: unknown }).items;
  const childIssues = validateSluggedConfiguratorMap(items, allowedTypes, { allowDisabled });
  const issues = [...childIssues, ...orderIssues];
  if (issues.length) {
    throw new Error(issues.map(issue => issue.message).join('; '));
  }
}

/** The authored collection is never mutated; overrides store sparse patches. */
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
        if (!camelCase_Schema.safeParse(slug).success || Object.hasOwn(items, slug)) {
          throw new Error('Invalid or duplicate child slug: ' + slug);
        }
        apply({
          items: { ...overrides.items, [slug]: child },
          order: [...effective().order, slug],
        });
      },
      disable: (slugs: (keyof Items & string)[]) => {
        const items: Record<string, Item | false> = effective().items;
        const next = { ...overrides.items };
        const selected = new Set<string>(slugs);
        for (const slug of selected) {
          if (items[slug] === undefined || items[slug] === false) {
            throw new Error('Unknown active child: ' + slug);
          }
          next[slug] = false;
        }
        apply({ items: next, order: effective().order.filter(slug => !selected.has(slug)) });
      },
      order: (slugs: string[]) => apply({ items: { ...overrides.items }, order: [...slugs] }),
    },
  };
}
