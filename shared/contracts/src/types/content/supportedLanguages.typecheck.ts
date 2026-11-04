import type {
  ContentBlock_Catalog,
  ContentBlock_Checkpoint,
  ContentBlock_Quiz_Screen,
  ContentBlock_Text,
} from './blocks';
import { defineContentBlockCatalog } from './blocks';
import { defineLessonData, type Lesson } from './lesson.types';
import type { Question_AnswerWithText, Question_SelectOneAnswer } from './questions';
import type { Locale_Languages } from './locale.types';

const languages = ['en', 'uk'] as const;
type SupportedLanguages = typeof languages;

const text: ContentBlock_Text<'data', SupportedLanguages> = {
  id: 'text-id',
  slug: 'text',
  value: { en: 'Hello', uk: 'Привіт' },
};

const checkpointAnswer: ContentBlock_Checkpoint<'data', SupportedLanguages>['items'][number]['answer'][number] = text;
const quizScreen: ContentBlock_Quiz_Screen<'data', SupportedLanguages> = { content: [text] };
const questionContent: Question_SelectOneAnswer<'data', SupportedLanguages>['question'] = [text];
const correctAnswer: Question_AnswerWithText<'data', SupportedLanguages>['correctAnswers'][number] = {
  en: 'yes',
  uk: 'так',
};
const catalog: ContentBlock_Catalog<'data', SupportedLanguages> = { text: { text } };
const definedCatalog = defineContentBlockCatalog<SupportedLanguages>()({ text: { text: { ...text, slug: 'text' as const } } });
const catalogKey: 'text' = '' as keyof NonNullable<typeof definedCatalog.text>;
const lessonTitle: Lesson<'data', SupportedLanguages>['title'] = { en: 'Lesson', uk: 'Урок' };
const definedLesson = defineLessonData<SupportedLanguages>()({
  id: 'lesson-id',
  slug: 'lesson',
  title: lessonTitle,
  flashcards: [],
  parameters: {
    requireQuiz: false,
    languages,
    sections: { allowNavigation: true, allowSkipping: false, showIndexes: true },
  },
  questions: {},
  sections: {
    intro: {
      id: 'section-id',
      slug: 'intro',
      type: 'theory',
      title: { en: 'Introduction', uk: 'Вступ' },
      navigationLabel: 'Intro',
      content: { text: { text: { ...text, slug: 'text' } } },
    },
  },
});
const sectionKey: 'intro' = '' as keyof typeof definedLesson.sections;
const responseLanguages: Lesson<'response', SupportedLanguages>['parameters']['languages'] = ['en', 'uk'];

// @ts-expect-error A localized value needs every selected language.
const missingText: ContentBlock_Text<'data', SupportedLanguages> = { id: 'missing', slug: 'missing', value: { en: 'Hello' } };
// @ts-expect-error Nested question values use the same selected language set.
const missingAnswer: Question_AnswerWithText<'data', SupportedLanguages>['correctAnswers'][number] = { en: 'yes' };
// @ts-expect-error The language set must be provided explicitly.
type MissingLanguages = ContentBlock_Text<'data'>;
// @ts-expect-error Content units receive the language tuple, not a union of codes.
type InvalidUnion = ContentBlock_Text<'data', 'en' | 'uk'>;
// @ts-expect-error A language outside the lesson tuple is not accepted.
const extraLanguage: ContentBlock_Text<'data', SupportedLanguages> = { id: 'extra', slug: 'extra', value: { en: 'Hello', uk: 'Привіт', fr: 'Bonjour' } };
// @ts-expect-error A broad language tuple includes more languages than en and uk.
const incompleteFull: ContentBlock_Text<'data', Locale_Languages> = { id: 'default', slug: 'default', value: { en: 'Hello', uk: 'Привіт' } };
// @ts-expect-error Lesson data must list every supported language in its declared order.
const incompleteLessonLanguages: Lesson<'data', SupportedLanguages>['parameters']['languages'] = ['en'];
// @ts-expect-error Lesson responses must carry the same complete list.
const incompleteResponseLanguages: Lesson<'response', SupportedLanguages>['parameters']['languages'] = ['en'];

void checkpointAnswer;
void quizScreen;
void questionContent;
void correctAnswer;
void catalog;
void catalogKey;
void lessonTitle;
void definedLesson;
void sectionKey;
void responseLanguages;
void missingText;
void missingAnswer;
void extraLanguage;
void incompleteFull;
void incompleteLessonLanguages;
void incompleteResponseLanguages;
