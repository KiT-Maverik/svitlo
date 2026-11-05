import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const recognizeExplosiveOrdnanceRisk_Skill_Data = buildSkillConfig({
  slug: 'recognizeExplosiveOrdnanceRisk',
  id: '90f3442c-df86-476b-a8c0-c454206540ac',
  name: {
    en: 'Recognize explosive ordnance risk',
  },
  description: {
    methodological:
      'Treat mines, unexploded devices, fragments, and abandoned suspicious objects as potentially lethal even without obvious warning signs.',
    frontend: {
      en: 'Recognize that unknown ordnance and abandoned devices can be lethal.',
    },
  },
});
