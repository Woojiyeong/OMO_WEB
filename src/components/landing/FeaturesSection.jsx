import { useEffect, useRef, useState } from 'react';

const SCROLL_LOCK_MS = 720;
const WHEEL_DELTA_THRESHOLD = 12;
const TOUCH_DELTA_THRESHOLD = 36;

function FeaturesSection({ features }) {
  const sectionRef = useRef(null);
  const activeFeatureRef = useRef(0);
  const scrollLockRef = useRef(false);
  const scrollLockTimerRef = useRef(null);
  const touchStartRef = useRef(null);
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

    const getScrollMetrics = () => {
      const section = sectionRef.current;

      if (!section) {
        return null;
      }

      const sectionTop = section.offsetTop;
      const scrollRange = section.offsetHeight - window.innerHeight;

      return {
        sectionTop,
        scrollRange,
      };
    };

    const isInsideFeatureScroll = (metrics) => (
      metrics.scrollRange > 0
      && window.scrollY >= metrics.sectionTop - 2
      && window.scrollY <= metrics.sectionTop + metrics.scrollRange + 2
    );

    const releaseScrollLock = () => {
      window.clearTimeout(scrollLockTimerRef.current);
      scrollLockTimerRef.current = window.setTimeout(() => {
        scrollLockRef.current = false;
      }, SCROLL_LOCK_MS);
    };

    const scrollToFeature = (index) => {
      const metrics = getScrollMetrics();

      if (!metrics || lastFeatureIndex === 0) {
        return;
      }

      const nextIndex = clampFeatureIndex(index);
      const stepSize = metrics.scrollRange / lastFeatureIndex;

      scrollLockRef.current = true;
      setFeatureIndex(nextIndex);
      window.scrollTo({
        top: metrics.sectionTop + stepSize * nextIndex,
        behavior: 'smooth',
      });
      releaseScrollLock();
    };

    const updateActiveFeature = () => {
      const metrics = getScrollMetrics();

      if (!metrics) {
        return;
      }

      if (scrollLockRef.current) {
        return;
      }

      if (metrics.scrollRange <= 0 || lastFeatureIndex === 0) {
        setFeatureIndex(0);
        return;
      }

      const scrollDistance = window.scrollY - metrics.sectionTop;

      if (scrollDistance <= 0) {
        setFeatureIndex(0);
        return;
      }

      if (scrollDistance >= metrics.scrollRange) {
        setFeatureIndex(lastFeatureIndex);
        return;
      }

      const progress = Math.min(Math.max(scrollDistance / metrics.scrollRange, 0), 1);
      setFeatureIndex(Math.round(progress * lastFeatureIndex));
    };

    const moveFeatureByScroll = (direction, event) => {
      const metrics = getScrollMetrics();

      if (!metrics || lastFeatureIndex === 0 || !isInsideFeatureScroll(metrics)) {
        return false;
      }

      if (scrollLockRef.current) {
        event.preventDefault();
        return true;
      }

      const currentIndex = activeFeatureRef.current;
      const nextIndex = currentIndex + direction;

      if (nextIndex < 0 || nextIndex > lastFeatureIndex) {
        return false;
      }

      event.preventDefault();
      scrollToFeature(nextIndex);
      return true;
    };

    const handleWheel = (event) => {
      if (Math.abs(event.deltaY) < WHEEL_DELTA_THRESHOLD) {
        return;
      }

      moveFeatureByScroll(Math.sign(event.deltaY), event);
    };

    const handleTouchStart = (event) => {
      if (event.touches.length !== 1) {
        touchStartRef.current = null;
        return;
      }

      touchStartRef.current = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    };

    const handleTouchMove = (event) => {
      const touchStart = touchStartRef.current;

      if (!touchStart || event.touches.length !== 1) {
        return;
      }

      const deltaX = event.touches[0].clientX - touchStart.x;
      const deltaY = event.touches[0].clientY - touchStart.y;

      if (Math.abs(deltaY) < TOUCH_DELTA_THRESHOLD || Math.abs(deltaY) < Math.abs(deltaX)) {
        return;
      }

      const handled = moveFeatureByScroll(deltaY < 0 ? 1 : -1, event);

      if (handled) {
        touchStartRef.current = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
      }
    };

    updateActiveFeature();
    window.addEventListener('scroll', updateActiveFeature, { passive: true });
    window.addEventListener('resize', updateActiveFeature);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.clearTimeout(scrollLockTimerRef.current);
      window.removeEventListener('scroll', updateActiveFeature);
      window.removeEventListener('resize', updateActiveFeature);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [features.length]);

  return (
    <section
      className="features-section reveal-group"
      id="features"
      aria-labelledby="features-title"
      ref={sectionRef}
      style={{ '--feature-scroll-height': `${features.length * 100}vh` }}
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
