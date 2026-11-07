import { describe, expect, it } from 'vitest';
import { VerticalSpace_fx } from './VerticalSpace.unit.fx';

describe('Widgets', () => {
  describe('VerticalSpace', () => {
    it('should render the required center content without optional edge slots', () => {
      VerticalSpace_fx.render();
      expect(VerticalSpace_fx.selectors.slot('center')).toHaveTextContent('Center content');
      expect(VerticalSpace_fx.selectors.slot('top')).not.toBeInTheDocument();
      expect(VerticalSpace_fx.selectors.slot('bottom')).not.toBeInTheDocument();
    });

    it('should render top and bottom content in separate stable slots', () => {
      VerticalSpace_fx.render({ top: 'Header content', center: 'Body content', bottom: 'Footer content' });
      const root = VerticalSpace_fx.selectors.container();
      expect(VerticalSpace_fx.selectors.slot('top', root)).toHaveTextContent('Header content');
      expect(VerticalSpace_fx.selectors.slot('center', root)).toHaveTextContent('Body content');
      expect(VerticalSpace_fx.selectors.slot('bottom', root)).toHaveTextContent('Footer content');
    });

    it('allocates grid rows only for populated slots', () => {
      const view = VerticalSpace_fx.render();
      expect(VerticalSpace_fx.selectors.container()).toHaveAttribute('data-has-top', 'false');
      expect(VerticalSpace_fx.selectors.container()).toHaveAttribute('data-has-bottom', 'false');

      view.rerender(<></>);
      // Each configuration is independently keyed by the presence of its slots.
      const top = VerticalSpace_fx.render({ top: 'Heading' });
      expect(VerticalSpace_fx.selectors.containers().at(-1)).toHaveAttribute('data-has-top', 'true');
      expect(VerticalSpace_fx.selectors.containers().at(-1)).toHaveAttribute('data-has-bottom', 'false');

      top.unmount();
      const bottom = VerticalSpace_fx.render({ bottom: 'Actions' });
      expect(VerticalSpace_fx.selectors.containers().at(-1)).toHaveAttribute('data-has-top', 'false');
      expect(VerticalSpace_fx.selectors.containers().at(-1)).toHaveAttribute('data-has-bottom', 'true');

      bottom.unmount();
      const both = VerticalSpace_fx.render({ top: 'Heading', bottom: 'Actions' });
      expect(VerticalSpace_fx.selectors.containers().at(-1)).toHaveAttribute('data-has-top', 'true');
      expect(VerticalSpace_fx.selectors.containers().at(-1)).toHaveAttribute('data-has-bottom', 'true');
      both.unmount();
    });

    it('should preserve a consumer-supplied class name on the container', () => {
      VerticalSpace_fx.render({ className: 'custom-space' });
      expect(VerticalSpace_fx.selectors.container()).toHaveClass('custom-space');
    });

    it('should keep scoped selectors independent between instances', () => {
      VerticalSpace_fx.render({ center: 'First' });
      VerticalSpace_fx.render({ center: 'Second' });
      const roots = VerticalSpace_fx.selectors.containers();
      expect(VerticalSpace_fx.selectors.slot('center', roots[0] as HTMLElement)).toHaveTextContent('First');
      expect(VerticalSpace_fx.selectors.slot('center', roots[1] as HTMLElement)).toHaveTextContent('Second');
    });
  });
});
