import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import ts from 'typescript';
import yaml from 'yaml';
import { main, runOne, renderSceneFiles, sceneSymbols, readScenes } from './sceneScaffolding.mjs';

const sceneId = '11111111-1111-4111-8111-11111111111a';
const anotherId = '22222222-2222-4222-8222-22222222222b';
const lessonId = '33333333-3333-4333-8333-333333333330';

function fixture(t) {
  const repo = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-scene-scaffold-'));
  t.after(() => fs.rmSync(repo, { recursive: true, force: true }));
  const book = path.join(repo, 'content/playground');
  const lessonDir = path.join(book, 'data/lessons/0', lessonId);
  fs.mkdirSync(lessonDir, { recursive: true });
  fs.mkdirSync(path.join(book, 'scenes'), { recursive: true });
  fs.writeFileSync(path.join(book, 'scenes/createSceneRegistry.ts'), '');
  fs.writeFileSync(path.join(book, 'scenes/sceneLoader.ts'), '');
  fs.writeFileSync(path.join(book, 'package.json'), JSON.stringify({
    name: '@svitlo/playground',
    exports: { './scenes': {} },
    scripts: { 'content:generate:scenes': 'node registry.mjs' },
    dependencies: { react: '1', '@svitlo/engine': '1', '@svitlo/ui-kit': '1' },
    devDependencies: { vitest: '1' },
  }));
  fs.writeFileSync(path.join(book, 'tsconfig.json'),
    JSON.stringify({ include: ['data/**/*.ts', 'scenes/**/*.ts', 'scenes/**/*.tsx'] }));
  const scene = (id, name, specification) => ({
    config: {
      id, slug: name, type: 'scene', params: {},
      locale: { value: { instruction: { uk: 'Порівняй', en: 'Compare' } } },
    },
    production: { specification },
  });
  const lesson = {
    config: {
      id: lessonId, slug: 'lessonOne', type: 'lesson',
      section: {
        items: {
          intro: {
            config: {
              id: '44444444-4444-4444-8444-444444444444',
              slug: 'intro', type: 'content',
              content: { items: {
                CompareGroupsScene: scene(sceneId, 'CompareGroupsScene', '# Original instruction\n'),
              }, order: ['CompareGroupsScene'] },
            },
          },
        }, order: ['intro'],
      },
    },
    production: { documentLanguage: 'uk' },
  };
  const save = () => fs.writeFileSync(path.join(lessonDir, 'lesson.yaml'), yaml.stringify(lesson));
  save();
  const folder = id => path.join(book, 'scenes', id.at(-1), id);
  return { repo, book, lessonDir, lesson, scene, save, folder };
}

test('Scene symbols are stable and reject unsafe names', () => {
  assert.deepEqual(sceneSymbols('CompareGroupsScene'),
    { component: 'CompareGroupsScene', configurator: 'CompareGroupsSceneConfig' });
  assert.deepEqual(sceneSymbols('lightRayDiagram'),
    { component: 'LightRayDiagram', configurator: 'LightRayDiagramConfig' });
  for (const bad of ['../break', 'Scene-Name', 'two words', '_private', 'étiquette', ''])
    assert.throws(() => sceneSymbols(bad), /Unsafe Scene slug/);
});

