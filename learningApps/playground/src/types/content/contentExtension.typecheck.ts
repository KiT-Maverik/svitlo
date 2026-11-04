import type { Lesson, Question, ContentBlock, AssessmentMethodId } from '@svitlo/engine/content';
import { assessmentMethods_AssessmentMethod_Ids } from '@svitlo/engine/content';

// A textbook can extend canonical response contracts without redefining them.
type MathLesson = Lesson<'response'> & { readonly subject: 'math' };
type MathQuestion = Question<'response'> & { readonly difficulty: 'advanced' };

type Assert<T extends true> = T;
type Extends<A, B> = [A] extends [B] ? true : false;

type LessonExtensionPreservesBase = Assert<Extends<MathLesson, Lesson<'response'>>>;
type QuestionExtensionPreservesBase = Assert<Extends<MathQuestion, Question<'response'>>>;
type TextBlock = Extract<ContentBlock<'response'>, { type: 'text' }>;
type TextBlockHasValue = Assert<'value' extends keyof TextBlock ? true : false>;

void (undefined as unknown as LessonExtensionPreservesBase);
void (undefined as unknown as QuestionExtensionPreservesBase);
void (undefined as unknown as TextBlockHasValue);

const method: AssessmentMethodId = assessmentMethods_AssessmentMethod_Ids.verification;
void method;

// @ts-expect-error arbitrary UUIDs are not registered assessment methods
const unknownMethod: AssessmentMethodId = 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa';
void unknownMethod;
