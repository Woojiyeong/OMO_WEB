function Header() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="주요 메뉴">
        <a className="site-logo" href="#home" aria-label="오모 홈으로 이동">
          <img src="/omo.svg" alt="" />
        </a>

        <div className="site-nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#service">Service</a>
          <a href="#target">For You</a>
          <a href="#features">Features</a>
          <a href="#developers">Contact</a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
