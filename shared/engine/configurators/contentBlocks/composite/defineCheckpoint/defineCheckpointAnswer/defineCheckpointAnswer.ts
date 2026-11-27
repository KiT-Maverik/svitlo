import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type { ChildrenSupporting, DeepPartial, LanguageScope, PublicationLanguageOptions } from '#types';

import {
  buildChildData,
  buildChildOverrides,
  mergeForValidation,
  requireBuildContext,
  resolvePublicationLanguages,
  scopeBuild,
  slugAddressedReservedKeys,
  validateOrderedKeys,
  validateRequestedPublication,
  validateSlugAddressedPublication,
  validateSluggedConfiguratorMap,
  type SafePlacementMap,
} from '../../../../_shared__configurators';
import { primitiveContentBlockTypes } from '../../../contentBlock.constants';
import {
  checkpointAnswer_Config_Schema,
  checkpointAnswer_Data_Schema,
  type Checkpoint_Allowed_Configurator,
  type CheckpointAnswer_Overrides,
  type ContentBlock_CheckpointAnswer_Config,
} from './defineCheckpointAnswer.schemas';

export type CheckpointAnswerValidationIssue = { check: string; path: string; message: string };
export type CheckpointAnswerValidationResult = {
  success: boolean;
  subject: { id?: string; slug?: string; type?: string };
  errors: CheckpointAnswerValidationIssue[];
};
export class CheckpointAnswerValidationError extends Error {
  constructor(readonly result: CheckpointAnswerValidationResult) {
    super('Checkpoint answer validation failed: ' + JSON.stringify(result));
    this.name = 'CheckpointAnswerValidationError';
  }
}

type Block = Checkpoint_Allowed_Configurator;
type BlockResource = {
  base: Record<string, unknown>;
  locale: Partial<Record<LanguageCode, Record<string, unknown>>> | undefined;
};
type BlockPatch = {
  base: DeepPartial<Record<string, unknown>>;
  locale: Partial<Record<LanguageCode, Record<string, unknown>>> | undefined;
};
type AnswerLocaleFiles = Partial<Record<LanguageCode, Record<string, unknown>>>;
type AnswerPublication<Base> = { base: Base; locale: AnswerLocaleFiles | undefined };
type AnswerBase = Pick<ContentBlock_CheckpointAnswer_Config, 'id' | 'slug' | 'type'> & {
  children: string[];
  [placementSlug: string]: unknown;
};
type AnswerOverrideBase = { children?: string[]; [placementSlug: string]: unknown };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const ownFields = new Set(['id', 'slug', 'type', 'children']);
const directBlocks = (config: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(config).filter(([key]) => !ownFields.has(key)));
/** Disabled authored children remain in Config, but never enter canonical Data. */
const enabledAuthoredOrder = (items: Record<string, Block>, order: readonly string[]) =>
  order.filter(key => {
    const params = items[key]?.config.base.params;
    return !isRecord(params) || params.disabled !== true;
  });

/** Parent owns the Primitive-only collection boundary; each child validates itself. */
const validate = (config: ContentBlock_CheckpointAnswer_Config): void => {
  const result: CheckpointAnswerValidationResult = {
    success: true,
    subject: { id: config?.id, slug: config?.slug, type: config?.type },
    errors: [],
  };
  const fail = (check: string, path: string, message: string) => {
    result.errors.push({ check, path, message });
  };
  const parsed = checkpointAnswer_Config_Schema.safeParse(config);
  if (!parsed.success)
    for (const issue of parsed.error.issues) fail('metadata', issue.path.join('.'), issue.message);
  const blocks = isRecord(config) ? directBlocks(config) : {};
  for (const issue of validateOrderedKeys(
    { items: blocks, order: config?.children }, { path: 'children', requireNonEmpty: true },
  ))
    fail(issue.check, issue.path, issue.message);
  for (const issue of validateSluggedConfiguratorMap(blocks, primitiveContentBlockTypes, {
    path: 'children', itemLabel: 'Checkpoint Answer Primitive', reservedKeys: slugAddressedReservedKeys,
  }))
    fail(issue.check, issue.path, issue.message);
  if (!Array.isArray(config?.children) || !config.children.length)
    fail('children', 'children', 'At least one active answer is required');
  const ids = new Set<string>();
  for (const [key, child] of Object.entries(blocks)) {
    if (!isRecord(child) || !isRecord(child.build) ||
        typeof child.build.data !== 'function' || typeof child.build.overrides !== 'function' ||
        !isRecord(child.config) || !isRecord(child.config.base) ||
        child.config.base.id !== child.id || child.config.base.slug !== key ||
        child.config.base.type !== child.type)
      fail('child', key, 'Invalid Answer Primitive Build API or identity: ' + key);
    if (isRecord(child) && typeof child.id === 'string') {
      if (ids.has(child.id)) fail('id', key, 'Duplicate answer child ID: ' + child.id);
      ids.add(child.id);
    }
  }
  result.success = result.errors.length === 0;
  if (!result.success) throw new CheckpointAnswerValidationError(result);
};

