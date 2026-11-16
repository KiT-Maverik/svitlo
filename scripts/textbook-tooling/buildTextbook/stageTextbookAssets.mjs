/**
 * Copy all textbook-owned media, including files not yet referenced by Lessons.
 * The package publisher owns the portable URL namespace and manifest. Reject
 * symlinks and collisions; never dereference external source paths.
 */
import fs from 'node:fs';
import path from 'node:path';

const categories = new Set(['images', 'audio', 'video', 'subtitles']);

export function stageTextbookAssets({ textbookRoot, textbookId, staticRoot }) {
  if (!/^[a-z][a-z-]*$/.test(textbookId)) throw new Error('Invalid textbook ID');
  const source = path.join(textbookRoot, 'assets');
  if (!fs.existsSync(source)) return 0;
  if (!fs.lstatSync(source).isDirectory() || fs.lstatSync(source).isSymbolicLink()) {
    throw new Error('Unsafe textbook assets root: ' + source);
  }
  const files = [];
  const visit = (folder, prefix = '') => {
    for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
      const name = prefix ? prefix + '/' + entry.name : entry.name;
      if (entry.isSymbolicLink()) throw new Error('Symlink in textbook assets: ' + name);
      if (!categories.has(name.split('/')[0])) throw new Error('Unexpected textbook media category: ' + name);
      const file = path.join(folder, entry.name);
      if (entry.isDirectory()) visit(file, name);
      else if (entry.isFile()) {
        if (name.split('/').length !== 2) throw new Error('Nested textbook media path: ' + name);
        files.push(name);
      } else throw new Error('Unsupported textbook media entry: ' + name);
    }
  };
  visit(source);
  for (const name of files.sort()) {
    const destination = path.join(staticRoot, 'textbooks', textbookId, 'assets', ...name.split('/'));
    if (fs.existsSync(destination)) throw new Error('Duplicate textbook assets publication: ' + name);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(path.join(source, ...name.split('/')), destination);
  }
  return files.length;
}
