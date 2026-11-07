import type { AssessmentMethods_Locale } from '../../data/locale/assessmentMethods';
import type { Audio_Locale } from '../../data/locale/audio';
import type { Checkpoint_Locale } from '../../data/locale/checkpoint';
import type { Flashcard_Locale } from '../../data/locale/flashcard';
import type { Image_Locale } from '../../data/locale/image';
import type { LearningLayout_Locale } from '../../data/locale/learningLayout';
import type { Lesson_Locale } from '../../data/locale/lesson';
import type { NavbarPreferences_Locale } from '../../data/locale/navbarPreferences';
import type { QuestionFrame_Locale } from '../../data/locale/questionFrame';
import type { Video_Locale } from '../../data/locale/video';
import type { Youtube_Locale } from '../../data/locale/youtube';

export type {
  AssessmentMethods_Locale,
  Audio_Locale,
  Checkpoint_Locale,
  Flashcard_Locale,
  Image_Locale,
  LearningLayout_Locale,
  Lesson_Locale,
  NavbarPreferences_Locale,
  QuestionFrame_Locale,
  Video_Locale,
  Youtube_Locale,
};

/** One selected-language dictionary, assembled by the host from published JSON. */
export type UiKitMessages = {
  assessmentMethods: AssessmentMethods_Locale;
  audio: Audio_Locale;
  checkpoint: Checkpoint_Locale;
  flashcard: Flashcard_Locale;
  image: Image_Locale;
  learningLayout: LearningLayout_Locale;
  lesson: Lesson_Locale;
  navbarPreferences: NavbarPreferences_Locale;
  questionFrame: QuestionFrame_Locale;
  video: Video_Locale;
  youtube: Youtube_Locale;
};
