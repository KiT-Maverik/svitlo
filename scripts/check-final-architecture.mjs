import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';

const root = process.cwd();
const math = resolve(root, 'content/math/src');
const playground = resolve(root, 'content/playground/src');
const allowlist = JSON.parse(readFileSync(resolve(root, 'scripts/known-app-duplicates.json'), 'utf8'));
function assert(ok, message) {
  if (!ok) throw new Error(message);
}
assert(
  Array.isArray(allowlist) && allowlist.length === new Set(allowlist).size,
  'Known app duplicate baseline must be a unique array',
);
assert(
  allowlist.every(p => p.startsWith('src/') && !p.includes('..') && !p.includes('\\')),
  'Duplicate baseline contains non-package-relative paths',
);

function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = join(dir, entry.name);
    return entry.isDirectory() ? files(file) : entry.isFile() ? [file] : [];
  });
}
const allow = new Set(allowlist);
const exact = [];
for (const file of files(math)) {
  const suffix = relative(math, file);
  const other = resolve(playground, suffix);
  if (!existsSync(other)) continue;
  const left = createHash('sha256').update(readFileSync(file)).digest('hex');
  const right = createHash('sha256').update(readFileSync(other)).digest('hex');
  if (left === right) exact.push('src/' + suffix.split(sep).join('/'));
}
const unexpected = exact.filter(p => !allow.has(p));
assert(
  unexpected.length === 0,
  'New cloned app-source files require an explicit owner/extraction review:\n' + unexpected.join('\n'),
);

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
  'shared/indexdb/src/controllers/index.ts',
  'shared/indexdb/testing/controllers.e2e.spec.ts',
  'shared/ui-kit/src/components/layout/LearningLayout/createLessonLearningLayout.tsx',
  'shared/ui-kit/src/components/lesson/Lesson.tsx',
  'shared/ui-kit/data/components/Lesson/messages.data.ts',
  'shared/nextjs-adapter/src/lesson.ts',
  'shared/ui-kit/src/components/layout/LearningLayout/NavbarPreferences/NavbarPreferences.tsx',
];
for (const path of expectedShared) assert(existsSync(resolve(root, path)), 'Owner missing: ' + path);

const rootManifest = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const platform = JSON.parse(readFileSync(resolve(root, 'frontend/platform/package.json'), 'utf8'));
assert(rootManifest.workspaces.includes('frontend/*'), 'Platform must be in root npm workspaces');
assert(
  Object.keys(platform.dependencies ?? {}).every(p => !p.startsWith('@svitlo/')),
  'Platform cannot depend on learning apps or shared packages until integration is scoped',
);
const quality = readFileSync(resolve(root, '.github/workflows/questions.yml'), 'utf8');
assert(
  quality.includes('test:e2e:platform') && quality.includes('packages:artifacts:check'),
  'Questions CI must verify Platform smoke and built exports',
);
const db = readFileSync(resolve(root, '.github/workflows/db-controllers-e2e.yml'), 'utf8');
assert(db.includes('test:e2e:db'), 'Native Chromium workflow missing');
const canonical = readFileSync(resolve(root, 'studio/docs/architecture/monorepo-and-textbook.md'), 'utf8');
for (const subject of [
  'shared/contracts',
  'shared/indexdb',
  'frontend/platform',
  'content/math',
  'content/informatics',
]) {
  assert(canonical.includes(subject), 'Canonical architecture docs omit: ' + subject);
}
console.log(
  `Stage 8 architecture audit: ${exact.length} known identical app-source paths; no new duplicates. Shared ownership, Platform and CI gates verified.`,
);
