import type { z } from 'zod';

import type { Assessment_Config } from '../../configurators/assessments/defineAssessment/defineAssessment.schemas';
import type { Chapter_Config } from '../../configurators/courses/defineChapter/defineChapter.schemas';
import type { Course_Config } from '../../configurators/courses/defineCourse/defineCourse.schemas';
import type { Module_Config } from '../../configurators/courses/defineModule/defineModule.schemas';
import type { Episode_Config } from '../../configurators/episodes/defineEpisode/defineEpisode.schemas';
import type { Lesson_Configurator } from '../../configurators/lessons/defineLesson/defineLesson';
import type { CourseLessonSourcePatch } from './courseLessonSourcePatch.types';
import type { Lesson_Config } from '../../configurators/lessons/defineLesson/defineLesson.schemas';
import type { courseWorkflowStage3_Schema } from './courseWorkflowFinal.schemas';
import type { LessonProductionAssessmentRequirements } from './lessonAssessment.types';
import type { workflowLanguages_Schema } from './workflowLanguages.schemas';

/** Stage 1 is a plain editorial config, not a built Course Configurator. */
export type CourseWorkflowStage1Config = Pick<Course_Config, 'id' | 'type' | 'slug'> & {
  /** Only the Config parameters available in methodology planning; languages are production-owned. */
  params?: Partial<Omit<Course_Config['params'], 'languages' | 'scenarioMode'>> & {
    languages?: never;
    scenarioMode?: never;
  };
  locale?: Partial<Course_Config['locale']>;
};

/** The complete planned set is nonempty; publication initially uses only document. */
export type CourseWorkflowStage1Languages = z.infer<typeof workflowLanguages_Schema>;

/** Required methodology fields mirror the Stage 1 YAML field names.
 * Fields formerly optional in YAML are required for a completed Stage 1 plan:
 * the editor must explicitly state scope, depth, entry conditions, accessibility
 * and source notes rather than silently skipping the decision.
 */
export type CourseWorkflowStage1Methodology = {
  /** Explain the learner need and why the Course should exist beyond its topic. */
  purpose: string;
  /** Describe learners' prior knowledge, development and access needs beyond age/grade. */
  audience: string;
  /** Explain subject-specific teaching, practice, feedback and differentiation. */
  approach: string;
  /** State the expected application/transfer level and conceptual limits. */
  depth: string;
  /** Plan keyboard/screen-reader equivalents, language, offline and device support. */
  accessibility: string;
  /** Explain what is included and excluded and the pedagogical reasons why. */
  scope: string;
  /** Separate actual learner prerequisites from competencies to be taught here. */
  entryConditions: string;
  /** Link checkable facts, standards/source versions and any relevant uncertainty. */
  sourceNotes: string;
};

/** Evidence is production metadata, not a claim of Course accreditation. */
export type CourseWorkflowStage1StandardAlignment = {
  /** Refer to an actual canonical standard UUID and relevant edition. */
  standardId: NonNullable<Course_Config['params']['educationStandards']>[number];
  /** Be explicit about intended versus partial versus source-verified mapping. */
  status: 'intended' | 'partial' | 'verified';
  /** Explain which Course outcomes meet which cited requirements and coverage gaps. */
  evidence: string;
  /** Record the real standard edition/version when known. */
  version?: string;
  /** Link an authoritative source that a reviewer can independently inspect. */
  sourceUrl?: string;
  /** Specify the standard's educational jurisdiction without guessing. */
  jurisdiction?: string;
};

/** Editorial-only fields from the Stage 1 Course YAML methodology.
 * Empty arrays/maps mean an explicit decision that nothing currently applies.
 */
