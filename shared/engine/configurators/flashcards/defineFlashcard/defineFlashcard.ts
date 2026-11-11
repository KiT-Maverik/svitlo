import type { DeepPartial } from '#types';
import { camelCase_Schema } from '#schemas';

import {
  onlyLocales,
  validateOrderedKeys,
  validateSluggedConfiguratorMap,
} from '../../_shared__configurators';
import { contentBlockTypes, type ContentBlock_Configurator } from '../../contentBlocks';
import { flashcard_Config_Schema, type Flashcard_Config } from './defineFlashcard.schemas';

type Side = 'front' | 'back' | 'hint';
type Items = Record<string, ContentBlock_Configurator | false>;

const validate = (config: Flashcard_Config): void => {
  const { content, ...metadata } = config;
  flashcard_Config_Schema.parse(metadata);

  for (const side of ['front', 'back', 'hint'] as const) {
    const collection = content?.[side];
    if (!collection && side === 'hint') continue;

    const path = 'content.' + side;
    const issues: { message: string }[] = validateOrderedKeys(collection, { path, requireNonEmpty: side !== 'hint' });
    if (collection && typeof collection === 'object' && 'items' in collection) {
      issues.push(
        ...validateSluggedConfiguratorMap(collection.items, contentBlockTypes, {
          path: path + '.items',
          itemLabel: 'Flashcard ContentBlock',
        }),
      );
    }
    if (issues.length) throw new Error('Invalid Flashcard ' + path + ': ' + issues.map(issue => issue.message).join('; '));
  }

  for (const name of ['flags', 'relationships'] as const) {
    const collection = config.parameters[name];
    if (collection === undefined) continue;
    const issues = validateOrderedKeys(collection, { path: 'parameters.' + name });
    if (issues.length) throw new Error('Invalid Flashcard ' + name + ': ' + issues.map(issue => issue.message).join('; '));
  }

  const builtInFlags = new Set<string>();
  for (const flag of Object.values(config.parameters.flags.items)) {
    if (flag.type === 'custom') continue;
    if (builtInFlags.has(flag.type)) throw new Error('Duplicate built-in Flashcard flag: ' + flag.type);
    builtInFlags.add(flag.type);
  }
  const relationIds = new Set<string>();
  for (const relationship of Object.values(config.parameters.relationships?.items ?? {})) {
    if (relationIds.has(relationship.relationshipId)) {
      throw new Error('Duplicate Flashcard relationship ID: ' + relationship.relationshipId);
    }
    relationIds.add(relationship.relationshipId);
  }
};

/**
 * Define a Flashcard with independent identity, parameters and ordered ContentBlocks.
 *
 * @remarks
 * Use `content.front/back/hint.items` for slug-keyed define* ContentBlocks and
 * `order` for their authored sequence. `hint` may be omitted. Use
 * `configuratorArrayToSlugMap([...])` to create each side's items map.
 * `parameters.flags` and `parameters.relationships` also use named
 * `items` and `order` instead of arrays, so overrides never depend on indexes.
 *
 * Child configurators validate themselves. `config.validate` checks Flashcard
 * metadata and collection boundaries; call it again on assembled data.
 * `false` disables an item in overrides only, never in authored content.
 */
export function defineFlashcard<
  const Slug extends string,
  const Front extends Record<string, ContentBlock_Configurator>,
  const Back extends Record<string, ContentBlock_Configurator>,
  const Hint extends Record<string, ContentBlock_Configurator> = Record<string, ContentBlock_Configurator>,
