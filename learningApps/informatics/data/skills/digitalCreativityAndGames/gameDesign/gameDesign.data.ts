import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { designAGameMechanic_Skill_Data, formulateAGameRule_Skill_Data, testTheBalanceOfASimpleGame_Skill_Data } from './skills';

export const gameDesign_SkillGroup_Data = buildSkillGroupConfig({
  slug: "gameDesign",
  id: "2d72fb63-9d5e-495b-8db5-530419a07175",
  name: {
    en: "Game Design",
  },
  skills: {
    designAGameMechanic: designAGameMechanic_Skill_Data,
    formulateAGameRule: formulateAGameRule_Skill_Data,
    testTheBalanceOfASimpleGame: testTheBalanceOfASimpleGame_Skill_Data,
  },
  description: {
    methodological: "Define game rules, create mechanics, and evaluate their effects on gameplay. Describing a rule, implementing it as interaction, and testing balance are related but independently assessable.",
    frontend: {
      en: "Explore how rules and player actions shape the experience of a game.",
    },
  },
});
