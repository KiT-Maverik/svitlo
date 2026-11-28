import type { Lesson_Configurator } from '../../configurators/lessons/defineLesson/defineLesson';
import type { Lesson_Config } from '../../configurators/lessons/defineLesson/defineLesson.schemas';
import type { CourseLessonSourcePatch } from './courseLessonSourcePatch.types';
import type {
  CourseWorkflowLessonSeed,
  CourseWorkflowStage1,
  CourseWorkflowStage1Config,
  CourseWorkflowStage1Languages,
  CourseWorkflowStage1Methodology,
  CourseWorkflowStage1Production,
  CourseWorkflowStage2,
  CourseWorkflowStage2Chapter,
  CourseWorkflowStage2ChapterChild,
  CourseWorkflowStage2Config,
  CourseWorkflowStage2EpisodeProduction,
  CourseWorkflowStage2EpisodeSlot,
  CourseWorkflowStage2LessonSlot,
  CourseWorkflowStage2Module,
  CourseWorkflowStage2ModuleChild,
  CourseWorkflowStage3,
  CourseWorkflowStage3Chapter,
  CourseWorkflowStage3ExistingLesson,
  CourseWorkflowStage3ExistingLessonConfig,
  CourseWorkflowStage3ExistingLessonReference,
  CourseWorkflowStage3LessonMatch,
  CourseWorkflowStage3LessonSlot,
  CourseWorkflowStage3Module,
  CourseWorkflowStage3NewLesson,
  CourseWorkflowStage3NewLessonConfig,
} from './courseWorkflow.types';
import type { LessonProductionAssessmentRequirements } from './lessonAssessment.types';

const config = {
  id: '663572e7-bd85-4516-86e2-3de07d209e03',
  slug: 'astronomyIntro',
  type: 'course',
  params: {
    age: { min: 6, max: 8 },
    grade: { min: 1, max: 3 },
    outcomes: { skills: [] },
    prerequisites: { skills: [] },
  },
  locale: { title: 'Astronomy', description: 'First observations' },
} satisfies CourseWorkflowStage1Config;

const methodology = {
  purpose: 'Teach observation skills',
  audience: 'Beginning learners',
  approach: 'Observe and compare',
  depth: 'Introductory',
  accessibility: 'Multiple accessible representations',
  scope: 'Observing the sky safely',
  entryConditions: 'No assumed astronomy knowledge',
  sourceNotes: 'Review verified age-appropriate educational sources',
} satisfies CourseWorkflowStage1Methodology;

const complete = {
  config,
  production: {
    languages: { document: 'uk', planned: ['uk', 'en'] },
    methodology,
    outcomes: { explanation: 'Recognize observable changes in the sky' },
    prerequisites: { explanation: 'No subject-specific prerequisites' },
    standardsAlignment: [],
    openDecisions: {},
  },
} satisfies CourseWorkflowStage1;

// @ts-expect-error Production methodology and language planning are mandatory.
const missingProduction: CourseWorkflowStage1 = { config };

// @ts-expect-error Stage 1 cannot silently omit the languages object.
const missingLanguages: CourseWorkflowStage1Production = {
  methodology,
  outcomes: { explanation: 'Observe' },
  prerequisites: { explanation: 'None' },
  standardsAlignment: [],
  openDecisions: {},
};

// @ts-expect-error Methodology must include scope, depth, entry conditions and accessibility.
const incompleteMethodology: CourseWorkflowStage1Methodology = {
  purpose: 'Teach',
  audience: 'Learners',
  approach: 'Observe',
};

const emptyPlannedLanguages: CourseWorkflowStage1Languages = {
  document: 'uk',
  // @ts-expect-error A completed Stage 1 always declares at least one planned language.
  planned: [],
};

const forbiddenConfigLanguages: CourseWorkflowStage1Config = {
  id: '663572e7-bd85-4516-86e2-3de07d209e03',
  type: 'course',
  slug: 'bad',
  params: {
    // @ts-expect-error Planned languages belong only in production.languages.
    languages: ['uk'],
  },
};

const forbiddenScenarioMode: CourseWorkflowStage1Config = {
  id: '663572e7-bd85-4516-86e2-3de07d209e03',
  type: 'course',
  slug: 'bad',
  params: {
    // @ts-expect-error Scenario decisions are explicitly excluded from Stage 1.
    scenarioMode: 'story',
  },
};

