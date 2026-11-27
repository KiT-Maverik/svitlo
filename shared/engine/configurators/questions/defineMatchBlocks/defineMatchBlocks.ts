import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type { ChildrenSupporting, ChildSupporting, ConfigWithLanguages, DeepPartial, LanguageScope } from '#types';

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
  resolvePairMap,
  resolvePublicationLanguages,
  resolveSlotBlocks,
  snapshotBlockCollection,
  snapshotCommonContent,
  snapshotNestedCollection,
  validateBlockCollection,
  validateCommonContent,
  validateEffectiveQuestionMetadata,
  validateNestedBlockCollection,
  validateQuestionPublication,
  type OrderedBlockPatch,
  type PublicationLanguageOptions,
  type QuestionCommonPatch,
  type QuestionOverridePublication,
  type QuestionResourcePublication,
} from '../_shared__questions';
import { onlyLocales, onlyStrings, scopeBuild, type AddedPlacementsFromPatch } from '../../_shared__configurators';
import type { ContentBlock_Primitive_Configurator } from '../../contentBlocks';
import type { QuestionChildrenSupporting } from '../question.schemas';
import {
  matchBlocks_Config_Schema,
  matchBlocks_Data_Schema,
  matchBlocks_Override_Config_Schema,
  type Question_MatchBlocks_Config,
  type Question_MatchBlocks_Data,
  type Question_MatchBlocks_MetadataOverrides,
} from './defineMatchBlocks.schemas';

const metadataSchema = matchBlocks_Config_Schema.omit({ content: true });

/** Validate authored Question metadata and owned child collection boundaries. */
const validate = (candidate: Question_MatchBlocks_Config): void => {
  matchBlocks_Config_Schema.parse(candidate);
  validateCommonContent(candidate.content);
  validateNestedBlockCollection(candidate.content.pairs, 'content.pairs', ['left', 'right']);
  if (!candidate.content.pairs.children.length) throw new Error('MatchBlocks requires at least one pair');
};

type ContentShape = Question_MatchBlocks_Config['content'];
type Pair = { left: ContentBlock_Primitive_Configurator; right: ContentBlock_Primitive_Configurator };
type PairMembers<Group extends { children: string[] }> = {
  [Key in Exclude<keyof Group, 'children'>]: Group[Key] extends Pair ? Group[Key] : Pair;
};
type AddedPairsFromPatch<Patch, Content extends ContentShape> =
  Patch extends { content: { pairs: infer Collection } }
    ? AddedPlacementsFromPatch<Collection, PairMembers<Content['pairs']>, Pair, 'children'>
    : {};

type PairsOverride<
  Content extends ContentShape,
  AddedPairs extends Record<string, Pair>,
  Languages extends readonly LanguageCode[],
> = {
  children?: Extract<keyof PairMembers<Content['pairs']> | keyof NoInfer<AddedPairs>, string>[];
} & {
  [Key in keyof PairMembers<Content['pairs']>]?: {
    left?: Parameters<PairMembers<Content['pairs']>[Key]['left']['build']['overrides']>[0];
    right?: Parameters<PairMembers<Content['pairs']>[Key]['right']['build']['overrides']>[0];
  } | false;
} & AddedPairs & {
  [Key in keyof AddedPairs]: {
    left: ChildSupporting<Languages, AddedPairs[Key]['left']>;
    right: ChildSupporting<Languages, AddedPairs[Key]['right']>;
  };
};
export type Question_MatchBlocks_Overrides<
  Content extends ContentShape = ContentShape,
  Added extends Record<string, ContentBlock_Primitive_Configurator> = {},
  Languages extends readonly LanguageCode[] = AllLanguageCodes,
  AddedPairs extends Record<string, Pair> = {},
> = Question_MatchBlocks_MetadataOverrides & {
  content?: QuestionCommonPatch<Content, Added, Languages> & {
    pairs?: PairsOverride<Content, AddedPairs, Languages>;
  };
};

/**
 * Ask learners to match related ContentBlocks in pairs.
 *
 * @remarks
 * Each named entry in `content.pairs` is one genuine
 * `{ left, right }` match. Author the correct semantic pair explicitly;
 * do not rely on two unrelated positional lists matching by index.
 */
