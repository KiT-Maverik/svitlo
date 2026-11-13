/** Browser, React Server, Capacitor and Electron: published Props only. */
export * from './assemblers';
export * from './schemas';
// Types are erased in JS and must not pull authoring factories into runtime.
export type { Lesson_Props, Lesson_PropsBase } from './configurators/lessons/defineLesson/defineLesson.schemas';
export type { Section_Props } from './configurators/sections/section.types';
export type { ContentBlock_Props } from './configurators/contentBlocks/contentBlock.types';
export type { Flashcard_Props } from './configurators/flashcards/defineFlashcard/defineFlashcard.schemas';
export type { AssessmentMethod_Props } from './configurators/assessmentMethods/defineAssessmentMethod.schemas';
export type { Skill_Props } from './configurators/skills/defineSkill/defineSkill.schemas';
export type { SkillGroup_Props } from './configurators/skills/defineSkillGroup/defineSkillGroup.schemas';
export type { SkillDomain_Props } from './configurators/skills/defineSkillDomain/defineSkillDomain.schemas';
export type { ResolveLocale } from './types';

export { lesson_Props_Schema } from './configurators/lessons/defineLesson/defineLesson.schemas';
export { flashcard_Props_Schema } from './configurators/flashcards/defineFlashcard/defineFlashcard.schemas';
export { assessmentMethod_Props_Schema } from './configurators/assessmentMethods/defineAssessmentMethod.schemas';
export { skill_Props_Schema } from './configurators/skills/defineSkill/defineSkill.schemas';
export { skillGroup_Props_Schema } from './configurators/skills/defineSkillGroup/defineSkillGroup.schemas';
export { skillDomain_Props_Schema } from './configurators/skills/defineSkillDomain/defineSkillDomain.schemas';
export { sectionTypes } from './configurators/sections/section.constants';
export { questionTypes } from './configurators/questions/question.constants';
export { contentBlockTypes } from './configurators/contentBlocks/contentBlock.constants';
export {
  localizationSwitch as contentBlockLocalizationSwitch,
  contentBlockResolved_Schema,
} from './configurators/contentBlocks/contentBlock.schemas';

export { mergeLessonResources } from './lessons/mergeLessonResources';
export { prepareQuizQuestions } from './lessons/prepareQuizQuestions';
export { applyCourseLessonOverride } from './lessons/applyCourseLessonOverride';
export * from './lessons/assembleLessonResponse';
export { splitLessonValue } from './lessons/splitLessonValue';

export { getLanguageCode, getSupportedLanguages, isLocale, getLocaleDirection } from './utils/languages';
export { resolveEntityPath } from './utils/entityPath/resolveEntityPath.utils';
export { createLocalizedFileLocations } from './utils/createLocalizedFileLocations/createLocalizedFileLocations.utils';
export type { CreateLocalizedFileLocationsOptions, LocalizedFileLocations } from './utils/createLocalizedFileLocations/createLocalizedFileLocations.utils';
export { createDynamicQuestion, validateArgument, validateBooleanArgument, validateNumberArgument, validateStringArgument } from './utils/createDynamicQuestion/createDynamicQuestion.utils';
export type * from './utils/createDynamicQuestion/createDynamicQuestion.types';
