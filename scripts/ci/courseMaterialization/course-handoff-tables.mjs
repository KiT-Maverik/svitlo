// Pure reconciliation: no GitHub writes, no publication or child PR creation.
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const pathPattern = /^[A-Za-z0-9_/-]+(?:\.ts)?$/;
const safePath = value => typeof value === 'string' && pathPattern.test(value) &&
  value.split('/').every(part => part && part !== '.' && part !== '..');
const headings = '| UUID | Placement | Order | Kind | Source | Status | Child PR | Next action | Evidence |';
const divider = '| --- | --- | --- | --- | --- | --- | --- | --- | --- |';
const markers = kind => ['<!-- svitlo-course-' + kind + ':v1:begin -->', '<!-- svitlo-course-' + kind + ':v1:end -->'];
const cell = value => String(value).replaceAll('|', '&#124;').replace(/[\r\n]/g, ' ');
const key = (id, placement) => id + '\0' + placement;
function splitRow(line) {
  if (!line.startsWith('| ') || !line.endsWith(' |')) throw Error('Malformed managed Course inventory row');
  const cells = line.slice(2, -2).split(' | ');
  if (cells.length !== 9 || !uuid.test(cells[0]) || !safePath(cells[1]))
    throw Error('Malformed managed Course inventory row');
  return cells;
}
function locate(body, kind) {
  const [start, end] = markers(kind);
  const a = body.indexOf(start), b = body.indexOf(end);
  if (a === -1 && b === -1) return null;
  if (a < 0 || b < a || body.indexOf(start, a + start.length) !== -1 || body.indexOf(end, b + end.length) !== -1 ||
    (a > 0 && body[a - 1] !== '\n') || (b + end.length < body.length && !['\r', '\n'].includes(body[b + end.length])))
    throw Error('Malformed managed Course inventory markers: ' + kind);
  const lines = body.slice(a + start.length, b).trim().split(/\r?\n/);
  if (lines[0] !== headings || lines[1] !== divider) throw Error('Malformed managed Course inventory headings');
  const prior = new Map();
  for (const line of lines.slice(2)) {
    const cells = splitRow(line);
    const identity = key(cells[0], cells[1]);
    if (prior.has(identity)) throw Error('Duplicate managed Course placement');
    prior.set(identity, cells);
  }
  return { a, b: b + end.length, prior };
}
function render(kind, rows, previous) {
  if (!Array.isArray(rows)) throw Error('Missing Course inventory: ' + kind);
  const [start, end] = markers(kind);
  const seen = new Set();
  const lines = rows.map(row => {
    if (!uuid.test(row.id) || !safePath(row.placementPath) || !safePath(row.sourcePath) ||
      row.type !== (kind === 'lessons' ? 'lesson' : 'episode') ||
      !Array.isArray(row.orderPath) || !row.orderPath.length ||
      row.orderPath.some(n => !Number.isSafeInteger(n) || n < 0) ||
      !['new', 'reused', 'overridden'].includes(row.kind) ||
      !['pending-lesson-stage1', 'pending-episode-scenario', 'verified-reference', 'materialized-source'].includes(row.status))
      throw Error('Invalid verified Course inventory row');
    const identity = key(row.id, row.placementPath);
    if (seen.has(identity)) throw Error('Duplicate Course placement');
    seen.add(identity);
    const old = previous?.get(identity);
    const next = row.status === 'pending-lesson-stage1' ? 'Authorize Lesson Stage 1' :
      row.status === 'pending-episode-scenario' ? 'Authorize Episode Stage 1' : 'Verify downstream publication gates';
    return '| ' + [row.id, row.placementPath, row.orderPath.map(n => n + 1).join('.'), row.kind,
      row.sourcePath, old?.[5] ?? row.status, old?.[6] ?? '—', old?.[7] ?? next, old?.[8] ?? '—'].map(cell).join(' | ') + ' |';
  });
  for (const identity of previous?.keys() ?? []) {
    if (!seen.has(identity)) throw Error('Existing Course handoff identity missing from verified inventory; reconcile explicitly');
  }
  return [start, headings, divider, ...lines, end].join('\n');
}
export function reconcileCourseHandoffTables(body, inventory) {
  if (typeof body !== 'string') throw Error('Current PR body required');
  const sections = ['lessons', 'episodes'].map(kind => {
    const location = locate(body, kind);
    return { kind, location, table: render(kind, inventory?.[kind], location?.prior) };
  });
  const located = sections.filter(section => section.location).sort((x, y) => y.location.a - x.location.a);
  if (located.length === 2 && located[1].location.b > located[0].location.a)
    throw Error('Overlapping managed Course inventory blocks');
  let result = body;
  for (const { location, table } of located)
    result = result.slice(0, location.a) + table + result.slice(location.b);
  for (const { kind, location, table } of sections)
    if (!location) result += (result.endsWith('\n') ? '\n' : '\n\n') +
      '### ' + (kind === 'lessons' ? 'Lessons' : 'Episodes') + '\n\n' + table + '\n';
  return result;
}
