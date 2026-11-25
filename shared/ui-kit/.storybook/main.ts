import type { StorybookConfig } from '@storybook/nextjs-vite';

const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: [{ from: '../assets/flags', to: '/flags' }],
} satisfies StorybookConfig;

export default config;
