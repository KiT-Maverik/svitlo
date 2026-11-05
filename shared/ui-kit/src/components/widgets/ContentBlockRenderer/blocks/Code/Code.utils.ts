import hljs from 'highlight.js/lib/common';
import { parseText } from '#utils/text/parseText';

export function resolveCodeVariables(code: string, variables?: readonly { id: string; value: string }[]): string {
  const values = new Map(variables?.map(({ id, value }) => [id, value]));
  return parseText(code)
    .map(part => (part.kind === 'text' ? part.value : (values.get(part.id) ?? part.value)))
    .join('');
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
