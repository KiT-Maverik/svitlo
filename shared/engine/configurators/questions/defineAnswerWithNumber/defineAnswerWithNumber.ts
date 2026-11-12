import type { DeepPartial, LanguageScope, ChildrenSupporting, ConfigWithLanguages } from '#types';
import type { LanguageCodes } from '#schemas';
import { onlyLocales, onlyStrings } from '../../_shared__configurators';
import {
  cloneJson, finishFiles, isRecord, ensureQuestionPatchShape, mergeQuestionContent,
  projectQuestionLocale, resolveCommonContent, resolveBlockCollection, resolveBlockMap,
  snapshotCommonContent, snapshotBlockCollection, validateBlockCollection, validateCommonContent,
  validateEffectiveQuestionMetadata,
  type OrderedBlockPatch, type QuestionCommonPatch, type QuestionResourcePublication, type QuestionOverridePublication,
} from '../_shared__questions';
import type { ContentBlock_Configurator } from '../../contentBlocks';
import type { QuestionChildrenSupporting } from '../question.schemas';
import {
  answerWithNumber_Config_Schema, answerWithNumber_Override_Config_Schema,
  type Question_AnswerWithNumber_Config,
  type Question_AnswerWithNumber_Props,
  type Question_AnswerWithNumber_MetadataOverrides,
} from './defineAnswerWithNumber.schemas';

const metadataSchema = answerWithNumber_Config_Schema.omit({ content: true });

/** Validate authored Question metadata and owned child collection boundaries. */
const validate = (candidate: Question_AnswerWithNumber_Config): void => {
  answerWithNumber_Config_Schema.parse(candidate);
  validateCommonContent(candidate.content);
  
};

type ContentShape = Question_AnswerWithNumber_Config['content'];
export type Question_AnswerWithNumber_Overrides<
  Content extends ContentShape = ContentShape,
  Added extends Record<string, ContentBlock_Configurator> = {},
  Languages extends readonly LanguageCodes[] = [],
> =
  Question_AnswerWithNumber_MetadataOverrides & {
    content?: QuestionCommonPatch<Content, Added, Languages> & {
      
    };
  };

/** A Question reuses ContentBlocks but never mutates their publication contexts. */
export const defineAnswerWithNumber = <
  const Slug extends string,
  const Content extends ContentShape,
  const Languages extends readonly LanguageCodes[] = [],
>(
  config: Omit<Question_AnswerWithNumber_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: Content & QuestionChildrenSupporting<Languages, Content> & {
      
    };
  } & ConfigWithLanguages<Question_AnswerWithNumber_Config, Languages>,
) => {
  validate(config);
  const authored = cloneJson(metadataSchema.parse(config));
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

  
  const props = (): QuestionResourcePublication<Question_AnswerWithNumber_Props> => {
    const metadata = copyMetadata();
    const own = projectQuestionLocale(metadata.locale);
    const common = resolveCommonContent(initialContent);
    const extra = {base:{},locale:{}};
    const files = own.files;
    mergeQuestionContent(files, common.locale, extra.locale);
    return {
      base: {
        id, slug, type, params: metadata.params,
        ...(Object.keys(own.base).length ? { locale: own.base } : {}),
        content: { ...common.base, ...extra.base },
      },
      locale: finishFiles(files),
    }
  };

  const overrides = <const Added extends Record<string, ContentBlock_Configurator> = {}>(
    patch: Question_AnswerWithNumber_Overrides<Content, Added, Languages>,
  ): QuestionOverridePublication<Question_AnswerWithNumber_Props> => {
    try {
      ensureQuestionPatchShape(patch);
      const metadataPatch = answerWithNumber_Override_Config_Schema.parse({
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
          if (!['question', 'hint', 'explanation'].includes(key)) {
            throw new Error('Unknown Question content override field: ' + key);
          }
        }
        const common = resolveCommonContent(initialContent, patch.content as QuestionCommonPatch<Content>);
        const extra = {base:{},locale:{}};
        const changed = { ...common.base, ...extra.base };
        if (Object.keys(changed).length) base.content = changed;
        mergeQuestionContent(files, common.locale, extra.locale);
      }
      return { base, locale: finishFiles(files) } as QuestionOverridePublication<Question_AnswerWithNumber_Props>;
    } catch (error) {
      throw new Error(
        'Invalid AnswerWithNumber Question overrides for ' + id + ': ' +
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

export type Question_AnswerWithNumber_Configurator = ReturnType<typeof defineAnswerWithNumber>;
