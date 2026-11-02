import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { environmentalControl_SkillGroup_Data } from './environmentalControl/environmentalControl.data';
import { hydraulicInfrastructure_SkillGroup_Data } from './hydraulicInfrastructure/hydraulicInfrastructure.data';
import { wastewaterAndDrainage_SkillGroup_Data } from './wastewaterAndDrainage/wastewaterAndDrainage.data';
import { waterSupply_SkillGroup_Data } from './waterSupply/waterSupply.data';

export const waterAndEnvironmentalInfrastructure_SkillDomain_Data = buildSkillDomainConfig({
  slug: "waterAndEnvironmentalInfrastructure",
  id: "2442ece9-8e6c-406a-a3b1-5b7a38cf51e7",
  name: {
    en: "Water and Environmental Infrastructure",
  },
  groups: {
    environmentalControl: environmentalControl_SkillGroup_Data,
    hydraulicInfrastructure: hydraulicInfrastructure_SkillGroup_Data,
    wastewaterAndDrainage: wastewaterAndDrainage_SkillGroup_Data,
    waterSupply: waterSupply_SkillGroup_Data,
  },
  description: {
    methodological: "Public services depend on connected intake, treatment, storage and collection systems. This domain concerns engineered infrastructure rather than natural water circulation or public-health instruction.",
    frontend: {
      en: "Explore engineered systems for safe water, drainage and environmental protection.",
    },
  },
});
