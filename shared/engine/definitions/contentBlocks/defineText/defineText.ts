import type {LanguageCode} from "@svitlo/contracts/localization";

import type {ContentBlock_Text} from "./defineText.types";

export const defineText = ({id, type, value, params, slug}: ContentBlock_Text) => {

  const base: Partial<ContentBlock_Text> = {
    id,
    type,
    slug,
    params: {
      styling: params.styling,
      wrap: params.wrap,
    },
    value: typeof value === 'string' ? value : undefined,
  } as const;

  const overrides: Partial<ContentBlock_Text> = {};

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
