import { z } from 'zod';
import type { DeepPartial, ChildrenSupporting } from '#types';
import type { LanguageCode } from '#schemas';
import { disability_Schema } from '#schemas';
import { identityBase_Schema, paramsBase_Schema } from '../_shared__configurators/common.schemas';
import { contentBlockResolved_Schema } from '../contentBlocks/contentBlock.schemas';
import type { ContentBlock_Configurator, ContentBlock_Props } from '../contentBlocks';
import { assessmentMethodSlug_Schema } from './assessmentMethod.schemas';
import type { Question_Type } from './question.constants';
import type { OrderedBlocks } from './_shared__questions/collections.utils';

/** Common Question metadata, independent of the scoring-specific payload. */
export const createQuestionBaseSchema = <const Type extends Question_Type>(type: Type) =>
  identityBase_Schema.extend({
    type: z.literal(type),
    params: paramsBase_Schema.shape.params.extend({
      assessmentMethod: assessmentMethodSlug_Schema,
      restrictions: z.array(disability_Schema),
    }),
  });

/** Authoring collections are slug maps, never positional arrays. */
export const questionBlockCollection_Config_Schema = z.object({
  // Child Config validation belongs to the child; Question.validate checks its collection.
  items: z.record(z.string(), z.custom<ContentBlock_Configurator>()),
  order: z.array(z.string()),
});

export const questionCommonContent_Config_Schema = z.object({
  question: questionBlockCollection_Config_Schema,
  hint: questionBlockCollection_Config_Schema.optional(),
  explanation: questionBlockCollection_Config_Schema.optional(),
});

/** Published content is fully resolved and ordered, with no configurator objects. */
export const questionCommonContent_Props_Schema = z.object({
  question: z.array(contentBlockResolved_Schema).min(1),
  hint: z.array(contentBlockResolved_Schema).optional(),
  explanation: z.array(contentBlockResolved_Schema).optional(),
});

export type QuestionContent<Block = ContentBlock_Configurator> = {
  question: OrderedBlocks<Block>;
  hint?: OrderedBlocks<Block>;
  explanation?: OrderedBlocks<Block>;
};

export type QuestionPublishedContent<Block = ContentBlock_Props> = {
  question: [Block, ...Block[]];
  hint?: Block[];
  explanation?: Block[];
};

export type QuestionMetadataOverrides<Config extends { params: object; locale: object }> = DeepPartial<
  Pick<Config, 'params' | 'locale'>
>;

/** Parent language coverage must be a subset of each nested ContentBlock's scope. */
export type QuestionChildrenSupporting<Languages extends readonly LanguageCode[], Content extends QuestionContent> = {
  question: { items: ChildrenSupporting<Languages, Content['question']['items']> };
  hint?: { items: ChildrenSupporting<Languages, NonNullable<Content['hint']>['items']> };
  explanation?: { items: ChildrenSupporting<Languages, NonNullable<Content['explanation']>['items']> };
};
