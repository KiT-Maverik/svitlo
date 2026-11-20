import { compareIlluminatedPortions } from "./selectOneAnswer/compareIlluminatedPortions";
import { crescentDirectionNotShape } from "./selectOneAnswer/crescentDirectionNotShape";
import { darkPartStillExists } from "./selectOneAnswer/darkPartStillExists";
import { daylightMoon } from "./selectOneAnswer/daylightMoon";
import { lampBallViewpoint } from "./selectOneAnswer/lampBallViewpoint";
import { moonlightSource } from "./selectOneAnswer/moonlightSource";
import { repeatingAppearances } from "./selectOneAnswer/repeatingAppearances";
import { twoCorrectMoonExplanations } from "./selectMultipleAnswers/twoCorrectMoonExplanations";
import { whatChangedBetweenDays } from "./selectOneAnswer/whatChangedBetweenDays";

export const questions = {
  selectOneAnswer: {
    compareIlluminatedPortions,
    whatChangedBetweenDays,
    moonlightSource,
    lampBallViewpoint,
    daylightMoon,
    crescentDirectionNotShape,
    repeatingAppearances,
    darkPartStillExists
  },
  selectMultipleAnswers: {
    twoCorrectMoonExplanations
  }
};
