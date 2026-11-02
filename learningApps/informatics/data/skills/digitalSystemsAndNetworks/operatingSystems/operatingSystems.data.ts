import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishOperatingSystemFamilies_Skill_Data, explainAnOperatingSystemsPurpose_Skill_Data, explainAnOSProcess_Skill_Data, explainLinusTorvaldsRoleInLinux_Skill_Data } from './skills';

export const operatingSystems_SkillGroup_Data = buildSkillGroupConfig({
  slug: "operatingSystems",
  id: "4c74a30d-a22a-4e9c-b5cd-01edc0e0d623",
  name: {
    en: "Operating Systems",
  },
  skills: {
    distinguishOperatingSystemFamilies: distinguishOperatingSystemFamilies_Skill_Data,
    explainAnOperatingSystemsPurpose: explainAnOperatingSystemsPurpose_Skill_Data,
    explainAnOSProcess: explainAnOSProcess_Skill_Data,
    explainLinusTorvaldsRoleInLinux: explainLinusTorvaldsRoleInLinux_Skill_Data,
  },
  description: {
    methodological: "An operating system manages programs, processes, files, and devices; it differs from applications running in its environment.",
    frontend: {
      en: "Explore how operating systems manage programs, files and devices.",
    },
  },
});
