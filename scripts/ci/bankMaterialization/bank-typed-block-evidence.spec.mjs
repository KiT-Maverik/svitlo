import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { resolveReviewedBankBlockEvidence } from './bank-typed-block-evidence.mjs';

const ts = createRequire(import.meta.url)('typescript');
const sceneId = '11111111-1111-4111-8111-11111111111a';
const sceneName = 'ReviewedScene';
const imageId = '22222222-2222-4222-8222-22222222222a';
const assetName = imageId + '.svg';
const repoPath = 'content/math';
const file = (root, name, source) => {
  const target = path.join(root, name);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, source);
};
const git = (root, ...args) => execFileSync('git', ['-C', root, ...args], { encoding: 'utf8' }).trimEnd();

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-bank-evidence-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  git(root, 'init', '-q');
  git(root, 'config', 'user.name', 'Test');
  git(root, 'config', 'user.email', 'test@example.com');
  const base = repoPath + '/scenes/' + sceneId.at(-1) + '/' + sceneId;
  const spec = '# Reviewed interaction\n';
  file(
    root,
    repoPath + '/scenes/sceneLoader.ts',
    [
      'const sceneImports = {',
      '  "' + sceneId + '": () =>',
      '    import("./' + sceneId.at(-1) + '/' + sceneId + '").then(mod => ({default: mod.default})),',
      '};',
    ].join('\n'),
  );
  file(root, base + '/index.ts', 'export { ' + sceneName + ' as default } from "./' + sceneName + '";\n');
  file(
    root,
    base + '/' + sceneName + '.tsx',
    'export function ' + sceneName + '() { return <div aria-label="Reviewed interaction" />; }\n',
  );
  file(root, base + '/specification.md', spec);
  file(root, repoPath + '/assets/images/' + assetName, '<svg xmlns="http://www.w3.org/2000/svg" />\n');
  git(root, 'add', '.');
  git(root, 'commit', '-m', 'Reviewed fixture', '-q');
  const head = git(root, 'rev-parse', 'HEAD');
  const meta = {
    bank: 'questions',
    head,
    identity: { pkg: repoPath, folder: repoPath + '/data/lessons/1/11111111-1111-4111-8111-111111111111' },
  };
  const scene = () => ({
    config: { type: 'scene', id: sceneId, slug: 'visual', locale: { value: { title: { uk: 'Гра' } } }, params: {} },
    production: { specification: spec },
  });
  const image = () => ({
    config: { type: 'image', id: imageId, slug: 'diagram', locale: { fileName: assetName }, params: {} },
    production: { mediaSourcePath: repoPath + '/assets/images/' + assetName },
  });
  const input = blocks => ({
    config: {
      questions: {
        selectOneAnswer: {
          test: {
            config: { type: 'selectOneAnswer', content: { question: { items: blocks, order: Object.keys(blocks) } } },
          },
        },
      },
    },
    production: { languages: { document: 'uk', planned: ['uk'] } },
  });
  const resolve = bank => resolveReviewedBankBlockEvidence({ root, meta, input: bank, git, ts });
  return { root, base, meta, scene, image, input, resolve };
}

test('pinned Scene and local media are verified without editorial metadata', t => {
  const f = fixture(t);
  const actual = f.resolve(f.input({ visual: f.scene(), diagram: f.image() }));
  assert.deepEqual([...actual.registeredSceneIds], [sceneId]);
  assert.deepEqual([...actual.approvedMediaBlockIds], [imageId]);
});

test('changed checkout HEAD fails even without editorial review metadata', t => {
  const f = fixture(t);
  git(f.root, 'commit', '--allow-empty', '-m', 'Changed checkout', '-q');
  assert.throws(() => f.resolve(f.input({ diagram: f.image() })), /exact pinned checkout/);
});

