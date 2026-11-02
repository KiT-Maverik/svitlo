import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { aerodynamics_SkillGroup_Data } from './aerodynamics/aerodynamics.data';
import { floatingAndBuoyancy_SkillGroup_Data } from './floatingAndBuoyancy/floatingAndBuoyancy.data';
import { hydrodynamics_SkillGroup_Data } from './hydrodynamics/hydrodynamics.data';
import { pressureInLiquidsAndGases_SkillGroup_Data } from './pressureInLiquidsAndGases/pressureInLiquidsAndGases.data';

export const fluidMechanics_SkillDomain_Data = buildSkillDomainConfig({
  slug: "fluidMechanics",
  id: "b00281a6-388a-497b-945b-b3286dbd4f03",
  name: {
    en: "Fluid Mechanics",
  },
  groups: {
    aerodynamics: aerodynamics_SkillGroup_Data,
    floatingAndBuoyancy: floatingAndBuoyancy_SkillGroup_Data,
    hydrodynamics: hydrodynamics_SkillGroup_Data,
    pressureInLiquidsAndGases: pressureInLiquidsAndGases_SkillGroup_Data,
  },
  description: {
    methodological: "Water and air transmit pressure, flow, resist bodies' motion, and can provide buoyancy. Familiar containers, floating objects, and airflow make these phenomena accessible.",
    frontend: {
      en: "Explore how liquids and gases flow, exert pressure and support moving bodies.",
    },
  },
});
