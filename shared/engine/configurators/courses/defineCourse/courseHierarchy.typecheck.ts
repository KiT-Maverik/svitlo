import type { LanguageScope } from '#types';
import type { Lesson_Configurator } from '../../lessons/defineLesson';
import { defineChapter } from '../defineChapter';
import { defineModule } from '../defineModule';
import { defineCourse } from './defineCourse';

const id = 'b775647f-203d-481a-a1c7-4d331c779d01';

/** Type-only fixtures: Agent 1 owns the actual Lesson configurator's Build migration. */
declare const lesson: Lesson_Configurator & LanguageScope<['en', 'uk']>;
declare const lessonEnglishOnly: Lesson_Configurator & LanguageScope<['en']>;

const chapter = defineChapter<'chapter', { lesson: typeof lesson }, ['en', 'uk']>({
  id, type: 'chapter', slug: 'chapter', params: {},
  locale: { title: { en: 'Chapter', uk: 'Розділ' } },
  content: { items: { lesson }, order: ['lesson'] },
});
const module = defineModule<'module', { chapter: typeof chapter }, ['en', 'uk']>({
  id, type: 'module', slug: 'module', params: {},
  locale: { title: 'Module' },
  content: { items: { chapter }, order: ['chapter'] },
});
const course = defineCourse<'course', ['en', 'uk'], { module: typeof module; chapter: typeof chapter }>({
  id, type: 'course', slug: 'course',
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
  id, type: 'chapter', slug: 'chapterEnglish', params: {},
  locale: { title: { en: 'Chapter' } },
  content: { items: {}, order: [] },
});
const courseEnglish = defineCourse<'courseEnglish', ['en'], { chapter: typeof chapter }>({
  id, type: 'course', slug: 'courseEnglish',
  params: { languages: ['en'] as const },
  locale: { title: { en: 'Course' }, description: 'Introduction' },
  content: { items: { chapter }, order: ['chapter'] },
});

// Parent language tuples must be a subset of every direct child's declared coverage.
defineCourse<'invalidCourse', ['en', 'uk'], { chapterEnglish: typeof chapterEnglishOnly }>({
  id, type: 'course', slug: 'invalidCourse',
  params: { languages: ['en', 'uk'] as const },
  locale: { title: { en: 'Course', uk: 'Курс' }, description: 'Introduction' },
  // @ts-expect-error A Course cannot contain a Chapter lacking Ukrainian.
  content: { items: { chapterEnglish: chapterEnglishOnly }, order: ['chapterEnglish'] },
});
defineModule<'invalidModule', { chapterEnglish: typeof chapterEnglishOnly }, ['en', 'uk']>({
  id, type: 'module', slug: 'invalidModule', params: {}, locale: { title: 'Module' },
  // @ts-expect-error A Module cannot contain a Chapter lacking Ukrainian.
  content: { items: { chapterEnglish: chapterEnglishOnly }, order: ['chapterEnglish'] },
});
defineChapter<'invalidChapter', { lesson: typeof lessonEnglishOnly }, ['en', 'uk']>({
  id, type: 'chapter', slug: 'invalidChapter', params: {}, locale: { title: 'Chapter' },
  // @ts-expect-error A Chapter cannot contain a Lesson lacking Ukrainian.
  content: { items: { lesson: lessonEnglishOnly }, order: ['lesson'] },
});

// @ts-expect-error A Course cannot change its immutable identity.
course.build.overrides({ slug: 'altered' });
// @ts-expect-error A Course cannot change its advertised language tuple.
course.build.overrides({ params: { languages: ['en'] } });
// @ts-expect-error A Chapter cannot contain Modules.
defineChapter({
  id, type: 'chapter', slug: 'invalid', params: {}, locale: { title: 'Invalid' },
  content: { items: { module }, order: ['module'] },
});
// @ts-expect-error A Module cannot contain Modules.
defineModule({
  id, type: 'module', slug: 'invalid', params: {}, locale: { title: 'Invalid' },
  content: { items: { module }, order: ['module'] },
});
// @ts-expect-error Course locale must contain description.
defineCourse({
  id, type: 'course', slug: 'invalid', params: { languages: ['en'] },
  locale: { title: 'Course' },
  content: { items: {}, order: [] },
});

void course;
void courseEnglish;
void (null as unknown as CourseSlug);
void (null as unknown as NestedKind);
void (null as unknown as ExactChapter);
