import { describe, expect, it } from 'vitest';

import { BottomNavbar_fx } from './BottomNavbar.unit.fx';

describe('Layouts', () => {
  describe('BottomNavbar', () => {
    it('should render consumer-provided center navigation controls', () => {
      BottomNavbar_fx.render({ slots: { center: 'Previous / Next' } });
      const navbar = BottomNavbar_fx.navbar.navigation('Bottom navigation');
      expect(BottomNavbar_fx.navbar.slot('center', navbar)).toHaveTextContent('Previous / Next');
    });

    it('should preserve root attributes from the consumer', () => {
      BottomNavbar_fx.render({ slotProps: { root: { title: 'Controls' } } });
      expect(BottomNavbar_fx.navbar.navigation('Bottom navigation')).toHaveAttribute('title', 'Controls');
    });
  });
});
