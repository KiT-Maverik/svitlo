import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';

// Resolve the UI Kit's source-local TypeScript aliases without Next.js or
// vite-tsconfig-paths (which would pull in the deprecated tsconfck dependency).
const sourceAlias = [
  { find: '@', replacement: fileURLToPath(new URL('../src', import.meta.url)) },
  { find: '#layout', replacement: fileURLToPath(new URL('../src/components/layout', import.meta.url)) },
  { find: '#widgets', replacement: fileURLToPath(new URL('../src/components/widgets', import.meta.url)) },
  { find: '#data', replacement: fileURLToPath(new URL('../src/components/data', import.meta.url)) },
  { find: '#testing', replacement: fileURLToPath(new URL('../src/testing', import.meta.url)) },
  { find: '#types', replacement: fileURLToPath(new URL('../src/types', import.meta.url)) },
  { find: '#utils', replacement: fileURLToPath(new URL('../src/utils', import.meta.url)) },
];

const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: [{ from: '../assets/flags', to: '/flags' }],
  async viteFinal(viteConfig) {
    // Vite accepts both alias object and alias array configurations. Preserve
    // Storybook's own aliases while providing the package-local source paths.
    const existing = viteConfig.resolve?.alias ?? [];
    const preserved = Array.isArray(existing)
      ? existing
      : Object.entries(existing).map(([find, replacement]) => ({ find, replacement }));
    return {
      ...viteConfig,
      resolve: {
        ...viteConfig.resolve,
        alias: [...sourceAlias, ...preserved],
      },
    };
  },
} satisfies StorybookConfig;

export default config;
