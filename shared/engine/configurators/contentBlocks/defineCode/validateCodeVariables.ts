import { validateTemplateVariables } from '../_shared__contentBlocks';
import type { ContentBlock_Code_Config } from './defineCode.schemas';

/** Validate localized Code replacement IDs against the already-provided source text. */
export function validateCodeVariables(config: ContentBlock_Code_Config): void {
  const variables = config.locale.variables;
  if (!variables || Object.keys(variables).length === 0) return;

  const errors = validateTemplateVariables(
    config.params.codeAsText,
    new Set(Object.keys(variables)),
    'Code template',
  );

  if (errors.length) throw new Error('Code variables validation failed:\n' + errors.join('\n'));
}
