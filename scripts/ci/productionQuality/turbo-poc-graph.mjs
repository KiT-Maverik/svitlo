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


// The B topology is intentionally static (Actions cannot add dynamic needs).
// Verify that its actual job graph preserves every real Turbo dependency edge.
const jobName = taskId => {
  const [pkg, operation] = taskId.split('#');
  const slug = pkg === '@svitlo/engine' ? 'engine' : pkg === '@svitlo/ui-kit' ? 'ui-kit' : pkg === '@svitlo/math' ? 'math' : null;
  const action = operation === 'package:build' ? 'build' : operation === 'code:check:types' ? 'types' : operation === 'test' ? 'tests' : null;
  if (!slug || !action) throw Error('Unexpected representative task: ' + taskId);
  return 'turbo-b-' + slug + '-' + action;
};

export function checkActionsGraph(dry, workflow) {
  const jobs = new Map();
  for (const task of dry.tasks) {
    if (!focus.some(pkg => task.taskId.startsWith(pkg + '#'))) continue;
    const name = jobName(task.taskId);
    const blocks = workflow.split('\n  ' + name + ':\n');
    if (blocks.length !== 2) throw Error('Missing or duplicate GitHub job: ' + name);
    const body = blocks[1].split(/\n  [a-z][a-z0-9-]*:\n/)[0];
    if (!body.includes("inputs.ci_mode == 'turbo-distributed'")) {
      throw Error('Unisolated benchmark job: ' + name);
    }
    const matches = body.match(/\n    needs: \[([^\]]+)\]/);
    const needs = matches ? matches[1].split(',').map(v => v.trim()) : [];
    jobs.set(name, needs);
  }
  if (jobs.size !== focus.length * operations.length) throw Error('Incomplete distributed job graph');
  function ancestors(name, visited = new Set(), visiting = new Set()) {
    if (visiting.has(name)) throw Error('Cyclic benchmark job graph: ' + name);
    visiting.add(name);
    for (const need of jobs.get(name) || []) {
      if (!jobs.has(need)) throw Error('Unknown benchmark predecessor: ' + need);
      if (visiting.has(need)) throw Error('Cyclic benchmark job graph: ' + need);
      if (!visited.has(need)) {
        ancestors(need, visited, visiting);
        visited.add(need);
      }
    }
    visiting.delete(name);
    return visited;
  }
  const taskById = new Map(dry.tasks.map(task => [task.taskId, task]));
  function taskAncestors(taskId, seen = new Set(), visiting = new Set()) {
    if (visiting.has(taskId)) throw Error('Cyclic Turbo benchmark tasks: ' + taskId);
    visiting.add(taskId);
    for (const dep of taskById.get(taskId)?.dependencies || []) {
      if (!focus.some(pkg => dep.startsWith(pkg + '#'))) continue;
      if (!taskById.has(dep)) throw Error('Missing dependency task: ' + dep);
      if (!seen.has(dep)) {
        taskAncestors(dep, seen, visiting);
        seen.add(dep);
      }
    }
    visiting.delete(taskId);
    return seen;
  }
  for (const task of dry.tasks) {
    if (!focus.some(pkg => task.taskId.startsWith(pkg + '#'))) continue;
    const name = jobName(task.taskId);
    const upstream = ancestors(name);
    const required = new Set([...taskAncestors(task.taskId)].map(jobName));
    for (const dep of required) {
      if (!upstream.has(dep)) throw Error('GitHub needs missing task dependency: ' + name + ' => ' + dep);
    }
    for (const dep of upstream) {
      if (!required.has(dep)) throw Error('Unnecessary GitHub job serialization: ' + name + ' => ' + dep);
    }
  }
  return { jobs: jobs.size };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.length !== 3) throw Error('Usage: turbo-poc-graph.mjs <turbo-dry-json-path>');
    const dry = JSON.parse(readFileSync(process.argv[2], 'utf8'));
    const result = checkGraph(dry, discoverWorkspaces());
    const yaml = readFileSync(new URL('../../../.github/workflows/engine-generators.yml', import.meta.url), 'utf8');
    const actions = checkActionsGraph(dry, yaml);
    console.log('Turbo graph verified: ' + result.taskCount + ' tasks; ' + actions.jobs + ' GitHub job DAG nodes');
  } catch (error) {
    console.error('::error::' + error.message);
    process.exitCode = 1;
  }
}
