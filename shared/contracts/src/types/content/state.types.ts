interface LessonState_Base {
  /** Identifies this particular run of the lesson. */
  id: string;
  lessonId: string;
}

interface LessonState_Progress extends LessonState_Base {
  startedAt: string;
  currentSectionId?: string;
  /** Keyed by section ID; an absent entry means the section has not been visited. */
  sectionCompletion: Record<string, boolean>;
  skippedSectionIds: string[];
  /** Keyed by quiz section ID; the linked QuizState holds its answers and result. */
  quizStateIds: Record<string, QuizState['id']>;
}

export type LessonState =
  | (LessonState_Base & {
      status: 'new';
      startedAt?: never;
      sectionCompletion?: never;
      skippedSectionIds?: never;
      quizStateIds?: never;
      contentCompletedAt?: never;
      completedAt?: never;
    })
  | (LessonState_Progress & { status: 'in-progress'; contentCompletedAt?: never; completedAt?: never })
  /** Lesson content is complete; any required quiz may still be unfinished. */
  | (LessonState_Progress & { status: 'content-complete'; contentCompletedAt: string; completedAt?: never })
  /** All requirements, including a quiz when requireQuiz is true, are met. */
  | (LessonState_Progress & { status: 'finished'; contentCompletedAt: string; completedAt: string });


/** An answer uses question and option IDs; numeric input keeps the entered text. */
export type QuizAnswer =
  | { type: 'select-one-answer'; value: string }
  | { type: 'select-multiple-answers'; value: string[] }
  | { type: 'match-blocks'; value: Record<string, string> }
  | { type: 'answer-with-text'; value: string }
  | { type: 'answer-with-number'; value: string }
  | { type: 'order-sequence'; value: string[] }
  | { type: 'build-answer-with-blocks'; value: string[] }
  | { type: 'fill-blanks-with-blocks'; value: Record<string, string | null> }
  | { type: 'fill-blanks-with-text'; value: Record<string, string> };

export interface QuizQuestionResult {
  status: 'correct' | 'incorrect';
  /** Points earned from this question's configured weight. */
  earnedWeight: number;
}

/** A missing entry in QuizState.answers means the question has not been visited. */
export type QuizQuestionState =
  | { status: 'draft'; answer: QuizAnswer; result?: never }
  | { status: 'deferred'; answer?: QuizAnswer; result?: never }
  | { status: 'submitted'; answer: QuizAnswer; result?: QuizQuestionResult };

export type QuizResult = { status: 'graded'; success: boolean; value: number } | { status: 'ungraded' };

interface QuizState_Base {
  /** Identifies this particular run; another run of the same quiz has another ID. */
  id: string;
  /** Refers to Quiz.id, which also identifies its configuration. */
  quizId: string;
}

interface QuizState_Progress extends QuizState_Base {
  startedAt: string;
  /** Keyed by question ID; a draft survives navigation, and a deferred question may have no answer. */
  answers: Record<string, QuizQuestionState>;
}

export type QuizState =
  | (QuizState_Base & { status: 'new'; startedAt?: never; answers?: never; completedAt?: never; result?: never })
  | (QuizState_Progress & { status: 'in-progress'; completedAt?: never; result?: never })
  | (QuizState_Progress & { status: 'finished'; completedAt: string; result: QuizResult });
