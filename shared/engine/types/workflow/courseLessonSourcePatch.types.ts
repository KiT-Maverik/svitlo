import type { Lesson_Metadata_Overrides } from '../../configurators/lessons/defineLesson/defineLesson.schemas';
import type { CodingTaskSection_MetadataOverrides } from '../../configurators/sections/defineCodingTaskSection/defineCodingTaskSection.schemas';
import type { ContentSection_MetadataOverrides } from '../../configurators/sections/defineContentSection/defineContentSection.schemas';
import type { FlashcardsSection_MetadataOverrides } from '../../configurators/sections/defineFlashcardsSection/defineFlashcardsSection.schemas';
import type { LearningFlowSection_MetadataOverrides } from '../../configurators/sections/defineLearningFlowSection/defineLearningFlowSection.schemas';
import type { PracticeSection_MetadataOverrides } from '../../configurators/sections/definePracticeSection/definePracticeSection.schemas';
import type { QuizSection_MetadataOverrides } from '../../configurators/sections/defineQuizSection/defineQuizSection.schemas';
import type { LessonWorkflowStage2Section } from './lessonWorkflow.types';

/**
 * Inert Course-authored reference to a published Section. The trusted runner
 * must verify its exact owning Lesson revision and authorize execution before
 * Engine binds it to a real Section Configurator. A SHA is not approval.
 */
export type CourseLessonSectionReference = {
  $ref: 'lesson-section';
  lessonId: string;
  sectionId: string;
  sourceSha: string;
  exportName: string;
};

/** A reviewed, Course-owned new Section: no executable Configurator in the inert draft. */
export type CourseLessonNewSection = {
  $create: 'course-section';
  source: LessonWorkflowStage2Section;
};

/**
 * Extract the concrete children from a real imported Lesson, not from
 * ReturnType<typeof defineLesson>. Its generic Sections parameter collapses to
 * Record<string, never> at that boundary, while Parameters<build.overrides>[0]
 * of an unspecialized generic method also collapses the Added parameter.
 * Neither represents the authoring contract for an actual source Lesson.
 *
 * Reuse the Configurators' own metadata override types; existing ContentBlock
 * leaves retain their exact Build patch parameters. This is solely the inert
 * editorial source shape: the trusted binder still validates the complete
 * resolved patch through the original Lesson Build API.
 */
type BuiltChild = {
  readonly type: string;
  readonly build: { readonly overrides: (...args: never[]) => unknown };
};
type SectionKind = 'content' | 'practice' | 'codingTask' | 'learningFlow' | 'quiz' | 'flashcards';
type SectionChild = BuiltChild & { readonly type: SectionKind };
type ChildKeys<Parent, Child> = Extract<{
  [Key in keyof Parent]-?: Parent[Key] extends Child ? Key : never;
}[keyof Parent], string>;
type SectionKeys<Lesson> = ChildKeys<Lesson, SectionChild>;
type BlockKeys<Section> = ChildKeys<Section, BuiltChild>;

type SectionMetadata<Section> =
  Section extends { readonly type: 'content' } ? ContentSection_MetadataOverrides :
  Section extends { readonly type: 'practice' } ? PracticeSection_MetadataOverrides :
  Section extends { readonly type: 'codingTask' } ? CodingTaskSection_MetadataOverrides :
  Section extends { readonly type: 'learningFlow' } ? LearningFlowSection_MetadataOverrides :
  Section extends { readonly type: 'quiz' } ? QuizSection_MetadataOverrides :
  Section extends { readonly type: 'flashcards' } ? FlashcardsSection_MetadataOverrides :
  never;

type ExistingBlockPatch<Block> =
  Block extends BuiltChild ? Parameters<Block['build']['overrides']>[0] : never;
type ExistingSectionPatch<Section> = SectionMetadata<Section> & {
  children?: BlockKeys<Section>[];
} & {
  [Key in BlockKeys<Section>]?: ExistingBlockPatch<Section[Key]> | false;
};

type AddedReference = CourseLessonSectionReference | CourseLessonNewSection;
type ExistingLessonPatch<
  Lesson,
  Added extends Record<string, unknown>,
> = Lesson_Metadata_Overrides & {
  children?: Extract<SectionKeys<Lesson> | keyof Added, string>[];
} & {
  [Key in SectionKeys<Lesson>]?: ExistingSectionPatch<Lesson[Key]> | false;
};
type VerifiedAdded<
  Lesson,
  Added extends Record<string, unknown>,
> = {
  [Key in keyof Added]: Key extends keyof Lesson | keyof Lesson_Metadata_Overrides | 'children'
    ? never
    : Added[Key];
};

/**
 * A Course source patch preserves the imported Lesson's exact existing
 * Section/ContentBlock keys. Only explicitly listed Added keys accept inert
 * descriptors, never arbitrary Configurator values or legacy wrappers.
 */
export type CourseLessonSourcePatch<
  Lesson extends { readonly type: 'lesson' },
  Added extends Record<string, AddedReference> = {},
> = ExistingLessonPatch<Lesson, Added> & VerifiedAdded<Lesson, Added>;

/**
 * Post-binding form for generated executable Course placement modules.
 * Unlike CourseLessonSourcePatch this allows ONLY the trusted, concrete
 * Section Configurators emitted/imported by the binder, not inert refs.
 * The original Lesson Build API still performs the final semantic validation.
 */
export type CourseLessonBoundPatch<
  Lesson extends { readonly type: 'lesson' },
  Added extends Record<string, SectionChild> = {},
> = ExistingLessonPatch<Lesson, Added> & VerifiedAdded<Lesson, Added>;
