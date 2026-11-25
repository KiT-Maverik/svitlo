const placeholder = /%_%([A-Z][A-Z0-9_]*)%_%/g;

/** Resolve Code and Markdown replacement markers without evaluating their values. */
export function resolveTemplateVariables(text: string, variables?: Readonly<Record<string, string>>): string {
  return text.replace(placeholder, (marker, id: string) => variables?.[id] ?? marker);
}
