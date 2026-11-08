import { DEFAULT_SUPPORTED_LANGUAGES, type Locale } from '../../types/languages';

export interface CreateLocalizedFileLocationsOptions {
  only?: readonly Locale[];
  include?: readonly Locale[];
  exclude?: readonly Locale[];
}

export type LocalizedFileLocations<TLocale extends Locale = Locale> = Record<TLocale, string>;

const normalizeExtension = (extension: string): string => {
  const value = extension.replace(/^\.+/, '');
  return value.length > 0 ? `.${value}` : '';
};

const joinPath = (directory: string, fileName: string): string => `${directory.replace(/\/+$/, '')}/${fileName}`;

export function createLocalizedFileLocations<TOnly extends Locale = Locale>(
  directory: string,
  extension: string,
  options: CreateLocalizedFileLocationsOptions & { only?: readonly TOnly[] } = {},
): LocalizedFileLocations<TOnly> {
  const availableLanguages = DEFAULT_SUPPORTED_LANGUAGES;
  const availableLocales = availableLanguages.map(({ locale }) => locale);
  const selectedLocales = new Set<Locale>(options.only ?? availableLocales);

  options.include?.forEach(locale => selectedLocales.add(locale));
  options.exclude?.forEach(locale => selectedLocales.delete(locale));

  const fileExtension = normalizeExtension(extension);
  const locations = Object.fromEntries(
    availableLanguages
      .filter(({ locale }) => selectedLocales.has(locale))
      .map(({ locale, language }) => [locale, joinPath(directory, `${language}${fileExtension}`)]),
  );

  return locations as LocalizedFileLocations<TOnly>;
}
