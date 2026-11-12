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
import type { ContentBlock_Configurator } from '../../contentBlocks';
import type { QuestionChildrenSupporting } from '../question.schemas';
import {
  buildAnswerWithBlocks_Config_Schema, buildAnswerWithBlocks_Override_Config_Schema,
  type Question_BuildAnswerWithBlocks_Config,
  type Question_BuildAnswerWithBlocks_MetadataOverrides,
} from './defineBuildAnswerWithBlocks.schemas';

const metadataSchema = buildAnswerWithBlocks_Config_Schema.omit({ content: true });

/** Validate authored Question metadata and owned child collection boundaries. */
const validate = (candidate: Question_BuildAnswerWithBlocks_Config): void => {
  buildAnswerWithBlocks_Config_Schema.parse(candidate);
  validateCommonContent(candidate.content);
  validateBlockCollection(candidate.content.correctSequence, 'content.correctSequence', true);
  validateBlockCollection(candidate.content.distractors, 'content.distractors');
};

type ContentShape = Question_BuildAnswerWithBlocks_Config['content'];
export type Question_BuildAnswerWithBlocks_Overrides<
  Content extends ContentShape = ContentShape,
  Added extends Record<string, ContentBlock_Configurator> = {},
  Languages extends readonly LanguageCodes[] = [],
> =
  Question_BuildAnswerWithBlocks_MetadataOverrides & {
    content?: QuestionCommonPatch<Content, Added, Languages> & {
      correctSequence?: OrderedBlockPatch<Content['correctSequence']['items'], Added, Languages>;
  distractors?: OrderedBlockPatch<Content['distractors']['items'], Added, Languages>;
    };
  };

/** A Question reuses ContentBlocks but never mutates their publication contexts. */
export const defineBuildAnswerWithBlocks = <
  const Slug extends string,
  const Content extends ContentShape,
  const Languages extends readonly LanguageCodes[] = [],
>(
  config: Omit<Question_BuildAnswerWithBlocks_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: Content & QuestionChildrenSupporting<Languages, Content> & {
      correctSequence: { items: ChildrenSupporting<Languages, Content['correctSequence']['items']> };
    distractors: { items: ChildrenSupporting<Languages, Content['distractors']['items']> };
    };
  } & ConfigWithLanguages<Question_BuildAnswerWithBlocks_Config, Languages>,
) => {
  validate(config);
  const authored = cloneJson(metadataSchema.parse(config));
  const copyMetadata = () => cloneJson(authored);
  const { id, type } = authored;
  const slug = config.slug;
  const initialContent = {
    ...snapshotCommonContent(config.content),
    correctSequence: snapshotBlockCollection(config.content.correctSequence),
    distractors: snapshotBlockCollection(config.content.distractors),
  } as Content;
  // Transitional authored access; never pass these mutable objects into Build.
  const content = {
    ...snapshotCommonContent(initialContent),
    correctSequence: snapshotBlockCollection(initialContent.correctSequence),
    distractors: snapshotBlockCollection(initialContent.distractors),
  } as Content;

  
  const extraContent = (
    source: Content,
    patch?: { correctSequence?: OrderedBlockPatch; distractors?: OrderedBlockPatch },
  ) => {
    const base: Record<string, unknown> = {};
    const locale: Record<string, Record<string, unknown>> = {};
    for (const field of ['correctSequence', 'distractors'] as const) {
      if (patch && patch[field] === undefined) continue;
      const result = resolveBlockCollection(source[field], patch?.[field], 'content.' + field, field === 'correctSequence');
      base[field] = result.base;
      for (const [language, entries] of Object.entries(result.locale)) (locale[language] ??= {})[field] = entries;
    }
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

  const overrides = <const Added extends Record<string, ContentBlock_Configurator> = {}>(
    patch: Question_BuildAnswerWithBlocks_Overrides<Content, Added, Languages>,
  ): QuestionPublication<Record<string, unknown>> => {
    try {
      ensureQuestionPatchShape(patch);
      const metadataPatch = buildAnswerWithBlocks_Override_Config_Schema.parse({
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
          if (!['question', 'hint', 'explanation', 'correctSequence', 'distractors'].includes(key)) {
            throw new Error('Unknown Question content override field: ' + key);
          }
        }
        const common = resolveCommonContent(initialContent, patch.content as QuestionCommonPatch<Content>);
        const extra = (patch.content.correctSequence !== undefined || patch.content.distractors !== undefined) ? extraContent(initialContent, patch.content) : {base:{},locale:{}};
        const changed = { ...common.base, ...extra.base };
        if (Object.keys(changed).length) base.content = changed;
        mergeQuestionContent(files, common.locale, extra.locale);
      }
      return { base, locale: finishFiles(files) };
    } catch (error) {
      throw new Error(
        'Invalid BuildAnswerWithBlocks Question overrides for ' + id + ': ' +
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

export type Question_BuildAnswerWithBlocks_Configurator = ReturnType<typeof defineBuildAnswerWithBlocks>;
