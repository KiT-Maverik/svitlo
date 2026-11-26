import { z } from 'zod';

import { disability_Schema, type LanguageCode } from '#schemas';
import type { ChildrenSupporting, DeepPartial } from '#types';

import { identityBase_Schema, paramsBase_Schema } from '../_shared__configurators/common.schemas';
import { primitiveContentBlockTypes } from '../contentBlocks/contentBlock.constants';
import type { ContentBlock_Primitive_Configurator, ContentBlock_Primitive_Props } from '../contentBlocks';
import { primitiveContentBlockResolved_Schema } from '../contentBlocks/contentBlock.schemas';
import type { OrderedBlocks } from './_shared__questions/collections.utils';
import { assessmentMethodSlug_Schema } from './assessmentMethod.schemas';
import type { Question_Type } from './question.constants';

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
  items: z.record(z.string(), z.custom<ContentBlock_Primitive_Configurator>(
    value => value !== null && typeof value === 'object' && 'type' in value &&
      primitiveContentBlockTypes.some(type => type === value.type),
    { message: 'Question content accepts only Primitive ContentBlocks' },
  )),
  order: z.array(z.string()),
});

export const questionCommonContent_Config_Schema = z.object({
  question: questionBlockCollection_Config_Schema,
  hint: questionBlockCollection_Config_Schema.optional(),
  explanation: questionBlockCollection_Config_Schema.optional(),
});

/** Published content is fully resolved and ordered, with no configurator objects. */
export const questionCommonContent_Props_Schema = z.object({
  question: z.array(primitiveContentBlockResolved_Schema).min(1),
  hint: z.array(primitiveContentBlockResolved_Schema).optional(),
  explanation: z.array(primitiveContentBlockResolved_Schema).optional(),
});

export type QuestionContent<Block = ContentBlock_Primitive_Configurator> = {
  question: OrderedBlocks<Block>;
  hint?: OrderedBlocks<Block>;
  explanation?: OrderedBlocks<Block>;
};

export type QuestionPublishedContent<Block = ContentBlock_Primitive_Props> = {
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
