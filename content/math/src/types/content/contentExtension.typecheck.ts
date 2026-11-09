import type { Lesson, Question, ContentBlock, AssessmentMethodKey, Locale_Languages } from '@svitlo/contracts/content';

// A textbook can extend canonical response contracts without redefining them.
type MathLesson = Lesson<'response', Locale_Languages> & { readonly subject: 'math' };
type MathQuestion = Question<'response', Locale_Languages> & { readonly difficulty: 'advanced' };

type Assert<T extends true> = T;
type Extends<A, B> = [A] extends [B] ? true : false;

type LessonExtensionPreservesBase = Assert<Extends<MathLesson, Lesson<'response', Locale_Languages>>>;
type QuestionExtensionPreservesBase = Assert<Extends<MathQuestion, Question<'response', Locale_Languages>>>;
type TextBlock = Extract<ContentBlock<'response', Locale_Languages>, { type: 'text' }>;
type TextBlockHasValue = Assert<'value' extends keyof TextBlock ? true : false>;

void (undefined as unknown as LessonExtensionPreservesBase);
void (undefined as unknown as QuestionExtensionPreservesBase);
void (undefined as unknown as TextBlockHasValue);

const method: AssessmentMethodKey = 'verification';
void method;

// @ts-expect-error Assessment Method references must be known slugs, not UUIDs.
const unknownMethod: AssessmentMethodKey = 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa';
void unknownMethod;
