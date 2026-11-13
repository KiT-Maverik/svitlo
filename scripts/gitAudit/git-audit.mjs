#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(name);
  return index < 0 ? fallback : args[index + 1];
};
const repo = resolve(option('--repo', process.cwd()));
const output = option('--output');
if (!output || args.some((arg, i) => arg.startsWith('--') && !['--repo', '--output'].includes(arg)) ||
    ['--repo', '--output'].some(flag => args.includes(flag) && !args[args.indexOf(flag) + 1])) {
  console.error('Usage: node git-audit.mjs [--repo PATH] --output DIRECTORY');
  process.exit(2);
}
const git = (argv, input, binary = false) => execFileSync('git', argv, {
  cwd: repo,
  input,
  encoding: binary ? 'buffer' : 'utf8',
  maxBuffer: 512 * 1024 * 1024,
});
const optionalGit = argv => { try { return git(argv).trim(); } catch { return ''; } };
const number = value => Number(value) || 0;
const bytes = value => `${(value / (1024 ** 2)).toFixed(2)} MiB`;
const top = (items, count = 20) => items.sort((a, b) => b.bytes - a.bytes).slice(0, count);
const table = (headers, rows) => [
  `| ${headers.join(' | ')} |`,
  `| ${headers.map(() => '---').join(' | ')} |`,
  ...rows.map(row => `| ${row.map(v => String(v).replaceAll('|', '\\|').replaceAll('\n', ' ')).join(' | ')} |`),
].join('\n');

function snapshot(ref) {
  const entries = git(['ls-tree', '-r', '-l', '-z', ref], undefined, true).toString('utf8').split('\0');
  const files = [];
  for (const entry of entries) {
    if (!entry) continue;
    const match = /^\d{6} blob ([a-f0-9]+)\s+(\d+)\t([\s\S]*)$/.exec(entry);
    if (match) files.push({ sha: match[1], bytes: number(match[2]), path: match[3] });
  }
  return files;
}

function summarizePaths(files) {
  const directories = new Map();
  const extensions = new Map();
  for (const file of files) {
    const directory = file.path.includes('/') ? file.path.split('/')[0] : '(root)';
    const name = file.path.split('/').at(-1);
    const extension = name.includes('.') ? `.${name.split('.').at(-1).toLowerCase()}` : '(no extension)';
    for (const [map, key] of [[directories, directory], [extensions, extension]]) {
      const item = map.get(key) ?? { name: key, bytes: 0, files: 0 };
      item.bytes += file.bytes;
      item.files += 1;
      map.set(key, item);
    }
  }
  return { directories: top([...directories.values()]), extensions: top([...extensions.values()]) };
}

function audit() {
  if (git(['rev-parse', '--is-shallow-repository']).trim() !== 'false') {
    throw new Error('Shallow history: use actions/checkout with fetch-depth: 0');
  }
  const head = git(['rev-parse', 'HEAD']).trim();
  const tracked = snapshot('HEAD');
  const trackedBlobs = new Set(tracked.map(f => f.sha));
  const objectsText = git(['rev-list', '--objects', '--all']).trimEnd();
  const objects = new Map();
  for (const line of objectsText.split('\n')) {
    if (!line) continue;
    const split = line.indexOf(' ');
    const sha = split < 0 ? line : line.slice(0, split);
    if (!objects.has(sha)) objects.set(sha, { sha, sample_path: split < 0 ? '' : line.slice(split + 1) });
  }
  const objectList = [...objects.values()];
  if (objectList.length) {
    const details = git(['cat-file', '--batch-check=%(objectname) %(objecttype) %(objectsize) %(objectsize:disk)'],
      objectList.map(object => object.sha).join('\n') + '\n').trimEnd().split('\n');
    if (details.length !== objectList.length) throw new Error('Incomplete git cat-file object inventory');
    for (let i = 0; i < details.length; i++) {
      const match = /^([a-f0-9]+) (\w+) (\d+) (\d+)$/.exec(details[i]);
      if (!match || match[1] !== objectList[i].sha) throw new Error(`Invalid Git object: ${details[i]}`);
      Object.assign(objectList[i], { type: match[2], bytes: number(match[3]), disk_bytes: number(match[4]) });
    }
  }
  const blobs = objectList.filter(item => item.type === 'blob');
  const historicalOnly = blobs.filter(item => !trackedBlobs.has(item.sha));
  const storage = Object.fromEntries(git(['count-objects', '-v']).trim().split('\n').map(line => {
    const at = line.indexOf(':');
    return [line.slice(0, at), number(line.slice(at + 1).trim())];
  }));
  const refs = git(['for-each-ref', '--format=%(refname)', 'refs/heads', 'refs/remotes', 'refs/tags'])
    .split('\n').filter(Boolean);
  const grouped = summarizePaths(tracked);
  const commits = git(['log', '--first-parent', '--format=%H%x09%cs', 'HEAD']).trim().split('\n').filter(Boolean);
  const months = new Map();
  for (const entry of commits) {
    const [sha, date] = entry.split('\t');
    const month = date.slice(0, 7);
    const info = months.get(month) ?? { month, first_parent_commits: 0, snapshot_sha: sha };
    info.first_parent_commits++;
    months.set(month, info);
  }
  const trend = [...months.values()].sort((a, b) => a.month.localeCompare(b.month));
  for (const month of trend) {
    const files = snapshot(month.snapshot_sha);
    month.snapshot_bytes = files.reduce((sum, file) => sum + file.bytes, 0);
    month.snapshot_files = files.length;
  }
  const totals = {
    current_files: tracked.length,
    current_snapshot_bytes: tracked.reduce((sum, file) => sum + file.bytes, 0),
    current_unique_blobs: trackedBlobs.size,
    all_ref_commits: number(git(['rev-list', '--count', '--all']).trim()),
    head_commits: number(git(['rev-list', '--count', 'HEAD']).trim()),
    objects: objectList.length,
    unique_blobs: blobs.length,
    all_unique_blob_bytes: blobs.reduce((sum, file) => sum + file.bytes, 0),
    historical_only_blobs: historicalOnly.length,
    historical_only_raw_bytes: historicalOnly.reduce((sum, file) => sum + file.bytes, 0),
    historical_only_disk_bytes: historicalOnly.reduce((sum, file) => sum + file.disk_bytes, 0),
    loose_objects: storage.count,
    packed_objects: storage['in-pack'],
    pack_bytes_approx: storage['size-pack'] * 1024,
    loose_bytes_approx: storage.size * 1024,
    local_branches: refs.filter(ref => ref.startsWith('refs/heads/')).length,
    remote_tracking_refs: refs.filter(ref => ref.startsWith('refs/remotes/')).length,
    tags: refs.filter(ref => ref.startsWith('refs/tags/')).length,
  };
  const result = {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    source: { repository: optionalGit(['remote', 'get-url', 'origin']), head, branch: git(['branch', '--show-current']).trim(),
      shallow: false, partial_clone: !!optionalGit(['config', '--get', 'extensions.partialclone']) },
    totals,
    current: grouped,
    largest_blobs: top(blobs.map(item => ({ ...item }))),
    largest_historical_only_blobs: top(historicalOnly.map(item => ({ ...item }))),
    trend,
    limitations: [
      'Snapshot sizes and unique blob bytes are uncompressed logical sizes, not Git pack sizes.',
      'Historical-only means absent from HEAD, not necessarily unreachable or safe to delete.',
      'sample_path is one path reported by rev-list, not a guaranteed latest or unique filename.',
      'Local runner pack usage differs from GitHub server storage; PR hidden refs may be excluded.',
      'Only committed data reachable via fetched Git refs is included; working files and untracked files are excluded.',
    ],
  };
  return result;
}