>(
  config: Omit<Flashcard_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: {
      front: { items: Front; order: string[] };
      back: { items: Back; order: string[] };
      hint?: { items: Hint; order: string[] };
    };
  },
) {
  validate(config);
  const { id, slug, type, parameters } = config;

  const content: Flashcard_Config['content'] = {
    front: { items: { ...config.content.front.items }, order: [...config.content.front.order] },
    back: { items: { ...config.content.back.items }, order: [...config.content.back.order] },
    ...(config.content.hint
      ? { hint: { items: { ...config.content.hint.items }, order: [...config.content.hint.order] } }
      : {}),
  };

  // The named flags retain their invariant fields in base and their localized
  // values at the same stable item keys in locales. No index-based array patches.
  const base = {
    id,
    slug,
    type,
    parameters: {
      ...parameters,
      flags: {
        order: [...parameters.flags.order],
        items: Object.fromEntries(
          Object.entries(parameters.flags.items).map(([key, flag]) => {
            if ('value' in flag) {
              const { value: _localized, ...invariant } = flag;
              return [key, invariant];
            }
            return [key, flag];
          }),
        ),
      },
    },
  } satisfies DeepPartial<Flashcard_Config>;

  const overrides: DeepPartial<Flashcard_Config> = {};
  const current = (side: Side) => {
    const authored = content[side] ?? { items: {}, order: [] };
    const patch = overrides.content?.[side];
    return {
      items: { ...authored.items, ...patch?.items },
      order: (patch?.order ?? authored.order) as string[],
    };
  };
  const sidePatch = (side: Side) => {
    const patch = (overrides.content ??= {});
    return (patch[side] ??= {});
  };

  // Local to this entity: no shared configurator factory or lifecycle abstraction.
  const overrideSide = (side: Side) => ({
    add: (itemSlug: string, block: ContentBlock_Configurator) => {
      const existing = current(side);
      if (!camelCase_Schema.safeParse(itemSlug).success || Object.hasOwn(existing.items, itemSlug)) {
        throw new Error('Invalid or duplicate Flashcard ContentBlock slug: ' + itemSlug);
      }
      const issues = validateSluggedConfiguratorMap({ [itemSlug]: block }, contentBlockTypes);
      if (issues.length) throw new Error('Invalid Flashcard ContentBlock: ' + issues.map(issue => issue.message).join('; '));
      const patch = sidePatch(side);
      (patch.items ??= {})[itemSlug] = block;
      patch.order = [...existing.order, itemSlug];
    },
    disable: (slugs: string[]) => {
      const existing = current(side);
      const selected = new Set(slugs);
      for (const key of selected) {
        if (!Object.hasOwn(existing.items, key) || existing.items[key] === false) {
          throw new Error('Unknown active Flashcard ContentBlock slug: ' + key);
        }
      }
      if (!selected.size) return;
      const patch = sidePatch(side);
      for (const key of selected) (patch.items ??= {})[key] = false;
      patch.order = existing.order.filter(key => !selected.has(key));
    },
    order: (slugs: string[]) => {
      const existing = current(side);
      if (validateOrderedKeys({ items: existing.items, order: slugs }, { allowDisabled: true }).length) {
        throw new Error('Flashcard content order must contain each active slug exactly once');
      }
      sidePatch(side).order = [...slugs];
    },
  });

  const frontOverride = overrideSide('front');
  const backOverride = overrideSide('back');
  const hintOverride = overrideSide('hint');

  return {
    id,
    slug,
    type,
    config: {
      base,
      locales: (): DeepPartial<Flashcard_Config> => ({
        parameters: { flags: { items: onlyLocales(parameters.flags.items) } },
      }),
      overrides,
      validate,
    },
    content,
    override: {
      parameters: (newParameters: DeepPartial<Flashcard_Config['parameters']>) => {
        overrides.parameters = newParameters;
      },
      content: {
        front: { ...frontOverride, disable: (slugs: (keyof Front & string)[]) => frontOverride.disable(slugs) },
        back: { ...backOverride, disable: (slugs: (keyof Back & string)[]) => backOverride.disable(slugs) },
        hint: { ...hintOverride, disable: (slugs: (keyof Hint & string)[]) => hintOverride.disable(slugs) },
      },
    },
    disable: () => {
      overrides.parameters = { ...overrides.parameters, disabled: true };
    },
  } as const;
}

export type Flashcard_Configurator = ReturnType<typeof defineFlashcard>;
