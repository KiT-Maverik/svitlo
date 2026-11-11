import { validateTemplateVariables } from '../_shared__contentBlocks';
import type { ContentBlock_Markdown_Config } from './defineMarkdown.schemas';

/** Check placeholders and localized replacements in every Markdown language. */
export function validateMarkdownVariables(config: ContentBlock_Markdown_Config): void {
  const variables = config.locale.variables ?? {};
  const declared = new Set(Object.keys(variables));
  const value = config.locale.value;
  const variants =
    typeof value === 'string'
      ? [['locale.value', value] as const]
      : Object.entries(value).map(([language, text]) => ['locale.value.' + language, text] as const);
  const errors = variants.flatMap(([path, text]) => validateTemplateVariables(text, declared, path));

  if (typeof value !== 'string') {
    const languages = new Set(Object.keys(value));
    for (const [id, replacement] of Object.entries(variables)) {
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

  if (errors.length) throw new Error('Markdown variables validation failed:\n' + errors.join('\n'));
}
