import type { DeepPartial, LanguageScope, ChildrenSupporting, ChildSupporting, ConfigWithLanguages } from '#types';
import type { LanguageCodes } from '#schemas';
import { onlyLocales, onlyStrings } from '../../_shared__configurators';
import {
  cloneJson, finishFiles, isRecord, ensureQuestionPatchShape, mergeQuestionContent,
  projectQuestionLocale, resolveCommonContent, resolveBlockCollection, resolveBlockMap, resolvePairMap, resolveSlotBlocks,
  snapshotCommonContent, snapshotBlockCollection, snapshotNestedCollection, validateNestedBlockCollection, validateBlockCollection, validateCommonContent,
  validateEffectiveQuestionMetadata,
  type OrderedBlockPatch, type QuestionCommonPatch, type QuestionPublication,
} from '../_shared__questions';
import type { ContentBlock_Configurator } from '../../contentBlocks';
import type { QuestionChildrenSupporting } from '../question.schemas';
import {
  matchBlocks_Config_Schema, matchBlocks_Override_Config_Schema,
  type Question_MatchBlocks_Config,
  type Question_MatchBlocks_MetadataOverrides,
} from './defineMatchBlocks.schemas';

const metadataSchema = matchBlocks_Config_Schema.omit({ content: true });

/** Validate authored Question metadata and owned child collection boundaries. */
const validate = (candidate: Question_MatchBlocks_Config): void => {
  matchBlocks_Config_Schema.parse(candidate);
  validateCommonContent(candidate.content);
  validateNestedBlockCollection(candidate.content.pairs, 'content.pairs', ['left', 'right']);
};

type ContentShape = Question_MatchBlocks_Config['content'];
export type Question_MatchBlocks_Overrides<Content extends ContentShape = ContentShape> =
  Question_MatchBlocks_MetadataOverrides & {
    content?: QuestionCommonPatch<Content> & {
      pairs?: {
  items?: { [Key in keyof Content['pairs']['items']]?:
    { left?: Parameters<Content['pairs']['items'][Key]['left']['build']['overrides']>[0];
      right?: Parameters<Content['pairs']['items'][Key]['right']['build']['overrides']>[0] } | false };
  additionalItems?: Record<string, { left: ContentBlock_Configurator; right: ContentBlock_Configurator }>;
  order?: string[];
};
    };
  };

/** A Question reuses ContentBlocks but never mutates their publication contexts. */
export const defineMatchBlocks = <
  const Slug extends string,
  const Content extends ContentShape,
  const Languages extends readonly LanguageCodes[] = [],
>(
  config: Omit<Question_MatchBlocks_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: Content & QuestionChildrenSupporting<Languages, Content> & {
      pairs: { items: { [Key in keyof Content['pairs']['items']]: {
  left: ChildSupporting<Languages, Content['pairs']['items'][Key]['left']>;
  right: ChildSupporting<Languages, Content['pairs']['items'][Key]['right']>;
} } };
    };
  } & ConfigWithLanguages<Question_MatchBlocks_Config, Languages>,
) => {
  validate(config);
  const authored = cloneJson(metadataSchema.parse(config));
  const copyMetadata = () => cloneJson(authored);
  const { id, type } = authored;
  const slug = config.slug;
  const initialContent = {
    ...snapshotCommonContent(config.content),
    pairs: snapshotNestedCollection(config.content.pairs),
  } as Content;
  const content = {
    ...snapshotCommonContent(initialContent),
    pairs: snapshotNestedCollection(initialContent.pairs),
  } as Content;

  const extraContent = (
    source: Content,
    patch?: NonNullable<Question_MatchBlocks_Overrides<Content>['content']>['pairs'],
  ) => {
    const result = resolvePairMap(source.pairs, patch as never);
    const locale: Record<string, Record<string, unknown>> = {};
    for (const [language, pairs] of Object.entries(result.locale)) locale[language] = { pairs };
    return { base: { pairs: result.base }, locale };
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
    patch: Question_MatchBlocks_Overrides<Content>,
  ): QuestionPublication<Record<string, unknown>> => {
    try {
      ensureQuestionPatchShape(patch);
      const metadataPatch = matchBlocks_Override_Config_Schema.parse({
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
          if (!['question', 'hint', 'explanation', 'pairs'].includes(key)) {
            throw new Error('Unknown Question content override field: ' + key);
          }
        }
        const common = resolveCommonContent(initialContent, patch.content as QuestionCommonPatch<Content>);
        const extra = patch.content.pairs !== undefined ? extraContent(initialContent, patch.content.pairs) : {base:{},locale:{}};
        const changed = { ...common.base, ...extra.base };
        if (Object.keys(changed).length) base.content = changed;
        mergeQuestionContent(files, common.locale, extra.locale);
      }
      return { base, locale: finishFiles(files) };
    } catch (error) {
      throw new Error(
        'Invalid MatchBlocks Question overrides for ' + id + ': ' +
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

export type Question_MatchBlocks_Configurator = ReturnType<typeof defineMatchBlocks>;
