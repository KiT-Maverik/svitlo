import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * Build-only utility for the legacy editorial Course Builder until PR #508 migrates it.
 * Loads exactly one authored Lesson configurator; it does not publish Props.
 */
export async function loadLessonData(entry: string): Promise<unknown> {
  const directory = fs.mkdtempSync(path.join(path.dirname(entry), '.lesson-load-'));
  const output = path.join(directory, 'lesson.cjs');
  try {
    const { build } = await import('esbuild');
    await build({
      entryPoints: [entry],
      outfile: output,
      bundle: true,
      platform: 'node',
      format: 'cjs',
      packages: 'external',
      target: 'node20',
      logLevel: 'silent',
      plugins: [
        {
          name: 'preserve-import-meta-url',
          setup(builder) {
            builder.onLoad({ filter: /\.tsx?$/ }, async args => ({
              contents: (await fs.promises.readFile(args.path, 'utf8')).replace(
                /\bimport\.meta\.url\b/g,
                JSON.stringify(pathToFileURL(args.path).href),
              ),
              loader: args.path.endsWith('.tsx') ? 'tsx' : 'ts',
            }));
          },
        },
      ],
    });
    const exports = require(output) as Record<string, unknown>;
    const entries = Object.values(exports).filter(
      value => value !== null && typeof value === 'object' && 'id' in value && 'slug' in value,
    );
    if (entries.length !== 1) throw new Error(`Expected one exported lesson in ${entry}; found ${entries.length}`);
    return entries[0];
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

