#!/usr/bin/env node
/** Tracked-source one-time migration to explicit Engine entrypoints.
 * Uses TypeScript AST positions, so strings, comments and content are untouched.
 * Usage: node scripts/migrate-engine-entrypoints.mjs --check|--write
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const target = '@svitlo/engine';
const sourcePattern = /\.[cm]?[jt]sx?$/;
const authoringName = /^(?:define[A-Z]|build[A-Z]|publish[A-Z]|generate[A-Z]|createLesson$|createSection$|createContentBlock$|createLessonOverrides$)/;

function isAuthoringFile(filename) {
  return filename.startsWith('scripts/') ||
    filename.startsWith('shared/ui-kit/data/') ||
    filename.startsWith('shared/ui-kit/scripts/') ||
    (filename.startsWith('content/') && (
      filename.includes('/data/') || filename.endsWith('.data.ts') ||
      filename.endsWith('/textbook.ts')
    ));
}

export function rewriteEngineEntrypoints(source, filename) {
  const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true);
  const edits = [];
  const defaultBuild = isAuthoringFile(filename);
  const visit = node => {
    if (ts.isStringLiteralLike(node) && node.text === target) {
      const parent = node.parent;
      const declaration = (ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent)) &&
        parent.moduleSpecifier === node ? parent : null;
      const call = ts.isCallExpression(parent) && parent.arguments[0] === node &&
        (parent.expression.kind === ts.SyntaxKind.ImportKeyword ||
         (ts.isIdentifier(parent.expression) && parent.expression.text === 'require'));
      const typeImport = ts.isLiteralTypeNode(parent) && ts.isImportTypeNode(parent.parent);
      if (declaration || call || typeImport) {
        let build = defaultBuild;
        if (declaration) {
          const bindings = ts.isImportDeclaration(declaration)
            ? declaration.importClause?.namedBindings : declaration.exportClause;
          const members = bindings && (ts.isNamedImports(bindings) || ts.isNamedExports(bindings))
            ? [...bindings.elements].map(element => (element.propertyName ?? element.name).text) : [];
          if (members.some(name => authoringName.test(name))) build = true;
          if (filename.startsWith('apps/') && build) {
            throw new Error(filename + ': application imports authoring-only Engine symbols; move them to build-time tooling');
          }
          if (!defaultBuild && members.some(name => authoringName.test(name))) {
            throw new Error(filename + ': build-time Engine import in a runtime source: ' + members.join(', '));
          }
        }
        const replacement = target + (build ? '/build' : '/runtime');
        edits.push({start:node.getStart(ast)+1,end:node.end-1,replacement});
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(ast);
  return edits.sort((a,b)=>b.start-a.start).reduce(
    (text,edit)=>text.slice(0,edit.start)+edit.replacement+text.slice(edit.end),source);
}

export function migrateTrackedFiles({write=false,repositoryRoot=root}={}) {
  const paths=execFileSync('git',['ls-files','-z'],{
    cwd:repositoryRoot,encoding:'utf8',maxBuffer:32*1024*1024
  }).split('\0').filter(path=>sourcePattern.test(path) && !path.startsWith('shared/engine/'));
  let changed=0;
  const byArea={};
  for(const path of paths){
    const full=resolve(repositoryRoot,path);
    const before=readFileSync(full,'utf8');
    if(!before.includes(target))continue;
    const after=rewriteEngineEntrypoints(before,path);
    if(before===after)continue;
    changed++;
    const area=path.split('/').slice(0,2).join('/');
    byArea[area]=(byArea[area]??0)+1;
    if(write)writeFileSync(full,after);
  }
  return {changed,byArea};
}
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const mode=process.argv[2];
  if(!['--check','--write'].includes(mode)){
    console.error('Usage: node scripts/migrate-engine-entrypoints.mjs --check|--write');
    process.exitCode=2;
  }else{
    try{
      const report=migrateTrackedFiles({write:mode==='--write'});
      console.log(JSON.stringify(report,null,2));
      if(mode==='--check'&&report.changed)process.exitCode=1;
    }catch(error){console.error(error);process.exitCode=1;}
  }
}
