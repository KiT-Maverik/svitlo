import assert from 'node:assert/strict';
import test from 'node:test';

import ts from 'typescript';

import { materializeQuestSection } from './questSection';

const id = (n: string) => '12345678-1234-4234-8234-1234567890' + n;
const q = () => ({
  id: id('01'),
  slug: 'mission',
  type: 'quest',
  params: {},
  locale: { title: { en: 'Mission', uk: 'Місія' }, navigationLabel: '1' },
  stages: { start: { id: id('02'), slug: 'start', type: 'questStage' } },
  tasks: { start: { id: id('03'), slug: 'start', type: 'questTask' } },
});
const render = (config: { slug: string }, ctx: { directory: string; languagesImport: string }) => ({
  ...(assert.equal(ctx.languagesImport, '../../../../languages'), {}),
  exportName: config.slug,
  files: [{ path: ctx.directory + '/index.ts', kind: 'typescript' as const, content: '//owned' }],
  diagnostics: [],
});
test('Quest Section: independent start maps, no invented order, Build-only blocker', () => {
  const ctx = {
    documentLanguage: 'en',
    directory: 'sections/mission',
    languagesImport: '../../languages',
    renderStage: render,
    renderTask: render,
  };
  const first = materializeQuestSection(q() as Parameters<typeof materializeQuestSection>[0], ctx);
  assert.deepEqual(materializeQuestSection(q() as Parameters<typeof materializeQuestSection>[0], ctx), first);
  assert.ok(first.files.every(file => !file.path.endsWith('/specification.md')));
  const src = first.files.at(-1)?.content ?? '';
  const parsed = ts.transpileModule(src, {
    reportDiagnostics: true,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  assert.equal(
    parsed.diagnostics?.filter(issue => issue.category === ts.DiagnosticCategory.Error).length ?? 0,
    0,
    'generated TS must parse without errors',
  );
  assert.match(src, /defineQuestSection<"mission", typeof stages, typeof tasks, typeof languages>/);
  assert.match(src, /import \{ stages \} from "\.\/stages"/);
  assert.match(src, /import \{ tasks \} from "\.\/tasks"/);
  for (const category of ['stages', 'tasks'] as const) {
    const map = first.files.find(file => file.path === 'sections/mission/' + category + '.ts')?.content ?? '';
    assert.match(map, /import \{ start \} from "\.\/(stages|tasks)\/start"/);
    assert.match(map, /export const (stages|tasks) = \{\s*start,?\s*\}/);
    assert.doesNotMatch(map, / as child_/);
  }
  assert.match(src, /TODO \(BLOCKER\).*Build-only/);
  assert.doesNotMatch(src, /"order"/);
  assert.match(src, /"en": "Mission"/);
  assert.doesNotMatch(src, /"uk": "Місія"/);
  assert.deepEqual(
    first.files
      .slice(0, 2)
      .map(f => f.path)
      .sort(),
    ['sections/mission/stages/start/index.ts', 'sections/mission/tasks/start/index.ts'].sort(),
  );
});
test('Quest Section: cannot omit start or introduce artificial order', () => {
  const x = { ...q(), tasks: {} };
  assert.throws(
    () =>
      materializeQuestSection(x as Parameters<typeof materializeQuestSection>[0], {
        documentLanguage: 'en',
        languagesImport: '../../languages',
        renderStage: render,
        renderTask: render,
      }),
    /mandatory start/,
  );
});

test('Quest Section: reviewed production notes require methodology handoff without sidecar files', () => {
  const rendered = materializeQuestSection(q() as Parameters<typeof materializeQuestSection>[0], {
    documentLanguage: 'en',
    directory: 'sections/mission',
    languagesImport: '../../languages',
    renderStage: render,
    renderTask: render,
    production: { sequenceReason: 'Keep the reviewed order.' },
  });
  assert.ok(rendered.files.every(file => !file.path.endsWith('/specification.md')));
  assert.ok(rendered.diagnostics.some(d => d.code === 'pending-quest-methodology'));
});
