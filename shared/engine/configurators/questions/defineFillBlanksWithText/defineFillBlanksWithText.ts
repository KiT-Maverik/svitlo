import type { DeepPartial, LanguageScope, ChildrenSupporting, ConfigWithLanguages } from '#types';
import type { LanguageCodes } from '#schemas';
import { onlyLocales, onlyStrings } from '../../_shared__configurators';
import {
  cloneJson, finishFiles, isRecord, ensureQuestionPatchShape, mergeQuestionContent,
  projectQuestionLocale, projectSlotList, resolveCommonContent, resolveBlockCollection, resolveBlockMap,
  snapshotCommonContent, snapshotBlockCollection, validateBlockCollection, validateCommonContent,
  validateEffectiveQuestionMetadata,
  type OrderedBlockPatch, type QuestionCommonPatch, type QuestionPublication,
} from '../_shared__questions';
import type { QuestionChildrenSupporting } from '../question.schemas';
import {
  fillBlanksWithText_Config_Schema, fillBlanksWithText_Override_Config_Schema,
  type Question_FillBlanksWithText_Config,
  type Question_FillBlanksWithText_MetadataOverrides,
} from './defineFillBlanksWithText.schemas';

const metadataSchema = fillBlanksWithText_Config_Schema.omit({ content: true });

/** Validate authored Question metadata and owned child collection boundaries. */
const validate = (candidate: Question_FillBlanksWithText_Config): void => {
  fillBlanksWithText_Config_Schema.parse(candidate);
  validateCommonContent(candidate.content);
  if (!Object.keys(candidate.locale.slots).length) throw new Error('FillBlanksWithText requires at least one slot');
  for (const slot of Object.values(candidate.locale.slots)) {
    if (!Object.keys(slot.correctAnswers).length) throw new Error('Every text slot requires a correct answer');
  }
  
};

type ContentShape = Question_FillBlanksWithText_Config['content'];
export type Question_FillBlanksWithText_Overrides<Content extends ContentShape = ContentShape> =
  Question_FillBlanksWithText_MetadataOverrides & {
    content?: QuestionCommonPatch<Content> & {
      
    };
  };

/** A Question reuses ContentBlocks but never mutates their publication contexts. */
export const defineFillBlanksWithText = <
  const Slug extends string,
  const Content extends ContentShape,
  const Languages extends readonly LanguageCodes[] = [],
>(
  config: Omit<Question_FillBlanksWithText_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: Content & QuestionChildrenSupporting<Languages, Content> & {
      
    };
  } & ConfigWithLanguages<Question_FillBlanksWithText_Config, Languages>,
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
    const localized = projectSlotList(metadata.locale.slots);
    if (localized.base !== undefined) own.base.slots = localized.base;
    for (const [language, values] of Object.entries(localized.locale)) {
      const file = (own.files[language as LanguageCodes] ??= {});
      file.locale = { ...((file.locale ?? {}) as Record<string, unknown>), slots: values };
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
    patch: Question_FillBlanksWithText_Overrides<Content>,
  ): QuestionPublication<Record<string, unknown>> => {
    try {
      ensureQuestionPatchShape(patch);
      const metadataPatch = fillBlanksWithText_Override_Config_Schema.parse({
        ...(patch.params !== undefined ? { params: patch.params } : {}),
        ...(patch.locale !== undefined ? { locale: patch.locale } : {}),
      });
      validateEffectiveQuestionMetadata(copyMetadata(), metadataPatch, candidate => metadataSchema.parse(candidate));
      const own = projectQuestionLocale(
        metadataPatch.locale?.placeholder === undefined ? {} : { placeholder: metadataPatch.locale.placeholder },
      );
      if (metadataPatch.locale?.slots !== undefined) {
        const localized = projectSlotList(
          authored.locale.slots,
          metadataPatch.locale.slots as never,
        );
        if (localized.base !== undefined) own.base.slots = localized.base;
        for (const [language, values] of Object.entries(localized.locale)) {
          const file = (own.files[language as LanguageCodes] ??= {});
          file.locale = { ...((file.locale ?? {}) as Record<string, unknown>), slots: values };
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
        'Invalid FillBlanksWithText Question overrides for ' + id + ': ' +
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

export type Question_FillBlanksWithText_Configurator = ReturnType<typeof defineFillBlanksWithText>;
