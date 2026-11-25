import fs from 'node:fs';
import path from 'node:path';

/**
 * Coverage policy for Engine executable sources. Keep this explicit rather than
 * counting every compiled file: data-only schemas, re-export modules and TS-only
 * contracts do not yield meaningful line/branch coverage.
 */
export function isEngineCoverageTarget(relative) {
  if (typeof relative !== 'string' || relative.startsWith('/') || relative.includes('..') || relative.includes('\\')) {
    return false;
  }
  if (relative.startsWith('configurators_old/') || relative.startsWith('scripts/')) return false;
  if (/\.(?:spec|typecheck|types)\.(?:ts|js|mjs)$/.test(relative)) return false;
  if (/(?:^|\/)index\.ts$/.test(relative) || relative === 'runtime.ts') return false;

  if (/\.utils?\.ts$/.test(relative)) return true;
  if (/^assemblers\/.+\.ts$/.test(relative)) return true;
  if (/^lessons\/.+\.ts$/.test(relative)) return true;
  if (/^configurators\/(?:.+\/)?define[A-Za-z0-9]+\.ts$/.test(relative)) return true;
  if (relative === 'configurators/configuratorArrayToSlugMap.ts') return true;
  if (relative === 'schemas/misc.schemas.ts') return true;
  if (relative === 'generators/skills/publishSkillTree.mjs') return true;
  return false;
}

export function collectCoverageTargets(engineRoot) {
  const files = [];
  function walk(directory, relative = '') {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const name = relative ? relative + '/' + entry.name : entry.name;
      if (entry.isDirectory()) {
        if (['node_modules', 'dist', '.test-build', '.coverage-engine', 'configurators_old'].includes(entry.name)) continue;
        walk(path.join(directory, entry.name), name);
      } else if (entry.isFile() && isEngineCoverageTarget(name)) {
        files.push(name);
      }
    }
  }
  walk(engineRoot);
  return files.sort();
}

function normalizeLcovPath(source, engineRoot) {
  if (!source || source.includes('\\0')) return null;
  const absolute = path.resolve(engineRoot, source);
  const relative = path.relative(engineRoot, absolute).split(path.sep).join('/');
  return isEngineCoverageTarget(relative) ? relative : null;
}

/** Parse source-map-remapped LCOV. Unobserved source files are handled separately. */
export function parseLcov(lcov, engineRoot) {
  const covered = new Map();
  for (const block of lcov.split(/end_of_record\s*(?:\r?\n|$)/)) {
    const lines = block.split(/\r?\n/);
    const sf = lines.find(line => line.startsWith('SF:'));
    const relative = sf ? normalizeLcovPath(sf.slice(3), engineRoot) : null;
    if (!relative) continue;
    const record = covered.get(relative) ?? { lines: new Map(), branches: new Map(), functionLines: new Map(), functions: new Map() };
    for (const line of lines) {
      if (line.startsWith('DA:')) {
        const [number, hits] = line.slice(3).split(',');
        if (!/^\d+$/.test(number) || !/^\d+$/.test(hits)) continue;
        const lineNumber = Number(number);
        record.lines.set(lineNumber, (record.lines.get(lineNumber) ?? 0) + Number(hits));
      } else if (line.startsWith('BRDA:')) {
        const [number, blockId, branchId, hits] = line.slice(5).split(',');
        if (!/^\d+$/.test(number) || !blockId || !branchId) continue;
        const id = number + ':' + blockId + ':' + branchId;
        const count = hits === '-' ? 0 : Number(hits);
        record.branches.set(id, { line: Number(number), hits: (record.branches.get(id)?.hits ?? 0) + (Number.isFinite(count) ? count : 0) });
      } else if (line.startsWith('FN:')) {
        const [number, ...name] = line.slice(3).split(',');
        if (/^\d+$/.test(number)) record.functionLines.set(name.join(','), Number(number));
      } else if (line.startsWith('FNDA:')) {
        const [hits, ...name] = line.slice(5).split(',');
        const count = Number(hits);
        if (Number.isFinite(count)) {
          const key = name.join(',');
          record.functions.set(key, (record.functions.get(key) ?? 0) + count);
        }
      }
    }
    covered.set(relative, record);
  }
  return covered;
}

function groupRanges(values) {
  const numbers = [...new Set(values)].sort((a, b) => a - b);
  const ranges = [];
  for (const current of numbers) {
    const last = ranges[ranges.length - 1];
    if (last && current <= last[1] + 1) last[1] = current;
    else ranges.push([current, current]);
  }
  return ranges.map(([first, last]) => first === last ? String(first) : first + '-' + last);
}

function shortRanges(values, max = 8) {
  const ranges = groupRanges(values);
  return ranges.slice(0, max).join(', ') + (ranges.length > max ? ', …' : '');
}

