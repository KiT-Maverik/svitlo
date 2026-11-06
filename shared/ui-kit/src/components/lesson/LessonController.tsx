'use client';

import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import Container from '@mui/material/Container';
import { ContentBlockRenderer } from '../widgets/ContentBlockRenderer';
import { QuestionRenderer } from '../widgets/questions';
import type {
  LearningLayoutTopBarProps,
  LearningLayoutBottomBarProps,
  LearningLayoutProgress,
} from '../layout/LearningLayout/LearningLayout';
import { LearningLayoutTopBar, LearningLayoutBottomBar } from '../layout/LearningLayout/LearningLayout';
import { LessonNavigationContext, type LessonNavigationAction } from './LessonNavigation';
import { LessonOperationsContext } from './LessonOperationsContext';
import { LessonSteps } from './LessonSteps';
import type { LessonProps, LessonView } from './Lesson';
import { DEFAULT_LESSON_EVENTS } from '@svitlo/engine/content';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import { EventSceneHost, LessonEventBusContext, createLessonEventBus, resolveLessonEventScenes } from './LessonEvents';
import styles from './Lesson.module.css';

type SectionParams = LessonView['parameters']['sections'];
const EMPTY_EDITABLE: readonly EditableSectionParam[] = [];
export type EditableSectionParam = keyof SectionParams;
type TopBarState = { title: string };
type StepperState = { visible: boolean };
type SectionState = { step: number; testDone: boolean; completedCheckpoints: Readonly<Record<string, true>> };
type BottomBarState = { nextDisabled: boolean; backDisabled: boolean; skipDisabled: boolean };
type Runtime = {
  params: LessonView['parameters'];
  topBar: TopBarState;
  stepper: StepperState;
  section: SectionState;
  bottomBar: BottomBarState;
  /** Ephemeral, per-renderer Next gates. Values identify the section where each gate was registered. */
  nextBlockers: Readonly<Record<string, number>>;
};
type Command =
  | { type: 'params'; patch: Partial<SectionParams> }
  | { type: 'topBar'; patch: Partial<TopBarState> }
  | { type: 'stepper'; patch: Partial<StepperState> }
  | { type: 'bottomBar'; patch: Partial<BottomBarState> }
  | { type: 'blockNext'; owner: string; step: number }
  | { type: 'unblockNext'; owner: string; step: number }
  | { type: 'next' | 'back' | 'skip' | 'testDone' }
  | { type: 'visit'; step: number }
  | { type: 'restore'; step: number; testDone: boolean }
  | { type: 'checkpoint'; sectionId: string; checkpointId: string };

export type LessonActions<CustomEvents extends string = never> = {
  updateSectionParams: (patch: Partial<SectionParams>) => void;
  updateTopBar: (patch: Partial<TopBarState>) => void;
  updateStepper: (patch: Partial<StepperState>) => void;
  updateBottomBar: (patch: Partial<BottomBarState>) => void;
  /** Block Next for the current section; dispose on completion or component unmount. */
  blockNext: (owner: string) => () => void;
  next: () => void;
  back: () => void;
  skip: () => void;
  goToSection: (step: number) => void;
  completeQuiz: () => void;
  /** A scored assessment may report failure. The generic QuestionRenderer only reports completion. */
  failQuiz: () => void;
  /** Only author-declared custom events may be emitted by scenes; lifecycle events are controller-owned. */
  publishEvent: (eventId: CustomEvents) => void;
  completeCheckpoint: (sectionId: string, checkpointId: string) => void;
  /** Event-time snapshot readers; these are NOT reactive subscriptions. */
  getParams: () => LessonView['parameters'];
  getTopBar: () => TopBarState;
  getSection: () => SectionState;
  getBottomBar: () => BottomBarState;
};

const ParamsContext = createContext<{
  values: LessonView['parameters'];
  editable: readonly EditableSectionParam[];
} | null>(null);
const TopBarContext = createContext<TopBarState | null>(null);
const StepperContext = createContext<{
  visible: boolean;
  currentStep: number;
  completedStep?: number;
  canNavigateTo: (step: number) => boolean;
  parameters: SectionParams;
} | null>(null);
const SectionContext = createContext<{
  id: string;
  step: number;
  completedCheckpoints: Readonly<Record<string, true>>;
} | null>(null);
const BottomBarContext = createContext<{ nextDisabled: boolean; backDisabled: boolean; skipDisabled: boolean } | null>(
  null,
);

