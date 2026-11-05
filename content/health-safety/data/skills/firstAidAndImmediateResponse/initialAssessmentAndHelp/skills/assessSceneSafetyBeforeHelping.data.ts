import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const assessSceneSafetyBeforeHelping_Skill_Data = buildSkillConfig({
  slug: 'assessSceneSafetyBeforeHelping',
  id: 'fbd55cb1-84bd-42fc-9f96-4e5769cdd9b1',
  name: {
    en: 'Assess scene safety before helping',
  },
  description: {
    methodological:
      'Identify traffic, fire, electricity, violence, contamination, or unstable surroundings before approaching an affected person.',
    frontend: {
      en: 'Check whether approaching an injured person would put you in danger.',
    },
  },
});
