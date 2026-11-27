import type { ChildrenSupporting, LanguageScope } from '#types';
import type { SafePlacementMap } from '../../_shared__configurators';

import type { Lesson_Configurator } from '../../lessons/defineLesson';
import { defineChapter } from '../defineChapter';
import { defineModule, type Module_Child } from '../defineModule';
import { placeLesson } from '../placeLesson';
import { defineCourse } from './defineCourse';

const id = 'b775647f-203d-481a-a1c7-4d331c779d01';

/** Type-only fixtures: Agent 1 owns the actual Lesson configurator's Build migration. */
declare const lesson: Lesson_Configurator & LanguageScope<['en', 'uk']>;
declare const lessonEnglishOnly: Lesson_Configurator & LanguageScope<['en']>;

const chapter = defineChapter<'chapter', { lesson: typeof lesson }, ['en', 'uk']>({
  id,
  type: 'chapter',
  slug: 'chapter',
  params: {},
  locale: { title: { en: 'Chapter', uk: 'Розділ' } },
  children: ['lesson'], lesson,
});
const module = defineModule<'module', { chapter: typeof chapter }, ['en', 'uk']>({
  id,
  type: 'module',
  slug: 'module',
  params: {},
  locale: { title: 'Module' },
  children: ['chapter'], chapter,
});
const course = defineCourse<'course', { module: typeof module; chapter: typeof chapter }, ['en', 'uk']>({
  id,
  type: 'course',
  slug: 'course',
  params: { languages: ['en', 'uk'] as const },
  locale: { title: { en: 'Course', uk: 'Курс' }, description: 'Introduction' },
  children: ['module', 'chapter'], module, chapter,
});

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Expect<T extends true> = T;
type CourseSlug = Expect<Equal<typeof course.slug, 'course'>>;
type NestedKind = Expect<Equal<typeof course.module.type, 'module'>>;
type ExactChapter = Expect<Equal<typeof module.chapter, typeof chapter>>;

const chapterEnglishOnly = defineChapter<'chapterEnglish', {}, ['en']>({
  id,
  type: 'chapter',
  slug: 'chapterEnglish',
  params: {},
  locale: { title: { en: 'Chapter' } },
  children: [],
});
const courseEnglish = defineCourse<'courseEnglish', { chapter: typeof chapter }, ['en']>({
  id,
  type: 'course',
  slug: 'courseEnglish',
  params: { languages: ['en'] as const },
  locale: { title: { en: 'Course' }, description: 'Introduction' },
  children: ['chapter'], chapter,
});

// Parent's languages must be covered by every child, never the other way around.
const invalidCourseChildren: ChildrenSupporting<['en', 'uk'], { chapterEnglish: typeof chapterEnglishOnly }> = {
  // @ts-expect-error The Chapter lacks Ukrainian; Course cannot claim both languages.
  chapterEnglish: chapterEnglishOnly,
};
const invalidModuleChildren: ChildrenSupporting<['en', 'uk'], { chapterEnglish: typeof chapterEnglishOnly }> = {
  // @ts-expect-error The Chapter lacks Ukrainian; Module cannot claim both languages.
  chapterEnglish: chapterEnglishOnly,
};
const invalidChapterChildren: ChildrenSupporting<['en', 'uk'], { lesson: typeof lessonEnglishOnly }> = {
  // @ts-expect-error The Lesson lacks Ukrainian; Chapter cannot claim both languages.
  lesson: lessonEnglishOnly,
};
void invalidCourseChildren;
void invalidModuleChildren;
void invalidChapterChildren;

// @ts-expect-error A Course cannot change its immutable identity.
course.build.overrides({ slug: 'altered' }, { languages: ['en', 'uk'] });
// @ts-expect-error A Course cannot change its advertised language tuple.
course.build.overrides({ params: { languages: ['en'] } }, { languages: ['en', 'uk'] });
const invalidChapterItems: Record<string, Lesson_Configurator> = {
  // @ts-expect-error A Chapter cannot contain Modules.
  module,
};
const invalidModuleItems: Record<string, Module_Child> = {
  // @ts-expect-error A Module cannot contain Modules.
  module,
};
void invalidChapterItems;
void invalidModuleItems;
defineCourse({
  id,
  type: 'course',
  slug: 'invalid',
  params: { languages: ['en'] },
  // @ts-expect-error Course locale must contain description.
  locale: { title: 'Course' },
  children: [],
});

void course;
void courseEnglish;
void (null as unknown as CourseSlug);
void (null as unknown as NestedKind);
void (null as unknown as ExactChapter);

