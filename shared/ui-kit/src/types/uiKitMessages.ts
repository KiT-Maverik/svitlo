import type { AudioMessages } from '../../data/locale/audio';
import type { CheckpointMessages } from '../../data/locale/checkpoint';
import type { FlashcardMessages } from '../../data/locale/flashcard';
import type { ImageMessages } from '../../data/locale/image';
import type { LearningLayoutMessages } from '../../data/locale/learningLayout';
import type { LessonMessages } from '../../data/locale/lesson';
import type { NavbarPreferencesMessages } from '../../data/locale/navbarPreferences';
import type { QuestionFrameMessages } from '../../data/locale/questionFrame';
import type { VideoMessages } from '../../data/locale/video';
import type { YoutubeMessages } from '../../data/locale/youtube';

export type {
  AudioMessages,
  CheckpointMessages,
  FlashcardMessages,
  ImageMessages,
  LearningLayoutMessages,
  LessonMessages,
  NavbarPreferencesMessages,
  QuestionFrameMessages,
  VideoMessages,
  YoutubeMessages,
};

/** One selected-language dictionary, assembled by the host from published JSON. */
export type UiKitMessages = {
  audio: AudioMessages;
  checkpoint: CheckpointMessages;
  flashcard: FlashcardMessages;
  image: ImageMessages;
  learningLayout: LearningLayoutMessages;
  lesson: LessonMessages;
  navbarPreferences: NavbarPreferencesMessages;
  questionFrame: QuestionFrameMessages;
  video: VideoMessages;
  youtube: YoutubeMessages;
};
