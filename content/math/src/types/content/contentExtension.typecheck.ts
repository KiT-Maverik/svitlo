import type {
  Lesson_Props,
  Question_SelectOneAnswer_Props,
  ContentBlock_Text_Props,
  AssessmentMethodSlug,
} from '@svitlo/engine/runtime';

// A textbook can extend published Engine Props without redefining their contracts.
type MathLesson = Lesson_Props & { readonly subject: 'math' };
type MathQuestion = Question_SelectOneAnswer_Props & { readonly difficulty: 'advanced' };

type Assert<T extends true> = T;
type Extends<A, B> = [A] extends [B] ? true : false;

type LessonExtensionPreservesBase = Assert<Extends<MathLesson, Lesson_Props>>;
type QuestionExtensionPreservesBase = Assert<Extends<MathQuestion, Question_SelectOneAnswer_Props>>;
type TextBlockHasLocaleValue = Assert<'value' extends keyof ContentBlock_Text_Props['locale'] ? true : false>;

void (undefined as unknown as LessonExtensionPreservesBase);
void (undefined as unknown as QuestionExtensionPreservesBase);
void (undefined as unknown as TextBlockHasLocaleValue);

const method: AssessmentMethodSlug = 'verification';
void method;

// @ts-expect-error Assessment Methods must be known slugs, not UUIDs.
const unknownMethod: AssessmentMethodSlug = 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa';
void unknownMethod;
