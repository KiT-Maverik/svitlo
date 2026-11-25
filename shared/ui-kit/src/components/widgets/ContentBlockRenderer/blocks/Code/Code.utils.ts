import hljs from 'highlight.js/lib/common';

export { resolveTemplateVariables as resolveCodeVariables } from '../resolveTemplateVariables';

/** Highlight only an explicitly named supported language; unknown names remain plain text. */
export function highlightCode(code: string, language: string): string | null {
  if (!hljs.getLanguage(language)) return null;
  try {
    return hljs.highlight(code, { language, ignoreIllegals: true }).value;
  } catch {
    return null;
  }
}
