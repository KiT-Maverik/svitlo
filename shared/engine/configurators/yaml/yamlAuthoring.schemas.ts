import { z } from 'zod';

import { camelCase_Schema } from '#schemas';
import { checkpointAnswer_Config_Schema } from '../contentBlocks/defineCheckpoint/defineCheckpointAnswer/defineCheckpointAnswer.schemas';
import { checkpointItem_Config_Schema } from '../contentBlocks/defineCheckpoint/defineCheckpointItem/defineCheckpointItem.schemas';
import { checkpoint_Config_Schema } from '../contentBlocks/defineCheckpoint/defineCheckpoint.schemas';
import { carousel_Config_Schema } from '../contentBlocks/defineCarousel/defineCarousel.schemas';
import { code_Config_Schema } from '../contentBlocks/defineCode/defineCode.schemas';
import { markdown_Config_Schema } from '../contentBlocks/defineMarkdown/defineMarkdown.schemas';
import { scene_Config_Schema } from '../contentBlocks/defineScene/defineScene.schemas';
import { text_Config_Schema } from '../contentBlocks/defineText/defineText.schemas';
import { youtube_Config_Schema } from '../contentBlocks/defineYoutube/defineYoutube.schemas';
import { chapter_Config_Schema } from '../courses/defineChapter/defineChapter.schemas';
import { course_Config_Schema } from '../courses/defineCourse/defineCourse.schemas';
import { module_Config_Schema } from '../courses/defineModule/defineModule.schemas';
import { episode_Config_Schema } from '../episodes/defineEpisode/defineEpisode.schemas';
import { flashcard_Config_Schema } from '../flashcards/defineFlashcard/defineFlashcard.schemas';
import { lesson_Config_Schema } from '../lessons/defineLesson/defineLesson.schemas';
import { questionBlockCollection_Config_Schema } from '../questions/question.schemas';
import { stage_Config_Schema } from '../sections/defineQuestSection/defineStage/defineStage.schemas';
import { task_Config_Schema } from '../sections/defineQuestSection/defineTask/defineTask.schemas';
import {
  yamlAudio_Schema, yamlImage_Schema, yamlSubtitles_Schema, yamlVideo_Schema,
} from './yamlContentBlock.schemas';
import {
  yamlCodingTaskSection_Schema, yamlContentSection_Schema, yamlFlashcardsSection_Schema,
  yamlLearningFlowSection_Schema, yamlPracticeSection_Schema, yamlQuestSection_Schema,
  yamlQuizSection_Schema,
} from './yamlSection.schemas';
import {
  yamlAnswerWithNumber_Schema, yamlAnswerWithText_Schema, yamlBuildAnswerWithBlocks_Schema,
  yamlFillBlanksWithBlocks_Schema, yamlFillBlanksWithText_Schema, yamlMatchBlocks_Schema,
  yamlOrderSequence_Schema, yamlSelectMultipleAnswers_Schema, yamlSelectOneAnswer_Schema,
} from './yamlQuestion.schemas';
import { yamlLessonReference_Schema } from './yamlLessonCourse.schemas';
import { yamlProduction_Schemas } from './yamlProduction.schemas';

/**
 * One normalized source node at every level. Production is authoring-only and
 * must be stripped before passing Config to define*. Reuse each child schema
 * in every parent; only Engine's opaque Configurator boundaries are replaced.
 */
export const yamlAuthoringNode = <Config extends z.ZodType, Production extends z.ZodType>(
  config: Config,
  production: Production,
) => z.strictObject({ config, production: production.optional() });

export const yamlTextAuthoring_Schema = yamlAuthoringNode(text_Config_Schema, yamlProduction_Schemas.block);
export const yamlCodeAuthoring_Schema = yamlAuthoringNode(code_Config_Schema, yamlProduction_Schemas.block);
export const yamlMarkdownAuthoring_Schema = yamlAuthoringNode(markdown_Config_Schema, yamlProduction_Schemas.block);
export const yamlSceneAuthoring_Schema = yamlAuthoringNode(scene_Config_Schema, yamlProduction_Schemas.scene);
export const yamlYoutubeAuthoring_Schema = yamlAuthoringNode(youtube_Config_Schema, yamlProduction_Schemas.block);
export const yamlAudioAuthoring_Schema = yamlAuthoringNode(yamlAudio_Schema, yamlProduction_Schemas.audio);
export const yamlImageAuthoring_Schema = yamlAuthoringNode(yamlImage_Schema, yamlProduction_Schemas.image);
export const yamlVideoAuthoring_Schema = yamlAuthoringNode(yamlVideo_Schema, yamlProduction_Schemas.video);
export const yamlSubtitlesAuthoring_Schema = yamlAuthoringNode(yamlSubtitles_Schema, yamlProduction_Schemas.subtitles);

