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
  type BlockMembers,
  type OrderedBlockPatch,
  type PublicationLanguageOptions,
  type QuestionCommonPatch,
  type QuestionOverridePublication,
  type QuestionResourcePublication,
  type ResolvableBlockPatch,
} from '../_shared__questions';
import { onlyLocales, onlyStrings, scopeBuild, type AddedPlacementsFromPatch } from '../../_shared__configurators';
import type { ContentBlock_Primitive_Configurator } from '../../contentBlocks';
import type { QuestionChildrenSupporting } from '../question.schemas';
import {
  fillBlanksWithBlocks_Config_Schema,
  fillBlanksWithBlocks_Data_Schema,
  fillBlanksWithBlocks_Override_Config_Schema,
  type Question_FillBlanksWithBlocks_Config,
  type Question_FillBlanksWithBlocks_Data,
  type Question_FillBlanksWithBlocks_MetadataOverrides,
} from './defineFillBlanksWithBlocks.schemas';

const metadataSchema = fillBlanksWithBlocks_Config_Schema.omit({ content: true });

/** Validate authored Question metadata and owned child collection boundaries. */
const validate = (candidate: Question_FillBlanksWithBlocks_Config): void => {
  fillBlanksWithBlocks_Config_Schema.parse(candidate);
  validateCommonContent(candidate.content);
  validateNestedBlockCollection(candidate.content.slots, 'content.slots', ['correctAnswer']);
  if (!candidate.content.slots.children.length) throw new Error('FillBlanksWithBlocks requires at least one slot');
  validateBlockCollection(candidate.content.distractors, 'content.distractors');
};

type ContentShape = Question_FillBlanksWithBlocks_Config['content'];
type SlotBlock = { correctAnswer: ContentBlock_Primitive_Configurator };
type SlotBlockMembers<Group extends { children: string[] }> = {
  [Key in Exclude<keyof Group, 'children'>]: Group[Key] extends SlotBlock ? Group[Key] : SlotBlock;
};
type AddedSlotsFromPatch<Patch, Content extends ContentShape> =
  Patch extends { content: { slots: infer Collection } }
    ? AddedPlacementsFromPatch<Collection, SlotBlockMembers<Content['slots']>, SlotBlock, 'children'>
    : {};

type SlotBlocksOverride<
  Content extends ContentShape,
  AddedSlots extends Record<string, SlotBlock>,
  Languages extends readonly LanguageCode[],
> = {
  children?: Extract<keyof SlotBlockMembers<Content['slots']> | keyof NoInfer<AddedSlots>, string>[];
} & {
  [Key in keyof SlotBlockMembers<Content['slots']>]?: {
    correctAnswer?: Parameters<SlotBlockMembers<Content['slots']>[Key]['correctAnswer']['build']['overrides']>[0];
  } | false;
} & AddedSlots & {
  [Key in keyof AddedSlots]: {
    correctAnswer: ChildSupporting<Languages, AddedSlots[Key]['correctAnswer']>;
  };
};
export type Question_FillBlanksWithBlocks_Overrides<
  Content extends ContentShape = ContentShape,
  Added extends Record<string, ContentBlock_Primitive_Configurator> = {},
  Languages extends readonly LanguageCode[] = AllLanguageCodes,
  AddedSlots extends Record<string, SlotBlock> = {},
> = Question_FillBlanksWithBlocks_MetadataOverrides & {
  content?: QuestionCommonPatch<Content, Added, Languages> & {
    slots?: SlotBlocksOverride<Content, AddedSlots, Languages>;
    distractors?: OrderedBlockPatch<BlockMembers<Content['distractors']>, Added, Languages>;
  };
};

/**
 * Author named gaps whose correct answers are ContentBlocks.
 *
 * @remarks
 * Each entry in `content.slots` owns one `correctAnswer`
 * configurator. Use `content.distractors` for plausible incorrect blocks.
 * The slots define where the correct blocks belong, so keep at least one
 * active slot and use meaningful stable slot names.
 */
