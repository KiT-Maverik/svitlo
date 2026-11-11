import type { ContentBlock_Code_Config } from './defineCode.schemas';

const delimiter = '%_%';
const upperSnakeCase = /^[A-Z][A-Z0-9_]*$/;

/**
 * Validate configured Code variable IDs. Pass resolved source code to also
 * verify all placeholders; fileLocation alone contains no source text.
 */
export function validateCodeVariables(config: ContentBlock_Code_Config, sourceCode?: string): void {
  const variables = config.locale.variables;
  if (!variables?.length) return;

  const errors: string[] = [];
  const configured = new Set<string>();

  for (const variable of variables) {
    if (configured.has(variable.id)) errors.push(`Duplicate Code variable ID "${variable.id}"`);
    configured.add(variable.id);
  }

  if (sourceCode !== undefined) {
    const found = new Set<string>();
    const parts = sourceCode.split(delimiter);
    if (parts.length % 2 === 0) errors.push(`Code template: unmatched "${delimiter}" delimiter`);

    for (let index = 1; index < parts.length; index += 2) {
      const id = parts[index];
      if (!upperSnakeCase.test(id)) {
        errors.push(`Code template: invalid UPPER_SNAKE_CASE variable marker "${id}"`);
        continue;
      }
      found.add(id);
      if (!configured.has(id)) errors.push(`Code template: variable "${id}" is not declared in locale.variables`);
    }

    for (const id of configured) {
      if (!found.has(id)) errors.push(`Code template: missing configured variable "${id}"`);
    }
  }

  if (errors.length) throw new Error(`Code variables validation failed:\n${errors.join('\n')}`);
}
