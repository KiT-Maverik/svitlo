#!/usr/bin/env node
/** Fail closed unless the newest prior required check proves the same Ready validation scope. */
import fs from 'node:fs';

const SHA = /^[a-f0-9]{40}$/;
const names = {
  'FastGate / verify': '.github/workflows/fast-gate.yml',
  'Production Quality / verify': '.github/workflows/production-quality.yml',
};

export function validationScope(event, { name, sha, repository }) {
  const pr = event?.pull_request;
  if (
    !Object.hasOwn(names, name) ||
    !SHA.test(sha ?? '') ||
    !Number.isSafeInteger(pr?.number) ||
    pr.number < 1 ||
    pr.draft !== false ||
    pr.state !== 'open' ||
    pr.head?.repo?.full_name !== repository ||
    pr.base?.repo?.full_name !== repository ||
    !SHA.test(pr.head?.sha ?? '') ||
    !SHA.test(pr.base?.sha ?? '') ||
    typeof pr.head.ref !== 'string' ||
    !pr.head.ref ||
    typeof pr.base.ref !== 'string' ||
    !pr.base.ref ||
    (name === 'Production Quality / verify' && (pr.base.ref !== 'main' || pr.head.ref !== 'develop'))
  )
    return null;
  return ['Validated Ready scope v1', pr.number, pr.head.ref, pr.head.sha, pr.base.ref, pr.base.sha, sha].join(' | ');
}

function jobLink(run, repository) {
  try {
    const url = new URL(run.details_url);
    const parts = url.pathname.split('/');
    if (
      url.origin !== 'https://github.com' ||
      parts.slice(1, 3).join('/') !== repository ||
      parts.length !== 8 ||
      parts[3] !== 'actions' ||
      parts[4] !== 'runs' ||
      !/^\d+$/.test(parts[5]) ||
      parts[6] !== 'job' ||
      !/^\d+$/.test(parts[7])
    )
      return null;
    return { runId: parts[5], jobId: parts[7] };
  } catch {
    return null;
  }
}

export async function mayReuse(event, runs, options, read) {
  const { name, repository, runId, runAttempt } = options;
  const scope = validationScope(event, options);
  if (
    !scope ||
    event.action !== 'edited' ||
    !event.changes?.body ||
    Object.keys(event.changes).some(key => key !== 'body') ||
    !/^\d+$/.test(runId ?? '') ||
    runAttempt !== '1' ||
    !Array.isArray(runs)
  )
    return false;

  const prior = [];
  for (const run of runs) {
    if (run.name !== name) continue;
    const link = jobLink(run, repository);
    if (!link || run.head_sha !== event.pull_request.head.sha || run.app?.slug !== 'github-actions') return false;
    if (link.runId === runId) continue;
    if (
      !run.pull_requests?.some(pr => pr.number === event.pull_request.number) ||
      run.status !== 'completed' ||
      !Number.isFinite(Date.parse(run.started_at)) ||
      !Number.isFinite(Date.parse(run.completed_at))
    )
      return false;
    prior.push({ run, link, started: Date.parse(run.started_at) });
  }
  prior.sort((a, b) => b.started - a.started);
  const latest = prior[0];
  if (!latest || prior[1]?.started === latest.started || latest.run.conclusion !== 'success') return false;
  try {
    const job = await read('actions/jobs/' + latest.link.jobId);
    const workflow = await read('actions/runs/' + latest.link.runId);
    return (
      String(job?.id) === latest.link.jobId &&
      String(job?.run_id) === latest.link.runId &&
      job.name === name &&
      job.status === 'completed' &&
      job.conclusion === 'success' &&
      String(workflow?.id) === latest.link.runId &&
      workflow.path === names[name] &&
      workflow.event === 'pull_request' &&
      workflow.head_sha === event.pull_request.head.sha &&
      workflow.status === 'completed' &&
      workflow.conclusion === 'success' &&
      Number.isSafeInteger(job.run_attempt) &&
      job.run_attempt === workflow.run_attempt &&
      job.steps?.filter(step => step.name === scope && step.conclusion === 'success').length === 1
    );
  } catch {
    return false;
  }
}

async function main() {
  const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  let reuse = false;
  if (process.env.GITHUB_EVENT_NAME === 'pull_request' && event.action === 'edited' && event.changes?.body) {
    try {
      const read = async route => {
        const response = await fetch('https://api.github.com/repos/' + process.env.GITHUB_REPOSITORY + '/' + route, {
          headers: { Authorization: 'Bearer ' + process.env.GITHUB_TOKEN, Accept: 'application/vnd.github+json' },
          signal: AbortSignal.timeout(15000),
        });
        if (!response.ok) throw Error('GitHub API lookup failed');
        return response.json();
      };
      // GitHub attaches PR check runs to the PR head, not the synthetic merge commit.
      // The successful scope step separately binds the exact merge SHA and base revision.
      const head = event.pull_request?.head?.sha;
      if (!SHA.test(head ?? '')) throw Error('Missing PR head SHA');
      const data = await read('commits/' + head + '/check-runs?filter=all&per_page=100');
      // Missing or truncated history is not evidence of successful validation.
      if (Array.isArray(data.check_runs) && data.total_count < 100 && data.total_count === data.check_runs.length) {
        reuse = await mayReuse(
          event,
          data.check_runs,
          {
            name: process.env.REQUIRED_CHECK_NAME,
            sha: process.env.GITHUB_SHA,
            repository: process.env.GITHUB_REPOSITORY,
            runId: process.env.GITHUB_RUN_ID,
            runAttempt: process.env.GITHUB_RUN_ATTEMPT,
          },
          read,
        );
      }
    } catch {
      /* API failure must run the normal suite. */
    }
  }
  fs.appendFileSync(process.env.GITHUB_OUTPUT, 'reuse=' + reuse + '\n');
  console.log(
    reuse ? 'Newest successful required check proves the exact Ready validation scope.' : 'Normal validation required.',
  );
}
if (process.argv[1]?.endsWith('/required-check-reuse.mjs'))
  main().catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
