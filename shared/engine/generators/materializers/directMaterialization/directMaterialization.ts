/**
 * Internal single-invocation handoff between an isolated entrypoint loader and
 * build-only materializers. This is orchestration, not a security boundary:
 * an untrusted executable must run outside the trusted publisher process.
 */
type Execution = {
  operation: string;
  options: unknown;
  attempts: number;
  result?: unknown;
  completed: boolean;
  onInput?: (input: unknown) => unknown;
};
let active: Execution | undefined;

/** Load precisely one authored entrypoint, retaining only its materialization result. */
export async function executeMaterializerEntrypoint<Result>(
  operation: string,
  options: unknown,
  load: () => Promise<unknown>,
  onInput?: (input: unknown) => unknown,
): Promise<Result> {
  if (active) throw new Error('Nested materializer execution is not supported');
  const execution: Execution = { operation, options, attempts: 0, completed: false, onInput };
  active = execution;
  try {
    await load();
    if (execution.attempts !== 1 || !execution.completed)
      throw new Error('Entrypoint must complete exactly one materializer invocation');
    return execution.result as Result;
  } finally {
    active = undefined;
  }
}

/** Explicit options remain available to trusted programmatic callers outside the loader. */
export function invokeMaterializer<Options, Result>(
  operation: string,
  options: Options | undefined,
  materialize: (options: Options) => Result,
  input?: unknown,
): Result {
  if (!active) {
    if (options === undefined) throw new Error('Materializer requires an isolated execution context');
    return materialize(options);
  }
  active.attempts++;
  if (active.attempts !== 1 || active.operation !== operation || options !== undefined)
    throw new Error('Entrypoint must invoke only its authorized materializer without execution options');
  const executionOptions = active.onInput ? active.onInput(input) : active.options;
  const result = materialize(executionOptions as Options);
  active.result = result;
  active.completed = true;
  return result;
}
