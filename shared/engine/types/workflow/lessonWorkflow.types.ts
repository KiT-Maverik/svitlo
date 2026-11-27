import { z } from 'zod';

import { carousel_Metadata_Config_Schema } from '../../configurators/contentBlocks/composite/defineCarousel/defineCarousel.schemas';
import { checkpoint_Metadata_Config_Schema } from '../../configurators/contentBlocks/composite/defineCheckpoint/defineCheckpoint.schemas';
import { checkpointAnswer_Config_Schema } from '../../configurators/contentBlocks/composite/defineCheckpoint/defineCheckpointAnswer/defineCheckpointAnswer.schemas';
import { checkpointItem_Config_Schema } from '../../configurators/contentBlocks/composite/defineCheckpoint/defineCheckpointItem/defineCheckpointItem.schemas';
import type { ContentBlock_Primitive_Type } from '../../configurators/contentBlocks/contentBlock.constants';
import { audio_Config_Schema } from '../../configurators/contentBlocks/primitive/defineAudio/defineAudio.schemas';
import { code_Config_Schema } from '../../configurators/contentBlocks/primitive/defineCode/defineCode.schemas';
import { image_Config_Schema } from '../../configurators/contentBlocks/primitive/defineImage/defineImage.schemas';
import { markdown_Config_Schema } from '../../configurators/contentBlocks/primitive/defineMarkdown/defineMarkdown.schemas';
import { scene_Config_Schema } from '../../configurators/contentBlocks/primitive/defineScene/defineScene.schemas';
import { subtitles_Config_Schema } from '../../configurators/contentBlocks/primitive/defineSubtitles/defineSubtitles.schemas';
import { text_Config_Schema } from '../../configurators/contentBlocks/primitive/defineText/defineText.schemas';
import { video_Config_Schema } from '../../configurators/contentBlocks/primitive/defineVideo/defineVideo.schemas';
import { youtube_Config_Schema } from '../../configurators/contentBlocks/primitive/defineYoutube/defineYoutube.schemas';
import { lesson_Metadata_Config_Schema } from '../../configurators/lessons/defineLesson/defineLesson.schemas';
import { codingTaskSection_Metadata_Config_Schema } from '../../configurators/sections/defineCodingTaskSection/defineCodingTaskSection.schemas';
import { contentSection_Metadata_Config_Schema } from '../../configurators/sections/defineContentSection/defineContentSection.schemas';
import { flashcardsSection_Metadata_Config_Schema } from '../../configurators/sections/defineFlashcardsSection/defineFlashcardsSection.schemas';
import { learningFlowSection_Metadata_Config_Schema } from '../../configurators/sections/defineLearningFlowSection/defineLearningFlowSection.schemas';
import { practiceSection_Metadata_Config_Schema } from '../../configurators/sections/definePracticeSection/definePracticeSection.schemas';
import { questSection_Config_Schema } from '../../configurators/sections/defineQuestSection/defineQuestSection.schemas';
import { stage_Config_Schema } from '../../configurators/sections/defineQuestSection/defineStage/defineStage.schemas';
import { task_Config_Schema } from '../../configurators/sections/defineQuestSection/defineTask/defineTask.schemas';
import { quizSection_Metadata_Config_Schema } from '../../configurators/sections/defineQuizSection/defineQuizSection.schemas';
import { lessonProductionAssessmentRequirements_Schema } from './lessonAssessment.types';
import { workflowLanguages_Schema } from './workflowLanguages.schemas';

/** Stage 1 is an editorial plan, not a partially built Lesson Configurator. */
const lessonStage1Params_Schema = lesson_Metadata_Config_Schema.shape.params
  .omit({ languages: true, quizRequiredForCompletion: true, sections: true })
  .partial()
  .extend({
    languages: z.never().optional(),
    quizRequiredForCompletion: lesson_Metadata_Config_Schema.shape.params.shape.quizRequiredForCompletion,
    sections: lesson_Metadata_Config_Schema.shape.params.shape.sections.partial().optional(),
  })
  .strict();

const lessonStage1Config_Schema = lesson_Metadata_Config_Schema
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
/** Inert Stage children are direct root placement nodes, not executable Configurators.
 * Full child semantics are checked at the boundary, without evaluating the draft.
 */
export type LessonWorkflowOrdered<Child> = { children: string[] } & Record<string, Child | string[]>;

export function workflowChildren_Schema<Metadata extends z.ZodObject, Child extends z.ZodType>(
  metadata: Metadata, child: Child,
) {
  return metadata.extend({ children: z.array(z.string()) }).catchall(z.unknown()).superRefine((source, ctx) => {
    const own = new Set([...Object.keys(metadata.shape), 'children']);
    const keys = Object.keys(source).filter(key => !own.has(key));
    if (keys.length !== source.children.length ||
        new Set(source.children).size !== source.children.length ||
        source.children.some(key => !Object.hasOwn(source, key) || own.has(key))) {
      ctx.addIssue({ code: 'custom', path: ['children'], message: 'Every authored child must be ordered once' });
    }
    for (const key of keys) {
      if (!/^[A-Za-z][A-Za-z0-9]*$/.test(key) ||
          ['items', 'order', 'content', 'slides', 'section', 'constructor', 'prototype', '__proto__'].includes(key)) {
        ctx.addIssue({ code: 'custom', path: [key], message: 'Unsafe or reserved child placement key' });
        continue;
      }
      const parsed = child.safeParse(source[key]);
      if (!parsed.success)
        for (const issue of parsed.error.issues)
          ctx.addIssue({ code: 'custom', path: [key, ...issue.path], message: issue.message });
    }
  });
}

