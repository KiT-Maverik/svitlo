#!/usr/bin/env node
import { cpSync, mkdirSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// The UI Kit owns the canonical files. Each platform host owns its deployed
// copies, e.g. apps/web/public/flags. Never publish into the repository root.
const source = resolve(dirname(fileURLToPath(import.meta.url)), '../assets/flags');

export function syncFlags(targetRoot) {
  const root = resolve(targetRoot);
  const packageFile = resolve(root, 'package.json');
  if (!existsSync(packageFile)) {
    throw new Error('Flag synchronization requires a target workspace package.json');
  }
  const targetPackage = JSON.parse(readFileSync(packageFile, 'utf8'));
  if (typeof targetPackage.name !== 'string' || !targetPackage.name.startsWith('@svitlo/')) {
    throw new Error('Refusing to create public/flags outside a Svitlo workspace (e.g. at repository root)');
  }
  if (!existsSync(source)) throw new Error('UI Kit flag assets are missing from the installed package');
  const destination = resolve(root, 'public/flags');
  // Only replace the UI Kit-owned flag directory, preserving other host assets.
  rmSync(destination, { recursive: true, force: true });
  mkdirSync(dirname(destination), { recursive: true });
  cpSync(source, destination, { recursive: true });
  console.log('UI Kit flag assets installed at ' + destination);
  return destination;
}

// Retain the direct CLI and the existing Node --import preload used by
// standalone textbook hosts. Normal module imports stay side-effect-free.
const scriptPath = fileURLToPath(import.meta.url);
const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === scriptPath;
const preloaded = process.execArgv.some((arg, index) => {
  const specifier =
    arg === '--import'
      ? process.execArgv[index + 1]
      : arg.startsWith('--import=')
        ? arg.slice('--import='.length)
        : undefined;
  return specifier === import.meta.url || (specifier?.startsWith('/') && resolve(specifier) === scriptPath);
});
if (invokedDirectly || preloaded) syncFlags(invokedDirectly && process.argv[2] ? process.argv[2] : process.cwd());