export const yamlCarouselAuthoring_Schema = yamlAuthoringNode(
  carousel_Config_Schema.extend({
    slides: carousel_Config_Schema.shape.slides.extend({
      items: z.record(z.string(), z.union([yamlImageAuthoring_Schema, yamlSceneAuthoring_Schema])),
    }),
  }),
  yamlProduction_Schemas.block,
);

/** A Checkpoint answer must not contain Checkpoints or CheckpointItems. */
export const yamlCheckpointAnswerBlockAuthoring_Schema = z.union([
  yamlAudioAuthoring_Schema, yamlCarouselAuthoring_Schema, yamlCodeAuthoring_Schema,
  yamlImageAuthoring_Schema, yamlMarkdownAuthoring_Schema, yamlSceneAuthoring_Schema,
  yamlSubtitlesAuthoring_Schema, yamlTextAuthoring_Schema, yamlVideoAuthoring_Schema,
  yamlYoutubeAuthoring_Schema,
]);
export const yamlCheckpointAnswerAuthoring_Schema = yamlAuthoringNode(
  checkpointAnswer_Config_Schema.extend({
    content: checkpointAnswer_Config_Schema.shape.content.extend({
      items: z.record(z.string(), yamlCheckpointAnswerBlockAuthoring_Schema),
    }),
  }),
  yamlProduction_Schemas.block,
);
export const yamlCheckpointItemAuthoring_Schema = yamlAuthoringNode(
  checkpointItem_Config_Schema.extend({
    question: yamlTextAuthoring_Schema,
    answer: yamlCheckpointAnswerAuthoring_Schema,
  }),
  yamlProduction_Schemas.block,
);
export const yamlCheckpointAuthoring_Schema = yamlAuthoringNode(
  checkpoint_Config_Schema.extend({
    content: checkpoint_Config_Schema.shape.content.extend({
      items: z.record(z.string(), yamlCheckpointItemAuthoring_Schema),
    }),
  }),
  yamlProduction_Schemas.block,
);

export const yamlContentBlockAuthoring_Schema = z.union([
  yamlAudioAuthoring_Schema, yamlCarouselAuthoring_Schema, yamlCheckpointAuthoring_Schema,
  yamlCodeAuthoring_Schema, yamlImageAuthoring_Schema, yamlMarkdownAuthoring_Schema,
  yamlSceneAuthoring_Schema, yamlSubtitlesAuthoring_Schema, yamlTextAuthoring_Schema,
  yamlVideoAuthoring_Schema, yamlYoutubeAuthoring_Schema,
]);

const contentItems = { items: z.record(z.string(), yamlContentBlockAuthoring_Schema) };
export const yamlCodingTaskSectionAuthoring_Schema = yamlAuthoringNode(
  yamlCodingTaskSection_Schema.extend({
    content: yamlCodingTaskSection_Schema.shape.content.extend(contentItems),
  }),
  yamlProduction_Schemas.section,
);
export const yamlContentSectionAuthoring_Schema = yamlAuthoringNode(
  yamlContentSection_Schema.extend({
    content: yamlContentSection_Schema.shape.content.extend(contentItems),
  }),
  yamlProduction_Schemas.section,
);
export const yamlFlashcardsSectionAuthoring_Schema = yamlAuthoringNode(
  yamlFlashcardsSection_Schema.extend({
    content: yamlFlashcardsSection_Schema.shape.content.extend(contentItems),
  }),
  yamlProduction_Schemas.section,
);
export const yamlLearningFlowSectionAuthoring_Schema = yamlAuthoringNode(
  yamlLearningFlowSection_Schema.extend({
    content: yamlLearningFlowSection_Schema.shape.content.extend(contentItems),
  }),
  yamlProduction_Schemas.section,
);
export const yamlPracticeSectionAuthoring_Schema = yamlAuthoringNode(
  yamlPracticeSection_Schema.extend({
    content: yamlPracticeSection_Schema.shape.content.extend(contentItems),
  }),
  yamlProduction_Schemas.section,
);
export const yamlQuizSectionAuthoring_Schema = yamlAuthoringNode(
  yamlQuizSection_Schema.extend({
    content: yamlQuizSection_Schema.shape.content.extend(contentItems),
  }),
  yamlProduction_Schemas.section,
);

