import { reflectAndRemember } from "./reflectAndRemember";
import { safeChoices } from "./safeChoices";
import { skyAroundUs } from "./skyAroundUs";
import { solarSafety } from "./solarSafety";

export const section = {
  items: {
    skyAroundUs,
    solarSafety,
    safeChoices,
    reflectAndRemember
  },
  order: [
    "skyAroundUs",
    "solarSafety",
    "safeChoices",
    "reflectAndRemember"
  ]
};
