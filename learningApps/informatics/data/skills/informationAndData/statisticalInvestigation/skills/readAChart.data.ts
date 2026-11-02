import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const readAChart_Skill_Data = buildSkillConfig({
  slug: "readAChart",
  id: "2bd4c20c-514a-4596-a651-1ff8d999811b",
  name: {
    en: "Read a Chart",
  },
  description: {
    methodological: "Identify the values represented by axes, scales, colors, and element lengths; read the data accurately without making assumptions based on presentation. A truncated axis can visually exaggerate a difference.",
    frontend: {
      en: "Read chart scales, labels and values without being misled by their presentation.",
    },
  },
});