/** No fully covered file appears in the returned details. */
export function buildGapReport({ targets, lcov, engineRoot, changed = [], maxItems = 15, sha = '' }) {
  const entries = parseLcov(lcov, engineRoot);
  if (entries.size === 0) throw new Error('No targeted Engine source coverage found; check source maps and test execution');
  const changedSet = new Set(changed.map(file => file.replace(/^shared\/engine\//, '')));
  const gaps = [];
  let complete = 0;
  let notExecuted = 0;
  for (const file of targets) {
    const item = entries.get(file);
    if (!item) {
      notExecuted++;
      gaps.push({ file: 'shared/engine/' + file, status: 'not-executed', changed: changedSet.has(file), lines: [], branches: [], functions: [], missingLineCount: null, missingBranchCount: null });
      continue;
    }
    const lines = [...item.lines].filter(([, hits]) => hits === 0).map(([number]) => number).sort((a, b) => a - b);
    const branches = [...item.branches.values()].filter(entry => entry.hits === 0).map(entry => entry.line).sort((a, b) => a - b);
    const functions = [...item.functions].filter(([, hits]) => hits === 0).map(([name]) => ({ name, line: item.functionLines.get(name) ?? null })).sort((a, b) => (a.line ?? 0) - (b.line ?? 0));
    if (lines.length === 0 && branches.length === 0 && functions.length === 0) {
      complete++;
      continue;
    }
    gaps.push({
      file: 'shared/engine/' + file,
      status: 'partial',
      changed: changedSet.has(file),
      lines: [...new Set(lines)],
      branches: [...new Set(branches)],
      functions,
      missingLineCount: lines.length,
      missingBranchCount: branches.length,
    });
  }
  gaps.sort((a, b) =>
    Number(b.changed) - Number(a.changed) ||
    Number(a.status === 'not-executed') - Number(b.status === 'not-executed') ||
    (b.missingLineCount ?? 0) - (a.missingLineCount ?? 0) ||
    a.file.localeCompare(b.file),
  );
  const result = {
    schemaVersion: 1,
    scope: 'engine',
    sourceCommit: sha,
    targetFiles: targets.length,
    completeFiles: complete,
    filesWithGaps: gaps.length,
    notExecutedFiles: notExecuted,
    gaps,
  };
  result.markdown = renderGapMarkdown(result, maxItems);
  return result;
}

const escapeMarkdown = value => String(value).replace(/[\\|\x60\[\]<>]/g, '\\$&');

export function renderGapMarkdown(report, maxItems = 15) {
  const link = file => report.sourceCommit && /^[a-f0-9]{40}$/i.test(report.sourceCommit)
    ? '[\x60' + escapeMarkdown(file.file) + '\x60](https://github.com/KiT-Maverik/svitlo/blob/' + report.sourceCommit + '/' + file.file + (file.lines[0] ? '#L' + file.lines[0] : '') + ')'
    : '\x60' + escapeMarkdown(file.file) + '\x60';
  const text = [
    '<!-- svitlo-engine-coverage-gaps -->',
    '### Engine coverage gaps',
    '',
    '**Scope:** executable Engine modules (including `*.utils.ts`/`*.util.ts`, assemblers, Lesson logic and `define*`); `configurators_old`, tests, generated code, types and declaration-only files are excluded.',
    '',
    '| Files considered | With gaps | Not executed | Fully covered |',
    '| ---: | ---: | ---: | ---: |',
    '| ' + report.targetFiles + ' | ' + report.filesWithGaps + ' | ' + report.notExecutedFiles + ' | ' + report.completeFiles + ' |',
    '',
  ];
  if (report.gaps.length === 0) {
    text.push('No gaps were detected in instrumented targeted files.');
  } else {
    text.push('**Only missing coverage is listed** (changed source files first):', '');
    text.push('| Source | Gap | Uncovered locations |', '| --- | --- | --- |');
    for (const file of report.gaps.slice(0, maxItems)) {
      if (file.status === 'not-executed') {
        text.push('| ' + link(file) + (file.changed ? ' (changed)' : '') + ' | Not executed | No coverage recorded; check that this module is loaded by the test suite |');
        continue;
      }
      const labels = [
        file.lines.length && 'lines ' + shortRanges(file.lines),
        file.branches.length && 'branches at ' + shortRanges(file.branches),
        file.functions.length && 'functions ' + file.functions.slice(0, 4).map(fn => escapeMarkdown(fn.name) + (fn.line ? ':' + fn.line : '')).join(', ') + (file.functions.length > 4 ? ', …' : ''),
      ].filter(Boolean);
      text.push('| ' + link(file) + (file.changed ? ' (changed)' : '') + ' | ' + file.missingLineCount + ' lines, ' + file.missingBranchCount + ' branches | ' + labels.join('; ') + ' |');
    }
    if (report.gaps.length > maxItems) text.push('', '**+' + (report.gaps.length - maxItems) + ' additional files with gaps** are in the machine-readable artifact (`engine-gaps.json`).');
  }
  text.push('', 'This is a diagnostic report, **not a coverage threshold or an assertion of test quality**. Only executed source files can have measured line/branch hits; non-executed targets are explicitly flagged. The uploaded artifact contains only gaps, not fully covered file details.');
  return text.join('\n') + '\n';
}
