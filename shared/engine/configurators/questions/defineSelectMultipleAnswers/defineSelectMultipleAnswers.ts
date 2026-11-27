import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type { ChildrenSupporting, ConfigWithLanguages, DeepPartial, LanguageScope } from '#types';

import {
  assertEnabledBlock,
  cloneJson,
  ensureQuestionPatchShape,
  finishFiles,
  isEnabledBlock,
  isRecord,
  mergeQuestionContent,
  projectQuestionLocale,
  resolveBlockCollection,
  resolveBlockMap,
  resolveCommonContent,
  resolvePublicationLanguages,
  snapshotBlockCollection,
  snapshotCommonContent,
  validateBlockCollection,
  validateCommonContent,
  validateEffectiveQuestionMetadata,
  validateQuestionPublication,
  type BlockMembers,
  type OrderedBlockPatch,
  type PublicationLanguageOptions,
  type QuestionCommonPatch,
  type QuestionOverridePublication,
  type QuestionResourcePublication,
  type ResolvableBlockPatch,
} from '../_shared__questions';
import { onlyLocales, onlyStrings, scopeBuild } from '../../_shared__configurators';
import type { ContentBlock_Primitive_Configurator } from '../../contentBlocks';
import type { QuestionChildrenSupporting } from '../question.schemas';
import {
  selectMultipleAnswers_Config_Schema,
  selectMultipleAnswers_Data_Schema,
  selectMultipleAnswers_Override_Config_Schema,
  type Question_SelectMultipleAnswers_Config,
  type Question_SelectMultipleAnswers_Data,
  type Question_SelectMultipleAnswers_MetadataOverrides,
} from './defineSelectMultipleAnswers.schemas';

const metadataSchema = selectMultipleAnswers_Config_Schema.omit({ content: true });

/** Validate authored Question metadata and owned child collection boundaries. */
const validate = (candidate: Question_SelectMultipleAnswers_Config): void => {
  selectMultipleAnswers_Config_Schema.parse(candidate);
  validateCommonContent(candidate.content);
  const groups = candidate.content.answers;
  for (const group of ['correct', 'incorrect', 'distractors'] as const) {
    validateBlockCollection(groups[group], 'content.answers.' + group);
  }
  if (!groups.correct.children.length) throw new Error('SelectMultipleAnswers requires a correct answer');
  const slugs = (['correct', 'incorrect', 'distractors'] as const).flatMap(group => groups[group].children);
  if (new Set(slugs).size !== slugs.length) {
    throw new Error('An answer cannot occur in multiple scoring groups');
  }
  if (!groups.correct.children.every(key => isEnabledBlock(groups.correct[key].config.base))) {
    throw new Error('content.answers.correct must contain an enabled ContentBlock');
  }
};

type ContentShape = Question_SelectMultipleAnswers_Config['content'];
export type Question_SelectMultipleAnswers_Overrides<
  Content extends ContentShape = ContentShape,
  Added extends Record<string, ContentBlock_Primitive_Configurator> = {},
  Languages extends readonly LanguageCode[] = AllLanguageCodes,
> = Question_SelectMultipleAnswers_MetadataOverrides & {
  content?: QuestionCommonPatch<Content, Added, Languages> & {
    answers?: {
      correct?: OrderedBlockPatch<BlockMembers<Content['answers']['correct']>, Added, Languages>;
      incorrect?: OrderedBlockPatch<BlockMembers<Content['answers']['incorrect']>, Added, Languages>;
      distractors?: OrderedBlockPatch<BlockMembers<Content['answers']['distractors']>, Added, Languages>;
    };
  };
};

/**
 * Author a Question where several options may be correct simultaneously.
 *
 * @remarks
 * Put all correct choices in `content.answers.correct`, false alternatives
 * in `incorrect`, and optional extra decoys in `distractors`.
 * At least one correct answer must remain enabled, and answer slugs must
 * be unique across all groups.
 */
