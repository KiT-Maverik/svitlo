import { createContentBlock } from './createContentBlock';
import { createSection } from './createSection';
import { createLesson } from './createLesson';
import type { ContentBlock, Section } from '@svitlo/contracts/content';

const languages = ['en', 'uk'] as const;

const translated = createContentBlock<typeof languages>()({
  type: 'text',
  id: 'block-id',
  slug: 'intro',
  value: { en: 'Light', uk: 'Світло' },
});
const invariant = createContentBlock<typeof languages>()({
  type: 'markdown',
  id: 'constant-id',
  slug: 'constant',
  locales: 'H₂O',
});
const section = createSection<typeof languages>()({
  type: 'theory',
  id: 'section-id',
  slug: 'theory',
  title: { en: 'Theory', uk: 'Теорія' },
  navigationLabel: '1',
  content: [translated, invariant],
});
const quiz = createSection<typeof languages>()({
  type: 'quiz',
  id: 'quiz-id',
  slug: 'quiz',
  title: 'Quiz',
  navigationLabel: '2',
  parameters: {
    selection: { mode: 'all' },
    layout: { mode: 'stack' },
    feedbackMode: 'immediate',
    interaction: {
      retries: 0,
      showErrors: true,
      showCorrectAnswers: true,
      allowExplanations: true,
      allowDeferring: false,
      allowQuestionNavigation: true,
      skippable: false,
    },
    results: { visibility: 'hidden', showScore: false },
    screen: {},
  },
});
const lesson = createLesson<typeof languages>()({
  id: 'lesson-id',
  slug: 'lesson',
  title: { en: 'Lesson', uk: 'Урок' },
  flashcards: [],
  skills: [],
  questions: {},
  parameters: {
    requireQuiz: false,
    languages,
    sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
  },
  sections: [section, quiz],
});

const sectionSlug: 'theory' = lesson.getData().sections[0].slug;
const blockSlug: 'intro' =
  lesson.getData().sections[0].type === 'theory' ? lesson.getData().sections[0].content[0].slug : 'intro';
const dataSection: Section<'data', typeof languages> = section.getData();
const dataBlock: ContentBlock<'data', typeof languages> = translated.getData();

// @ts-expect-error The localized value must contain all declared languages.
createContentBlock<typeof languages>()({ type: 'text', id: 'bad', slug: 'bad', value: { en: 'Missing uk' } });
// @ts-expect-error Quiz is a Section, not a ContentBlock.
createContentBlock<typeof languages>()({ type: 'quiz', id: 'quiz', slug: 'quiz' });
createSection<typeof languages>()({
  type: 'theory',
  id: 'bad',
  slug: 'bad',
  // @ts-expect-error Missing required translated Section title.
  title: { en: 'Only English' },
  navigationLabel: 'Bad',
  content: [],
});
createSection<typeof languages>()({
  type: 'practice',
  id: 'bad-block',
  slug: 'badBlock',
  title: 'Title',
  navigationLabel: 'Nav',
  content: [
    // @ts-expect-error Invalid ContentBlock locale must be rejected through the Section generic.
    { type: 'text', id: 'bad', slug: 'bad', value: { en: 'Only English' } },
  ],
});
// @ts-expect-error Invalid localized Lesson title must be rejected.
createLesson<typeof languages>()({ ...lesson.getData(), title: { en: 'Only English' } });

void sectionSlug;
void blockSlug;
void dataBlock;
void dataSection;
