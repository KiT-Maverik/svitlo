import { buildChildProps, buildChildOverrides, requireBuildContext } from '../../../_shared__configurators';
import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type { ChildrenSupporting, DeepPartial, LanguageScope, PublicationLanguageOptions } from '#types';

import {
  mergeForValidation,
  resolvePublicationLanguages,
  validateOrderedKeys,
  validateRequestedPublication,
  validateSluggedConfiguratorMap,
  scopeBuild,
} from '../../../_shared__configurators';
import type { ConfiguratorChild } from '../../../../types/configuratorChild';
import { contentBlockTypes } from '../../contentBlock.constants';
import {
  checkpointAnswer_Config_Schema,
  checkpointAnswer_Props_Schema,
  type Checkpoint_Allowed_Configurator,
  type Checkpoint_Allowed_PropsBase,
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

const allowedTypes = contentBlockTypes.filter(type => type !== 'checkpoint');
const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/** Validate Answer identity and collection boundaries; children own their validation. */
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
  if (!parsed.success) for (const issue of parsed.error.issues) fail('metadata', issue.path.join('.'), issue.message);

  const content = config?.content;
  for (const issue of validateOrderedKeys(content, { path: 'content', requireNonEmpty: true }))
    fail(issue.check, issue.path, issue.message);
  if (isObject(content) && isObject(content.items) && Array.isArray(content.order)) {
    for (const issue of validateSluggedConfiguratorMap(content.items, allowedTypes, {
      path: 'content.items',
      itemLabel: 'answer',
    }))
      fail(issue.check, issue.path, issue.message);
    for (const [key, child] of Object.entries(content.items)) {
      if (
        !isObject(child) ||
        !isObject(child.build) ||
        typeof child.build.props !== 'function' ||
        typeof child.build.overrides !== 'function'
      )
        fail('content', 'content.items.' + key, 'Answer must expose the ContentBlock Build API');
    }
  }
  result.success = result.errors.length === 0;
  if (!result.success) throw new CheckpointAnswerValidationError(result);
};

type ChildPublication = {
  base: Checkpoint_Allowed_PropsBase;
  locale: Partial<Record<LanguageCode, Record<string, unknown>>> | undefined;
};
type ChildPatchPublication = Omit<ChildPublication, 'base'> & {
  base: DeepPartial<Checkpoint_Allowed_PropsBase>;
};
type AnswerLocaleFiles = Partial<Record<LanguageCode, { content: Record<string, unknown>[] }>>;
type AnswerPublication<Base> = { base: Base; locale: AnswerLocaleFiles | undefined };
type AnswerBase = Pick<ContentBlock_CheckpointAnswer_Config, 'id' | 'slug' | 'type'> & {
  content: Checkpoint_Allowed_PropsBase[];
};
type AnswerOverrideBase = { content?: Checkpoint_Allowed_PropsBase[] };

/**
 * Independently identified and ordered Checkpoint Answer. The Answer id comes
 * from authored Config; no runtime or scaffolder-generated IDs are allowed.
 * Its parent CheckpointItem publishes only the ordered ContentBlocks array.
 */
