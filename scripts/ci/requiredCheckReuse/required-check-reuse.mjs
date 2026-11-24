#!/usr/bin/env node
/** Read-only, fail-closed reuse of a successful required check on the same PR merge commit. */
import fs from 'node:fs';

export function mayReuse(event, runs, { name, sha, repository, runId }) {
  if (
    event?.action !== 'edited' ||
    event.changes?.base ||
    event.changes?.head ||
    event.changes?.draft ||
    event.pull_request?.draft ||
    event.pull_request?.head?.repo?.full_name !== repository ||
    !/^[a-f0-9]{40}$/.test(sha ?? '') ||
    !Number.isSafeInteger(event.pull_request?.number) ||
    !Array.isArray(runs)
  ) return false;
  return runs.some(run =>
    run.name === name &&
    run.head_sha === sha &&
    run.app?.slug === 'github-actions' &&
    run.status === 'completed' &&
    run.conclusion === 'success' &&
    run.details_url?.includes('/actions/runs/') &&
    !run.details_url.includes('/actions/runs/' + runId + '/') &&
    run.pull_requests?.some(pr => pr.number === event.pull_request.number)
  );
}

async function main() {
  const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  let reuse = false;
  if (process.env.GITHUB_EVENT_NAME === 'pull_request' && event.action === 'edited' && !event.changes?.base) {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/commits/${process.env.GITHUB_SHA}/check-runs?per_page=100`,
        { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, Accept: 'application/vnd.github+json' } },
      );
      if (response.ok) {
        const data = await response.json();
        // A truncated inventory is ambiguous; run the normal suite.
        reuse = data.total_count < 100 && mayReuse(event, data.check_runs, {
          name: process.env.REQUIRED_CHECK_NAME,
          sha: process.env.GITHUB_SHA,
          repository: process.env.GITHUB_REPOSITORY,
          runId: process.env.GITHUB_RUN_ID,
        });
      }
    } catch { /* API failure must run the normal suite. */ }
  }
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `reuse=${reuse}\n`);
  console.log(reuse ? 'Prior successful required check verified for this exact PR merge commit.' : 'Full validation required.');
}
if (process.argv[1]?.endsWith('/required-check-reuse.mjs')) main().catch(error => { console.error(error); process.exitCode = 1; });
