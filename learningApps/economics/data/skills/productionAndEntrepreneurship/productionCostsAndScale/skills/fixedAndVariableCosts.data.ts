import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const fixedAndVariableCosts_Skill_Data = buildSkillConfig({
  slug: "fixedAndVariableCosts",
  id: "618c4c43-306e-48bd-b444-0ddc2412be9c",
  name: {
    en: "Постійні та змінні витрати",
  },
  description: {
    methodological: "Distinguish costs that do not depend on output over a stated time horizon from those that vary with production.",
    frontend: {
      en: "Tell the difference between costs that stay fixed and those that rise with output.",
    },
  },
});
