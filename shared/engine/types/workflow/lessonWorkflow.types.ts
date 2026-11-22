import type { Lesson_Config } from '../../configurators/lessons/defineLesson/defineLesson.schemas';
import type { Content_Section_Config } from '../../configurators/sections/defineContentSection/defineContentSection.schemas';
import type { PracticeSection_Config } from '../../configurators/sections/definePracticeSection/definePracticeSection.schemas';
import type { CodingTaskSection_Config } from '../../configurators/sections/defineCodingTaskSection/defineCodingTaskSection.schemas';
import type { LearningFlowSection_Config } from '../../configurators/sections/defineLearningFlowSection/defineLearningFlowSection.schemas';
import type { QuizSection_Config } from '../../configurators/sections/defineQuizSection/defineQuizSection.schemas';
import type { FlashcardsSection_Config } from '../../configurators/sections/defineFlashcardsSection/defineFlashcardsSection.schemas';
import type { QuestSection_Config } from '../../configurators/sections/defineQuestSection/defineQuestSection.schemas';
import type { Stage_Config } from '../../configurators/sections/defineQuestSection/defineStage/defineStage.schemas';
import type { Task_Config } from '../../configurators/sections/defineQuestSection/defineTask/defineTask.schemas';
import type { ContentBlock_Text_Config } from '../../configurators/contentBlocks/defineText/defineText.schemas';
import type { ContentBlock_Markdown_Config } from '../../configurators/contentBlocks/defineMarkdown/defineMarkdown.schemas';
import type { ContentBlock_Code_Config } from '../../configurators/contentBlocks/defineCode/defineCode.schemas';
import type { ContentBlock_Image_Config } from '../../configurators/contentBlocks/defineImage/defineImage.schemas';
import type { ContentBlock_Video_Config } from '../../configurators/contentBlocks/defineVideo/defineVideo.schemas';
import type { ContentBlock_Youtube_Config } from '../../configurators/contentBlocks/defineYoutube/defineYoutube.schemas';
import type { ContentBlock_Audio_Config } from '../../configurators/contentBlocks/defineAudio/defineAudio.schemas';
import type { ContentBlock_Subtitles_Config } from '../../configurators/contentBlocks/defineSubtitles/defineSubtitles.schemas';
import type { ContentBlock_Scene_Config } from '../../configurators/contentBlocks/defineScene/defineScene.schemas';
import type { ContentBlock_Carousel_Config } from '../../configurators/contentBlocks/defineCarousel/defineCarousel.schemas';
import type { ContentBlock_Checkpoint_Config } from '../../configurators/contentBlocks/defineCheckpoint/defineCheckpoint.schemas';
import type { ContentBlock_CheckpointItem_Config } from '../../configurators/contentBlocks/defineCheckpoint/defineCheckpointItem/defineCheckpointItem.schemas';
import type { ContentBlock_CheckpointAnswer_Config } from '../../configurators/contentBlocks/defineCheckpoint/defineCheckpointAnswer/defineCheckpointAnswer.schemas';
import type { CourseWorkflowStage1Languages, CourseWorkflowStage3NewLesson } from './courseWorkflow.types';
import type { LessonProductionAssessmentRequirements } from './lessonAssessment.types';

/**
 * Stage 1 is an editable Lesson plan, never a partial defineLesson call.
 * The Methodologist verifies Skill UUIDs and source language against Git.
 * The canonical Lesson UUID is allocated once, including for Course handoffs.
 */
export type LessonWorkflowStage1Config = Pick<Lesson_Config, 'id' | 'type' | 'slug' | 'locale'> & {
  /** Cite real Skill definitions; do not copy another Lesson's skills array. */
  skills: readonly [Lesson_Config['skills'][number], ...Lesson_Config['skills'][number][]];
  /** Completion policy is separate from the four editorial bank/Section decisions. */
  params?: Partial<Omit<Lesson_Config['params'], 'languages'>> & { languages?: never };
  section?: never;
  events?: never;
};

/**
 * The Course's reviewed new-Lesson intent is preserved without copying its schema.
 * Full source-domain facts, examples, misconceptions, audience, prerequisites,
 * cognitive assessment methods and limitations belong in methodology prose.
 */
export type LessonWorkflowStage1Production = Pick<
  CourseWorkflowStage3NewLesson['production'],
  'methodology' | 'objective' | 'depth' | 'sequenceReason' | 'assessmentEvidence'
> & {
  /** Source locale plus nonempty future locale plan; no invented translations. */
  languages: CourseWorkflowStage1Languages;
  /** Bank ownership is independent of Quiz/Flashcards Section presence. */
  assessment: LessonProductionAssessmentRequirements;
  /** Verified references and unresolved editorial decisions, when applicable. */
  sourceEvidence?: string;
};

