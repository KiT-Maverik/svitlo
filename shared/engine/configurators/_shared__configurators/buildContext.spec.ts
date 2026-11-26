import assert from 'node:assert/strict';
import test, { describe } from 'node:test';
import type { PublicationLanguageOptions } from '#types';

import {
  buildChildOverrides,
  buildChildProps,
  requireBuildContext,
  runWithBuildContext,
  scopeBuild,
} from './buildContext';

describe('Configurators', () => {
  describe('Build', () => {
    describe('Build Context', () => {
test('Build Context defaults to production and freezes an independently copied language selection', () => {
  const languages: ('en' | 'uk')[] = ['en'];
  const seen = runWithBuildContext({ languages }, context => {
    assert.equal(context.mode, 'production');
    assert.deepEqual(context.languages, ['en']);
    assert.ok(Object.isFrozen(context));
    assert.ok(Object.isFrozen(context.languages));
    languages.push('uk');
    assert.deepEqual(requireBuildContext().languages, ['en']);
    return context;
  });
  assert.deepEqual(seen.languages, ['en']);
  assert.throws(() => requireBuildContext(), /No active Build Context/);
});

test('Build Context rejects invalid languages and modes before invoking a builder', () => {
  let called = false;
  const action = () => { called = true; };
  assert.throws(() => runWithBuildContext({ languages: [] } as unknown as PublicationLanguageOptions, action), /nonempty languages/);
  assert.throws(() => runWithBuildContext({ languages: ['en', 'en'] }, action), /must be unique/);
  assert.throws(
    () => runWithBuildContext({ languages: ['en'], mode: 'invalid' as 'draft' }, action),
    /Invalid Build mode/,
  );
  assert.equal(called, false);
});

test('Child helpers use the active immutable context and public Build signatures stay required', () => {
  const calls: string[] = [];
  const child = {
    build: scopeBuild({
      props: (options: { readonly languages: readonly ('en' | 'uk')[]; readonly mode?: 'draft' | 'production' }) => {
        calls.push(options.mode ?? 'production');
        return { languages: [...options.languages], mode: options.mode ?? 'production' };
      },
      overrides: (_patch: { title?: string }, options: { readonly languages: readonly ('en' | 'uk')[]; readonly mode?: 'draft' | 'production' }) => ({
        mode: options.mode,
        languages: [...options.languages],
      }),
    }),
  };
  assert.throws(() => buildChildProps(child), /No active Build Context/);
  assert.throws(() => (child.build.props as (options?: unknown) => unknown)(), /nonempty languages/);
  const result = runWithBuildContext({ languages: ['uk'], mode: 'draft' }, () => ({
    child: buildChildProps(child),
    patch: buildChildOverrides(child, { title: 'test' }),
  }));
  assert.deepEqual(result.child, { languages: ['uk'], mode: 'draft' });
  assert.deepEqual(result.patch, { languages: ['uk'], mode: 'draft' });
  assert.deepEqual(calls, ['draft']);
  assert.deepEqual(child.build.props({ languages: ['en'] }), { languages: ['en'], mode: 'production' });
  if (false) {
    // @ts-expect-error Published Build entrypoint still requires languages.
    child.build.props();
  }
});

test('Nested different explicit options restore outer scope after success and thrown errors', () => {
  runWithBuildContext({ languages: ['en'], mode: 'draft' }, () => {
    const parent = requireBuildContext();
    runWithBuildContext({ languages: ['uk'] }, () => {
      assert.equal(requireBuildContext().mode, 'production');
      assert.deepEqual(requireBuildContext().languages, ['uk']);
    });
    assert.equal(requireBuildContext(), parent);
    assert.throws(
      () => runWithBuildContext({ languages: ['uk'] }, () => { throw new Error('boom'); }),
      /boom/,
    );
    assert.equal(requireBuildContext(), parent);
  });
  assert.throws(() => requireBuildContext(), /No active Build Context/);
});

test('Async operations, rejection and interleaved draft/production scopes remain isolated', async () => {
  const seen = await Promise.all([
    runWithBuildContext({ languages: ['en'], mode: 'draft' }, async () => {
      await Promise.resolve();
      assert.deepEqual(requireBuildContext().languages, ['en']);
      await assert.rejects(
        runWithBuildContext({ languages: ['uk'] }, async () => {
          await Promise.resolve();
          assert.equal(requireBuildContext().mode, 'production');
          throw new Error('rejected');
        }),
        /rejected/,
      );
      assert.equal(requireBuildContext().mode, 'draft');
      return requireBuildContext().mode;
    }),
    runWithBuildContext({ languages: ['uk'] }, async () => {
      await Promise.resolve();
      assert.equal(requireBuildContext().mode, 'production');
      assert.deepEqual(requireBuildContext().languages, ['uk']);
      return requireBuildContext().mode;
    }),
  ]);
  assert.deepEqual(seen, ['draft', 'production']);
  assert.throws(() => requireBuildContext(), /No active Build Context/);
});

    });
  });
});
