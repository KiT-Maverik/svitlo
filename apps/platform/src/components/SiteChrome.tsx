import Link from 'next/link';

const navigation = [
  { href: '/materials', label: 'Навчальні матеріали' },
  { href: '/scholarships', label: 'Стипендії' },
  { href: '/team', label: 'Команда' },
  { href: '/hall-of-fame', label: 'Зал слави' },
  { href: '/sponsors', label: 'Спонсори' },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container site-header__inner">
        <Link className="brand" href="/" aria-label="Світло Academy — головна">
          <span className="brand__symbol" aria-hidden="true">
            ✳
          </span>
          <span>
            світло<span className="brand__dot">.</span>
          </span>
        </Link>
        <nav className="site-nav" aria-label="Головна навігація">
          {navigation.map(({ href, label }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer__inner">
        <div>
          <Link className="brand brand--footer" href="/">
            <span className="brand__symbol" aria-hidden="true">
              ✳
            </span>{' '}
            світло<span className="brand__dot">.</span>
          </Link>
          <p>NextGen Learning. Знання, що відкривають майбутнє.</p>
        </div>
        <nav aria-label="Навігація у підвалі">
          {navigation.map(({ href, label }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <small>© {new Date().getFullYear()} Світло Academy</small>
      </div>
    </footer>
  );
}
