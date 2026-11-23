import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Markdown } from './Markdown';
import { ContentLanguageContext } from '../../ContentLanguageContext';

const meta = {
  title: 'Content blocks/Markdown',
  component: Markdown,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Renders localized Markdown with sanitized HTML, links, lists, code and inline/display LaTeX formulas. Supports RTL languages.',
      },
    },
  },
  args: {
    id: 'markdown-example',
    slug: 'markdownExample',
    type: 'markdown',
    params: {},
    locale: {
      value:
        '# How light moves\n\nLight travels in **straight lines** through a uniform medium.\n\n- Observe the ray\n- Describe its direction\n\n[Learn more](https://en.wikipedia.org/wiki/Light)',
    },
  },
  argTypes: {
    id: { control: false },
    slug: { control: false },
    type: { control: false },
    locale: { control: 'object' },
  },
} satisfies Meta<typeof Markdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const RichFormatting: Story = {
  args: {
    locale: {
      value:
        '## Markdown elements\n\nA paragraph with *emphasis*, **bold text**, and `inline code`.\n\n> A short quotation.\n\n1. First item\n2. Second item\n\n```typescript\nconst lightSpeed = 299_792_458;\n```',
    },
  },
};

export const MathematicalNotation: Story = {
  args: {
    locale: {
      value: 'A circle has area $S = \\pi r^2$.\n\n$$\nE = mc^2\n$$',
    },
  },
};

export const AuthoredHtml: Story = {
  args: {
    locale: {
      value:
        '<aside><strong>Did you know?</strong> White light contains different colors.</aside>\n\nThe <mark>prism</mark> separates light into a spectrum.',
    },
  },
};

export const RightToLeft: Story = {
  decorators: [
    StoryComponent => (
      <ContentLanguageContext.Provider value="ar">
        <StoryComponent />
      </ContentLanguageContext.Provider>
    ),
  ],
  args: {
    locale: {
      value: '# كيف ينتقل الضوء؟\n\nينتقل الضوء في **خطوط مستقيمة** في وسط متجانس.\n\n- انظر إلى الشعاع\n- حدد اتجاهه',
    },
  },
};

export const Empty: Story = {
  args: { locale: { value: '' } },
};
