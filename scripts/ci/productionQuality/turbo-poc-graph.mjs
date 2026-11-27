/**
 * Validate the real Turbo --dry=json output against a representative set of
 * canonical npm workspace tasks and dependency edges. Manual CI experiment only.
 * No task execution or production-state mutation occurs here.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { discoverWorkspaces } from '../../runWorkspaceScript/run-workspace-script.mjs';

export const focus = ['@svitlo/engine', '@svitlo/ui-kit', '@svitlo/math'];
export const operations = ['package:build', 'code:check:types', 'test'];

export function checkGraph(dry, workspaces) {
  if (!Array.isArray(dry.tasks)) throw Error('Missing Turborepo tasks array');
  const byName = new Map(workspaces.map(p => [p.name, p]));
  const tasks = new Map();
  for (const entry of dry.tasks) {
    if (!entry || typeof entry.taskId !== 'string' || !Array.isArray(entry.dependencies)) {
      throw Error('Malformed Turborepo task entry');
    }
    if (tasks.has(entry.taskId)) throw Error('Duplicate Turbo task: ' + entry.taskId);
    tasks.set(entry.taskId, entry);
  }
  for (const pkg of focus) {
    const manifest = byName.get(pkg);
    if (!manifest) throw Error('Missing benchmark workspace: ' + pkg);
    const available = manifest.scripts || {};
    for (const operation of operations) {
      if (!Object.hasOwn(available, operation)) throw Error('Missing workspace script: ' + pkg + '#' + operation);
      const name = pkg + '#' + operation;
      const task = tasks.get(name);
      if (!task) throw Error('Missing Turbo task: ' + name);
      const deps = new Set(task.dependencies);
      if (operation === 'test' && !deps.has(pkg + '#code:check:types')) {
        throw Error('Test task is not gated by types: ' + name);
      }
      if (operation === 'code:check:types' && !deps.has(pkg + '#package:build')) {
        throw Error('Typecheck does not depend on current package build: ' + name);
      }
      if (operation === 'package:build' || operation === 'code:check:types') {
        const declared = new Set(Object.keys({
          ...(manifest.dependencies || {}),
          ...(manifest.devDependencies || {}),
        }));
        for (const dependency of focus) {
          if (dependency === pkg || !declared.has(dependency)) continue;
          const dependencyBuild = dependency + '#package:build';
          if (!deps.has(dependencyBuild)) throw Error('Missing dependency edge: ' + name + ' => ' + dependencyBuild);
        }
      }
    }
  }
  const included = [...tasks.keys()].filter(name => focus.some(pkg => name.startsWith(pkg + '#')));
  if (included.length !== focus.length * operations.length) {
    throw Error('Unexpected representative task count: ' + included.length);
  }
  return { taskCount: included.length, workspaces: focus.length };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.length !== 3) throw Error('Usage: turbo-poc-graph.mjs <turbo-dry-json-path>');
    const dry = JSON.parse(readFileSync(process.argv[2], 'utf8'));
    const result = checkGraph(dry, discoverWorkspaces());
    console.log('Turbo representative graph verified: ' + result.taskCount + ' tasks across ' + result.workspaces + ' packages');
  } catch (error) {
    console.error('::error::' + error.message);
    process.exitCode = 1;
  }
}
