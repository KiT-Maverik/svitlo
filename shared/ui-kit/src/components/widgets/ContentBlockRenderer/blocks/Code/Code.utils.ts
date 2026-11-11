import hljs from 'highlight.js/lib/common';
// Code markers use UPPER_SNAKE_CASE names, not Text's inline id/value fragments.
const codePlaceholder = /%_%([A-Z][A-Z0-9_]*)%_%/g;

export function resolveCodeVariables(code: string, variables?: readonly { id: string; value: string }[]): string {
  const values = new Map(variables?.map(({ id, value }) => [id, value]));
  return code.replace(codePlaceholder, (marker, id: string) => values.get(id) ?? marker);
}

/** Highlight only an explicitly named supported language; unknown names remain plain text. */
export function highlightCode(code: string, language: string): string | null {
  if (!hljs.getLanguage(language)) return null;
  try {
    return hljs.highlight(code, { language, ignoreIllegals: true }).value;
  } catch {
    return null;
  }
}
