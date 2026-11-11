import { z } from 'zod';

import { contentBlockLocalizationSwitch as localizationSwitch } from '../../contentBlocks';
import { type Section_Type } from '../section.constants';
import { Configurator_Mode } from '../../configurator.schemas';

export const createSectionMetaSchema = (type: Section_Type) => {
  const meta = (mode: Configurator_Mode) => ({
    type: z.literal(type),
    id: z.uuid(),
    slug: z.string().min(1),
    title: localizationSwitch[mode],
  });

  const params = (mode: Configurator_Mode) => ({
    navigationLabel: localizationSwitch[mode],
    skippable: z.literal(true).optional(),
  });

  return {
    config: z.object({
      ...meta('config'),
      title: localizationSwitch.config,
      params: params('config'),
    }),
    props: z.object({
      ...meta('props'),
      title: localizationSwitch.props,
      params: z.object({
        ...params('props'),
        disable: z.literal(true).optional(),
      }),
    }),
  };
};
