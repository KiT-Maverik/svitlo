import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { ContentBlock_Code_Response } from '@svitlo/engine/content';

import { Code } from './Code';
import { resolveCodeVariables } from './Code.utils';

const response: ContentBlock_Code_Response = {
  id: 'code-1',
  type: 'code',
  locale: { code: 'uk' },
  language: 'typescript',
  title: 'Приклад',
  code: 'const greeting = "{{greeting}}";\nconsole.log(greeting);',
  variables: [{ id: 'greeting', value: 'Привіт' }],
};

describe('Code content block', () => {
  it('substitutes localized variables and highlights the declared language', () => {
    const { container } = render(<Code {...response} />);
    expect(screen.getByText('typescript')).toBeVisible();
    expect(screen.getByText('Приклад')).toBeVisible();
    expect(container.querySelector('code')?.textContent).toBe('const greeting = "Привіт";\nconsole.log(greeting);');
    expect(container.querySelector('.hljs-keyword')).toHaveTextContent('const');
    expect(container.querySelector('figure')).toHaveAttribute('lang', 'uk-UA');
  });

  it('shows unknown languages and missing variables as readable plain text', () => {
    const { container } = render(<Code {...response} language="made-up" variables={[]} />);
    expect(container.querySelector('code')).toHaveTextContent('const greeting = "greeting";');
    expect(container.querySelector('.hljs-keyword')).toBeNull();
  });

  it('never treats substituted code as markup', () => {
    expect(resolveCodeVariables('const value = "{{value}}";', [{ id: 'value', value: '<script>alert(1)</script>' }]))
      .toBe('const value = "<script>alert(1)</script>";');
    const { container } = render(<Code {...response} variables={[{ id: 'greeting', value: '<script>alert(1)</script>' }]} />);
    expect(container.querySelector('script')).toBeNull();
    expect(container.querySelector('code')).toHaveTextContent('<script>alert(1)</script>');
  });

  it('preserves ordinary closing braces in source code', () => {
    expect(resolveCodeVariables('const value = { nested: { count: 1 }};')).toBe('const value = { nested: { count: 1 }};');
  });
});