void complete;
void missingProduction;
void missingLanguages;
void incompleteMethodology;
void emptyPlannedLanguages;
void forbiddenConfigLanguages;
void forbiddenScenarioMode;

/** Stage 2 extends the exact reviewed Stage 1 data (including production). */
const lessonSlot = {
  config: {
    type: 'lesson',
    skills: ['663572e7-bd85-4516-86e2-3de07d209e04'],
  },
} satisfies CourseWorkflowStage2LessonSlot;

const episodeSlot = {
  config: { type: 'episode' },
  production: {
    focus: 'Introduce the observation problem motivating the next chapter',
    purpose: 'Connect the previous Lessons to the upcoming application',
  },
} satisfies CourseWorkflowStage2EpisodeSlot;

const incompleteEpisodeProduction: CourseWorkflowStage2EpisodeProduction = {
  focus: 'Transition from sky observations to patterns',
  // @ts-expect-error An Episode slot must explain why it belongs in this sequence.
  purpose: undefined,
};

// @ts-expect-error An Episode slot needs an explicit purpose and a focus.
const episodeWithoutProduction: CourseWorkflowStage2EpisodeSlot = { config: { type: 'episode' } };

const chapter = {
  config: {
    type: 'chapter',
    slug: 'observations',
    locale: { title: 'Observations' },
    children: ['observe', 'reflection'],
    observe: lessonSlot,
    reflection: episodeSlot,
  },
  production: {
    methodology: 'Observe first, then reflect',
    outcomes: { skills: ['663572e7-bd85-4516-86e2-3de07d209e04'] },
    prerequisites: { skills: [] },
    depth: 'Introductory',
    sequenceReason: 'Foundational observation before explanation',
  },
} satisfies CourseWorkflowStage2Chapter;

const module = {
  config: {
    type: 'module',
    slug: 'skyBasics',
    locale: { title: 'Sky basics' },
    children: ['observations', 'directLesson', 'directEpisode'],
    observations: chapter,
    directLesson: lessonSlot,
    directEpisode: episodeSlot,
  },
  production: {
    methodology: 'Introductory sky observation unit',
    outcomes: { skillGroups: [] },
    prerequisites: { courses: [] },
    depth: 'Foundational',
    sequenceReason: 'Introduces concepts needed by later units',
  },
} satisfies CourseWorkflowStage2Module;

const planned = {
  ...complete,
  config: {
    ...complete.config,
    children: ['skyBasics', 'directChapter', 'directLesson', 'directEpisode'],
    skyBasics: module,
    directChapter: chapter,
    directLesson: lessonSlot,
    directEpisode: episodeSlot,
  },
} satisfies CourseWorkflowStage2;

const explicitlyEmpty = {
  ...complete,
  config: { ...complete.config, children: [] },
} satisfies CourseWorkflowStage2;

// @ts-expect-error Stage 2 must explicitly supply an ordered children collection.
const missingStage2Content: CourseWorkflowStage2Config = config;

const stage1DoesNotContainContent: CourseWorkflowStage1Config = {
  ...config,
  // @ts-expect-error Stage 1 must not contain Modules, Chapters, Episodes or Lessons.
  content: { items: {}, order: [] },
};

// @ts-expect-error A Stage 2 Config cannot omit the children order.
const missingStage2Order: CourseWorkflowStage2Config = { ...config, observe: lessonSlot };

// These role-union checks remain statically strict even though dynamic keys
// of an inert Course draft are validated by the final Stage Zod schema.
// @ts-expect-error A Module cannot contain another Module.
const moduleUnderModule: CourseWorkflowStage2ModuleChild = module;
// @ts-expect-error A Chapter cannot contain Modules.
const moduleUnderChapter: CourseWorkflowStage2ChapterChild = module;
// @ts-expect-error A Chapter cannot contain another Chapter.
const chapterUnderChapter: CourseWorkflowStage2ChapterChild = chapter;

const emptyLessonSkills: CourseWorkflowStage2LessonSlot = {
  config: {
    type: 'lesson',
    // @ts-expect-error A provisional Lesson must target a nonempty verified Skill ID list.
    skills: [],
  },
};

const prematureLessonIdentity: CourseWorkflowStage2LessonSlot = {
  config: {
    type: 'lesson',
    skills: ['663572e7-bd85-4516-86e2-3de07d209e04'],
    // @ts-expect-error Lesson IDs are matched or generated only after Stage 2.
    lessonId: '663572e7-bd85-4516-86e2-3de07d209e05',
  },
};

