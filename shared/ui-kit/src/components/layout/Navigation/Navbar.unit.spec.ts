import { createElement } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Navbar_fx } from './Navbar.unit.fx';

describe('Layouts', () => {
  describe('Navbar', () => {
    it('should expose the supplied accessible navigation label', () => {
      Navbar_fx.render({ 'aria-label': 'Course navigation' });
      expect(Navbar_fx.selectors.navigation('Course navigation')).toBeVisible();
    });

    it('should render all three content slots in their corresponding containers', () => {
      Navbar_fx.render({ slots: { left: 'Left item', center: 'Middle item', right: 'Right item' } });
      const nav = Navbar_fx.selectors.navigation();
      expect(Navbar_fx.selectors.slot('left', nav)).toHaveTextContent('Left item');
      expect(Navbar_fx.selectors.slot('center', nav)).toHaveTextContent('Middle item');
      expect(Navbar_fx.selectors.slot('right', nav)).toHaveTextContent('Right item');
    });

    it('should forward root and slot attributes and consumer event handlers', () => {
      const onClick = vi.fn();
      Navbar_fx.render({
        slotProps: { root: { title: 'Custom navigation title' }, right: { title: 'Right controls', onClick } },
        slots: { right: createElement('button', { type: 'button' }, 'Apply') },
      });
      const nav = Navbar_fx.selectors.navigation();
      expect(nav).toHaveAttribute('title', 'Custom navigation title');
      expect(Navbar_fx.selectors.slot('right', nav)).toHaveAttribute('title', 'Right controls');
      Navbar_fx.selectors.slot('right', nav).click();
      expect(onClick).toHaveBeenCalledOnce();
    });

    it('uses the horizontal three-zone layout and supports native RTL direction', () => {
      Navbar_fx.render({
        slots: { left: 'Start', center: 'Fill', right: 'End' },
        slotProps: { root: { dir: 'rtl' } },
      });
      const navbar = Navbar_fx.selectors.navigation();
      expect(navbar).toHaveAttribute('dir', 'rtl');
      expect(navbar).toHaveAttribute('data-axis', 'horizontal');
      expect(Navbar_fx.selectors.slot('left', navbar)).toHaveTextContent('Start');
      expect(Navbar_fx.selectors.slot('right', navbar)).toHaveTextContent('End');
    });

    it('should keep shared slot selectors scoped when two navbars are rendered', () => {
      Navbar_fx.render({ 'aria-label': 'First', slots: { left: 'Alpha' } });
      Navbar_fx.render({ 'aria-label': 'Second', slots: { left: 'Beta' } });
      expect(Navbar_fx.selectors.slot('left', Navbar_fx.selectors.navigation('First'))).toHaveTextContent('Alpha');
      expect(Navbar_fx.selectors.slot('left', Navbar_fx.selectors.navigation('Second'))).toHaveTextContent('Beta');
    });
  });
});
