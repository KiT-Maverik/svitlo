import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareDigitalFileSizes_Skill_Data, distinguishDigitalFormats_Skill_Data, explainBinaryRepresentation_Skill_Data, organizeFilesInDirectories_Skill_Data } from './skills';

export const representationAndStorage_SkillGroup_Data = buildSkillGroupConfig({
  slug: "representationAndStorage",
  id: "aae1c37d-fa00-4732-a514-19962fe184d3",
  name: {
    en: "Representation and Storage",
  },
  skills: {
    compareDigitalFileSizes: compareDigitalFileSizes_Skill_Data,
    distinguishDigitalFormats: distinguishDigitalFormats_Skill_Data,
    explainBinaryRepresentation: explainBinaryRepresentation_Skill_Data,
    organizeFilesInDirectories: organizeFilesInDirectories_Skill_Data,
  },
  description: {
    methodological: "How digital devices encode, format, measure, and organize files and data. Distinguish the representation of information from the file system's organization.",
    frontend: {
      en: "Learn how devices represent information and organize stored files.",
    },
  },
});
