import type { Course_Config } from '../../configurators/courses/defineCourse/defineCourse.schemas';
import type { Module_Config } from '../../configurators/courses/defineModule/defineModule.schemas';
import type { Chapter_Config } from '../../configurators/courses/defineChapter/defineChapter.schemas';
import type { Lesson_Config } from '../../configurators/lessons/defineLesson/defineLesson.schemas';
import type { Lesson_Configurator } from '../../configurators/lessons/defineLesson/defineLesson';
import type { Episode_Config } from '../../configurators/episodes/defineEpisode/defineEpisode.schemas';

/** Stage 1 is a plain editorial config, not a built Course Configurator. */
/** Keep the verified Course UUID, discriminator and stable slug in Config.
 * Explain rationale in production, never by inventing Config fields.
 */
export type CourseWorkflowStage1Config = Pick<Course_Config, 'id' | 'type' | 'slug'> & {
  /** Specify real audience ranges, verified Skill outcomes and entry prerequisites where relevant. Language planning and narrative mode are not Config decisions here. */
  params?: Partial<Omit<Course_Config['params'], 'languages' | 'scenarioMode'>> & {
    languages?: never;
    scenarioMode?: never;
  };
  /** Author genuine document-language title/description; do not present untranslated copy as locale coverage. */
  locale?: Partial<Course_Config['locale']>;
};

type CourseLanguage = Course_Config['params']['languages'][number];

/** The complete planned set is nonempty; publication initially uses only document. */
export type CourseWorkflowStage1Languages = {
  /** The actual editorial source language used to author this Course, not a guessed target. */
  document: CourseLanguage;
  /** Nonempty intended publication languages; each will need real separate translation and review. */
  planned: readonly [CourseLanguage, ...CourseLanguage[]];
};

/** Complete Stage 1 methodology. The Course Workflow Skill specifies pedagogical adequacy; avoid token placeholders. */
export type CourseWorkflowStage1Methodology = {
  /** Explain the learner need and why this Course should exist, not just its topic. */
  purpose: string;
  /** Describe actual learners, prior knowledge, developmental and accessibility assumptions beyond age/grade. */
  audience: string;
  /** Explain the discipline-specific explanatory models, practice, feedback and differentiation. */
  approach: string;
  /** Define intended performance level and boundaries, including application/transfer where appropriate. */
  depth: string;
  /** Plan equivalent accessible interactions, language/cultural constraints, weak-device and offline access. */
  accessibility: string;
  /** Identify included concepts, exclusions and coverage limitations with an educational rationale. */
  scope: string;
  /** Distinguish prerequisite competencies and readiness/support conditions from Skills taught. */
  entryConditions: string;
  /** Cite checkable subject and standards sources, versions, uncertainty and verification limits. */
  sourceNotes: string;
};

/** Evidence is production metadata, not a claim of Course accreditation. */
export type CourseWorkflowStage1StandardAlignment = {
  /** Reference an actual canonical EducationStandard UUID, not a free-text invented standard. */
  standardId: NonNullable<Course_Config['params']['educationStandards']>[number];
  /** Distinguish aspiration, partly mapped coverage and verifiable alignment without implying accreditation. */
  status: 'intended' | 'partial' | 'verified';
  /** Explain which Course outcomes correspond to which source requirements and what remains uncovered. */
  evidence: string;
  /** Record the cited standard's actual edition/version when known. */
  version?: string;
  /** Include a verifiable authoritative publication or other reproducible reference. */
  sourceUrl?: string;
  /** Specify the applicable educational jurisdiction; avoid silently applying another system's standard. */
  jurisdiction?: string;
};

/** Editorial-only Stage 1 production. Empty standards/decision collections must reflect deliberate assessment. */
export type CourseWorkflowStage1Production = {
  /** Keep source and planned locales here exclusively; do not add config.params.languages. */
  languages: CourseWorkflowStage1Languages;
  /** Supply a reviewable full Course rationale according to the canonical Skill. */
  methodology: CourseWorkflowStage1Methodology;
  /** Explain observable competencies, expected depth and appropriate evidence; verify referenced Skills. */
  outcomes: { explanation: string };
  /** Explain real required entry skills/knowledge and which needs will be taught instead. */
  prerequisites: { explanation: string };
  /** Map each actual standard to source/version and truthful extent, or explicitly choose none. */
  standardsAlignment: CourseWorkflowStage1StandardAlignment[];
  /** Record unresolved curriculum/standard/taxonomy decisions and who must resolve each, or explicitly none. */
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
  /** Explain the specific unit's conceptual progression, teaching approach and learner challenges. */
  methodology: string;
  /** Name verified competencies actually targeted within this unit, not a blanket Domain mastery claim. */
  outcomes: NonNullable<Course_Config['params']['outcomes']>;
  /** Specify knowledge/Skills the learner needs before this unit, with a real pedagogical rationale. */
  prerequisites: NonNullable<Course_Config['params']['prerequisites']>;
  /** Define expected conceptual and performance depth for this unit, not just its heading. */
  depth: string;
  /** Explain why this unit follows its predecessors and prepares its successors. */
  sequenceReason: string;
};

/** A provisional Lesson slot: real verified Skill IDs, but no Lesson identity,
 * title, matching result, methodology or Configurator yet.
 * Only Stage 3 resolves the slot to an existing or newly planned Lesson.
 */
