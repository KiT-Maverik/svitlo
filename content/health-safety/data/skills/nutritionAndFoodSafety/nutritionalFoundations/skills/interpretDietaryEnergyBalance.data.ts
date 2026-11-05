import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const interpretDietaryEnergyBalance_Skill_Data = buildSkillConfig({
  slug: 'interpretDietaryEnergyBalance',
  id: 'bfa53a47-652a-4922-958e-7e60837379b4',
  name: {
    en: 'Interpret dietary energy balance',
  },
  description: {
    methodological:
      "Relate energy intake to expenditure and changing individual needs while distinguishing energy balance from dietary quality and avoiding unsupported conclusions about a person's health from body size.",
    frontend: {
      en: 'Distinguish energy intake and expenditure from overall diet quality.',
    },
  },
});
