import type { Lesson_Configurator } from '../../configurators/lessons/defineLesson/defineLesson';
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
 * Keep the concrete Lesson Build's deeply inferred existing-item patches and
 * metadata. Only its non-serializable additionalItems Configurators are
 * replaced with inert references. No change to build.overrides() itself.
 *
 * Existing-item names are excluded from additions at compile time; Build still
 * validates identities, supported languages, ordering and nested children at
 * materialization time.
 */
type ConcretePatch<Lesson extends Lesson_Configurator> = Parameters<Lesson['build']['overrides']>[0];
type ExistingItemKeys<Lesson extends Lesson_Configurator> = keyof NonNullable<
  NonNullable<ConcretePatch<Lesson>['section']>['items']
>;
type ExcludeExistingKeys<Lesson extends Lesson_Configurator> =
  string extends ExistingItemKeys<Lesson>
    ? {} // Generic Lesson: no known key set; real Build checks duplicates.
    : { [Key in ExistingItemKeys<Lesson>]?: never };

export type CourseLessonSourcePatch<Lesson extends Lesson_Configurator> = Omit<ConcretePatch<Lesson>, 'section'> & {
  section?: Omit<NonNullable<ConcretePatch<Lesson>['section']>, 'additionalItems'> & {
    additionalItems?: Record<string, CourseLessonSectionReference | CourseLessonNewSection> &
      ExcludeExistingKeys<Lesson>;
  };
};
