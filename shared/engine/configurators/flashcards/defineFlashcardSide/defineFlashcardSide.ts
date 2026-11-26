import { z } from 'zod';

import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type { ChildrenSupporting, DeepPartial, LanguageScope, PublicationLanguageOptions } from '#types';

import {
  mergeForValidation,
  resolvePublicationLanguages,
  validateOrderedKeys,
  validateSluggedConfiguratorMap,
  scopeBuild,
} from '../../_shared__configurators';
import { contentBlockTypes, type ContentBlock_Configurator } from '../../contentBlocks';
import { contentBlockResolved_Schema } from '../../contentBlocks/contentBlock.schemas';
import {
  flashcardSide_Config_Schema,
  type FlashcardSide_Config,
  type FlashcardSide_Overrides,
} from './defineFlashcardSide.schemas';

type Block = ContentBlock_Configurator;
type BlockResource = {
  base: Record<string, unknown>;
  locale: Partial<Record<LanguageCode, Record<string, unknown>>> | undefined;
};
type BlockPatch = {
  base: DeepPartial<Record<string, unknown>>;
  locale: Partial<Record<LanguageCode, Record<string, unknown>>> | undefined;
};
type SideProps = ReturnType<Block['build']['props']>['base'][];
type SideFiles = Partial<Record<LanguageCode, SideProps>>;
type SidePublication = { base: SideProps; locale: SideFiles | undefined };
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const validateSide = (config: FlashcardSide_Config, requireNonEmpty = false): void => {
  flashcardSide_Config_Schema.parse(config);
  const issues = [
    ...validateOrderedKeys(config, { path: 'Flashcard side', requireNonEmpty }),
    ...validateSluggedConfiguratorMap(config.items, contentBlockTypes, {
      path: 'Flashcard side.items',
      itemLabel: 'Flashcard ContentBlock',
    }),
  ];
  if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
  for (const [key, child] of Object.entries(config.items)) {
    if (
      !isRecord(child) ||
      !isRecord(child.build) ||
      typeof child.build.props !== 'function' ||
      typeof child.build.overrides !== 'function' ||
      !isRecord(child.config) ||
      !isRecord(child.config.base) ||
      child.config.base.id !== child.id ||
      child.config.base.slug !== key ||
      child.config.base.type !== child.type
    ) {
      throw new Error('Invalid Flashcard ContentBlock Build API or identity: ' + key);
    }
  }
};

