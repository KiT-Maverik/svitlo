import type { DeepPartial } from '#types';

import { validateOrderedKeys, validateSluggedConfiguratorMap } from '../../../_shared__configurators';
import { contentBlockConfigurator_Schema } from '../../contentBlock.schemas';
import { contentBlockTypes } from '../../contentBlock.constants';
import {
  checkpointItem_Config_Schema,
  type Checkpoint_Allowed_Configurator,
  type ContentBlock_CheckpointItem_Config,
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
    !isObject(question.assemble) ||
    typeof question.assemble.resource !== 'function'
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
  }

  result.success = result.errors.length === 0;
  if (!result.success) throw new CheckpointItemValidationError(result);
};

/** Define one Checkpoint item with its Text question and ordered permitted answers. */
export const defineCheckpointItem = <
  const Slug extends string,
  const Answers extends Record<string, Checkpoint_Allowed_Configurator>,
>(
  config: Omit<ContentBlock_CheckpointItem_Config, 'slug' | 'answer'> & {
    slug: Slug;
    answer: { items: Answers; order: string[] };
  },
) => {
  validate(config);
  const { id, type, slug, question, check } = config;
  const answer = {
    items: { ...config.answer.items },
    order: [...config.answer.order],
  };

  const base = {
    id,
    slug,
    type,
    ...(check !== undefined ? { check } : {}),
  } satisfies DeepPartial<ContentBlock_CheckpointItem_Config>;

  return {
    id,
    slug,
    type,
    question,
    answer,
    ...(check !== undefined ? { check } : {}),
    config: {
      base,
      locales: () => ({ locale: {} }),
      validate,
    },
  } as const;
};

export type ContentBlock_CheckpointItem_Configurator = ReturnType<typeof defineCheckpointItem>;
