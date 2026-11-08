import type {LanguageCode} from "@svitlo/contracts/localization";
import type {Locale_Languages} from "@svitlo/contracts";

import type {ContentBlock_Text_Config, ContextBlock_Text_Props} from "./defineText.types";

export const defineText = <SupportedLanguages extends Locale_Languages>({id, type, value, params, slug}: ContentBlock_Text_Config<SupportedLanguages>) => {

  const base: Partial<ContentBlock_Text_Config<SupportedLanguages>> = {
    id,
    type,
    slug,
    params: {
      styling: params.styling,
      wrap: params.wrap,
    },
  } as const;

  if (typeof value === "string") base.value = value;

  const overrides: Partial<ContextBlock_Text_Props> = {};

  const disable = () => { overrides.params = { disabled: true }; };

  return {
    config: {
      base,
      overrides: () => Object.values(overrides).length ? {...overrides} : null,
      locales: () => typeof value === 'string' ? null : value,
      test: {
        config: (supportedLanguages: LanguageCode[]) => true,
        props: () => true,
      }
    },
    disable,
  };
};

export type ContentBlock_Text_Definition = ReturnType<typeof defineText>;