function requiredCheckpointIds(section: LessonView['sections'][number]): string[] {
  return section.content
    .filter(
      block =>
        block.type === 'checkpoint' &&
        block.requireCompletion &&
        block.items.some(item => item.check ?? block.enableChecks ?? false),
    )
    .map(block => block.id);
}

function hasNextBlocker(state: Runtime, step: number): boolean {
  return Object.values(state.nextBlockers).some(registeredStep => registeredStep === step);
}

function canLeaveSection(state: Runtime, response: LessonView, index: number): boolean {
  const section = response.sections[index];
  if (!section) return false;
  if (section.type === 'quiz' && !state.section.testDone) return false;
  return requiredCheckpointIds(section).every(id => state.section.completedCheckpoints[section.id + '/' + id]);
}

function canMoveTo(state: Runtime, response: LessonView, target: number, direct: boolean): boolean {
  const from = state.section.step;
  if (!Number.isInteger(target) || target < 0 || target >= response.sections.length) return false;
  if (target === from) return true;
  if (direct && !state.params.sections.allowNavigation) return false;
  if (target < from) return true;
  if (state.bottomBar.nextDisabled || hasNextBlocker(state, from)) return false;
  for (let step = from; step < target; step++) {
    if (!canLeaveSection(state, response, step)) return false;
  }
  return true;
}

function reduce(
  state: Runtime,
  action: Command,
  response: LessonView,
  editable: readonly EditableSectionParam[],
): Runtime {
  switch (action.type) {
    case 'params': {
      const changes = Object.fromEntries(
        (Object.keys(action.patch) as EditableSectionParam[])
          .filter(key => editable.includes(key) && typeof action.patch[key] === 'boolean')
          .map(key => [key, action.patch[key]]),
      ) as Partial<SectionParams>;
      if (!Object.keys(changes).length) return state;
      return { ...state, params: { ...state.params, sections: { ...state.params.sections, ...changes } } };
    }
    case 'topBar':
      return { ...state, topBar: { ...state.topBar, ...action.patch } };
    case 'stepper':
      return { ...state, stepper: { ...state.stepper, ...action.patch } };
    case 'bottomBar':
      return { ...state, bottomBar: { ...state.bottomBar, ...action.patch } };
    case 'blockNext':
      return state.nextBlockers[action.owner] === action.step
        ? state
        : { ...state, nextBlockers: { ...state.nextBlockers, [action.owner]: action.step } };
    case 'unblockNext': {
      if (state.nextBlockers[action.owner] !== action.step) return state;
      const remaining = { ...state.nextBlockers };
      delete remaining[action.owner];
      return { ...state, nextBlockers: remaining };
    }
    case 'testDone':
      return state.section.testDone ? state : { ...state, section: { ...state.section, testDone: true } };
    case 'checkpoint': {
      if (
        !response.sections.some(
          section => section.id === action.sectionId && requiredCheckpointIds(section).includes(action.checkpointId),
        )
      )
        return state;
      const id = action.sectionId + '/' + action.checkpointId;
      if (state.section.completedCheckpoints[id]) return state;
      return {
        ...state,
        section: {
          ...state.section,
          completedCheckpoints: { ...state.section.completedCheckpoints, [id]: true as const },
        },
      };
    }
    case 'restore': {
      const restored = { ...state, section: { ...state.section, testDone: action.testDone } };
      // Restore may bypass the user-facing stepper setting, but never a required gate.
      if (!canMoveTo(restored, response, action.step, false)) return restored;
      return { ...restored, section: { ...restored.section, step: action.step } };
    }
    case 'visit':
    case 'next':
    case 'back':
    case 'skip': {
      const current = state.section.step;
      const target = action.type === 'visit' ? action.step : action.type === 'back' ? current - 1 : current + 1;
      if (
        action.type === 'skip' &&
        (!state.params.sections.allowSkipping ||
          !response.sections[current]?.skippable ||
          response.sections[current]?.type === 'quiz' ||
          state.bottomBar.skipDisabled)
      )
        return state;
      if (action.type === 'back' && state.bottomBar.backDisabled) return state;
      // Skip explicitly bypasses a required Checkpoint, while still respecting skip permissions.
      if (action.type === 'skip') {
        if (target >= response.sections.length) return state;
        return { ...state, section: { ...state.section, step: target } };
      }
      if (!canMoveTo(state, response, target, action.type === 'visit')) return state;
      return target === current ? state : { ...state, section: { ...state.section, step: target } };
    }
  }
}