export const defineFillBlanksWithBlocks = <
  const Slug extends string,
  const Content extends ContentShape,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: Omit<Question_FillBlanksWithBlocks_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: Content &
      QuestionChildrenSupporting<Languages, Content> & {
        slots: {
          [Key in keyof SlotBlockMembers<Content['slots']>]: {
            correctAnswer: ChildSupporting<Languages, SlotBlockMembers<Content['slots']>[Key]['correctAnswer']>;
          };
        };
        distractors: ChildrenSupporting<Languages, BlockMembers<Content['distractors']>>;
      };
  } & ConfigWithLanguages<Question_FillBlanksWithBlocks_Config, Languages>,
) => {
  const { content: _content, ...metadataInput } = config;
  const authored = cloneJson(metadataInput);
  const copyMetadata = () => cloneJson(authored);
  const { id, type } = authored;
  const slug = config.slug;
  const initialContent = {
    ...snapshotCommonContent(config.content),
    slots: snapshotNestedCollection(config.content.slots),
    distractors: snapshotBlockCollection(config.content.distractors),
  } as Content;
  const content = {
    ...snapshotCommonContent(initialContent),
    slots: snapshotNestedCollection(initialContent.slots),
    distractors: snapshotBlockCollection(initialContent.distractors),
  } as Content;

  const extraContent = (
    source: Content,
    languages: readonly LanguageCode[],
    patch?: {
      slots?: { children?: string[]; [key: string]: unknown };
      distractors?: ResolvableBlockPatch;
    },
  ) => {
    const base: Record<string, unknown> = {};
    const locale: Record<string, Record<string, unknown>> = {};
    if (!patch || patch.slots !== undefined) {
      const result = resolveSlotBlocks(source.slots, languages, patch?.slots as never);
      if (Object.keys(result.base).length) base.slots = result.base;
      for (const [language, slots] of Object.entries(result.locale)) (locale[language] ??= {}).slots = slots;
    }
    if (!patch || patch.distractors !== undefined) {
      const result = resolveBlockCollection(source.distractors, languages, patch?.distractors, 'content.distractors');
      if (Object.keys(result.base).length) base.distractors = result.base;
      for (const [language, entries] of Object.entries(result.locale)) (locale[language] ??= {}).distractors = entries;
    }
    return { base, locale };
  };

  const data = (
    options: PublicationLanguageOptions<Languages>,
  ): QuestionResourcePublication<Question_FillBlanksWithBlocks_Data> => {
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
    } as unknown as QuestionResourcePublication<Question_FillBlanksWithBlocks_Data>;
    validateQuestionPublication(fillBlanksWithBlocks_Data_Schema, languages, resource);
    return resource;
  };

  const overridesImplementation = <
    const Patch extends Record<string, unknown>,
    const Added extends Record<string, ContentBlock_Primitive_Configurator> = {},
  >(
    patch: Patch & Question_FillBlanksWithBlocks_Overrides<Content, Added, Languages, AddedSlotsFromPatch<Patch, Content>>,
    options: PublicationLanguageOptions<Languages>,
  ): QuestionOverridePublication<Question_FillBlanksWithBlocks_Data> => {
    try {
      const languages = resolvePublicationLanguages(options);
      validate({ ...copyMetadata(), content: initialContent });
      ensureQuestionPatchShape(patch);
      const metadataPatch = fillBlanksWithBlocks_Override_Config_Schema.parse({
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
          if (!['question', 'hint', 'explanation', 'slots', 'distractors'].includes(key)) {
            throw new Error('Unknown Question content override field: ' + key);
          }
        }
        const common = resolveCommonContent(initialContent, languages, patch.content as QuestionCommonPatch<Content>);
        const extra =
          patch.content.slots !== undefined || patch.content.distractors !== undefined
            ? extraContent(initialContent, languages, patch.content)
            : { base: {}, locale: {} };
        const changed = { ...common.base, ...extra.base };
        if (Object.keys(changed).length) base.content = changed;
        mergeQuestionContent(files, common.locale, extra.locale);
      }
      const publication = {
        base,
        locale: finishFiles(files),
      } as QuestionOverridePublication<Question_FillBlanksWithBlocks_Data>;
      validateQuestionPublication(fillBlanksWithBlocks_Data_Schema, languages, data(options), publication);
      return publication;
    } catch (error) {
      throw new Error(
        'Invalid FillBlanksWithBlocks Question overrides for ' +
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
      patch: Patch & Question_FillBlanksWithBlocks_Overrides<Content, Added, Languages, AddedSlotsFromPatch<Patch, Content>>,
      options: PublicationLanguageOptions<Languages>,
    ): QuestionOverridePublication<Question_FillBlanksWithBlocks_Data>;
    (
      patch: Question_FillBlanksWithBlocks_Overrides<Content, {}, Languages, {}>,
      options: PublicationLanguageOptions<Languages>,
    ): QuestionOverridePublication<Question_FillBlanksWithBlocks_Data>;
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

export type Question_FillBlanksWithBlocks_Configurator = ReturnType<typeof defineFillBlanksWithBlocks>;
