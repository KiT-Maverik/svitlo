import type { UiKit_Global } from '@svitlo/engine/content';
import { data as layout } from '../../data/components/LearningLayout/messages.data';
import { data as preferences } from '../../data/components/NavbarPreferences/messages.data';
import { data as lesson } from '../../data/components/Lesson/messages.data';
import { data as flashcard } from '../../data/components/Flashcard/messages.data';
import { data as checkpoint } from '../../data/components/Checkpoint/messages.data';
import { data as audio } from '../../data/components/Audio/messages.data';
import { data as image } from '../../data/components/Image/messages.data';
import { data as video } from '../../data/components/Video/messages.data';
import { data as youtube } from '../../data/components/Youtube/messages.data';
import { data as questionFrame } from '../../data/components/QuestionFrame/messages.data';

/** Test-only fixture. This module is not emitted in the UI Kit runtime build. */
export const ukUiKitMessages: UiKit_Global<'response'> = {
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

export const enUiKitMessages: UiKit_Global<'response'> = {
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
