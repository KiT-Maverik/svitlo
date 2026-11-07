import type {
  Chapter,
  Chapter_Content,
  Chapter,
  Episode,
  Lesson_Override,
  Module,
  Module_Content,
  Section_Override,
  Course_TocModule,
  Course_TocChapter,
  Course,
  Course_Prerequisites,
  Course_ScenarioMode,
  SkillId,
} from '../../../content';

type Languages = readonly ['en', 'uk'];
type AssertTrue<T extends true> = T;
type AssertFalse<T extends false> = T;

// Reject invalid course-tree nesting and non-scenario Episode sections.
type _NoNestedModules = AssertFalse<Module<'data', Languages> extends Module_Content<'data', Languages> ? true : false>;
type _NoNestedChapters = AssertFalse<
  Chapter<'data', Languages> extends Chapter_Content<'data', Languages> ? true : false
>;
type _OnlyScenarioSections = AssertTrue<
  Episode<'data', Languages>['sections'][number]['type'] extends 'scenario' ? true : false
>;

// Course overrides cannot alter canonical identities or Lesson invariants.
type _NoLessonIdOverride = AssertFalse<'id' extends keyof Lesson_Override<Languages> ? true : false>;
type _NoLessonLanguagesOverride = AssertFalse<
  'languages' extends keyof NonNullable<Lesson_Override<Languages>['parameters']> ? true : false
>;
type _NoQuestionBankOverride = AssertFalse<'questions' extends keyof Lesson_Override<Languages> ? true : false>;
type _NoSectionIdentityOverride = AssertFalse<'id' extends keyof Section_Override<Languages> ? true : false>;
type _NoSectionTypeOverride = AssertFalse<'type' extends keyof Section_Override<Languages> ? true : false>;

// Custom events can be explicitly disabled at the course level.
type _DisableCustomEvent = AssertTrue<
  false extends NonNullable<Lesson_Override<Languages, 'lionAppeared'>['events']>['lionAppeared'] ? true : false
>;

type _NoNestedModuleToc = AssertFalse<Course_TocModule extends Course_TocModule['children'][number] ? true : false>;
type _NoNestedChapterToc = AssertFalse<Course_TocChapter extends Course_TocChapter['children'][number] ? true : false>;

// Course editorial metadata supports optional narrative and typed prerequisite IDs.
type _ScenarioModeNone = AssertTrue<'none' extends Course_ScenarioMode ? true : false>;
type _ScenarioModeStory = AssertTrue<'story' extends Course_ScenarioMode ? true : false>;
type _ScenarioModeRejectsUnknown = AssertFalse<'scripted' extends Course_ScenarioMode ? true : false>;
type _CoursePrerequisites = AssertTrue<
  Course<'data', Languages>['prerequisites'] extends Course_Prerequisites<'data', Languages> | undefined
    ? true
    : false
>;
type _PrerequisiteSkillRefs = AssertTrue<
  NonNullable<Course_Prerequisites<'data', Languages>['skills']>[number] extends SkillId ? true : false
>;
type _PrerequisiteGroupRefs = AssertTrue<
  NonNullable<Course_Prerequisites<'data', Languages>['skillGroups']>[number] extends SkillId ? true : false
>;
type _PrerequisiteDomainRefs = AssertTrue<
  NonNullable<Course_Prerequisites<'data', Languages>['skillDomains']>[number] extends SkillId ? true : false
>;

// The same Course language tuple governs nested entities. Intentional invariants are allowed.
const courseLanguages: Course<'data', Languages>['parameters']['languages'] = ['en', 'uk'];
const fullModuleTitle: Module<'data', Languages>['title'] = {
  type: 'text', id: 'module-title', slug: 'module', value: { en: 'Numbers', uk: 'Числа' },
};
const invariantChapterTitle: Chapter<'data', Languages>['title'] = {
  type: 'text', id: 'chapter-title', slug: 'chapter', value: 'H₂O',
};
const incompleteEpisodeTitle: Episode<'data', Languages>['title'] = {
  type: 'text', id: 'episode-title', slug: 'episode',
  // @ts-expect-error A localized Episode title requires every Course locale.
  value: { en: 'Story' },
};
// @ts-expect-error A Course cannot discard a declared locale.
const incompleteCourseLanguages: Course<'data', Languages>['parameters']['languages'] = ['en'];
void courseLanguages;
void fullModuleTitle;
void invariantChapterTitle;
void incompleteEpisodeTitle;
void incompleteCourseLanguages;