export const defineSelectMultipleAnswers = <
  const Slug extends string,
  const Content extends ContentShape,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: Omit<Question_SelectMultipleAnswers_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: Content &
      QuestionChildrenSupporting<Languages, Content> & {
        answers: {
          correct: { items: ChildrenSupporting<Languages, BlockMembers<Content['answers']['correct']>> };
          incorrect: { items: ChildrenSupporting<Languages, BlockMembers<Content['answers']['incorrect']>> };
          distractors: { items: ChildrenSupporting<Languages, BlockMembers<Content['answers']['distractors']>> };
        };
      };
  } & ConfigWithLanguages<Question_SelectMultipleAnswers_Config, Languages>,
) => {
  const { content: _content, ...metadataInput } = config;
  const authored = cloneJson(metadataInput);
  const copyMetadata = () => cloneJson(authored);
  const { id, type } = authored;
  const slug = config.slug;
  const initialContent = {
    ...snapshotCommonContent(config.content),
    answers: {
      correct: snapshotBlockCollection(config.content.answers.correct),
      incorrect: snapshotBlockCollection(config.content.answers.incorrect),
      distractors: snapshotBlockCollection(config.content.answers.distractors),
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
    languages: readonly LanguageCode[],
    patch?: {
      correct?: ResolvableBlockPatch;
      incorrect?: ResolvableBlockPatch;
      distractors?: ResolvableBlockPatch;
    },
  ) => {
    const base: Record<string, unknown> = {};
    const locale: Record<string, Record<string, unknown>> = {};
    const answers: Record<string, unknown> = {};
    const groups = ['correct', 'incorrect', 'distractors'] as const;
    for (const key of Object.keys(patch ?? {})) {
      if (!groups.some(group => group === key)) throw new Error('Unknown scoring group: ' + key);
    }
    const complete = {
      correct: resolveBlockMap(source.answers.correct, languages, patch?.correct, 'content.answers.correct'),
      incorrect: resolveBlockMap(source.answers.incorrect, languages, patch?.incorrect, 'content.answers.incorrect'),
      distractors: resolveBlockMap(
        source.answers.distractors,
        languages,
        patch?.distractors,
        'content.answers.distractors',
      ),
    };
    const correctCount = Object.keys(complete.correct.base.children.length;
    if (correctCount < 1) {
      throw new Error('SelectMultipleAnswers has an invalid number of correct answers');
    }
    if (!complete.correct.base.children.every(key => isEnabledBlock(complete.correct.base[key]))) {
      throw new Error('content.answers.correct must contain an enabled ContentBlock');
    }
    const activeKeys = groups.flatMap(group => complete[group].base.children);
    if (new Set(activeKeys).size !== activeKeys.length) {
      throw new Error('An answer cannot occur in multiple scoring groups');
    }
    for (const group of groups) {
      if (patch && patch[group] === undefined) continue;
      const resolved = complete[group];
      answers[group] = resolved.base;
      for (const [language, blocks] of Object.entries(resolved.locale)) {
        const fields = (locale[language] ??= {});
        ((fields.answers ??= {}) as Record<string, unknown>)[group] = blocks;
      }
    }
    if (Object.keys(answers).length) base.answers = answers;
    return { base, locale };
  };

  const data = (
    options: PublicationLanguageOptions<Languages>,
  ): QuestionResourcePublication<Question_SelectMultipleAnswers_Data> => {
    const languages = resolvePublicationLanguages(options);
    validate({ ...copyMetadata(), content: initialContent });
    const metadata = copyMetadata();
    const own = projectQuestionLocale(metadata.locale, languages);
    const common = resolveCommonContent(initialContent, languages);
    const extra = extraContent(initialContent, languages);
    const files = own.files;
    mergeQuestionContent(files, common.locale, extra.locale);
    const resource = {
      base: {
        id,
        slug,
        type,
        params: metadata.params,
        locale: own.base,
        content: { ...common.base, ...extra.base },
      },
      locale: finishFiles(files),
    } as unknown as QuestionResourcePublication<Question_SelectMultipleAnswers_Data>;
    validateQuestionPublication(selectMultipleAnswers_Data_Schema, languages, resource);
    return resource;
  };

  const overrides = <const Added extends Record<string, ContentBlock_Primitive_Configurator> = {}>(
    patch: Question_SelectMultipleAnswers_Overrides<Content, Added, Languages>,
    options: PublicationLanguageOptions<Languages>,
  ): QuestionOverridePublication<Question_SelectMultipleAnswers_Data> => {
    try {
      const languages = resolvePublicationLanguages(options);
      validate({ ...copyMetadata(), content: initialContent });
      ensureQuestionPatchShape(patch);
      const metadataPatch = selectMultipleAnswers_Override_Config_Schema.parse({
        ...(patch.params !== undefined ? { params: patch.params } : {}),
        ...(patch.locale !== undefined ? { locale: patch.locale } : {}),
      });
      validateEffectiveQuestionMetadata(copyMetadata(), metadataPatch, candidate => metadataSchema.parse(candidate));
      const own = projectQuestionLocale(metadataPatch.locale ?? {}, languages);
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
        const common = resolveCommonContent(initialContent, languages, patch.content as QuestionCommonPatch<Content>);
        const extra =
          patch.content.answers !== undefined
            ? extraContent(initialContent, languages, patch.content.answers)
            : { base: {}, locale: {} };
        const changed = { ...common.base, ...extra.base };
        if (Object.keys(changed).length) base.content = changed;
        mergeQuestionContent(files, common.locale, extra.locale);
      }
      const publication = {
        base,
        locale: finishFiles(files),
      } as QuestionOverridePublication<Question_SelectMultipleAnswers_Data>;
      validateQuestionPublication(selectMultipleAnswers_Data_Schema, languages, data(options), publication);
      return publication;
    } catch (error) {
      throw new Error(
        'Invalid SelectMultipleAnswers Question overrides for ' +
          id +
          ': ' +
          (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const base = { id, slug, type, params: cloneJson(authored.params), locale: onlyStrings(authored.locale) };
  const result = {
    id,
    slug,
    type,
    content,
    validate,
    build: scopeBuild({ data, overrides }),
    config: {
      base,
      locales: () => ({ locale: onlyLocales(copyMetadata().locale) }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export type Question_SelectMultipleAnswers_Configurator = ReturnType<typeof defineSelectMultipleAnswers>;
