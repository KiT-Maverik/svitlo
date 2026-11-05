#!/usr/bin/env node
import { cpSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const source = resolve(dirname(fileURLToPath(import.meta.url)), '../assets/flags');
const packageFile = resolve(process.cwd(), 'package.json');
if (!existsSync(packageFile)) throw new Error('Run flag synchronization from a target workspace directory');
const targetPackage = JSON.parse(readFileSync(packageFile, 'utf8'));
if (typeof targetPackage.name !== 'string' || !targetPackage.name.startsWith('@svitlo/')) {
  throw new Error('Refusing to create public/flags outside a Svitlo workspace (e.g. at repository root)');
}
const destination = resolve(process.cwd(), 'public/flags');
if (!existsSync(source)) throw new Error('UI Kit flag assets are missing from the installed package');
mkdirSync(destination, { recursive: true });
cpSync(source, destination, { recursive: true, force: true });
console.log('UI Kit flag assets installed at ' + destination);
