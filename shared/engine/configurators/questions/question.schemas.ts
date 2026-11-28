import { z } from 'zod';

import { disability_Schema, type LanguageCode } from '#schemas';
import type { ChildrenSupporting, DeepPartial } from '#types';

import { validateSlugAddressedContainer } from '../_shared__configurators/slugAddressedContainer/slugAddressedContainer.utils';
import { identityBase_Schema, paramsBase_Schema } from '../_shared__configurators/common.schemas';
import type { ContentBlock_Primitive_Configurator, ContentBlock_Primitive_Data } from '../contentBlocks';
import { primitiveContentBlockTypes } from '../contentBlocks/contentBlock.constants';
import {
  primitiveContentBlockConfigurator_Schema,
  primitiveContentBlockResolved_Schema,
} from '../contentBlocks/contentBlock.schemas';
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

/** Fixed question/hint/explanation roles contain independent ordered block groups. */
export const questionBlockCollection_Config_Schema = z.looseObject({
  children: z.array(z.string()),
});

export const questionCommonContent_Config_Schema = z.object({
  question: questionBlockCollection_Config_Schema,
  hint: questionBlockCollection_Config_Schema.optional(),
  explanation: questionBlockCollection_Config_Schema.optional(),
});

/** Data retains stable child slugs; presentation arrays are a later adapter concern. */
export const questionBlockCollection_Data_Schema = z
  .looseObject({
    children: z.array(z.string()),
  })
  .superRefine((group, ctx) => {
    for (const issue of validateSlugAddressedContainer(group, primitiveContentBlockTypes)) {
      ctx.addIssue({ code: 'custom', path: issue.path, message: issue.message });
    }
    for (const key of group.children) {
      if (typeof key === 'string' && !primitiveContentBlockResolved_Schema.safeParse(group[key]).success) {
        ctx.addIssue({ code: 'custom', path: [key], message: 'Invalid Question ContentBlock Data' });
      }
    }
  });

export const questionCommonContent_Data_Schema = z.object({
  question: questionBlockCollection_Data_Schema.refine(
    group => group.children.length > 0,
    'Question requires at least one prompt ContentBlock',
  ),
  hint: questionBlockCollection_Data_Schema.optional(),
  explanation: questionBlockCollection_Data_Schema.optional(),
});

export type QuestionContent<Block = ContentBlock_Primitive_Configurator> = {
  question: OrderedBlocks<Block>;
  hint?: OrderedBlocks<Block>;
  explanation?: OrderedBlocks<Block>;
};
export type QuestionPublishedContent<Block = ContentBlock_Primitive_Data> = {
  question: { children: string[] } & Record<string, Block | string[]>;
  hint?: { children: string[] } & Record<string, Block | string[]>;
  explanation?: { children: string[] } & Record<string, Block | string[]>;
};

export type QuestionMetadataOverrides<Config extends { params: object; locale: object }> = DeepPartial<
  Pick<Config, 'params' | 'locale'>
>;

/** Parent language coverage must be a subset of each nested ContentBlock's scope. */
type Members<Group extends { children: string[] }> = {
  [Key in Exclude<keyof Group, 'children'>]: Group[Key] extends ContentBlock_Primitive_Configurator
    ? Group[Key]
    : ContentBlock_Primitive_Configurator;
};

export type QuestionChildrenSupporting<Languages extends readonly LanguageCode[], Content extends QuestionContent> = {
  question: ChildrenSupporting<Languages, Members<Content['question']>>;
  hint?: ChildrenSupporting<Languages, Members<NonNullable<Content['hint']>>>;
  explanation?: ChildrenSupporting<Languages, Members<NonNullable<Content['explanation']>>>;
};
