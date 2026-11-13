/**
 * Project only explicitly-authored source-language values in YAML drafts.
 * Never change params.languages or guess missing translations.
 *
 * Only call sourceLocaleOnly at known localized field positions (locale,
 * Flashcard flag values), never on arbitrary Config maps.
 */
const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);

export function sourceLocaleOnly(value, language) {
  if (!language) return value;
  if (Array.isArray(value)) return value.map(item => sourceLocaleOnly(item, language));
  if (!isRecord(value)) return value;
  const entries = Object.entries(value);
  if (entries.length && entries.every(([key]) => /^[a-z]{2}(?:-[A-Z]{2})?$/.test(key))) {
    return Object.hasOwn(value, language) ? { [language]: sourceLocaleOnly(value[language], language) } : {};
  }
  return Object.fromEntries(entries.map(([key, child]) => [key, sourceLocaleOnly(child, language)]));
}

export function sourceFlagValuesOnly(parameters, language) {
  if (!language || !isRecord(parameters) || !isRecord(parameters.flags) || !isRecord(parameters.flags.items)) {
    return parameters;
  }
  return {
    ...parameters,
    flags: {
      ...parameters.flags,
      items: Object.fromEntries(Object.entries(parameters.flags.items).map(([slug, flag]) => [
        slug,
        isRecord(flag) && ['acronym', 'custom'].includes(flag.type)
          ? { ...flag, value: sourceLocaleOnly(flag.value, language) }
          : flag,
      ])),
    },
  };
}
