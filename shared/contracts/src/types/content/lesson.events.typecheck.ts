import { defineLessonData, type Lesson, type LessonEventOverrides, type LessonEvents, type SupportedLessonEvents } from '../../content';

type Languages = readonly ['en'];
type Custom = 'lightDiscovered' | 'lionAppeared';
type Scene = LessonEvents<Languages, Custom>['lightDiscovered'];
declare const scene: Scene;

const authored: LessonEvents<Languages, Custom> = {
  lessonCompleted: false,
  lightDiscovered: scene,
  lionAppeared: scene,
};
void authored;

// @ts-expect-error Both declared custom reactions are required.
const missingCustom: LessonEvents<Languages, Custom> = { lightDiscovered: scene };
void missingCustom;

// @ts-expect-error Custom events cannot use false in authored Lesson Data.
const disabledCustom: LessonEvents<Languages, 'lightDiscovered'> = { lightDiscovered: false };
void disabledCustom;

const programOverrides = {
  lessonCompleted: false,
  lightDiscovered: false,
  lionAppeared: { type: 'scene', id: 'other', locales: {}, rendererKey: 'other' },
} satisfies LessonEventOverrides<Custom, Languages>;
void programOverrides;

const invalidProgramOverrides = {
  // @ts-expect-error Programs cannot invent unsupported events.
  anotherEvent: false,
} satisfies LessonEventOverrides<Custom, Languages>;
void invalidProgramOverrides;

declare const allowed: SupportedLessonEvents<Custom>;
void allowed;

// @ts-expect-error Custom event names must be explicitly declared.
const unknown: SupportedLessonEvents<Custom> = 'randomEvent';
void unknown;

type DefaultLesson = Lesson<'data', Languages>;
declare const defaultLesson: DefaultLesson;
void defaultLesson;

declare const baseLesson: Omit<Lesson<'data', Languages>, 'events' | 'questions'>;
const defaultAuthoring = defineLessonData<Languages>()({
  ...baseLesson, questions: {}, events: { lessonCompleted: false },
});
void defaultAuthoring;
const customAuthoring = defineLessonData<Languages, 'lightDiscovered'>()({
  ...baseLesson, questions: {}, events: { lightDiscovered: scene },
});
void customAuthoring;

// @ts-expect-error Undeclared event IDs are not permitted by the authoring helper.
defineLessonData<Languages>()({
  ...baseLesson, questions: {}, events: { lessonCompleted: false, lightDiscovered: scene },
});

// @ts-expect-error An explicitly declared custom event must be configured.
defineLessonData<Languages, 'lightDiscovered'>()({
  ...baseLesson, questions: {}, events: { lessonCompleted: false },
});
