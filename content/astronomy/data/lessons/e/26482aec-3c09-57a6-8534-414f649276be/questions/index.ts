import { arrowDirectionBodies } from "./selectOneAnswer/arrowDirectionBodies";
import { diagramInterpretationLimits } from "./selectMultipleAnswers/diagramInterpretationLimits";
import { distantStarApparentSize } from "./selectOneAnswer/distantStarApparentSize";
import { mapBodiesToCenters } from "./matchBlocks/mapBodiesToCenters";
import { mapBodiesToKinds } from "./matchBlocks/mapBodiesToKinds";
import { marsSiriusContrast } from "./selectOneAnswer/marsSiriusContrast";
import { moonAndEarthAroundSun } from "./selectOneAnswer/moonAndEarthAroundSun";
import { moonLightMisconception } from "./selectOneAnswer/moonLightMisconception";
import { naturalSatelliteOfAnotherPlanet } from "./selectOneAnswer/naturalSatelliteOfAnotherPlanet";
import { sunEmitsOwnLight } from "./selectOneAnswer/sunEmitsOwnLight";
import { whichBodiesReflectSunlight } from "./selectMultipleAnswers/whichBodiesReflectSunlight";

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
