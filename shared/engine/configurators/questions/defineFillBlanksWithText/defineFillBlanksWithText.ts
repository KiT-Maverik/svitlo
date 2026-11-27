import { z } from 'zod';

import { camelCase_Schema, deepStrict_Schema, type AllLanguageCodes, type LanguageCode } from '#schemas';
import type { ConfigWithLanguages, DeepPartial, LanguageScope, RequireLanguages } from '#types';

import {
  cloneJson,
  ensureQuestionPatchShape,
  finishFiles,
  isRecord,
  mergeQuestionContent,
  projectQuestionLocale,
  projectSlotList,
  resolveCommonContent,
  resolvePublicationLanguages,
  snapshotCommonContent,
  validateCommonContent,
  validateEffectiveQuestionMetadata,
  validateQuestionPublication,
  type PublicationLanguageOptions,
  type QuestionCommonPatch,
  type QuestionOverridePublication,
  type QuestionResourcePublication,
} from '../_shared__questions';
import {
  mergeForValidation,
  onlyLocales,
  onlyStrings,
  scopeBuild,
  validateOrderedKeys,
  slugAddressedReservedKeys,
} from '../../_shared__configurators';
import type { ContentBlock_Primitive_Configurator } from '../../contentBlocks';
import type { QuestionChildrenSupporting } from '../question.schemas';
import {
  fillBlanksWithText_Config_Schema,
  fillBlanksWithTextSlot_Config_Schema,
  fillBlanksWithText_Data_Schema,
  fillBlanksWithText_Override_Config_Schema,
  type Question_FillBlanksWithText_Config,
  type Question_FillBlanksWithText_Data,
  type Question_FillBlanksWithText_MetadataOverrides,
} from './defineFillBlanksWithText.schemas';

type ContentShape = Question_FillBlanksWithText_Config['content'];
type Slot = z.infer<typeof fillBlanksWithTextSlot_Config_Schema>;
type SlotMap = Record<string, Slot>;
type SlotMembers<Group extends { children: string[] }> = {
  [Key in Exclude<keyof Group, 'children'>]: Group[Key] extends Slot ? Group[Key] : Slot;
};
type SlotChanges<Content extends ContentShape> = {
  [Key in keyof SlotMembers<Content['slots']>]?: DeepPartial<Slot> | false;
};
type SlotsOverride<
  Content extends ContentShape,
  AddedSlots extends Record<string, Slot>,
  Languages extends readonly LanguageCode[],
> = {
  children?: Extract<keyof SlotMembers<Content['slots']> | keyof NoInfer<AddedSlots>, string>[];
} & SlotChanges<Content> & AddedSlots & RequireLanguages<AddedSlots, Languages>;

export type Question_FillBlanksWithText_Overrides<
  Content extends ContentShape = ContentShape,
  Added extends Record<string, ContentBlock_Primitive_Configurator> = {},
  Languages extends readonly LanguageCode[] = AllLanguageCodes,
  AddedSlots extends Record<string, Slot> = {},
> = Question_FillBlanksWithText_MetadataOverrides & {
  content?: QuestionCommonPatch<Content, Added, Languages> & {
    slots?: SlotsOverride<Content, AddedSlots, Languages>;
  };
};

const metadataSchema = fillBlanksWithText_Config_Schema.omit({ content: true });
const slotSchema = fillBlanksWithTextSlot_Config_Schema;
const slotPatchSchema: z.ZodType<DeepPartial<Slot>> = z.deepPartial(deepStrict_Schema(slotSchema));

const slotsOf = (value: { children: string[] } & Record<string, unknown>): SlotMap =>
  Object.fromEntries(Object.entries(value).filter(([key]) => key !== 'children')) as SlotMap;

const validateSlots = (value: ContentShape['slots']): void => {
  const items = slotsOf(value);
  const issues = validateOrderedKeys({ items, order: value.children }, {
    path: 'content.slots', requireNonEmpty: true,
  });
  if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
  if (!value.children.length) throw new Error('FillBlanksWithText requires at least one slot');
  for (const [selector, item] of Object.entries(items)) {
    camelCase_Schema.parse(selector);
    if (slugAddressedReservedKeys.some(key => key === selector)) throw new Error('Reserved text slot slug: ' + selector);
    slotSchema.parse(item);
  }
};

const validate = (candidate: Question_FillBlanksWithText_Config): void => {
  fillBlanksWithText_Config_Schema.parse(candidate);
  validateCommonContent(candidate.content);
  validateSlots(candidate.content.slots);
};

/**
 * Author named gaps that learners complete with text.
 *
 * @remarks
 * Name each blank in `content.slots.items` and provide its accepted
 * `correctAnswers` as a named map of strings or translations.
 * `content.slots.order` identifies the intended slot sequence.
 * Keep names stable when translating; do not author localized positional
 * arrays of answers.
 */
