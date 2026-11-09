import type { DeepPartial } from '#types';

import { code_Config_Schema, type ContentBlock_Code_Config } from './defineCode.schemas';

export function defineCode<const Slug extends string>(config: Omit<ContentBlock_Code_Config, 'slug'> & { slug: Slug }) {
  code_Config_Schema.parse(config);

  const { id, slug, type, language, title, code, fileLocation, variables } = config;

  const base = {
    id,
    slug,
    type,
    language,
    title: typeof title === 'string' ? title : undefined,
    code: typeof code === 'string' ? code : undefined,
    fileLocation: typeof fileLocation === 'string' ? fileLocation : undefined,
    variables: variables?.map(({ id, value }) => ({
      id,
      value: typeof value === 'string' ? value : undefined,
    })),
  } satisfies DeepPartial<ContentBlock_Code_Config>;

  return {
    config: {
      base,
      locales: () =>
        ({
          title: typeof title === 'object' ? title : undefined,
          code: typeof code === 'object' ? code : undefined,
          fileLocation: typeof fileLocation === 'object' ? fileLocation : undefined,
          variables: variables?.map(({ value }) => ({
            value: typeof value === 'object' ? value : undefined,
          })),
        }) satisfies DeepPartial<ContentBlock_Code_Config>,
    },
  };
}

export type ContentBlock_Code_Configurator = ReturnType<typeof defineCode>;
