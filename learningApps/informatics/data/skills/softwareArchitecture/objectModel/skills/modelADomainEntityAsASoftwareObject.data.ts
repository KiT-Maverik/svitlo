import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const modelADomainEntityAsASoftwareObject_Skill_Data = buildSkillConfig({
  slug: "modelADomainEntityAsASoftwareObject",
  id: "4d0b43d9-6d0f-4806-a792-a0c54f29e6fd",
  name: {
    en: "Model a Domain Entity as a Software Object",
  },
  description: {
    methodological: "Independently design a software representation of a real or imaginary entity for a specific task by selecting relevant properties and methods, excluding unnecessary detail, and justifying those choices. For a car-rental service, model availability and renting/returning rather than current speed. The result can be a diagram, pseudocode, or code; designing the structure differs from analyzing an existing object.",
    frontend: {
      en: "Design a useful software object by selecting relevant properties and operations.",
    },
  },
});
