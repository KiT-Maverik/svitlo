import { z } from 'zod';

import { identityBase_Schema } from '../../../../_shared__configurators/common.schemas';
import {
  validateSlugAddressedContainer,
  type SafePlacementMap,
} from '../../../../_shared__configurators/slugAddressedContainer/slugAddressedContainer.utils';
import { primitiveContentBlockTypes } from '../../../contentBlock.constants';
import { primitiveContentBlockConfigurator_Schema } from '../../../contentBlock.schemas';
import type {
  ContentBlock_Audio_Configurator,
  ContentBlock_Audio_Data,
  ContentBlock_Audio_DataBase,
} from '../../../primitive/defineAudio';
import { audio_Data_Schema } from '../../../primitive/defineAudio/defineAudio.schemas';
import type {
  ContentBlock_Code_Configurator,
  ContentBlock_Code_Data,
  ContentBlock_Code_DataBase,
} from '../../../primitive/defineCode';
import { code_Data_Schema } from '../../../primitive/defineCode/defineCode.schemas';
import type {
  ContentBlock_Image_Configurator,
  ContentBlock_Image_Data,
  ContentBlock_Image_DataBase,
} from '../../../primitive/defineImage';
import { image_Data_Schema } from '../../../primitive/defineImage/defineImage.schemas';
import type {
  ContentBlock_Markdown_Configurator,
  ContentBlock_Markdown_Data,
  ContentBlock_Markdown_DataBase,
} from '../../../primitive/defineMarkdown';
import { markdown_Data_Schema } from '../../../primitive/defineMarkdown/defineMarkdown.schemas';
import type {
  ContentBlock_Scene_Configurator,
  ContentBlock_Scene_Data,
  ContentBlock_Scene_DataBase,
} from '../../../primitive/defineScene';
import { scene_Data_Schema } from '../../../primitive/defineScene/defineScene.schemas';
import type {
  ContentBlock_Subtitles_Configurator,
  ContentBlock_Subtitles_Data,
} from '../../../primitive/defineSubtitles';
import { subtitles_Data_Schema } from '../../../primitive/defineSubtitles/defineSubtitles.schemas';
import type {
  ContentBlock_Text_Configurator,
  ContentBlock_Text_Data,
  ContentBlock_Text_DataBase,
} from '../../../primitive/defineText';
import { text_Data_Schema } from '../../../primitive/defineText/defineText.schemas';
import type {
  ContentBlock_Video_Configurator,
  ContentBlock_Video_Data,
  ContentBlock_Video_DataBase,
} from '../../../primitive/defineVideo';
import { video_Data_Schema } from '../../../primitive/defineVideo/defineVideo.schemas';
import type {
  ContentBlock_Youtube_Configurator,
  ContentBlock_Youtube_Data,
  ContentBlock_Youtube_DataBase,
} from '../../../primitive/defineYoutube';
import { youtube_Data_Schema } from '../../../primitive/defineYoutube/defineYoutube.schemas';
import { hasConfiguratorBuildIdentity } from '../configuratorBoundary';

export type Checkpoint_Allowed_Configurator =
  | ContentBlock_Audio_Configurator
  | ContentBlock_Code_Configurator
  | ContentBlock_Image_Configurator
  | ContentBlock_Markdown_Configurator
  | ContentBlock_Scene_Configurator
  | ContentBlock_Subtitles_Configurator
  | ContentBlock_Text_Configurator
  | ContentBlock_Video_Configurator
  | ContentBlock_Youtube_Configurator;
export type Checkpoint_Allowed_Data =
  | ContentBlock_Audio_Data
  | ContentBlock_Code_Data
  | ContentBlock_Image_Data
  | ContentBlock_Markdown_Data
  | ContentBlock_Scene_Data
  | ContentBlock_Subtitles_Data
  | ContentBlock_Text_Data
  | ContentBlock_Video_Data
  | ContentBlock_Youtube_Data;
