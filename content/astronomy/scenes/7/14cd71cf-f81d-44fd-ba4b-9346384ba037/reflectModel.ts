export type ReflectionTopic = 'day' | 'moon';
export type ReflectionStep = ReflectionTopic | 'review';
export type ReflectionRoute = 'ready' | 'own' | null;
export interface ReflectionState {
  step: ReflectionStep;
  acknowledged: Record<ReflectionTopic, boolean>;
  routes: Record<ReflectionTopic, ReflectionRoute>;
  feedback: 'readyDay' | 'readyMoon' | 'ownRoute' | 'confirmed' | 'skipped' | null;
}
export const initialReflectionState: ReflectionState = {
  step: 'day',
  acknowledged: { day: false, moon: false },
  routes: { day: null, moon: null },
  feedback: null,
};
export type ReflectionAction =
  | { type: 'step'; step: ReflectionStep }
  | { type: 'own'; topic: ReflectionTopic }
  | { type: 'chooseReady'; topic: ReflectionTopic }
  | { type: 'confirmOwn'; topic: ReflectionTopic }
  | { type: 'skip'; topic: ReflectionTopic }
  | { type: 'reset' };
export function reflectionReducer(state: ReflectionState, action: ReflectionAction): ReflectionState {
  switch (action.type) {
    case 'step': return { ...state, step: action.step, feedback: null };
    case 'own': return {
      ...state, routes: { ...state.routes, [action.topic]: 'own' },
      acknowledged: { ...state.acknowledged, [action.topic]: false }, feedback: 'ownRoute',
    };
    case 'chooseReady': return {
      ...state, routes: { ...state.routes, [action.topic]: 'ready' },
      acknowledged: { ...state.acknowledged, [action.topic]: true },
      feedback: action.topic === 'day' ? 'readyDay' : 'readyMoon',
    };
    case 'confirmOwn': return state.routes[action.topic] !== 'own' ? state : {
      ...state, acknowledged: { ...state.acknowledged, [action.topic]: true }, feedback: 'confirmed',
    };
    case 'skip': return {
      ...state, routes: { ...state.routes, [action.topic]: null },
      acknowledged: { ...state.acknowledged, [action.topic]: false }, feedback: 'skipped',
    };
    case 'reset': return initialReflectionState;
  }
}
