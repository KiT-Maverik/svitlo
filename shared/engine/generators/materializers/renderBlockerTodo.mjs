/**
 * Canonical actionable blockers for generated TypeScript. Pure: never writes,
 * inspects repository state, or changes approved authoring content.
 */
const MARKER = 'TODO (BLOCKER):';

/** A physical single-line instruction; embedded newlines cannot inject code. */
export function renderBlockerTodo(instruction) {
  if (typeof instruction !== 'string') throw new TypeError('Blocker instruction must be a string');
  const action = instruction
    .replace(/\r\n?|\u2028|\u2029/g, '\n')
    .replace(/\s+/g, ' ')
    .trim();
  if (!action) throw new Error('Blocker instruction must explain how to unblock');
  return '// ' + MARKER + ' ' + action;
}

/**
 * One source comment owns both the actionable instruction and the complete
 * temporary reviewed brief. No second TODO or independently dangling comment.
 */
export function renderBlockerSpecification(instruction, specification) {
  const todo = renderBlockerTodo(instruction).slice(3);
  if (typeof specification !== 'string') throw new TypeError('Blocker specification must be a string');
  const lines = specification.replace(/\r\n?|\u2028|\u2029/g, '\n').split('\n');
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines.at(-1).trim()) lines.pop();
  if (!lines.some(line => line.trim()))
    throw new Error('Blocker specification must contain reviewed implementation context');
  if (lines.some(line => line.includes(MARKER)))
    throw new Error('Blocker specification must not duplicate the canonical TODO marker');
  const indent = Math.min(...lines.filter(line => line.trim()).map(line => /^\s*/.exec(line)[0].length));
  return [
    '/*',
    ' * ' + todo,
    ' *',
    ...lines.map(line => ' *' + (line.trim() ? ' ' + line.slice(indent).replace(/\*\//g, '* /') : '')),
    ' */',
  ].join('\n');
}