function useRequiredContext<T>(value: T | null, name: string): T {
  if (!value) throw new Error(name + ' must be used inside LessonController');
  return value;
}
export function useLessonActions<CustomEvents extends string = never>(): LessonActions<CustomEvents> {
  return useRequiredContext(useContext(LessonOperationsContext), 'LessonActionsContext') as LessonActions<CustomEvents>;
}
export function useLessonParams() {
  return useRequiredContext(useContext(ParamsContext), 'LessonParamsContext');
}
export function useLessonTopBar() {
  return useRequiredContext(useContext(TopBarContext), 'TopBarContext');
}
export function useLessonStepper() {
  return useRequiredContext(useContext(StepperContext), 'StepperContext');
}
export function useLessonSection() {
  return useRequiredContext(useContext(SectionContext), 'SectionContext');
}
export function useLessonBottomBar() {
  return useRequiredContext(useContext(BottomBarContext), 'BottomBarContext');
}

const MemoTopBar = memo(function LessonTopBar(props: LearningLayoutTopBarProps) {
  const { title } = useLessonTopBar();
  return <LearningLayoutTopBar {...props} lessonTitle={title} />;
});

const MemoBottomBar = memo(function LessonBottomBar(props: LearningLayoutBottomBarProps) {
  const state = useLessonBottomBar();
  return <LearningLayoutBottomBar {...props} {...state} />;
});

const MemoStepper = memo(function LessonStepper({ response, messages }: Pick<LessonProps, 'response' | 'messages'>) {
  const state = useLessonStepper();
  const actions = useLessonActions();
  if (!state.visible) return null;
  return (
    <LessonSteps
      navigationLabel={messages.lesson.steps.navigation}
      steps={response.sections.map(item => ({ id: item.id, title: item.navigationLabel }))}
      currentStep={state.currentStep}
      completedStep={state.completedStep}
      showStepNumbers={state.parameters.showIndexes}
      allowNavigation={state.parameters.allowNavigation}
      canNavigateTo={state.canNavigateTo}
      onNavigate={actions.goToSection}
    />
  );
});

const MemoSection = memo(function LessonSection({
  response,
  messages,
  sceneRegistry,
}: Pick<LessonProps, 'response' | 'messages' | 'sceneRegistry'>) {
  const { step, completedCheckpoints } = useLessonSection();
  const actions = useLessonActions();
  const section = response.sections[step];
  const completeCheckpoint = useCallback(
    (checkpointId: string) => {
      if (section) actions.completeCheckpoint(section.id, checkpointId);
    },
    [actions, section?.id],
  );
  const isCheckpointCompleted = useCallback(
    (checkpointId: string) => !!completedCheckpoints[(section?.id ?? '') + '/' + checkpointId],
    [completedCheckpoints, section?.id],
  );
  if (!section) return null;
  const blocks = section.content.filter(
    (block): block is Exclude<typeof block, { type: 'quiz' }> => block.type !== 'quiz',
  );
  return (
    <div className={styles.stage}>
      <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
        {section.type === 'quiz' ? (
          <QuestionRenderer
            key={section.id}
            questions={section.questions}
            language={response.locale.code}
            sceneRegistry={sceneRegistry}
            messages={messages}
            onComplete={actions.completeQuiz}
          />
        ) : (
          <ContentBlockRenderer
            key={section.id}
            blocks={blocks}
            language={response.locale.code}
            sceneRegistry={sceneRegistry}
            messages={messages}
            onCheckpointComplete={completeCheckpoint}
            isCheckpointCompleted={isCheckpointCompleted}
          />
        )}
      </Container>
    </div>
  );
});

