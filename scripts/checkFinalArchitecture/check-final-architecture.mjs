import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
// Each executable script lives in a named workflow directory alongside tests and fixtures.
for (const scriptRoot of [
  'scripts',
  'scripts/ci',
  'scripts/textbook-tooling',
  'shared/engine/scripts',
  'shared/ui-kit/scripts',
  'apps/web/scripts',
  'apps/mobile/scripts',
  'apps/desktop/scripts',
]) {
  const directory = resolve(root, scriptRoot);
  if (!existsSync(directory)) continue;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isFile() && /\.(?:mjs|cjs|js|ts|tsx)$/.test(entry.name)) {
      throw new Error('Script must live in a named workflow directory: ' + scriptRoot + '/' + entry.name);
    }
  }
}
function assert(ok, message) {
  if (!ok) throw new Error(message);
}

// The previous Math/Playground app-source comparison is obsolete: Playground
// is a portable textbook package and no longer owns a src/ application tree.
assert(!existsSync(resolve(root, 'content/playground/src')), 'Playground must not duplicate the application source');

const extractedFiles = ['src/db', 'src/components/layout/LearningLayout/NavbarPreferences', 'playwright.db.config.ts'];
for (const app of ['content/math', 'content/playground']) {
  for (const legacy of extractedFiles) {
    assert(!existsSync(resolve(root, app, legacy)), `Duplicate ownership regression: ${app}/${legacy}`);
  }
  for (const legacy of [
    'src/testing/DbBrowserHarness.tsx',
    'src/testing/db-browser-commands.ts',
    'src/testing/db-browser-server.mjs',
    'src/testing/controllers.e2e.spec.ts',
  ])
    assert(!existsSync(resolve(root, app, legacy)), `IndexedDB browser test reintroduced in app: ${app}/${legacy}`);
}

const expectedShared = [
  'shared/indexdb/controllers/index.ts',
  'shared/indexdb/testing/controllers.e2e.spec.ts',
  'shared/ui-kit/src/components/layout/LearningLayout/createLessonLearningLayout.tsx',
  'shared/ui-kit/src/components/lesson/Lesson.tsx',
  'shared/ui-kit/data/locale/lesson.ts',
  'shared/adapters/nextjs/lesson.ts',
  'shared/ui-kit/src/components/layout/LearningLayout/NavbarPreferences/NavbarPreferences.tsx',
];
for (const path of expectedShared) assert(existsSync(resolve(root, path)), 'Owner missing: ' + path);

const rootManifest = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const platform = JSON.parse(readFileSync(resolve(root, 'apps/platform/package.json'), 'utf8'));
assert(rootManifest.workspaces.includes('apps/*'), 'Platform must be in root npm workspaces');
assert(
  Object.keys(platform.dependencies ?? {}).every(p => !p.startsWith('@svitlo/')),
  'Platform cannot depend on learning apps or shared packages until integration is scoped',
);
const quality = readFileSync(resolve(root, '.github/workflows/questions.yml'), 'utf8');
assert(
  quality.includes('test:e2e --workspace @svitlo/platform') && quality.includes('repo:check:artifacts'),
  'Questions CI must verify Platform smoke and built exports',
);
const db = readFileSync(resolve(root, '.github/workflows/db-controllers-e2e.yml'), 'utf8');
assert(db.includes('test:e2e:db'), 'Native Chromium workflow missing');
const canonical = readFileSync(resolve(root, 'studio/docs/architecture/monorepo-and-textbook.md'), 'utf8');
for (const subject of ['shared/engine', 'shared/indexdb', 'apps/platform', 'content/math', 'content/informatics']) {
  assert(canonical.includes(subject), 'Canonical architecture docs omit: ' + subject);
}
console.log('Architecture audit: no duplicate app ownership; shared owners, Platform and CI gates verified.');
