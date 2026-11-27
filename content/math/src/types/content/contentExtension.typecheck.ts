import type {
  AssessmentMethodSlug,
  ContentBlock_Text_Data,
  Lesson_Data,
  Question_SelectOneAnswer_Data,
} from '@svitlo/engine/runtime';

// A textbook can extend published Engine Props without redefining their contracts.
type MathLesson = Lesson_Data & { readonly subject: 'math' };
type MathQuestion = Question_SelectOneAnswer_Data & { readonly difficulty: 'advanced' };

type Assert<T extends true> = T;
type Extends<A, B> = [A] extends [B] ? true : false;

type LessonExtensionPreservesBase = Assert<Extends<MathLesson, Lesson_Data>>;
type QuestionExtensionPreservesBase = Assert<Extends<MathQuestion, Question_SelectOneAnswer_Data>>;
type TextBlockHasLocaleValue = Assert<'value' extends keyof ContentBlock_Text_Data['locale'] ? true : false>;

void (undefined as unknown as LessonExtensionPreservesBase);
void (undefined as unknown as QuestionExtensionPreservesBase);
void (undefined as unknown as TextBlockHasLocaleValue);

const method: AssessmentMethodSlug = 'verification';
void method;

// @ts-expect-error Assessment Methods must be known slugs, not UUIDs.
const unknownMethod: AssessmentMethodSlug = 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa';
void unknownMethod;
