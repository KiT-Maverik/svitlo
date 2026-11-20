import { mapBodiesToCenters, mapBodiesToKinds } from "./matchBlocks";
import { diagramInterpretationLimits, whichBodiesReflectSunlight } from "./selectMultipleAnswers";
import { arrowDirectionBodies, distantStarApparentSize, marsSiriusContrast, moonAndEarthAroundSun, moonLightMisconception, naturalSatelliteOfAnotherPlanet, sunEmitsOwnLight } from "./selectOneAnswer";

export const questions = {
  matchBlocks: {
    mapBodiesToKinds,
    mapBodiesToCenters
  },
  selectOneAnswer: {
    sunEmitsOwnLight,
    distantStarApparentSize,
    arrowDirectionBodies,
    moonLightMisconception,
    marsSiriusContrast,
    naturalSatelliteOfAnotherPlanet,
    moonAndEarthAroundSun
  },
  selectMultipleAnswers: {
    whichBodiesReflectSunlight,
    diagramInterpretationLimits
  }
};
