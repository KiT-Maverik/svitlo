import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type {
  ChildrenSupporting,
  ChildSupporting,
  DeepPartial,
  LanguageScope,
  PublicationLanguageOptions,
} from '#types';

import {
  buildChildData,
  buildChildOverrides,
  mergeForValidation,
  requireBuildContext,
  resolvePublicationLanguages,
  scopeBuild,
  validateRequestedPublication,
} from '../../../../_shared__configurators';
import type { ConfiguratorChild } from '../../../../../types/configuratorChild';
import type {
  Checkpoint_Allowed_Configurator,
  ContentBlock_CheckpointAnswer_Configurator,
} from '../defineCheckpointAnswer';
import {
  checkpointItem_Config_Schema,
  checkpointItem_Data_Schema,
  type CheckpointItem_Overrides,
  type ContentBlock_CheckpointItem_Config,
  type ContentBlock_CheckpointItem_Data,
} from './defineCheckpointItem.schemas';

export type CheckpointItemValidationIssue = { check: string; path: string; message: string };
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
const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/** The Item owns its identity and mandatory Text question; Answer validates itself. */
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
  if (!metadata.success)
    for (const issue of metadata.error.issues) fail('metadata', issue.path.join('.'), issue.message);
  const question = config?.question;
  if (
    !isObject(question) ||
    question.type !== 'text' ||
    !isObject(question.config) ||
    !isObject(question.config.base) ||
    question.config.base.type !== 'text' ||
    question.config.base.slug !== question.slug ||
    !isObject(question.build) ||
    typeof question.build.data !== 'function' ||
    typeof question.build.overrides !== 'function'
  )
    fail('question', 'question', 'Question must be a Text configurator');
  else if (isObject(question.config.base.params) && question.config.base.params.disabled === true)
    fail('question', 'question', 'Question must remain enabled');

  // Narrow the external Configurator through the runtime structural boundary:
  // its generic placement map must not stand in for the fixed Answer role.
  const answer: unknown = config?.answer;
  if (
    !isObject(answer) ||
    answer.type !== 'checkpointAnswer' ||
    !isObject(answer.config) ||
    !isObject(answer.config.base) ||
    answer.config.base.type !== 'checkpointAnswer' ||
    answer.config.base.id !== answer.id ||
    answer.config.base.slug !== answer.slug ||
    !isObject(answer.build) ||
    typeof answer.build.data !== 'function' ||
    typeof answer.build.overrides !== 'function'
  )
    fail('answer', 'answer', 'Answer must be a defineCheckpointAnswer configurator');

  result.success = result.errors.length === 0;
  if (!result.success) throw new CheckpointItemValidationError(result);
};

type AnswerResource = ReturnType<ContentBlock_CheckpointAnswer_Configurator['build']['data']>;
type AnswerOverride = {
  base: Record<string, unknown>;
  locale: Partial<Record<LanguageCode, Record<string, unknown>>> | undefined;
};
type ItemLocale = { question?: Record<string, unknown>; answer?: Record<string, unknown> };
type ItemFiles = Partial<Record<LanguageCode, ItemLocale>>;
type ItemPublication<Base> = { base: Base; locale: ItemFiles | undefined };
type ItemBase = Pick<ContentBlock_CheckpointItem_Data, 'id' | 'slug' | 'type' | 'check'> & {
  question: ReturnType<ContentBlock_CheckpointItem_Config['question']['build']['data']>['base'];
  answer: AnswerResource['base'];
};
type ItemOverrideBase = {
  check?: true;
  question?: DeepPartial<ItemBase['question']>;
  answer?: Record<string, unknown>;
};

