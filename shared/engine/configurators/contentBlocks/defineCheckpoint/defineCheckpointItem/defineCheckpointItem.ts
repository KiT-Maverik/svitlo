import type {
  DeepPartial,
  LanguageScope,
  ChildSupporting,
  ChildrenSupporting,
  PublicationLanguageOptions,
} from '#types';
import type { LanguageCodes } from '#schemas';

import {
  mergeForValidation,
  resolvePublicationLanguages,
  validateRequestedPublication,
  validateOrderedKeys,
  validateSluggedConfiguratorMap,
} from '../../../_shared__configurators';
import { contentBlockConfigurator_Schema } from '../../contentBlock.schemas';
import { contentBlockTypes } from '../../contentBlock.constants';
import {
  checkpointItem_Config_Schema,
  checkpointItem_Props_Schema,
  type Checkpoint_Allowed_Configurator,
  type Checkpoint_Allowed_PropsBase,
  type CheckpointItem_Overrides,
  type ContentBlock_CheckpointItem_Config,
  type ContentBlock_CheckpointItem_Props,
} from './defineCheckpointItem.schemas';

export type CheckpointItemValidationIssue = {
  check: string;
  path: string;
  message: string;
};

export type CheckpointItemValidationResult = {
  success: boolean;
  subject: { id?: string; slug?: string; type?: string };
  errors: CheckpointItemValidationIssue[];
};

export class CheckpointItemValidationError extends Error {
  constructor(readonly result: CheckpointItemValidationResult) {
    super('Checkpoint item validation failed: ' + JSON.stringify(result));
    this.name = 'CheckpointItemValidationError';
  }
}

const allowedAnswers = contentBlockTypes.filter(type => type !== 'checkpoint');
const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/** Validate this item's metadata and collection boundaries, never child internals. */
const validate = (config: ContentBlock_CheckpointItem_Config): void => {
  const result: CheckpointItemValidationResult = {
    success: true,
    subject: { id: config?.id, slug: config?.slug, type: config?.type },
    errors: [],
  };
  const fail = (check: string, path: string, message: string) => {
    result.errors.push({ check, path, message });
  };

  const metadata = checkpointItem_Config_Schema.safeParse(config);
  if (!metadata.success) {
    for (const issue of metadata.error.issues) {
      fail(issue.path[0] === 'check' ? 'item' : 'metadata', issue.path.join('.'), issue.message);
    }
  }

  const question = config?.question;
  if (
    !isObject(question) ||
    question.type !== 'text' ||
    !contentBlockConfigurator_Schema.safeParse(question).success ||
    !isObject(question.config) ||
    !isObject(question.config.base) ||
    question.config.base.type !== 'text' ||
    question.config.base.slug !== question.slug ||
    !isObject(question.build) ||
    typeof question.build.props !== 'function' ||
    typeof question.build.overrides !== 'function'
  ) {
    fail('question', 'question', 'Question must be a Text configurator');
  } else if (isObject(question.config.base.params) && question.config.base.params.disabled === true) {
    fail('question', 'question', 'Question must remain enabled');
  }

  const answer = config?.answer;
  for (const issue of validateOrderedKeys(answer, { path: 'answer', requireNonEmpty: true })) {
    fail(issue.check, issue.path, issue.message);
  }
  if (isObject(answer) && isObject(answer.items) && Array.isArray(answer.order)) {
    for (const issue of validateSluggedConfiguratorMap(answer.items, allowedAnswers, {
      path: 'answer.items',
      itemLabel: 'answer',
    })) {
      fail(issue.check === 'item' ? 'answer' : issue.check, issue.path, issue.message);
    }
    for (const [key, child] of Object.entries(answer.items)) {
      if (
        !isObject(child) ||
        !isObject(child.build) ||
        typeof child.build.props !== 'function' ||
        typeof child.build.overrides !== 'function'
      ) {
        fail('answer', 'answer.items.' + key, 'Answer must expose the ContentBlock Build API');
      }
    }
  }

  result.success = result.errors.length === 0;
  if (!result.success) throw new CheckpointItemValidationError(result);
};

type ChildPublication = {
  base: Checkpoint_Allowed_PropsBase;
  locale: Partial<Record<LanguageCodes, Record<string, unknown>>> | undefined;
};
type ChildPatchPublication = Omit<ChildPublication, 'base'> & {
  base: DeepPartial<Checkpoint_Allowed_PropsBase>;
};
type ItemLocaleBody = {
  question?: Record<string, unknown>;
  answer?: Record<string, unknown>[];
};
type ItemLocaleFiles = Partial<Record<LanguageCodes, ItemLocaleBody>>;
type ItemPublication<Base> = { base: Base; locale: ItemLocaleFiles | undefined };
type ItemBase = Pick<ContentBlock_CheckpointItem_Props, 'id' | 'slug' | 'type' | 'check'> & {
  question: ReturnType<ContentBlock_CheckpointItem_Config['question']['build']['props']>['base'];
  answer: Checkpoint_Allowed_PropsBase[];
};
type ItemOverrideBase = {
  check?: true;
  question?: DeepPartial<ItemBase['question']>;
  answer?: Checkpoint_Allowed_PropsBase[];
};

