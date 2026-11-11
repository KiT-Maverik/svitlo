import { z } from 'zod';

import { createContentBlockBaseSchema, localizationSwitch } from '../_shared';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared';

type SceneValue = string | { [key: string]: SceneValue };

/**
 * A Scene uses the standard ContentBlock field-level localization contract:
 * strings are invariant, and language dictionaries localize individual leaves.
 */
const sceneConfigValue_Schema: z.ZodType<SceneValue> = z.lazy(() =>
  z.union([localizationSwitch.config, z.record(z.string(), sceneConfigValue_Schema)]),
);

const scenePropsValue_Schema: z.ZodType<SceneValue> = z.lazy(() =>
  z.union([localizationSwitch.props, z.record(z.string(), scenePropsValue_Schema)]),
);

const sceneLocalizationSwitch = {
  config: sceneConfigValue_Schema,
  props: scenePropsValue_Schema,
} as const;

const contentBlockBase = createContentBlockBaseSchema('scene');
const params = contentBlockBase.shape.params.extend({});
const sceneBase = contentBlockBase.extend({ params });

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  value: sceneLocalizationSwitch[mode],
});
export type ContentBlock_Scene_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

export const scene_Config_Schema = sceneBase.extend(addUnifiedLocale(locale('config')));
export type ContentBlock_Scene_Config = z.infer<typeof scene_Config_Schema>;

export const scene_Props_Schema = sceneBase.extend(addUnifiedLocale(locale('props')));
export type ContentBlock_Scene_Props = z.infer<typeof scene_Props_Schema>;
