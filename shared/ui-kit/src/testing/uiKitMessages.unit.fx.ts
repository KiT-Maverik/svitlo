import type { UiKitMessages } from '#types/uiKitMessages';

import {
  audio,
  checkpoint,
  flashcard,
  image,
  learningLayout as layout,
  lesson,
  navbarPreferences as preferences,
  questionFrame,
  video,
  youtube,
} from '../../data/locale';

/** Test-only fixture. This module is not emitted in the UI Kit runtime build. */
export const ukUiKitMessages: UiKitMessages = {
  lesson: lesson.uk,
  learningLayout: layout.uk,
  navbarPreferences: preferences.uk,
  flashcard: flashcard.uk,
  checkpoint: checkpoint.uk,
  audio: audio.uk,
  image: image.uk,
  video: video.uk,
  youtube: youtube.uk,
  questionFrame: questionFrame.uk,
};

export const enUiKitMessages: UiKitMessages = {
  ...ukUiKitMessages,
  lesson: lesson.en,
  learningLayout: layout.en,
  navbarPreferences: preferences.en,
  flashcard: flashcard.en,
  checkpoint: checkpoint.en,
  audio: audio.en,
  image: image.en,
  video: video.en,
  youtube: youtube.en,
  questionFrame: questionFrame.en,
};
