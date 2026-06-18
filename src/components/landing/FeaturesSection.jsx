import { useEffect, useRef, useState } from 'react';

function FeaturesSection({ features }) {
  const sectionRef = useRef(null);
  const activeFeatureRef = useRef(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState('down');

  useEffect(() => {
    const lastFeatureIndex = Math.max(features.length - 1, 0);

    const clampFeatureIndex = (index) => (
      Math.min(Math.max(index, 0), lastFeatureIndex)
    );

    const setFeatureIndex = (index) => {
      const nextIndex = clampFeatureIndex(index);
      const previousIndex = activeFeatureRef.current;

      if (nextIndex !== previousIndex) {
        setTransitionDirection(nextIndex > previousIndex ? 'down' : 'up');
      }

      activeFeatureRef.current = nextIndex;
      setActiveFeature(nextIndex);
    };

    let animationFrameId = 0;

    const updateActiveFeature = () => {
      animationFrameId = 0;
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      if (lastFeatureIndex === 0) {
        setFeatureIndex(0);
        return;
      }

      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const scrollRange = Math.max(section.offsetHeight - viewportHeight, 0);

      if (scrollRange <= 0) {
        setFeatureIndex(0);
        return;
      }

      const scrollDistance = window.scrollY - sectionTop;

      if (scrollDistance <= 0) {
        setFeatureIndex(0);
        return;
      }

      if (scrollDistance >= scrollRange) {
        setFeatureIndex(lastFeatureIndex);
        return;
      }

      const progress = Math.min(Math.max(scrollDistance / scrollRange, 0), 1);
      setFeatureIndex(Math.round(progress * lastFeatureIndex));
    };

    const requestActiveFeatureUpdate = () => {
      if (animationFrameId) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(updateActiveFeature);
    };

    requestActiveFeatureUpdate();
    window.addEventListener('scroll', requestActiveFeatureUpdate, { passive: true });
    window.addEventListener('resize', requestActiveFeatureUpdate);
    window.visualViewport?.addEventListener('resize', requestActiveFeatureUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', requestActiveFeatureUpdate);
      window.removeEventListener('resize', requestActiveFeatureUpdate);
      window.visualViewport?.removeEventListener('resize', requestActiveFeatureUpdate);
    };
  }, [features.length]);

  return (
    <section
      className="features-section reveal-group"
      id="features"
      aria-labelledby="features-title"
      ref={sectionRef}
      style={{
        '--feature-scroll-height': `${Math.max(features.length, 1) * 100}vh`,
        '--feature-scroll-height-stable': `${Math.max(features.length, 1) * 100}svh`,
      }}
    >
      <div className={`features-sticky is-scroll-${transitionDirection}`}>
        <div className="section-heading reveal-child">
          <p>Features</p>
          <h2 id="features-title">오모의 주요 기능</h2>
        </div>

        <div className="feature-grid reveal-child">
          {features.map((feature, featureIndex) => (
            <article
              className={[
                'feature-item',
                featureIndex === activeFeature ? 'is-active' : '',
                featureIndex < activeFeature ? 'is-before' : '',
                featureIndex > activeFeature ? 'is-after' : '',
              ].filter(Boolean).join(' ')}
              key={feature.title}
              aria-hidden={featureIndex !== activeFeature}
            >
              <div className="feature-media">
                {feature.images.map((image) => (
                  <img
                    className={image.className}
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                  />
                ))}
              </div>
              <div className="feature-copy">
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="feature-dots" aria-label="기능 스크롤 위치">
          {features.map((feature, featureIndex) => (
            <span
              className={featureIndex === activeFeature ? 'is-active' : ''}
              key={feature.title}
              aria-label={`${featureIndex + 1}번째 기능`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
