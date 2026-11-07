'use strict';

// Run by a trusted workflow on main. Adds only labels backed by observable data.
// Priority/source are not guessed for PRs or external issue authors.
module.exports = async function backfill({ github, context, core, shard, shards }) {
  const { owner, repo } = context.repo;
  const catalogue = require('../labels.json');
  const knownLabels = new Set(catalogue.map(({ name }) => name));
  // Scope names determine paths; label descriptions are display text, not routing config.
  const scoped = catalogue.filter(
    label =>
      (/(content|app|backend|shared|repo): /.test(label.name) && label.name !== 'repo: general') ||
      label.name === 'studio',
  );
  const scopePaths = scoped.map(({ name }) => {
    if (name === 'studio') return { name, prefixes: ['studio/'] };
    const [kind, slug] = name.split(': ');
    if (kind === 'content') return { name, prefixes: ['content/' + slug + '/'] };
    if (kind === 'app') {
      const prefixes = ['apps/' + slug + '/'];
      return { name, prefixes };
    }
    if (kind === 'backend') return { name, prefixes: ['backend/' + slug + '/'] };
    if (kind === 'shared') return { name, prefixes: ['shared/' + slug + '/'] };
    if (name === 'repo: scripts') return { name, prefixes: ['scripts/'] };
    throw new Error('Unsupported scope label: ' + name);
  });
  const scopeNames = new Set(scoped.map(label => label.name));

  const allPulls = await github.paginate(github.rest.pulls.list, {
    owner,
    repo,
    state: 'all',
    per_page: 100,
  });
  const allIssuesAndPulls = await github.paginate(github.rest.issues.listForRepo, {
    owner,
    repo,
    state: 'all',
    per_page: 100,
  });
  const issues = allIssuesAndPulls.filter(issue => !issue.pull_request);
  const agentBranch = /(?:^|[-_/])agent[-_/]?[1-9][0-9]*(?:$|[-_/])/i;
  const agentTitle = /\bagent[\s#-]*[1-9][0-9]*\b/i;
  const isAgent = pr => agentBranch.test(pr.head.ref) || agentTitle.test(pr.title);
  const childBranches = new Map();
  for (const pr of allPulls) {
    if (!isAgent(pr)) continue;
    childBranches.set(pr.base.ref, (childBranches.get(pr.base.ref) || 0) + 1);
  }

  const scopeByName = new Map(scoped.map(({ name }) => [name.toLowerCase(), name]));
  const scopeBySlug = new Map();
  for (const { name } of scoped) {
    const slug = name.split(': ')[1];
    if (!scopeBySlug.has(slug)) scopeBySlug.set(slug, name);
  }
  const aliases = new Map([
    ['health & safety', 'content: health-safety'],
    ['health and safety', 'content: health-safety'],
    ['language & literature', 'content: language-literature'],
    ['language and literature', 'content: language-literature'],
    ['ukrainian language', 'content: languages'],
    ['ui kit', 'shared: ui-kit'],
    ['frontend', 'app: platform'],
    ['backend', 'backend: server'],
    ['repo', 'repo: general'],
  ]);
  function getAreas(paths) {
    const found = new Set();
    for (const path of paths) {
      for (const scope of scopePaths) {
        if (scope.prefixes.some(prefix => path.startsWith(prefix))) found.add(scope.name);
      }
    }
    return found.size ? [...found] : ['repo: general'];
  }
  function getIssueAreas(issue) {
    const title = issue.title.toLowerCase();
    const prefix = /^\[([^\]]+)\]/.exec(title);
    const first = prefix ? prefix[1] : title.split(/[\s:—-]/)[0];
    const named = scopeByName.get(first) || aliases.get(first) || scopeBySlug.get(first);
    if (named && knownLabels.has(named)) return [named];
    const candidates = (issue.body || '').match(/(?:content|shared|backend|frontend|apps|studio|scripts)\/[a-z-]+\//g);
    if (candidates) return getAreas(candidates);
    return ['repo: general'];
  }
  function getWork(title) {
    const t = title.toLowerCase();
    const result = new Set();
    if (/^(fix(?:\(|:|!|\/)|bug(?:\(|:|!|\/))/.test(t) || /\b(fix|bugfix|repair|regression)\b/.test(t))
      result.add('work: fix');
    const architectureTitle =
      /\b(architectur(?:e|al)|system design|(?:runtime|module|package|component) boundaries|data flows?|dependency injection)\b/.test(
        t,
      );
    if (architectureTitle) result.add('work: architecture');
    if (/^(feat(?:\(|:|!|\/)|feature(?:\(|:|!|\/))/.test(t) && !architectureTitle) result.add('work: feature');
    if (/\brefactor(?:ing)?\b/.test(t)) result.add('work: refactor');
    if (/\b(lesson|lessons|skills|taxonomy|curriculum)\b/.test(t)) result.add('work: content');
    if (/\b(translation|translate|localiz(?:ation|e|ing)|linguistic|language review)\b/.test(t))
      result.add('work: translation');
    if (/\b(review|audit|qa)\b/.test(t)) result.add('work: review');
    if (/\b(tests?|specs?)\b/.test(t)) result.add('work: tests');
    if (/\b(ci|pipeline|fastgate|workflow)\b/.test(t)) result.add('work: ci');
    if (/^(docs?)(?:\(|:|!)/.test(t) || /\b(documentation|readme)\b/.test(t)) result.add('work: docs');
    if (/\b(generator|tooling|cli)\b/.test(t)) result.add('work: tooling');
    return [...result].filter(label => knownLabels.has(label));
  }
  const counters = { prs: 0, issues: 0, changed: 0, added: 0, failed: 0 };
  const errors = [];

  async function apply(record, target) {
    const existing = new Set(record.labels.map(label => label.name));
    const existingScoped = [...existing].some(label => scopeNames.has(label));
    // Do not add the repository fallback when the Issue/PR already has a specific scope.
    const resolved = target.filter(label => label !== 'repo: general' || !existingScoped);
    const toAdd = resolved.filter(label => knownLabels.has(label) && !existing.has(label));
    const removeRepo =
      (existingScoped || resolved.some(label => scopeNames.has(label))) && existing.has('repo: general');
    const wrongRole = target.includes('pr: agent-subtask')
      ? 'pr: integration'
      : target.includes('pr: integration')
        ? 'pr: agent-subtask'
        : null;
    try {
      if (toAdd.length) {
        await github.rest.issues.addLabels({
          owner,
          repo,
          issue_number: record.number,
          labels: toAdd,
        });
        counters.added += toAdd.length;
      }
      for (const label of [
        removeRepo ? 'repo: general' : null,
        wrongRole && existing.has(wrongRole) ? wrongRole : null,
      ].filter(Boolean)) {
        await github.rest.issues.removeLabel({
          owner,
          repo,
          issue_number: record.number,
          name: label,
        });
      }
      if (toAdd.length || removeRepo || (wrongRole && existing.has(wrongRole))) {
        counters.changed++;
      }
    } catch (error) {
      counters.failed++;
      errors.push('#' + record.number + ': ' + error.message);
      core.error('Cannot label #' + record.number + ': ' + error.message);
    }
  }

  for (const pr of allPulls.filter(pr => pr.number % shards === shard)) {
    counters.prs++;
    try {
      const files = await github.paginate(github.rest.pulls.listFiles, {
        owner,
        repo,
        pull_number: pr.number,
        per_page: 100,
      });
      const paths = files.flatMap(file =>
        file.previous_filename ? [file.filename, file.previous_filename] : [file.filename],
      );
      const roles = isAgent(pr)
        ? ['pr: agent-subtask']
        : /\bintegration\b/i.test(pr.title) || (childBranches.get(pr.head.ref) || 0) >= 2
          ? ['pr: integration']
          : [];
      await apply(pr, [...getAreas(paths), ...roles, ...getWork(pr.title)]);
    } catch (error) {
      counters.failed++;
      errors.push('PR #' + pr.number + ': ' + error.message);
      core.error('Cannot inspect PR #' + pr.number + ': ' + error.message);
    }
  }
  for (const issue of issues.filter(issue => issue.number % shards === shard)) {
    counters.issues++;
    const existing = new Set(issue.labels.map(label => label.name));
    const priority = [...existing].some(label => label.startsWith('priority: ')) ? [] : ['priority: medium'];
    // Only the repository owner is reliably identified as an internal origin here.
    // External authors, experts, and user reports must be explicitly classified.
    const source = [...existing].some(label => label.startsWith('source: '))
      ? []
      : issue.user.login.toLowerCase() === owner.toLowerCase()
        ? ['source: internal']
        : [];
    await apply(issue, [...getIssueAreas(issue), ...getWork(issue.title), ...priority, ...source]);
  }
  const message = JSON.stringify({ shard, shards, ...counters, errors });
  core.info('Label backfill shard result: ' + message);
  if (errors.length) throw new Error('Backfill failures: ' + errors.join('; '));
};
