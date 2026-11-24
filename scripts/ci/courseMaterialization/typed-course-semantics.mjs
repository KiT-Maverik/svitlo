/**
 * @fileoverview Semantic TypeScript verification of the complete generated
 * Course Stage 5 source tree. All modules are virtual/in-memory, sourced from
 * the verified trusted materializer plan. Candidate code is never evaluated,
 * written to a package, or imported into the privileged Node process.
 */
import path from 'node:path';
import ts from 'typescript';

export function checkGeneratedCourseTypes(plan, textbookRoot) {
  if (!Array.isArray(plan?.files) || !/^content\/[a-z][a-z0-9-]*$/.test(textbookRoot ?? ''))
    throw Error('Cannot typecheck an untrusted or unbounded Course source plan');
  const engineRoot = path.resolve(import.meta.dirname, '../../../shared/engine');
  const projectRoot = path.resolve(engineRoot, '../..');
  const virtualRoot = path.join(engineRoot, 'temp', 'typed-course-generated');
  const config = ts.readConfigFile(path.join(engineRoot, 'tsconfig.json'), ts.sys.readFile);
  if (config.error) throw Error('Cannot load trusted Engine TypeScript settings');
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, engineRoot);
  if (parsed.errors.length) throw Error('Invalid trusted Engine TypeScript settings');
  const paths = {
    ...parsed.options.paths,
    '@svitlo/engine/build': ['build.ts'],
    '#coursesData/*': [path.join(virtualRoot, textbookRoot, 'data/courses/*')],
    '#lessonsData/*': [path.join(virtualRoot, textbookRoot, 'data/lessons/*'), path.join(projectRoot, textbookRoot, 'data/lessons/*')],
  };
  const options = {
    ...parsed.options,
    baseUrl: engineRoot,
    paths,
    noEmit: true,
    incremental: false,
    composite: false,
  };
  const virtual = new Map();
  for (const file of plan.files) {
    if (file?.kind !== 'typescript') continue;
    if (typeof file.path !== 'string' || typeof file.content !== 'string' || !file.path.startsWith(textbookRoot + '/'))
      throw Error('Noncanonical generated Course TypeScript path');
    const filename = path.resolve(virtualRoot, file.path);
    if (virtual.has(filename)) throw Error('Duplicate generated TypeScript semantic module');
    virtual.set(filename, file.content);
  }
  if (!virtual.size) throw Error('No typed Course source modules to verify');
  const host = ts.createCompilerHost(options);
  const standardRead = host.readFile.bind(host);
  const standardExists = host.fileExists.bind(host);
  const standardSource = host.getSourceFile.bind(host);
  const standardDir = host.directoryExists?.bind(host);
  const normalize = file => path.resolve(file);
  host.readFile = file => virtual.get(normalize(file)) ?? standardRead(file);
  host.fileExists = file => virtual.has(normalize(file)) || standardExists(file);
  host.directoryExists = directory =>
    [...virtual.keys()].some(file => file.startsWith(normalize(directory) + path.sep)) ||
    standardDir?.(directory) ||
    false;
  host.getSourceFile = (file, language, onError, createNew) =>
    virtual.has(normalize(file))
      ? ts.createSourceFile(file, virtual.get(normalize(file)), language, true)
      : standardSource(file, language, onError, createNew);
  const diagnostics = ts.getPreEmitDiagnostics(ts.createProgram([...virtual.keys()], options, host));
  if (diagnostics.length) {
    const details = diagnostics
      .slice(0, 4)
      .map(error => {
        const location = error.file?.getLineAndCharacterOfPosition(error.start ?? 0);
        return (
          (error.file?.fileName ?? '<compiler>') +
          (location ? ':' + (location.line + 1) : '') +
          ' TS' +
          error.code +
          ' ' +
          ts.flattenDiagnosticMessageText(error.messageText, ' ')
        );
      })
      .join('\n');
    throw Error('Generated Course Stage 5 TypeScript is not semantically valid:\n' + details);
  }
  return virtual.size;
}