test('stale/tampered Scene implementation, specifications, registry and media never approve', t => {
  const f = fixture(t);
  const good = f.input({ visual: f.scene(), diagram: f.image() });
  const implementation = f.base + '/' + sceneName + '.tsx';
  file(f.root, implementation, 'export const x = sceneImplementationRequired;\n');
  assert.throws(() => f.resolve(good), /changed since reviewed HEAD/);
  git(f.root, 'checkout', '--', implementation);
  const noSpec = structuredClone(good);
  noSpec.config.questions.selectOneAnswer.test.config.content.question.items.visual.production.specification =
    'forged spec';
  assert.throws(() => f.resolve(noSpec), /specification is not the exact/);
  const wrongMedia = structuredClone(good);
  wrongMedia.config.questions.selectOneAnswer.test.config.content.question.items.diagram.production.mediaSourcePath =
    '/tmp/escape';
  assert.throws(() => f.resolve(wrongMedia), /mediaSourcePath differs/);
  const image = repoPath + '/assets/images/' + assetName;
  fs.rmSync(path.join(f.root, image));
  fs.symlinkSync(path.join(f.root, implementation), path.join(f.root, image));
  assert.throws(() => f.resolve(good), /Symlink/);
});

test('unresolved media scaffolds remain distinct from verified assets', t => {
  const f = fixture(t);
  const noAsset = f.image();
  noAsset.config.locale.fileName = '00000000-0000-0000-0000-000000000000.webp';
  delete noAsset.production.mediaSourcePath;
  const placeholder = f.resolve(f.input({ diagram: noAsset }));
  assert.deepEqual([...placeholder.unresolvedMediaBlockIds], [imageId]);
  assert.deepEqual([...placeholder.approvedMediaBlockIds], []);
  noAsset.config.locale.fileName = '99999999-9999-4999-8999-999999999999.svg';
  const planned = f.resolve(f.input({ diagram: noAsset }));
  assert.deepEqual([...planned.unresolvedMediaBlockIds], [imageId]);
  assert.deepEqual([...planned.approvedMediaBlockIds], []);
  const remote = f.image();
  remote.config.locale.fileName = 'https://cdn.example.org/image.svg';
  remote.production.mediaSourcePath = undefined;
  assert.deepEqual([...f.resolve(f.input({ diagram: remote })).approvedMediaBlockIds], [imageId]);
  remote.config.locale.fileName = 'http://cdn.example.org/image.svg';
  assert.throws(() => f.resolve(f.input({ diagram: remote })), /requires reviewed HTTPS/);
});

test('missing media field is an unresolved source scaffold, never an approved asset', t => {
  const f = fixture(t);
  const missing = f.image();
  delete missing.config.locale.fileName;
  delete missing.production.mediaSourcePath;
  const proof = f.resolve(f.input({ diagram: missing }));
  assert.deepEqual([...proof.approvedMediaBlockIds], []);
  assert.deepEqual([...proof.unresolvedMediaBlockIds], [imageId]);
  const spoofed = f.image();
  spoofed.config.locale.fileName = '../escape.svg';
  delete spoofed.production.mediaSourcePath;
  assert.throws(() => f.resolve(f.input({ diagram: spoofed })), /Invalid reviewed UUID/);
});

test('missing Scene registry entry yields a Question-only TODO scaffold, not approval', t => {
  const f = fixture(t);
  const registry = repoPath + '/scenes/sceneLoader.ts';
  file(f.root, registry, 'const sceneImports = {};\n');
  git(f.root, 'add', registry);
  git(f.root, 'commit', '-m', 'Not implemented yet', '-q');
  f.meta.head = git(f.root, 'rev-parse', 'HEAD');
  const proof = f.resolve(f.input({ visual: f.scene() }));
  assert.deepEqual([...proof.registeredSceneIds], []);
  assert.deepEqual([...proof.unregisteredSceneIds], [sceneId]);
  f.meta.bank = 'flashcards';
  const flashcardSource = f.input({ visual: f.scene() });
  flashcardSource.production.lesson = { languages: { document: 'uk', planned: ['uk'] } };
  assert.throws(() => f.resolve(flashcardSource), /Unresolved reviewed Flashcard Scene/);
});

