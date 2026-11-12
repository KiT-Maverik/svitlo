import type { DeepPartial, LanguageScope, ChildrenSupporting, ChildSupporting, ConfigWithLanguages } from '#types';
import type { LanguageCodes } from '#schemas';
import { onlyLocales, onlyStrings } from '../../_shared__configurators';
import {
  cloneJson, finishFiles, isRecord, ensureQuestionPatchShape, mergeQuestionContent,
  projectQuestionLocale, resolveCommonContent, resolveBlockCollection, resolveBlockMap, resolvePairMap, resolveSlotBlocks,
  snapshotCommonContent, snapshotBlockCollection, snapshotNestedCollection, validateNestedBlockCollection, validateBlockCollection, validateCommonContent,
  validateEffectiveQuestionMetadata,
  type OrderedBlockPatch, type ResolvableBlockPatch, type QuestionCommonPatch, type QuestionResourcePublication, type QuestionOverridePublication,
} from '../_shared__questions';
import type { ContentBlock_Configurator } from '../../contentBlocks';
import type { QuestionChildrenSupporting } from '../question.schemas';
import {
  fillBlanksWithBlocks_Config_Schema, fillBlanksWithBlocks_Override_Config_Schema,
  type Question_FillBlanksWithBlocks_Config,
  type Question_FillBlanksWithBlocks_Props,
  type Question_FillBlanksWithBlocks_MetadataOverrides,
} from './defineFillBlanksWithBlocks.schemas';

const metadataSchema = fillBlanksWithBlocks_Config_Schema.omit({ content: true });

/** Validate authored Question metadata and owned child collection boundaries. */
const validate = (candidate: Question_FillBlanksWithBlocks_Config): void => {
  fillBlanksWithBlocks_Config_Schema.parse(candidate);
  validateCommonContent(candidate.content);
  validateNestedBlockCollection(candidate.content.slots, 'content.slots', ['correctAnswer']);
  if (!candidate.content.slots.order.length) throw new Error('FillBlanksWithBlocks requires at least one slot');
  validateBlockCollection(candidate.content.distractors, 'content.distractors');
};

type ContentShape = Question_FillBlanksWithBlocks_Config['content'];
type SlotBlock = { correctAnswer: ContentBlock_Configurator };
type SlotBlocksOverride<
  Content extends ContentShape,
  AddedSlots extends Record<string, SlotBlock>,
  Languages extends readonly LanguageCodes[],
> = {
  items?: { [Key in keyof Content['slots']['items']]?:
    { correctAnswer?: Parameters<Content['slots']['items'][Key]['correctAnswer']['build']['overrides']>[0] } | false };
  additionalItems?: AddedSlots & {
    [Key in keyof AddedSlots]: {
      correctAnswer: ChildSupporting<Languages, AddedSlots[Key]['correctAnswer']>;
    };
  } & { [Key in keyof Content['slots']['items']]?: never };
  order?: Extract<keyof Content['slots']['items'] | keyof NoInfer<AddedSlots>, string>[];
};
export type Question_FillBlanksWithBlocks_Overrides<
  Content extends ContentShape = ContentShape,
  Added extends Record<string, ContentBlock_Configurator> = {},
  Languages extends readonly LanguageCodes[] = [],
  AddedSlots extends Record<string, SlotBlock> = {},
> =
  Question_FillBlanksWithBlocks_MetadataOverrides & {
    content?: QuestionCommonPatch<Content, Added, Languages> & {
      slots?: SlotBlocksOverride<Content, AddedSlots, Languages>;
distractors?: OrderedBlockPatch<Content['distractors']['items'], Added, Languages>;
    };
  };

/** A Question reuses ContentBlocks but never mutates their publication contexts. */
export const defineFillBlanksWithBlocks = <
  const Slug extends string,
  const Content extends ContentShape,
  const Languages extends readonly LanguageCodes[] = [],
>(
  config: Omit<Question_FillBlanksWithBlocks_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: Content & QuestionChildrenSupporting<Languages, Content> & {
      slots: { items: { [Key in keyof Content['slots']['items']]: {
  correctAnswer: ChildSupporting<Languages, Content['slots']['items'][Key]['correctAnswer']>;
} } };
distractors: { items: ChildrenSupporting<Languages, Content['distractors']['items']> };
    };
  } & ConfigWithLanguages<Question_FillBlanksWithBlocks_Config, Languages>,
) => {
  validate(config);
  const authored = cloneJson(metadataSchema.parse(config));
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
    patch?: { slots?: {items?: Record<string, Record<string, unknown> | false>;additionalItems?: Record<string, {correctAnswer: ContentBlock_Configurator}>;order?: string[]}; distractors?: ResolvableBlockPatch },
  ) => {
    const base: Record<string, unknown> = {};
    const locale: Record<string, Record<string, unknown>> = {};
    if (!patch || patch.slots !== undefined) {
      const result = resolveSlotBlocks(source.slots, patch?.slots as never);
      base.slots = result.base;
      for (const [language, slots] of Object.entries(result.locale)) (locale[language] ??= {}).slots = slots;
    }
    if (!patch || patch.distractors !== undefined) {
      const result = resolveBlockCollection(source.distractors, patch?.distractors, 'content.distractors');
      base.distractors = result.base;
      for (const [language, entries] of Object.entries(result.locale)) (locale[language] ??= {}).distractors = entries;
    }
    return { base, locale };
  };

  const props = (): QuestionResourcePublication<Question_FillBlanksWithBlocks_Props> => {
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
    }
  };

  const overrides = <
    const Added extends Record<string, ContentBlock_Configurator> = {},
    const AddedSlots extends Record<string, SlotBlock> = {},
  >(
    patch: Question_FillBlanksWithBlocks_Overrides<Content, Added, Languages, AddedSlots>,
  ): QuestionOverridePublication<Question_FillBlanksWithBlocks_Props> => {
    try {
      ensureQuestionPatchShape(patch);
      const metadataPatch = fillBlanksWithBlocks_Override_Config_Schema.parse({
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
          if (!['question', 'hint', 'explanation', 'slots', 'distractors'].includes(key)) {
            throw new Error('Unknown Question content override field: ' + key);
          }
        }
        const common = resolveCommonContent(initialContent, patch.content as QuestionCommonPatch<Content>);
        const extra = (patch.content.slots !== undefined || patch.content.distractors !== undefined) ?
          extraContent(initialContent, patch.content) : {base:{},locale:{}};
        const changed = { ...common.base, ...extra.base };
        if (Object.keys(changed).length) base.content = changed;
        mergeQuestionContent(files, common.locale, extra.locale);
      }
      return { base, locale: finishFiles(files) } as QuestionOverridePublication<Question_FillBlanksWithBlocks_Props>;
    } catch (error) {
      throw new Error(
        'Invalid FillBlanksWithBlocks Question overrides for ' + id + ': ' +
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

export type Question_FillBlanksWithBlocks_Configurator = ReturnType<typeof defineFillBlanksWithBlocks>;
