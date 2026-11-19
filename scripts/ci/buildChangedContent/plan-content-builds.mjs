#!/usr/bin/env node
/**
 * @fileoverview Plan an independent CI matrix for content packages.
 * Selection is read-only; building, publication tests and artifact checks run
 * on isolated runners. Ready-for-review main PRs and manual runs check all.
 */
import { appendFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { changedFiles, contentWorkspaces, resolveAgentScope, selectContentBuilds } from './build-changed-content.mjs';
import { planContentShards } from './content-shards.mjs';

const repo = resolve(fileURLToPath(new URL('../../..', import.meta.url)));

export function shouldBuildAllContent(eventName, baseRef, draft) {
  return eventName === 'workflow_dispatch' || (eventName === 'pull_request' && baseRef === 'main' && !draft);
}

export function planContentBuilds({ changed, workspaces, all = false, baseRef = '', headRef = '', owners = {} }) {
  const agent = resolveAgentScope(baseRef, headRef, changed, workspaces, owners);
  if (agent) return { include: [{ path: agent.workspace.path, kind: 'agent' }] };
  return {
    include: selectContentBuilds(changed, workspaces, all).map(path => ({ path, kind: 'content' })),
  };
}

const invoked = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invoked) {
  try {
    if (process.argv.length !== 2) throw new Error('Usage: node plan-content-builds.mjs');
    const baseRef = process.env.BASE_REF || '';
    const headRef = process.env.HEAD_REF || '';
    const all = shouldBuildAllContent(process.env.GITHUB_EVENT_NAME, baseRef, process.env.PR_DRAFT === 'true');
    const changed = all ? [] : changedFiles(process.env.BASE_SHA, process.env.HEAD_SHA);
    const owners = JSON.parse(
      readFileSync(resolve(repo, 'scripts/ci/buildChangedContent/skills-agent-owners.json'), 'utf8'),
    );
    const matrix = planContentBuilds({ changed, workspaces: contentWorkspaces(), all, baseRef, headRef, owners });
    const shards = planContentShards(matrix.include);
    const hasBuilds = matrix.include.length > 0;
    const agentMode = matrix.include.some(item => item.kind === 'agent');
    console.log(
      (all ? 'All content packages' : 'Selected content packages') +
        ': ' +
        matrix.include.map(item => item.path).join(', '),
    );
    if (!hasBuilds) console.log('No content packages require a build');
    if (process.env.GITHUB_OUTPUT) {
      appendFileSync(
        process.env.GITHUB_OUTPUT,
        [
          'matrix=' + JSON.stringify(matrix),
          'shards=' + JSON.stringify(shards),
          'has_builds=' + String(hasBuilds),
          'all=' + String(all),
          'agent_mode=' + String(agentMode),
          '',
        ].join('\n'),
      );
    }
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
