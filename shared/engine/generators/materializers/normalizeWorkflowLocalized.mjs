const code = /^[a-z]{2}(?:-[A-Z]{2})?$/;
const record = value =>
  value !== null &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  [Object.prototype, null].includes(Object.getPrototypeOf(value));

/**
 * A reviewed workflow's learner-facing string belongs to its document
 * language; it is not a Configurator's intentionally invariant scalar.
 * Keep explicitly authored locale entries sparse, without manufacturing
 * planned translations or changing the generic localizationSwitch API.
 */
export function normalizeWorkflowLocalized(value, documentLanguage, path, plannedLanguages) {
  if (
    !code.test(documentLanguage ?? '') ||
    !Array.isArray(plannedLanguages) ||
    !plannedLanguages.includes(documentLanguage) ||
    new Set(plannedLanguages).size !== plannedLanguages.length ||
    plannedLanguages.some(language => !code.test(language))
  )
    throw Error(path + ': invalid reviewed document/planned language scope');
  const locales = typeof value === 'string' ? { [documentLanguage]: value } : value;
  if (
    !record(locales) ||
    !Object.hasOwn(locales, documentLanguage) ||
    typeof locales[documentLanguage] !== 'string' ||
    !locales[documentLanguage].trim()
  )
    throw Error(path + ': missing reviewed ' + documentLanguage + ' locale');
  const result = {};
  for (const [language, text] of Object.entries(locales)) {
    if (!code.test(language) || !plannedLanguages.includes(language) || typeof text !== 'string' || !text.trim())
      throw Error(path + ': invalid or unplanned reviewed locale ' + language);
    result[language] = text;
  }
  return result;
}
