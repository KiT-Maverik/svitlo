import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({ usePathname: vi.fn(), useRouter: vi.fn() }));
import { LocaleProvider_fx } from './LocaleProvider.unit.fx';
import { LocaleProvider_mx } from './LocaleProvider.unit.mx';

describe('Components', () => {
  describe('LocaleProvider', () => {
    beforeEach(() => LocaleProvider_mx.prepare());
    afterEach(() => LocaleProvider_mx.reset());

    it('should provide the supplied locale to nested consumers', () => {
      LocaleProvider_fx.render({ locale: 'en-US' });
      expect(LocaleProvider_fx.selectors.current()).toHaveTextContent('en-US');
    });

    it('should navigate without discarding unrelated query parameters when changing locale', async () => {
      const { replace } = LocaleProvider_mx.prepare();
      window.history.replaceState({}, '', '/uk/lesson/d3048d21-8690-5255-b62c-984c69ac272c?ref=abc&lang=uk-UA');
      LocaleProvider_fx.render();
      await LocaleProvider_fx.actions.change();
      expect(replace).toHaveBeenCalledWith('/en/lesson/d3048d21-8690-5255-b62c-984c69ac272c?ref=abc', { scroll: false });
    });
  });
});