export const defineCheckpointItem = <
  const Slug extends string,
  const Answer extends ContentBlock_CheckpointAnswer_Configurator,
  const Question extends ContentBlock_CheckpointItem_Config['question'],
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: Omit<ContentBlock_CheckpointItem_Config, 'slug' | 'answer' | 'question'> & {
    slug: Slug;
    question: Question & ChildSupporting<Languages, Question>;
    answer: Answer & ChildSupporting<Languages, Answer>;
  },
) => {
  const { id, type, slug, question, answer, check } = config;
  const base = { id, type, slug, ...(check !== undefined ? { check } : {}) };

  const data = (options: PublicationLanguageOptions<Languages>): ItemPublication<ItemBase> => {
    const languages = resolvePublicationLanguages(options);
    validate({ id, type, slug, question, answer, ...(check !== undefined ? { check } : {}) });
    const builtQuestion = buildChildData(question);
    const builtAnswer = buildChildData(answer);
    const locale: ItemFiles = {};
    for (const [language, fields] of Object.entries(builtAnswer.locale ?? {})) {
      (locale[language as LanguageCode] ??= {}).answer = fields;
    }
    for (const [language, fields] of Object.entries(builtQuestion.locale ?? {})) {
      (locale[language as LanguageCode] ??= {}).question = fields;
    }
    const output = {
      base: {
        ...base,
        question: builtQuestion.base,
        answer: builtAnswer.base,
      },
      locale: Object.keys(locale).length ? locale : undefined,
    };
    validateRequestedPublication(checkpointItem_Data_Schema, output, languages);
    return output;
  };

  const overrides = <const Added extends Record<string, Checkpoint_Allowed_Configurator> = {}>(
    patch: CheckpointItem_Overrides<Answer, Added> & {
      answer?: ChildrenSupporting<Languages, Added>;
    },
    options: PublicationLanguageOptions<Languages>,
  ): ItemPublication<ItemOverrideBase> => {
    try {
      const languages = resolvePublicationLanguages(options);
      validate({ id, type, slug, question, answer, ...(check !== undefined ? { check } : {}) });
      if (!isObject(patch)) throw new Error('Expected an overrides object');
      for (const key of Object.keys(patch))
        if (!['check', 'question', 'answer'].includes(key))
          throw new Error('Unknown Checkpoint Item override field: ' + key);
      if (patch.check !== undefined) checkpointItem_Config_Schema.shape.check.parse(patch.check);
      const output: ItemPublication<ItemOverrideBase> = {
        base: patch.check !== undefined ? { check: patch.check } : {},
        locale: undefined,
      };
      const locale: ItemFiles = {};
      if (patch.question !== undefined) {
        if (!isObject(patch.question)) throw new Error('Question override must be an object');
        if (isObject(patch.question.params) && Object.hasOwn(patch.question.params, 'disabled'))
          throw new Error('The mandatory Checkpoint question cannot be disabled');
        const built = buildChildOverrides(question, patch.question as never);
        if (Object.keys(built.base).length) output.base.question = built.base;
        for (const [language, fields] of Object.entries(built.locale ?? {}))
          (locale[language as LanguageCode] ??= {}).question = fields;
      }
      if (patch.answer !== undefined) {
        const built = buildChildOverrides(answer, patch.answer as never) as unknown as AnswerOverride;
        if (Object.keys(built.base).length) output.base.answer = built.base;
        for (const [language, fields] of Object.entries(built.locale ?? {}))
          (locale[language as LanguageCode] ??= {}).answer = fields;
      }
      output.locale = Object.keys(locale).length ? locale : undefined;
      // Answer is a fixed semantic role, but its nested collection may publish
      // false tombstones. Resolve those for validation without expanding the
      // published sparse patch or changing the learner-visible presentation.
      const source = data(options);
      for (const language of languages) {
        const original = mergeForValidation(source.base, source.locale?.[language] ?? {});
        const withBase = mergeForValidation(original, output.base);
        const effective = mergeForValidation(withBase, output.locale?.[language] ?? {});
        if (isObject(effective.answer) && isObject(output.base.answer)) {
          const answer = { ...effective.answer };
          for (const [key, value] of Object.entries(output.base.answer)) {
            if (value === false) delete answer[key];
          }
          effective.answer = answer;
        }
        checkpointItem_Data_Schema.parse(effective);
      }
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
    build: scopeBuild({ data, overrides }),
    config: { base, locales: () => ({ locale: {} }), validate },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};
export type ContentBlock_CheckpointItem_Configurator = ConfiguratorChild<ReturnType<typeof defineCheckpointItem>>;
