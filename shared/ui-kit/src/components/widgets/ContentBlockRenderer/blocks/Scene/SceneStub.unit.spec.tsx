import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SceneStub } from './SceneStub';

describe('SceneStub', () => {
  it('renders a visible screen-reader status without inventing a Scene', () => {
    render(<SceneStub locales={{ title: 'Перевірка' }} />);
    const status = screen.getByRole('status');
    expect(status).toBeVisible();
    expect(status).toHaveTextContent('Not implemented');
    expect(screen.queryByText('Перевірка')).not.toBeInTheDocument();
  });

  it('accepts a localized Scene value without assuming its shape', () => {
    render(<SceneStub locales="Source-owned value" />);
    expect(screen.getByRole('status')).toHaveTextContent('Not implemented');
    expect(screen.queryByText('Source-owned value')).not.toBeInTheDocument();
  });
});
