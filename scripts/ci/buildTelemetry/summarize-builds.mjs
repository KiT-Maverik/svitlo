#!/usr/bin/env node
/**
 * @fileoverview Read-only summary of optional CI build-command and reuse events.
 * These counts describe instrumented commands, not an exhaustive compiler trace.
 */
import { appendFileSync, existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function summarizeBuilds(lines) {
  const rows = new Map();
  let total = 0;
  for (const line of lines.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const event = JSON.parse(line);
    if (
      event.schemaVersion !== 1 ||
      event.operation !== 'package:build' ||
      !['built', 'reused', 'failed'].includes(event.outcome) ||
      typeof event.workspace !== 'string' ||
      !Number.isFinite(event.durationMs) ||
      event.durationMs < 0
    ) throw new Error('Invalid build telemetry event');
    const key = (event.origin || event.recordKind || 'reuse-helper') + ' | ' + event.workspace;
    const row = rows.get(key) || {
      key, requests: 0, built: 0, reused: 0, failed: 0, durationMs: 0,
      rebuildReasons: {}, unverifiedAfterBuild: 0,
    };
    row.requests++;
    row[event.outcome]++;
    row.durationMs += event.durationMs;
    if (event.rebuildReason != null) {
      if (!['built', 'failed'].includes(event.outcome) || typeof event.rebuildReason !== 'string') {
        throw new Error('Invalid rebuild reason in build telemetry event');
      }
      row.rebuildReasons[event.rebuildReason] = (row.rebuildReasons[event.rebuildReason] || 0) + 1;
    }
    if (event.outcome === 'built' && Object.hasOwn(event, 'sourceAfterBuildRevision') &&
      event.sourceAfterBuildRevision === null) {
      row.unverifiedAfterBuild++;
    }
    rows.set(key, row);
    total++;
  }
  return { total, rows: [...rows.values()].sort((a, b) => a.key.localeCompare(b.key)) };
}

export function formatBuildSummary({ total, rows }) {
  if (!total) return 'No instrumented build commands recorded in this job.\n';
  return [
    'Instrumented package build commands (not exhaustive compiler invocations):',
    '| Origin and workspace | Requests | Built | Verified reuse | Failed | Request seconds | Rebuild reasons | Unverified after build |',
    '| --- | ---: | ---: | ---: | ---: | ---: | --- | ---: |',
    ...rows.map(row => {
      const reasons = Object.entries(row.rebuildReasons || {})
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([reason, count]) => reason + ': ' + count)
        .join(', ') || '—';
      return '| ' + row.key.replaceAll('|', '/') + ' | ' + row.requests + ' | ' + row.built +
        ' | ' + row.reused + ' | ' + row.failed + ' | ' + (row.durationMs / 1000).toFixed(2) +
        ' | ' + reasons + ' | ' + (row.unverifiedAfterBuild || 0) + ' |';
    }),
    '',
  ].join('\n');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.length !== 4 || process.argv[2] !== '--file') {
      throw new Error('Usage: summarize-builds.mjs --file <job-local-jsonl>');
    }
    const file = process.argv[3];
    const result = formatBuildSummary(summarizeBuilds(existsSync(file) ? readFileSync(file, 'utf8') : ''));
    console.log(result);
    if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, '\n' + result + '\n');
  } catch (error) {
    // This is diagnostic output; do not override build/test exit statuses.
    console.warn('Optional build telemetry summary unavailable: ' + String(error.message || error));
  }
}