export const defineFillBlanksWithText = <
  const Slug extends string,
  const Content extends ContentShape,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: Omit<Question_FillBlanksWithText_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: Content &
      QuestionChildrenSupporting<Languages, Content> & {
        slots: RequireLanguages<Content['slots'], Languages>;
      };
  } & ConfigWithLanguages<Question_FillBlanksWithText_Config, Languages>,
) => {
  const { content: _content, ...metadataInput } = config;
  const authored = cloneJson(metadataInput);
  const { id, type } = authored;
  const slug = config.slug;
  const copyMetadata = () => cloneJson(authored);
  const initialContent = {
    ...snapshotCommonContent(config.content),
    slots: cloneJson(config.content.slots),
  } as Content;
  const content = {
    ...snapshotCommonContent(initialContent),
    slots: cloneJson(initialContent.slots),
  } as Content;

  const projectSlots = (
    languages: readonly LanguageCode[],
    patch?: { children?: string[] } & Record<string, unknown>,
  ) => {
    if (patch !== undefined && !isRecord(patch)) throw new Error('content.slots must be an object');
    const original = slotsOf(initialContent.slots);
    const effective: Record<string, Slot | false> = cloneJson(original);
    const translatedChanges: Record<string, DeepPartial<Slot>> = {};
    let structural = false;
    for (const [key, change] of Object.entries(patch ?? {})) {
      if (key === 'children') continue;
      camelCase_Schema.parse(key);
      if (slugAddressedReservedKeys.some(reserved => reserved === key))
        throw new Error('Reserved text slot slug: ' + key);
      if (Object.hasOwn(original, key)) {
        if (change === false) { effective[key] = false; structural = true; }
        else {
          const validated = slotPatchSchema.parse(change);
          translatedChanges[key] = validated;
          effective[key] = slotSchema.parse(mergeForValidation(cloneJson(original[key]), validated));
        }
      } else {
        effective[key] = cloneJson(slotSchema.parse(change));
        structural = true;
      }
    }
    if (structural && patch?.children === undefined) {
      throw new Error('content.slots.children is required for additions/removals');
    }
    const order = patch?.children ?? initialContent.slots.children;
    if (!Array.isArray(order)) throw new Error('content.slots.children must be an array');
    const issues = validateOrderedKeys(
      { items: effective, order },
      { path: 'content.slots', requireNonEmpty: true, allowDisabled: true },
    );
    if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
    if (!order.length) throw new Error('At least one active text slot is required');

    const active: SlotMap = Object.fromEntries(order.map(key => [key, effective[key] as Slot]));
    const resolved = projectSlotList(active, languages, undefined, order);
    if (patch === undefined) return resolved;
    const modifies = Object.keys(patch).length > 0;
    if (!modifies) return { locale: {}, base: undefined };
    const affected = structural || patch.children !== undefined
      ? Object.keys(resolved.locale)
      : Object.keys(projectSlotList(original, languages, translatedChanges as never, initialContent.slots.children).locale);
    const locale: typeof resolved.locale = {};
    for (const code of affected) {
      const language = code as LanguageCode;
      if (resolved.locale[language]) locale[language] = resolved.locale[language];
    }
    return { ...(resolved.base === undefined ? {} : { base: resolved.base }), locale };
  };

  const ownProps = (metadata: typeof authored, languages: readonly LanguageCode[]) => {
    const own = projectQuestionLocale(metadata.locale, languages);
    const projected = projectSlots(languages);
    if (projected.base !== undefined) own.base.slots = projected.base;
    for (const [language, slots] of Object.entries(projected.locale)) {
      (own.files[language as LanguageCode] ??= {}).locale = {
        ...((own.files[language as LanguageCode]?.locale ?? {}) as Record<string, unknown>),
        slots,
      };
    }
    return own;
  };

  const data = (
    options: PublicationLanguageOptions<Languages>,
  ): QuestionResourcePublication<Question_FillBlanksWithText_Data> => {
    const languages = resolvePublicationLanguages(options);
    validate({ ...copyMetadata(), content: initialContent });
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
    } as unknown as QuestionResourcePublication<Question_FillBlanksWithText_Data>;
    validateQuestionPublication(fillBlanksWithText_Data_Schema, languages, resource);
    return resource;
  };

  const overrides = <
    const Added extends Record<string, ContentBlock_Primitive_Configurator> = {},
    const AddedSlots extends Record<string, Slot> = {},
  >(
    patch: Question_FillBlanksWithText_Overrides<Content, Added, Languages, AddedSlots>,
    options: PublicationLanguageOptions<Languages>,
  ): QuestionOverridePublication<Question_FillBlanksWithText_Data> => {
    try {
      const languages = resolvePublicationLanguages(options);
      validate({ ...copyMetadata(), content: initialContent });
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
            base.locale ??= {} as Record<string, unknown>;
            (base.locale as Record<string, unknown>).slots = projected.base;
          }
          for (const [language, slots] of Object.entries(projected.locale)) {
            (own.files[language as LanguageCode] ??= {}).locale = {
              ...((own.files[language as LanguageCode]?.locale ?? {}) as Record<string, unknown>),
              slots,
            };
          }
        }
      }
      const publication = {
        base,
        locale: finishFiles(own.files),
      } as QuestionOverridePublication<Question_FillBlanksWithText_Data>;
      validateQuestionPublication(fillBlanksWithText_Data_Schema, languages, data(options), publication);
      return publication;
    } catch (error) {
      throw new Error(
        'Invalid FillBlanksWithText Question overrides for ' +
          id +
          ': ' +
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
    build: scopeBuild({ data, overrides }),
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
