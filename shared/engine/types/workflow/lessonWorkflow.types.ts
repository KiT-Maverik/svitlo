import { z } from 'zod';

import { audio_Config_Schema } from '../../configurators/contentBlocks/defineAudio/defineAudio.schemas';
import { carousel_Config_Schema } from '../../configurators/contentBlocks/defineCarousel/defineCarousel.schemas';
import { checkpoint_Config_Schema } from '../../configurators/contentBlocks/defineCheckpoint/defineCheckpoint.schemas';
import { checkpointAnswer_Config_Schema } from '../../configurators/contentBlocks/defineCheckpoint/defineCheckpointAnswer/defineCheckpointAnswer.schemas';
import { checkpointItem_Config_Schema } from '../../configurators/contentBlocks/defineCheckpoint/defineCheckpointItem/defineCheckpointItem.schemas';
import { code_Config_Schema } from '../../configurators/contentBlocks/defineCode/defineCode.schemas';
import { image_Config_Schema } from '../../configurators/contentBlocks/defineImage/defineImage.schemas';
import { markdown_Config_Schema } from '../../configurators/contentBlocks/defineMarkdown/defineMarkdown.schemas';
import { scene_Config_Schema } from '../../configurators/contentBlocks/defineScene/defineScene.schemas';
import { subtitles_Config_Schema } from '../../configurators/contentBlocks/defineSubtitles/defineSubtitles.schemas';
import { text_Config_Schema } from '../../configurators/contentBlocks/defineText/defineText.schemas';
import { video_Config_Schema } from '../../configurators/contentBlocks/defineVideo/defineVideo.schemas';
import { youtube_Config_Schema } from '../../configurators/contentBlocks/defineYoutube/defineYoutube.schemas';
import { lesson_Config_Schema } from '../../configurators/lessons/defineLesson/defineLesson.schemas';
import { codingTaskSection_Config_Schema } from '../../configurators/sections/defineCodingTaskSection/defineCodingTaskSection.schemas';
import { contentSection_Config_Schema } from '../../configurators/sections/defineContentSection/defineContentSection.schemas';
import { flashcardsSection_Config_Schema } from '../../configurators/sections/defineFlashcardsSection/defineFlashcardsSection.schemas';
import { learningFlowSection_Config_Schema } from '../../configurators/sections/defineLearningFlowSection/defineLearningFlowSection.schemas';
import { practiceSection_Config_Schema } from '../../configurators/sections/definePracticeSection/definePracticeSection.schemas';
import { questSection_Config_Schema } from '../../configurators/sections/defineQuestSection/defineQuestSection.schemas';
import { stage_Config_Schema } from '../../configurators/sections/defineQuestSection/defineStage/defineStage.schemas';
import { task_Config_Schema } from '../../configurators/sections/defineQuestSection/defineTask/defineTask.schemas';
import { quizSection_Config_Schema } from '../../configurators/sections/defineQuizSection/defineQuizSection.schemas';
import { lessonProductionAssessmentRequirements_Schema } from './lessonAssessment.types';
import { workflowLanguages_Schema } from './workflowLanguages.schemas';

/** Stage 1 is an editorial plan, not a partially built Lesson Configurator. */
const lessonStage1Params_Schema = lesson_Config_Schema.shape.params
  .omit({ languages: true, quizRequiredForCompletion: true, sections: true })
  .partial()
  .extend({
    languages: z.never().optional(),
    quizRequiredForCompletion: lesson_Config_Schema.shape.params.shape.quizRequiredForCompletion,
    sections: lesson_Config_Schema.shape.params.shape.sections.partial().optional(),
  })
  .strict();

const lessonStage1Config_Schema = lesson_Config_Schema
  .pick({ id: true, type: true, slug: true, locale: true })
  .extend({
    skills: z.tuple([z.uuid()], z.uuid()).readonly(),
    params: lessonStage1Params_Schema,
    section: z.never().optional(),
    events: z.never().optional(),
  })
  .strict();
export type LessonWorkflowStage1Config = z.infer<typeof lessonStage1Config_Schema>;

/** Methodology and independent assessment decisions are editorial metadata. */
const lessonStage1Production_Schema = z.strictObject({
  methodology: z.string(),
  objective: z.string(),
  depth: z.string(),
  sequenceReason: z.string(),
  assessmentEvidence: z.string(),
  languages: workflowLanguages_Schema,
  assessment: lessonProductionAssessmentRequirements_Schema.strict(),
  sourceEvidence: z.string().optional(),
});
export type LessonWorkflowStage1Production = z.infer<typeof lessonStage1Production_Schema>;

