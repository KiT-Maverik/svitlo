import type { Course_Config } from '../../configurators/courses/defineCourse/defineCourse.schemas';
import type { Module_Config } from '../../configurators/courses/defineModule/defineModule.schemas';
import type { Chapter_Config } from '../../configurators/courses/defineChapter/defineChapter.schemas';
import type { Lesson_Config } from '../../configurators/lessons/defineLesson/defineLesson.schemas';
import type { Lesson_Configurator } from '../../configurators/lessons/defineLesson/defineLesson';
import type { Episode_Config } from '../../configurators/episodes/defineEpisode/defineEpisode.schemas';

/** Stage 1 is a plain editorial config, not a built Course Configurator. */
export type CourseWorkflowStage1Config = Pick<Course_Config, 'id' | 'type' | 'slug'> & {
  /** Only the Config parameters available in methodology planning; languages are production-owned. */
  params?: Partial<Omit<Course_Config['params'], 'languages' | 'scenarioMode'>> & {
    languages?: never;
    scenarioMode?: never;
  };
  locale?: Partial<Course_Config['locale']>;
};

type CourseLanguage = Course_Config['params']['languages'][number];

/** The complete planned set is nonempty; publication initially uses only document. */
export type CourseWorkflowStage1Languages = {
  document: CourseLanguage;
  planned: readonly [CourseLanguage, ...CourseLanguage[]];
};

/** Required methodology fields mirror the Stage 1 YAML field names.
 * Fields formerly optional in YAML are required for a completed Stage 1 plan:
 * the editor must explicitly state scope, depth, entry conditions, accessibility
 * and source notes rather than silently skipping the decision.
 */
export type CourseWorkflowStage1Methodology = {
  purpose: string;
  audience: string;
  approach: string;
  depth: string;
  accessibility: string;
  scope: string;
  entryConditions: string;
  sourceNotes: string;
};

/** Evidence is production metadata, not a claim of Course accreditation. */
export type CourseWorkflowStage1StandardAlignment = {
  standardId: NonNullable<Course_Config['params']['educationStandards']>[number];
  status: 'intended' | 'partial' | 'verified';
  evidence: string;
  version?: string;
  sourceUrl?: string;
  jurisdiction?: string;
};

/** Editorial-only fields from the Stage 1 Course YAML methodology.
 * Empty arrays/maps mean an explicit decision that nothing currently applies.
 */
export type CourseWorkflowStage1Production = {
  languages: CourseWorkflowStage1Languages;
  methodology: CourseWorkflowStage1Methodology;
  outcomes: { explanation: string };
  prerequisites: { explanation: string };
  standardsAlignment: CourseWorkflowStage1StandardAlignment[];
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
  methodology: string;
  outcomes: NonNullable<Course_Config['params']['outcomes']>;
  prerequisites: NonNullable<Course_Config['params']['prerequisites']>;
  depth: string;
  sequenceReason: string;
};

/** A provisional Lesson slot: real verified Skill IDs, but no Lesson identity,
 * title, matching result, methodology or Configurator yet.
 * Only Stage 3 resolves the slot to an existing or newly planned Lesson.
 */
