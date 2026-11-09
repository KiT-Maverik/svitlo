import { childDefinition } from '../../structured';
import { contentBlockTypes } from '../contentBlock.schemas';
import type { ContentBlock_Configurator } from '../contentBlock.types';

export const contentBlockChild = () =>
  childDefinition<ContentBlock_Configurator>(value => {
    const base = value.config.base;
    return (
      typeof base === 'object' &&
      base !== null &&
      'type' in base &&
      contentBlockTypes.includes(base.type as (typeof contentBlockTypes)[number])
    );
  });
