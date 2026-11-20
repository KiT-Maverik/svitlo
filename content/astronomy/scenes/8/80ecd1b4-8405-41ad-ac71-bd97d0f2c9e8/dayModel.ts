export type DayView = 'both' | 'day' | 'night';
export type SkyChoice = 'light' | 'place' | null;
export interface DayState { view: DayView; choice: SkyChoice }
export type DayAction = { type: 'view'; view: DayView } | { type: 'answer'; choice: Exclude<SkyChoice, null> } | { type: 'reset' };
export const initialDayState: DayState = { view: 'both', choice: null };
export function dayReducer(state: DayState, action: DayAction): DayState {
  switch (action.type) {
    case 'view': return { ...state, view: action.view };
    case 'answer': return { ...state, choice: action.choice };
    case 'reset': return initialDayState;
  }
}