export function LessonController({
  response,
  href,
  messages,
  layout: Layout,
  sceneRegistry,
  contentLoading,
  editableSectionParams = EMPTY_EDITABLE,
  contentError,
  onRetryContent,
  eventOverrides,
}: LessonProps) {
  const [state, dispatch] = useReducer(
    (current: Runtime, action: Command) =>
      (contentLoading || contentError) && ['next', 'back', 'skip', 'visit'].includes(action.type)
        ? current
        : reduce(current, action, response, editableSectionParams),
    response,
    value => ({
      params: value.parameters,
      topBar: { title: value.title },
      stepper: { visible: true },
      section: { step: 0, testDone: false, completedCheckpoints: {} },
      bottomBar: { nextDisabled: false, backDisabled: false, skipDisabled: false },
      nextBlockers: {},
    }),
  );
  const [eventBus] = useState(createLessonEventBus);
  const availableEvents = useMemo(
    () => new Set<string>([...DEFAULT_LESSON_EVENTS, ...Object.keys(response.events ?? {})]),
    [response.events],
  );
  const availableEventsRef = useRef(availableEvents);
  const quizEmitted = useRef(false);
  const lessonStarted = useRef(false);
  const lessonFinished = useRef(false);
  const latest = useRef(state);
  useLayoutEffect(() => {
    latest.current = state;
    availableEventsRef.current = availableEvents;
  }, [state, availableEvents]);

  const emit = useCallback(
    (eventId: string) => {
      if (!availableEventsRef.current.has(eventId)) {
        throw new Error('Unsupported lesson event: ' + eventId);
      }
      eventBus.publish(eventId);
    },
    [eventBus],
  );

  const finishQuiz = useCallback(
    (passed: boolean) => {
      if (quizEmitted.current) return;
      quizEmitted.current = true;
      dispatch({ type: 'testDone' });
      emit('quizCompleted');
      if (!passed) emit('quizFailed');
    },
    [emit],
  );

  const effectiveEvents = useMemo(
    () => resolveLessonEventScenes(response.events, eventOverrides),
    [response.events, eventOverrides],
  );
  const eventReady = !contentLoading && !contentError;
  useEffect(() => {
    if (eventReady && !lessonStarted.current) {
      lessonStarted.current = true;
      emit('lessonStarted');
    }
  }, [eventReady, emit]);
  useEffect(() => {
    if (!eventReady || lessonFinished.current || !response.sections.length) return;
    const finalStep = response.sections.length - 1;
    if (
      state.section.step !== finalStep ||
      (response.sections.some(item => item.type === 'quiz') && !state.section.testDone) ||
      !canLeaveSection(state, response, finalStep)
    )
      return;
    lessonFinished.current = true;
    emit('lessonCompleted');
  }, [eventReady, response, state, emit]);

  const actions = useMemo<LessonActions>(
    () => ({
      updateSectionParams: patch => dispatch({ type: 'params', patch }),
      updateTopBar: patch => dispatch({ type: 'topBar', patch }),
      updateStepper: patch => dispatch({ type: 'stepper', patch }),
      updateBottomBar: patch => dispatch({ type: 'bottomBar', patch }),
      blockNext: owner => {
        const step = latest.current.section.step;
        dispatch({ type: 'blockNext', owner, step });
        return () => dispatch({ type: 'unblockNext', owner, step });
      },
      next: () => dispatch({ type: 'next' }),
      back: () => dispatch({ type: 'back' }),
      skip: () => dispatch({ type: 'skip' }),
      goToSection: step => dispatch({ type: 'visit', step }),
      completeQuiz: () => finishQuiz(true),
      failQuiz: () => finishQuiz(false),
      publishEvent: eventId => {
        if (DEFAULT_LESSON_EVENTS.some(builtin => builtin === eventId)) {
          throw new Error('Built-in lesson events can only be emitted by the controller');
        }
        emit(eventId);
      },
      completeCheckpoint: (sectionId, checkpointId) => dispatch({ type: 'checkpoint', sectionId, checkpointId }),
      getParams: () => latest.current.params,
      getTopBar: () => latest.current.topBar,
      getSection: () => latest.current.section,
      getBottomBar: () => latest.current.bottomBar,
    }),
    [emit, finishQuiz],
  );

  const progress = useMemo<LearningLayoutProgress>(
    () => ({
      ready: true,
      step: state.section.step,
      lastStep: response.sections.length - 1,
      testDone: state.section.testDone,
    }),
    [state.section.step, state.section.testDone, response.sections.length],
  );
  const legacyDispatch = useCallback((action: LessonNavigationAction) => {
    if (action.type === 'visit') dispatch({ type: 'visit', step: action.step });
    else if (action.type === 'restore') dispatch({ type: 'restore', step: action.step, testDone: action.testDone });
    else dispatch({ type: action.type });
  }, []);
  const legacyNavigation = useMemo(() => ({ progress, dispatch: legacyDispatch }), [progress, legacyDispatch]);

  const paramsValue = useMemo(
    () => ({
      values: state.params,
      editable: editableSectionParams,
    }),
    [state.params, editableSectionParams],
  );

  const renderTopBar = useCallback(
    (props: LearningLayoutTopBarProps) => (
      <TopBarContext.Provider value={state.topBar}>
        <MemoTopBar {...props} />
      </TopBarContext.Provider>
    ),
    [state.topBar],
  );
  const bottomValue = useMemo(() => {
    const current = response.sections[state.section.step];
    const nextDisabled =
      state.bottomBar.nextDisabled ||
      hasNextBlocker(state, state.section.step) ||
      state.section.step >= response.sections.length - 1 ||
      !canLeaveSection(state, response, state.section.step);
    const skipDisabled =
      state.bottomBar.skipDisabled ||
      !state.params.sections.allowSkipping ||
      !current?.skippable ||
      current?.type === 'quiz' ||
      state.section.step >= response.sections.length - 1;
    return { nextDisabled, skipDisabled, backDisabled: state.bottomBar.backDisabled };
  }, [state.bottomBar, state.nextBlockers, state.section, state.params.sections.allowSkipping, response]);
  const renderBottomBar = useCallback(
    (props: LearningLayoutBottomBarProps) => (
      <BottomBarContext.Provider value={bottomValue}>
        <MemoBottomBar {...props} />
      </BottomBarContext.Provider>
    ),
    [bottomValue],
  );

  const stepper = useMemo(
    () => ({
      visible: state.stepper.visible,
      currentStep: state.section.step,
      completedStep: state.section.testDone ? response.sections.length - 1 : undefined,
      parameters: state.params.sections,
      canNavigateTo: (step: number) => canMoveTo(state, response, step, true),
    }),
    [state.stepper, state.section, state.params, state.bottomBar, state.nextBlockers, response],
  );
  const section = useMemo(
    () => ({
      step: state.section.step,
      id: response.sections[state.section.step]?.id ?? '',
      completedCheckpoints: state.section.completedCheckpoints,
    }),
    [state.section.step, state.section.completedCheckpoints, response.sections],
  );

  const navActions = useMemo(() => ({ back: actions.back, next: actions.next, skip: actions.skip }), [actions]);
  const renderEventHost = useCallback(
    () => <EventSceneHost bus={eventBus} events={effectiveEvents} sceneRegistry={sceneRegistry} enabled={eventReady} />,
    [eventBus, effectiveEvents, sceneRegistry, eventReady],
  );
  const contentLanguage = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.language === response.locale.code);
  const quizIndex = response.sections.findIndex(item => item.type === 'quiz');
  const topics = useMemo(() => [{ id: response.id, title: response.title, href }], [response.id, response.title, href]);
  const skippableSteps = useMemo(
    () =>
      response.sections.map(
        (item, index) => index !== quizIndex && state.params.sections.allowSkipping && !!item.skippable,
      ),
    [response.sections, quizIndex, state.params.sections.allowSkipping],
  );
  return (
    <LessonOperationsContext.Provider value={actions}>
      <LessonEventBusContext.Provider value={eventBus}>
        <ParamsContext.Provider value={paramsValue}>
          <LessonNavigationContext.Provider value={legacyNavigation}>
            <Layout
              contentLoading={contentLoading}
              contentError={contentError}
              onRetryContent={onRetryContent}
              messages={messages}
              topics={topics}
              pathname={href}
              skippableSteps={skippableSteps}
              quizStep={quizIndex < 0 ? undefined : quizIndex}
              progress={progress}
              actions={navActions}
              renderTopBar={renderTopBar}
              renderBottomBar={renderBottomBar}
              renderEventHost={renderEventHost}
            >
              <div className={styles.lesson} lang={contentLanguage?.locale} dir={contentLanguage?.direction}>
                {!contentLoading && !contentError && (
                  <>
                    <StepperContext.Provider value={stepper}>
                      <MemoStepper response={response} messages={messages} />
                    </StepperContext.Provider>
                    <SectionContext.Provider value={section}>
                      <MemoSection response={response} messages={messages} sceneRegistry={sceneRegistry} />
                    </SectionContext.Provider>
                  </>
                )}
              </div>
            </Layout>
          </LessonNavigationContext.Provider>
        </ParamsContext.Provider>
      </LessonEventBusContext.Provider>
    </LessonOperationsContext.Provider>
  );
}