export const lessonWorkflowStage1_Schema = z.strictObject({
  config: lessonStage1Config_Schema,
  production: lessonStage1Production_Schema,
});
export type LessonWorkflowStage1 = z.infer<typeof lessonWorkflowStage1_Schema>;

/** Editorial collections contain plain child nodes, not built configurators. */
export type LessonWorkflowOrdered<Child> = { items: Record<string, Child>; order: string[] };

export function workflowOrdered_Schema<Child extends z.ZodType>(child: Child) {
  return z
    .strictObject({
      items: z.record(z.string(), child),
      order: z.array(z.string()),
    })
    .refine(
      ({ items, order }) =>
        Object.keys(items).length === order.length &&
        new Set(order).size === order.length &&
        order.every(key => Object.hasOwn(items, key)),
      'Order must enumerate every authored child exactly once',
    );
}

/** Production notes do not become Config or runtime Props fields. */
const nodeProduction_Schema = z.strictObject({
  purpose: z.string(),
  pedagogicalIntent: z.string().optional(),
  specification: z.string().optional(),
  prompt: z.string().optional(),
  script: z.string().optional(),
  storyboard: z.string().optional(),
  accessibility: z.string().optional(),
  offline: z.string().optional(),
  weakDeviceAlternative: z.string().optional(),
  readiness: z.enum(['source-ready', 'production-pending', 'platform-pending']).optional(),
});
export type LessonWorkflowNodeProduction = z.infer<typeof nodeProduction_Schema>;

const resourceProduction_Schema = nodeProduction_Schema.extend({
  specification: z.string(),
  accessibility: z.string(),
  offline: z.string(),
});
export type LessonWorkflowResourceProduction = z.infer<typeof resourceProduction_Schema>;

function node<Config extends z.ZodType>(config: Config) {
  return z.strictObject({ config, production: nodeProduction_Schema.optional() });
}
function resource<Config extends z.ZodType>(config: Config) {
  return z.strictObject({ config, production: resourceProduction_Schema });
}

/** Only unresolved asset references may be omitted; preserve other real Config fields. */
const imageSource_Schema = z
  .strictObject({
    ...image_Config_Schema.shape,
    locale: image_Config_Schema.shape.locale.partial({ fileName: true }),
  })
  .refine(
    ({ params }) =>
      params.fill ? params.aspectRatio !== undefined : params.width !== undefined && params.height !== undefined,
    'Image requires either fill/aspectRatio or width/height',
  );
const videoSource_Schema = video_Config_Schema.extend({
  locale: video_Config_Schema.shape.locale.partial({ fileName: true, posterFileName: true }),
});
const youtubeSource_Schema = youtube_Config_Schema.extend({
  locale: youtube_Config_Schema.shape.locale.partial({ href: true }),
});
const audioSource_Schema = audio_Config_Schema.extend({
  locale: audio_Config_Schema.shape.locale.partial({ fileName: true }),
});
const subtitlesSource_Schema = subtitles_Config_Schema.extend({
  locale: subtitles_Config_Schema.shape.locale.partial({ fileName: true }),
});

const textNode_Schema = node(text_Config_Schema);
const imageNode_Schema = resource(imageSource_Schema);
const videoNode_Schema = resource(videoSource_Schema);
const audioNode_Schema = resource(audioSource_Schema);
const subtitlesNode_Schema = resource(subtitlesSource_Schema);
const sceneNode_Schema = resource(scene_Config_Schema);

const simpleBlock_Schema = z.union([
  textNode_Schema,
  node(markdown_Config_Schema),
  node(code_Config_Schema),
  imageNode_Schema,
  videoNode_Schema,
  resource(youtubeSource_Schema),
  audioNode_Schema,
  subtitlesNode_Schema,
  sceneNode_Schema,
]);
export type LessonWorkflowStage2SimpleBlock = z.infer<typeof simpleBlock_Schema>;

const carouselNode_Schema = node(
  carousel_Config_Schema.extend({
    slides: workflowOrdered_Schema(z.union([imageNode_Schema, sceneNode_Schema])),
  }),
);
export type LessonWorkflowStage2Carousel = z.infer<typeof carouselNode_Schema>;

const checkpointAnswerNode_Schema = node(
  checkpointAnswer_Config_Schema.extend({
    content: workflowOrdered_Schema(z.union([simpleBlock_Schema, carouselNode_Schema])),
  }),
);
export type LessonWorkflowStage2CheckpointAnswer = z.infer<typeof checkpointAnswerNode_Schema>;

