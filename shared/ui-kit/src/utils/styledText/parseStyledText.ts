export type StyledTextPart =
  | { kind: 'text'; value: string }
  | { kind: 'fragment'; id: string; value: string };

const marker = /^\s*id\s*:\s*([^;{}]+?)\s*;\s*value\s*:\s*([\s\S]*)$/u;

function readableFallback(source: string): string {
  const value = /(?:^|;)\s*value\s*:\s*([\s\S]*)$/u.exec(source);
  if (value) return value[1].replace(/^\s*/u, '');
  const id = /^\s*id\s*:\s*([^;{}]*)/u.exec(source);
  return (id ? id[1] : source).trim();
}

/** Parse published inline markers without making malformed content disappear. */
export function parseStyledText(text: string): StyledTextPart[] {
  const parts: StyledTextPart[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    const start = text.indexOf('{{', cursor);
    if (start < 0) {
      parts.push({ kind: 'text', value: text.slice(cursor).replaceAll('}}', '') });
      break;
    }
    if (start > cursor) parts.push({ kind: 'text', value: text.slice(cursor, start).replaceAll('}}', '') });

    const end = text.indexOf('}}', start + 2);
    const nextStart = text.indexOf('{{', start + 2);
    if (nextStart >= 0 && (end < 0 || nextStart < end)) {
      parts.push({ kind: 'text', value: readableFallback(text.slice(start + 2, nextStart)) });
      cursor = nextStart;
      continue;
    }
    const source = text.slice(start + 2, end < 0 ? undefined : end);
    const parsed = marker.exec(source);
    parts.push(parsed && parsed[1].trim()
      ? { kind: 'fragment', id: parsed[1].trim(), value: parsed[2].trim() }
      : { kind: 'text', value: readableFallback(source) });
    if (end < 0) break;
    cursor = end + 2;
  }

  return parts;
}