export const yamlQuestStageAuthoring_Schema = yamlAuthoringNode(
  stage_Config_Schema.extend({
    content: stage_Config_Schema.shape.content.extend({
      video: stage_Config_Schema.shape.content.shape.video.extend({
        medium: yamlVideoAuthoring_Schema,
        small: yamlVideoAuthoring_Schema,
      }),
      audio: stage_Config_Schema.shape.content.shape.audio.extend({
        dialogue: yamlAudioAuthoring_Schema.nullable(),
        narration: yamlAudioAuthoring_Schema.nullable(),
        background: yamlAudioAuthoring_Schema.nullable(),
      }),
      image: yamlImageAuthoring_Schema,
      subtitles: yamlSubtitlesAuthoring_Schema,
    }),
  }),
  yamlProduction_Schemas.questStage,
);
export const yamlQuestTaskAuthoring_Schema = yamlAuthoringNode(
  task_Config_Schema.extend({ scene: yamlSceneAuthoring_Schema }),
  yamlProduction_Schemas.questTask,
);
export const yamlQuestSectionAuthoring_Schema = yamlAuthoringNode(
  yamlQuestSection_Schema.extend({
    stages: z.intersection(
      z.object({ start: yamlQuestStageAuthoring_Schema }),
      z.record(camelCase_Schema, yamlQuestStageAuthoring_Schema),
    ),
    tasks: z.intersection(
      z.object({ start: yamlQuestTaskAuthoring_Schema }),
      z.record(camelCase_Schema, yamlQuestTaskAuthoring_Schema),
    ),
  }),
  yamlProduction_Schemas.section,
);
export const yamlSectionAuthoring_Schema = z.union([
  yamlCodingTaskSectionAuthoring_Schema, yamlContentSectionAuthoring_Schema,
  yamlFlashcardsSectionAuthoring_Schema, yamlLearningFlowSectionAuthoring_Schema,
  yamlPracticeSectionAuthoring_Schema, yamlQuestSectionAuthoring_Schema,
  yamlQuizSectionAuthoring_Schema,
]);

const questionBlocks = questionBlockCollection_Config_Schema.extend({
  items: z.record(z.string(), yamlContentBlockAuthoring_Schema),
});
const questionCommon = {
  question: questionBlocks,
  hint: questionBlocks.optional(),
  explanation: questionBlocks.optional(),
};
export const yamlAnswerWithNumberAuthoring_Schema = yamlAuthoringNode(
  yamlAnswerWithNumber_Schema.extend({
    content: yamlAnswerWithNumber_Schema.shape.content.extend(questionCommon),
  }),
  yamlProduction_Schemas.question,
);
export const yamlAnswerWithTextAuthoring_Schema = yamlAuthoringNode(
  yamlAnswerWithText_Schema.extend({
    content: yamlAnswerWithText_Schema.shape.content.extend(questionCommon),
  }),
  yamlProduction_Schemas.question,
);
export const yamlBuildAnswerWithBlocksAuthoring_Schema = yamlAuthoringNode(
  yamlBuildAnswerWithBlocks_Schema.extend({
    content: yamlBuildAnswerWithBlocks_Schema.shape.content.extend({
      ...questionCommon, correctSequence: questionBlocks, distractors: questionBlocks,
    }),
  }),
  yamlProduction_Schemas.question,
);
export const yamlFillBlanksWithBlocksAuthoring_Schema = yamlAuthoringNode(
  yamlFillBlanksWithBlocks_Schema.extend({
    content: yamlFillBlanksWithBlocks_Schema.shape.content.extend({
      ...questionCommon,
      slots: yamlFillBlanksWithBlocks_Schema.shape.content.shape.slots.extend({
        items: z.record(z.string(), z.object({ correctAnswer: yamlContentBlockAuthoring_Schema })),
      }),
      distractors: questionBlocks,
    }),
  }),
  yamlProduction_Schemas.question,
);
export const yamlFillBlanksWithTextAuthoring_Schema = yamlAuthoringNode(
  yamlFillBlanksWithText_Schema.extend({
    content: yamlFillBlanksWithText_Schema.shape.content.extend(questionCommon),
  }),
  yamlProduction_Schemas.question,
);
export const yamlMatchBlocksAuthoring_Schema = yamlAuthoringNode(
  yamlMatchBlocks_Schema.extend({
    content: yamlMatchBlocks_Schema.shape.content.extend({
      ...questionCommon,
      pairs: yamlMatchBlocks_Schema.shape.content.shape.pairs.extend({
        items: z.record(z.string(), z.object({
          left: yamlContentBlockAuthoring_Schema,
          right: yamlContentBlockAuthoring_Schema,
        })),
      }),
    }),
  }),
  yamlProduction_Schemas.question,
);
export const yamlOrderSequenceAuthoring_Schema = yamlAuthoringNode(
  yamlOrderSequence_Schema.extend({
    content: yamlOrderSequence_Schema.shape.content.extend({
      ...questionCommon, sequence: questionBlocks,
    }),
  }),
  yamlProduction_Schemas.question,
);
export const yamlSelectMultipleAnswersAuthoring_Schema = yamlAuthoringNode(
  yamlSelectMultipleAnswers_Schema.extend({
    content: yamlSelectMultipleAnswers_Schema.shape.content.extend({
      ...questionCommon,
      answers: yamlSelectMultipleAnswers_Schema.shape.content.shape.answers.extend({
        correct: questionBlocks, incorrect: questionBlocks, distractors: questionBlocks,
      }),
    }),
  }),
  yamlProduction_Schemas.question,
);
export const yamlSelectOneAnswerAuthoring_Schema = yamlAuthoringNode(
  yamlSelectOneAnswer_Schema.extend({
    content: yamlSelectOneAnswer_Schema.shape.content.extend({
      ...questionCommon,
      answers: yamlSelectOneAnswer_Schema.shape.content.shape.answers.extend({
        correct: questionBlocks, incorrect: questionBlocks, distractors: questionBlocks,
      }),
    }),
  }),
  yamlProduction_Schemas.question,
);
export const yamlQuestionAuthoring_Schema = z.union([
  yamlAnswerWithNumberAuthoring_Schema, yamlAnswerWithTextAuthoring_Schema,
  yamlBuildAnswerWithBlocksAuthoring_Schema, yamlFillBlanksWithBlocksAuthoring_Schema,
  yamlFillBlanksWithTextAuthoring_Schema, yamlMatchBlocksAuthoring_Schema,
  yamlOrderSequenceAuthoring_Schema, yamlSelectMultipleAnswersAuthoring_Schema,
  yamlSelectOneAnswerAuthoring_Schema,
]);

