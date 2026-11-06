import type { UiKit_Global } from '@svitlo/engine/content';
import { data as layout } from '../../data/locale/learningLayout';
import { data as preferences } from '../../data/locale/navbarPreferences';
import { data as lesson } from '../../data/locale/lesson';
import { data as flashcard } from '../../data/locale/flashcard';
import { data as checkpoint } from '../../data/locale/checkpoint';
import { data as audio } from '../../data/locale/audio';
import { data as image } from '../../data/locale/image';
import { data as video } from '../../data/locale/video';
import { data as youtube } from '../../data/locale/youtube';
import { data as questionFrame } from '../../data/locale/questionFrame';

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
