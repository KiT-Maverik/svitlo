import type { DeepPartial, LanguageScope, ChildrenSupporting, ConfigWithLanguages } from '#types';
import type { LanguageCodes } from '#schemas';
import { onlyLocales, onlyStrings } from '../../_shared__configurators';
import {
  cloneJson, finishFiles, isRecord, ensureQuestionPatchShape, mergeQuestionContent,
  projectQuestionLocale, resolveCommonContent, resolveBlockCollection, resolveBlockMap,
  snapshotCommonContent, snapshotBlockCollection, validateBlockCollection, validateCommonContent,
  validateEffectiveQuestionMetadata,
  type OrderedBlockPatch, type ResolvableBlockPatch, type QuestionCommonPatch, type QuestionPublication,
} from '../_shared__questions';
import type { ContentBlock_Configurator } from '../../contentBlocks';
import type { QuestionChildrenSupporting } from '../question.schemas';
import {
  orderSequence_Config_Schema, orderSequence_Override_Config_Schema,
  type Question_OrderSequence_Config,
  type Question_OrderSequence_MetadataOverrides,
} from './defineOrderSequence.schemas';

const metadataSchema = orderSequence_Config_Schema.omit({ content: true });

/** Validate authored Question metadata and owned child collection boundaries. */
const validate = (candidate: Question_OrderSequence_Config): void => {
  orderSequence_Config_Schema.parse(candidate);
  validateCommonContent(candidate.content);
  validateBlockCollection(candidate.content.sequence, 'content.sequence', true);
};

type ContentShape = Question_OrderSequence_Config['content'];
export type Question_OrderSequence_Overrides<
  Content extends ContentShape = ContentShape,
  Added extends Record<string, ContentBlock_Configurator> = {},
  Languages extends readonly LanguageCodes[] = [],
> =
  Question_OrderSequence_MetadataOverrides & {
    content?: QuestionCommonPatch<Content, Added, Languages> & {
      sequence?: OrderedBlockPatch<Content['sequence']['items'], Added, Languages>;
    };
  };

/** A Question reuses ContentBlocks but never mutates their publication contexts. */
export const defineOrderSequence = <
  const Slug extends string,
  const Content extends ContentShape,
  const Languages extends readonly LanguageCodes[] = [],
>(
  config: Omit<Question_OrderSequence_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: Content & QuestionChildrenSupporting<Languages, Content> & {
      sequence: { items: ChildrenSupporting<Languages, Content['sequence']['items']> };
    };
  } & ConfigWithLanguages<Question_OrderSequence_Config, Languages>,
) => {
  validate(config);
  const authored = cloneJson(metadataSchema.parse(config));
  const copyMetadata = () => cloneJson(authored);
  const { id, type } = authored;
  const slug = config.slug;
  const initialContent = {
    ...snapshotCommonContent(config.content),
    sequence: snapshotBlockCollection(config.content.sequence),
  } as Content;
  // Transitional authored access; never pass these mutable objects into Build.
  const content = {
    ...snapshotCommonContent(initialContent),
    sequence: snapshotBlockCollection(initialContent.sequence),
  } as Content;

  
  const extraContent = (
    source: Content,
    patch?: ResolvableBlockPatch,
  ) => {
    const result = resolveBlockCollection(source.sequence, patch, 'content.sequence', true);
    const locale: Record<string, Record<string, unknown>> = {};
    for (const [language, entries] of Object.entries(result.locale)) locale[language] = { sequence: entries };
    return { base: { sequence: result.base }, locale };
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
    patch: Question_OrderSequence_Overrides<Content, Added, Languages>,
  ): QuestionPublication<Record<string, unknown>> => {
    try {
      ensureQuestionPatchShape(patch);
      const metadataPatch = orderSequence_Override_Config_Schema.parse({
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
          if (!['question', 'hint', 'explanation', 'sequence'].includes(key)) {
            throw new Error('Unknown Question content override field: ' + key);
          }
        }
        const common = resolveCommonContent(initialContent, patch.content as QuestionCommonPatch<Content>);
        const extra = patch.content.sequence !== undefined ? extraContent(initialContent, patch.content.sequence) : {base:{},locale:{}};
        const changed = { ...common.base, ...extra.base };
        if (Object.keys(changed).length) base.content = changed;
        mergeQuestionContent(files, common.locale, extra.locale);
      }
      return { base, locale: finishFiles(files) };
    } catch (error) {
      throw new Error(
        'Invalid OrderSequence Question overrides for ' + id + ': ' +
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

export type Question_OrderSequence_Configurator = ReturnType<typeof defineOrderSequence>;