export type CourseWorkflowStage1Production = {
  /** Source and planned locales live here, not config.params.languages. */
  languages: CourseWorkflowStage1Languages;
  /** Provide full pedagogical reasoning; the Skill defines substantive adequacy. */
  methodology: CourseWorkflowStage1Methodology;
  /** Explain observable Skill outcomes, depth and acceptable evidence. */
  outcomes: { explanation: string };
  /** Explain real entry knowledge and its verification. */
  prerequisites: { explanation: string };
  /** Map verified standards honestly, or explicitly choose no alignment. */
  standardsAlignment: CourseWorkflowStage1StandardAlignment[];
  /** Name unresolved decisions/owners, or deliberately leave an empty map. */
  openDecisions: Record<string, string>;
};

/** Completed Stage 1: TypeScript requires each methodological deliverable.
 * Stage 2 adds a separate, explicitly typed hierarchy to this same object.
 */
export type CourseWorkflowStage1 = {
  config: CourseWorkflowStage1Config;
  production: CourseWorkflowStage1Production;
};

/** Stage 2 records scope and sequencing rationale for each planned unit.
 * Detailed methodology completeness is defined by the Course Workflow Skill.
 */
export type CourseWorkflowStage2UnitProduction = {
  /** Explain the unit's actual pedagogy, concept progression and learner challenges. */
  methodology: string;
  /** Plan verified competencies achieved in this particular unit. */
  outcomes: NonNullable<Course_Config['params']['outcomes']>;
  /** Identify the real entry Skills/knowledge for this unit. */
  prerequisites: NonNullable<Course_Config['params']['prerequisites']>;
  depth: string;
  /** Justify placement, dependency and transitions in the Course order. */
  sequenceReason: string;
};

/** A provisional Lesson slot: real verified Skill IDs, but no Lesson identity,
 * title, matching result, methodology or Configurator yet.
 * Only Stage 3 resolves the slot to an existing or newly planned Lesson.
 */
export type CourseWorkflowStage2LessonSlot = {
  /** Only verified Skill UUIDs; do not invent a Lesson identity or title yet. */
  config: Pick<Lesson_Config, 'type'> & {
    skills: readonly [Lesson_Config['skills'][number], ...Lesson_Config['skills'][number][]];
  };
};

/** An Episode plan only states the intended situation and why this placement
 * serves Course progression; plot, dialogue, Scene and Section design come later.
 */
export type CourseWorkflowStage2EpisodeProduction = {
  /** What learning context or situation the Episode should address; not a script outline. */
  focus: string;
  /** Why an Episode is needed here rather than another Lesson or no content. */
  purpose: string;
};

/** The Episode script and authored Sections belong to later work.
 * Stage 2 only reserves its position and educational/narrative intent.
 */
export type CourseWorkflowStage2EpisodeSlot = {
  config: Pick<Episode_Config, 'type'>;
  production: CourseWorkflowStage2EpisodeProduction;
};

/** An Assessment is planned by its ordered Stage 2 slot, never an owner-level flag.
 * Upstream Lesson dependencies identify actual Course placement paths or
 * already known Lesson UUIDs, including Lessons outside the immediate owner.
 * Questions and the finished Quiz belong to later independent workflows.
 */
export type CourseWorkflowStage2AssessmentSlot = {
  config: Pick<Assessment_Config, 'type' | 'locale'>;
  production: {
    purpose: string;
    lessonDependencies: readonly [string, ...string[]];
  };
};

/** Chapter can contain provisional Lessons, Episodes and Assessments. */
export type CourseWorkflowStage2Chapter = {
  config: Pick<Chapter_Config, 'type' | 'slug' | 'locale'> & {
    id?: never;
    params?: Partial<Chapter_Config['params']>;
    content: Omit<Chapter_Config['content'], 'items'> & {
      items: Record<
        string,
        CourseWorkflowStage2LessonSlot | CourseWorkflowStage2EpisodeSlot | CourseWorkflowStage2AssessmentSlot
      >;
    };
  };
  production: CourseWorkflowStage2UnitProduction;
};