/** Retained only for named semantic Quest groups that are explicitly unordered. */
/** Production notes do not become Config or runtime Props fields. */
const nodeProduction_Schema = z.strictObject({
  purpose: z.string().optional(),
  pedagogicalIntent: z.string().optional(),
  specification: z.string().optional(),
  prompt: z.string().optional(),
  script: z.string().optional(),
  storyboard: z.string().optional(),
});
export type LessonWorkflowNodeProduction = z.infer<typeof nodeProduction_Schema>;

const resourceProduction_Schema = nodeProduction_Schema.extend({
  specification: z.string().trim().min(1),
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
/** An Image is not producible from a generic purpose; Stage 2 must author a generation prompt. */
const imageNode_Schema = z.strictObject({
  config: imageSource_Schema,
  production: nodeProduction_Schema.extend({
    prompt: z.string().trim().min(80, 'Image requires a concrete generation prompt with visual detail'),
  }),
});
const videoNode_Schema = resource(videoSource_Schema);
const audioNode_Schema = resource(audioSource_Schema);
const subtitlesNode_Schema = resource(subtitlesSource_Schema);
const sceneNode_Schema = resource(scene_Config_Schema);

const lessonPrimitiveSources = {
  text: textNode_Schema,
  markdown: node(markdown_Config_Schema),
  code: node(code_Config_Schema),
  image: imageNode_Schema,
  video: videoNode_Schema,
  youtube: resource(youtubeSource_Schema),
  audio: audioNode_Schema,
  subtitles: subtitlesNode_Schema,
  scene: sceneNode_Schema,
} as const satisfies Record<ContentBlock_Primitive_Type, z.ZodType>;
type LessonPrimitiveSource = (typeof lessonPrimitiveSources)[ContentBlock_Primitive_Type];
const simpleBlock_Schema = z.union(
  Object.values(lessonPrimitiveSources) as [LessonPrimitiveSource, ...LessonPrimitiveSource[]],
);
export type LessonWorkflowStage2SimpleBlock = z.infer<typeof simpleBlock_Schema>;

const carouselNode_Schema = node(workflowChildren_Schema(
  carousel_Metadata_Config_Schema, z.union([imageNode_Schema, sceneNode_Schema]),
));
export type LessonWorkflowStage2Carousel = z.infer<typeof carouselNode_Schema>;

/** Editorial Checkpoint Answer uses the exhaustively classified Primitive nodes. */
export const lessonWorkflowCheckpointAnswerSource_Schema = node(workflowChildren_Schema(
  z.object(checkpointAnswer_Config_Schema.shape).omit({ children: true }),
  simpleBlock_Schema,
));
export type LessonWorkflowStage2CheckpointAnswer = z.infer<typeof lessonWorkflowCheckpointAnswerSource_Schema>;

const checkpointItemNode_Schema = node(
  checkpointItem_Config_Schema.extend({
    question: textNode_Schema,
    answer: lessonWorkflowCheckpointAnswerSource_Schema,
  }),
);
export type LessonWorkflowStage2CheckpointItem = z.infer<typeof checkpointItemNode_Schema>;

const checkpointNode_Schema = node(workflowChildren_Schema(
  checkpoint_Metadata_Config_Schema, checkpointItemNode_Schema,
));
export type LessonWorkflowStage2Checkpoint = z.infer<typeof checkpointNode_Schema>;

const block_Schema = z.union([simpleBlock_Schema, carouselNode_Schema, checkpointNode_Schema]);
export type LessonWorkflowStage2Block = z.infer<typeof block_Schema>;

/** Ordinary Section children remain in one ordered direct placement collection. */
export const lessonWorkflowContentSection_Schema = node(workflowChildren_Schema(
  contentSection_Metadata_Config_Schema, block_Schema,
));
export const lessonWorkflowOrdinarySection_Schema = z.union([
  lessonWorkflowContentSection_Schema,
  node(workflowChildren_Schema(practiceSection_Metadata_Config_Schema, block_Schema)),
  node(workflowChildren_Schema(codingTaskSection_Metadata_Config_Schema, block_Schema)),
  node(workflowChildren_Schema(learningFlowSection_Metadata_Config_Schema, block_Schema)),
]);

/** Quiz/Flashcards keep named selection/scoring params while ordering real child blocks. */
export const lessonWorkflowQuizSection_Schema = z.strictObject({
  config: workflowChildren_Schema(
    quizSection_Metadata_Config_Schema.extend({
      params: quizSection_Metadata_Config_Schema.shape.params.partial(),
    }), block_Schema,
  ),
  production: nodeProduction_Schema,
});
export type LessonWorkflowStage2QuizSection = z.infer<typeof lessonWorkflowQuizSection_Schema>;

const flashcardsSectionNode_Schema = z.strictObject({
  config: workflowChildren_Schema(
    flashcardsSection_Metadata_Config_Schema.extend({
      params: flashcardsSection_Metadata_Config_Schema.shape.params.partial(),
    }), block_Schema,
  ),
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
export const lessonWorkflowSection_Schema = section_Schema;
export type LessonWorkflowStage2Section = z.infer<typeof section_Schema>;

const lessonStage2Config_Schema = workflowChildren_Schema(
  lessonStage1Config_Schema.omit({ section: true, events: true }).extend({
    events: lesson_Metadata_Config_Schema.shape.events,
  }),
  section_Schema,
);
export type LessonWorkflowStage2Config = z.infer<typeof lessonStage2Config_Schema>;

/** Stage 2 remains the final Lesson input; no additional editorial stage. */
export const lessonWorkflowStage2_Schema = lessonWorkflowStage1_Schema.extend({
  config: lessonStage2Config_Schema,
});
export type LessonWorkflowStage2 = z.infer<typeof lessonWorkflowStage2_Schema>;
