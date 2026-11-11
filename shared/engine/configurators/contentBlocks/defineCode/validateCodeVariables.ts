import type { ContentBlock_Code_Config } from './defineCode.schemas';

const delimiter = '%_%';
const upperSnakeCase = /^[A-Z][A-Z0-9_]*$/;

/** Validate localized Code replacement IDs against the already-provided source text. */
export function validateCodeVariables(config: ContentBlock_Code_Config): void {
  const variables = config.locale.variables;
  if (!variables?.length) return;

  const errors: string[] = [];
  const configured = new Set<string>();

  for (const variable of variables) {
    if (configured.has(variable.id)) errors.push(`Duplicate Code variable ID "${variable.id}"`);
    configured.add(variable.id);
  }

  {
    const found = new Set<string>();
    const parts = config.params.codeAsText.split(delimiter);
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