/** Module can contain Chapters and provisional Lessons/Episodes, but no Module. */
export type CourseWorkflowStage2Module = {
  config: Pick<Module_Config, 'type' | 'slug' | 'locale'> & {
    id?: never;
    params?: Partial<Module_Config['params']>;
    content: Omit<Module_Config['content'], 'items'> & {
      items: Record<
        string,
        | CourseWorkflowStage2Chapter
        | CourseWorkflowStage2LessonSlot
        | CourseWorkflowStage2EpisodeSlot
        | CourseWorkflowStage2AssessmentSlot
      >;
    };
  };
  production: CourseWorkflowStage2UnitProduction;
};

/** Only the Course root may contain Modules. Direct Chapters, Lesson slots and
 * Episode slots are also permitted; no artificial wrapper is required.
 */
export type CourseWorkflowStage2Content = Omit<Course_Config['content'], 'items'> & {
  items: Record<
    string,
    | CourseWorkflowStage2Module
    | CourseWorkflowStage2Chapter
    | CourseWorkflowStage2LessonSlot
    | CourseWorkflowStage2EpisodeSlot
    | CourseWorkflowStage2AssessmentSlot
  >;
};

/** All Stage 1 authoring data remains required; Stage 2 adds only content. */
export type CourseWorkflowStage2Config = CourseWorkflowStage1Config & {
  content: CourseWorkflowStage2Content;
};

export interface CourseWorkflowStage2 extends CourseWorkflowStage1 {
  config: CourseWorkflowStage2Config;
}

/** The planned Skills and Course-local placement slug remain from Stage 2.
 * The lesson ID is present only for an existing, independently owned Lesson.
 */
type CourseWorkflowStage3PlacementConfig = CourseWorkflowStage2LessonSlot['config'] & Pick<Lesson_Config, 'slug'>;

/** Reuse keeps the planned Course placement; the referenced ID is held
 * only by production.existing, either directly or in an override result.
 */
export type CourseWorkflowStage3ExistingLessonConfig = CourseWorkflowStage3PlacementConfig & {
  id?: never;
  params?: never;
  locale?: never;
  section?: never;
  events?: never;
};

/** A declarative reference to the independently owned canonical Lesson.
 * The reviewed sparse Course-local patch is authored separately; built Props
 * fragments never belong in the Stage 3 draft.
 */
export type CourseWorkflowStage3ExistingLessonReference = Pick<Lesson_Config, 'id'> & {
  base?: never;
  locale?: never;
};

/** Verification evidence for reusing an independent Lesson.
 * The Lesson UUID is carried by production.existing; do not store it twice.
 */
export type CourseWorkflowStage3LessonMatch = {
  /** Canonical Lesson methodology file inspected during candidate matching. */
  methodologySourcePath: string;
  /** Real Git revision of the source that was read and assessed. */
  sourceSha: string;
  /** Why the full Skill set, audience, depth and methods are suitable. */
  matchingRationale: string;
  /** Verified localization coverage or documented translation dependency. */
  languageEvidence: string;
};

/** Two outcomes remain: new or existing. An existing Lesson is referenced
 * solely by UUID, with optional plain, placement-local sourcePatch.
 */
export type CourseWorkflowStage3ExistingLesson = {
  config: CourseWorkflowStage3ExistingLessonConfig;
  production: {
    kind: 'existing';
    existing: CourseWorkflowStage3ExistingLessonReference;
    /** Evidence that the referenced Lesson was inspected for pedagogical reuse. */
    matching: CourseWorkflowStage3LessonMatch;
    /** Required explicit assessment decisions for the reused Lesson placement. */
    assessment: LessonProductionAssessmentRequirements;
    /** Named export of the canonical Lesson. This is inert source metadata.
     * A trusted dependency resolver must approve and verify it before execution.
     */
    sourceExportName: string;
    source?: never;
    /** Only the authored sparse Config patch; no pre-built duplicate. In a
     * concrete draft, derive its exact type from a type-only Lesson import:
     * Parameters<typeof actualLesson.build.overrides>[0].
     */
    sourcePatch?: CourseLessonSourcePatch<Lesson_Configurator>;
    /** Editorial explanation of Course-local changes, when there are any.
     * The Course Workflow Skill/review enforces justification for real patches.
     */
    overrideRationale?: string;
    methodology?: never;
    lessonId?: never;
    overrides?: never;
  };
};

