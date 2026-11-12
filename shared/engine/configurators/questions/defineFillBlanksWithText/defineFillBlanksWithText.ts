import type { ConfigWithLanguages, DeepPartial, LanguageScope, RequireLanguages } from '#types';
import type { LanguageCodes } from '#schemas';
import { deepStrict_Schema, camelCase_Schema } from '#schemas';
import { z } from 'zod';

import {
  mergeForValidation,
  onlyLocales,
  onlyStrings,
  validateOrderedKeys,
} from '../../_shared__configurators';
import {
  cloneJson,
  ensureQuestionPatchShape,
  finishFiles,
  isRecord,
  mergeQuestionContent,
  projectQuestionLocale,
  projectSlotList,
  resolveCommonContent,
  snapshotCommonContent,
  validateCommonContent,
  validateEffectiveQuestionMetadata,
  type QuestionCommonPatch,
  type QuestionResourcePublication, type QuestionOverridePublication,
  resolvePublicationLanguages, validateQuestionPublication, type PublicationLanguageOptions,
} from '../_shared__questions';
import type { ContentBlock_Configurator } from '../../contentBlocks';
import type { QuestionChildrenSupporting } from '../question.schemas';
import {
  fillBlanksWithText_Config_Schema,
  fillBlanksWithText_Override_Config_Schema,
  type Question_FillBlanksWithText_Config,
  fillBlanksWithText_Props_Schema,
  type Question_FillBlanksWithText_Props,
  type Question_FillBlanksWithText_MetadataOverrides,
} from './defineFillBlanksWithText.schemas';

type ContentShape = Question_FillBlanksWithText_Config['content'];
type Slot = ContentShape['slots']['items'][string];
type SlotMap = ContentShape['slots']['items'];
type SlotChanges<Content extends ContentShape> = {
  [Key in keyof Content['slots']['items']]?: DeepPartial<Content['slots']['items'][Key]> | false;
};
type SlotsOverride<
  Content extends ContentShape,
  AddedSlots extends Record<string, Slot>,
  Languages extends readonly LanguageCodes[],
> = {
  items?: SlotChanges<Content>;
  additionalItems?: AddedSlots & RequireLanguages<AddedSlots, Languages> &
    { [Key in keyof Content['slots']['items']]?: never };
  order?: Extract<keyof Content['slots']['items'] | keyof NoInfer<AddedSlots>, string>[];
};
export type Question_FillBlanksWithText_Overrides<
  Content extends ContentShape = ContentShape,
  Added extends Record<string, ContentBlock_Configurator> = {},
  Languages extends readonly LanguageCodes[] = [],
  AddedSlots extends Record<string, Slot> = {},
> =
  Question_FillBlanksWithText_MetadataOverrides & {
    content?: QuestionCommonPatch<Content, Added, Languages> & {
      slots?: SlotsOverride<Content, AddedSlots, Languages>;
    };
  };

const metadataSchema = fillBlanksWithText_Config_Schema.omit({ content: true });
const slotSchema = fillBlanksWithText_Config_Schema.shape.content.shape.slots.shape.items.valueType;
const slotPatchSchema: z.ZodType<DeepPartial<Slot>> = z.deepPartial(deepStrict_Schema(slotSchema));

const validateSlots = (value: ContentShape['slots']): void => {
  const issues = validateOrderedKeys(value, { path: 'content.slots', requireNonEmpty: true });
  if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
  if (!value.order.length) throw new Error('FillBlanksWithText requires at least one slot');
  for (const [selector, item] of Object.entries(value.items)) {
    camelCase_Schema.parse(selector);
    slotSchema.parse(item);
  }
};

const validate = (candidate: Question_FillBlanksWithText_Config): void => {
  fillBlanksWithText_Config_Schema.parse(candidate);
  validateCommonContent(candidate.content);
  validateSlots(candidate.content.slots);
};

/** A named authored slot is never a positional locale override. */
export const defineFillBlanksWithText = <
  const Slug extends string,
  const Content extends ContentShape,
  const Languages extends readonly LanguageCodes[] = [],
