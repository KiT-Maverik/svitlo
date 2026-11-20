import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

/** Check generated Review against real Engine declarations, not a mock type. */
export function reviewTypeDiagnostics(source) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-review-typecheck-'));
  const location = path.join(directory, 'review.ts');
  try {
    const typeFile = fileURLToPath(new URL('../../types/review.types.ts', import.meta.url));
    let relativeType = path.relative(directory, typeFile).split(path.sep).join('/').replace(/\.ts$/, '');
    if (!relativeType.startsWith('.')) relativeType = './' + relativeType;
    if (!source.includes("from '@svitlo/engine/build'"))
      throw new Error('Generated Review lost its Engine type import');
    fs.writeFileSync(location, source.replace("from '@svitlo/engine/build'", 'from ' + JSON.stringify(relativeType)));
    const program = ts.createProgram([location], {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      strict: true,
      noEmit: true,
      skipLibCheck: true,
    });
    return ts.getPreEmitDiagnostics(program).map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n'));
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}
