/** Construct an ordered inventory from reviewed slots and actual renderer results.
 * A repeated Lesson UUID is not a duplicate placement. No IDs are allocated here.
 */
export function buildPlacementInventory(input, rendered, root, files) {
  const entries = new Set(files.map(file => file.path));
  const lessons = [],
    episodes = [],
    assessments = [],
    seen = new Set();
  function visit(node, parentPath, orderPath) {
    const config = node.config;
    for (const [index, slug] of config.content.order.entries()) {
      const child = config.content.items[slug];
      const type = child.config.type;
      const path = parentPath
        ? parentPath + (type === 'assessment' ? '/content/' : '/') + slug
        : 'content/' + slug;
      const order = [...orderPath, index];
      if (type === 'module' || type === 'chapter') {
        visit(child, path, order);
        continue;
      }
      const result = rendered.get(path);
      if (!result || result.type !== type || result.slug !== slug || seen.has(path))
        throw Error('Missing or conflicting rendered Course placement: ' + path);
      seen.add(path);
      if (!entries.has(result.placementSourcePath))
        throw Error('Course inventory placement source is not in generated plan: ' + path);
      if (result.status.startsWith('pending') && !entries.has(result.sourcePath))
        throw Error('Course inventory pending source is not in generated plan: ' + path);
      const row = { ...result, placementPath: root + '/' + path, orderPath: order };
      if (type === 'lesson') lessons.push(row);
      else if (type === 'episode') episodes.push(row);
      else if (type === 'assessment') assessments.push(row);
      else throw Error('Unsupported Course inventory placement: ' + type);
    }
  }
  visit(input, '', []);
  if (seen.size !== rendered.size) throw Error('Unreviewed rendered Course placement');
  return { lessons, episodes, assessments };
}