export type CourseWorkflowStage2LessonSlot = {
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

/** Chapter can contain only provisional Lessons and Episodes. */
export type CourseWorkflowStage2Chapter = {
  config: Pick<Chapter_Config, 'type' | 'slug' | 'locale'> & {
    id?: never;
    params?: Partial<Chapter_Config['params']>;
    content: Omit<Chapter_Config['content'], 'items'> & {
      items: Record<string, CourseWorkflowStage2LessonSlot | CourseWorkflowStage2EpisodeSlot>;
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
        CourseWorkflowStage2Chapter | CourseWorkflowStage2LessonSlot | CourseWorkflowStage2EpisodeSlot
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
type CourseWorkflowStage3PlacementConfig = CourseWorkflowStage2LessonSlot['config'] &
  Pick<Lesson_Config, 'slug'>;

/** Stage 3 authors the fields needed to start an independent Lesson later.
 * Reuse the canonical Lesson Config, but defer its UUID, languages, Sections and
 * required runtime-only settings until the Lesson's own Production process.
 */
export type CourseWorkflowStage3NewLessonConfig = CourseWorkflowStage3PlacementConfig &
  Pick<Lesson_Config, 'locale'> & {
    id?: never;
    params?: Partial<Omit<Lesson_Config['params'], 'languages'>> & {
      languages?: never;
    };
    section?: never;
    events?: never;
  };

/** Reuse refers to the real existing Lesson by ID, never a copied Config. */
export type CourseWorkflowStage3ExistingLessonConfig = CourseWorkflowStage3PlacementConfig &
  Pick<Lesson_Config, 'id'> & {
    params?: never;
    locale?: never;
    section?: never;
    events?: never;
  };

/** Course-specific intent for a genuinely new Lesson; editorial, not Props. */
export type CourseWorkflowStage3LessonIntent = {
  /** Observable learning objective, not a generic topic label. */
  objective: string;
  /** Pedagogical level and boundaries of the proposed Lesson. */
  depth: string;
  /** Why this Lesson belongs at this position in the Course sequence. */
  sequenceReason: string;
  /** How the intended learning will be evaluated, without inventing Question IDs. */
  assessmentEvidence: string;
};

/** Verification evidence for reusing an independent Lesson.
 * The Lesson UUID is already config.id; do not store it twice.
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

/** New Lesson: full methodology here, no separate Lesson UUID or PR yet. */
export type CourseWorkflowStage3NewLesson = {
  config: CourseWorkflowStage3NewLessonConfig;
  production: CourseWorkflowStage3LessonIntent & {
    kind: 'new';
    /** Complete reviewable Lesson methodology, not a one-line outline.
     * The Course Workflow Skill owns the full pedagogical acceptance criteria.
     */
    methodology: string;
    lessonId?: never;
    matching?: never;
    overrides?: never;
    overrideRationale?: never;
  };
};

/** There are only TWO Lesson outcomes: new or existing.
 * Overrides are an optional Course-local adaptation of the same existing Lesson.
 * The internal pair requires a rationale exactly when overrides are supplied.
 */
export type CourseWorkflowStage3ExistingLesson = {
  config: CourseWorkflowStage3ExistingLessonConfig;
  production: {
    kind: 'existing';
    /** Evidence that the referenced Lesson was actually inspected for reuse. */
    matching: CourseWorkflowStage3LessonMatch;
    methodology?: never;
    lessonId?: never;
  } & (
    | { overrides?: never; overrideRationale?: never }
    | {
        /** Real {base, locale} returned by importedLesson.build.overrides().
         * Never pass this directly as a raw patch to course.build.overrides().
         */
        overrides: ReturnType<Lesson_Configurator['build']['overrides']>;
        overrideRationale: string;
      }
  );
};

export type CourseWorkflowStage3LessonSlot = CourseWorkflowStage3NewLesson | CourseWorkflowStage3ExistingLesson;

/** Stage 3 changes only the nested Lesson slots, keeping Stage 2 hierarchy. */
export type CourseWorkflowStage3Chapter = Omit<CourseWorkflowStage2Chapter, 'config'> & {
  config: Omit<CourseWorkflowStage2Chapter['config'], 'content'> & {
    content: Omit<CourseWorkflowStage2Chapter['config']['content'], 'items'> & {
      items: Record<string, CourseWorkflowStage3LessonSlot | CourseWorkflowStage2EpisodeSlot>;
    };
  };
};

export type CourseWorkflowStage3Module = Omit<CourseWorkflowStage2Module, 'config'> & {
  config: Omit<CourseWorkflowStage2Module['config'], 'content'> & {
    content: Omit<CourseWorkflowStage2Module['config']['content'], 'items'> & {
      items: Record<
        string,
        CourseWorkflowStage3Chapter | CourseWorkflowStage3LessonSlot | CourseWorkflowStage2EpisodeSlot
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
  >;
};

export type CourseWorkflowStage3Config = Omit<CourseWorkflowStage2Config, 'content'> & {
  content: CourseWorkflowStage3Content;
};

export interface CourseWorkflowStage3 extends CourseWorkflowStage2 {
  config: CourseWorkflowStage3Config;
}