/** Type-check TS/TSX as a program with the imported public contracts stubbed. */
function compileDraft(folder, name, repo) {
  const declarations = path.join(repo, 'draft-external-types.d.ts');
  fs.writeFileSync(declarations, [
    "declare module '@svitlo/engine/runtime' {",
    "  export type ContentBlock_Scene_Props = {locale:{value:string | Record<string, unknown>}};",
    '}',
    "declare module '@svitlo/ui-kit' {",
    "  export function SceneStub(props:{locales:string | Record<string, unknown>}): import('react/jsx-runtime').JSX.Element;",
    '}',
    "declare module '*.module.css' {const styles: Record<string,string>; export default styles;}",
    "declare module 'react' {",
    '  export type ComponentProps<T> = T extends (props: infer P) => unknown ? P : never;',
    '}',
    "declare module 'react/jsx-runtime' {",
    '  export namespace JSX {',
    '    interface Element {}',
    '    interface IntrinsicElements { div: Record<string, unknown>; }',
    '  }',
    '}',
    "declare module 'vitest' {",
    '  export const describe: (name:string, callback:()=>void)=>void;',
    '  export const it: { (name:string, callback:()=>void):void; todo(name:string):void };',
    '  export const expect: (value:unknown)=>{toContain(expected:unknown):void};',
    '}',
    "declare module 'react-dom/server' {",
    '  export const renderToStaticMarkup: (node:unknown)=>string;',
    '}',
    '',
  ].join('\n'));
  const files = ['index.ts', name + '.tsx', name + '.constants.ts', name + '.stories.tsx', name + '.unit.spec.tsx']
    .map(file => path.join(folder, file));
  const program = ts.createProgram([...files, declarations], {
    strict: true, noEmit: true, jsx: ts.JsxEmit.ReactJSX,
    target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    skipLibCheck: true, types: [],
  });
  const errors = ts.getPreEmitDiagnostics(program).map(d => ts.flattenDiagnosticMessageText(d.messageText, ' '));
  assert.deepEqual(errors, [], 'generated TS/TSX compilation errors');
}

test('generates a valid accessible React stub, deterministic handoff, story/test and lazy registry', async t => {
  const f = fixture(t);
  const original = fs.readFileSync(path.join(f.lessonDir, 'lesson.yaml'), 'utf8');
  assert.deepEqual(await runOne(f.lessonDir, 'generate', f.repo),
    [{ id: sceneId, changed: 7, skipped: false }]);
  const folder = f.folder(sceneId);
  const names = [
    'index.ts', 'specification.md', 'CompareGroupsScene.tsx',
    'CompareGroupsScene.module.css', 'CompareGroupsScene.stories.tsx',
    'CompareGroupsScene.unit.spec.tsx', 'CompareGroupsScene.constants.ts',
  ];
  assert.deepEqual(fs.readdirSync(folder).sort(), names.sort());
  assert.equal(fs.readFileSync(path.join(folder, 'specification.md'), 'utf8'), '# Original instruction\n');
  const source = fs.readFileSync(path.join(folder, 'CompareGroupsScene.tsx'), 'utf8');
  assert.match(source, /import \{ SceneStub \} from '@svitlo\/ui-kit'/);
  assert.match(source, /ContentBlock_Scene_Props\['locale'\]\['value'\]/);
  assert.match(source, /TODO \(BLOCKER\): Implement Scene/);
  assert.doesNotMatch(source, /sceneImplementationRequired|sceneSourceLocaleRequired|Порівняй|as any|@ts-ignore/);
  const story = fs.readFileSync(path.join(folder, 'CompareGroupsScene.stories.tsx'), 'utf8');
  assert.match(story, /locales: \{\}/);
  assert.doesNotMatch(story, /sceneSourceLocaleRequired/);
  assert.match(fs.readFileSync(path.join(folder, 'CompareGroupsScene.unit.spec.tsx'), 'utf8'),
    /renderToStaticMarkup/);
  compileDraft(folder, 'CompareGroupsScene', f.repo);

  const loader = fs.readFileSync(path.join(f.book, 'scenes/sceneLoader.ts'), 'utf8');
  assert.match(loader, new RegExp("import\\(['\"]\\./a/" + sceneId + "['\"]\\)"));
  assert.match(loader, new RegExp("['\"]" + sceneId + "['\"]:"));
  assert.match(loader, /createSceneRegistry/);
  assert.match(fs.readFileSync(path.join(folder, 'index.ts'), 'utf8'), /as default/);
  assert.equal(fs.readFileSync(path.join(f.lessonDir, 'lesson.yaml'), 'utf8'), original);
  assert.deepEqual(await runOne(f.lessonDir, 'check', f.repo),
    [{ id: sceneId, changed: 0, skipped: false }]);
});

