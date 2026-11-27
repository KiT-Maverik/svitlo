import type { Lesson_Configurator } from '../../configurators/lessons/defineLesson/defineLesson';
import type { Lesson_Metadata_Overrides, Lesson_Overrides } from '../../configurators/lessons/defineLesson/defineLesson.schemas';
import type { Section_Configurator } from '../../configurators/sections/section.types';
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
type LessonStructuralFields = 'id' | 'slug' | 'type' | 'draft' | 'children' | 'validate' | 'build' | 'config';
type AuthoredSections<Lesson extends Lesson_Configurator> = Omit<Lesson, LessonStructuralFields>;

/** A generic Lesson_Configurator loses literal Sections; allow inert JSON only
 * at the editorial Stage boundary. Concrete typeof lesson imports retain exact
 * Section keys and child-specific sparse Build patches.
 */
type ConcretePatch<Lesson extends Lesson_Configurator> =
  string extends keyof AuthoredSections<Lesson>
    ? Lesson_Metadata_Overrides & { children?: string[] } & Record<string, unknown>
    : AuthoredSections<Lesson> extends Record<string, Section_Configurator>
      ? Lesson_Overrides<AuthoredSections<Lesson>>
      : Lesson_Metadata_Overrides & { children?: string[] };
type AddedReference = CourseLessonSectionReference | CourseLessonNewSection;
type VerifiedAdded<
  Lesson extends Lesson_Configurator,
  Added extends Record<string, AddedReference>,
> = {
  [Key in keyof Added]: Key extends keyof AuthoredSections<Lesson> ? never : Added[Key];
};
export type CourseLessonSourcePatch<
  Lesson extends Lesson_Configurator,
  Added extends Record<string, AddedReference> = {},
> = ConcretePatch<Lesson> & VerifiedAdded<Lesson, Added>;
