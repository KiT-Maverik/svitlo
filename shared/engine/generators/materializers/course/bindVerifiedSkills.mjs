/**
 * Convert only trusted, verified Skill UUIDs to source imports.
 * Editorial drafts and other taxonomy target UUIDs remain inert.
 */
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const sha = /^[0-9a-f]{40}$/i;
const exportName = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const modulePath = /^#skillsData\/(?:[A-Za-z][A-Za-z0-9]*\/)*[A-Za-z][A-Za-z0-9]*$/;
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);

/** Authoritative mapping is supplied by a trusted, source-revision-checked dependency resolver. */
export function bindVerifiedSkills(
  params,
  { resolveSkill, textbookRoot, directory = '', includeLanguages = false } = {},
) {
  if (!record(params)) throw Error(directory + ': expected Course params object');
  const imports = new Map();
  const resolve = id => {
    if (typeof id !== 'string' || !uuid.test(id)) throw Error(directory + ': invalid Skill UUID');
    if (typeof resolveSkill !== 'function') throw Error(directory + ': trusted Skill resolver required');
    const binding = resolveSkill(Object.freeze({ id, placementPath: directory }));
    const suffix =
      typeof binding?.importPath === 'string' && modulePath.test(binding.importPath)
        ? binding.importPath.slice('#skillsData/'.length)
        : null;
    const item = binding?.configurator;
    if (
      !record(binding) ||
      binding.approved !== true ||
      binding.id !== id ||
      !suffix ||
      typeof textbookRoot !== 'string' ||
      binding.sourcePath !== textbookRoot + '/data/skills/' + suffix + '.ts' ||
      !sha.test(binding.sourceSha ?? '') ||
      typeof binding.exportName !== 'string' ||
      !exportName.test(binding.exportName) ||
      !record(item) ||
      item.type !== 'skill' ||
      item.id !== id ||
      item.slug !== binding.slug ||
      item.config?.base?.id !== id ||
      item.config?.base?.slug !== binding.slug ||
      typeof item.build?.props !== 'function'
    )
      throw Error(directory + ': unapproved, stale or mismatched Skill binding ' + id);
    const alias = 'skill_' + id.toLowerCase().replaceAll('-', '_');
    const entry = { exportName: binding.exportName, importPath: binding.importPath, sourceSha: binding.sourceSha };
    const existing = imports.get(alias);
    if (existing && JSON.stringify(existing) !== JSON.stringify(entry))
      throw Error(directory + ': conflicting Skill alias ' + alias);
    imports.set(alias, entry);
    return alias + '.id';
  };
  const fields = Object.entries(params)
    .filter(([key]) => key !== 'languages')
    .map(([key, value]) => {
      if ((key === 'outcomes' || key === 'prerequisites') && record(value)) {
        const targets = Object.entries(value).map(
          ([target, refs]) =>
            JSON.stringify(target) +
            ': ' +
            (target === 'skills'
              ? (() => {
                  if (
                    !Array.isArray(refs) ||
                    new Set(refs.map(id => (typeof id === 'string' ? id.toLowerCase() : id))).size !== refs.length
                  )
                    throw Error(directory + ': Skill target IDs must be a unique array');
                  return '[' + refs.map(resolve).join(', ') + ']';
                })()
              : JSON.stringify(refs)),
        );
        return JSON.stringify(key) + ': { ' + targets.join(', ') + ' }';
      }
      return JSON.stringify(key) + ': ' + JSON.stringify(value);
    });
  if (includeLanguages) fields.push('languages');
  return {
    source: '{ ' + fields.join(', ') + (fields.length ? ',' : '') + ' }',
    imports: [...imports]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(
        ([alias, ref]) =>
          'import { ' + ref.exportName + ' as ' + alias + ' } from ' + JSON.stringify(ref.importPath) + ';',
      ),
  };
}
