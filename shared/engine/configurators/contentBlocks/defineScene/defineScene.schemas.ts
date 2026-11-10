import { z } from 'zod';
import { createContentBlockBaseSchema } from '../_shared';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared';
import { languageCode_Schema } from '#schemas';

const sceneValue_Schema: z.ZodType<string | { [key: string]: unknown }> = z.lazy(() =>
  z.union([z.string(), z.record(z.string(), sceneValue_Schema)]),
);

const sceneLocalizationSwitch = {
  config: z.partialRecord(languageCode_Schema, sceneValue_Schema),
  props: sceneValue_Schema,
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
