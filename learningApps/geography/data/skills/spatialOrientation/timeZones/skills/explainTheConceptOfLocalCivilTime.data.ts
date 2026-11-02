import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainTheConceptOfLocalCivilTime_Skill_Data = buildSkillConfig({
  slug: "explainTheConceptOfLocalCivilTime",
  id: "ec337379-c7e6-495b-9c54-8355bea6d35a",
  name: {
    en: "Explain the concept of local civil time",
  },
  description: {
    methodological: "Explain that the legally observed clock time in a place depends on the jurisdiction and applicable time zone, and can differ from the Sun's position. Civil local time is not the same concept as local solar time, and different places can share one civil clock time.",
    frontend: {
      en: "Distinguish the legal clock time at a location from time based on the Sun.",
    },
  },
});
