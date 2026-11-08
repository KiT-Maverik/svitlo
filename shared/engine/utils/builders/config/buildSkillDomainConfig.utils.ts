import type { Collection } from '@svitlo/contracts/content';
import type { SkillDomain_Config } from '@svitlo/contracts/taxonomy';
import type { DeepReadonly } from '@svitlo/contracts/content';
import { validateSkillConfig } from './buildSkillConfig.utils';
import { validateSkillChildren } from './validateSkillChildren.utils';

/** Build a Domain retaining both Group and direct Skill children. */
export function buildSkillDomainConfig<const T extends SkillDomain_Config>(
  config: T,
): DeepReadonly<T & { readonly collection: Extract<Collection, 'skillDomain'> }> {
  validateSkillConfig(config);
  validateSkillChildren('SkillDomain', 'groups', config.groups, true);
  if (config.skills !== undefined) validateSkillChildren('SkillDomain', 'skills', config.skills, true);
  if (Object.keys(config.groups).length === 0 && (!config.skills || Object.keys(config.skills).length === 0)) {
    throw new Error('SkillDomain must contain at least one Group or direct Skill');
  }
  const collection: Extract<Collection, 'skillDomain'> = 'skillDomain';
  return { ...config, collection } as DeepReadonly<T & { readonly collection: Extract<Collection, 'skillDomain'> }>;
}
