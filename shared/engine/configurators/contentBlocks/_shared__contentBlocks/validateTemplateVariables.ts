const delimiter = '%_%';
const upperSnakeCase = /^[A-Z][A-Z0-9_]*$/;

/** Check a Code/Markdown source against its declared replacement identifiers. */
export function validateTemplateVariables(source: string, declared: ReadonlySet<string>, path: string): string[] {
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
