import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const automatedExternalDefibrillatorUse_Skill_Data = buildSkillConfig({
  slug: 'automatedExternalDefibrillatorUse',
  id: '126b740d-5ab9-4288-b0d5-2302fe1c7e5b',
  name: {
    en: 'Automated external defibrillator use',
  },
  description: {
    methodological:
      'Recognize an AED, follow its prompts, and coordinate its use with resuscitation while maintaining scene safety.',
    frontend: {
      en: "Understand how to follow an AED's instructions during resuscitation.",
    },
  },
});
