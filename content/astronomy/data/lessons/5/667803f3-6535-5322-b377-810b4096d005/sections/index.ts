import { moonLight } from "./moonLight";
import { noticeMoon } from "./noticeMoon";
import { practiceMoon } from "./practiceMoon";
import { reflection } from "./reflection";
import { sunlitMoonAppearanceQuiz } from "./sunlitMoonAppearanceQuiz";

export const section = {
  items: {
    noticeMoon,
    moonLight,
    practiceMoon,
    reflection,
    sunlitMoonAppearanceQuiz
  },
  order: [
    "noticeMoon",
    "moonLight",
    "practiceMoon",
    "reflection",
    "sunlitMoonAppearanceQuiz"
  ]
};