export type CourseWorkflowStage2LessonSlot = {
  /** Reserve a Lesson position without assigning identity, title, methodology or existing-Lesson match. */
  config: Pick<Lesson_Config, 'type'> & {
    /** Nonempty actual taxonomy Skill UUIDs needed at this position; verify existence and scope. */
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
  /** Stable Chapter key, source title and ordered Lesson/Episode slots; never nest Chapters/Modules. */
  config: Pick<Chapter_Config, 'type' | 'slug' | 'locale'> & {
    id?: never;
    /** Optional real Chapter metadata; do not fake materialized identity. */
    params?: Partial<Chapter_Config['params']>;
    /** Preserve actual chapter sequence and explain dependencies in production. */
    content: Omit<Chapter_Config['content'], 'items'> & {
      items: Record<string, CourseWorkflowStage2LessonSlot | CourseWorkflowStage2EpisodeSlot>;
    };
  };
  /** Complete Chapter-level methodology, outcomes, prerequisites, depth and ordering rationale. */
  production: CourseWorkflowStage2UnitProduction;
};

/** Module can contain Chapters and provisional Lessons/Episodes, but no Module. */
export type CourseWorkflowStage2Module = {
  /** Stable Module key and authored title; modules may have Chapters/slots, never nested Modules. */
  config: Pick<Module_Config, 'type' | 'slug' | 'locale'> & {
    id?: never;
    /** Optional real Module metadata, not invented materializer output. */
    params?: Partial<Module_Config['params']>;
    /** Order every Chapter/Lesson/Episode; justify pedagogy in production. */
    content: Omit<Module_Config['content'], 'items'> & {
      items: Record<
        string,
        CourseWorkflowStage2Chapter | CourseWorkflowStage2LessonSlot | CourseWorkflowStage2EpisodeSlot
      >;
    };
  };
  /** Complete Module-level learning rationale, outcomes, entry dependencies and sequencing. */
  production: CourseWorkflowStage2UnitProduction;
};

/** Only the Course root may contain Modules. Direct Chapters, Lesson slots and
 * Episode slots are also permitted; no artificial wrapper is required.
 */
/** Keep Course child keys stable and order explicit. Root may hold Modules, Chapters, Lessons and Episodes. */
export type CourseWorkflowStage2Content = Omit<Course_Config['content'], 'items'> & {
  /** Every child requires its own valid editorial methodology/intent at the stage's depth. */
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
  /** Add one ordered Course hierarchy while preserving Stage 1 identity/languages/methodology. */
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
    /** Include real learner/settings metadata when pedagogically warranted; defer Lesson languages to standalone production. */
    params?: Partial<Omit<Lesson_Config['params'], 'languages'>> & {
      languages?: never;
    };
    section?: never;
    events?: never;
  };

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

/** One uniform plain object for every existing Lesson placement.
 * The mandatory ID identifies the independently owned Lesson.
 * Optional base/locale reuse exactly the sparse Lesson Build override format.
 * Stage 3 authoring should use importedLesson.id or the actual result of
 * importedLesson.build.overrides(...), not fabricate a patch manually.
 */
/** Reference only a verified imported Lesson ID or the actual imported Lesson build.overrides result.
 * Preserve {id,base?,locale?}; never duplicate or mutate its standalone source.
 */
export type CourseWorkflowStage3ExistingLessonReference = Pick<Lesson_Config, 'id'> &
  Partial<Pick<ReturnType<Lesson_Configurator['build']['overrides']>, 'base' | 'locale'>>;

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

/** New Lesson: full methodology here, no separate Lesson UUID or PR yet. */
export type CourseWorkflowStage3NewLesson = {
  /** Real Course placement slug, Skill targets and source title; no UUID/Sections/events. */
  config: CourseWorkflowStage3NewLessonConfig;
  /** Plan independently owned Lesson teaching and assessment before assigning its Stage 5 UUID. */
  production: CourseWorkflowStage3LessonIntent & {
    /** Select creation only after rejecting pedagogically suitable existing Lessons. */
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

/** Two outcomes remain: new or existing. Every existing placement uses
 * exactly the same { id, base?, locale? } reference object, regardless of
 * whether this Course modifies the Lesson.
 */
export type CourseWorkflowStage3ExistingLesson = {
  /** Course-local placement and intended verified Skills; no duplicate standalone Lesson identity. */
  config: CourseWorkflowStage3ExistingLessonConfig;
  /** Explain how the independently owned Lesson is suitable, and any Course-only adaptation. */
  production: {
    /** Choose reuse only after checking the actual Lesson methodology and its source revision. */
    kind: 'existing';
    /** Import a real Lesson; use { id: existingLesson.id } or its build.overrides() result. */
    existing: CourseWorkflowStage3ExistingLessonReference;
    /** Evidence that the referenced Lesson was inspected for pedagogical reuse. */
    matching: CourseWorkflowStage3LessonMatch;
    /** Editorial explanation of Course-local changes, when there are any.
     * The Course Workflow Skill/review enforces justification for real patches.
     */
    overrideRationale?: string;
    methodology?: never;
    lessonId?: never;
    overrides?: never;
  };
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
  /** Retain complete hierarchy/order, resolving every Lesson slot to 'new' or 'existing'. */
  content: CourseWorkflowStage3Content;
};

export interface CourseWorkflowStage3 extends CourseWorkflowStage2 {
  config: CourseWorkflowStage3Config;
}
