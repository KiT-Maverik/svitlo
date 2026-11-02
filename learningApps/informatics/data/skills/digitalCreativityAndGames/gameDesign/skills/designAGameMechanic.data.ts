import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const designAGameMechanic_Skill_Data = buildSkillConfig({
  slug: "designAGameMechanic",
  id: "d547e4c6-7fee-4c61-b649-3449d56a3bf6",
  name: {
    en: "Design a Game Mechanic",
  },
  description: {
    methodological: "Define the relationship between a player's action, a change in game state, and feedback: pressing a control initiates movement; collision with an object changes the score. A mechanic makes a rule operative, not just a written description.",
    frontend: {
      en: "Connect a player's action to changes in game state and feedback.",
    },
  },
});
