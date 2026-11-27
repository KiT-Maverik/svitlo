import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type { ChildrenSupporting, DeepPartial, LanguageScope, PublicationLanguageOptions } from '#types';
import type { AddedPlacementsFromPatch, SafePlacementMap } from '../../_shared__configurators';

import {
  buildChildData,
  buildChildOverrides,
  mergeForValidation,
  requireBuildContext,
  resolvePublicationLanguages,
  scopeBuild,
  slugAddressedReservedKeys,
  validateSlugAddressedContainer,
  validateSluggedConfiguratorMap,
} from '../../_shared__configurators';
import { primitiveContentBlockTypes, type ContentBlock_Primitive_Configurator } from '../../contentBlocks';
import { primitiveContentBlockResolved_Schema } from '../../contentBlocks/contentBlock.schemas';
import {
  flashcardSide_Config_Schema,
  type FlashcardSide_Overrides,
} from './defineFlashcardSide.schemas';

type Block = ContentBlock_Primitive_Configurator;
type BlockResource = {
  base: Record<string, unknown>;
  locale: Partial<Record<LanguageCode, Record<string, unknown>>> | undefined;
};
type SideData = { children: string[] } & Record<string, unknown>;
type SideFiles = Partial<Record<LanguageCode, SideData>>;
type SidePublication = { base: SideData; locale: SideFiles | undefined };
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const directChildren = (source: Record<string, unknown>): Record<string, Block> =>
  Object.fromEntries(Object.entries(source).filter(([key]) => key !== 'children')) as Record<string, Block>;

const validateSide = (phase: { children: string[] } & Record<string, unknown>, requireNonEmpty = false): void => {
  flashcardSide_Config_Schema.parse(phase);
  const members = directChildren(phase);
  const issues = validateSlugAddressedContainer(phase, primitiveContentBlockTypes);
  const errors = validateSluggedConfiguratorMap(members, primitiveContentBlockTypes, {
    path: 'Flashcard side',
    itemLabel: 'Flashcard ContentBlock',
    reservedKeys: slugAddressedReservedKeys,
  });
  if (issues.length || errors.length) {
    throw new Error(
      [...issues.map(issue => issue.path.join('.') + ': ' + issue.message),
       ...errors.map(issue => issue.message)].join('; '),
    );
  }
  if (requireNonEmpty && !phase.children.some(key => {
    const child = members[key];
    return isRecord(child) && isRecord(child.config) && isRecord(child.config.base) &&
      isRecord(child.config.base.params) && child.config.base.params.disabled !== true;
  })) throw new Error('At least one enabled item is required in Flashcard side');
  for (const [key, child] of Object.entries(members)) {
    if (!isRecord(child) || !isRecord(child.build) ||
        typeof child.build.data !== 'function' || typeof child.build.overrides !== 'function' ||
        !isRecord(child.config) || !isRecord(child.config.base) ||
        child.config.base.id !== child.id || child.config.base.slug !== key ||
        child.config.base.type !== child.type) {
      throw new Error('Invalid Flashcard ContentBlock Build API or identity: ' + key);
    }
  }
};

const validatePublication = (resource: SidePublication, languages: readonly LanguageCode[], patch?: SidePublication) => {
  for (const language of languages) {
    // A new children array replaces the whole group; scalar/child patches stay sparse.
    const layer = (original: SideData, changes: SideData | undefined): SideData =>
      changes && Array.isArray(changes.children)
        ? structuredClone(changes)
        : mergeForValidation(original, changes ?? {}) as SideData;
    const original = layer(resource.base, resource.locale?.[language]);
    const changed = patch ? layer(original, patch.base) : original;
    const effective = patch ? layer(changed, patch.locale?.[language]) : changed;
    const issues = validateSlugAddressedContainer(effective, primitiveContentBlockTypes);
    if (issues.length) throw new Error('Invalid Flashcard side Data: ' + issues.map(issue => issue.message).join('; '));
    for (const key of effective.children) {
      primitiveContentBlockResolved_Schema.parse(effective[key]);
    }
  }
};

/**
 * One ordered primitive-ContentBlock collection. The parent Flashcard owns
 * the semantic front/back/hint role; the Side owns only children and their slugs.
 */
type InferredSideBlocks<Input> = {
  [Key in Exclude<keyof Input, 'children'>]: Input[Key] extends Block ? Input[Key] : Block;
};

