import type { SceneLocales } from './sceneText';

/** TEST ONLY: unique synthetic copy identifies which locale key was rendered.
 * These values are NEVER authored or published as educational translations. */
const day = ['prompt','first','second','skyDayDescription','skyNightDescription','dayLabel',
  'nightLabel','showDay','showNight','showBoth','whatChanged','skyFeedback',
  'lightChoice','placeChoice','lightFeedback','placeFeedback','whatSame','sameFeedback',
  'evidenceStep','evidencePrompt','evidenceDayLabel','evidenceNightLabel',
  'evidenceCompareFeedback','evidenceSourceNote','showEvidenceDetails','hideEvidenceDetails',
  'hint','again'];
const moon = ['prompt','firstLabel','secondLabel','firstDescription','secondDescription',
  'showFirst','showSecond','showBoth','firstChoice','secondChoice','correct','help',
  'shapePrompt','sameShape','lostPiece','sameShapeFeedback','lostPieceFeedback',
  'cloudFreeDescription','showCloud','hideCloud','cloudDescription','cloudPrompt',
  'cloudNotPhase','cloudIsPhase','cloudNotPhaseFeedback','cloudIsPhaseFeedback',
  'sourceNote','again'];
const reflect = ['prompt','dayTopic','moonTopic','dayObservation','moonObservation',
  'dayQuestion','moonQuestion','dayPrompt','moonPrompt','chooseDay','chooseMoon',
  'ownDayQuestion','ownMoonQuestion','ownQuestionPrompt','confirmOwnDayQuestion',
  'confirmOwnMoonQuestion','sayQuestion','writeQuestion','dayQuestionFeedback',
  'moonQuestionFeedback','ownQuestionRouteFeedback','ownQuestionFeedback',
  'bothQuestionsFeedback','topicFeedback','continueToMoon','returnToDay','reviewBoth',
  'skipQuestion','skippedFeedback','incompleteFeedback','noGrades','again'];
export function fixture(kind: 'day'|'moon'|'reflect'): SceneLocales {
  const keys = kind === 'day' ? day : kind === 'moon' ? moon : reflect;
  return Object.fromEntries(keys.map(key => [key, 'test_' + key])) as SceneLocales;
}
