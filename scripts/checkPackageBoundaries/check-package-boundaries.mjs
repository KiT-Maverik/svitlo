import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve, relative, sep } from 'node:path';

const root = process.cwd();
const readJson = path => JSON.parse(readFileSync(resolve(root, path), 'utf8'));
const engine = readJson('shared/engine/package.json');
const indexdb = readJson('shared/indexdb/package.json');
const playground = readJson('content/playground/package.json');
const web = readJson('apps/web/package.json');
const selectableTextbooks = new Set(Object.values(readJson('apps/web/textbooks.json')).map(entry => entry.package));
const platform = readJson('apps/platform/package.json');
const math = readJson('content/math/package.json');
const biology = readJson('content/biology/package.json');
const physics = readJson('content/physics/package.json');
const uiKit = readJson('shared/ui-kit/package.json');
const nextAdapter = readJson('shared/adapters/nextjs/package.json');

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : entry.isFile() ? [path] : [];
  });
}
function assert(condition, message) {
  if (!condition) throw new Error(message);
}
// Only the universal hosts are Next.js/Electron/Capacitor applications.
const migratedTextbookPaths = [
  'content/math',
  'content/physics',
  'content/psychology',
  'content/philosophy',
  'content/language-literature',
  'content/languages/ukrainian',
  'content/astronomy',
  'content/biology',
  'content/geography',
  'content/history',
  'content/informatics',
];
for (const path of migratedTextbookPaths) {
  const pkg = readJson(path + '/package.json');
  const id = pkg.name.slice('@svitlo/'.length);
  assert(pkg.name === '@svitlo/' + id, 'Unexpected textbook package name: ' + path);
  assert(
    !pkg.dependencies?.next && !existsSync(resolve(root, path, 'src/app')),
    'Standalone Next.js shell remains: ' + path,
  );
  assert(pkg.bin?.['svitlo-' + id] === './dist/publish.mjs', 'Missing textbook Publish CLI: ' + path);
  assert(
    pkg.exports?.['.']?.default === './dist/textbook/index.js' &&
      pkg.exports?.['.']?.types === './dist/textbook/index.d.ts',
    'Book must expose compiled metadata: ' + path,
  );
  assert(
    !pkg.exports?.['./scenes'] && !pkg.exports?.['./styles'],
    'Do not publish fabricated Scenes or styles: ' + path,
  );
}
assert(platform.name === '@svitlo/platform', 'Unexpected Platform package name');
assert(
  platform.dependencies?.next && platform.dependencies?.react && platform.dependencies?.['@mui/material'],
  'Platform must declare independent Next.js, React and MUI dependencies',
);
assert(
  !Object.keys(platform.dependencies ?? {}).some(name => name.startsWith('@svitlo/')),
  'Platform scaffold must not depend on another Svitlo package',
);
for (const path of ['src/app/layout.tsx', 'src/app/page.tsx', 'playwright.config.ts', 'next.config.ts']) {
  assert(existsSync(resolve(root, 'apps/platform', path)), 'Platform scaffold missing: ' + path);
}
assert(engine.name === '@svitlo/engine', 'Unexpected engine package name');
assert(indexdb.name === '@svitlo/indexdb', 'Unexpected IndexedDB package name');
assert(indexdb.dependencies?.[engine.name] === engine.version, 'IndexedDB must depend on Engine runtime contracts');
assert(indexdb.dependencies?.zod, 'IndexedDB must declare its Zod schema dependency');
assert(
  Object.keys(indexdb.exports ?? {}).length === 1 && Object.hasOwn(indexdb.exports ?? {}, '.'),
  'IndexedDB must expose only the root entrypoint',
);
assert(
  indexdb.exports['.']?.types === './dist/index.d.ts' && indexdb.exports['.']?.default === './dist/index.js',
  'IndexedDB root entrypoint must use compiled artifacts',
);
assert(playground.dependencies?.[engine.name] === engine.version, 'Playground must use a versioned engine dependency');
assert(playground.dependencies?.[uiKit.name] === uiKit.version, 'Playground must use a versioned UI Kit dependency');
assert(web.dependencies?.[indexdb.name] === indexdb.version, 'Web must use public IndexedDB dependency');
assert(!math.dependencies?.[indexdb.name], 'Math may not carry legacy app-local IndexedDB dependencies');
assert(biology.name === '@svitlo/biology', 'Unexpected Biology package name');
for (const name of ['content/math', 'content/playground']) {
  assert(!existsSync(resolve(root, name, 'src/db')), name + ' must not own duplicate IndexedDB controllers');
}
assert(existsSync(resolve(root, 'shared/indexdb/controllers/index.ts')), 'Shared IndexedDB controllers are missing');
assert(
  existsSync(resolve(root, 'shared/indexdb/schemas/lessonState/lessonState.schema.ts')),
  'Shared IndexedDB LessonState schema is missing',
);
assert(
  existsSync(resolve(root, 'shared/indexdb/schemas/quizState/quizState.schema.ts')),
  'Shared IndexedDB QuizState schema is missing',
);
for (const [label, manifest] of [
  ['Mathematics textbook', math],
  ['Playground', playground],
]) {
  assert(manifest.dependencies?.[engine.name] === engine.version, label + ' must use public Engine dependency');
  if (label === 'Playground')
    assert(manifest.dependencies?.[uiKit.name] === uiKit.version, label + ' must use public UI Kit dependency');
}
assert(existsSync(resolve(root, 'content/math/data/skills')), 'Math textbook is missing its canonical Skills taxonomy');
assert(existsSync(resolve(root, 'content/math/docs')), 'Math textbook is missing package-local educational docs');
assert(!existsSync(resolve(root, 'content/playground/src/math')), 'Playground cannot own mathematics skills taxonomy');
assert(
  !existsSync(resolve(root, 'content/playground/src/content')),
  'Playground cannot contain authored textbook content',
);
assert(
  existsSync(resolve(root, 'apps/web/src/app/[language]/lesson/[lessonLanguage]/[lessonId]/page.tsx')),
  'Web must host the UUID-addressed lesson route',
);
assert(
  !existsSync(resolve(root, 'content/playground/src/app')) && !playground.dependencies?.next,
  'Playground must be a framework-independent textbook package',
);
assert(
  playground.exports?.['./scenes'] && web.dependencies?.[playground.name] === playground.version,
  'Web must consume the public Playground Scene registry',
);
assert(
  ['.', './scenes'].every(
    key =>
      playground.exports?.[key]?.default?.startsWith('./dist/') &&
      playground.exports?.[key]?.types?.startsWith('./dist/'),
  ) &&
    playground.exports?.['./styles']?.default === './dist/styles.css' &&
    playground.bin?.['svitlo-playground'] === './dist/publish.mjs',
  'Playground must expose compiled JS, declarations, styles and a Publish CLI',
);
assert(
  !existsSync(resolve(root, 'content/playground/src/fixtures')),
  'Obsolete Playground fixtures directory must be removed',
);
assert(
  !existsSync(resolve(root, 'content/math/src/content/howLightMoves')),
  'Math cannot own light demonstration content',
);
assert(
  !existsSync(resolve(root, 'content/math/src/components/widgets/KnowledgeCheckpoint')),
  'Math cannot own scene-specific checkpoint tests',
);
assert(
  !existsSync(resolve(root, 'content/playground/src/components/widgets/KnowledgeCheckpoint')),
  'Scene checkpoint tests must live with their authored scene',
);
assert(
  existsSync(
    resolve(root, 'shared/ui-kit/src/components/widgets/ContentBlockRenderer/ContentBlockRenderer.unit.spec.tsx'),
  ),
  'Shared content block renderer must own its unit coverage',
);
assert(!existsSync(resolve(root, 'math')), 'Root mathematics docs must be inside the textbook package');
assert(uiKit.dependencies?.[engine.name] === engine.version, 'UI Kit must consume the published Engine API');
assert(engine.scripts?.['package:build'] && engine.files?.includes('dist'), 'Engine must publish compiled artifacts');
assert(
  engine.exports &&
    Object.keys(engine.exports).length === 2 &&
    !Object.hasOwn(engine.exports, '.') &&
    engine.exports['./build']?.types === './dist/build.d.ts' &&
    engine.exports['./build']?.default === './dist/build.js' &&
    engine.exports['./runtime']?.types === './dist/runtime.d.ts' &&
    engine.exports['./runtime']?.default === './dist/runtime.js',
  'Engine must expose only explicit compiled build and runtime entrypoints',
);
const assessmentMethodsRoot = resolve(root, 'shared/ui-kit/data/definitions/assessmentMethods');
assert(
  existsSync(join(assessmentMethodsRoot, 'index.ts')) &&
    readdirSync(assessmentMethodsRoot).filter(name => /^[a-z][A-Za-z0-9]*\.ts$/.test(name) && name !== 'index.ts')
      .length === 16,
  'UI Kit must own exactly 16 canonical Assessment Method definitions',
);
assert(
  !existsSync(resolve(root, 'content/math/src/data/assessmentMethodTaxonomy')),
  'Math must not own shared Assessment Method Taxonomy',
);
assert(
  !existsSync(resolve(root, 'content/math/src/utils')),
  'Math utility duplicates must be removed after extraction',
);
assert(
  !existsSync(resolve(root, 'content/playground/src/utils')),
  'Playground utility duplicates must be removed after extraction',
);
assert(
  existsSync(resolve(root, 'content/math/data/skills/index.ts')),
  'Math textbook must export its canonical Skills taxonomy',
);
assert(
  existsSync(resolve(root, 'shared/engine/utils/createLocalizedFileLocations/createLocalizedFileLocations.spec.ts')),
  'Engine must own shared locale path tests',
);
assert(
  existsSync(resolve(root, 'shared/engine/configurators/skills-slug-inference.spec.ts')),
  'Engine must own modern Skill configurator tests',
);
assert(
  !existsSync(resolve(root, 'shared/engine/data/assessmentMethodTaxonomy')) &&
    !existsSync(resolve(root, 'shared/engine/utils/builders/config/buildAssessmentMethodConfig.utils.ts')),
  'Legacy Assessment Method taxonomy, UUID registry and config builder must be removed',
);
const engineRoots = [
  'builders',
  'configurators',
  'content',
  'data',
  'definitions',
  'generation',
  'lesson',
  'lessons',
  'localization',
  'schemas',
  'taxonomy',
  'types',
  'utils',
];
const engineSources = [
  resolve(root, 'shared/engine/index.ts'),
  ...engineRoots.flatMap(dir => walk(resolve(root, 'shared/engine', dir))),
].filter(file => file.endsWith('.ts') && !/\.(?:spec|typecheck)\.ts$/.test(file));
for (const file of engineSources) {
  const content = readFileSync(file, 'utf8');
  const imports = [...content.matchAll(/\b(?:from\s*|import\s*\(\s*)['"]([^'"]+)['"]/g)];
  for (const match of imports) {
    assert(
      match[1].startsWith('.') ||
        match[1].startsWith('#') ||
        match[1] === 'zod' ||
        (relative(root, file).startsWith('shared/engine/utils/generators/') &&
          (match[1].startsWith('node:') || match[1] === 'esbuild')) ||
        ((relative(root, file).startsWith(
          'shared/engine/configurators/contentBlocks/_shared__contentBlocks/validateLocalAssets/',
        ) ||
          relative(root, file).startsWith('shared/engine/configurators/contentBlocks/defineCode/') ||
          relative(root, file).startsWith('shared/engine/configurators/contentBlocks/defineMarkdown/')) &&
          match[1].startsWith('node:')),
      'Engine must not import runtime, UI or application packages: ' + relative(root, file) + ' -> ' + match[1],
    );
  }
}
assert(nextAdapter.name === '@svitlo/adapter-nextjs', 'Unexpected Next.js adapter package name');
assert(web.dependencies?.[nextAdapter.name] === nextAdapter.version, 'Web must use the shared Next.js adapter');
assert(
  nextAdapter.dependencies?.[uiKit.name] === uiKit.version,
  'Next.js adapter must consume the UI Kit via public exports',
);
assert(!uiKit.peerDependencies?.next, 'Framework-agnostic UI Kit must not require Next.js');
const kitSourceRoot = resolve(root, 'shared/ui-kit/src');
if (existsSync(kitSourceRoot)) {
  for (const file of walk(kitSourceRoot).filter(file => /\.(ts|tsx)$/.test(file))) {
    const source = readFileSync(file, 'utf8');
    // UI Kit must remain independent of application and Next.js modules.
    const guardedSource = source;
    assert(
      !/from\s*['"](?:@\/|@layout|@pages|next\/|\.\.\/\.\.\/\.\.\/\.\.\/content\/)/.test(guardedSource),
      'UI Kit must not import application or Next.js sources: ' + relative(root, file),
    );
  }
}
const appSourceRoot = resolve(root, 'content/playground/src');
const playgroundManifest = readJson('content/playground/tsconfig.json');
assert(
  !playgroundManifest.compilerOptions?.paths?.['@layout'] && !playgroundManifest.compilerOptions?.paths?.['@pages'],
  'Playground must not retain deprecated @layout or @pages aliases',
);
for (const removed of [
  'types/index.ts',
  'types/languages.ts',
  'utils/index.ts',
  'math/assessmentMethodTaxonomy/index.ids.ts',
]) {
  assert(!existsSync(resolve(appSourceRoot, removed)), 'Legacy compatibility shim must not exist: ' + removed);
}
if (existsSync(appSourceRoot)) {
  for (const file of walk(appSourceRoot).filter(file => /\.(?:ts|tsx)$/.test(file))) {
    const content = readFileSync(file, 'utf8');
    assert(
      !/from\s*['"](?:@types|@layout|@pages|@\/utils(?:\/|['"]))/.test(content),
      'Application must not depend on legacy compatibility aliases: ' + relative(root, file),
    );
    // Locally owned Playground demonstration data is permitted, including subject-based examples.
    // Cross-application imports remain forbidden by the resolved-path check below.
    assert(
      !/(?:shared\/engine\/src|@svitlo\/engine\/(?:src|dist)\/)/.test(content),
      'Application must use public engine exports: ' + relative(root, file),
    );
  }
}
const applicationSourceRoots = [
  'apps/web/src',
  'content/math/src',
  'content/biology/src',
  'content/physics/src',
  'content/informatics/src',
  'content/geography/src',
  'content/language-literature/src',
  'content/languages/ukrainian/src',
  'content/chemistry/src',
  'content/astronomy/src',
  'content/history/src',
  'content/philosophy/src',
  'content/psychology/src',
  'content/economics/src',
  'content/art/src',
  'content/health-safety/src',
  'content/engineering/src',
  'apps/platform/src',
].map(path => resolve(root, path));
for (const applicationRoot of applicationSourceRoots) {
  if (!existsSync(applicationRoot)) continue;
  for (const file of walk(applicationRoot).filter(path => /\.(ts|tsx)$/.test(path))) {
    const code = readFileSync(file, 'utf8');
    for (const match of code.matchAll(/\bfrom\s*['"]([^'"]+)['"]/g)) {
      const specifier = match[1];
      assert(
        (applicationRoot === resolve(root, 'apps/web/src') &&
          selectableTextbooks.has(specifier.split('/').slice(0, 2).join('/'))) ||
          !/^@svitlo\/(?:playground|math|biology|physics|informatics|geography|language-literature|ukrainian|chemistry|astronomy|history|philosophy|psychology|economics|art|health-safety|engineering|platform)(?:\/|$)/.test(
            specifier,
          ),
        'Applications must not import another application by package name: ' + relative(root, file),
      );
      if (!specifier.startsWith('.')) continue;
      const target = resolve(dirname(file), specifier);
      assert(
        !applicationSourceRoots.some(
          other => other !== applicationRoot && (target === other || target.startsWith(other + sep)),
        ),
        'Applications must not import another application source: ' + relative(root, file) + ' -> ' + specifier,
      );
    }
  }
}
for (const app of ['content/math', 'apps/web']) {
  for (const old of [
    'DbBrowserHarness.tsx',
    'db-browser-commands.ts',
    'db-browser-server.mjs',
    'controllers.e2e.spec.ts',
  ]) {
    assert(
      !existsSync(resolve(root, app, 'src/testing', old)),
      'IndexedDB browser tests must be owned by @svitlo/indexdb: ' + app + '/' + old,
    );
  }
  assert(
    !existsSync(resolve(root, app, 'playwright.db.config.ts')),
    'Applications must not retain IndexedDB Playwright configuration: ' + app,
  );
}
for (const testFile of [
  'db-browser-harness.ts',
  'db-browser-commands.ts',
  'db-browser-server.mjs',
  'controllers.e2e.spec.ts',
]) {
  assert(
    existsSync(resolve(root, 'shared/indexdb/testing', testFile)),
    'IndexedDB browser test infrastructure missing: ' + testFile,
  );
}
assert(
  existsSync(resolve(root, 'shared/indexdb/playwright.config.ts')),
  'IndexedDB must own the native browser Playwright configuration',
);
for (const app of ['content/math', 'apps/web']) {
  const preferences = resolve(root, app, 'src/components/layout/LearningLayout/NavbarPreferences');
  assert(!existsSync(preferences), 'NavbarPreferences must be owned by UI Kit, not ' + app);
  const adapterPath = resolve(root, app, 'src/components/layout/LearningLayout/LearningLayout.tsx');
  // Mathematics currently exposes no lesson layout adapter; Web must retain one.
  if (app === 'content/math' && !existsSync(adapterPath)) continue;
  assert(existsSync(adapterPath), 'Lesson layout adapter missing: ' + app);
  const adapter = readFileSync(adapterPath, 'utf8');
  assert(
    adapter.includes('createLessonLearningLayout') && !adapter.includes('<SharedLearningLayout'),
    'App layout must bind UI Kit without duplicating shared composition: ' + app,
  );
}
assert(
  existsSync(resolve(root, 'shared/ui-kit/src/components/layout/LearningLayout/createLessonLearningLayout.tsx')),
  'Shared LearningLayout connector missing from UI Kit',
);
assert(
  existsSync(
    resolve(root, 'shared/ui-kit/src/components/layout/LearningLayout/NavbarPreferences/NavbarPreferences.tsx'),
  ),
  'Shared NavbarPreferences missing from UI Kit',
);
assert(
  Object.keys(uiKit.exports ?? {}).length === 1 &&
    uiKit.exports?.['.']?.default === './dist/src/index.js' &&
    readFileSync(resolve(root, 'shared/ui-kit/src/index.ts'), 'utf8').includes(
      "export * from './components/layout/LearningLayout'",
    ) &&
    readFileSync(resolve(root, 'shared/ui-kit/src/components/layout/LearningLayout/index.ts'), 'utf8').includes(
      'NavbarPreferences',
    ),
  'NavbarPreferences must be exposed through the compiled UI Kit root entrypoint',
);
const themeComponent = readFileSync(
  resolve(root, 'shared/ui-kit/src/components/layout/LearningLayout/NavbarPreferences/NavbarPreferences.tsx'),
  'utf8',
);
assert(
  !themeComponent.includes('useColorScheme'),
  'UI Kit NavbarPreferences must receive MUI theme state via props from the consuming app',
);
console.log('Package boundaries, compiled textbooks and independent hosts verified.');
