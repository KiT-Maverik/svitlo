import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import ts from 'typescript';
import { main, runOne, renderSceneFiles, sceneSymbols } from './sceneScaffolding.mjs';

const sceneId = '11111111-1111-4111-8111-11111111111a';
const anotherId = '22222222-2222-4222-8222-22222222222b';

function fixture(t) {
  const repo = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-scene-scaffold-'));
  t.after(() => fs.rmSync(repo, { recursive: true, force: true }));
  const book = path.join(repo, 'content/playground');
  const source = path.join(book, 'data/lessons/0/33333333-3333-4333-8333-333333333330');
  fs.mkdirSync(source, { recursive: true });
  fs.mkdirSync(path.join(book, 'scenes'), { recursive: true });
  for (const filename of ['createSceneRegistry.ts', 'sceneLoader.ts'])
    fs.writeFileSync(path.join(book, 'scenes', filename), '');
  fs.writeFileSync(
    path.join(book, 'package.json'),
    JSON.stringify({
      name: '@svitlo/playground',
      exports: { './scenes': {} },
      scripts: { 'content:generate:scenes': 'node registry.mjs' },
      dependencies: { react: '1', '@svitlo/engine': '1', '@svitlo/ui-kit': '1' },
      devDependencies: { vitest: '1' },
    }),
  );
  fs.writeFileSync(
    path.join(book, 'tsconfig.json'),
    JSON.stringify({ include: ['data/**/*.ts', 'scenes/**/*.ts', 'scenes/**/*.tsx'] }),
  );
  const scene = (id, slug, specification) => ({
    config: {
      id,
      slug,
      type: 'scene',
      params: {},
      locale: { value: { instruction: { uk: 'Порівняй', en: 'Do not duplicate' } } },
    },
    production: { specification },
  });
  const config = {
    config: {
      id: '33333333-3333-4333-8333-333333333330',
      slug: 'lessonOne',
      type: 'lesson',
      section: {
        items: {
          intro: {
            config: {
              id: '44444444-4444-4444-8444-444444444444',
              slug: 'intro',
              type: 'content',
              content: {
                items: { CompareGroupsScene: scene(sceneId, 'CompareGroupsScene', '# Original instruction\n') },
                order: ['CompareGroupsScene'],
              },
            },
          },
        },
        order: ['intro'],
      },
    },
    production: { documentLanguage: 'uk' },
  };
  const save = () => {
    const sources = path.join(source, 'sections');
    fs.rmSync(sources, { recursive: true, force: true });
    fs.mkdirSync(sources, { recursive: true });
    fs.writeFileSync(path.join(source, 'index.ts'), "export const lesson = 'materialized';\n");
    fs.writeFileSync(path.join(source, 'workflow.stage2.ts'), "export const review = 'verified';\n");
    fs.writeFileSync(
      path.join(source, 'languages.ts'),
      'export const languages = [' +
        JSON.stringify(config.production.documentLanguage) +
        '] as const satisfies SupportedLanguages;\n',
    );
    const nodes = [];
    function collect(value) {
      if (!value || typeof value !== 'object') return;
      if (value.config?.type === 'scene') nodes.push(value);
      for (const entry of Object.values(value)) collect(entry);
    }
    collect(config.config.section);
    nodes.forEach((node, index) => {
      const target = path.join(sources, 'nested', 'scene-' + index);
      fs.mkdirSync(target, { recursive: true });
      fs.writeFileSync(
        path.join(target, 'index.ts'),
        "import { defineScene } from '@svitlo/engine/build';\n" +
          'export const authoredScene = defineScene(' +
          JSON.stringify(node.config, null, 2) +
          ');\n',
      );
      if (typeof node.production?.specification === 'string' && node.production.specification.trim())
        fs.writeFileSync(path.join(target, 'specification.md'), node.production.specification);
    });
  };
  save();
  const folder = id => path.join(book, 'scenes', id.at(-1), id);
  const authoredSceneModule = () => path.join(source, 'sections/nested/scene-0/index.ts');
  return { repo, book, source, config, save, folder, scene, authoredSceneModule };
}

