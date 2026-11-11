const delimiter = '%_%';
const upperSnakeCase = /^[A-Z][A-Z0-9_]*$/;

type Replacements = Readonly<Record<string, string | object>>;

/** Check placeholder markers in one source against declared replacement names. */
function validateTemplateMarkers(source: string, declared: ReadonlySet<string>, path: string): string[] {
  const errors: string[] = [];
  const found = new Set<string>();
  const parts = source.split(delimiter);

  if (parts.length % 2 === 0) errors.push(path + ': unmatched "' + delimiter + '" delimiter');

  for (let index = 1; index < parts.length; index += 2) {
    const id = parts[index];
    if (!upperSnakeCase.test(id)) {
      errors.push(path + ': invalid UPPER_SNAKE_CASE variable marker "' + id + '"');
      continue;
    }
    found.add(id);
    if (!declared.has(id)) errors.push(path + ': variable "' + id + '" is not declared in locale.variables');
  }

  for (const id of declared) {
    if (!found.has(id)) errors.push(path + ': missing configured variable "' + id + '"');
  }
  return errors;
}

/**
 * Shared Code/Markdown replacement validation. A source may be invariant Code
 * text or per-language Markdown text. No declared variables is NOT a reason to
 * skip validation: undeclared placeholders and malformed delimiters must fail.
 */
export function validateReplacementVariables(
  source: string | object,
  replacements: Replacements | undefined,
  path: string,
): string[] {
  const declared = new Set(Object.keys(replacements ?? {}));
  const variants: readonly (readonly [string, string])[] =
    typeof source === 'string'
      ? [[path, source]]
      : Object.entries(source).map(([language, text]) => [path + '.' + language, text as string] as const);
  const errors = variants.flatMap(([at, text]) => validateTemplateMarkers(text, declared, at));

  if (typeof source !== 'string') {
    const languages = new Set(Object.keys(source));
    for (const [id, replacement] of Object.entries(replacements ?? {})) {
      if (typeof replacement === 'string') continue;
      for (const language of languages) {
        if (!(language in replacement)) {
          errors.push('locale.variables.' + id + ': missing replacement for "' + language + '"');
        }
      }
      for (const language of Object.keys(replacement)) {
        if (!languages.has(language)) {
          errors.push('locale.variables.' + id + ': unexpected replacement locale "' + language + '"');
        }
      }
    }
  }

  return errors;
}
