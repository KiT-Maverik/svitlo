import type {
  ContentBlock_Composite_Props as PublicComposite_Props,
  ContentBlock_Primitive_Props as PublicPrimitive_Props,
} from '../../runtime';
import type {
  ContentBlock_Composite_Type,
  ContentBlock_Primitive_Type,
  ContentBlock_Type,
} from './contentBlock.constants';
import type {
  ContentBlock_Composite_Config,
  ContentBlock_Composite_Configurator,
  ContentBlock_Composite_Props,
  ContentBlock_Config,
  ContentBlock_Configurator,
  ContentBlock_Primitive_Config,
  ContentBlock_Primitive_Configurator,
  ContentBlock_Primitive_Props,
  ContentBlock_Props,
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
  Require<Equal<ContentBlock_Primitive_Props['type'], ContentBlock_Primitive_Type>>,
  Require<Equal<ContentBlock_Composite_Props['type'], ContentBlock_Composite_Type>>,
  Require<Equal<ContentBlock_Props['type'], ContentBlock_Type>>,
  Require<Equal<PublicPrimitive_Props['type'], ContentBlock_Primitive_Type>>,
  Require<Equal<PublicComposite_Props['type'], ContentBlock_Composite_Type>>,
];

declare const composite: ContentBlock_Composite_Config;
// @ts-expect-error Composite blocks cannot be assigned as primitive Config children.
const invalidPrimitive: ContentBlock_Primitive_Config = composite;
void invalidPrimitive;
