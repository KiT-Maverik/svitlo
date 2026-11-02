import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const designDependenciesOnContractsDIP_Skill_Data = buildSkillConfig({
  slug: "designDependenciesOnContractsDIP",
  id: "1c760870-e709-4df3-9670-5df2f10c009a",
  name: {
    en: "Design Dependencies on Contracts (DIP)",
  },
  description: {
    methodological: "Separate business rules from concrete data-access mechanisms through an interface admitting multiple implementations. High-level logic receives dependencies from outside instead of instantiating a fixed service internally.",
    frontend: {
      en: "Separate business logic from concrete services by depending on contracts.",
    },
  },
});
