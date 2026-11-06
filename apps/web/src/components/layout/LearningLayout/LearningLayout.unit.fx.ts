import { createElement, useState, type ComponentProps } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LearningLayout from './LearningLayout';
import { testId as navbarTestId } from '@svitlo/ui-kit/navigation/Navbar.constants';
import { testId as spaceTestId } from '@svitlo/ui-kit/widgets/VerticalSpace/VerticalSpace.constants';

const Navbar_fx = {
  selectors: {
    navigation: (name = 'Example navigation', scope?: HTMLElement) =>
      (scope ? within(scope) : screen).getByRole('navigation', { name }),
    slot: (name: keyof typeof navbarTestId.slots, navigation?: HTMLElement) =>
      (navigation ? within(navigation) : screen).getByTestId(navbarTestId.slots[name]),
  },
};
const VerticalSpace_fx = {
  selectors: {
    container: (scope?: HTMLElement) => (scope ? within(scope) : screen).getByTestId(spaceTestId.container),
    containers: () => screen.getAllByTestId(spaceTestId.container),
    slot: (name: keyof typeof spaceTestId.slots, scope?: HTMLElement) =>
      (scope ? within(scope) : screen).queryByTestId(spaceTestId.slots[name]),
  },
};
import { ukUiKitMessages } from '../../../../../../shared/ui-kit/src/testing/uiKitMessages.unit.fx';
const aria = ukUiKitMessages.learningLayout;

type Props = ComponentProps<typeof LearningLayout>;

const topics = [
  { id: 'demo', title: 'Example topic', href: '/uk/lesson/d3048d21-8690-5255-b62c-984c69ac272c' },
  { id: 'other', title: 'Another topic', href: '/uk/lesson/00000000-0000-5000-8000-000000000001' },
] as const;

export const LearningLayout_fx = {
  defaults: {
    topics,
    pathname: topics[0].href,
    skippableSteps: [true, false, false],
    messages: ukUiKitMessages,
    progress: { ready: true, step: 0, lastStep: 2, testDone: false },
    actions: { back: () => {}, next: () => {}, skip: () => {} },
  } satisfies Omit<Props, 'children'>,
  render: (props: Partial<Props> = {}) => {
    const { children = 'Lesson content', ...overrides } = props;
    function TestLayout() {
      const [step, setStep] = useState(0);
      const actions = {
        back: () => setStep(current => Math.max(0, current - 1)),
        next: () => setStep(current => Math.min(2, current + 1)),
        skip: () => setStep(current => Math.min(2, current + 1)),
      };
      return createElement(
        LearningLayout,
        {
          ...LearningLayout_fx.defaults,
          progress: { ...LearningLayout_fx.defaults.progress, step },
          actions,
          ...overrides,
        } as Props,
        children,
      );
    }
    return render(createElement(TestLayout));
  },
  navbar: Navbar_fx.selectors,
  child: { verticalSpace: VerticalSpace_fx.selectors },
  selectors: {
    top: () => screen.getByRole('navigation', { name: aria.navigation.top }),
    bottom: () => screen.getByRole('navigation', { name: aria.navigation.bottom }),
    topics: () => screen.getByRole('navigation', { name: aria.navigation.topics }),
    settings: () => screen.getByRole('complementary', { name: aria.navigation.settings }),
    main: () => screen.getByRole('main'),
    topAction: (name: string) => within(LearningLayout_fx.selectors.top()).getByRole('button', { name }),
    bottomAction: (name: string) =>
      within(LearningLayout_fx.selectors.bottom()).getByRole('button', { name: new RegExp(name) }),
  },
  actions: {
    openTopics: async () => userEvent.click(LearningLayout_fx.selectors.topAction(aria.actions.openTopics)),
    openSettings: async () => {
      await userEvent.click(LearningLayout_fx.selectors.topAction(aria.actions.profile));
      await userEvent.click(screen.getByRole('menuitem', { name: aria.settingsTitle }));
    },
    escape: async () => userEvent.keyboard('{Escape}'),
    next: async () => userEvent.click(LearningLayout_fx.selectors.bottomAction(aria.actions.next)),
    back: async () => userEvent.click(LearningLayout_fx.selectors.bottomAction(aria.actions.previous)),
    skip: async () => userEvent.click(LearningLayout_fx.selectors.bottomAction(aria.actions.skip)),
  },
} as const;
