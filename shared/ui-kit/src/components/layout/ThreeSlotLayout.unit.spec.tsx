import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import ThreeSlotLayout from './ThreeSlotLayout';
import { testId } from './ThreeSlotLayout.constants';

const slot = (name: keyof typeof testId.slots, root?: HTMLElement) =>
  (root ? within(root) : screen).queryByTestId(testId.slots[name]);

describe('ThreeSlotLayout', () => {
  it.each(['horizontal', 'vertical'] as const)(
    'uses a single three-zone grid along the %s axis',
    axis => {
      render(
        <ThreeSlotLayout
          axis={axis}
          slots={{ start: 'First', center: 'Expandable', end: 'Last' }}
        />,
      );
      const root = screen.getByTestId(testId.container);
      expect(root).toHaveAttribute('data-axis', axis);
      expect(slot('start', root)).toHaveTextContent('First');
      expect(slot('center', root)).toHaveTextContent('Expandable');
      expect(slot('end', root)).toHaveTextContent('Last');
      expect(root.children).toHaveLength(3);
    },
  );

  it('omits empty edge tracks and retains a center region without imposing scrollbars', () => {
    render(<ThreeSlotLayout axis="vertical" slots={{ center: 'Only center' }} />);
    const root = screen.getByTestId(testId.container);
    expect(slot('start', root)).not.toBeInTheDocument();
    expect(slot('end', root)).not.toBeInTheDocument();
    expect(slot('center', root)).toHaveTextContent('Only center');
    expect(root.children).toHaveLength(1);
    expect(root).not.toHaveStyle({ overflowY: 'auto' });
    expect(slot('center', root)).not.toHaveStyle({ overflowY: 'auto' });
  });

  it('preserves navbar-style empty slots when requested', () => {
    render(<ThreeSlotLayout axis="horizontal" slots={{ center: 'Navigation' }} keepEmptySlots />);
    expect(slot('start')).toBeEmptyDOMElement();
    expect(slot('end')).toBeEmptyDOMElement();
  });

  it('provides slot-based configuration for center alignment and event handlers', () => {
    const onClick = vi.fn();
    render(
      <ThreeSlotLayout
        axis="vertical"
        component="section"
        slots={{ start: 'Header', center: 'Body', end: 'Footer' }}
        slotProps={{
          root: { title: 'Shell', dir: 'ltr' },
          center: { 'data-testid': 'custom-center', title: 'Bottom-aligned center', onClick, sx: { justifyContent: 'flex-end' } },
          end: { title: 'Footer region' },
        }}
      />,
    );
    const root = screen.getByTitle('Shell');
    expect(root.tagName).toBe('SECTION');
    expect(root).toHaveAttribute('dir', 'ltr');
    const center = screen.getByTestId('custom-center');
    expect(center).toHaveAttribute('title', 'Bottom-aligned center');
    expect(center).toHaveTextContent('Body');
    expect(slot('end', root)).toHaveAttribute('title', 'Footer region');
    fireEvent.click(center);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('mirrors horizontal logical start/end under RTL without swapping content', () => {
    render(
      <ThreeSlotLayout
        axis="horizontal"
        slots={{ start: 'Logical start', center: 'Free region', end: 'Logical end' }}
        slotProps={{ root: { dir: 'rtl' } }}
      />,
    );
    const root = screen.getByTestId(testId.container);
    expect(root).toHaveAttribute('dir', 'rtl');
    expect(slot('start', root)).toHaveTextContent('Logical start');
    expect(slot('end', root)).toHaveTextContent('Logical end');
  });

  it('permits multiple independently configured instances', () => {
    render(
      <>
        <ThreeSlotLayout axis="horizontal" slots={{ center: 'Horizontal' }} />
        <ThreeSlotLayout axis="vertical" slots={{ center: 'Vertical' }} />
      </>,
    );
    const roots = screen.getAllByTestId(testId.container);
    expect(roots.map(root => root.getAttribute('data-axis'))).toEqual(['horizontal', 'vertical']);
  });
});
