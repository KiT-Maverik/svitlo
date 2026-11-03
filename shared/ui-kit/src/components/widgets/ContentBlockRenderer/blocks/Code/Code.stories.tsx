import type { Meta, StoryObj } from '@storybook/nextjs';
import { Code } from './Code';

const meta = {
  title: 'Content blocks/Code',
  component: Code,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: 'Read-only source code with language-aware syntax highlighting and localized variable substitution.' } },
  },
  args: {
    id: 'code-example',
    type: 'code',
    locale: { code: 'en' },
    title: 'Greeting',
    language: 'typescript',
    code: 'const greeting = "{{greeting}}";\nconsole.log(greeting);',
    variables: [{ id: 'greeting', value: 'Hello!' }],
  },
  argTypes: { id: { control: false }, type: { control: false }, variables: { control: 'object' } },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const LocalizedVariables: Story = {
  args: { locale: { code: 'uk' }, title: 'Привітання', variables: [{ id: 'greeting', value: 'Привіт!' }] },
};

export const UnknownLanguage: Story = {
  args: { language: 'custom-language', code: 'let value = 42;\nprint(value);', title: 'Plain-text fallback', variables: [] },
};

export const WithoutTitle: Story = {
  args: { title: undefined },
};
