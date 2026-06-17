import PhoneCluster from './PhoneCluster';

function HeroSection() {
  return (
    <section className="hero-section" id="home" aria-labelledby="hero-title">
      <div className="hero-inner">
        <PhoneCluster />

        <div className="hero-copy">
          <h1 id="hero-title">
            <span>외출 전 코디 고민,</span>
            <span>이제 오모에게 맡기세요</span>
          </h1>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
