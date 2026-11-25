/** Extract only the Node test invocation; later chained commands are not test globs. */
export function engineTestPatterns(command) {
  if (typeof command !== 'string') throw new Error('Missing Engine test command');
  const marker = ' && node --test ';
  const index = command.indexOf(marker);
  if (index < 0) throw new Error('Unsupported Engine test command: expected existing node --test invocation');
  const invocation = command.slice(index + marker.length).split(/\s+&&\s+/, 1)[0].trim();
  if (!invocation) throw new Error('No test paths in Engine test command');
  return invocation.split(/\s+/);
}
