import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { materializeSkill } from './materialize.mjs';
const ts = createRequire(import.meta.url)('typescript');
const ID = '89d2e806-53ed-4370-ab47-b0c60d96a3c5';
const example = () => ({
  id: ID,
  slug: 'example',
  name: { uk: 'Уміння', en: 'Skill' },
  description: { methodological: 'Competency', frontend: { uk: 'Опис', en: 'Description' } },
});
test('skill preserves identity, approved language, production specification and deterministic TS', () => {
  const input = {
    config: example(),
    production: { methodology: 'Reviewed methodology', plannedLanguages: ['uk', 'en'] },
  };
  const first = materializeSkill(input, { sourceLanguage: 'uk' });
  const code = first.files.find(file => file.path === 'index.ts').content;
  assert.match(code, /export const example = defineSkill/);
  assert.match(code, /TODO \(BLOCKER\)/);
  assert.ok(first.files.some(file => file.path === 'methodology.md'));
  assert.equal(
    ts.createSourceFile('index.ts', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS).parseDiagnostics.length,
    0,
  );
  assert.deepEqual(materializeSkill(input, { sourceLanguage: 'uk' }), first);
});
test('skill refuses fake identity and path traversal', () => {
  assert.throws(() => materializeSkill({ ...example(), id: undefined }, { sourceLanguage: 'uk' }), /immutable UUID/);
  assert.throws(() => materializeSkill({ ...example(), slug: '../bad' }, { sourceLanguage: 'uk' }), /unsafe slug/);
});

test('Skill can emit a canonical sibling module while keeping its own identity and sidecars', () => {
  const source = materializeSkill(
    { config: example(), production: { methodology: 'Reviewed skill rationale' } },
    {
      sourceLanguage: 'uk',
      directory: 'domain/group',
      entryFilename: 'example.ts',
      identityDirectory: 'domain/group/example',
      sidecarDirectory: 'domain/group/example',
    },
  );
  assert(source.files.some(file => file.path === 'domain/group/example.ts'));
  assert(source.files.some(file => file.path === 'domain/group/example/methodology.md'));
  assert(!source.files.some(file => file.path === 'domain/group/example/index.ts'));
});
test('skill rejects escaped destination directories', () => {
  assert.throws(
    () => materializeSkill(example(), { sourceLanguage: 'uk', directory: '../unsafe' }),
    /unsafe generated directory/,
  );
});
