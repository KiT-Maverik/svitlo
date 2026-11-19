import { reflectAndRemember } from "./reflectAndRemember";
import { safeChoices } from "./safeChoices";
import { safeSkyChoices } from "./safeSkyChoices";
import { skyAroundUs } from "./skyAroundUs";
import { solarSafety } from "./solarSafety";

export const section = {
  items: {
    skyAroundUs,
    solarSafety,
    safeChoices,
    reflectAndRemember,
    safeSkyChoices
  },
  order: [
    "skyAroundUs",
    "solarSafety",
    "safeChoices",
    "reflectAndRemember",
    "safeSkyChoices"
  ]
};
