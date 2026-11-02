import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const locateOceansOnAGlobe_Skill_Data = buildSkillConfig({
  slug: "locateOceansOnAGlobe",
  id: "b28227fa-2cb5-4246-8035-ff161c329edf",
  name: {
    en: "Locate oceans on a globe",
  },
  description: {
    methodological: "Identify the principal named ocean basins and their positions relative to landmasses using an explicit naming convention rather than mistaking seas or map boundaries for physical barriers in the connected ocean.",
    frontend: {
      en: "Find the major oceans in relation to landmasses on a globe.",
    },
  },
});
