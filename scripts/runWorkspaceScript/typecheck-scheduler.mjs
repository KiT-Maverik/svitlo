/**
 * @fileoverview Shared bounded TypeScript-check scheduling for FastGate and
 * exhaustive root checks. Callers must finish all dependency builds before
 * starting concurrent checks; never run package-build-reuse state writes here.
 */
export function partitionBuildMutatingHosts(targets) {
  const mutatingHosts = new Set(['@svitlo/web', '@svitlo/mobile']);
  return {
    parallel: targets.filter(name => !mutatingHosts.has(name)),
    sequential: targets.filter(name => mutatingHosts.has(name)),
  };
}

/** Run every check, report every failure, and never exceed the bounded pool. */
export async function runParallelTypechecks(targets, check, { parallelism = 2, context = 'Typecheck' } = {}) {
  if (!Number.isInteger(parallelism) || parallelism < 1 || parallelism > 8) {
    throw new Error(context + ' parallelism must be an integer from 1 to 8');
  }
  let index = 0;
  const failures = new Array(targets.length);
  async function worker() {
    while (index < targets.length) {
      const current = index++;
      const name = targets[current];
      try {
        await check(name);
      } catch (error) {
        failures[current] = name + ': ' + (error instanceof Error ? error.message : String(error));
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(parallelism, targets.length) }, () => worker()));
  const errors = failures.filter(Boolean);
  if (errors.length) throw new Error(context + ' failed workspaces:\n' + errors.join('\n'));
}