/** Define one Checkpoint item with a mandatory Text question and ordered answers. */
export const defineCheckpointItem = <
  const Slug extends string,
  const Answers extends Record<string, Checkpoint_Allowed_Configurator>,
  const Question extends ContentBlock_CheckpointItem_Config['question'],
  const Languages extends readonly LanguageCodes[] = [],
>(
  config: Omit<ContentBlock_CheckpointItem_Config, 'slug' | 'answer' | 'question'> & {
    slug: Slug;
    question: Question & ChildSupporting<Languages, Question>;
    answer: { items: Answers & ChildrenSupporting<Languages, Answers>; order: string[] };
  },
) => {
  validate(config);
  const { id, type, slug, question, check } = config;
  const initialItems: Answers = { ...config.answer.items };
  const initialOrder = [...config.answer.order];
  // Transitional parent accessors; Build never serializes this collection.
  const answer = { items: { ...initialItems }, order: [...initialOrder] };

  const base = {
    id,
    slug,
    type,
    ...(check !== undefined ? { check } : {}),
  } satisfies DeepPartial<ContentBlock_CheckpointItem_Config>;

  const buildChild = (child: Checkpoint_Allowed_Configurator, languages: readonly LanguageCodes[]): ChildPublication =>
    child.build.props({ languages }) as unknown as ChildPublication;

  const buildChildPatch = (
    child: Checkpoint_Allowed_Configurator,
    patch: unknown,
    languages: readonly LanguageCodes[],
  ): ChildPatchPublication =>
    (child.build.overrides as (patch: never, options: PublicationLanguageOptions) => ChildPatchPublication)(
      patch as never,
      { languages },
    );

  /**
   * A published answer collection is always a complete, already sorted array.
   * Per-language arrays contain all effective children, not positional deltas.
   */
  const buildAnswers = (
    items: Record<string, Checkpoint_Allowed_Configurator>,
    order: readonly string[],
    languages: readonly LanguageCodes[],
    patches: Record<string, unknown> = {},
  ) => {
    const entries = order.map(key => {
      const child = items[key];
      const original = buildChild(child, languages);
      const patch = Object.hasOwn(patches, key) ? buildChildPatch(child, patches[key], languages) : undefined;
      return { original, patch };
    });
    const bases = entries.map(({ original, patch }) =>
      patch ? mergeForValidation(original.base, patch.base) : original.base,
    );
    const translatedLanguages = languages.filter(language =>
      entries.some(
        ({ original, patch }) => original.locale?.[language] !== undefined || patch?.locale?.[language] !== undefined,
      ),
    );
    const locales: ItemLocaleFiles = {};
    for (const language of translatedLanguages) {
      locales[language] = {
        answer: entries.map(({ original, patch }) => {
          const originalLocale = original.locale?.[language] ?? {};
          const localizedOriginal = mergeForValidation(original.base, originalLocale);
          const withPatchBase = patch ? mergeForValidation(localizedOriginal, patch.base) : localizedOriginal;
          const localizedPatch = patch?.locale?.[language];
          // Child overrides already contain Props-shaped locale paths.
          return localizedPatch ? mergeForValidation(withPatchBase, localizedPatch) : withPatchBase;
        }),
      };
    }
    return { bases, locales };
  };

  const props = (options: PublicationLanguageOptions<Languages>): ItemPublication<ItemBase> => {
    const languages = resolvePublicationLanguages(options);
    // Children already produce Props-shaped locale fragments.
    const builtQuestion = question.build.props({ languages });
    const builtAnswers = buildAnswers(initialItems, initialOrder, languages);
    const locale = { ...builtAnswers.locales };
    for (const [language, fields] of Object.entries(builtQuestion.locale ?? {})) {
      (locale[language as LanguageCodes] ??= {}).question = fields;
    }
    const result = {
      base: {
        id,
        slug,
        type,
        ...(check !== undefined ? { check } : {}),
        question: builtQuestion.base,
        answer: builtAnswers.bases,
      },
      locale: Object.keys(locale).length ? locale : undefined,
    };
    validateRequestedPublication(checkpointItem_Props_Schema, result, languages);
    return result;
  };

  const overrides = <const Added extends Record<string, Checkpoint_Allowed_Configurator> = {}>(
    patch: CheckpointItem_Overrides<Answers, Added> & {
      answer?: { additionalItems?: Added & ChildrenSupporting<Languages, Added> };
    },
    options: PublicationLanguageOptions<Languages>,
  ): ItemPublication<ItemOverrideBase> => {
    try {
      const languages = resolvePublicationLanguages(options);
      if (!isObject(patch)) throw new Error('Expected an overrides object');
      for (const key of Object.keys(patch)) {
        if (!['check', 'question', 'answer'].includes(key)) {
          throw new Error('Unknown Checkpoint Item override field: ' + key);
        }
      }
      if (patch.check !== undefined) checkpointItem_Config_Schema.shape.check.parse(patch.check);

      const output: ItemPublication<ItemOverrideBase> = { base: {}, locale: undefined };
      const locales: ItemLocaleFiles = {};
      if (patch.question !== undefined) {
        if (!isObject(patch.question)) throw new Error('Question override must be an object');
        if (isObject(patch.question.params) && Object.hasOwn(patch.question.params, 'disabled')) {
          throw new Error('The mandatory Checkpoint question cannot be disabled');
        }
        const built = question.build.overrides(patch.question, { languages });
        if (Object.keys(built.base).length) output.base.question = built.base;
        for (const [language, fields] of Object.entries(built.locale ?? {})) {
          (locales[language as LanguageCodes] ??= {}).question = fields;
        }
      }

      if (patch.check !== undefined) output.base.check = patch.check;
      if (patch.answer !== undefined && !isObject(patch.answer)) {
        throw new Error('Answer override must be an object');
      }
      const changes = patch.answer?.items ?? {};
      if (!isObject(changes)) throw new Error('answer.items must be a slug-keyed object');
      if (patch.answer) {
        for (const key of Object.keys(patch.answer)) {
          if (!['items', 'additionalItems', 'order'].includes(key))
            throw new Error('Unknown answer override field: ' + key);
        }
      }

      const additions = patch.answer?.additionalItems ?? {};
      if (!isObject(additions)) throw new Error('answer.additionalItems must be a slug-keyed configurator map');
      const addedIssues = validateSluggedConfiguratorMap(additions, allowedAnswers, {
        path: 'answer.additionalItems',
        itemLabel: 'ContentBlock',
      });
      if (addedIssues.length) throw new Error(addedIssues.map(issue => issue.message).join('; '));

      const patches: Record<string, unknown> = {};
      const enabled: Record<string, Checkpoint_Allowed_Configurator | false> = { ...initialItems };
      let structureChanged = Object.keys(additions).length > 0;

      for (const [key, child] of Object.entries(additions)) {
        if (Object.hasOwn(initialItems, key)) throw new Error('Duplicate answer slug: ' + key);
        if (
          !isObject(child) ||
          !isObject(child.build) ||
          typeof child.build.props !== 'function' ||
          typeof child.build.overrides !== 'function'
        ) {
          throw new Error('New ContentBlock must expose the Build API: ' + key);
        }
        enabled[key] = child as Checkpoint_Allowed_Configurator;
      }

      for (const [key, value] of Object.entries(changes)) {
        if (!Object.hasOwn(initialItems, key)) {
          throw new Error('Cannot override an unknown existing answer: ' + key);
        }
        if (value === false) {
          enabled[key] = false;
          structureChanged = true;
        } else {
          if (!isObject(value)) throw new Error('Answer overrides must be objects or false: ' + key);
          patches[key] = value;
        }
      }

      if (structureChanged && patch.answer?.order === undefined) {
        throw new Error('answer.order is required when adding or disabling answers');
      }
      const order = patch.answer?.order ?? initialOrder;
      const issues = validateOrderedKeys(
        { items: enabled, order },
        {
          path: 'answer',
          allowDisabled: true,
          requireNonEmpty: true,
        },
      );
      if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
      if (!order.length) throw new Error('At least one active answer is required');

      const modifiesAnswers =
        Object.keys(changes).length > 0 || patch.answer?.order !== undefined || Object.keys(additions).length > 0;
      if (modifiesAnswers) {
        const active = Object.fromEntries(
          Object.entries(enabled).filter(
            (entry): entry is [string, Checkpoint_Allowed_Configurator] => entry[1] !== false,
          ),
        );
        const built = buildAnswers(active, order, languages, patches);
        output.base.answer = built.bases;
        for (const [language, fragment] of Object.entries(built.locales)) {
          (locales[language as LanguageCodes] ??= {}).answer = fragment.answer;
        }
      }
      output.locale = Object.keys(locales).length ? locales : undefined;
      validateRequestedPublication(checkpointItem_Props_Schema, props(options), languages, output);
      return output;
    } catch (error) {
      throw new Error(
        'Invalid Checkpoint Item overrides for ' + id + ': ' + (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const result = {
    id,
    slug,
    type,
    question,
    answer,
    ...(check !== undefined ? { check } : {}),
    validate,
    build: { props, overrides },
    config: {
      base,
      locales: () => ({ locale: {} }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export type ContentBlock_CheckpointItem_Configurator = ReturnType<typeof defineCheckpointItem>;
