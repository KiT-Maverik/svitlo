import type { DeepPartial, LanguageScope, ChildrenSupporting, ConfigWithLanguages } from '#types';
import type { LanguageCodes } from '#schemas';
import { onlyLocales, onlyStrings } from '../../_shared__configurators';
import {
  assertEnabledBlock,
  isEnabledBlock,
  cloneJson,
  finishFiles,
  isRecord,
  ensureQuestionPatchShape,
  mergeQuestionContent,
  projectQuestionLocale,
  resolveCommonContent,
  resolveBlockCollection,
  resolveBlockMap,
  snapshotCommonContent,
  snapshotBlockCollection,
  validateBlockCollection,
  validateCommonContent,
  validateEffectiveQuestionMetadata,
  type OrderedBlockPatch,
  type ResolvableBlockPatch,
  type QuestionCommonPatch,
  type QuestionResourcePublication,
  type QuestionOverridePublication,
  resolvePublicationLanguages,
  validateQuestionPublication,
  type PublicationLanguageOptions,
} from '../_shared__questions';
import type { ContentBlock_Configurator } from '../../contentBlocks';
import type { QuestionChildrenSupporting } from '../question.schemas';
import {
  selectMultipleAnswers_Config_Schema,
  selectMultipleAnswers_Override_Config_Schema,
  type Question_SelectMultipleAnswers_Config,
  selectMultipleAnswers_Props_Schema,
  type Question_SelectMultipleAnswers_Props,
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
  if (!groups.correct.order.length) throw new Error('SelectMultipleAnswers requires a correct answer');
  const slugs = (['correct', 'incorrect', 'distractors'] as const).flatMap(group => groups[group].order);
  if (new Set(slugs).size !== slugs.length) {
    throw new Error('An answer cannot occur in multiple scoring groups');
  }
  if (!groups.correct.order.every(key => isEnabledBlock(groups.correct.items[key].config.base))) {
    throw new Error('content.answers.correct must contain an enabled ContentBlock');
  }
};

type ContentShape = Question_SelectMultipleAnswers_Config['content'];
export type Question_SelectMultipleAnswers_Overrides<
  Content extends ContentShape = ContentShape,
  Added extends Record<string, ContentBlock_Configurator> = {},
  Languages extends readonly LanguageCodes[] = [],
> = Question_SelectMultipleAnswers_MetadataOverrides & {
  content?: QuestionCommonPatch<Content, Added, Languages> & {
    answers?: {
      correct?: OrderedBlockPatch<Content['answers']['correct']['items'], Added, Languages>;
      incorrect?: OrderedBlockPatch<Content['answers']['incorrect']['items'], Added, Languages>;
      distractors?: OrderedBlockPatch<Content['answers']['distractors']['items'], Added, Languages>;
    };
  };
};

/** A Question reuses ContentBlocks but never mutates their publication contexts. */
export const defineSelectMultipleAnswers = <
  const Slug extends string,
  const Content extends ContentShape,
  const Languages extends readonly LanguageCodes[] = [],
>(
  config: Omit<Question_SelectMultipleAnswers_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: Content &
      QuestionChildrenSupporting<Languages, Content> & {
        answers: {
          correct: { items: ChildrenSupporting<Languages, Content['answers']['correct']['items']> };
          incorrect: { items: ChildrenSupporting<Languages, Content['answers']['incorrect']['items']> };
          distractors: { items: ChildrenSupporting<Languages, Content['answers']['distractors']['items']> };
        };
      };
  } & ConfigWithLanguages<Question_SelectMultipleAnswers_Config, Languages>,
) => {
  validate(config);
  const authored = cloneJson(metadataSchema.parse(config));
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
    languages: readonly LanguageCodes[],
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
    const correctCount = Object.keys(complete.correct.base).length;
    if (correctCount < 1) {
      throw new Error('SelectMultipleAnswers has an invalid number of correct answers');
    }
    if (!Object.values(complete.correct.base).every(isEnabledBlock)) {
      throw new Error('content.answers.correct must contain an enabled ContentBlock');
    }
    const activeKeys = groups.flatMap(group => Object.keys(complete[group].base));
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

  const props = (
    options: PublicationLanguageOptions<Languages>,
  ): QuestionResourcePublication<Question_SelectMultipleAnswers_Props> => {
    const languages = resolvePublicationLanguages(options);
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
    } as unknown as QuestionResourcePublication<Question_SelectMultipleAnswers_Props>;
    validateQuestionPublication(selectMultipleAnswers_Props_Schema, languages, resource);
    return resource;
  };

  const overrides = <const Added extends Record<string, ContentBlock_Configurator> = {}>(
    patch: Question_SelectMultipleAnswers_Overrides<Content, Added, Languages>,
    options: PublicationLanguageOptions<Languages>,
  ): QuestionOverridePublication<Question_SelectMultipleAnswers_Props> => {
    try {
      const languages = resolvePublicationLanguages(options);
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
      } as QuestionOverridePublication<Question_SelectMultipleAnswers_Props>;
      validateQuestionPublication(selectMultipleAnswers_Props_Schema, languages, props(options), publication);
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
    build: { props, overrides },
    config: {
      base,
      locales: () => ({ locale: onlyLocales(copyMetadata().locale) }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export type Question_SelectMultipleAnswers_Configurator = ReturnType<typeof defineSelectMultipleAnswers>;
