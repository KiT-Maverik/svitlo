import type { Lesson_Configurator } from '../../configurators/lessons/defineLesson/defineLesson';
import type {
  CourseWorkflowStage1,
  CourseWorkflowStage1Config,
  CourseWorkflowStage1Languages,
  CourseWorkflowStage1Methodology,
  CourseWorkflowStage1Production,
  CourseWorkflowStage2,
  CourseWorkflowStage2Config,
  CourseWorkflowStage2Content,
  CourseWorkflowStage2Module,
  CourseWorkflowStage2Chapter,
  CourseWorkflowStage2LessonSlot,
  CourseWorkflowStage2EpisodeSlot,
  CourseWorkflowStage2EpisodeProduction,
  CourseWorkflowStage3,
  CourseWorkflowStage3Config,
  CourseWorkflowStage3Module,
  CourseWorkflowStage3Chapter,
  CourseWorkflowStage3LessonSlot,
  CourseWorkflowStage3LessonIntent,
  CourseWorkflowStage3LessonMatch,
  CourseWorkflowStage3NewLesson,
  CourseWorkflowStage3ExistingLesson,
  CourseWorkflowStage3OverriddenLesson,
} from './courseWorkflow.types';

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
    content: {
      items: { observe: lessonSlot, reflection: episodeSlot },
      order: ['observe', 'reflection'],
    },
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
    content: {
      items: { observations: chapter, directLesson: lessonSlot, directEpisode: episodeSlot },
      order: ['observations', 'directLesson', 'directEpisode'],
    },
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
    content: {
      items: {
        skyBasics: module,
        directChapter: chapter,
        directLesson: lessonSlot,
        directEpisode: episodeSlot,
      },
      order: ['skyBasics', 'directChapter', 'directLesson', 'directEpisode'],
    },
  },
} satisfies CourseWorkflowStage2;

const explicitlyEmpty = {
  ...complete,
  config: { ...complete.config, content: { items: {}, order: [] } },
} satisfies CourseWorkflowStage2;

// @ts-expect-error Stage 2 must explicitly supply a complete content collection.
const missingStage2Content: CourseWorkflowStage2Config = config;

const stage1DoesNotContainContent: CourseWorkflowStage1Config = {
  ...config,
  // @ts-expect-error Stage 1 must not contain Modules, Chapters, Episodes or Lessons.
  content: { items: {}, order: [] },
};

// @ts-expect-error Every ordered collection needs an explicit order.
const missingStage2Order: CourseWorkflowStage2Content = { items: {} };

const moduleUnderModule: CourseWorkflowStage2Module['config']['content']['items'] = {
  // @ts-expect-error A Module cannot contain another Module.
  nestedModule: module,
};

const moduleUnderChapter: CourseWorkflowStage2Chapter['config']['content']['items'] = {
  // @ts-expect-error A Chapter cannot contain Modules.
  nestedModule: module,
};

const chapterUnderChapter: CourseWorkflowStage2Chapter['config']['content']['items'] = {
  // @ts-expect-error A Chapter cannot contain another Chapter.
  nestedChapter: chapter,
};

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
type ModuleChildren = CourseWorkflowStage2Module['config']['content']['items'][string];
type ChapterChildren = CourseWorkflowStage2Chapter['config']['content']['items'][string];
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

/** Stage 3 must resolve every provisional Lesson, regardless of nesting. */
declare const importedLesson: Lesson_Configurator;
const intent = {
  objective: 'Explain patterns through observation',
  depth: 'Introductory',
  sequenceReason: 'After foundational observations',
  assessmentEvidence: 'Apply the model to a new example',
} satisfies CourseWorkflowStage3LessonIntent;

const match = {
  lessonId: importedLesson.id,
  methodologySourcePath: 'content/example/data/lessons/a/lesson-uuid/methodology.md',
  sourceSha: 'verified-source-revision',
  matchingRationale: 'Methodology, Skills, audience and depth match the intended Course slot',
  languageEvidence: 'Reviewed source language and remaining locale dependencies',
} satisfies CourseWorkflowStage3LessonMatch;

const newLesson = {
  config: {
    type: 'lesson',
    slug: 'newDayNight',
    skills: lessonSlot.config.skills,
    locale: { title: 'Day and night' },
  },
  production: {
    ...intent,
    kind: 'new',
    methodology: 'Complete pedagogical specification belongs here; this fixture is not approved content.',
  },
} satisfies CourseWorkflowStage3NewLesson;

