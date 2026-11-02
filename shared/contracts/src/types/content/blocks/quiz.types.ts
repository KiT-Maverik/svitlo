import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Config, Locale_ResponseParams } from '../locale.types';
import type { Question_SelectOneAnswer } from '../questions/selectOneAnswer.types';
import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';

type Quiz_Settings = {
  feedbackMode: 'immediate' | 'after-completion';
  grading?: { mode: 'percentage' | 'points'; successThreshold: number };
  interaction: {
    retries: number;
    showErrors: boolean;
    showCorrectAnswers: boolean;
    allowExplanations: boolean;
    allowDeferring: boolean;
    allowQuestionNavigation: boolean;
    skippable: boolean;
  };
  maxDuration?: number;
  results: { visibility: 'immediate' | 'after-review' | 'hidden'; showScore: boolean };
  screen: {
    ending?: {
      success: { showDefaultContent: true };
      fail: { showDefaultContent: true };
    };
  };
};

type ContentBlock_Quiz_Definition = ContentBlock_Definition_Meta<'quiz'>;

type ContentBlock_Quiz_Data = ContentBlock_Data_Meta &
  Quiz_Settings & {
    welcome: Locale_Config;
    questions: Record<string, Question_SelectOneAnswer<'data'>>;
  };

type ContentBlock_Quiz_Response = ContentBlock_Response_Meta<'quiz'> &
  Locale_ResponseParams &
  Quiz_Settings & {
    welcome: string;
    /** References to Lesson.questions.selectOneAnswer, not duplicated questions. */
    questionSlugs: readonly string[];
  };

export type ContentBlock_Quiz<ConfigType extends ContentEntity_ConfigType> = {
  definition: ContentBlock_Quiz_Definition;
  data: ContentBlock_Quiz_Data;
  response: ContentBlock_Quiz_Response;
}[ConfigType];
