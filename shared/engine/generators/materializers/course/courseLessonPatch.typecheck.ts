/**
 * Course authoring imports the Lesson as a TYPE, not executable draft code.
 * A concrete `typeof lesson` must constrain nested sparse overrides exactly
 * as the original stateless Lesson Build API does.
 */
import { defineText } from '../../../configurators/contentBlocks/defineText/defineText';
import { defineContentSection } from '../../../configurators/sections/defineContentSection/defineContentSection';
import { defineLesson } from '../../../configurators/lessons/defineLesson/defineLesson';

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
const lesson = defineLesson({
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
