import { describe, expect, it } from 'vitest';

import { TopNavbar_fx } from './TopNavbar.unit.fx';

describe('Layouts', () => {
  describe('TopNavbar', () => {
    it('should forward a localized navigation name and custom slot content', () => {
      TopNavbar_fx.render({ 'aria-label': 'Верхня навігація', slots: { right: 'Settings' } });
      const navbar = TopNavbar_fx.navbar.navigation('Верхня навігація');
      expect(TopNavbar_fx.navbar.slot('right', navbar)).toHaveTextContent('Settings');
    });

    it('should preserve custom root attributes through the composed navbar', () => {
      TopNavbar_fx.render({ slotProps: { root: { title: 'Top bar' } } });
      expect(TopNavbar_fx.navbar.navigation('Top navigation')).toHaveAttribute('title', 'Top bar');
    });
  });
});
