import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const nominalAndRealOutput_Skill_Data = buildSkillConfig({
  slug: "nominalAndRealOutput",
  id: "7f5b9682-cf3b-4147-8a47-d2db01dfbdd5",
  name: {
    en: "Номінальний і реальний випуск",
  },
  description: {
    methodological: "Separate changes in prices from changes in aggregate physical output using appropriate bases and indexes in national accounts; this is a specific macroeconomic application of real quantities.",
    frontend: {
      en: "Tell whether production increased or only prices rose.",
    },
  },
});
