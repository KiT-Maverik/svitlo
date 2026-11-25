/**
 * Stable UUID-addressed layout for large standalone entity collections.
 * The collection root (e.g. "lessons") belongs to the caller.
 *
 * For example:
 * d3048d21-8690-5255-b62c-984c69ac272c ->
 * c/d3048d21-8690-5255-b62c-984c69ac272c
 *
 * Pure and platform-independent: no filesystem, imports, I/O or slug lookup.
 * Keep this layout version fixed until a repository-wide migration is performed.
 */
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function resolveEntityPath(id: string): string {
  if (typeof id !== 'string' || !UUID_PATTERN.test(id)) {
    throw new Error('Expected a canonical UUID entity ID');
  }
  const normalized = id.toLowerCase();
  return `${normalized.slice(-1)}/${normalized}`;
}