>(
  config: Omit<Question_FillBlanksWithText_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: Content & QuestionChildrenSupporting<Languages, Content> & {
      slots: RequireLanguages<Content['slots'], Languages>;
    };
  } & ConfigWithLanguages<Question_FillBlanksWithText_Config, Languages>,
) => {
  validate(config);
  const authored = cloneJson(metadataSchema.parse(config));
  const { id, type } = authored;
  const slug = config.slug;
  const copyMetadata = () => cloneJson(authored);
  const initialContent = {
    ...snapshotCommonContent(config.content),
    slots: {
      items: cloneJson(config.content.slots.items),
      order: [...config.content.slots.order],
    },
  } as Content;
  const content = {
    ...snapshotCommonContent(initialContent),
    slots: cloneJson(initialContent.slots),
  } as Content;

  const projectSlots = (languages: readonly LanguageCodes[], patch?: {
    items?: SlotChanges<Content>;
    additionalItems?: Record<string, Slot>;
    order?: string[];
  }) => {
    if (patch !== undefined && !isRecord(patch)) throw new Error('content.slots must be an object');
    for (const key of Object.keys(patch ?? {})) {
      if (!['items', 'additionalItems', 'order'].includes(key)) {
        throw new Error('Unknown content.slots override field: ' + key);
      }
    }
    const changes = patch?.items ?? {};
    const additions = patch?.additionalItems ?? {};
    if (!isRecord(changes) || !isRecord(additions)) {
      throw new Error('content.slots items must be slug-keyed objects');
    }

    const effective: Record<string, Slot | false> = { ...cloneJson(initialContent.slots.items) };
    const translatedChanges: Record<string, DeepPartial<Slot>> = {};
    let structural = Object.keys(additions).length > 0;
    for (const [key, value] of Object.entries(additions)) {
      if (Object.hasOwn(effective, key)) throw new Error('Duplicate slot: ' + key);
      camelCase_Schema.parse(key);
      effective[key] = cloneJson(slotSchema.parse(value));
    }
    for (const [key, change] of Object.entries(changes)) {
      if (!Object.hasOwn(initialContent.slots.items, key)) {
        throw new Error('Cannot override unknown text slot: ' + key);
      }
      if (change === false) {
        effective[key] = false;
        structural = true;
      } else {
        const validated = slotPatchSchema.parse(change);
        translatedChanges[key] = validated;
        effective[key] = slotSchema.parse(
          mergeForValidation(cloneJson(initialContent.slots.items[key]), validated),
        );
      }
    }
    if (structural && patch?.order === undefined) {
      throw new Error('content.slots.order is required for additions/removals');
    }
    const order = patch?.order ?? initialContent.slots.order;
    const issues = validateOrderedKeys(
      { items: effective, order },
      { path: 'content.slots', requireNonEmpty: true, allowDisabled: true },
    );
    if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
    if (order.length === 0) throw new Error('At least one active text slot is required');

    const active: SlotMap = Object.fromEntries(
      order.map(key => [key, effective[key] as Slot]),
    );
    const resolved = projectSlotList(active, languages, undefined, order);
    if (patch === undefined) return resolved;

    const modifies =
      Object.keys(changes).length > 0 ||
      Object.keys(additions).length > 0 ||
      patch.order !== undefined;
    if (!modifies) return { locale: {}, base: undefined };

    const affected = structural || patch.order !== undefined
      ? Object.keys(resolved.locale)
      : Object.keys(
          projectSlotList(initialContent.slots.items, languages, translatedChanges as never, initialContent.slots.order).locale,
        );
    const locale: typeof resolved.locale = {};
    for (const code of affected) {
      const language = code as LanguageCodes;
      if (resolved.locale[language]) locale[language] = resolved.locale[language];
    }
    return {
      ...(resolved.base === undefined ? {} : { base: resolved.base }),
      locale,
    };
  };

  const ownProps = (metadata: typeof authored, languages: readonly LanguageCodes[]) => {
    const own = projectQuestionLocale(metadata.locale, languages);
    const projected = projectSlots(languages);
    if (projected.base !== undefined) own.base.slots = projected.base;
    for (const [language, slots] of Object.entries(projected.locale)) {
      (own.files[language as LanguageCodes] ??= {}).locale = {
        ...((own.files[language as LanguageCodes]?.locale ?? {}) as Record<string, unknown>),
        slots,
      };
    }
    return own;
  };

  const props = (options: PublicationLanguageOptions<Languages>): QuestionResourcePublication<Question_FillBlanksWithText_Props> => {
    const languages = resolvePublicationLanguages(options);
    const metadata = copyMetadata();
    const own = ownProps(metadata, languages);
    const common = resolveCommonContent(initialContent, languages);
    mergeQuestionContent(own.files, common.locale);
    const resource = {
      base: {
        id,
        slug,
        type,
        params: metadata.params,
        locale: own.base,
        content: common.base,
      },
      locale: finishFiles(own.files),
    } as QuestionResourcePublication<Question_FillBlanksWithText_Props>;
    validateQuestionPublication(fillBlanksWithText_Props_Schema, languages, resource);
    return resource;
  };

  const overrides = <
    const Added extends Record<string, ContentBlock_Configurator> = {},
    const AddedSlots extends Record<string, Slot> = {},
  >(
    patch: Question_FillBlanksWithText_Overrides<Content, Added, Languages, AddedSlots>,
    options: PublicationLanguageOptions<Languages>,
  ): QuestionOverridePublication<Question_FillBlanksWithText_Props> => {
    try {
      const languages = resolvePublicationLanguages(options);
      ensureQuestionPatchShape(patch);
      const metadataPatch = fillBlanksWithText_Override_Config_Schema.parse({
        ...(patch.params !== undefined ? { params: patch.params } : {}),
        ...(patch.locale !== undefined ? { locale: patch.locale } : {}),
      });
      validateEffectiveQuestionMetadata(copyMetadata(), metadataPatch, value => metadataSchema.parse(value));
      const own = projectQuestionLocale(metadataPatch.locale ?? {}, languages);
      const base: Record<string, unknown> = {
        ...(metadataPatch.params !== undefined ? { params: cloneJson(metadataPatch.params) } : {}),
        ...(Object.keys(own.base).length ? { locale: own.base } : {}),
      };

      if (patch.content !== undefined) {
        if (!isRecord(patch.content)) throw new Error('content must be an object');
        for (const key of Object.keys(patch.content)) {
          if (!['question', 'hint', 'explanation', 'slots'].includes(key)) {
            throw new Error('Unknown Question content override field: ' + key);
          }
        }
        const common = resolveCommonContent(initialContent, languages, patch.content as QuestionCommonPatch<Content>);
        if (Object.keys(common.base).length) base.content = common.base;
        mergeQuestionContent(own.files, common.locale);
        if (patch.content.slots !== undefined) {
          const projected = projectSlots(languages, patch.content.slots);
          if (projected.base !== undefined) {
            (base.locale ??= {} as Record<string, unknown>);
            (base.locale as Record<string, unknown>).slots = projected.base;
          }
          for (const [language, slots] of Object.entries(projected.locale)) {
            (own.files[language as LanguageCodes] ??= {}).locale = {
              ...((own.files[language as LanguageCodes]?.locale ?? {}) as Record<string, unknown>),
              slots,
            };
          }
        }
      }
      const publication = { base, locale: finishFiles(own.files) } as QuestionOverridePublication<Question_FillBlanksWithText_Props>;
      validateQuestionPublication(fillBlanksWithText_Props_Schema, languages, props(options), publication);
      return publication;
    } catch (error) {
      throw new Error(
        'Invalid FillBlanksWithText Question overrides for ' + id + ': ' +
        (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  };

  const result = {
    id,
    slug,
    type,
    content,
    validate,
    build: { props, overrides },
    config: {
      base: {
        id,
        slug,
        type,
        params: cloneJson(authored.params),
        locale: onlyStrings(authored.locale),
      },
      locales: () => ({ locale: onlyLocales(copyMetadata().locale) }),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};

export type Question_FillBlanksWithText_Configurator = ReturnType<typeof defineFillBlanksWithText>;
