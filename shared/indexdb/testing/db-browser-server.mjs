/**
 * Standalone test-only Next.js host for native IndexedDB browser tests.
 * No learning application or production route is copied or modified.
 */
import { cpSync, existsSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawn } from 'node:child_process';

const packageRoot = process.cwd();
const workspaceRoot = resolve(packageRoot, '../..');
const installedNodeModules = join(workspaceRoot, 'node_modules');
const sandbox = mkdtempSync(join(tmpdir(), 'svitlo-db-e2e-'));
const port = process.env.PLAYWRIGHT_DB_PORT ?? '3107';
let cleaned = false;

function cleanup() {
  if (cleaned) return;
  cleaned = true;
  rmSync(sandbox, { recursive: true, force: true });
}

try {
  if (!existsSync(installedNodeModules)) {
    throw new Error('Run npm ci in the monorepo before native browser tests');
  }
  const appDir = join(sandbox, 'src', 'app');
  const routeDir = join(appDir, 'db-browser-harness');
  mkdirSync(routeDir, { recursive: true });
  writeFileSync(
    join(sandbox, 'package.json'),
    JSON.stringify(
      {
        name: 'svitlo-indexdb-browser-fixture',
        private: true,
        dependencies: {
          '@svitlo/indexdb': '0.0.0',
          next: '16.4.2',
          react: '19.3.0',
          'react-dom': '19.3.0',
        },
      },
      null,
      2,
    ) + '\n',
  );
  writeFileSync(
    join(sandbox, 'tsconfig.json'),
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2017',
          lib: ['dom', 'dom.iterable', 'esnext'],
          module: 'esnext',
          moduleResolution: 'bundler',
          jsx: 'preserve',
          strict: true,
          skipLibCheck: true,
          noEmit: true,
          esModuleInterop: true,
          resolveJsonModule: true,
          isolatedModules: true,
          incremental: true,
        },
        include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
        exclude: ['node_modules'],
      },
      null,
      2,
    ) + '\n',
  );
  writeFileSync(
    join(appDir, 'layout.tsx'),
    'import type { ReactNode } from "react";\n' +
      'export default function RootLayout({ children }: { children: ReactNode }) {\n' +
      '  return <html lang="en"><body>{children}</body></html>;\n' +
      '}\n',
  );
  cpSync(join(packageRoot, 'testing', 'DbBrowserHarness.tsx'), join(routeDir, 'page.tsx'));
  cpSync(join(packageRoot, 'testing', 'db-browser-commands.ts'), join(routeDir, 'db-browser-commands.ts'));
  symlinkSync(installedNodeModules, join(sandbox, 'node_modules'), 'dir');

  const nextBin = resolve(installedNodeModules, 'next/dist/bin/next');
  const child = spawn(process.execPath, [nextBin, 'dev', '--webpack', '--hostname', '127.0.0.1', '--port', port], {
    cwd: sandbox,
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
    stdio: 'inherit',
  });
  for (const signal of ['SIGINT', 'SIGTERM']) {
    process.on(signal, () => child.kill(signal));
  }
  child.on('error', error => {
    console.error(error);
    cleanup();
    process.exitCode = 1;
  });
  child.on('exit', (code, signal) => {
    cleanup();
    process.exit(code ?? (signal ? 1 : 0));
  });
  process.on('exit', cleanup);
} catch (error) {
  cleanup();
  throw error;
}
