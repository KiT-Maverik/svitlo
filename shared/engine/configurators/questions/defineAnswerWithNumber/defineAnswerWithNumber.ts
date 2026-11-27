import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type { ChildrenSupporting, ConfigWithLanguages, DeepPartial, LanguageScope } from '#types';

import {
  cloneJson,
  ensureQuestionPatchShape,
  finishFiles,
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
  type OrderedBlockPatch,
  type BlockMembers,
  type PublicationLanguageOptions,
  type QuestionCommonPatch,
  type QuestionOverridePublication,
  type QuestionResourcePublication,
} from '../_shared__questions';
import { onlyLocales, onlyStrings, scopeBuild, type AddedPlacementsFromPatch } from '../../_shared__configurators';
import type { ContentBlock_Primitive_Configurator } from '../../contentBlocks';
import type { QuestionChildrenSupporting } from '../question.schemas';
import {
  answerWithNumber_Config_Schema,
  answerWithNumber_Data_Schema,
  answerWithNumber_Override_Config_Schema,
  type Question_AnswerWithNumber_Config,
  type Question_AnswerWithNumber_Data,
  type Question_AnswerWithNumber_MetadataOverrides,
} from './defineAnswerWithNumber.schemas';

const metadataSchema = answerWithNumber_Config_Schema.omit({ content: true });

/** Validate authored Question metadata and owned child collection boundaries. */
const validate = (candidate: Question_AnswerWithNumber_Config): void => {
  answerWithNumber_Config_Schema.parse(candidate);
  validateCommonContent(candidate.content);
};

type ContentShape = Question_AnswerWithNumber_Config['content'];
type AddedPromptBlocksFromPatch<Patch, Content extends ContentShape> =
  Patch extends { content: { question: infer Collection } }
    ? AddedPlacementsFromPatch<Collection, Content['question'], ContentBlock_Primitive_Configurator, 'children'>
    : {};
export type Question_AnswerWithNumber_Overrides<
  Content extends ContentShape = ContentShape,
  Added extends Record<string, ContentBlock_Primitive_Configurator> = {},
  Languages extends readonly LanguageCode[] = AllLanguageCodes,
> = Question_AnswerWithNumber_MetadataOverrides & {
  content?: QuestionCommonPatch<Content, Added, Languages> & {};
};

/**
 * Ask learners for a numeric result.
 *
 * @remarks
 * Put acceptable numeric values in `params.correctAnswers`, not localized
 * text strings. The localized placeholder describes the expected input,
 * but it does not define an accepted answer.
 */
export const defineAnswerWithNumber = <
  const Slug extends string,
  const Content extends ContentShape,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: Omit<Question_AnswerWithNumber_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: Content & QuestionChildrenSupporting<Languages, Content> & {};
  } & ConfigWithLanguages<Question_AnswerWithNumber_Config, Languages>,
) => {
  const { content: _content, ...metadataInput } = config;
  const authored = cloneJson(metadataInput);
  const copyMetadata = () => cloneJson(authored);
  const { id, type } = authored;
  const slug = config.slug;
  const initialContent = {
    ...snapshotCommonContent(config.content),
  } as Content;
  // Transitional authored access; never pass these mutable objects into Build.
  const content = {
    ...snapshotCommonContent(initialContent),
  } as Content;

  const data = (
    options: PublicationLanguageOptions<Languages>,
  ): QuestionResourcePublication<Question_AnswerWithNumber_Data> => {
    const languages = resolvePublicationLanguages(options);
    validate({ ...copyMetadata(), content: initialContent });
    const metadata = copyMetadata();
    const own = projectQuestionLocale(metadata.locale, languages);
    const common = resolveCommonContent(initialContent, languages);
    const extra = { base: {}, locale: {} };
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
    } as unknown as QuestionResourcePublication<Question_AnswerWithNumber_Data>;
    validateQuestionPublication(answerWithNumber_Data_Schema, languages, resource);
    return resource;
  };

  const overridesImplementation = <const Added extends Record<string, ContentBlock_Primitive_Configurator> = {}>(
    patch: Question_AnswerWithNumber_Overrides<Content, Added, Languages>,
    options: PublicationLanguageOptions<Languages>,
  ): QuestionOverridePublication<Question_AnswerWithNumber_Data> => {
    try {
      const languages = resolvePublicationLanguages(options);
      validate({ ...copyMetadata(), content: initialContent });
      ensureQuestionPatchShape(patch);
      const metadataPatch = answerWithNumber_Override_Config_Schema.parse({
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
          if (!['question', 'hint', 'explanation'].includes(key)) {
            throw new Error('Unknown Question content override field: ' + key);
          }
        }
        const common = resolveCommonContent(initialContent, languages, patch.content as QuestionCommonPatch<Content>);
        const extra = { base: {}, locale: {} };
        const changed = { ...common.base, ...extra.base };
        if (Object.keys(changed).length) base.content = changed;
        mergeQuestionContent(files, common.locale, extra.locale);
      }
      const publication = {
        base,
        locale: finishFiles(files),
      } as QuestionOverridePublication<Question_AnswerWithNumber_Data>;
      validateQuestionPublication(answerWithNumber_Data_Schema, languages, data(options), publication);
      return publication;
    } catch (error) {
      throw new Error(
        'Invalid AnswerWithNumber Question overrides for ' +
          id +
          ': ' +
          (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const base = { id, slug, type, params: cloneJson(authored.params), locale: onlyStrings(authored.locale) };
  /** Preserve the exact existing-child override call alongside inferred additions. */
  const overrides: {
    <const Patch extends Record<string, unknown>>(
      patch: Patch & Question_AnswerWithNumber_Overrides<Content, AddedPromptBlocksFromPatch<Patch, Content>, Languages>,
      options: PublicationLanguageOptions<Languages>,
    ): QuestionOverridePublication<Question_AnswerWithNumber_Data>;
    <const Added extends Record<string, ContentBlock_Primitive_Configurator>>(
      patch: Question_AnswerWithNumber_Overrides<Content, Added, Languages>,
      options: PublicationLanguageOptions<Languages>,
    ): QuestionOverridePublication<Question_AnswerWithNumber_Data>;
    (
      patch: Question_AnswerWithNumber_Overrides<Content, {}, Languages>,
      options: PublicationLanguageOptions<Languages>,
    ): QuestionOverridePublication<Question_AnswerWithNumber_Data>;
  } = overridesImplementation;

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

export type Question_AnswerWithNumber_Configurator = ReturnType<typeof defineAnswerWithNumber>;
