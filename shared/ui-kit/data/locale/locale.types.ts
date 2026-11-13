import type { LanguageCode } from '@svitlo/engine/runtime';

export type UiKit_Component_Locale<LocaleObject extends object> = Record<LanguageCode, LocaleObject>;
