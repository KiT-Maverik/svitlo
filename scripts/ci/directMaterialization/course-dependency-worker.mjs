/**
 * Deliberately narrow Course exception: import already-trusted default-branch
 * Lesson Configurators inside a credential-free, network-disabled container.
 * The reviewed Course draft is NEVER imported or executed here.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { createJiti } from 'jiti';

const { input, source, textbookRoot, references } = JSON.parse(fs.readFileSync(0, 'utf8'));
if (!/^content\/[a-z][a-z0-9-]*$/.test(textbookRoot) || !Array.isArray(references) ||
    references.length > 250 || !source || !input)
  throw Error('Invalid trusted Course dependency request');
const { materializeCourse } = createRequire(import.meta.url)('/work/shared/engine/dist/build.js');
const jiti = createJiti(import.meta.url, { fsCache: false });
const loaded = new Map();
for (const reference of references) {
  const { id, sourceSha, exportName } = reference;
  if (!/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/.test(id) ||
      !/^[a-f0-9]{40}$/.test(sourceSha) ||
      !/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(exportName))
    throw Error('Unsafe resolved Lesson identity');
  const filename = path.join('/work', textbookRoot, 'data/lessons', id.at(-1), id, 'index.ts');
  const module = await jiti.import(filename);
  const configurator = module[exportName];
  if (!configurator || configurator.id !== id || configurator.type !== 'lesson' ||
      typeof configurator.build?.overrides !== 'function')
    throw Error('Trusted Lesson dependency export mismatch');
  loaded.set(id + ':' + sourceSha + ':' + exportName, configurator);
}
const plan = materializeCourse(input, {
  textbookRoot,
  source: { sourcePath: source.sourcePath, sourceBlobSha: source.sourceBlobSha },
  verifySource: ({ source: pinned, textbookRoot: pkg }) =>
    pinned.sourcePath === source.sourcePath &&
    pinned.sourceBlobSha === source.sourceBlobSha && pkg === textbookRoot,
  resolveExistingLesson(request) {
    const { id, sourceSha, exportName, importPath } = request;
    if (importPath !== '#lessonsData/' + id.at(-1) + '/' + id + '/index')
      throw Error('Lesson import path mismatch');
    const configurator = loaded.get(id + ':' + sourceSha + ':' + exportName);
    if (!configurator) throw Error('Unapproved Course Lesson dependency');
    return { approved: true, id, sourceSha, exportName, importPath, configurator };
  },
});
if (plan?.publishable !== false) throw Error('Course renderer must remain nonpublishable');
process.stdout.write(JSON.stringify(plan));
