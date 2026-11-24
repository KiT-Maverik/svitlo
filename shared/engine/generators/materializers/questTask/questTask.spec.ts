import assert from 'node:assert/strict';
import ts from 'typescript';
import test from 'node:test';
import { materializeQuestTask } from './questTask';
const id = (n: string) => '12345678-1234-4234-8234-1234567890' + n;
test('Quest Task: one Scene delegation, typed import and a visible pending blocker', () => {
  const out = materializeQuestTask(
    {
      id: id('01'),
      slug: 'start',
      type: 'questTask',
      scene: { config: { id: id('02'), slug: 'interactive', type: 'scene' }, production: { pending: true } },
    } as Parameters<typeof materializeQuestTask>[0],
    {
      documentLanguage: 'en',
      directory: 'tasks/start',
      languagesImport: '../../languages',
      renderScene: (child, ctx) => ({
        ...(assert.equal(ctx.languagesImport, '../../../languages'), {}),
        exportName: child.slug,
        files: [{ path: ctx.directory + '/index.ts', kind: 'typescript', content: '//scene' }],
        diagnostics: [],
      }),
    },
  );
  const src = out.files.at(-1)?.content ?? '';
  const parsed = ts.transpileModule(src, {
    reportDiagnostics: true,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  assert.equal(
    parsed.diagnostics?.filter(issue => issue.category === ts.DiagnosticCategory.Error).length ?? 0,
    0,
    'generated TS must parse without errors',
  );
  assert.match(src, /defineTask<"start", typeof languages>/);
  assert.match(src, /TODO \(BLOCKER\)/);
  assert.match(src, /child_scene/);
  assert.equal(out.files[0].path, 'tasks/start/scene/index.ts');
});
test('Quest Task: rejects a non-Scene child', () => {
  assert.throws(
    () =>
      materializeQuestTask(
        {
          id: id('01'),
          slug: 'start',
          type: 'questTask',
          scene: { id: id('02'), slug: 'wrong', type: 'video' },
        } as Parameters<typeof materializeQuestTask>[0],
        {
          documentLanguage: 'en',
          languagesImport: './languages',
          renderScene: () => {
            throw Error('must not execute');
          },
        },
      ),
    /exactly one Scene/,
  );
});

test('Quest Task retains reviewed narrative notes without specification sidecar', () => {
  const out = materializeQuestTask(
    { id: id('01'), slug: 'start', type: 'questTask', scene: { id: id('02'), slug: 'interactive', type: 'scene' } }
      as Parameters<typeof materializeQuestTask>[0],
    {
      documentLanguage: 'en',
      directory: 'tasks/start',
      languagesImport: '#lessonsData/c/example/constants',
      production: { specification: 'Do not discard the learner choice.' },
      renderScene: (child, ctx) => ({
        exportName: child.slug,
        files: [{ path: ctx.directory + '/index.ts', kind: 'typescript', content: '//scene' }],
        diagnostics: [],
      }),
    },
  );
  assert(!out.files.some(file => file.path.endsWith('specification.md')));
  assert.match(out.files.find(file => file.path === 'tasks/start/index.ts')?.content ?? '', /Do not discard the learner choice/);
  assert(out.diagnostics.some(item => item.code === 'pending-quest-child-notes'));
});