export type Checkpoint_Allowed_DataBase =
  | ContentBlock_Audio_DataBase
  | ContentBlock_Code_DataBase
  | ContentBlock_Image_DataBase
  | ContentBlock_Markdown_DataBase
  | ContentBlock_Scene_DataBase
  | ReturnType<ContentBlock_Subtitles_Configurator['build']['data']>['base']
  | ContentBlock_Text_DataBase
  | ContentBlock_Video_DataBase
  | ContentBlock_Youtube_DataBase;

const answerBase = identityBase_Schema.extend({ type: z.literal('checkpointAnswer') });
export const checkpointAnswer_Config_Schema = answerBase
  .extend({ children: z.array(z.string()).min(1) })
  .catchall(z.unknown())
  .superRefine((value, ctx) => {
    for (const issue of validateSlugAddressedContainer(value, primitiveContentBlockTypes)) {
      ctx.addIssue({ code: 'custom', path: issue.path, message: issue.message });
    }
    let enabled = 0;
    for (const key of value.children) {
      const child = value[key];
      const valid =
        primitiveContentBlockConfigurator_Schema.safeParse(child).success && hasConfiguratorBuildIdentity(child);
      if (!valid) {
        ctx.addIssue({
          code: 'custom',
          path: [key],
          message: 'CheckpointAnswer requires a Primitive Configurator with a valid Build API and identity',
        });
      }
      if (
        child !== null &&
        typeof child === 'object' &&
        !Array.isArray(child) &&
        'config' in child &&
        child.config !== null &&
        typeof child.config === 'object' &&
        'base' in child.config &&
        child.config.base !== null &&
        typeof child.config.base === 'object' &&
        'params' in child.config.base &&
        child.config.base.params !== null &&
        typeof child.config.base.params === 'object' &&
        'disabled' in child.config.base.params &&
        child.config.base.params.disabled === true
      )
        continue;
      if (valid) enabled++;
    }
    if (enabled === 0)
      ctx.addIssue({
        code: 'custom',
        path: ['children'],
        message: 'At least one enabled answer child is required',
      });
  });
export type ContentBlock_CheckpointAnswer_Config = z.infer<typeof checkpointAnswer_Config_Schema>;

export const checkpointAnswer_Child_Data_Schema = z.discriminatedUnion('type', [
  audio_Data_Schema,
  code_Data_Schema,
  image_Data_Schema,
  markdown_Data_Schema,
  scene_Data_Schema,
  subtitles_Data_Schema,
  text_Data_Schema,
  video_Data_Schema,
  youtube_Data_Schema,
]);
export const checkpointAnswer_Data_Schema = answerBase
  .extend({ children: z.array(z.string()).min(1) })
  .catchall(z.unknown())
  .superRefine((value, ctx) => {
    for (const issue of validateSlugAddressedContainer(value, primitiveContentBlockTypes)) {
      ctx.addIssue({ code: 'custom', path: issue.path, message: issue.message });
    }
    let enabled = 0;
    for (const key of value.children) {
      const parsed = checkpointAnswer_Child_Data_Schema.safeParse(value[key]);
      if (!parsed.success) {
        ctx.addIssue({ code: 'custom', path: [key], message: 'Invalid Primitive answer child Data' });
      } else if (parsed.data.params.disabled !== true) {
        enabled++;
      }
    }
    if (!enabled)
      ctx.addIssue({
        code: 'custom',
        path: ['children'],
        message: 'At least one enabled answer child is required',
      });
  });
export type ContentBlock_CheckpointAnswer_Data = z.infer<typeof checkpointAnswer_Data_Schema>;
export type CheckpointAnswer_Overrides<
  Items extends Record<string, Checkpoint_Allowed_Configurator>,
  Added extends Record<string, Checkpoint_Allowed_Configurator> = {},
> = {
  children?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
} & {
  [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false;
} & Added &
  SafePlacementMap<Added> & {
    [Key in keyof Items & keyof Added]?: never;
  };
