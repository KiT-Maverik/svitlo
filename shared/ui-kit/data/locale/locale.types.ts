import type { LanguageCode } from '+@svitlo/contracts/localization';

export type UiKit_Component_Locale<LocaleObject extends object> = Record<LanguageCode, LocaleObject>;
