import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const createARobotMovementSequence_Skill_Data = buildSkillConfig({
  slug: "createARobotMovementSequence",
  id: "468dfb56-ac58-4d9a-818b-adf644de4c53",
  name: {
    en: "Create a Robot Movement Sequence",
  },
  description: {
    methodological: "Plan the ordered movement, orientation, and stopping commands that take a robot from its initial to its target state, accounting for direction. This is a motion-control problem, not simply a sequence of abstract words.",
    frontend: {
      en: "Plan the ordered commands that move a robot to its destination.",
    },
  },
});
