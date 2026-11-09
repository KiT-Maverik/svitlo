import { z } from 'zod';

import { scenarioSectionConfigurator_Schema } from '../../sections/section.schemas';
import type { ScenarioSection_Configurator } from '../../sections/defineScenarioSection/defineScenarioSection';
import {
  createHierarchyChildSchema, createHierarchyIdentitySchema, createHierarchyPropsSchema,
} from '../_shared/courseHierarchy.schemas';

export const episode_Config_Schema = z.strictObject({
  ...createHierarchyIdentitySchema('episode'),
  sections: z.array(scenarioSectionConfigurator_Schema),
});
export type Episode_Config = z.infer<typeof episode_Config_Schema>;

export const episode_Props_Schema = z.strictObject({
  ...createHierarchyPropsSchema('episode'),
  sections: z.array(z.object({ type: z.literal('scenario'), id: z.uuid() }).catchall(z.unknown())),
});
export type Episode_Props = z.infer<typeof episode_Props_Schema>;

export const episodeConfigurator_Schema = createHierarchyChildSchema<{
  readonly config: { readonly base: { readonly type: 'episode'; readonly id: string }; readonly locales: () => object };
  readonly sections: readonly ScenarioSection_Configurator[];
}>('episode');
