import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { communicateDesignLimitations_Skill_Data, evaluateEnvironmentalImpactsOfADesign_Skill_Data, evaluateSocialImpactsOfADesign_Skill_Data, identifyAffectedStakeholders_Skill_Data, justifyResponsibleDesignDecisions_Skill_Data } from './skills';

export const ethicsAndPublicEffects_SkillGroup_Data = buildSkillGroupConfig({
  slug: "ethicsAndPublicEffects",
  id: "822989c2-0371-4561-9cf3-59451ab57f4f",
  name: {
    en: "Ethics and Public Effects",
  },
  skills: {
    communicateDesignLimitations: communicateDesignLimitations_Skill_Data,
    evaluateEnvironmentalImpactsOfADesign: evaluateEnvironmentalImpactsOfADesign_Skill_Data,
    evaluateSocialImpactsOfADesign: evaluateSocialImpactsOfADesign_Skill_Data,
    identifyAffectedStakeholders: identifyAffectedStakeholders_Skill_Data,
    justifyResponsibleDesignDecisions: justifyResponsibleDesignDecisions_Skill_Data,
  },
  description: {
    methodological: "Technical solutions create benefits and burdens for users, maintainers, neighbors and communities; limitations must be disclosed.",
    frontend: {
      en: "Explore responsibility toward everyone affected by engineered products.",
    },
  },
});
