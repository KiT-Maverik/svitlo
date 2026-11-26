/**
 * Course authoring imports the Lesson as a TYPE, not executable draft code.
 * A concrete `typeof lesson` must constrain nested sparse overrides exactly
 * as the original stateless Lesson Build API does.
 */
import { defineText } from '../../../configurators/contentBlocks/primitive/defineText/defineText';
import { defineLesson } from '../../../configurators/lessons/defineLesson/defineLesson';
import { defineContentSection } from '../../../configurators/sections/defineContentSection/defineContentSection';
import type { CourseLessonSourcePatch } from '../../../types/workflow/courseLessonSourcePatch.types';

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
  content: { items: { paragraph }, order: ['paragraph'] },
});
const practice = defineContentSection<'practice', { paragraph: typeof paragraph }, ['en', 'uk']>({
  id: '663572e7-bd85-4516-86e2-3de07d209e04',
  type: 'content',
  slug: 'practice',
  params: {},
  locale: { title: 'Practice', navigationLabel: '2' },
  content: { items: { paragraph }, order: ['paragraph'] },
});
export const lesson = defineLesson({
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
  section: { items: { intro }, order: ['intro'] },
});
type ActualPatch = Parameters<typeof lesson.build.overrides>[0];
const changed = {
  params: { sections: { allowSkipping: false } },
  section: {
    items: {
      intro: {
        content: { items: { paragraph: { locale: { value: { uk: 'Інший текст' } } } } },
      },
    },
  },
} satisfies ActualPatch;
const added = {
  section: { additionalItems: { practice }, order: ['intro', 'practice'] },
} satisfies ActualPatch;
const disabled = { section: { items: { intro: false }, order: [] } } satisfies ActualPatch;
const invalidSlug = {
  section: {
    items: {
      // @ts-expect-error Existing section keys are inferred from the actual Lesson, not string.
      absent: false,
    },
  },
} satisfies ActualPatch;
const invalidAdditionalSlug = {
  section: {
    additionalItems: {
      // @ts-expect-error An existing child cannot be added again via additionalItems.
      intro,
    },
  },
} satisfies ActualPatch;
const invalidValue = {
  // @ts-expect-error Boolean Lesson navigation fields reject string values.
  params: { sections: { allowSkipping: 'false' } },
} satisfies ActualPatch;

void changed;
void added;
void disabled;
void invalidSlug;
void invalidAdditionalSlug;
void invalidValue;

/** The canonical inert Course source keeps actual nested Lesson typing. */
type ReviewedPatch = CourseLessonSourcePatch<typeof lesson>;
const sectionRef = {
  $ref: 'lesson-section' as const,
  lessonId: '663572e7-bd85-4516-86e2-3de07d209e03',
  sectionId: '663572e7-bd85-4516-86e2-3de07d209e04',
  sourceSha: 'a'.repeat(40),
  exportName: 'practice',
};
const reviewed = {
  params: { sections: { allowNavigation: false } },
  section: {
    items: { intro: { content: { items: { paragraph: { locale: { value: { uk: 'Додатковий текст' } } } } } } },
    additionalItems: { practice: sectionRef },
    order: ['intro', 'practice'],
  },
} satisfies ReviewedPatch;
const reviewedDisabled = { section: { items: { intro: false }, order: [] } } satisfies ReviewedPatch;
const invalidReviewChild = {
  section: {
    items: {
      // @ts-expect-error Reviewed Lesson does not contain this Section.
      invented: false,
    },
  },
} satisfies ReviewedPatch;
const invalidReviewAddition = {
  section: {
    additionalItems: {
      // @ts-expect-error Existing Section cannot be reintroduced as an addition.
      intro: sectionRef,
    },
  },
} satisfies ReviewedPatch;
const invalidReviewMetadata = {
  // @ts-expect-error SourcePatch retains Lesson's exact navigation booleans.
  params: { sections: { allowNavigation: 'false' } },
} satisfies ReviewedPatch;
const invalidReviewReference = {
  section: {
    additionalItems: {
      // @ts-expect-error Course drafts accept inert descriptors, not executable Configurators.
      practice,
    },
  },
} satisfies ReviewedPatch;
void reviewed;
void reviewedDisabled;
void invalidReviewChild;
void invalidReviewAddition;
void invalidReviewMetadata;
void invalidReviewReference;