const defineFlashcardSideImpl = <
  const Items extends Record<string, Block>,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: { children: Extract<keyof Items, string>[] } & Items &
    ChildrenSupporting<Languages, Items> & SafePlacementMap<Items>,
) {
  const initialOrder = [...config.children];
  const initialItems = directChildren(config) as Items;
  const children = [...initialOrder];

  const buildContent = (
    active: Record<string, Block>,
    sorted: readonly string[],
    changes: Record<string, unknown> = {},
    sparse = false,
  ): SidePublication => {
    const { languages } = requireBuildContext();
    const entries = sorted.map(key => {
      const child = active[key];
      const resource = buildChildData(child) as BlockResource;
      const patch = Object.hasOwn(changes, key)
        ? (buildChildOverrides(child, changes[key] as never) as BlockResource)
        : undefined;
      return { key, resource, patch };
    });
    if (sparse) {
      const base = Object.fromEntries(
        entries.filter(entry => entry.patch && Object.keys(entry.patch.base).length).map(
          entry => [entry.key, entry.patch!.base],
        ),
      ) as SideData;
      const locale: SideFiles = {};
      for (const code of languages) {
        const translated = Object.fromEntries(
          entries.filter(entry => entry.patch?.locale?.[code] !== undefined)
            .map(entry => [entry.key, entry.patch!.locale![code]]),
        ) as SideData;
        if (Object.keys(translated).length) locale[code] = translated;
      }
      return { base, locale: Object.keys(locale).length ? locale : undefined };
    }
    const base: SideData = {
      children: [...sorted],
      ...Object.fromEntries(entries.map(({ key, resource, patch }) => [
        key, patch ? mergeForValidation(resource.base, patch.base) : resource.base,
      ])),
    };
    const locale: SideFiles = {};
    for (const code of languages) {
      if (!entries.some(({ resource, patch }) =>
        resource.locale?.[code] !== undefined || patch?.locale?.[code] !== undefined)) continue;
      locale[code] = {
        children: [...sorted],
        ...Object.fromEntries(entries.map(({ key, resource, patch }) => {
          const translated = mergeForValidation(resource.base, resource.locale?.[code] ?? {});
          const basePatch = patch ? mergeForValidation(translated, patch.base) : translated;
          return [key, patch?.locale?.[code] ? mergeForValidation(basePatch, patch.locale[code]) : basePatch];
        })),
      };
    }
    return { base, locale: Object.keys(locale).length ? locale : undefined };
  };

  const data = (options: PublicationLanguageOptions<Languages>): SidePublication => {
    const languages = resolvePublicationLanguages(options);
    validateSide({ children: initialOrder, ...initialItems });
    const result = structuredClone(buildContent(initialItems, initialOrder));
    validatePublication(result, languages);
    return result;
  };

  const overridesImplementation = <const Added extends Record<string, Block> = {}>(
    patch: FlashcardSide_Overrides<Items, Added> &
      Added & ChildrenSupporting<Languages, Added> & SafePlacementMap<Added>,
    options: PublicationLanguageOptions<Languages>,
  ): SidePublication => {
    const languages = resolvePublicationLanguages(options);
    validateSide({ children: initialOrder, ...initialItems });
    if (!isRecord(patch)) throw new Error('Expected a Flashcard side override object');
    const active: Record<string, Block | false> = { ...initialItems };
    const childPatches: Record<string, unknown> = {};
    let structural = false;
    for (const [key, change] of Object.entries(patch)) {
      if (key === 'children') continue;
      if (slugAddressedReservedKeys.some(reserved => reserved === key)) {
        throw new Error('Reserved Flashcard side slug: ' + key);
      }
      if (Object.hasOwn(initialItems, key)) {
        if (change === false) { active[key] = false; structural = true; }
        else if (isRecord(change) && !isRecord(change.build)) childPatches[key] = change;
        else throw new Error('Flashcard child patch must be sparse object or false: ' + key);
      } else {
        const candidate: unknown = change;
        if (!isRecord(candidate)) throw new Error('Invalid Flashcard side child: ' + key);
        const kind: unknown = candidate.type;
        if (typeof kind !== 'string' || !primitiveContentBlockTypes.some(type => type === kind)) {
          throw new Error('New Flashcard side child must be a primitive ContentBlock Configurator: ' + key);
        }
        active[key] = candidate as Block;
        structural = true;
      }
    }
    if (structural && patch.children === undefined) {
      throw new Error('Flashcard side.children is required when adding or disabling items');
    }
    const sorted = patch.children ?? initialOrder;
    if (!Array.isArray(sorted)) throw new Error('Flashcard side.children must be an array');
    const enabled = Object.fromEntries(Object.entries(active).filter(([, child]) => child !== false)) as Record<string, Block>;
    validateSide({ children: [...sorted], ...enabled });
    const result = structuredClone(buildContent(enabled, sorted, childPatches, patch.children === undefined));
    validatePublication(data(options), languages, result);
    return result;
  };

  const overrides: {
    <const Patch extends Record<string, unknown>>(
      patch: Patch & FlashcardSide_Overrides<Items, AddedPlacementsFromPatch<Patch, Items, Block, 'children'>> &
        ChildrenSupporting<Languages, AddedPlacementsFromPatch<Patch, Items, Block, 'children'>>,
      options: PublicationLanguageOptions<Languages>,
    ): SidePublication;
    (
      patch: FlashcardSide_Overrides<Items, {}>,
      options: PublicationLanguageOptions<Languages>,
    ): SidePublication;
  } = overridesImplementation;

  const result = {
    ...initialItems,
    kind: 'flashcardSide' as const,
    children,
    validate: (required = false) => validateSide({ children: initialOrder, ...initialItems }, required),
    build: scopeBuild({ data, overrides }),
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export const defineFlashcardSide: {
  <const Input extends { children: string[] }>(
    config: Input & { children: Extract<keyof InferredSideBlocks<Input>, string>[] } &
      InferredSideBlocks<Input> & ChildrenSupporting<AllLanguageCodes, InferredSideBlocks<Input>> &
      SafePlacementMap<InferredSideBlocks<Input>>,
  ): ReturnType<typeof defineFlashcardSideImpl<InferredSideBlocks<Input>, AllLanguageCodes>>;
  <
    const Items extends Record<string, Block>,
    const Languages extends readonly LanguageCode[] = AllLanguageCodes,
  >(
    config: { children: Extract<keyof Items, string>[] } & Items &
      ChildrenSupporting<Languages, Items> & SafePlacementMap<Items>,
  ): ReturnType<typeof defineFlashcardSideImpl<Items, Languages>>;
} = defineFlashcardSideImpl;

export type FlashcardSide_Configurator<
  Items extends Record<string, Block> = Record<string, Block>,
  Languages extends readonly LanguageCode[] = AllLanguageCodes,
> = ReturnType<typeof defineFlashcardSideImpl<Items, Languages>>;