export type LessonWorkflowStage1 = {
  config: LessonWorkflowStage1Config;
  production: LessonWorkflowStage1Production;
};

/**
 * Course Stage 5 provides exactly one new Lesson Stage 1 index.ts at the
 * persisted UUID-addressed path. The Course source and this handoff share
 * every substantive planning field; Lesson identity is newly allocated.
 * Neither Course nor Lesson Stage 1 builds Sections or Configurators.
 */
export type LessonWorkflowStage1CourseHandoff = {
  config: Pick<CourseWorkflowStage3NewLesson['config'], 'type' | 'slug' | 'locale'> & {
    id: Lesson_Config['id'];
    skills: LessonWorkflowStage1Config['skills'];
    params?: LessonWorkflowStage1Config['params'];
    section?: never;
  };
  production: LessonWorkflowStage1Production;
};

/** Ordered editorial maps mirror Engine collections, but hold plain authoring nodes. */
export type LessonWorkflowOrdered<Child> = { items: Record<string, Child>; order: string[] };

/** Notes are implementation specifications, never runtime Config/Props. */
export type LessonWorkflowNodeProduction = {
  /** What learner outcome the node serves, not just its widget type. */
  purpose: string;
  pedagogicalIntent?: string;
  specification?: string;
  prompt?: string;
  script?: string;
  storyboard?: string;
  accessibility?: string;
  offline?: string;
  weakDeviceAlternative?: string;
  readiness?: 'source-ready' | 'production-pending' | 'platform-pending';
};

/** Scene/media requires a reviewable specification and equivalent learning path. */
export type LessonWorkflowResourceProduction = LessonWorkflowNodeProduction & {
  specification: string;
  accessibility: string;
  offline: string;
};

/** Simple blocks use their real Config fields, not a nested Configurator instance. */
export type LessonWorkflowStage2SimpleBlock =
  | { config: ContentBlock_Text_Config; production?: LessonWorkflowNodeProduction }
  | { config: ContentBlock_Markdown_Config; production?: LessonWorkflowNodeProduction }
  | { config: ContentBlock_Code_Config; production?: LessonWorkflowNodeProduction }
  | { config: ContentBlock_Image_Config; production: LessonWorkflowResourceProduction }
  | { config: ContentBlock_Video_Config; production: LessonWorkflowResourceProduction }
  | { config: ContentBlock_Youtube_Config; production: LessonWorkflowResourceProduction }
  | { config: ContentBlock_Audio_Config; production: LessonWorkflowResourceProduction }
  | { config: ContentBlock_Subtitles_Config; production: LessonWorkflowResourceProduction }
  | { config: ContentBlock_Scene_Config; production: LessonWorkflowResourceProduction };

export type LessonWorkflowStage2Carousel = {
  config: Omit<ContentBlock_Carousel_Config, 'slides'> & {
    slides: LessonWorkflowOrdered<
      | { config: ContentBlock_Image_Config; production: LessonWorkflowResourceProduction }
      | { config: ContentBlock_Scene_Config; production: LessonWorkflowResourceProduction }
    >;
  };
  production?: LessonWorkflowNodeProduction;
};

export type LessonWorkflowStage2CheckpointAnswer = {
  config: Omit<ContentBlock_CheckpointAnswer_Config, 'content'> & {
    content: LessonWorkflowOrdered<LessonWorkflowStage2SimpleBlock | LessonWorkflowStage2Carousel>;
  };
  production?: LessonWorkflowNodeProduction;
};

export type LessonWorkflowStage2CheckpointItem = {
  config: Omit<ContentBlock_CheckpointItem_Config, 'question' | 'answer'> & {
    question: { config: ContentBlock_Text_Config; production?: LessonWorkflowNodeProduction };
    answer: LessonWorkflowStage2CheckpointAnswer;
  };
  production?: LessonWorkflowNodeProduction;
};

export type LessonWorkflowStage2Checkpoint = {
  config: Omit<ContentBlock_Checkpoint_Config, 'content'> & {
    content: LessonWorkflowOrdered<LessonWorkflowStage2CheckpointItem>;
  };
  production?: LessonWorkflowNodeProduction;
};

export type LessonWorkflowStage2Block =
  | LessonWorkflowStage2SimpleBlock
  | LessonWorkflowStage2Carousel
  | LessonWorkflowStage2Checkpoint;

