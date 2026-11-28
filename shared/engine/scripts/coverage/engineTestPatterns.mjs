/** Collect patterns from every chained Node test invocation, ignoring other commands. */
export function engineTestPatterns(command) {
  if (typeof command !== 'string') throw new Error('Missing Engine test command');
  const invocations = [...command.matchAll(/(?:^|\s+&&\s+)node --test\s+([^&\n]+)/g)];
  if (!invocations.length) throw new Error('Unsupported Engine test command: expected existing node --test invocation');
  return invocations.flatMap(match => {
    const invocation = match[1].trim();
    if (!invocation) throw new Error('No test paths in Engine test command');
    return invocation.split(/\s+/);
  });
}
