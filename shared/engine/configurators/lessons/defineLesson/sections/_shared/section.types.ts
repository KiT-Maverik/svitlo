import type { ContentBlock_Configurator, ContentBlock_Props } from '../../contentBlocks/contentBlock.types';

/** Section children are typed separately from section metadata validation. */
export type Section_Config_Content = { content: readonly ContentBlock_Configurator[] };
export type Section_Props_Content = { content: readonly ContentBlock_Props[] };
