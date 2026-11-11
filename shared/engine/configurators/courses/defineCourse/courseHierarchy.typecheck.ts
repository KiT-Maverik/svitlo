import { defineLesson } from '../../lessons/defineLesson';
import { defineChapter } from '../defineChapter';
import { defineModule } from '../defineModule';
import { defineCourse } from './defineCourse';

const id = 'b775647f-203d-481a-a1c7-4d331c779d01';
const lesson = defineLesson({
  id,
  type: 'lesson',
  slug: 'lesson',
  skills: [],
  params: {
    requireQuiz: false,
    languages: ['en', 'uk'] as const,
    sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
  },
  locale: { title: 'Lesson' },
  section: { items: {}, order: [] },
  flashcards: [],
});
const chapter = defineChapter({
  id,
  type: 'chapter',
  slug: 'chapter',
  params: {},
  locale: { title: 'Chapter' },
  content: { items: { lesson }, order: ['lesson'] },
});
const module = defineModule({
  id,
  type: 'module',
  slug: 'module',
  params: {},
  locale: { title: 'Module' },
  content: { items: { chapter }, order: ['chapter'] },
});
const course = defineCourse({
  id,
  type: 'course',
  slug: 'course',
  params: { languages: ['en', 'uk'] as const },
  locale: { title: 'Course', description: 'Introduction' },
  content: { items: { module, chapter, lesson }, order: ['module', 'chapter', 'lesson'] },
});

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Expect<T extends true> = T;
type CourseSlug = Expect<Equal<typeof course.slug, 'course'>>;
type NestedKind = Expect<Equal<typeof course.content.items.module.type, 'module'>>;
type ExactChapter = Expect<Equal<typeof module.content.items.chapter, typeof chapter>>;

// @ts-expect-error A Chapter cannot contain Modules.
defineChapter({
  id,
  type: 'chapter',
  slug: 'invalid',
  params: {},
  locale: { title: 'Invalid' },
  content: { items: { module }, order: ['module'] },
});
// @ts-expect-error A Module cannot contain Modules.
defineModule({
  id,
  type: 'module',
  slug: 'invalid',
  params: {},
  locale: { title: 'Invalid' },
  content: { items: { module }, order: ['module'] },
});
// @ts-expect-error Course locale must contain description.
defineCourse({
  id,
  type: 'course',
  slug: 'invalid',
  params: { languages: ['en'] },
  locale: { title: 'Course' },
  content: { items: {}, order: [] },
});

void course;
void (null as unknown as CourseSlug);
void (null as unknown as NestedKind);
void (null as unknown as ExactChapter);
