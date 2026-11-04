import type {
  ContentBlock_Catalog,
  ContentBlock_Checkpoint,
  ContentBlock_Quiz_Screen,
  ContentBlock_Text,
} from './blocks';
import { defineContentBlockCatalog } from './blocks';
import { defineLessonData, type Lesson } from './lesson.types';
import type { Question_AnswerWithText, Question_SelectOneAnswer } from './questions';
import type { LanguageCode } from '../languages';

type SupportedLanguages = 'en' | 'uk';

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
    languages: ['en', 'uk'],
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

// @ts-expect-error A localized value needs every selected language.
const missingText: ContentBlock_Text<'data', SupportedLanguages> = { id: 'missing', slug: 'missing', value: { en: 'Hello' } };
// @ts-expect-error Nested question values use the same selected language set.
const missingAnswer: Question_AnswerWithText<'data', SupportedLanguages>['correctAnswers'][number] = { en: 'yes' };
// @ts-expect-error The language set must be provided explicitly.
type MissingLanguages = ContentBlock_Text<'data'>;
// @ts-expect-error LanguageCode includes more languages than en and uk.
const incompleteFull: ContentBlock_Text<'data', LanguageCode> = { id: 'default', slug: 'default', value: { en: 'Hello', uk: 'Привіт' } };

void checkpointAnswer;
void quizScreen;
void questionContent;
void correctAnswer;
void catalog;
void catalogKey;
void lessonTitle;
void definedLesson;
void sectionKey;
void missingText;
void missingAnswer;
void incompleteFull;
