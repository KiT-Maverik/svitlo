import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { chooseADigitalCreativeTool_Skill_Data, createASimpleDigitalArtifact_Skill_Data, editADigitalArtifact_Skill_Data } from './skills';

export const digitalMaterials_SkillGroup_Data = buildSkillGroupConfig({
  slug: "digitalMaterials",
  id: "311e23f8-daee-44c7-bfd2-36f679bd8226",
  name: {
    en: "Digital Materials",
  },
  skills: {
    chooseADigitalCreativeTool: chooseADigitalCreativeTool_Skill_Data,
    createASimpleDigitalArtifact: createASimpleDigitalArtifact_Skill_Data,
    editADigitalArtifact: editADigitalArtifact_Skill_Data,
  },
  description: {
    methodological: "Creating, modifying, and selecting tools for digital outcomes with specific purposes. Editing an existing file, for example, is a distinct action from choosing a tool for future work.",
    frontend: {
      en: "Learn to create, edit and choose tools for purposeful digital content.",
    },
  },
});
