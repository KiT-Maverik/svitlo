import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import LearningLayout from './LearningLayout';
import { LessonSteps } from '../../lesson/LessonSteps';
import { learningLayout } from '../../../../data/locale/learningLayout';

// Intercept the physical anchor and Slide direction passed to MUI.
// MUI flips the Slide direction automatically in RTL, even though Drawer
// still positions its Paper using the explicitly provided physical anchor.
vi.mock('@mui/material/Drawer', () => ({
  default: ({
    anchor,
    open,
    slotProps,
    children,
  }: {
    anchor: 'left' | 'right';
    open: boolean;
    slotProps?: { transition?: { direction?: 'left' | 'right' } };
    children: ReactNode;
  }) => (
    <div
      data-testid="sidebar-drawer"
      data-anchor={anchor}
      data-slide-direction={slotProps?.transition?.direction}
      data-open={open}
    >
      {children}
    </div>
  ),
}));

const messages = learningLayout.uk;
const commonProps = {
  messages,
  pathname: '/lesson/test',
  topics: [],
  progress: { ready: true, step: 0, lastStep: 1, testDone: false },
  actions: { back: vi.fn(), next: vi.fn(), skip: vi.fn() },
};

function expectDrawerDirections(topicsAnchor: string, settingsAnchor: string) {
  const topicsDrawer = screen.getByRole('navigation', { name: messages.navigation.topics }).closest('[data-testid="sidebar-drawer"]');
  const settingsDrawer = screen
    .getByRole('complementary', { name: messages.navigation.settings })
    .closest('[data-testid="sidebar-drawer"]');

  expect(topicsDrawer).toHaveAttribute('data-anchor', topicsAnchor);
  expect(topicsDrawer).toHaveAttribute('data-slide-direction', topicsAnchor === 'left' ? 'right' : 'left');
  expect(settingsDrawer).toHaveAttribute('data-anchor', settingsAnchor);
  expect(settingsDrawer).toHaveAttribute('data-slide-direction', settingsAnchor === 'left' ? 'right' : 'left');
}

describe('LearningLayout sidebar animation direction', () => {
  it('opens both sidebars from their physical edges in LTR', () => {
    render(<LearningLayout {...commonProps} locale="uk-UA"><p>Lesson</p></LearningLayout>);
    expectDrawerDirections('left', 'right');
  });

  it.each(['ar-SA', 'he-IL', 'ur-PK'] as const)(
    'mirrors the sidebar edges and matching slide directions for RTL locale %s',
    locale => {
      render(<LearningLayout {...commonProps} locale={locale}><p>Lesson</p></LearningLayout>);
      expectDrawerDirections('right', 'left');
    },
  );

  it('passes RTL reading order to the Lesson Stepper in the lesson content', () => {
    render(
      <LearningLayout {...commonProps} locale="ar-SA">
        <LessonSteps
          navigationLabel="Lesson steps"
          steps={[{ id: 'one', title: 'One' }, { id: 'two', title: 'Two' }]}
          currentStep={0}
        />
      </LearningLayout>,
    );

    const stepper = screen.getByRole('navigation', { name: 'Lesson steps' });
    expect(stepper.closest('[dir]')).toHaveAttribute('dir', 'rtl');
    expect(stepper.querySelectorAll('button')[0]).toHaveAttribute('aria-current', 'step');
  });

  it('updates both animations when the interface language changes from LTR to RTL', () => {
    const view = render(<LearningLayout {...commonProps} locale="uk-UA"><p>Lesson</p></LearningLayout>);
    expectDrawerDirections('left', 'right');

    view.rerender(<LearningLayout {...commonProps} locale="ar-SA"><p>Lesson</p></LearningLayout>);
    expectDrawerDirections('right', 'left');
  });
});