/** A Course proposal describes the planned Lesson, not completion of Lesson Stage 1. */
export type CourseWorkflowLessonProposal = {
  methodology: string;
  objective: string;
  depth: string;
  sequenceReason: string;
  assessmentEvidence: string;
  assessment: LessonProductionAssessmentRequirements;
  sourceEvidence?: string;
};

export type CourseWorkflowStage3NewLessonConfig = CourseWorkflowStage3PlacementConfig &
  Pick<Lesson_Config, 'locale'> & {
    id?: never;
    params?: Partial<Omit<Lesson_Config['params'], 'languages'>> & { languages?: never };
    section?: never;
    events?: never;
  };

export type CourseWorkflowStage3NewLesson = {
  config: CourseWorkflowStage3NewLessonConfig;
  production: CourseWorkflowLessonProposal & {
    kind: 'new';
    existing?: never;
    matching?: never;
    lessonId?: never;
    overrides?: never;
    overrideRationale?: never;
    languages?: never;
  };
};

/** Course-owned editorial seed, emitted at the future Lesson's canonical draft path.
 * It carries an allocated identity and Course context, never a Lesson Stage 1 deliverable.
 */
export type CourseWorkflowLessonSeed = {
  config: Omit<CourseWorkflowStage3NewLessonConfig, 'id'> & Pick<Lesson_Config, 'id'>;
  proposal: CourseWorkflowLessonProposal;
  languageContext: CourseWorkflowStage1Languages;
};

export type CourseWorkflowStage3LessonSlot = CourseWorkflowStage3NewLesson | CourseWorkflowStage3ExistingLesson;

/** Stage 3 changes only the nested Lesson slots, keeping Stage 2 hierarchy. */
export type CourseWorkflowStage3Chapter = Omit<CourseWorkflowStage2Chapter, 'config'> & {
  config: Omit<CourseWorkflowStage2Chapter['config'], 'content'> & {
    content: Omit<CourseWorkflowStage2Chapter['config']['content'], 'items'> & {
      items: Record<
        string,
        CourseWorkflowStage3LessonSlot | CourseWorkflowStage2EpisodeSlot | CourseWorkflowStage2AssessmentSlot
      >;
    };
  };
};

export type CourseWorkflowStage3Module = Omit<CourseWorkflowStage2Module, 'config'> & {
  config: Omit<CourseWorkflowStage2Module['config'], 'content'> & {
    content: Omit<CourseWorkflowStage2Module['config']['content'], 'items'> & {
      items: Record<
        string,
        | CourseWorkflowStage3Chapter
        | CourseWorkflowStage3LessonSlot
        | CourseWorkflowStage2EpisodeSlot
        | CourseWorkflowStage2AssessmentSlot
      >;
    };
  };
};

export type CourseWorkflowStage3Content = Omit<CourseWorkflowStage2Content, 'items'> & {
  items: Record<
    string,
    | CourseWorkflowStage3Module
    | CourseWorkflowStage3Chapter
    | CourseWorkflowStage3LessonSlot
    | CourseWorkflowStage2EpisodeSlot
    | CourseWorkflowStage2AssessmentSlot
  >;
};

export type CourseWorkflowStage3Config = Omit<CourseWorkflowStage2Config, 'content'> & {
  content: CourseWorkflowStage3Content;
};

/** Final authoring contract: the executable Zod schema owns this shape. */
export type CourseWorkflowStage3 = z.infer<typeof courseWorkflowStage3_Schema>;
