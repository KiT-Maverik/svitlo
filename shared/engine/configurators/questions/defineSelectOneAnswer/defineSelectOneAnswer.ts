import type { DeepPartial, LanguageScope, ChildrenSupporting, ConfigWithLanguages } from '#types';
import type { LanguageCodes } from '#schemas';
import { onlyLocales, onlyStrings } from '../../_shared__configurators';
import {
  cloneJson, finishFiles, isRecord, ensureQuestionPatchShape, mergeQuestionContent,
  projectQuestionLocale, resolveCommonContent, resolveBlockCollection, resolveBlockMap,
  snapshotCommonContent, snapshotBlockCollection, validateBlockCollection, validateCommonContent,
  validateEffectiveQuestionMetadata,
  type OrderedBlockPatch, type QuestionCommonPatch, type QuestionPublication,
} from '../_shared__questions';
import type { QuestionChildrenSupporting } from '../question.schemas';
import {
  selectOneAnswer_Config_Schema, selectOneAnswer_Override_Config_Schema,
  type Question_SelectOneAnswer_Config,
  type Question_SelectOneAnswer_MetadataOverrides,
} from './defineSelectOneAnswer.schemas';

const metadataSchema = selectOneAnswer_Config_Schema.omit({ content: true });

/** Validate authored Question metadata and owned child collection boundaries. */
const validate = (candidate: Question_SelectOneAnswer_Config): void => {
  selectOneAnswer_Config_Schema.parse(candidate);
  validateCommonContent(candidate.content);
  for (const group of ['correct', 'incorrect', 'distractors'] as const) {
    validateBlockCollection(candidate.content.answers[group], 'content.answers.' + group);
  }
};

type ContentShape = Question_SelectOneAnswer_Config['content'];
export type Question_SelectOneAnswer_Overrides<Content extends ContentShape = ContentShape> =
  Question_SelectOneAnswer_MetadataOverrides & {
    content?: QuestionCommonPatch<Content> & {
      answers?: {
    correct?: OrderedBlockPatch<Content['answers']['correct']['items']>;
    incorrect?: OrderedBlockPatch<Content['answers']['incorrect']['items']>;
    distractors?: OrderedBlockPatch<Content['answers']['distractors']['items']>;
  };
    };
  };

/** A Question reuses ContentBlocks but never mutates their publication contexts. */
export const defineSelectOneAnswer = <
  const Slug extends string,
  const Content extends ContentShape,
  const Languages extends readonly LanguageCodes[] = [],
>(
  config: Omit<Question_SelectOneAnswer_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: Content & QuestionChildrenSupporting<Languages, Content> & {
      answers: {
      correct: { items: ChildrenSupporting<Languages, Content['answers']['correct']['items']> };
      incorrect: { items: ChildrenSupporting<Languages, Content['answers']['incorrect']['items']> };
      distractors: { items: ChildrenSupporting<Languages, Content['answers']['distractors']['items']> };
    };
    };
  } & ConfigWithLanguages<Question_SelectOneAnswer_Config, Languages>,
) => {
  validate(config);
  const authored = cloneJson(metadataSchema.parse(config));
  const copyMetadata = () => cloneJson(authored);
  const { id, type } = authored;
  const slug = config.slug;
  const initialContent = {
    ...snapshotCommonContent(config.content),
    answers: {
      correct: snapshotBlockCollection(source.answers.correct),
      incorrect: snapshotBlockCollection(source.answers.incorrect),
      distractors: snapshotBlockCollection(source.answers.distractors),
    },
  } as Content;
  // Transitional authored access; never pass these mutable objects into Build.
  const content = {
    ...snapshotCommonContent(initialContent),
    answers: {
      correct: snapshotBlockCollection(initialContent.answers.correct),
      incorrect: snapshotBlockCollection(initialContent.answers.incorrect),
      distractors: snapshotBlockCollection(initialContent.answers.distractors),
    },
  } as Content;

  
  const extraContent = (
    source: Content,
    patch?: NonNullable<Question_SelectOneAnswer_Overrides<Content>['content']>['answers'],
  ) => {
    const base: Record<string, unknown> = {};
    const locale: Record<string, Record<string, unknown>> = {};
    const answers: Record<string, unknown> = {};
    for (const group of ['correct', 'incorrect', 'distractors'] as const) {
      if (patch && patch[group] === undefined) continue;
      const resolved = resolveBlockMap(source.answers[group], patch?.[group], 'content.answers.' + group);
      answers[group] = resolved.base;
      for (const [language, blocks] of Object.entries(resolved.locale)) {
        const fields = (locale[language] ??= {});
        ((fields.answers ??= {}) as Record<string, unknown>)[group] = blocks;
      }
    }
    if (Object.keys(answers).length) base.answers = answers;
    return { base, locale };
  };

  const props = (): QuestionPublication<Record<string, unknown>> => {
    const metadata = copyMetadata();
    const own = projectQuestionLocale(metadata.locale);
    const common = resolveCommonContent(initialContent);
    const extra = extraContent(initialContent);
    const files = own.files;
    mergeQuestionContent(files, common.locale, extra.locale);
    return {
      base: {
        id, slug, type, params: metadata.params,
        ...(Object.keys(own.base).length ? { locale: own.base } : {}),
        content: { ...common.base, ...extra.base },
      },
      locale: finishFiles(files),
    };
  };

  const overrides = (
    patch: Question_SelectOneAnswer_Overrides<Content>,
  ): QuestionPublication<Record<string, unknown>> => {
    try {
      ensureQuestionPatchShape(patch);
      const metadataPatch = selectOneAnswer_Override_Config_Schema.parse({
        ...(patch.params !== undefined ? { params: patch.params } : {}),
        ...(patch.locale !== undefined ? { locale: patch.locale } : {}),
      });
      validateEffectiveQuestionMetadata(copyMetadata(), metadataPatch, candidate => metadataSchema.parse(candidate));
      const own = projectQuestionLocale(metadataPatch.locale ?? {});
      const files = own.files;
      const base: Record<string, unknown> = {
        ...(metadataPatch.params !== undefined ? { params: cloneJson(metadataPatch.params) } : {}),
        ...(Object.keys(own.base).length ? { locale: own.base } : {}),
      };
      if (patch.content !== undefined) {
        if (!isRecord(patch.content)) throw new Error('content must be a plain object');
        for (const key of Object.keys(patch.content)) {
          if (!['question', 'hint', 'explanation', 'answers'].includes(key)) {
            throw new Error('Unknown Question content override field: ' + key);
          }
        }
        const common = resolveCommonContent(initialContent, patch.content as QuestionCommonPatch<Content>);
        const extra = patch.content.answers !== undefined ? extraContent(initialContent, patch.content.answers) : {base:{},locale:{}};
        const changed = { ...common.base, ...extra.base };
        if (Object.keys(changed).length) base.content = changed;
        mergeQuestionContent(files, common.locale, extra.locale);
      }
      return { base, locale: finishFiles(files) };
    } catch (error) {
      throw new Error(
        'Invalid SelectOneAnswer Question overrides for ' + id + ': ' +
        (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const base = { id, slug, type, params: cloneJson(authored.params), locale: onlyStrings(authored.locale) };
  const result = {
    id, slug, type, content, validate,
    build: { props, overrides },
    config: {
      base,
      locales: () => ({ locale: onlyLocales(copyMetadata().locale) }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export type Question_SelectOneAnswer_Configurator = ReturnType<typeof defineSelectOneAnswer>;
