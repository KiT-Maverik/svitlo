/**
 * Course authoring imports the Lesson as a TYPE, not executable draft code.
 * A concrete `typeof lesson` must constrain nested sparse overrides exactly
 * as the original stateless Lesson Build API does.
 */
import { defineText } from '../../../configurators/contentBlocks/primitive/defineText/defineText';
import { defineLesson } from '../../../configurators/lessons/defineLesson/defineLesson';
import { defineContentSection } from '../../../configurators/sections/defineContentSection/defineContentSection';
import type { CourseLessonSourcePatch, CourseLessonSectionReference } from '../../../types/workflow/courseLessonSourcePatch.types';

const paragraph = defineText<'paragraph', ['en', 'uk']>({
  id: '663572e7-bd85-4516-86e2-3de07d209e01',
  type: 'text',
  slug: 'paragraph',
  params: {},
  locale: { value: { en: 'Read', uk: 'Прочитай' } },
});
const intro = defineContentSection<'intro', { paragraph: typeof paragraph }, ['en', 'uk']>({
  id: '663572e7-bd85-4516-86e2-3de07d209e02',
  type: 'content',
  slug: 'intro',
  params: {},
  locale: { title: 'Introduction', navigationLabel: '1' },
  children: ['paragraph'],
  paragraph,
});
const practice = defineContentSection<'practice', { paragraph: typeof paragraph }, ['en', 'uk']>({
  id: '663572e7-bd85-4516-86e2-3de07d209e04',
  type: 'content',
  slug: 'practice',
  params: {},
  locale: { title: 'Practice', navigationLabel: '2' },
  children: ['paragraph'],
  paragraph,
});
export const lesson = defineLesson<'reusableLesson', ['en', 'uk'], { intro: typeof intro }>({
  id: '663572e7-bd85-4516-86e2-3de07d209e03',
  type: 'lesson',
  slug: 'reusableLesson',
  skills: [],
  params: {
    quizRequiredForCompletion: false,
    languages: ['en', 'uk'] as const,
    sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
  },
  locale: { title: { en: 'Lesson', uk: 'Урок' } },
  children: ['intro'],
  intro,
});
type ActualPatch = Parameters<typeof lesson.build.overrides>[0];
const changed = {
  params: { sections: { allowSkipping: false } },
  intro: { paragraph: { locale: { value: { uk: 'Інший текст' } } } },
} satisfies ActualPatch;
const added = { practice, children: ['intro', 'practice'] };
void lesson.build.overrides(added, { languages: ['en', 'uk'] });
const disabled = { intro: false, children: [] } satisfies ActualPatch;
const invalidSlug = {
  // @ts-expect-error Only existing Section keys or explicitly authorized additions are valid.
  absent: false,
} satisfies ActualPatch;
const invalidValue = {
  // @ts-expect-error Boolean Lesson navigation fields reject strings.
  params: { sections: { allowSkipping: 'false' } },
} satisfies ActualPatch;

void changed;
void added;
void disabled;
void invalidSlug;
void invalidValue;

/** The canonical inert Course source keeps actual nested Lesson typing. */
type ReviewedPatch = CourseLessonSourcePatch<typeof lesson, { practice: CourseLessonSectionReference }>;
const sectionRef = {
  $ref: 'lesson-section' as const,
  lessonId: '663572e7-bd85-4516-86e2-3de07d209e03',
  sectionId: '663572e7-bd85-4516-86e2-3de07d209e04',
  sourceSha: 'a'.repeat(40),
  exportName: 'practice',
};
const reviewed = {
  params: { sections: { allowNavigation: false } },
  intro: { paragraph: { locale: { value: { uk: 'Додатковий текст' } } } },
  practice: sectionRef,
  children: ['intro', 'practice'],
} satisfies ReviewedPatch;
const reviewedDisabled = { intro: false, children: [] } satisfies CourseLessonSourcePatch<typeof lesson>;
const invalidReviewChild = {
  // @ts-expect-error Existing Lesson cannot disable an unknown Section.
  invented: false,
} satisfies ReviewedPatch;
const invalidReviewAddition = {
  // @ts-expect-error A known original Section cannot be inserted as an inert addition.
  intro: sectionRef,
} satisfies ReviewedPatch;
const invalidReviewMetadata = {
  // @ts-expect-error SourcePatch retains Lesson's exact navigation booleans.
  params: { sections: { allowNavigation: 'false' } },
} satisfies ReviewedPatch;
const invalidReviewReference = {
  // @ts-expect-error Reviewed source must use an inert descriptor for an added Section.
  practice,
} satisfies ReviewedPatch;
void reviewed;
void reviewedDisabled;
void invalidReviewChild;
void invalidReviewAddition;
void invalidReviewMetadata;
void invalidReviewReference;