test('Lesson Scene scaffolds are pending until registered and implemented, without a specification sidecar', t => {
  const f = fixture(t);
  const specPath = f.base + '/specification.md';
  const tsx = f.base + '/' + sceneName + '.tsx';
  fs.rmSync(path.join(f.root, specPath));
  file(f.root, tsx, [
    '// TODO (BLOCKER): Implement reviewed Scene.',
    '// BEGIN REVIEWED SCENE SPECIFICATION',
    '// # Reviewed interaction',
    '// END REVIEWED SCENE SPECIFICATION',
    'export function ' + sceneName + '() { return <div />; }',
  ].join('\n') + '\n');
  git(f.root, 'add', '-A');
  git(f.root, 'commit', '-m', 'Lesson Stage 6 Scene draft without sidecar', '-q');
  f.meta.head = git(f.root, 'rev-parse', 'HEAD');
  const draft = f.resolve(f.input({ visual: f.scene() }));
  assert.deepEqual([...draft.unregisteredSceneIds], [sceneId]);
  assert.deepEqual([...draft.registeredSceneIds], []);

  file(f.root, tsx, 'export function ' + sceneName + '() { return <div aria-label="Reviewed interaction" />; }\n');
  git(f.root, 'add', '-A');
  git(f.root, 'commit', '-m', 'Implement Scene after Lesson Stage 6', '-q');
  f.meta.head = git(f.root, 'rev-parse', 'HEAD');
  const released = f.resolve(f.input({ visual: f.scene() }));
  assert.deepEqual([...released.registeredSceneIds], [sceneId]);
  assert.deepEqual([...released.unregisteredSceneIds], []);

  const altered = f.scene();
  altered.production.specification = 'Unreviewed bank request';
  // With no sidecar, the SHA-pinned Question Bank source is the proof of
  // reviewed specification; the Scene implementation is independently pinned.
  assert.deepEqual([...f.resolve(f.input({ visual: altered })).registeredSceneIds], [sceneId]);
});

test('Scene registry can be absent for a Question draft, but tracked or symlinked evidence cannot be spoofed', t => {
  const f = fixture(t);
  const registry = repoPath + '/scenes/sceneLoader.ts';
  fs.rmSync(path.join(f.root, registry));
  git(f.root, 'add', '-A');
  git(f.root, 'commit', '-m', 'No Scene registry authored', '-q');
  f.meta.head = git(f.root, 'rev-parse', 'HEAD');
  assert.deepEqual([...f.resolve(f.input({ visual: f.scene() })).unregisteredSceneIds], [sceneId]);
  fs.symlinkSync(path.join(f.root, f.base, 'index.ts'), path.join(f.root, registry));
  assert.throws(() => f.resolve(f.input({ visual: f.scene() })), /Symlink/);
});

test('valid but absent media remains unresolved; missing tracked media and unsafe links are rejected', t => {
  const f = fixture(t);
  const planned = f.image();
  planned.config.locale.fileName = '99999999-9999-4999-8999-999999999999.svg';
  delete planned.production.mediaSourcePath;
  const proof = f.resolve(f.input({ diagram: planned }));
  assert.deepEqual([...proof.unresolvedMediaBlockIds], [imageId]);
  assert.deepEqual([...proof.approvedMediaBlockIds], []);
  const original = repoPath + '/assets/images/' + assetName;
  fs.rmSync(path.join(f.root, original)); // tracked but missing
  assert.throws(() => f.resolve(f.input({ diagram: f.image() })), /Tracked reviewed resource missing/);
});

test('Youtube URL is reviewed statically and never triggers a network call', t => {
  const f = fixture(t);
  const youtube = {
    config: {
      type: 'youtube',
      id: imageId,
      slug: 'explanation',
      locale: { href: { uk: 'https://www.youtube.com/watch?v=abcdefgh' } },
      params: { mode: 'link' },
    },
  };
  assert.deepEqual([...f.resolve(f.input({ video: youtube })).approvedMediaBlockIds], [imageId]);
  youtube.config.locale.href.uk = 'https://attacker.invalid/watch?v=x';
  assert.throws(() => f.resolve(f.input({ video: youtube })), /Unverified Youtube host/);
});
