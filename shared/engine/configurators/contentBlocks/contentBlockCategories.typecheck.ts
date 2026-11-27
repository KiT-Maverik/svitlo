import type {
  ContentBlock_Composite_Data as PublicComposite_Data,
  ContentBlock_Primitive_Data as PublicPrimitive_Data,
} from '../../runtime';
import type {
  ContentBlock_Composite_Type,
  ContentBlock_Primitive_Type,
  ContentBlock_Type,
} from './contentBlock.constants';
import type {
  ContentBlock_Composite_Config,
  ContentBlock_Composite_Configurator,
  ContentBlock_Composite_Data,
  ContentBlock_Config,
  ContentBlock_Configurator,
  ContentBlock_Data,
  ContentBlock_Primitive_Config,
  ContentBlock_Primitive_Configurator,
  ContentBlock_Primitive_Data,
} from './index';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Require<T extends true> = T;

export type ContentBlockCategoryTypingChecks = [
  Require<Equal<ContentBlock_Primitive_Config['type'], ContentBlock_Primitive_Type>>,
  Require<Equal<ContentBlock_Composite_Config['type'], ContentBlock_Composite_Type>>,
  Require<Equal<ContentBlock_Config['type'], ContentBlock_Type>>,
  Require<Equal<ContentBlock_Primitive_Configurator['type'], ContentBlock_Primitive_Type>>,
  Require<Equal<ContentBlock_Composite_Configurator['type'], ContentBlock_Composite_Type>>,
  Require<Equal<ContentBlock_Configurator['type'], ContentBlock_Type>>,
  Require<Equal<ContentBlock_Primitive_Data['type'], ContentBlock_Primitive_Type>>,
  Require<Equal<ContentBlock_Composite_Data['type'], ContentBlock_Composite_Type>>,
  Require<Equal<ContentBlock_Data['type'], ContentBlock_Type>>,
  Require<Equal<PublicPrimitive_Data['type'], ContentBlock_Primitive_Type>>,
  Require<Equal<PublicComposite_Data['type'], ContentBlock_Composite_Type>>,
];

declare const composite: ContentBlock_Composite_Config;
// @ts-expect-error Composite blocks cannot be assigned as primitive Config children.
const invalidPrimitive: ContentBlock_Primitive_Config = composite;
void invalidPrimitive;
