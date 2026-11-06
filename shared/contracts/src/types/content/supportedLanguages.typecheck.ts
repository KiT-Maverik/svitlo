import type { ContentBlock_Checkpoint, ContentBlock_Text } from './blocks';
import type { Quiz_Screen } from './quiz.types';
import { defineLessonData, type Lesson } from './lesson.types';
import type { Question_AnswerWithText, Question_SelectOneAnswer } from './questions';
import type { Locale_Languages } from './locale.types';

const languages = ['en', 'uk'] as const;
type SupportedLanguages = typeof languages;

const text: ContentBlock_Text<'data', SupportedLanguages> = {
  id: 'text-id',
  slug: 'text',
  type: 'text',
  value: { en: 'Hello', uk: 'Привіт' },
};

const checkpointAnswer: ContentBlock_Checkpoint<'data', SupportedLanguages>['items'][number]['answer'][number] = text;
const quizScreen: Quiz_Screen<'data', SupportedLanguages> = { content: [text] };
const questionContent: Question_SelectOneAnswer<'data', SupportedLanguages>['question'] = [text];
const correctAnswer: Question_AnswerWithText<'data', SupportedLanguages>['correctAnswers'][number] = {
  en: 'yes',
  uk: 'так',
};
const lessonTitle: Lesson<'data', SupportedLanguages>['title'] = { en: 'Lesson', uk: 'Урок' };
const definedLesson = defineLessonData<SupportedLanguages>()({
  id: 'lesson-id',
  slug: 'lesson',
  title: lessonTitle,
  flashcards: [],
  skills: [],
  parameters: {
    requireQuiz: false,
    languages,
    sections: { allowNavigation: true, allowSkipping: false, showIndexes: true },
  },
  questions: {},
  sections: [
    {
      id: 'section-id',
      slug: 'intro' as const,
      type: 'theory',
      title: { en: 'Introduction', uk: 'Вступ' },
      navigationLabel: 'Intro',
      content: [text],
    },
  ],
});
const sectionSlug: 'intro' = definedLesson.sections[0].slug;
const responseLanguages: Lesson<'response', SupportedLanguages>['parameters']['languages'] = ['en', 'uk'];

const missingText: ContentBlock_Text<'data', SupportedLanguages> = {
  id: 'missing',
  slug: 'missing',
  type: 'text',
  // @ts-expect-error A localized value needs every selected language.
  value: { en: 'Hello' },
};
// @ts-expect-error Nested question values use the same selected language set.
const missingAnswer: Question_AnswerWithText<'data', SupportedLanguages>['correctAnswers'][number] = { en: 'yes' };
// @ts-expect-error The language set must be provided explicitly.
type MissingLanguages = ContentBlock_Text<'data'>;
// @ts-expect-error Content units receive the language tuple, not a union of codes.
type InvalidUnion = ContentBlock_Text<'data', 'en' | 'uk'>;
const extraLanguage: ContentBlock_Text<'data', SupportedLanguages> = {
  id: 'extra',
  slug: 'extra',
  type: 'text',
  // @ts-expect-error A language outside the lesson tuple is not accepted.
  value: { en: 'Hello', uk: 'Привіт', fr: 'Bonjour' },
};
const incompleteFull: ContentBlock_Text<'data', Locale_Languages> = {
  id: 'default',
  slug: 'default',
  type: 'text',
  // @ts-expect-error A broad language tuple includes more languages than en and uk.
  value: { en: 'Hello', uk: 'Привіт' },
};
// @ts-expect-error Lesson data must list every supported language in its declared order.
const incompleteLessonLanguages: Lesson<'data', SupportedLanguages>['parameters']['languages'] = ['en'];
// @ts-expect-error Lesson responses must carry the same complete list.
const incompleteResponseLanguages: Lesson<'response', SupportedLanguages>['parameters']['languages'] = ['en'];

void checkpointAnswer;
void quizScreen;
void questionContent;
void correctAnswer;
void lessonTitle;
void definedLesson;
void sectionSlug;
void responseLanguages;
void missingText;
void missingAnswer;
void extraLanguage;
void incompleteFull;
void incompleteLessonLanguages;
void incompleteResponseLanguages;
