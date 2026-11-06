import type {
  Chapter,
  Chapter_Content,
  Episode,
  Lesson_Override,
  Module,
  Module_Content,
  Section_Override,
  Course_TocModule,
  Course_TocChapter,
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
