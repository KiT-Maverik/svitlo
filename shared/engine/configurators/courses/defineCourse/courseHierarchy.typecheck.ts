import type { ChildrenSupporting, LanguageScope } from '#types';
import type { Lesson_Configurator } from '../../lessons/defineLesson';
import { defineChapter } from '../defineChapter';
import { defineModule, type Module_Child } from '../defineModule';
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
  content: { items: { lesson }, order: ['lesson'] },
});
const module = defineModule<'module', { chapter: typeof chapter }, ['en', 'uk']>({
  id,
  type: 'module',
  slug: 'module',
  params: {},
  locale: { title: 'Module' },
  content: { items: { chapter }, order: ['chapter'] },
});
const course = defineCourse<'course', ['en', 'uk'], { module: typeof module; chapter: typeof chapter }>({
  id,
  type: 'course',
  slug: 'course',
  params: { languages: ['en', 'uk'] as const },
  locale: { title: { en: 'Course', uk: 'Курс' }, description: 'Introduction' },
  content: { items: { module, chapter }, order: ['module', 'chapter'] },
});

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Expect<T extends true> = T;
type CourseSlug = Expect<Equal<typeof course.slug, 'course'>>;
type NestedKind = Expect<Equal<typeof course.content.items.module.type, 'module'>>;
type ExactChapter = Expect<Equal<typeof module.content.items.chapter, typeof chapter>>;

const chapterEnglishOnly = defineChapter<'chapterEnglish', {}, ['en']>({
  id,
  type: 'chapter',
  slug: 'chapterEnglish',
  params: {},
  locale: { title: { en: 'Chapter' } },
  content: { items: {}, order: [] },
});
const courseEnglish = defineCourse<'courseEnglish', ['en'], { chapter: typeof chapter }>({
  id,
  type: 'course',
  slug: 'courseEnglish',
  params: { languages: ['en'] as const },
  locale: { title: { en: 'Course' }, description: 'Introduction' },
  content: { items: { chapter }, order: ['chapter'] },
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
  content: { items: {}, order: [] },
});

void course;
void courseEnglish;
void (null as unknown as CourseSlug);
void (null as unknown as NestedKind);
void (null as unknown as ExactChapter);

/** Nested language scope is statically checked for publication as well as composition. */
course.build.props({ languages: ['en', 'uk'] });
course.build.props({ languages: ['uk'] });
module.build.props({ languages: ['en'] });
chapter.build.props({ languages: ['uk'] });
course.build.overrides({}, { languages: ['uk'] });
// @ts-expect-error Polish is not guaranteed by Course.
course.build.props({ languages: ['pl'] });
// @ts-expect-error Module does not guarantee Polish.
module.build.props({ languages: ['pl'] });
// @ts-expect-error Chapter does not guarantee German.
chapter.build.props({ languages: ['de'] });
// @ts-expect-error Override publication languages are checked.
course.build.overrides({}, { languages: ['de'] });
// @ts-expect-error Explicit publication languages are required.
course.build.props();
// @ts-expect-error Overrides require explicit language options.
course.build.overrides({});