function markdown(data) {
  const t = data.totals;
  const objectRows = files => files.map(file => [bytes(file.bytes), bytes(file.disk_bytes),
    file.sample_path || '(no path)', file.sha.slice(0, 12)]);
  return `# Svitlo - repository Git audit\n\n` +
    `Generated: ${data.generated_at} | HEAD: \`${data.source.head}\`\n\n` +
    `## Overview\n\n` + table(['Metric', 'Value'], [
      ['Head commits', t.head_commits], ['Commits reachable from fetched refs', t.all_ref_commits],
      ['Tracked files at HEAD', t.current_files], ['Current snapshot (raw)', bytes(t.current_snapshot_bytes)],
      ['Unique blob objects', t.unique_blobs], ['Historical-only blobs', t.historical_only_blobs],
      ['Historical-only bytes (raw)', bytes(t.historical_only_raw_bytes)],
      ['All unique blobs (raw)', bytes(t.all_unique_blob_bytes)],
      ['Git pack size (runner, approximate)', bytes(t.pack_bytes_approx)],
      ['Loose objects', t.loose_objects], ['Packed objects', t.packed_objects],
      ['Local / remote-tracking refs / tags', `${t.local_branches} / ${t.remote_tracking_refs} / ${t.tags}`],
    ]) + `\n\n## Current snapshot by top-level directory\n\n` +
    table(['Directory', 'Raw size', 'Files'], data.current.directories.map(x => [x.name, bytes(x.bytes), x.files])) +
    `\n\n## Current snapshot by file extension\n\n` +
    table(['Extension', 'Raw size', 'Files'], data.current.extensions.map(x => [x.name, bytes(x.bytes), x.files])) +
    `\n\n## Largest reachable blob objects\n\n` +
    table(['Raw size', 'Git disk size', 'Sample path', 'Object'], objectRows(data.largest_blobs)) +
    `\n\n## Largest blobs absent from current HEAD\n\n` +
    table(['Raw size', 'Git disk size', 'Sample path', 'Object'], objectRows(data.largest_historical_only_blobs)) +
    `\n\n## First-parent development trend (monthly)\n\n` +
    table(['Month', 'Mainline commits', 'Snapshot raw size', 'Files'],
      data.trend.map(x => [x.month, x.first_parent_commits, bytes(x.snapshot_bytes), x.snapshot_files])) +
    `\n\n## Interpretation limits\n\n` + data.limitations.map(x => `- ${x}`).join('\n') + '\n';
}

try {
  const data = audit();
  mkdirSync(resolve(output), { recursive: true });
  writeFileSync(resolve(output, 'git-audit.json'), JSON.stringify(data, null, 2) + '\n');
  writeFileSync(resolve(output, 'git-audit.md'), markdown(data));
  console.log(`Git audit generated for ${data.source.head}: ${data.totals.current_files} files, ${data.totals.unique_blobs} unique blobs.`);
} catch (error) {
  console.error(`Git audit failed: ${error.message}`);
  process.exitCode = 1;
}