test('supports Scene-owned YAML without Lesson and requires explicit source-language context', async t => {
  const f = fixture(t);
  const sceneDir = path.join(f.book, 'data/scenes');
  fs.mkdirSync(sceneDir, { recursive: true });
  const source = path.join(sceneDir, 'scene.yaml');
  fs.writeFileSync(source, yaml.stringify(f.scene(anotherId, 'demoScene', 'A separately approved spec')));
  await assert.rejects(runOne(source, 'generate', f.repo), /documentLanguage/);
  assert.deepEqual(await runOne(source, 'generate', f.repo, undefined, 'qm'),
    [{ id: anotherId, changed: 7, skipped: false }]);
  assert.equal(fs.readFileSync(path.join(f.folder(anotherId), 'specification.md'), 'utf8'),
    'A separately approved spec\n');
  assert.match(fs.readFileSync(path.join(f.folder(anotherId), 'DemoScene.tsx'), 'utf8'),
    /verified qm content/);
  assert.deepEqual((await runOne(source, 'check', f.repo, undefined, 'qm')).length, 1);
});

test('discovers Course Episode Scene nodes and retains source UUID and specification', async t => {
  const f = fixture(t);
  const courseDir = path.join(f.book, 'data/courses/b/aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaab');
  fs.mkdirSync(courseDir, { recursive: true });
  const course = {
    type: 'course',
    documentLanguage: 'en',
    content: { items: {
      chapter: { type: 'chapter', content: { items: {
        episode: { type: 'episode', section: { items: {
          intro: { type: 'content', content: { items: {
            demoScene: {
              type: 'scene', id: anotherId, slug: 'demoScene', params: {},
              locale: { value: { title: { en: 'DRAFT ONLY' } } },
              production: { specification: '# Episode-specific source\nDo not invent story details.' },
            },
          }, order: ['demoScene'] } },
        }, order: ['intro'] } },
      }, order: ['episode'] } },
    }, order: ['chapter'] },
  };
  fs.writeFileSync(path.join(courseDir, 'course.yaml'), yaml.stringify(course));
  assert.deepEqual(readScenes(path.join(courseDir, 'course.yaml'))[0].id, anotherId);
  assert.deepEqual(await runOne(courseDir, 'generate', f.repo),
    [{ id: anotherId, changed: 7, skipped: false }]);
  assert.equal(fs.readFileSync(path.join(f.folder(anotherId), 'specification.md'), 'utf8'),
    '# Episode-specific source\nDo not invent story details.\n');
  assert.doesNotMatch(fs.readFileSync(path.join(f.folder(anotherId), 'DemoScene.tsx'), 'utf8'),
    /DRAFT ONLY|Do not invent story details/);
  const loader = fs.readFileSync(path.join(f.book, 'scenes/sceneLoader.ts'), 'utf8');
  assert.match(loader, new RegExp("import\\(['\"]\\./b/" + anotherId + "['\"]\\)"));
});

test('recursively discovers Carousel and Quest nested Scenes with selected UUID', async t => {
  const f = fixture(t);
  const extra = f.scene(anotherId, 'demoScene', 'Approved scene specification');
  f.lesson.config.section.items.intro.config.content.items.gallery = {
    config: { id: '55555555-5555-4555-8555-555555555555', type: 'carousel', slug: 'gallery',
      slides: { items: { demoScene: extra }, order: ['demoScene'] } },
  };
  f.save();
  assert.deepEqual(await runOne(f.lessonDir, 'generate', f.repo, anotherId),
    [{ id: anotherId, changed: 7, skipped: false }]);
  assert.equal(fs.existsSync(f.folder(sceneId)), false);
  assert.equal((await runOne(f.lessonDir, 'generate', f.repo)).filter(x => x.changed).length, 1);
  const loader = fs.readFileSync(path.join(f.book, 'scenes/sceneLoader.ts'), 'utf8');
  assert.match(loader, new RegExp(sceneId));
  assert.match(loader, new RegExp(anotherId));
});

