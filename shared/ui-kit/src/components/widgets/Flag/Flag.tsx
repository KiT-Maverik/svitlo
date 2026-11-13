import type { ImgHTMLAttributes } from 'react';
import type { DefaultSupportedLanguage } from '@svitlo/engine/runtime';

/** Only locales registered in the app have a flag dispatch entry. */
export type FlagLocale = DefaultSupportedLanguage['locale'];
export type FlagProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
  locale: FlagLocale;
  alt?: string;
  assetBasePath?: string;
};

/**
 * ISO 3166-1 country asset codes, except the Crimean Tatar qm.svg language flag.
 * Belarusian Taraškievica deliberately uses the historical white-red-white asset.
 * Unregistered future locales intentionally have no dispatcher entry.
 */
export const flagCountryByLocale = {
  'en-US': 'us',
  'zh-Hans-CN': 'cn',
  'hi-IN': 'in',
  'es-ES': 'es',
  'ar-SA': 'sa',
  'fr-FR': 'fr',
  'bn-BD': 'bd',
  'pt-BR': 'br',
  'ur-PK': 'pk',
  'id-ID': 'id',
  'de-DE': 'de',
  'ja-JP': 'jp',
  'ko-KR': 'kr',
  'tr-TR': 'tr',
  'vi-VN': 'vn',
  'ta-IN': 'in',
  'te-IN': 'in',
  'mr-IN': 'in',
  'ms-MY': 'my',
  'he-IL': 'il',
  'pl-PL': 'pl',
  'uk-UA': 'ua',
  'lt-LT': 'lt',
  'lv-LV': 'lv',
  'et-EE': 'ee',
  'be-tarask': 'by',
  'ka-GE': 'ge',
  'kk-Cyrl-KZ': 'kz',
  'crh-Latn-UA': 'qm',
} as const satisfies Record<FlagLocale, string>;

/** A single image wrapper instead of individually authored React SVG components. */
export function Flag({
  locale,
  alt = '',
  width = 24,
  height = 16,
  style,
  assetBasePath = '/flags',
  ...props
}: FlagProps) {
  return (
    <img
      src={`${assetBasePath.replace(/\/$/, '')}/${flagCountryByLocale[locale]}.svg`}
      alt={alt}
      width={width}
      height={height}
      style={{ objectFit: 'contain', ...style }}
      {...props}
    />
  );
}
