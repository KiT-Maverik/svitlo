import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishRisingFloatingAndSinking_Skill_Data, explainArchimedesPrinciple_Skill_Data, explainBuoyantForce_Skill_Data, explainDensity_Skill_Data, predictHowALoadAffectsFloating_Skill_Data } from './skills';

export const floatingAndBuoyancy_SkillGroup_Data = buildSkillGroupConfig({
  slug: "floatingAndBuoyancy",
  id: "ec35cc92-8e33-4a04-a19a-bf1071ff8db7",
  name: {
    en: "Floating and Buoyancy",
  },
  skills: {
    distinguishRisingFloatingAndSinking: distinguishRisingFloatingAndSinking_Skill_Data,
    explainArchimedesPrinciple: explainArchimedesPrinciple_Skill_Data,
    explainBuoyantForce: explainBuoyantForce_Skill_Data,
    explainDensity: explainDensity_Skill_Data,
    predictHowALoadAffectsFloating: predictHowALoadAffectsFloating_Skill_Data,
  },
  description: {
    methodological: "A body's behavior in water is determined by gravity together with forces exerted by the liquid; material and shape may affect the outcome through average density.",
    frontend: {
      en: "Explore how density and buoyancy determine whether objects float or sink.",
    },
  },
});
