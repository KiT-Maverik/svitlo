import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const prepareEssentialEmergencySupplies_Skill_Data = buildSkillConfig({
  slug: 'prepareEssentialEmergencySupplies',
  id: 'ac080471-b854-4e67-b890-9dc58445fa38',
  name: {
    en: 'Prepare essential emergency supplies',
  },
  description: {
    methodological:
      'Match water, medicine, documents, lighting, and other essentials to plausible disruption and household needs.',
    frontend: {
      en: "Choose essential supplies suited to your household's emergency needs.",
    },
  },
});