/** Common Section shape with a plain block map instead of Configurator children. */
type LessonWorkflowContentSection<Config extends { content: unknown }> = {
  config: Omit<Config, 'content'> & { content: LessonWorkflowOrdered<LessonWorkflowStage2Block> };
  production?: LessonWorkflowNodeProduction;
};

/**
 * Quiz/Flashcards selection and scoring can remain incomplete before Stages 7–8.
 * Do not invent bank IDs, answer choices or grading defaults. Materialization
 * must generate visibly blocked source and must not publish unresolved Sections.
 */
export type LessonWorkflowStage2QuizSection = {
  config: Omit<QuizSection_Config, 'params' | 'content'> & {
    params: Partial<QuizSection_Config['params']>;
    content: LessonWorkflowOrdered<LessonWorkflowStage2Block>;
  };
  production: LessonWorkflowNodeProduction;
};

export type LessonWorkflowStage2FlashcardsSection = {
  config: Omit<FlashcardsSection_Config, 'params' | 'content'> & {
    params: Partial<FlashcardsSection_Config['params']>;
    content: LessonWorkflowOrdered<LessonWorkflowStage2Block>;
  };
  production: LessonWorkflowNodeProduction;
};

/** Quest exists in Engine Build but is not registered as a Lesson runtime Section. */
export type LessonWorkflowStage2QuestStage = {
  config: Omit<Stage_Config, 'content'> & {
    content: {
      video: {
        medium: { config: ContentBlock_Video_Config; production: LessonWorkflowResourceProduction };
        small: { config: ContentBlock_Video_Config; production: LessonWorkflowResourceProduction };
      };
      audio: {
        dialogue: { config: ContentBlock_Audio_Config; production: LessonWorkflowResourceProduction } | null;
        narration: { config: ContentBlock_Audio_Config; production: LessonWorkflowResourceProduction } | null;
        background: { config: ContentBlock_Audio_Config; production: LessonWorkflowResourceProduction } | null;
      };
      image: { config: ContentBlock_Image_Config; production: LessonWorkflowResourceProduction };
      subtitles: { config: ContentBlock_Subtitles_Config; production: LessonWorkflowResourceProduction };
    };
  };
  production?: LessonWorkflowNodeProduction;
};

export type LessonWorkflowStage2QuestTask = {
  config: Omit<Task_Config, 'scene'> & {
    scene: { config: ContentBlock_Scene_Config; production: LessonWorkflowResourceProduction };
  };
  production?: LessonWorkflowNodeProduction;
};

export type LessonWorkflowStage2QuestSection = {
  config: Omit<QuestSection_Config, 'stages' | 'tasks'> & {
    stages: Record<string, LessonWorkflowStage2QuestStage>;
    tasks: Record<string, LessonWorkflowStage2QuestTask>;
  };
  production: LessonWorkflowNodeProduction & {
    /** Fail release closed while Quest runtime/renderer registration is missing. */
    runtimeStatus: 'unimplemented';
  };
};

/** All six runtime Section kinds and the explicitly nonpublishable Quest plan. */
export type LessonWorkflowStage2Section =
  | LessonWorkflowContentSection<Content_Section_Config>
  | LessonWorkflowContentSection<PracticeSection_Config>
  | LessonWorkflowContentSection<CodingTaskSection_Config>
  | LessonWorkflowContentSection<LearningFlowSection_Config>
  | LessonWorkflowStage2QuizSection
  | LessonWorkflowStage2FlashcardsSection
  | LessonWorkflowStage2QuestSection;

export type LessonWorkflowStage2Config = Omit<LessonWorkflowStage1Config, 'section' | 'events'> & {
  section: LessonWorkflowOrdered<LessonWorkflowStage2Section>;
  events?: Lesson_Config['events'];
};

/**
 * Stage 2 extends the SAME Stage 1 plan with authored source-language teaching
 * and ordered Sections/ContentBlocks. Stages 3–5 review and directly correct
 * this exact object in the existing Lesson PR; they do not create stage types.
 */
export type LessonWorkflowStage2 = Omit<LessonWorkflowStage1, 'config'> & {
  config: LessonWorkflowStage2Config;
};

/**
 * The reviewed Stage 2 object is the final editorial INPUT to the trusted
 * Stage 6 orchestrator, not directly to materializeLesson(Source). That concrete
 * renderer requires a complete Lesson_Config, including params.languages and
 * independently completed Section Configs; the orchestrator must derive/verify
 * them and fail closed on incomplete bank selections. The original Lesson
 * root index.ts must never be silently overwritten by emitted root index.ts.
 */
export type LessonWorkflowMaterializerInput = LessonWorkflowStage2;
