import type { DeepPartial, LanguageScope, ChildrenSupporting, ConfigWithLanguages } from '#types';
import type { LanguageCodes } from '#schemas';
import { onlyLocales, onlyStrings } from '../../_shared__configurators';
import {
  cloneJson, finishFiles, isRecord, ensureQuestionPatchShape, mergeQuestionContent,
  projectQuestionLocale, projectAnswerList, resolveCommonContent, resolveBlockCollection, resolveBlockMap,
  snapshotCommonContent, snapshotBlockCollection, validateBlockCollection, validateCommonContent,
  validateEffectiveQuestionMetadata,
  type OrderedBlockPatch, type QuestionCommonPatch, type QuestionPublication,
} from '../_shared__questions';
import type { QuestionChildrenSupporting } from '../question.schemas';
import {
  answerWithText_Config_Schema, answerWithText_Override_Config_Schema,
  type Question_AnswerWithText_Config,
  type Question_AnswerWithText_MetadataOverrides,
} from './defineAnswerWithText.schemas';

const metadataSchema = answerWithText_Config_Schema.omit({ content: true });

/** Validate authored Question metadata and owned child collection boundaries. */
const validate = (candidate: Question_AnswerWithText_Config): void => {
  answerWithText_Config_Schema.parse(candidate);
  validateCommonContent(candidate.content);
  if (!Object.keys(candidate.locale.correctAnswers).length) {
    throw new Error('AnswerWithText requires at least one correct answer');
  }
  
};

type ContentShape = Question_AnswerWithText_Config['content'];
export type Question_AnswerWithText_Overrides<Content extends ContentShape = ContentShape> =
  Question_AnswerWithText_MetadataOverrides & {
    content?: QuestionCommonPatch<Content> & {
      
    };
  };

/** A Question reuses ContentBlocks but never mutates their publication contexts. */
export const defineAnswerWithText = <
  const Slug extends string,
  const Content extends ContentShape,
  const Languages extends readonly LanguageCodes[] = [],
>(
  config: Omit<Question_AnswerWithText_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: Content & QuestionChildrenSupporting<Languages, Content> & {
      
    };
  } & ConfigWithLanguages<Question_AnswerWithText_Config, Languages>,
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

  
  const props = (): QuestionPublication<Record<string, unknown>> => {
    const metadata = copyMetadata();
    const own = projectQuestionLocale({ placeholder: metadata.locale.placeholder });
    const localized = projectAnswerList(metadata.locale.correctAnswers);
    if (localized.base !== undefined) own.base.correctAnswers = localized.base;
    for (const [language, values] of Object.entries(localized.locale)) {
      const file = (own.files[language as LanguageCodes] ??= {});
      file.locale = { ...((file.locale ?? {}) as Record<string, unknown>), correctAnswers: values };
    }
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
    };
  };

  const overrides = (
    patch: Question_AnswerWithText_Overrides<Content>,
  ): QuestionPublication<Record<string, unknown>> => {
    try {
      ensureQuestionPatchShape(patch);
      const metadataPatch = answerWithText_Override_Config_Schema.parse({
        ...(patch.params !== undefined ? { params: patch.params } : {}),
        ...(patch.locale !== undefined ? { locale: patch.locale } : {}),
      });
      validateEffectiveQuestionMetadata(copyMetadata(), metadataPatch, candidate => metadataSchema.parse(candidate));
      const own = projectQuestionLocale(
        metadataPatch.locale?.placeholder === undefined ? {} : { placeholder: metadataPatch.locale.placeholder },
      );
      if (metadataPatch.locale?.correctAnswers !== undefined) {
        const localized = projectAnswerList(
          authored.locale.correctAnswers,
          metadataPatch.locale.correctAnswers as never,
        );
        if (localized.base !== undefined) own.base.correctAnswers = localized.base;
        for (const [language, values] of Object.entries(localized.locale)) {
          const file = (own.files[language as LanguageCodes] ??= {});
          file.locale = { ...((file.locale ?? {}) as Record<string, unknown>), correctAnswers: values };
        }
      }
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
      return { base, locale: finishFiles(files) };
    } catch (error) {
      throw new Error(
        'Invalid AnswerWithText Question overrides for ' + id + ': ' +
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

export type Question_AnswerWithText_Configurator = ReturnType<typeof defineAnswerWithText>;
