/**
 * Browser and React Server Components share the pure Engine runtime.
 * Node authoring and publishing helpers remain available from the default
 * root condition without entering client/server rendering bundles.
 */
export * from './configurators';
export * from './data';
export * from './lessons';
export * from './schemas';

export { getLanguageCode, getSupportedLanguages, isLocale, getLocaleDirection } from './utils/languages';
export { configuratorArrayToSluggedObject } from './utils/configuratorArrayToSluggedObject/configuratorArrayToSluggedObject.utils';
export { splitLessonValue } from './lessons/splitLessonValue';
export { resolveEntityPath } from './utils/entityPath/resolveEntityPath.utils';
export { buildAssessmentMethodConfig } from './utils/builders/config/buildAssessmentMethodConfig.utils';
export { createLocalizedFileLocations } from './utils/createLocalizedFileLocations/createLocalizedFileLocations.utils';
export type {
  CreateLocalizedFileLocationsOptions,
  LocalizedFileLocations,
} from './utils/createLocalizedFileLocations/createLocalizedFileLocations.utils';
export {
  createDynamicQuestion,
  validateArgument,
  validateBooleanArgument,
  validateNumberArgument,
  validateStringArgument,
} from './utils/createDynamicQuestion/createDynamicQuestion.utils';
export type * from './utils/createDynamicQuestion/createDynamicQuestion.types';