const existingLesson = {
  config: { type: 'lesson', slug: 'reusedDayNight', skills: lessonSlot.config.skills },
  production: { ...intent, kind: 'existing', matching: match },
} satisfies CourseWorkflowStage3ExistingLesson;

const patch = importedLesson.build.overrides(
  { params: { sections: { allowSkipping: false } } },
  { languages: ['uk'] },
);
const withOverrides = {
  config: { type: 'lesson', slug: 'dayNightPractice', skills: lessonSlot.config.skills },
  production: {
    ...intent,
    kind: 'existingWithOverrides',
    matching: match,
    overrides: patch,
    overrideRationale: 'Course progression requires this navigation constraint',
  },
} satisfies CourseWorkflowStage3OverriddenLesson;

const resolvedChapter = {
  ...chapter,
  config: {
    ...chapter.config,
    content: { items: { newLesson, existingLesson }, order: ['newLesson', 'existingLesson'] },
  },
} satisfies CourseWorkflowStage3Chapter;

const resolvedModule = {
  ...module,
  config: {
    ...module.config,
    content: {
      items: { observations: resolvedChapter, repeated: withOverrides, episode: episodeSlot },
      order: ['observations', 'repeated', 'episode'],
    },
  },
} satisfies CourseWorkflowStage3Module;

const resolvedCourse = {
  ...planned,
  config: {
    ...planned.config,
    content: {
      items: { skyBasics: resolvedModule, directChapter: resolvedChapter, newLesson, existingLesson, withOverrides },
      order: ['skyBasics', 'directChapter', 'newLesson', 'existingLesson', 'withOverrides'],
    },
  },
} satisfies CourseWorkflowStage3;

const stage2View: CourseWorkflowStage2 = resolvedCourse;

// @ts-expect-error Unresolved Stage 2 slot cannot satisfy a completed Stage 3 placement.
const unresolvedSlot: CourseWorkflowStage3LessonSlot = lessonSlot;

// @ts-expect-error Stage 3 course must replace unresolved Stage 2 Lesson slots.
const unresolvedCourse: CourseWorkflowStage3Config = planned.config;

const missingNewMethodology: CourseWorkflowStage3NewLesson = {
  config: newLesson.config,
  // @ts-expect-error Required for newly planned Lesson.
  production: { ...intent, kind: 'new' },
};

const unexpectedNewLessonId: CourseWorkflowStage3NewLesson = {
  config: newLesson.config,
  production: {
    ...newLesson.production,
    // @ts-expect-error New Lesson UUIDs are allocated at Stage 5, not Stage 3.
    lessonId: importedLesson.id,
  },
};

const missingExistingReference: CourseWorkflowStage3ExistingLesson = {
  config: existingLesson.config,
  // @ts-expect-error Reused Lessons need source evidence and matching rationale.
  production: { ...intent, kind: 'existing' },
};

const unexpectedExistingMethodology: CourseWorkflowStage3ExistingLesson = {
  config: existingLesson.config,
  production: {
    ...existingLesson.production,
    // @ts-expect-error Existing Lesson methodology is independent and must not be duplicated.
    methodology: 'A competing copy',
  },
};

const missingOverrides: CourseWorkflowStage3OverriddenLesson = {
  config: withOverrides.config,
  // @ts-expect-error Overrides case must carry the built {base, locale} publication result.
  production: { ...intent, kind: 'existingWithOverrides', matching: match, overrideRationale: 'Needed' },
};

const rawOverridesAreInvalid: CourseWorkflowStage3OverriddenLesson = {
  config: withOverrides.config,
  production: {
    ...withOverrides.production,
    // @ts-expect-error A raw params patch is not the result of lesson.build.overrides().
    overrides: { params: { sections: { allowSkipping: false } } },
  },
};

const unexpectedExistingLocale: CourseWorkflowStage3ExistingLesson = {
  config: {
    ...existingLesson.config,
    // @ts-expect-error Reused Lesson titles can be changed only by explicit Build overrides.
    locale: { title: 'Implicit Course-local mutation' },
  },
  production: existingLesson.production,
};

void importedLesson;
void intent;
void match;
void newLesson;
void existingLesson;
void patch;
void withOverrides;
void resolvedChapter;
void resolvedModule;
void resolvedCourse;
void stage2View;
void unresolvedSlot;
void unresolvedCourse;
void missingNewMethodology;
void unexpectedNewLessonId;
void missingExistingReference;
void unexpectedExistingMethodology;
void missingOverrides;
void rawOverridesAreInvalid;
void unexpectedExistingLocale;