const flashcardSide = flashcard_Config_Schema.shape.content.shape.front.extend({
  items: z.record(z.string(), yamlContentBlockAuthoring_Schema),
});
export const yamlFlashcardAuthoring_Schema = yamlAuthoringNode(
  flashcard_Config_Schema.extend({
    content: flashcard_Config_Schema.shape.content.extend({
      front: flashcardSide,
      back: flashcardSide,
      hint: flashcardSide.optional(),
    }),
  }),
  yamlProduction_Schemas.flashcard,
);

const sectionCollection = lesson_Config_Schema.shape.section.extend({
  items: z.record(z.string(), yamlSectionAuthoring_Schema),
});
export const yamlLessonAuthoring_Schema = yamlAuthoringNode(
  lesson_Config_Schema.extend({ section: sectionCollection }),
  yamlProduction_Schemas.lesson,
).required({ production: true });
export const yamlEpisodeAuthoring_Schema = yamlAuthoringNode(
  episode_Config_Schema.extend({
    section: episode_Config_Schema.shape.section.extend({
      items: z.record(z.string(), yamlSectionAuthoring_Schema),
    }),
  }),
  yamlProduction_Schemas.episode,
);

/** A referenced Lesson has a different discriminator from an inline Lesson. */
export const yamlLessonReferenceAuthoring_Schema = yamlAuthoringNode(
  yamlLessonReference_Schema,
  yamlProduction_Schemas.lessonReference,
);
const chapterChildren = z.union([
  yamlEpisodeAuthoring_Schema, yamlLessonAuthoring_Schema, yamlLessonReferenceAuthoring_Schema,
]);
export const yamlChapterAuthoring_Schema = yamlAuthoringNode(
  chapter_Config_Schema.extend({
    content: chapter_Config_Schema.shape.content.extend({
      items: z.record(z.string(), chapterChildren),
    }),
  }),
  yamlProduction_Schemas.chapter,
);
const moduleChildren = z.union([
  yamlChapterAuthoring_Schema, yamlEpisodeAuthoring_Schema,
  yamlLessonAuthoring_Schema, yamlLessonReferenceAuthoring_Schema,
]);
export const yamlModuleAuthoring_Schema = yamlAuthoringNode(
  module_Config_Schema.extend({
    content: module_Config_Schema.shape.content.extend({
      items: z.record(z.string(), moduleChildren),
    }),
  }),
  yamlProduction_Schemas.module,
);
const courseChildren = z.union([
  yamlModuleAuthoring_Schema, yamlChapterAuthoring_Schema, yamlEpisodeAuthoring_Schema,
  yamlLessonAuthoring_Schema, yamlLessonReferenceAuthoring_Schema,
]);
export const yamlCourseAuthoring_Schema = yamlAuthoringNode(
  course_Config_Schema.extend({
    content: course_Config_Schema.shape.content.extend({
      items: z.record(z.string(), courseChildren),
    }),
  }),
  yamlProduction_Schemas.course,
).required({ production: true });

export const yamlAuthoringSchemas = {
  contentBlock: yamlContentBlockAuthoring_Schema,
  section: yamlSectionAuthoring_Schema,
  question: yamlQuestionAuthoring_Schema,
  flashcard: yamlFlashcardAuthoring_Schema,
  lesson: yamlLessonAuthoring_Schema,
  episode: yamlEpisodeAuthoring_Schema,
  chapter: yamlChapterAuthoring_Schema,
  module: yamlModuleAuthoring_Schema,
  course: yamlCourseAuthoring_Schema,
} as const;