export const defineMatchBlocks = <
  const Slug extends string,
  const Content extends ContentShape,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: Omit<Question_MatchBlocks_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: Content &
      QuestionChildrenSupporting<Languages, Content> & {
        pairs: {
          [Key in keyof PairMembers<Content['pairs']>]: {
            left: ChildSupporting<Languages, PairMembers<Content['pairs']>[Key]['left']>;
            right: ChildSupporting<Languages, PairMembers<Content['pairs']>[Key]['right']>;
          };
        };
      };
  } & ConfigWithLanguages<Question_MatchBlocks_Config, Languages>,
) => {
  const { content: _content, ...metadataInput } = config;
  const authored = cloneJson(metadataInput);
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
    languages: readonly LanguageCode[],
    patch?: { children?: string[] } & Record<string, unknown>,
  ) => {
    const result = resolvePairMap(source.pairs, languages, patch as never);
    const locale: Record<string, Record<string, unknown>> = {};
    for (const [language, pairs] of Object.entries(result.locale)) locale[language] = { pairs };
    return { base: Object.keys(result.base).length ? { pairs: result.base } : {}, locale };
  };

  const data = (
    options: PublicationLanguageOptions<Languages>,
  ): QuestionResourcePublication<Question_MatchBlocks_Data> => {
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
    } as unknown as QuestionResourcePublication<Question_MatchBlocks_Data>;
    validateQuestionPublication(matchBlocks_Data_Schema, languages, resource);
    return resource;
  };

  const overridesImplementation = <
    const Patch extends Record<string, unknown>,
    const Added extends Record<string, ContentBlock_Primitive_Configurator> = {},
  >(
    patch: Patch & Question_MatchBlocks_Overrides<Content, Added, Languages, AddedPairsFromPatch<Patch, Content>>,
    options: PublicationLanguageOptions<Languages>,
  ): QuestionOverridePublication<Question_MatchBlocks_Data> => {
    try {
      const languages = resolvePublicationLanguages(options);
      validate({ ...copyMetadata(), content: initialContent });
      ensureQuestionPatchShape(patch);
      const metadataPatch = matchBlocks_Override_Config_Schema.parse({
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
          if (!['question', 'hint', 'explanation', 'pairs'].includes(key)) {
            throw new Error('Unknown Question content override field: ' + key);
          }
        }
        const common = resolveCommonContent(initialContent, languages, patch.content as QuestionCommonPatch<Content>);
        const extra =
          patch.content.pairs !== undefined
            ? extraContent(initialContent, languages, patch.content.pairs)
            : { base: {}, locale: {} };
        const changed = { ...common.base, ...extra.base };
        if (Object.keys(changed).length) base.content = changed;
        mergeQuestionContent(files, common.locale, extra.locale);
      }
      const publication = {
        base,
        locale: finishFiles(files),
      } as QuestionOverridePublication<Question_MatchBlocks_Data>;
      validateQuestionPublication(matchBlocks_Data_Schema, languages, data(options), publication);
      return publication;
    } catch (error) {
      throw new Error(
        'Invalid MatchBlocks Question overrides for ' +
          id +
          ': ' +
          (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const base = { id, slug, type, params: cloneJson(authored.params), locale: onlyStrings(authored.locale) };
  const overrides: {
    <
      const Patch extends Record<string, unknown>,
      const Added extends Record<string, ContentBlock_Primitive_Configurator> = {},
    >(
      patch: Patch & Question_MatchBlocks_Overrides<Content, Added, Languages, AddedPairsFromPatch<Patch, Content>>,
      options: PublicationLanguageOptions<Languages>,
    ): QuestionOverridePublication<Question_MatchBlocks_Data>;
    (
      patch: Question_MatchBlocks_Overrides<Content, {}, Languages, {}>,
      options: PublicationLanguageOptions<Languages>,
    ): QuestionOverridePublication<Question_MatchBlocks_Data>;
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

export type Question_MatchBlocks_Configurator = ReturnType<typeof defineMatchBlocks>;
