/**
 * Project authored media references to existing Runtime Props field names.
 * Filename values remain unresolved until textbook publication.
 */
export function runtimeMediaLocale<T extends object>(source: T, primary: 'src' | 'fileLocation') {
  const projected: Record<string, unknown> = Object.fromEntries(Object.entries(source));
  if (Object.hasOwn(projected, 'fileName')) {
    projected[primary] = projected.fileName;
    delete projected.fileName;
  }
  if (Object.hasOwn(projected, 'posterFileName')) {
    projected.poster = projected.posterFileName;
    delete projected.posterFileName;
  }
  return projected;
}