const prematureEpisodeSections: CourseWorkflowStage2EpisodeSlot = {
  config: {
    type: 'episode',
    // @ts-expect-error Stage 2 may place an Episode slot, not author its Sections.
    section: { items: {}, order: [] },
  },
};

const prematureModuleId: CourseWorkflowStage2Module = {
  ...module,
  config: {
    ...module.config,
    // @ts-expect-error New Module identities are assigned at materialization.
    id: '663572e7-bd85-4516-86e2-3de07d209e06',
  },
};

const missingModuleMethodology: CourseWorkflowStage2Module = {
  config: module.config,
  // @ts-expect-error A Module must have Stage 2 methodology and sequence rationale.
  production: { depth: 'Introductory' },
};

type Assert<Condition extends true> = Condition;
type IsNever<T> = [T] extends [never] ? true : false;
type ModuleChildren = CourseWorkflowStage2ModuleChild;
type ChapterChildren = CourseWorkflowStage2ChapterChild;
type ModuleChild = Extract<ModuleChildren, { config: { type: 'module' } }>;
type ChapterModuleChild = Extract<ChapterChildren, { config: { type: 'module' } }>;
type ChapterChapterChild = Extract<ChapterChildren, { config: { type: 'chapter' } }>;

export type Stage2NestingChecks = [
  Assert<IsNever<ModuleChild>>,
  Assert<IsNever<ChapterModuleChild>>,
  Assert<IsNever<ChapterChapterChild>>,
];

void lessonSlot;
void episodeSlot;
void incompleteEpisodeProduction;
void episodeWithoutProduction;
void chapter;
void module;
void planned;
void explicitlyEmpty;
void missingStage2Content;
void stage1DoesNotContainContent;
void missingStage2Order;
void moduleUnderModule;
void moduleUnderChapter;
void chapterUnderChapter;
void emptyLessonSkills;
void prematureLessonIdentity;
void prematureEpisodeSections;
void prematureModuleId;
void missingModuleMethodology;

/** Distinguish separately authored banks from their corresponding Sections. */
const assessment = {
  questionBankRequired: true,
  flashcardBankRequired: false,
  quizSectionRequired: true,
  flashcardsSectionRequired: false,
} satisfies LessonProductionAssessmentRequirements;

/** Stage 3 resolves every provisional Lesson using only two public variants. */
declare const importedLesson: Lesson_Configurator;
const newIntent = {
  objective: 'Explain patterns through observation',
  depth: 'Introductory',
  sequenceReason: 'After foundational observations',
  assessmentEvidence: 'Apply the model to a new example',
  assessment,
} as const;

const match = {
  methodologySourcePath: 'content/example/data/lessons/a/lesson-uuid/methodology.md',
  sourceSha: 'verified-source-revision',
  matchingRationale: 'Methodology, Skills, audience and depth match the Course slot',
  languageEvidence: 'Reviewed source language and remaining locale dependencies',
} satisfies CourseWorkflowStage3LessonMatch;

const newConfig = {
  type: 'lesson',
  slug: 'newDayNight',
  skills: lessonSlot.config.skills,
  params: { age: { min: 6, max: 10 }, grade: { min: 1, max: 4 } },
  locale: { title: 'Day and night' },
} satisfies CourseWorkflowStage3NewLessonConfig;

const newLesson = {
  config: newConfig,
  production: {
    kind: 'new',
    ...newIntent,
    methodology: 'Complete pedagogical specification belongs here; this test is not reviewed content.',
  },
} satisfies CourseWorkflowStage3NewLesson;

const { kind: _newKind, ...proposal } = newLesson.production;
const allocatedSeed = {
  config: { ...newLesson.config, id: '663572e7-bd85-4516-86e2-3de07d209e05' },
  proposal,
  languageContext: complete.production.languages,
} satisfies CourseWorkflowLessonSeed;
void allocatedSeed;

const existingConfig = {
  type: 'lesson',
  slug: 'reusedDayNight',
  skills: lessonSlot.config.skills,
} satisfies CourseWorkflowStage3ExistingLessonConfig;

const existingLesson = {
  config: existingConfig,
  production: {
    kind: 'existing',
    existing: { id: importedLesson.id },
    matching: match,
    assessment,
    sourceExportName: 'independentLesson',
  },
} satisfies CourseWorkflowStage3ExistingLesson;

