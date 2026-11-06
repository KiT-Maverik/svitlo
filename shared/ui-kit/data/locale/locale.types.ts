import type { LanguageCode } from '@svitlo/engine/localization';

export type UiKit_Component_Locale<LocaleObject extends object> = Record<LanguageCode, LocaleObject>;
