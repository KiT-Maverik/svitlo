import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { activeListening_Skill_Data, attachmentInRelationships_Skill_Data, interpersonalConflict_Skill_Data, nonverbalCommunication_Skill_Data, personalBoundaries_Skill_Data, relationshipRepair_Skill_Data, voluntaryConsent_Skill_Data } from './skills';

export const relationshipsAndCommunication_SkillGroup_Data = buildSkillGroupConfig({
  slug: "relationshipsAndCommunication",
  id: "9a36af84-9ad0-4f0b-9707-751f77649c14",
  name: {
    en: "Relationships and Communication",
  },
  skills: {
    activeListening: activeListening_Skill_Data,
    attachmentInRelationships: attachmentInRelationships_Skill_Data,
    interpersonalConflict: interpersonalConflict_Skill_Data,
    nonverbalCommunication: nonverbalCommunication_Skill_Data,
    personalBoundaries: personalBoundaries_Skill_Data,
    relationshipRepair: relationshipRepair_Skill_Data,
    voluntaryConsent: voluntaryConsent_Skill_Data,
  },
  description: {
    methodological: "Relationships develop through mutual interpretation, reciprocal actions, boundaries, and social context rather than perfect reading of another's intentions.",
    frontend: {
      en: "Learn to recognize healthy communication, boundaries and relational challenges.",
    },
  },
});
