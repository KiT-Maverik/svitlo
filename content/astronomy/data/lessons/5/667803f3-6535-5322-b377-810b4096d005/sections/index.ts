import { moonLight } from "./moonLight";
import { noticeMoon } from "./noticeMoon";
import { practiceMoon } from "./practiceMoon";
import { reflection } from "./reflection";

export const section = {
  items: {
    noticeMoon,
    moonLight,
    practiceMoon,
    reflection
  },
  order: [
    "noticeMoon",
    "moonLight",
    "practiceMoon",
    "reflection"
  ]
};
