export * from './primitive';
export * from './composite';

export type {
  ContentBlock_Configurator,
  ContentBlock_Data,
  ContentBlock_Config,
  ContentBlock_DataBase,
  ContentBlock_Primitive_Configurator,
  ContentBlock_Primitive_Config,
  ContentBlock_Primitive_DataBase,
  ContentBlock_Primitive_Data,
  ContentBlock_Composite_Configurator,
  ContentBlock_Composite_Config,
  ContentBlock_Composite_DataBase,
  ContentBlock_Composite_Data,
} from './contentBlock.types';
export * from './contentBlock.constants';
export {
  localizationSwitch as contentBlockLocalizationSwitch,
  contentBlockResolved_Schema,
  primitiveContentBlockResolved_Schema,
  compositeContentBlockResolved_Schema,
  primitiveContentBlockConfigurator_Schema,
} from './contentBlock.schemas';
