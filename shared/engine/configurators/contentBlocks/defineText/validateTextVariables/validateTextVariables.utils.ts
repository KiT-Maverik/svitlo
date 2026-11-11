import type { ContentBlock_Text_Config } from './defineText.schemas';

const delimiter = '%_%';
const camelCase = /^[a-z][A-Za-z0-9]*$/;

/** Validate configured Text variable keys against inline fragments in every authored locale. */
export function validateTextVariables(config: ContentBlock_Text_Config): void {
  const variables = config.params.variables;
  // Even without declared variables, stray %_% fragments must be rejected.

  const errors: string[] = [];
  const configured = new Set(Object.keys(variables));

  const variants =
    typeof config.locale.value === 'string'
      ? [['locale.value', config.locale.value] as const]
      : Object.entries(config.locale.value).map(([locale, text]) => [`locale.value.${locale}`, text] as const);

  for (const [path, text] of variants) {
    const found = new Set<string>();
    const parts = text.split(delimiter);
    if (parts.length % 2 === 0) errors.push(`${path}: unmatched "${delimiter}" delimiter`);

    for (let index = 1; index < parts.length; index += 2) {
      const fragment = parts[index];
      const matched = /^\s*id\s*:\s*([^;]*?)\s*;\s*value\s*:\s*([\s\S]*)$/.exec(fragment);
      if (!matched) {
        errors.push(`${path}: invalid Text fragment (expected "id: camelCase; value: text")`);
        continue;
      }

      const id = matched[1].trim();
      if (!camelCase.test(id)) {
        errors.push(`${path}: invalid camelCase Text fragment ID "${id}"`);
        continue;
      }
      if (!matched[2].trim()) errors.push(`${path}: empty value for Text fragment "${id}"`);
      found.add(id);
      if (!configured.has(id)) errors.push(`${path}: Text fragment "${id}" is not declared in params.variables`);
    }

    for (const id of configured) {
      if (!found.has(id)) errors.push(`${path}: missing configured Text fragment "${id}"`);
    }
  }

  if (errors.length) throw new Error(`Text variables validation failed:\n${errors.join('\n')}`);
}
