import type { Lesson_Metadata_Overrides } from '../../configurators/lessons/defineLesson/defineLesson.schemas';
import type { DeepPartial } from '../transformer.types';
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
 * A concrete Lesson override has metadata, children order and direct Section
 * placement keys. It never contains the legacy section.items/additionalItems.
 *
 * Inert references must be explicitly declared as Added by their authored
 * source type. Existing keys retain the concrete Build API's deeply inferred
 * sparse patch types; a would-be addition cannot shadow an existing Section.
 * The trusted binder resolves only those exact descriptors, never executable
 * authored values.
 */
type StructuralFields = 'id' | 'slug' | 'type' | 'draft' | 'children' | 'validate' | 'build' | 'config';
type AuthoredKeys<Node> = Exclude<keyof Node, StructuralFields>;

/** Project a sparse authoring patch from an identified Configurator without
 * erasing its literal children through a generic build.overrides signature.
 * Identity is immutable; child metadata retains its actual authored base type.
 */
type ExistingNodePatch<Node> =
  Node extends { readonly config: { readonly base: infer Base } }
    ? Omit<DeepPartial<Base>, 'id' | 'type' | 'slug' | 'children'> & {
        children?: string[];
      } & { [Key in AuthoredKeys<Node>]?: ExistingNodePatch<Node[Key]> | false }
    : never;

type LessonLike = { readonly type: 'lesson'; readonly children: readonly string[] };
type ExistingLessonPatch<Lesson extends LessonLike> = {
  [Key in AuthoredKeys<Lesson>]?: ExistingNodePatch<Lesson[Key]> | false;
};
type GenericLessonPatch = Lesson_Metadata_Overrides & { children?: string[] } & Record<string, unknown>;
type AddedReference = CourseLessonSectionReference | CourseLessonNewSection;
type VerifiedAdded<Lesson extends LessonLike, Added extends Record<string, AddedReference>> = {
  [Key in keyof Added]: Key extends AuthoredKeys<Lesson> ? never : Added[Key];
};
/** Generic Stage references remain inert and are validated by trusted Zod/Build;
 * a concrete typeof Lesson recovers literal keys and nested locale patch types.
 */
export type CourseLessonSourcePatch<
  Lesson extends LessonLike,
  Added extends Record<string, AddedReference> = {},
> = (
  string extends keyof Lesson
    ? GenericLessonPatch
    : Lesson_Metadata_Overrides & { children?: string[] } & ExistingLessonPatch<Lesson>
) & VerifiedAdded<Lesson, Added>;