export const defineCheckpointAnswer = <
  const Slug extends string,
  const Items extends Record<string, Checkpoint_Allowed_Configurator>,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: Omit<ContentBlock_CheckpointAnswer_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: { items: Items & ChildrenSupporting<Languages, Items>; order: string[] };
  },
) => {
  const { id, type, slug } = config;
  const initialItems: Items = { ...config.content.items };
  const initialOrder = [...config.content.order];
  const content = { items: { ...initialItems }, order: [...initialOrder] };
  const base = { id, slug, type } as const;

  const buildChild = (child: Checkpoint_Allowed_Configurator): ChildPublication =>
    buildChildProps(child) as unknown as ChildPublication;
  const buildChildPatch = (
    child: Checkpoint_Allowed_Configurator,
    patch: unknown,
  ): ChildPatchPublication => buildChildOverrides(child, patch as never) as unknown as ChildPatchPublication;

  const buildContent = (
    items: Record<string, Checkpoint_Allowed_Configurator>,
    order: readonly string[],
    patches: Record<string, unknown> = {},
  ) => {
    const { languages } = requireBuildContext();
    const entries = order.map(key => {
      const child = items[key];
      const original = buildChild(child);
      const patch = Object.hasOwn(patches, key) ? buildChildPatch(child, patches[key]) : undefined;
      return { original, patch };
    });
    const bases = entries.map(({ original, patch }) =>
      patch ? mergeForValidation(original.base, patch.base) : original.base,
    );
    const locales: AnswerLocaleFiles = {};
    for (const language of languages) {
      if (
        !entries.some(
          ({ original, patch }) => original.locale?.[language] !== undefined || patch?.locale?.[language] !== undefined,
        )
      )
        continue;
      locales[language] = {
        content: entries.map(({ original, patch }) => {
          const source = mergeForValidation(original.base, original.locale?.[language] ?? {});
          const withBase = patch ? mergeForValidation(source, patch.base) : source;
          return patch?.locale?.[language] ? mergeForValidation(withBase, patch.locale[language]) : withBase;
        }),
      };
    }
    return { bases, locales };
  };

  const props = (options: PublicationLanguageOptions<Languages>): AnswerPublication<AnswerBase> => {
    const languages = resolvePublicationLanguages(options);
    validate({ id, type, slug, content: { items: initialItems, order: initialOrder } });
    const built = buildContent(initialItems, initialOrder);
    const output = {
      base: { id, slug, type, content: built.bases },
      locale: Object.keys(built.locales).length ? built.locales : undefined,
    };
    validateRequestedPublication(checkpointAnswer_Props_Schema, output, languages);
    return output;
  };

  const overrides = <const Added extends Record<string, Checkpoint_Allowed_Configurator> = {}>(
    patch: CheckpointAnswer_Overrides<Items, Added> & {
      content?: { additionalItems?: Added & ChildrenSupporting<Languages, Added> };
    },
    options: PublicationLanguageOptions<Languages>,
  ): AnswerPublication<AnswerOverrideBase> => {
    try {
      const languages = resolvePublicationLanguages(options);
      validate({ id, type, slug, content: { items: initialItems, order: initialOrder } });
      if (!isObject(patch)) throw new Error('Expected an overrides object');
      for (const key of Object.keys(patch))
        if (key !== 'content') throw new Error('Unknown Answer override field: ' + key);
      if (patch.content !== undefined && !isObject(patch.content)) throw new Error('content must be an object');
      if (patch.content)
        for (const key of Object.keys(patch.content))
          if (!['items', 'additionalItems', 'order'].includes(key))
            throw new Error('Unknown Answer content override field: ' + key);

      const changes = patch.content?.items ?? {};
      const additions = patch.content?.additionalItems ?? {};
      if (!isObject(changes)) throw new Error('content.items must be a slug-keyed object');
      if (!isObject(additions)) throw new Error('content.additionalItems must be a slug-keyed map');
      const issues = validateSluggedConfiguratorMap(additions, allowedTypes, {
        path: 'content.additionalItems',
        itemLabel: 'ContentBlock',
      });
      if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));

      const enabled: Record<string, Checkpoint_Allowed_Configurator | false> = { ...initialItems };
      const childPatches: Record<string, unknown> = {};
      let structureChanged = Object.keys(additions).length > 0;
      for (const [key, child] of Object.entries(additions)) {
        if (Object.hasOwn(initialItems, key)) throw new Error('Duplicate answer slug: ' + key);
        if (
          !isObject(child) ||
          !isObject(child.build) ||
          typeof child.build.props !== 'function' ||
          typeof child.build.overrides !== 'function'
        )
          throw new Error('New ContentBlock must expose the Build API: ' + key);
        enabled[key] = child as Checkpoint_Allowed_Configurator;
      }
      for (const [key, value] of Object.entries(changes)) {
        if (!Object.hasOwn(initialItems, key)) throw new Error('Cannot override an unknown existing answer: ' + key);
        if (value === false) {
          enabled[key] = false;
          structureChanged = true;
        } else {
          if (!isObject(value)) throw new Error('Answer overrides must be objects or false: ' + key);
          childPatches[key] = value;
        }
      }
      if (structureChanged && patch.content?.order === undefined)
        throw new Error('content.order is required when adding or disabling answers');
      const order = patch.content?.order ?? initialOrder;
      const orderIssues = validateOrderedKeys(
        { items: enabled, order },
        { path: 'content', allowDisabled: true, requireNonEmpty: true },
      );
      if (orderIssues.length) throw new Error(orderIssues.map(issue => issue.message).join('; '));
      if (!order.length) throw new Error('At least one active answer is required');

      const output: AnswerPublication<AnswerOverrideBase> = { base: {}, locale: undefined };
      if (Object.keys(changes).length || Object.keys(additions).length || patch.content?.order !== undefined) {
        const active = Object.fromEntries(
          Object.entries(enabled).filter(
            (entry): entry is [string, Checkpoint_Allowed_Configurator] => entry[1] !== false,
          ),
        );
        const built = buildContent(active, order, childPatches);
        output.base.content = built.bases;
        output.locale = Object.keys(built.locales).length ? built.locales : undefined;
      }
      validateRequestedPublication(checkpointAnswer_Props_Schema, props(options), languages, output);
      return output;
    } catch (error) {
      throw new Error(
        'Invalid Checkpoint Answer overrides for ' +
          id +
          ': ' +
          (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const result = {
    id,
    slug,
    type,
    content,
    validate,
    build: scopeBuild({ props, overrides }),
    config: { base, locales: () => ({ locale: {} }), validate },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};
export type ContentBlock_CheckpointAnswer_Configurator = ConfiguratorChild<ReturnType<typeof defineCheckpointAnswer>>;
