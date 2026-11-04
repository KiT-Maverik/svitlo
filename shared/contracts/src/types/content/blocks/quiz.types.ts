import type { ContentEntity_ConfigType } from '../entity.types';
import type { NonEmptyArray } from '../../misc.types';
import type { LanguageCode } from '../../languages';
import type { Locale_Options } from '../locale.types';
import type { Question_SelectOneAnswer } from '../questions/selectOneAnswer.types';
import type { ContentBlock } from './index';
import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';

export type ContentBlock_Quiz_Screen<ConfigType extends 'data' | 'response', SupportedLanguages extends LanguageCode> =
  | { showDefaultContent: true; content?: readonly ContentBlock<ConfigType, SupportedLanguages>[] }
  | { showDefaultContent?: false; content: NonEmptyArray<ContentBlock<ConfigType, SupportedLanguages>> };

type Quiz_Settings<ConfigType extends 'data' | 'response', SupportedLanguages extends LanguageCode> = {
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
    /** Shown before the first question. */
    starting?: ContentBlock_Quiz_Screen<ConfigType, SupportedLanguages>;
    ending?: {
      /** Passing result. */
      success: ContentBlock_Quiz_Screen<ConfigType, SupportedLanguages>;
      /** Failed with no attempts remaining. */
      fail: ContentBlock_Quiz_Screen<ConfigType, SupportedLanguages>;
      /** Failure while another attempt is available. */
      retry?: ContentBlock_Quiz_Screen<ConfigType, SupportedLanguages>;
    };
  };
};

type ContentBlock_Quiz_Definition = ContentBlock_Definition_Meta<'quiz'>;

type ContentBlock_Quiz_Data<SupportedLanguages extends LanguageCode> = ContentBlock_Data_Meta &
  Quiz_Settings<'data', SupportedLanguages> & {
    welcome: Locale_Options<SupportedLanguages>;
    questions: Record<string, Question_SelectOneAnswer<'data', SupportedLanguages>>;
  };

type ContentBlock_Quiz_Response = ContentBlock_Response_Meta<'quiz'> &
  Quiz_Settings<'response', LanguageCode> & {
    welcome: string;
    /** References to Lesson.questions.selectOneAnswer, not duplicated questions. */
    questionSlugs: readonly string[];
  };

export type ContentBlock_Quiz<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends LanguageCode> = {
  definition: ContentBlock_Quiz_Definition;
  data: ContentBlock_Quiz_Data<SupportedLanguages>;
  response: ContentBlock_Quiz_Response;
}[ConfigType];
