import type {LanguageCode} from "@svitlo/contracts/localization";

import type {ContentBlock_Text_Config} from "./defineText.types";
import type {Locale_Languages} from "@svitlo/contracts";

export const defineText = <SupportedLanguages extends Locale_Languages>({id, type, value, params, slug}: ContentBlock_Text_Config<SupportedLanguages>) => {

  const base: Partial<ContentBlock_Text_Config> = {
    id,
    type,
    slug,
    params: {
      styling: params.styling,
      wrap: params.wrap,
    },
    value: typeof value === 'string' ? value : undefined,
  } as const;

  const overrides: Partial<ContentBlock_Text_Config> = {};

  const disable = () => overrides.params.disabled = true;

  return {
    config: {
      base,
      overrides: () => Object.values(overrides).length ? {...overrides} : null,
      locales: () => typeof value === 'string' ? null : value,
      test: (supportedLanguages: LanguageCode[]) => true,
    },
    disable,
  };
};

export type ContentBlock_Text_Definition = ReturnType<typeof defineText>;
