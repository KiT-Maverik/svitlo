import { z } from 'zod';

import { localizationSwitch } from '#schemas';

function createSkillDomainSchema<Mode extends keyof typeof localizationSwitch>(mode: Mode) {
  const localized = localizationSwitch[mode];

  return z.object({
    id: z.uuid(),
    slug: z.string().min(1),
    description: localized,
    title: localized,
  });
}

export const skillDomain_Config_Schema = createSkillDomainSchema('config');
export type SkillDomain_Config = z.infer<typeof skillDomain_Config_Schema>;

export const skillDomain_Props_Schema = createSkillDomainSchema('props');
export type SkillDomain_Props = z.infer<typeof skillDomain_Props_Schema>;
