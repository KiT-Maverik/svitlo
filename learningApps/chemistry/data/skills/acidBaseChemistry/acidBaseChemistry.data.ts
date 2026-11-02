import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { acidBaseFundamentals_SkillGroup_Data } from './acidBaseFundamentals/acidBaseFundamentals.data';
import { acidBaseSystems_SkillGroup_Data } from './acidBaseSystems/acidBaseSystems.data';

export const acidBaseChemistry_SkillDomain_Data = buildSkillDomainConfig({
  slug: "acidBaseChemistry",
  id: "a526a484-6c73-4807-a92e-7a2c0446081e",
  name: {
    en: "Acid–Base Chemistry",
  },
  groups: {
    acidBaseFundamentals: acidBaseFundamentals_SkillGroup_Data,
    acidBaseSystems: acidBaseSystems_SkillGroup_Data,
  },
  description: {
    methodological: "Acid–base chemistry concerns proton transfer, electron-pair interactions, acidity, and the behavior of chemical systems under relevant conditions. Its models, solution properties, transformations and analytical methods are broader than reaction-pattern classification alone.",
    frontend: {
      en: "Explore how acids and bases interact and how chemists describe and measure acidity.",
    },
  },
});
