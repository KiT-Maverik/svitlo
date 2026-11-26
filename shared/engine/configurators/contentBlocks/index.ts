export * from './primitive';
export * from './composite';

export type {
  ContentBlock_Configurator,
  ContentBlock_Props,
  ContentBlock_Config,
  ContentBlock_PropsBase,
  ContentBlock_Primitive_Configurator,
  ContentBlock_Primitive_Config,
  ContentBlock_Primitive_PropsBase,
  ContentBlock_Primitive_Props,
  ContentBlock_Composite_Configurator,
  ContentBlock_Composite_Config,
  ContentBlock_Composite_PropsBase,
  ContentBlock_Composite_Props,
} from './contentBlock.types';
export * from './contentBlock.constants';
export {
  localizationSwitch as contentBlockLocalizationSwitch,
  contentBlockResolved_Schema,
  primitiveContentBlockResolved_Schema,
  primitiveContentBlockConfigurator_Schema,
} from './contentBlock.schemas';