test('PascalCase Scene naming supports legacy lowerCamelCase and separates Configurator symbols', () => {
  assert.deepEqual(sceneSymbols('CompareGroupsScene'), {
    component: 'CompareGroupsScene',
    configurator: 'CompareGroupsSceneConfig',
  });
  assert.deepEqual(sceneSymbols('lightRayDiagram'), {
    component: 'LightRayDiagram',
    configurator: 'LightRayDiagramConfig',
  });
  for (const bad of ['../break', 'Scene-Name', 'two words', '_private', 'étiquette', ''])
    assert.throws(() => sceneSymbols(bad), /Unsafe Scene slug/);
});

test('generates six stable type-correct Scene files with embedded reviewed specification and blockers', t => {
  const f = fixture(t);
  const one = runOne(f.source, 'generate', f.repo);
  assert.deepEqual(one, [{ id: sceneId, changed: 6, skipped: false }]);
  const folder = f.folder(sceneId);
  const names = [
    'index.ts',
    'CompareGroupsScene.tsx',
    'CompareGroupsScene.module.css',
    'CompareGroupsScene.stories.tsx',
    'CompareGroupsScene.unit.spec.tsx',
    'CompareGroupsScene.constants.ts',
  ];
  assert.deepEqual(fs.readdirSync(folder).sort(), names.sort());
  const output = fs.readFileSync(path.join(folder, 'CompareGroupsScene.tsx'), 'utf8');
  assert.match(output, /ContentBlock_Scene_Props\['locale'\]\['value'\]/);
  assert.match(output, /\/\/ # Original instruction/);
  assert.match(output, /TODO \(BLOCKER\)/);
  assert.doesNotMatch(output, /sceneImplementationRequired|sceneSourceLocaleRequired/);
  assert.doesNotMatch(output, /Do not duplicate|Порівняй|as any|@ts-ignore/);
  const constants = fs.readFileSync(path.join(folder, 'CompareGroupsScene.constants.ts'), 'utf8');
  assert.match(constants, /export const testIds/);
  assert.doesNotMatch(constants, /ariaLabel|label:/i);
  for (const name of names.filter(x => x.endsWith('.ts') || x.endsWith('.tsx'))) {
    const filepath = path.join(folder, name);
    const ast = ts.createSourceFile(
      name,
      fs.readFileSync(filepath, 'utf8'),
      ts.ScriptTarget.Latest,
      true,
      name.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );
    assert.deepEqual(ast.parseDiagnostics, [], name);
  }
  const program = ts.createProgram(
    [path.join(folder, 'CompareGroupsScene.tsx'), path.join(folder, 'CompareGroupsScene.stories.tsx')],
    {
      strict: true,
      noEmit: true,
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      skipLibCheck: true,
    },
  );
  const unresolved = ts
    .getPreEmitDiagnostics(program)
    .filter(d => d.code === 2304)
    .map(d => ts.flattenDiagnosticMessageText(d.messageText, ' '));
  assert.deepEqual(unresolved, [], 'Scene draft must never depend on intentionally unresolved symbols');
  assert.equal(runOne(f.source, 'check', f.repo)[0].changed, 0);
});

test('repeated creation SKIPs edited and partial scenes without overwriting any bytes', t => {
  const f = fixture(t);
  runOne(f.source, 'generate', f.repo);
  const file = path.join(f.folder(sceneId), 'CompareGroupsScene.tsx');
  fs.writeFileSync(file, 'author-edited');
  assert.deepEqual(runOne(f.source, 'generate', f.repo), [{ id: sceneId, changed: 0, skipped: true }]);
  assert.equal(fs.readFileSync(file, 'utf8'), 'author-edited');
  assert.deepEqual(
    runOne(f.source, 'check', f.repo)[0].changed,
    0,
    'check confirms presence, not immutable generated bytes of human-edited code',
  );
  fs.rmSync(path.join(f.folder(sceneId), 'index.ts'));
  assert.deepEqual(runOne(f.source, 'generate', f.repo)[0].skipped, true);
  assert.throws(() => runOne(f.source, 'check', f.repo), /Missing Scene scaffold file/);
});

test('failed staged Scene write leaves no partial UUID tree and a clean retry succeeds', t => {
  const f = fixture(t);
  const write = fs.writeFileSync;
  let stagedWrites = 0;
  try {
    fs.writeFileSync = (filename, ...args) => {
      if (String(filename).includes('.stage-') && ++stagedWrites === 3) throw new Error('simulated disk write failure');
      return write(filename, ...args);
    };
    assert.throws(() => runOne(f.source, 'generate', f.repo), /simulated disk write failure/);
  } finally {
    fs.writeFileSync = write;
  }
  assert.equal(fs.existsSync(f.folder(sceneId)), false, 'the final Scene must not be partial');
  const parent = path.dirname(f.folder(sceneId));
  assert.deepEqual(fs.readdirSync(parent), [], 'temporary files and exclusive lease are cleaned up');
  assert.deepEqual(runOne(f.source, 'generate', f.repo), [{ id: sceneId, changed: 6, skipped: false }]);
  assert.equal(runOne(f.source, 'check', f.repo)[0].changed, 0);
});

test('exclusive Scene lease refuses races without deleting the existing owner', t => {
  const f = fixture(t);
  const parent = path.dirname(f.folder(sceneId));
  fs.mkdirSync(parent, { recursive: true });
  const lease = path.join(parent, '.' + sceneId + '.lock');
  fs.writeFileSync(lease, 'a competing writer');
  assert.throws(() => runOne(f.source, 'generate', f.repo), /EEXIST/);
  assert.equal(fs.readFileSync(lease, 'utf8'), 'a competing writer');
  assert.equal(fs.existsSync(f.folder(sceneId)), false);
  fs.unlinkSync(lease);
  assert.equal(runOne(f.source, 'generate', f.repo)[0].changed, 6);
});

test('supports recursive Carousel/Quest Scenes and selected Scene IDs, without implicit registration', t => {
  const f = fixture(t);
  const extra = f.scene(anotherId, 'demoScene', 'An independently approved specification');
  f.config.config.section.items.intro.config.content.items.gallery = {
    config: {
      id: '55555555-5555-4555-8555-555555555555',
      type: 'carousel',
      slug: 'gallery',
      slides: { items: { demoScene: extra }, order: ['demoScene'] },
    },
  };
  f.save();
  const selected = runOne(f.source, 'generate', f.repo, anotherId);
  assert.equal(selected[0].id, anotherId);
  assert.equal(fs.existsSync(f.folder(sceneId)), false);
  assert.equal(fs.existsSync(path.join(f.folder(anotherId), 'DemoScene.tsx')), true);
  assert.equal(fs.readFileSync(path.join(f.book, 'scenes/sceneLoader.ts'), 'utf8'), '');
  assert.equal(runOne(f.source, 'generate', f.repo).filter(x => x.changed).length, 1);
});

test('rejects unsafe/duplicate identities and missing production specs before writing any scene', t => {
  const f = fixture(t);
  const second = f.scene(anotherId, 'demoScene', '');
  f.config.config.section.items.intro.config.content.items.demoScene = second;
  f.save();
  assert.throws(() => runOne(f.source, 'generate', f.repo), /needs production.specification/);
  assert.equal(fs.existsSync(f.folder(sceneId)), false);
  second.production.specification = 'Scene spec';
  second.config.slug = 'CompareGroupsScene';
  f.save();
  assert.equal(
    renderSceneFiles({
      id: anotherId,
      slug: 'CompareGroupsScene',
      documentLanguage: 'uk',
      specification: 'Reviewed',
    }).has('CompareGroupsScene.tsx'),
    true,
    'same component name is safe in independent UUID directories',
  );
  second.config.slug = '../traversal';
  f.save();
  assert.throws(() => runOne(f.source, 'generate', f.repo), /Unsafe Scene slug/);
  second.config.slug = 'demoScene';
  second.config.id = sceneId;
  f.save();
  assert.throws(() => runOne(f.source, 'generate', f.repo), /Duplicate Scene (UUID|production identity)/);
});

test('rejects invalid textbook setup, symlinks, malformed typed source, and unsafe inputs', t => {
  const f = fixture(t);
  const manifest = path.join(f.book, 'package.json');
  const old = fs.readFileSync(manifest, 'utf8');
  fs.writeFileSync(manifest, JSON.stringify({ name: '@svitlo/playground' }));
  assert.throws(() => runOne(f.source, 'generate', f.repo), /not Scene-ready/);
  fs.writeFileSync(manifest, old);
  fs.writeFileSync(f.authoredSceneModule(), 'export const invalid = {\n');
  assert.throws(() => runOne(f.source, 'generate', f.repo));
  f.save();
  const output = f.folder(sceneId);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.symlinkSync(f.book, output, 'dir');
  assert.throws(() => runOne(f.source, 'generate', f.repo), /Refusing symlink/);
  assert.throws(() => runOne(path.join(f.repo, 'outside.ts'), 'generate', f.repo));
});

test('rejects unsafe source-language strings instead of injecting them into TS comments', t => {
  const f = fixture(t);
  f.config.production.documentLanguage = 'uk\nconst arbitrary = true';
  f.save();
  assert.throws(() => runOne(f.source, 'generate', f.repo), /reviewed source language/);
  assert.equal(fs.existsSync(f.folder(sceneId)), false);
});

test('CLI only acts on an explicit source and select option', t => {
  const f = fixture(t);
  assert.throws(() => main(['generate'], f.repo), /explicit --source/);
  assert.throws(() => main(['generate', '--source', f.source, '--unknown', 'x'], f.repo), /Usage/);
  const result = main(['generate', '--source', f.source, '--scene-id', sceneId], f.repo);
  assert.equal(result.length, 1);
  assert.equal(result[0].changed, 6);
});

test('rendered files are deterministic and no Scene scaffolding edits Lesson data', t => {
  const f = fixture(t);
  const configBefore = fs.readFileSync(f.authoredSceneModule(), 'utf8');
  const scene = { id: sceneId, component: 'DemoScene', specification: 'Spec', documentLanguage: 'qm' };
  const rendered = renderSceneFiles(scene);
  assert.deepEqual([...rendered], [...renderSceneFiles(scene)]);
  assert.deepEqual(runOne(f.source, 'generate', f.repo)[0].changed, 6);
  assert.equal(fs.readFileSync(f.authoredSceneModule(), 'utf8'), configBefore);
  assert.deepEqual(
    fs.readdirSync(f.source).sort(),
    ['index.ts', 'languages.ts', 'sections', 'workflow.stage2.ts'].sort(),
  );
});

test('reads new Lesson constants.ts without a legacy languages.ts shim', t => {
  const f = fixture(t);
  const folder = path.dirname(f.source);
  fs.renameSync(path.join(folder, 'languages.ts'), path.join(folder, 'constants.ts'));
  const result = runOne(f.source, 'generate', f.repo);
  assert.equal(result[0].changed, 6);
  assert(fs.existsSync(path.join(f.folder(sceneId), 'CompareGroupsScene.tsx')));
  assert.equal(runOne(f.source, 'check', f.repo)[0].changed, 0);
  fs.writeFileSync(path.join(folder, 'languages.ts'), 'export const languages = ["en"] as const;\n');
  assert.throws(() => runOne(f.source, 'check', f.repo), /exactly one Lesson language source/);
});