/** Nested language scope is statically checked for publication as well as composition. */
course.build.data({ languages: ['en', 'uk'] });
course.build.data({ languages: ['uk'] });
module.build.data({ languages: ['en'] });
chapter.build.data({ languages: ['uk'] });
course.build.overrides({}, { languages: ['uk'] });
// @ts-expect-error Polish is not guaranteed by Course.
course.build.data({ languages: ['pl'] });
// @ts-expect-error Module does not guarantee Polish.
module.build.data({ languages: ['pl'] });
// @ts-expect-error Chapter does not guarantee German.
chapter.build.data({ languages: ['de'] });
// @ts-expect-error Override publication languages are checked.
course.build.overrides({}, { languages: ['de'] });
// @ts-expect-error Explicit publication languages are required.
course.build.data();
// @ts-expect-error Overrides require explicit language options.
course.build.overrides({});

/** Inline Config patches retain the imported Lesson's precise language scope. */
const shadow = placeLesson(lesson, { params: { sections: { allowSkipping: false } } });
const lessonAgain = placeLesson(lesson, { locale: { title: { uk: 'Практика' } } });
const placedChapter = defineChapter<'placedChapter', { shadow: typeof shadow }, ['en', 'uk']>({
  id,
  type: 'chapter',
  slug: 'placedChapter',
  params: {},
  locale: { title: 'Placed chapter' },
  children: ['shadow'], shadow,
});
const placedModule = defineModule<'placedModule', { placedChapter: typeof placedChapter }, ['en', 'uk']>({
  id,
  type: 'module',
  slug: 'placedModule',
  params: {},
  locale: { title: 'Placed module' },
  children: ['placedChapter'], placedChapter,
});
const placedCourse = defineCourse<
  'placedCourse',
  {
    placedModule: typeof placedModule;
    directLesson: typeof lesson;
    lessonAgain: typeof lessonAgain;
  },
  ['en', 'uk']
>({
  id,
  type: 'course',
  slug: 'placedCourse',
  params: { languages: ['en', 'uk'] as const },
  locale: { title: 'Course', description: 'Placement type-check' },
  children: ['placedModule', 'directLesson', 'lessonAgain'], placedModule, directLesson: lesson, lessonAgain,
});
placedCourse.build.data({ languages: ['uk'] });
placedCourse.build.overrides(
  { lessonAgain: { params: { sections: { allowNavigation: false } } } },
  { languages: ['uk'] },
);
// @ts-expect-error Immutable Lesson ID is never a valid authored Config patch.
placeLesson(lesson, { id });
// @ts-expect-error A built Props fragment is not an authored Lesson Config patch.
placeLesson(lesson, { base: { params: { sections: { allowSkipping: false } } } });
// The placement retains the imported source's phantom language scope.
const englishOnlyPlacement = placeLesson(lessonEnglishOnly, { params: { sections: { allowSkipping: false } } });
const invalidPlacementChildren: ChildrenSupporting<['en', 'uk'], { shadow: typeof englishOnlyPlacement }> = {
  // @ts-expect-error The imported Lesson placement cannot satisfy the parent's Ukrainian scope.
  shadow: englishOnlyPlacement,
};
void invalidPlacementChildren;


/** A's Data surface: placement keys are literals, never a generic content array. */
const publishedCourse = course.build.data({ languages: ['en'] });
type PublishedCourseChildKeys = Expect<Equal<(typeof publishedCourse.base.children)[number], 'module' | 'chapter'>>;
type PublishedModuleKind = Expect<Equal<NonNullable<typeof publishedCourse.base.module.type>, 'module'>>;
type PublishedChapterKind = Expect<Equal<NonNullable<typeof publishedCourse.base.chapter.type>, 'chapter'>>;
void (null as unknown as PublishedCourseChildKeys);
void (null as unknown as PublishedModuleKind);
void (null as unknown as PublishedChapterKind);

// @ts-expect-error Course's inferred placement fields do not include an arbitrary child.
publishedCourse.base.nonexistent;
/** Literal reserved-key guards apply before dynamic runtime validation. */
const invalidCoursePlacement: SafePlacementMap<{ id: typeof chapter }> = {
  // @ts-expect-error id is reserved entity metadata.
  id: chapter,
};
const invalidModulePlacement: SafePlacementMap<{ children: typeof chapter }> = {
  // @ts-expect-error children is the order, not an authored child.
  children: chapter,
};
const invalidChapterPlacement: SafePlacementMap<{ content: typeof lesson }> = {
  // @ts-expect-error content is a retired container field.
  content: lesson,
};
void invalidCoursePlacement;
void invalidModulePlacement;
void invalidChapterPlacement;

// Old authored content.items/order is no longer accepted.
defineChapter<'invalidLegacy', {}, ['en', 'uk']>({
  id,
  type: 'chapter',
  slug: 'invalidLegacy',
  params: {},
  locale: { title: 'Chapter' },
  children: [],
  // @ts-expect-error No legacy content collection in Chapter Config.
  content: { items: {}, order: [] },
});
