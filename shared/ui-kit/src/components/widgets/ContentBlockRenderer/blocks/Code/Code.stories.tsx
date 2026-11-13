import type { Meta, StoryObj } from '@storybook/nextjs';
import { Code } from './Code';
import { ContentLanguageContext } from '../../ContentLanguageContext';

const meta = {
  title: 'Content blocks/Code',
  component: Code,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Read-only source code with language-aware syntax highlighting and localized variable substitution.',
      },
    },
  },
  args: {
    id: 'code-example',
    slug: 'codeExample',
    type: 'code',
    params: {
      language: 'typescript',
      codeAsText: 'const greeting = "%_%GREETING%_%";\nconsole.log(greeting);',
    },
    locale: { title: 'Greeting', variables: { GREETING: 'Hello!' } },
  },
  argTypes: {
    id: { control: false },
    slug: { control: false },
    type: { control: false },
    params: { control: 'object' },
    locale: { control: 'object' },
  },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const LocalizedVariables: Story = {
  decorators: [
    StoryComponent => (
      <ContentLanguageContext.Provider value="uk">
        <StoryComponent />
      </ContentLanguageContext.Provider>
    ),
  ],
  args: { locale: { ...meta.args.locale, title: 'Привітання', variables: { GREETING: 'Привіт!' } } },
};

export const UnknownLanguage: Story = {
  args: {
    params: {
      ...meta.args.params,
      language: 'custom-language',
      codeAsText: 'let value = 42;\nprint(value);',
    },
    locale: { ...meta.args.locale, title: 'Plain-text fallback', variables: {} },
  },
};

export const WithoutTitle: Story = {
  args: { locale: { ...meta.args.locale, title: undefined } },
};
