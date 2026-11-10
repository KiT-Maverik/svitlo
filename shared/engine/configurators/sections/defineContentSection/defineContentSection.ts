import type {DeepPartial} from "#types";

import { contentSection_Config_Schema, type Content_Section_Config } from './defineContentSection.schemas';
import {onlyStrings, onlyLocales} from "../../_utils";

export const defineContentSection = (config: Content_Section_Config)=> {
  contentSection_Config_Schema.parse(config);

  const { id, type, slug, fileLocation, title, description, fallback } = config;

  const localeEntries: DeepPartial<Content_Section_Config> = { fileLocation, title, description, fallback } as const;

  const base = {
    id,
    type,
    slug,
    ...onlyStrings(localeEntries),
  } satisfies DeepPartial<Content_Section_Config>;

  const overrides: DeepPartial<Content_Section_Config> = {};

  return {
    config: {
      base,
      getLocales: ()=> onlyLocales(localeEntries),
      overrides,
    },
    disable: () => overrides.params.disable = true,
  }
}

export type ContentSection_Configurator = ReturnType<typeof defineContentSection>;
