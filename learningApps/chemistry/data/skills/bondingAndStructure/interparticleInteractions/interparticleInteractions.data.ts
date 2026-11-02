import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { dipoleInteractions_Skill_Data, dispersionForces_Skill_Data, hydrogenBonding_Skill_Data, structurePropertyRelationships_Skill_Data } from './skills';

export const interparticleInteractions_SkillGroup_Data = buildSkillGroupConfig({
  slug: "interparticleInteractions",
  id: "323e4434-04cd-46a0-981e-6cabb5e0778f",
  name: {
    en: "Interparticle Interactions",
  },
  skills: {
    dipoleInteractions: dipoleInteractions_Skill_Data,
    dispersionForces: dispersionForces_Skill_Data,
    hydrogenBonding: hydrogenBonding_Skill_Data,
    structurePropertyRelationships: structurePropertyRelationships_Skill_Data,
  },
  description: {
    methodological: "Attractions between distinct particles influence phase behavior, solubility and material properties without changing covalent connectivity.",
    frontend: {
      en: "Discover how particles attract one another without forming new chemical bonds.",
    },
  },
});
