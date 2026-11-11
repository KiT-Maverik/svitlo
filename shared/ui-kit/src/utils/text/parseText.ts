export type TextPart = { kind: 'text'; value: string } | { kind: 'fragment'; id: string; value: string };

// Text markers contain their visible value and a camelCase styling identifier.
const textFragment = /%_%\s*id\s*:\s*([a-z][A-Za-z0-9]*)\s*;\s*value\s*:\s*((?:(?!%_%)[\s\S])*)%_%(?!\s*id\s*:)/g;

/** Split identified Text fragments from ordinary text without interpreting code placeholders. */
export function parseText(text: string): TextPart[] {
  const parts: TextPart[] = [];
  let cursor = 0;

  for (const match of text.matchAll(textFragment)) {
    const start = match.index;
    if (start > cursor) parts.push({ kind: 'text', value: text.slice(cursor, start) });
    parts.push({ kind: 'fragment', id: match[1], value: match[2].trim() });
    cursor = start + match[0].length;
  }

  if (cursor < text.length) parts.push({ kind: 'text', value: text.slice(cursor) });
  return parts;
}
