import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { conformity_Skill_Data, informationalSocialInfluence_Skill_Data, normativeSocialInfluence_Skill_Data, obedienceToAuthority_Skill_Data, persuasionRoutes_Skill_Data, recognizingPsychologicalManipulation_Skill_Data } from './skills';

export const influenceAndPersuasion_SkillGroup_Data = buildSkillGroupConfig({
  slug: "influenceAndPersuasion",
  id: "d25577b7-abdb-4a10-b5b1-1b82e4a55191",
  name: {
    en: "Influence and Persuasion",
  },
  skills: {
    conformity: conformity_Skill_Data,
    informationalSocialInfluence: informationalSocialInfluence_Skill_Data,
    normativeSocialInfluence: normativeSocialInfluence_Skill_Data,
    obedienceToAuthority: obedienceToAuthority_Skill_Data,
    persuasionRoutes: persuasionRoutes_Skill_Data,
    recognizingPsychologicalManipulation: recognizingPsychologicalManipulation_Skill_Data,
  },
  description: {
    methodological: "Other people's behavior, claims, and group norms can shift beliefs or actions through identifiable social mechanisms.",
    frontend: {
      en: "Discover how groups, authority and messages influence choices.",
    },
  },
});
