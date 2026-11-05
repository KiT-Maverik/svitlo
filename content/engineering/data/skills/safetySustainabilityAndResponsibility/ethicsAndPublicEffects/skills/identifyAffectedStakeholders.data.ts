import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyAffectedStakeholders_Skill_Data = buildSkillConfig({
  slug: 'identifyAffectedStakeholders',
  id: 'be14eebe-7ac8-4496-bfc0-67212e2d5ae4',
  name: {
    en: 'Identify affected stakeholders',
  },
  description: {
    methodological: "Distinguish users, workers, maintainers and others exposed to a product's consequences.",
    frontend: {
      en: 'Identify the groups who may benefit from or be harmed by a design.',
    },
  },
});
