import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { egyptianBurialPractices_Skill_Data, egyptianConstruction_Skill_Data, egyptianForeignRelations_Skill_Data, egyptianIntermediatePeriods_Skill_Data, egyptianReligiousBeliefs_Skill_Data, egyptianWriting_Skill_Data, middleKingdomOfEgypt_Skill_Data, newKingdomOfEgypt_Skill_Data, nileAndEgyptianEconomy_Skill_Data, oldKingdomOfEgypt_Skill_Data, pharaonicRule_Skill_Data, unificationOfEgypt_Skill_Data } from './skills';

export const ancientEgypt_SkillGroup_Data = buildSkillGroupConfig({
  slug: "ancientEgypt",
  id: "49358541-07a4-465a-a44f-2efd1da01604",
  name: {
    en: "Єгипет",
  },
  skills: {
    egyptianBurialPractices: egyptianBurialPractices_Skill_Data,
    egyptianConstruction: egyptianConstruction_Skill_Data,
    egyptianForeignRelations: egyptianForeignRelations_Skill_Data,
    egyptianIntermediatePeriods: egyptianIntermediatePeriods_Skill_Data,
    egyptianReligiousBeliefs: egyptianReligiousBeliefs_Skill_Data,
    egyptianWriting: egyptianWriting_Skill_Data,
    middleKingdomOfEgypt: middleKingdomOfEgypt_Skill_Data,
    newKingdomOfEgypt: newKingdomOfEgypt_Skill_Data,
    nileAndEgyptianEconomy: nileAndEgyptianEconomy_Skill_Data,
    oldKingdomOfEgypt: oldKingdomOfEgypt_Skill_Data,
    pharaonicRule: pharaonicRule_Skill_Data,
    unificationOfEgypt: unificationOfEgypt_Skill_Data,
  },
  description: {
    methodological: "The Nile state combined long-standing kingship, water management, written culture, and contact with neighbors.",
    frontend: {
      en: "Discover how the Nile supported ancient Egyptian society and government.",
    },
  },
});
