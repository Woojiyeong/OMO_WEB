const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#service', label: 'Service' },
  { href: '#target', label: 'For You' },
  { href: '#features', label: 'Features' },
  { href: '#developers', label: 'Contact' },
];

function Header() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="주요 메뉴">
        <a
          className="site-logo"
          href="#home"
          aria-label="오모 홈으로 이동"
        >
          <img src="/omo.svg" alt="" />
        </a>

        <div className="site-nav-links">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Header;
