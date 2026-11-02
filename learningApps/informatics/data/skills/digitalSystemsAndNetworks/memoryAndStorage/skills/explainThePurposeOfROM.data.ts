import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainThePurposeOfROM_Skill_Data = buildSkillConfig({
  slug: "explainThePurposeOfROM",
  id: "4358947a-4da8-4463-8219-ba51cbc0abc9",
  name: {
    en: "Explain the Purpose of ROM",
  },
  description: {
    methodological: "Explain that ROM and related nonvolatile technologies can hold device firmware or initial startup instructions without power. The historical name 'read-only memory' does not mean all modern firmware is physically immutable; many devices use reprogrammable flash memory.",
    frontend: {
      en: "Recognize how nonvolatile firmware memory helps devices start up.",
    },
  },
});