type AuthoredInput<
  Slug extends string,
  Items extends Record<string, Block>,
  Languages extends readonly LanguageCode[],
> = Pick<ContentBlock_CheckpointAnswer_Config, 'id' | 'type'> & {
  slug: Slug;
  children: Extract<keyof Items, string>[];
} & Items & ChildrenSupporting<Languages, Items> & SafePlacementMap<Items>;

/**
 * Independently identified and ordered Checkpoint Answer. It owns only
 * Primitive placements. The Item retains this identified role in domain Data;
 * the presentation adapter may project the ordered blocks for the learner.
 */
export const defineCheckpointAnswer = <
  const Slug extends string,
  const Items extends Record<string, Block>,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(config: AuthoredInput<Slug, Items, Languages>) => {
  const { id, type, slug } = config;
  const initialItems = directBlocks(config) as unknown as Items;
  const initialOrder = [...config.children];
  const base = { id, slug, type } as const;
  const originalConfig = () => ({ ...base, children: [...initialOrder], ...initialItems });

  const buildContent = (
    items: Record<string, Block>,
    order: readonly string[],
    patches: Record<string, unknown> = {},
  ) => {
    const { languages } = requireBuildContext();
    const entries = order.map(key => {
      const child = items[key];
      if (!child) throw new Error('Missing Answer Primitive: ' + key);
      const original = buildChildData(child) as unknown as BlockResource;
      const patch = Object.hasOwn(patches, key)
        ? (buildChildOverrides(child, patches[key] as never) as unknown as BlockPatch)
        : undefined;
      return { key, original, patch };
    });
    const base: Record<string, unknown> = {};
    const childPatches: Record<string, BlockPatch> = {};
    for (const { key, original, patch } of entries) {
      base[key] = patch ? mergeForValidation(original.base, patch.base) : original.base;
      if (patch) childPatches[key] = patch;
    }
    const locale: AnswerLocaleFiles = {};
    for (const language of languages) {
      const fragments: Record<string, unknown> = {};
      for (const { key, original, patch } of entries) {
        // Locale files are sparse fragments, not fully resolved child Data.
        // Invariant identity/params stay in base and are merged for validation.
        const translated = mergeForValidation(
          original.locale?.[language] ?? {}, patch?.locale?.[language] ?? {},
        );
        if (Object.keys(translated).length) fragments[key] = translated;
      }
      if (Object.keys(fragments).length) locale[language] = fragments;
    }
    return { base, locale, childPatches };
  };

  const data = (options: PublicationLanguageOptions<Languages>): AnswerPublication<AnswerBase> => {
    const languages = resolvePublicationLanguages(options);
    validate(originalConfig());
    const enabledOrder = enabledAuthoredOrder(initialItems, initialOrder);
    const built = buildContent(initialItems, enabledOrder);
    const output: AnswerPublication<AnswerBase> = structuredClone({
      base: { id, slug, type, children: enabledOrder, ...built.base },
      locale: Object.keys(built.locale).length ? built.locale : undefined,
    });
    validateRequestedPublication(checkpointAnswer_Data_Schema, output, languages);
    return output;
  };

  const overrides = <const Added extends Record<string, Block> = {}>(
    patch: CheckpointAnswer_Overrides<Items, Added> & ChildrenSupporting<Languages, Added>,
    options: PublicationLanguageOptions<Languages>,
  ): AnswerPublication<AnswerOverrideBase> => {
    try {
      const languages = resolvePublicationLanguages(options);
      validate(originalConfig());
      if (!isRecord(patch)) throw new Error('Expected an Answer overrides object');
      if (patch.children !== undefined && !Array.isArray(patch.children))
        throw new Error('children must be a replacement order array');
      const changes: Record<string, unknown> = {};
      const additions: Record<string, Block> = {};
      for (const [key, value] of Object.entries(patch)) {
        if (ownFields.has(key)) {
          if (key !== 'children') throw new Error('Immutable Answer override field: ' + key);
          continue;
        }
        if (Object.hasOwn(initialItems, key)) changes[key] = value;
        else additions[key] = value as unknown as Block;
      }
      const issues = validateSluggedConfiguratorMap(additions, primitiveContentBlockTypes, {
        path: 'children', itemLabel: 'Answer Primitive', reservedKeys: slugAddressedReservedKeys,
      });
      if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
      const source = data(options);
      const initiallyEnabled = new Set(source.base.children);
      const active: Record<string, Block | false> = { ...initialItems };
      const childPatches: Record<string, unknown> = {};
      let structureChanged = Object.keys(additions).length > 0;
      for (const [key, child] of Object.entries(additions)) {
        if (Object.hasOwn(initialItems, key)) throw new Error('Duplicate answer slug: ' + key);
        active[key] = child;
      }
      for (const [key, value] of Object.entries(changes)) {
        if (value === false) {
          active[key] = false;
          structureChanged = true;
        } else if (isRecord(value)) {
          childPatches[key] = value;
        } else {
          throw new Error('Answer child override must be an object or false: ' + key);
        }
      }
      const enabled: Record<string, Block> = {};
      for (const [key, child] of Object.entries(active)) {
        if (child === false) continue;
        let disabled = isRecord(child.config.base.params) && child.config.base.params.disabled === true;
        if (Object.hasOwn(childPatches, key)) {
          const original = buildChildData(child) as unknown as BlockResource;
          const childPatch = buildChildOverrides(child, childPatches[key] as never) as unknown as BlockPatch;
          const effective = mergeForValidation(original.base, childPatch.base);
          disabled = isRecord(effective.params) && effective.params.disabled === true;
        }
        if (disabled) {
          if (initiallyEnabled.has(key)) structureChanged = true;
          if (Object.hasOwn(childPatches, key) && !initiallyEnabled.has(key))
            throw new Error('Cannot patch an already disabled Answer Primitive: ' + key);
          continue;
        }
        if (!initiallyEnabled.has(key)) structureChanged = true;
        enabled[key] = child;
      }
      if (structureChanged && patch.children === undefined)
        throw new Error('children is required when adding or disabling answers');
      // Default to the published active order, never the authored order
      // containing disabled Config children.
      const order = patch.children ?? source.base.children;
      const ordered = validateOrderedKeys(
        { items: enabled, order }, { path: 'children', requireNonEmpty: true },
      );
      if (ordered.length) throw new Error(ordered.map(issue => issue.message).join('; '));
      validate({ ...base, children: [...order], ...enabled });
      const built = buildContent(enabled, order, childPatches);
      const output: AnswerPublication<AnswerOverrideBase> = { base: {}, locale: undefined };
      const files: AnswerLocaleFiles = {};
      if (Object.keys(changes).length || Object.keys(additions).length || patch.children !== undefined) {
        if (structureChanged || patch.children !== undefined) output.base.children = [...order];
        for (const [key] of Object.entries(changes)) {
          // A params.disabled override is a structural removal, not a live
          // child with a disabled param and a stale position in children.
          output.base[key] = !Object.hasOwn(enabled, key)
            ? false
            : !initiallyEnabled.has(key)
              ? built.base[key]
              : (built.childPatches[key]?.base ?? {});
        }
        for (const key of Object.keys(additions))
          if (Object.hasOwn(enabled, key)) output.base[key] = built.base[key];
        for (const language of languages) {
          const fragment: Record<string, unknown> = {};
          for (const key of Object.keys(additions)) {
            if (Object.hasOwn(enabled, key) && built.locale[language]?.[key] !== undefined)
              fragment[key] = built.locale[language][key];
          }
          for (const key of Object.keys(childPatches)) {
            if (!Object.hasOwn(enabled, key)) continue;
            const localized = !initiallyEnabled.has(key)
              ? built.locale[language]?.[key]
              : built.childPatches[key]?.locale?.[language];
            if (localized !== undefined) fragment[key] = localized;
          }
          if (Object.keys(fragment).length) files[language] = fragment;
        }
      }
      output.locale = Object.keys(files).length ? files : undefined;
      validateSlugAddressedPublication(checkpointAnswer_Data_Schema, source, languages, output);
      return output;
    } catch (error) {
      throw new Error(
        'Invalid Checkpoint Answer overrides for ' + id + ': ' +
          (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  // Authored placement keys cannot override the Answer's fixed identity.
  // Keeping identity after the generic spread also preserves the literal
  // checkpointAnswer discriminator in ReturnType<typeof defineCheckpointAnswer>.
  const configApi = { base, locales: () => ({ locale: {} }), validate } as const;
  const buildApi = scopeBuild({ data, overrides });
  const result = {
    ...initialItems,
    id, slug, type,
    children: [...initialOrder],
    validate,
    build: buildApi,
    config: configApi,
  } as const;
  // Generic direct placements can have arbitrary keys at the type level,
  // despite SafePlacementMap rejecting reserved keys at authoring. Restore
  // ALL fixed lifecycle keys explicitly, avoiding accidental Primitive
  // shadowing of build, config, validation, or the Answer discriminator.
  return result as unknown as Omit<
    typeof result, 'id' | 'slug' | 'type' | 'children' | 'validate' | 'build' | 'config'
  > & {
    readonly id: typeof id;
    readonly slug: typeof slug;
    readonly type: typeof type;
    readonly children: string[];
    readonly validate: typeof validate;
    readonly build: typeof buildApi;
    readonly config: typeof configApi;
  } & LanguageScope<Languages>;
};
/**
 * The higher-order generic Build overrides method cannot be extracted by the
 * common conditional ConfiguratorChild helper. Erase only its patch parameter
 * at the parent collection boundary, retaining the concrete direct children.
 */
type DefinedAnswer = ReturnType<typeof defineCheckpointAnswer>;
export type ContentBlock_CheckpointAnswer_Configurator =
  Omit<DefinedAnswer, 'id' | 'slug' | 'type' | 'build'> & {
  readonly id: string;
  readonly slug: string;
  readonly type: 'checkpointAnswer';
  readonly build: Omit<DefinedAnswer['build'], 'overrides'> & {
    overrides(
      patch: never,
      options: PublicationLanguageOptions,
    ): ReturnType<DefinedAnswer['build']['overrides']>;
  };
};