const checkpointItemNode_Schema = node(
  checkpointItem_Config_Schema.extend({
    question: textNode_Schema,
    answer: checkpointAnswerNode_Schema,
  }),
);
export type LessonWorkflowStage2CheckpointItem = z.infer<typeof checkpointItemNode_Schema>;

const checkpointNode_Schema = node(
  checkpoint_Config_Schema.extend({
    content: workflowOrdered_Schema(checkpointItemNode_Schema),
  }),
);
export type LessonWorkflowStage2Checkpoint = z.infer<typeof checkpointNode_Schema>;

const block_Schema = z.union([simpleBlock_Schema, carouselNode_Schema, checkpointNode_Schema]);
export type LessonWorkflowStage2Block = z.infer<typeof block_Schema>;

const sectionContent_Schema = workflowOrdered_Schema(block_Schema);

/** Shared ordinary Section nodes are also used by Episode authoring. */
export const lessonWorkflowContentSection_Schema = node(
  contentSection_Config_Schema.extend({ content: sectionContent_Schema }),
);
export const lessonWorkflowOrdinarySection_Schema = z.union([
  lessonWorkflowContentSection_Schema,
  node(practiceSection_Config_Schema.extend({ content: sectionContent_Schema })),
  node(codingTaskSection_Config_Schema.extend({ content: sectionContent_Schema })),
  node(learningFlowSection_Config_Schema.extend({ content: sectionContent_Schema })),
]);

/** Banks are independent. Editorial selection/scoring may remain unfinished. */
export const lessonWorkflowQuizSection_Schema = z.strictObject({
  config: quizSection_Config_Schema.extend({
    params: quizSection_Config_Schema.shape.params.partial(),
    content: sectionContent_Schema,
  }),
  production: nodeProduction_Schema,
});
export type LessonWorkflowStage2QuizSection = z.infer<typeof lessonWorkflowQuizSection_Schema>;

const flashcardsSectionNode_Schema = z.strictObject({
  config: flashcardsSection_Config_Schema.extend({
    params: flashcardsSection_Config_Schema.shape.params.partial(),
    content: sectionContent_Schema,
  }),
  production: nodeProduction_Schema,
});
export type LessonWorkflowStage2FlashcardsSection = z.infer<typeof flashcardsSectionNode_Schema>;

/** Quest remains Build-only; its complete source plan is not release approval. */
const questStageNode_Schema = node(
  stage_Config_Schema.extend({
    content: z.strictObject({
      video: z.strictObject({ medium: videoNode_Schema, small: videoNode_Schema }),
      audio: z.strictObject({
        dialogue: audioNode_Schema.nullable(),
        narration: audioNode_Schema.nullable(),
        background: audioNode_Schema.nullable(),
      }),
      image: imageNode_Schema,
      subtitles: subtitlesNode_Schema,
    }),
  }),
);
export type LessonWorkflowStage2QuestStage = z.infer<typeof questStageNode_Schema>;

const questTaskNode_Schema = node(task_Config_Schema.extend({ scene: sceneNode_Schema }));
export type LessonWorkflowStage2QuestTask = z.infer<typeof questTaskNode_Schema>;

const questSectionNode_Schema = z.strictObject({
  config: questSection_Config_Schema.extend({
    stages: z.record(z.string(), questStageNode_Schema),
    tasks: z.record(z.string(), questTaskNode_Schema),
  }),
  production: nodeProduction_Schema.extend({ runtimeStatus: z.literal('unimplemented') }),
});
export type LessonWorkflowStage2QuestSection = z.infer<typeof questSectionNode_Schema>;

const section_Schema = z.union([
  lessonWorkflowOrdinarySection_Schema,
  lessonWorkflowQuizSection_Schema,
  flashcardsSectionNode_Schema,
  questSectionNode_Schema,
]);
export type LessonWorkflowStage2Section = z.infer<typeof section_Schema>;

const lessonStage2Config_Schema = lessonStage1Config_Schema.omit({ section: true, events: true }).extend({
  section: workflowOrdered_Schema(section_Schema),
  events: lesson_Config_Schema.shape.events,
});
export type LessonWorkflowStage2Config = z.infer<typeof lessonStage2Config_Schema>;

/** Stage 2 remains the final Lesson input; no additional editorial stage. */
export const lessonWorkflowStage2_Schema = lessonWorkflowStage1_Schema.extend({
  config: lessonStage2Config_Schema,
});
export type LessonWorkflowStage2 = z.infer<typeof lessonWorkflowStage2_Schema>;