const rawPatch = { params: { sections: { allowSkipping: false } } } satisfies CourseLessonSourcePatch<
  typeof importedLesson
>;
const existingWithOverrides = {
  config: { ...existingConfig, slug: 'dayNightPractice' },
  production: {
    kind: 'existing',
    existing: { id: importedLesson.id },
    matching: match,
    assessment,
    sourceExportName: 'independentLesson',
    sourcePatch: rawPatch,
    overrideRationale: 'Course progression requires this navigation constraint',
  },
} satisfies CourseWorkflowStage3ExistingLesson;

const typedReference: CourseWorkflowStage3ExistingLessonReference = { id: importedLesson.id };
const typedIdReference: CourseWorkflowStage3ExistingLessonReference = { id: importedLesson.id };
const forbiddenBuiltReference: CourseWorkflowStage3ExistingLessonReference = {
  id: importedLesson.id,
  // @ts-expect-error A Course draft must never contain pre-built Props.
  base: { params: { sections: { allowSkipping: false } } },
};
const patchId: Lesson_Config['id'] = importedLesson.id;

const resolvedChapter = {
  ...chapter,
  config: {
    type: chapter.config.type,
    slug: chapter.config.slug,
    locale: chapter.config.locale,
    children: ['newLesson', 'existingLesson'],
    newLesson,
    existingLesson,
  },
} satisfies CourseWorkflowStage3Chapter;

const resolvedModule = {
  ...module,
  config: {
    type: module.config.type,
    slug: module.config.slug,
    locale: module.config.locale,
    children: ['observations', 'repeated', 'episode'],
    observations: resolvedChapter,
    repeated: existingWithOverrides,
    episode: episodeSlot,
  },
} satisfies CourseWorkflowStage3Module;

const resolvedCourse = {
  ...planned,
  config: {
    ...config,
    children: ['skyBasics', 'directChapter', 'newLesson', 'existingLesson', 'existingWithOverrides'],
    skyBasics: resolvedModule,
    directChapter: resolvedChapter,
    newLesson,
    existingLesson,
    existingWithOverrides,
  },
} satisfies CourseWorkflowStage3;

const stage2View: CourseWorkflowStage2 = resolvedCourse;
const materializerInput: CourseWorkflowStage3 = resolvedCourse;
// @ts-expect-error Unresolved Stage 2 slots cannot remain in a completed Stage 3.
const unresolvedSlot: CourseWorkflowStage3LessonSlot = lessonSlot;

const missingNewMethodology: CourseWorkflowStage3NewLesson = {
  config: newConfig,
  // @ts-expect-error Newly planned Lessons require substantive methodology.
  production: { ...newIntent, kind: 'new' },
};

const newWithId: CourseWorkflowStage3NewLesson = {
  config: {
    ...newConfig,
    // @ts-expect-error New Lesson UUIDs are minted only at Stage 5.
    id: importedLesson.id,
  },
  production: newLesson.production,
};

const newWithLanguages: CourseWorkflowStage3NewLessonConfig = {
  ...newConfig,
  params: {
    // @ts-expect-error Course language context belongs to the Course root.
    languages: ['uk'],
  },
};

const existingConfigWithId: CourseWorkflowStage3ExistingLessonConfig = {
  ...existingConfig,
  // @ts-expect-error Existing Lesson references belong in production.existing only.
  id: importedLesson.id,
};

const missingExistingReference: CourseWorkflowStage3ExistingLesson = {
  config: existingConfig,
  // @ts-expect-error Existing Lesson placement requires an object with an id.
  production: { kind: 'existing', matching: match, assessment, sourceExportName: 'independentLesson' },
};

const existingAsString: CourseWorkflowStage3ExistingLesson = {
  config: existingConfig,
  production: {
    kind: 'existing',
    matching: match,
    assessment,
    sourceExportName: 'independentLesson',
    // @ts-expect-error A string alone is not a valid existing Lesson reference.
    existing: importedLesson.id,
  },
};

const existingMissingMatch: CourseWorkflowStage3ExistingLesson = {
  config: existingConfig,
  // @ts-expect-error Reuse needs verified matching evidence.
  production: {
    kind: 'existing',
    existing: { id: importedLesson.id },
    assessment,
    sourceExportName: 'independentLesson',
  },
};

/** A single structural object shape does not impose a two-branch rationale union.
 * Substantive patch justification is checked during editorial review.
 */
