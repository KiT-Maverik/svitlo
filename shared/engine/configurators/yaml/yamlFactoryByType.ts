import type { ContentBlock_Type } from '../contentBlocks/contentBlock.constants';
import type { Question_Type } from '../questions/question.constants';
import type { Section_Type } from '../sections/section.constants';

export type YamlConfiguratorType =
  | ContentBlock_Type
  | Question_Type
  | Section_Type
  | 'quest'
  | 'questStage'
  | 'questTask'
  | 'carouselSlide'
  | 'checkpointItem'
  | 'flashcard'
  | 'lesson'
  | 'episode'
  | 'chapter'
  | 'module'
  | 'course';

/**
 * Build-time `type` -> public Engine factory name for mechanical TS draft
 * scaffolders. This is a dispatch table, NOT a YAML validation mechanism.
 *
 * `satisfies` forces this table to stay exhaustive as the canonical Engine
 * ContentBlock, Question, and Section type unions change.
 */
export const yamlFactoryByType = {
  text: 'defineText',
  code: 'defineCode',
  image: 'defineImage',
  video: 'defineVideo',
  youtube: 'defineYoutube',
  carousel: 'defineCarousel',
  scene: 'defineScene',
  checkpoint: 'defineCheckpoint',
  markdown: 'defineMarkdown',
  audio: 'defineAudio',
  subtitles: 'defineSubtitles',
  carouselSlide: 'defineCarouselSlide',
  checkpointItem: 'defineCheckpointItem',

  content: 'defineContentSection',
  practice: 'definePracticeSection',
  codingTask: 'defineCodingTaskSection',
  learningFlow: 'defineLearningFlowSection',
  flashcards: 'defineFlashcardsSection',
  quiz: 'defineQuizSection',
  quest: 'defineQuestSection',
  questStage: 'defineStage',
  questTask: 'defineTask',

  selectOneAnswer: 'defineSelectOneAnswer',
  selectMultipleAnswers: 'defineSelectMultipleAnswers',
  matchBlocks: 'defineMatchBlocks',
  answerWithText: 'defineAnswerWithText',
  answerWithNumber: 'defineAnswerWithNumber',
  orderSequence: 'defineOrderSequence',
  buildAnswerWithBlocks: 'defineBuildAnswerWithBlocks',
  fillBlanksWithBlocks: 'defineFillBlanksWithBlocks',
  fillBlanksWithText: 'defineFillBlanksWithText',

  flashcard: 'defineFlashcard',
  lesson: 'defineLesson',
  episode: 'defineEpisode',
  chapter: 'defineChapter',
  module: 'defineModule',
  course: 'defineCourse',
} as const satisfies Record<YamlConfiguratorType, string>;
