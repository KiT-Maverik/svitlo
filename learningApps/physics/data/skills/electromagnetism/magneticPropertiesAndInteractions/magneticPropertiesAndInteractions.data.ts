import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { classifyObjectsByMagneticInteraction_Skill_Data, explainMagneticActionWithoutContact_Skill_Data, identifyMaterialsAttractedToAMagnet_Skill_Data, predictInteractionsBetweenMagneticPoles_Skill_Data, recognizeMagneticAttraction_Skill_Data, recognizeMagneticRepulsion_Skill_Data } from './skills';

export const magneticPropertiesAndInteractions_SkillGroup_Data = buildSkillGroupConfig({
  slug: "magneticPropertiesAndInteractions",
  id: "8e0d45e9-e2cd-49ed-8798-a0fac3a7a5cb",
  name: {
    en: "Magnetic Properties and Interactions",
  },
  skills: {
    classifyObjectsByMagneticInteraction: classifyObjectsByMagneticInteraction_Skill_Data,
    explainMagneticActionWithoutContact: explainMagneticActionWithoutContact_Skill_Data,
    identifyMaterialsAttractedToAMagnet: identifyMaterialsAttractedToAMagnet_Skill_Data,
    predictInteractionsBetweenMagneticPoles: predictInteractionsBetweenMagneticPoles_Skill_Data,
    recognizeMagneticAttraction: recognizeMagneticAttraction_Skill_Data,
    recognizeMagneticRepulsion: recognizeMagneticRepulsion_Skill_Data,
  },
  description: {
    methodological: "Materials and pole orientation affect interactions; direct contact between magnets is not required.",
    frontend: {
      en: "Discover how magnetic materials and poles interact.",
    },
  },
});
