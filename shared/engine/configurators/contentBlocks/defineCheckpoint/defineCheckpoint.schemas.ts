import { z } from 'zod';

import type { ContentBlock_NonCheckpoint_Configurator } from '../contentBlock.types';
import type { ContentBlock_Text_Configurator } from '../defineText/defineText';
import type { ContentBlock_Text_Props } from '../defineText/defineText.schemas';
import type { ContentBlock_Props } from '../contentBlock.types';
import { createContentBlockBaseSchema, localizationSwitch } from '../_shared';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared';

const contentBlockBase = createContentBlockBaseSchema('checkpoint');

const params = contentBlockBase.shape.params.extend({
  headingLevel: z.number().int().min(1).max(6).optional(),
  showIndices: z.boolean().optional(),
  showChevron: z.boolean().optional(),
  showIcon: z.boolean().optional(),
  indexPosition: z.enum(['left', 'right']).optional(),
  iconPosition: z.enum(['left', 'right']).optional(),
  chevronPosition: z.enum(['left', 'right']).optional(),
  enableChecks: z.boolean().optional(),
  requireCompletion: z.boolean().optional(),
  renderAsGroup: z.boolean().optional(),
});

const checkpointBase = contentBlockBase.extend({ params });

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: localizationSwitch[mode],
});
export type ContentBlock_Checkpoint_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

/** The nested block validates itself in defineText; the parent validates only collection integrity. */
export type Checkpoint_Answer_Items = Record<string, ContentBlock_NonCheckpoint_Configurator>;
export type Checkpoint_Answer<Items extends Checkpoint_Answer_Items = Checkpoint_Answer_Items> = {
  items: Items;
  order: readonly (keyof Items & string)[];
};
export type Checkpoint_Item<Answers extends Checkpoint_Answer_Items = Checkpoint_Answer_Items> = {
  question: ContentBlock_Text_Configurator;
  answer: Checkpoint_Answer<Answers>;
  check?: true;
};
export type Checkpoint_Items = Record<string, Checkpoint_Item>;
export type Checkpoint_Content<Items extends Checkpoint_Items = Checkpoint_Items> = {
  items: Items;
  order: readonly (keyof Items & string)[];
};

/** For authored definitions, only the Checkpoint's own metadata belongs to Zod. */
export const checkpoint_Config_Schema = checkpointBase.extend(addUnifiedLocale(locale('config')));
export type ContentBlock_Checkpoint_Config = z.infer<typeof checkpoint_Config_Schema> & {
  content: Checkpoint_Content;
};

/**
 * The Props schema also validates only metadata. Published child blocks are
 * resolved by the resource generator and retain identity-keyed order.
 */
export const checkpoint_Props_Schema = checkpointBase.extend(addUnifiedLocale(locale('props')));
export type Checkpoint_Resolved_Answer = {
  items: Record<string, Exclude<ContentBlock_Props, ContentBlock_Checkpoint_Props>>;
  order: string[];
};
export type Checkpoint_Resolved_Content = {
  items: Record<string, {
    question: ContentBlock_Text_Props;
    answer: Checkpoint_Resolved_Answer;
    check?: true;
  }>;
  order: string[];
};
export type ContentBlock_Checkpoint_Props = z.infer<typeof checkpoint_Props_Schema> & {
  content: Checkpoint_Resolved_Content;
};
