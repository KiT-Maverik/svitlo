import { meetThreeBodies } from "./meetThreeBodies";
import { objectRolesQuiz } from "./objectRolesQuiz";
import { pathsAndRoles } from "./pathsAndRoles";
import { sunAmongStars } from "./sunAmongStars";
import { transferAndRecall } from "./transferAndRecall";

export const section = {
  items: {
    meetThreeBodies,
    sunAmongStars,
    pathsAndRoles,
    transferAndRecall,
    objectRolesQuiz
  },
  order: [
    "meetThreeBodies",
    "sunAmongStars",
    "pathsAndRoles",
    "transferAndRecall",
    "objectRolesQuiz"
  ]
};
