import type { ReactNode } from 'react';
import type {
  Lesson_Config,
  Question_Config,
  SceneContentBlock_Config,
  LessonSection_Config,
  AssessmentMethodId,
} from '@svitlo/engine/content';
import { assessmentMethods_AssessmentMethod_Ids } from '@svitlo/engine/content';

// Textbooks extend canonical contracts without changing the package that defines them.
type BiologyLesson = Lesson_Config & {
  readonly subject: 'biology';
  readonly organismIds: readonly string[];
};
type BiologyQuestion = Question_Config & { readonly difficulty: 'advanced' };

type Assert<T extends true> = T;
type Extends<A, B> = [A] extends [B] ? true : false;

type LessonExtensionPreservesBase = Assert<Extends<BiologyLesson, Lesson_Config>>;
type QuestionExtensionPreservesBase = Assert<Extends<BiologyQuestion, Question_Config>>;

void (undefined as unknown as LessonExtensionPreservesBase);
void (undefined as unknown as QuestionExtensionPreservesBase);

// UI representation is supplied by the frontend, never imported by Engine.
const scene: SceneContentBlock_Config<ReactNode> = {
  id: 'scene-example',
  blockType: 'scene',
  component: 'Example React content',
};
type ReactSection = LessonSection_Config<ReactNode>;
type IconContractIsRenderable = Assert<Extends<ReactSection['icon'], ReactNode>>;
void (undefined as unknown as IconContractIsRenderable);
void scene;

const method: AssessmentMethodId = assessmentMethods_AssessmentMethod_Ids.verification;
void method;

// @ts-expect-error arbitrary UUIDs are not registered assessment methods
const unknownMethod: AssessmentMethodId = 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa';
void unknownMethod;
