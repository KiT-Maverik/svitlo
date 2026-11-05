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

    it('should synchronize the document language and direction for LTR locales', () => {
      LocaleProvider_fx.render({ locale: 'uk-UA' });
      expect(document.documentElement).toHaveAttribute('lang', 'uk-UA');
      expect(document.documentElement).toHaveAttribute('dir', 'ltr');
    });

    it('should synchronize the document direction for right-to-left locales', () => {
      LocaleProvider_fx.render({ locale: 'ar-SA' });
      expect(document.documentElement).toHaveAttribute('lang', 'ar-SA');
      expect(document.documentElement).toHaveAttribute('dir', 'rtl');
    });

    it('should navigate without discarding unrelated query parameters when changing locale', async () => {
      const { replace } = LocaleProvider_mx.prepare();
      window.history.replaceState({}, '', '/topics/light?ref=abc&lang=uk-UA');
      LocaleProvider_fx.render();
      await LocaleProvider_fx.actions.change();
      expect(replace).toHaveBeenCalledWith('/topics/light?ref=abc&lang=en-US', { scroll: false });
    });

    it('should restore the original document locale on unmount', () => {
      document.documentElement.lang = 'en-US';
      document.documentElement.dir = 'ltr';
      const view = LocaleProvider_fx.render({ locale: 'ar-SA' });
      expect(document.documentElement.dir).toBe('rtl');
      view.unmount();
      expect(document.documentElement.lang).toBe('en-US');
      expect(document.documentElement.dir).toBe('ltr');
    });
  });
});