const validatePublication = (
  resource: SidePublication,
  languages: readonly LanguageCode[],
  patch?: SidePublication,
) => {
  for (const language of languages) {
    const effective = patch ? (patch.locale?.[language] ?? patch.base) : (resource.locale?.[language] ?? resource.base);
    try {
      z.array(contentBlockResolved_Schema).parse(effective);
    } catch (error) {
      throw new Error(
        'Invalid Flashcard side Props for language ' +
          language +
          ': ' +
          (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  }
};

/**
 * Own an ordered collection of ContentBlocks for one Flashcard role.
 * The containing Flashcard supplies the role (front/back/hint); a side has
 * no independent UUID, slug or published identity.
 */
export function defineFlashcardSide<
  const Items extends Record<string, Block>,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(config: { items: Items & ChildrenSupporting<Languages, Items>; order: string[] }) {
  const initialItems: Items = { ...config.items };
  const initialOrder = [...config.order];
  const items = { ...initialItems };
  const order = [...initialOrder];

  const buildContent = (
    active: Record<string, Block>,
    sorted: readonly string[],
    languages: readonly LanguageCode[],
    changes: Record<string, unknown> = {},
  ): SidePublication => {
    const entries = sorted.map(key => {
      const child = active[key];
      const resource = child.build.props({ languages }) as unknown as BlockResource;
      const patch = Object.hasOwn(changes, key)
        ? (child.build.overrides as (value: never, options: PublicationLanguageOptions) => BlockPatch)(
            changes[key] as never,
            { languages },
          )
        : undefined;
      return { resource, patch };
    });
    const base = entries.map(({ resource, patch }) =>
      patch ? mergeForValidation(resource.base, patch.base) : resource.base,
    ) as SideProps;
    const locale: SideFiles = {};
    for (const code of languages) {
      if (
        !entries.some(
          ({ resource, patch }) => resource.locale?.[code] !== undefined || patch?.locale?.[code] !== undefined,
        )
      )
        continue;
      locale[code] = entries.map(({ resource, patch }) => {
        const original = mergeForValidation(
          resource.base,
          (resource.locale?.[code] ?? {}) as DeepPartial<typeof resource.base>,
        );
        const updated = patch ? mergeForValidation(original, patch.base) : original;
        return patch?.locale?.[code] ? mergeForValidation(updated, patch.locale[code]) : updated;
      }) as SideProps;
    }
    return { base, locale: Object.keys(locale).length ? locale : undefined };
  };

  const props = (options: PublicationLanguageOptions<Languages>): SidePublication => {
    const languages = resolvePublicationLanguages(options);
    validateSide({ items: initialItems, order: initialOrder });
    const result = structuredClone(buildContent(initialItems, initialOrder, languages));
    validatePublication(result, languages);
    return result;
  };

  const overrides = <const Added extends Record<string, Block> = {}>(
    patch: FlashcardSide_Overrides<Items, Added> & {
      additionalItems?: Added & ChildrenSupporting<Languages, Added>;
    },
    options: PublicationLanguageOptions<Languages>,
  ): SidePublication => {
    const languages = resolvePublicationLanguages(options);
    validateSide({ items: initialItems, order: initialOrder });
    if (!isRecord(patch)) throw new Error('Expected a Flashcard side override object');
    for (const key of Object.keys(patch)) {
      if (!['items', 'additionalItems', 'order'].includes(key))
        throw new Error('Unknown Flashcard side override field: ' + key);
    }
    const changes = patch.items ?? {};
    const additions = patch.additionalItems ?? {};
    if (!isRecord(changes) || !isRecord(additions)) throw new Error('Flashcard side requires slug-keyed patch maps');
    const enabled: Record<string, Block | false> = { ...initialItems };
    const childPatches: Record<string, unknown> = {};
    let structural = Object.keys(additions).length > 0;
    for (const [key, child] of Object.entries(additions)) {
      if (Object.hasOwn(initialItems, key)) throw new Error('Duplicate Flashcard ContentBlock slug: ' + key);
      enabled[key] = child as Block;
    }
    for (const [key, change] of Object.entries(changes)) {
      if (!Object.hasOwn(initialItems, key)) throw new Error('Unknown existing Flashcard ContentBlock: ' + key);
      if (change === false) {
        enabled[key] = false;
        structural = true;
      } else {
        if (!isRecord(change)) throw new Error('Flashcard child patch must be an object or false: ' + key);
        childPatches[key] = change;
      }
    }
    if (structural && patch.order === undefined) {
      throw new Error('Flashcard side.order is required when adding or disabling items');
    }
    const nextOrder = patch.order ?? initialOrder;
    const active = Object.fromEntries(
      Object.entries(enabled).filter((entry): entry is [string, Block] => entry[1] !== false),
    );
    validateSide({ items: active, order: [...nextOrder] });
    const result = structuredClone(buildContent(active, nextOrder, languages, childPatches));
    validatePublication(props(options), languages, result);
    return result;
  };

  const result = {
    kind: 'flashcardSide' as const,
    items,
    order,
    validate: (required = false) => validateSide({ items: initialItems, order: initialOrder }, required),
    build: scopeBuild({ props, overrides }),
  } as const;
  return result as typeof result & LanguageScope<Languages>;
}

export type FlashcardSide_Configurator<
  Items extends Record<string, Block> = Record<string, Block>,
  Languages extends readonly LanguageCode[] = AllLanguageCodes,
> = ReturnType<typeof defineFlashcardSide<Items, Languages>>;
