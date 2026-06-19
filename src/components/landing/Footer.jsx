const footerLinks = [
  { href: '#about', label: 'About' },
  { href: '#service', label: 'Service' },
  { href: '#target', label: 'For You' },
  { href: '#features', label: 'Features' },
  { href: '#developers', label: 'Contact' },
];

function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-brand">
        <a href="#home" aria-label="오모 홈으로 이동">
          <img src="/omo.svg" alt="오모" />
        </a>
        <p>외출 전 코디 고민을 더 가볍게 만드는 AI OOTD 추천 서비스</p>
      </div>

      <nav className="footer-links" aria-label="푸터 메뉴">
        {footerLinks.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <p className="footer-copy">2026 ITSHOW AI Experience 오모</p>
    </footer>
  );
}

export default Footer;
