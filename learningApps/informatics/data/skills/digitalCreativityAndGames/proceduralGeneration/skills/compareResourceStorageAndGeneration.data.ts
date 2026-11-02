import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const compareResourceStorageAndGeneration_Skill_Data = buildSkillConfig({
  slug: "compareResourceStorageAndGeneration",
  id: "99f4d5fd-2c5c-46c6-b9da-c8c27a563c2b",
  name: {
    en: "Compare Resource Storage and Generation",
  },
  description: {
    methodological: "Assess trade-offs between stored data volume, compact rule descriptions, initialization time, and CPU/GPU/RAM use. Procedural generation is not the same as lossless or lossy compression of a ready-made file.",
    frontend: {
      en: "Compare the storage saved by procedural generation with the computation it requires.",
    },
  },
});
