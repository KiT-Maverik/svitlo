export type MoonView = 'both' | 'first' | 'second';
export type MoonAnswer = 'first' | 'second' | 'same' | 'lost' | 'cloudNotPhase' | 'cloudIsPhase';
export interface MoonState {
  view: MoonView;
  litAnswer: 'first' | 'second' | null;
  shapeAnswer: 'same' | 'lost' | null;
  cloudy: boolean;
  cloudAnswer: 'cloudNotPhase' | 'cloudIsPhase' | null;
}
export const initialMoonState: MoonState = {
  view: 'both', litAnswer: null, shapeAnswer: null, cloudy: false, cloudAnswer: null,
};
export type MoonAction =
  | { type: 'view'; view: MoonView }
  | { type: 'lit'; answer: 'first' | 'second' }
  | { type: 'shape'; answer: 'same' | 'lost' }
  | { type: 'cloud'; visible: boolean }
  | { type: 'cloudAnswer'; answer: 'cloudNotPhase' | 'cloudIsPhase' }
  | { type: 'reset' };
export function moonReducer(state: MoonState, action: MoonAction): MoonState {
  switch (action.type) {
    case 'view': return { ...state, view: action.view };
    case 'lit': return { ...state, litAnswer: action.answer };
    case 'shape': return { ...state, shapeAnswer: action.answer };
    case 'cloud': return { ...state, cloudy: action.visible, cloudAnswer: null };
    case 'cloudAnswer': return { ...state, cloudAnswer: action.answer };
    case 'reset': return initialMoonState;
  }
}
