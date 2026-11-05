import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const recognizeMisleadingHealthClaims_Skill_Data = buildSkillConfig({
  slug: 'recognizeMisleadingHealthClaims',
  id: '954ac807-b5f4-4508-8c1f-706aff271e52',
  name: {
    en: 'Recognize misleading health claims',
  },
  description: {
    methodological:
      'Identify miracle-cure promises, unsupported causal claims, and advertising disguised as medical advice, including claims about supplements.',
    frontend: {
      en: 'Spot unsupported miracle cures and misleading medical advertising.',
    },
  },
});