test('reruns preserve existing implementation, story, test and edited specification verbatim', async t => {
  const f = fixture(t);
  await runOne(f.lessonDir, 'generate', f.repo);
  const folder = f.folder(sceneId);
  const custom = ['CompareGroupsScene.tsx', 'CompareGroupsScene.stories.tsx',
    'CompareGroupsScene.unit.spec.tsx', 'specification.md'];
  custom.forEach((file, index) => fs.writeFileSync(path.join(folder, file), 'authored ' + index + '\n'));
  assert.deepEqual(await runOne(f.lessonDir, 'generate', f.repo),
    [{ id: sceneId, changed: 0, skipped: true }]);
  custom.forEach((file, index) =>
    assert.equal(fs.readFileSync(path.join(folder, file), 'utf8'), 'authored ' + index + '\n'));
  await runOne(f.lessonDir, 'check', f.repo);
  fs.rmSync(path.join(folder, 'index.ts'));
  // A partial authored Scene is never rewritten; registry verification must fail visibly.
  await assert.rejects(runOne(f.lessonDir, 'generate', f.repo), /ENOENT/);
  await assert.rejects(runOne(f.lessonDir, 'check', f.repo), /Missing Scene scaffold file/);
});

test('refuses invalid textbook setup, missing specs and identity collisions before writes', async t => {
  const f = fixture(t);
  const second = f.scene(anotherId, 'demoScene', '');
  f.lesson.config.section.items.intro.config.content.items.demoScene = second;
  f.save();
  await assert.rejects(runOne(f.lessonDir, 'generate', f.repo), /needs its own production.specification/);
  assert.equal(fs.existsSync(f.folder(sceneId)), false);
  second.production.specification = 'Approved';
  second.config.slug = 'CompareGroupsScene';
  f.save();
  await assert.rejects(runOne(f.lessonDir, 'generate', f.repo), /Colliding Scene component name/);
  second.config.slug = '../traversal';
  f.save();
  await assert.rejects(runOne(f.lessonDir, 'generate', f.repo), /Unsafe Scene slug/);
  second.config.slug = 'demoScene';
  second.config.id = sceneId;
  f.save();
  await assert.rejects(runOne(f.lessonDir, 'generate', f.repo), /Duplicate Scene UUID/);
  delete f.lesson.config.section.items.intro.config.content.items.demoScene;
  f.save();
  const manifest = path.join(f.book, 'package.json');
  fs.writeFileSync(manifest, JSON.stringify({ name: '@svitlo/playground' }));
  await assert.rejects(runOne(f.lessonDir, 'generate', f.repo), /not Scene-ready/);
});

test('rejects symlinks, malicious locales, invalid YAML and implicit sources', async t => {
  const f = fixture(t);
  f.lesson.production.documentLanguage = 'uk\nconst injected=true';
  f.save();
  await assert.rejects(runOne(f.lessonDir, 'generate', f.repo), /documentLanguage/);
  f.lesson.production.documentLanguage = 'uk';
  f.save();
  await assert.rejects(runOne(f.lessonDir, 'generate', f.repo, undefined, 'en'), /conflicts/);
  const target = f.folder(sceneId);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.symlinkSync(f.book, target, 'dir');
  await assert.rejects(runOne(f.lessonDir, 'generate', f.repo), /Refusing symlink/);
  fs.rmSync(target);
  fs.writeFileSync(path.join(f.lessonDir, 'lesson.yaml'), 'config: [bad\n');
  await assert.rejects(runOne(f.lessonDir, 'generate', f.repo));
  await assert.rejects(main(['generate'], f.repo), /explicit --source/);
  await assert.rejects(main(['generate', '--source', f.lessonDir, '--unexpected', 'x'], f.repo), /Usage/);
  await assert.rejects(runOne(path.join(f.repo, 'outside.yaml'), 'generate', f.repo));
});

test('CLI supports explicit Scene selection, remains deterministic and checks registry', async t => {
  const f = fixture(t);
  const results = await main(['generate', '--source', f.lessonDir, '--scene-id', sceneId], f.repo);
  assert.equal(results.length, 1);
  assert.equal(results[0].changed, 7);
  const expected = renderSceneFiles({
    id: sceneId, component: 'CompareGroupsScene',
    documentLanguage: 'uk', specification: '# Original instruction\n',
  });
  assert.deepEqual([...expected], [...renderSceneFiles({
    id: sceneId, component: 'CompareGroupsScene',
    documentLanguage: 'uk', specification: '# Original instruction\n',
  })]);
  assert.equal((await main(['check', '--source', f.lessonDir], f.repo))[0].changed, 0);
});
