import type { ContentBlock_Configurator, ContentBlock_Props } from '../../contentBlocks';
import type { OrderedConfiguratorCollection } from '../../_shared__configurators/orderedConfiguratorCollection.utils';

/** Parent Zod schemas validate metadata; children retain their own validation. */
export type Section_Config_Content = { content: OrderedConfiguratorCollection<ContentBlock_Configurator> };
export type Section_Props_Content = { content: OrderedConfiguratorCollection<ContentBlock_Props> };