const patchedForReview: CourseWorkflowStage3ExistingLesson = {
  config: existingConfig,
  production: {
    kind: 'existing',
    matching: match,
    assessment,
    existing: { id: importedLesson.id },
    sourceExportName: 'independentLesson',
    sourcePatch: rawPatch,
  },
};

const rationaleForEditorialReview: CourseWorkflowStage3ExistingLesson = {
  config: existingConfig,
  production: {
    kind: 'existing',
    matching: match,
    existing: { id: importedLesson.id },
    assessment,
    sourceExportName: 'independentLesson',
    overrideRationale: 'The methodology reviewer should reject an unwarranted rationale',
  },
};

const rawOverridesAreInvalid: CourseWorkflowStage3ExistingLesson = {
  config: existingConfig,
  production: {
    kind: 'existing',
    matching: match,
    assessment,
    sourceExportName: 'independentLesson',
    // @ts-expect-error Existing Lesson references contain only the owning UUID.
    existing: { params: { sections: { allowSkipping: false } } },
    overrideRationale: 'Use a separately authored sourcePatch',
  },
};

const patchWithoutId: CourseWorkflowStage3ExistingLesson = {
  config: existingConfig,
  production: {
    kind: 'existing',
    matching: match,
    assessment,
    sourceExportName: 'independentLesson',
    // @ts-expect-error A reference must include the owning Lesson id.
    existing: { base: {}, locale: undefined },
    overrideRationale: 'Required identity',
  },
};

const unexpectedExistingLocale: CourseWorkflowStage3ExistingLesson = {
  config: {
    ...existingConfig,
    // @ts-expect-error Course-local title edits require explicit Build overrides, not Config mutation.
    locale: { title: 'Implicit Course-local mutation' },
  },
  production: existingLesson.production,
};

const unexpectedExistingMethodology: CourseWorkflowStage3ExistingLesson = {
  config: existingConfig,
  production: {
    ...existingLesson.production,
    // @ts-expect-error Never duplicate an independent Lesson methodology.
    methodology: 'Competing copy',
  },
};

const obsoleteThirdVariant: CourseWorkflowStage3LessonSlot = {
  config: existingConfig,
  production: {
    // @ts-expect-error The old third discriminator no longer exists.
    kind: 'existingWithOverrides',
    existing: { id: importedLesson.id },
    matching: match,
    sourceExportName: 'independentLesson',
  },
};

const malformedReference: CourseWorkflowStage3ExistingLessonReference = {
  id: importedLesson.id,
  // @ts-expect-error Identity must not leak into the sparse Props patch.
  base: { id: importedLesson.id },
};

const missingReferenceId: CourseWorkflowStage3ExistingLesson = {
  config: existingConfig,
  production: {
    kind: 'existing',
    matching: match,
    assessment,
    sourceExportName: 'independentLesson',
    // @ts-expect-error Even with a patch, the reference requires an id.
    existing: { base: {}, locale: undefined },
  },
};

void assessment;
void importedLesson;
void newIntent;
void match;
void newConfig;
void newLesson;
void existingConfig;
void existingLesson;
void rawPatch;
void existingWithOverrides;
void typedReference;
void typedIdReference;
void forbiddenBuiltReference;
void patchId;
void resolvedChapter;
void resolvedModule;
void resolvedCourse;
void stage2View;
void materializerInput;
void unresolvedSlot;
void missingNewMethodology;
void newWithId;
void newWithLanguages;
void existingConfigWithId;
void missingExistingReference;
void existingAsString;
void existingMissingMatch;
void patchedForReview;
void rationaleForEditorialReview;
void rawOverridesAreInvalid;
void patchWithoutId;
void unexpectedExistingLocale;
void unexpectedExistingMethodology;
void obsoleteThirdVariant;
void malformedReference;
void missingReferenceId;

const missingAssessmentChoice: LessonProductionAssessmentRequirements = {
  questionBankRequired: true,
  quizSectionRequired: true,
  // @ts-expect-error The Flashcard Bank decision must be explicit.
  flashcardBankRequired: undefined,
  flashcardsSectionRequired: false,
};
void missingAssessmentChoice;

const existingWithoutAssessment: CourseWorkflowStage3ExistingLesson = {
  config: existingConfig,
  // @ts-expect-error Every reused placement needs explicit assessment decisions.
  production: {
    kind: 'existing',
    existing: { id: importedLesson.id },
    matching: match,
    sourceExportName: 'independentLesson',
  },
};
void existingWithoutAssessment;
