import type { ContentEntity_ConfigType } from '../content/entity.types';
import type { Locale } from '../languages';

/** UI Kit translation resources mirror authored content's definition/data/response states. */
export type UiKit_ComponentMessages = {
  lesson: {
    steps: { navigation: string };
    celebration: {
      title: string;
      description: string;
      correctAnswers: string;
      /** Serialized template with {score} and {total} placeholders. */
      scoreTemplate: string;
      note: string;
      home: string;
    };
    questionProgress: {
      navigation: string;
      status: { correct: string; incorrect: string; unanswered: string; deferred: string };
    };
  };
  learningLayout: {
    brand: string;
    preparingLesson: string;
    navigation: { top: string; bottom: string; topics: string; settings: string };
    actions: {
      openTopics: string;
      closeTopics: string;
      openSettings: string;
      closeSettings: string;
      closeSidebar: string;
      closeSettingsPanel: string;
      previous: string;
      next: string;
      skip: string;
      profile: string;
      logout: string;
    };
    tooltips: { profile: string; logout: string };
    topicsTitle: string;
    settingsTitle: string;
    settingsDescription: string;
  };
  navbarPreferences: { language: string; theme: { dark: string; light: string } };
  flashcard: {
    flashcard: {
      region: string;
      actions: { menu: string; reveal: string; forgot: string; remembered: string; addLabel: string };
    };
  };
  checkpoint: { title: string; check: string; checked: string };
  audio: { offline: string; unavailable: string; playbackError: string; retry: string };
  image: { offline: string; unavailable: string; retry: string };
  video: { offline: string; unavailable: string; playbackError: string; retry: string };
  youtube: { loading: string; offline: string; unavailable: string; retry: string };
  questionFrame: {
    check: string;
    retry: string;
    hint: string;
    explanation: string;
    correct: string;
    incorrect: string;
    answerLabel: string;
    matchInstructions: string;
    left: string;
    right: string;
    availableBlocks: string;
    blanks: string;
    moveItem: string;
    removeItem: string;
    correctChoice: string;
    incorrectChoice: string;
    missedChoice: string;
  };
};
export type UiKit_ComponentName = keyof UiKit_ComponentMessages;

/** A typed resource for one UI Kit component, in all three content states. */
export type UiKit_Component<
  Name extends UiKit_ComponentName,
  ConfigType extends ContentEntity_ConfigType,
  SupportedLocales extends string = Locale,
> = {
  definition: { type: 'ui-kit-component'; component: Name; scope: 'global' };
  data: Readonly<Record<SupportedLocales, UiKit_ComponentMessages[Name]>>;
  response: UiKit_ComponentMessages[Name];
}[ConfigType];

/** One selected-language resource for all global UI Kit components. */
export type UiKit_Global<ConfigType extends ContentEntity_ConfigType, SupportedLocales extends string = Locale> = {
  definition: { type: 'ui-kit'; scope: 'global'; components: readonly UiKit_ComponentName[] };
  data: Readonly<Record<SupportedLocales, UiKit_ComponentMessages>>;
  response: UiKit_ComponentMessages;
}[ConfigType];
