import type { OrderedConfiguratorCollection } from '../../_shared__configurators/orderedConfiguratorCollection/orderedConfiguratorCollection.utils';
import type { ContentBlock_Configurator, ContentBlock_Data } from '../../contentBlocks';

/** Parent Zod schemas validate metadata; children retain their own validation. */
export type Section_Config_Content = { content: OrderedConfiguratorCollection<ContentBlock_Configurator> };
export type Section_Data_Content = { content: OrderedConfiguratorCollection<ContentBlock_Data> };
