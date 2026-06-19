import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import '../App.css';
import AboutSection from '../components/landing/AboutSection';
import DeveloperSection from '../components/landing/DeveloperSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import FinalCta from '../components/landing/FinalCta';
import Footer from '../components/landing/Footer';
import Header from '../components/landing/Header';
import HeroSection from '../components/landing/HeroSection';
import IntroFramesSection from '../components/landing/IntroFramesSection';
import TargetSection from '../components/landing/TargetSection';

const targetUsers = [
  '매일 아침 옷 고르는 것이 어려운 사람',
  '상황에 맞는 코디를 빠르게 추천받고 싶은 사람',
  '자신에게 어울리는 스타일을 찾고 싶은 사람',
  '다양한 코디를 참고하고 저장하고 싶은 사람',
];

const features = [
  {
    title: 'AI 챗봇 코디 추천',
    copy: '상황과 취향을 자연어로 입력하면 오늘의 OOTD와 상세 제품 정보를 제안합니다.',
    images: [
      { src: '/Features/AI Chat.svg', alt: 'AI 챗봇 코디 추천 화면' },
      {
        src: '/Features/Detail.svg',
        alt: '추천 코디 상세 제품 정보 화면',
        className: 'feature-image-top-crop',
      },
    ],
  },
  {
    title: '피드',
    copy: '팔로잉과 트렌드 피드에서 다양한 코디 아이디어를 탐색합니다.',
    images: [
      { src: '/Features/Feed_fllorw.svg', alt: '팔로잉 피드 화면' },
      { src: '/Features/Feed_trends.svg', alt: '트렌드 피드 화면' },
    ],
  },
  {
    title: '업로드',
    copy: '내 코디 이미지와 설명을 등록하고 스타일을 공유합니다.',
    images: [
      { src: '/Features/Upload.svg', alt: '코디 업로드 화면' },
      {
        src: '/Features/Upload_1.svg',
        alt: '코디 업로드 상세 입력 화면',
        className: 'feature-image-top-crop',
      },
    ],
  },
  {
    title: '마이페이지',
    copy: '게시글, 저장한 코디, 팔로워 정보를 한곳에서 관리합니다.',
    images: [{ src: '/Features/Mypage.svg', alt: '마이페이지 화면' }],
  },
];

const FOOTER_HOME_DELAY_MS = 30_000;
const FOOTER_AREA_OFFSET_PX = 120;
const HOME_SECTION_ID = 'home';
const MIN_SCROLL_DURATION_MS = 720;
const MAX_SCROLL_DURATION_MS = 1300;

const easeInOutCubic = (progress) => (
  progress < 0.5
    ? 4 * progress ** 3
    : 1 - ((-2 * progress + 2) ** 3) / 2
);

function LandingPage() {
  const scrollAnimationTimerRef = useRef(0);

  const scrollToTopPosition = useCallback((targetTop, behavior = 'smooth') => {
    const scrollingElement = document.scrollingElement || document.documentElement;
    const maxScrollTop = Math.max(scrollingElement.scrollHeight - window.innerHeight, 0);
    const destinationTop = Math.min(Math.max(targetTop, 0), maxScrollTop);
    const startTop = window.scrollY || scrollingElement.scrollTop || document.body.scrollTop || 0;
    const distance = destinationTop - startTop;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const setScrollTop = (nextTop) => {
      scrollingElement.scrollTop = nextTop;
      document.documentElement.scrollTop = nextTop;
      document.body.scrollTop = nextTop;
    };

    window.clearTimeout(scrollAnimationTimerRef.current);
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';

    const restoreScrollBehavior = () => {
      document.documentElement.style.scrollBehavior = '';
      document.body.style.scrollBehavior = '';
    };

    if (behavior === 'auto' || prefersReducedMotion || Math.abs(distance) < 2) {
      setScrollTop(destinationTop);
      restoreScrollBehavior();
      return;
    }

    const duration = Math.min(
      Math.max(Math.abs(distance) * 0.42, MIN_SCROLL_DURATION_MS),
      MAX_SCROLL_DURATION_MS,
    );
    let startTime = 0;

    const animateScroll = () => {
      const currentTime = performance.now();

      if (!startTime) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const nextTop = startTop + distance * easeInOutCubic(progress);

      setScrollTop(nextTop);

      if (progress < 1) {
        scrollAnimationTimerRef.current = window.setTimeout(animateScroll, 16);
        return;
      }

      setScrollTop(destinationTop);
      restoreScrollBehavior();
    };

    scrollAnimationTimerRef.current = window.setTimeout(animateScroll, 0);
  }, []);

  const scrollToSection = useCallback((sectionId, { behavior = 'smooth', historyMode = 'push' } = {}) => {
    const target = document.getElementById(sectionId);

    if (!target) {
      return;
    }

    const nextHash = `#${sectionId}`;

    if (historyMode === 'replace') {
      window.history.replaceState(null, '', nextHash);
    } else if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    }

    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    scrollToTopPosition(targetTop, behavior);
  }, [scrollToTopPosition]);

  useLayoutEffect(() => {
    const canControlScrollRestoration = 'scrollRestoration' in window.history;
    const previousScrollRestoration = window.history.scrollRestoration;

    if (canControlScrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }

    window.history.replaceState(null, '', '#home');
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });

    return () => {
      window.clearTimeout(scrollAnimationTimerRef.current);

      if (canControlScrollRestoration) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal-group');

    if (!revealItems.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        rootMargin: '0px 0px -14% 0px',
        threshold: 0.12,
      },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const footer = document.getElementById('footer');
    let returnHomeTimerId;
    let footerTimerId;
    let footerWatchIntervalId;
    let isReturningHome = false;
    let isFooterTimerRunning = false;

    if (!footer) {
      return undefined;
    }

    const clearFooterTimer = () => {
      window.clearTimeout(footerTimerId);
      isFooterTimerRunning = false;
    };

    const resetRevealAnimations = () => {
      document.querySelectorAll('.reveal-group.is-visible').forEach((item) => {
        item.classList.remove('is-visible');
      });
    };

    const finishReturningHome = () => {
      isReturningHome = false;
      clearFooterTimer();
      window.history.replaceState(null, '', `#${HOME_SECTION_ID}`);
      resetRevealAnimations();
    };

    const returnToHome = () => {
      isReturningHome = true;
      clearFooterTimer();
      window.clearTimeout(returnHomeTimerId);
      scrollToSection(HOME_SECTION_ID, { behavior: 'smooth', historyMode: 'replace' });

      returnHomeTimerId = window.setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        finishReturningHome();
      }, 1800);
    };

    const isFooterAreaVisible = () => {
      const footerRect = footer.getBoundingClientRect();
      const distanceFromBottom = document.documentElement.scrollHeight
        - (window.scrollY + window.innerHeight);

      return (
        (footerRect.top < window.innerHeight && footerRect.bottom > 0)
        || distanceFromBottom <= FOOTER_AREA_OFFSET_PX
      );
    };

    const scheduleFooterTimer = () => {
      if (isFooterTimerRunning || isReturningHome) {
        return;
      }

      isFooterTimerRunning = true;
      footerTimerId = window.setTimeout(returnToHome, FOOTER_HOME_DELAY_MS);
    };

    const updateFooterTimer = () => {
      if (isReturningHome) {
        return;
      }

      if (isFooterAreaVisible()) {
        scheduleFooterTimer();
        return;
      }

      clearFooterTimer();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scheduleFooterTimer();
          return;
        }

        updateFooterTimer();
      },
      {
        rootMargin: `0px 0px ${FOOTER_AREA_OFFSET_PX}px 0px`,
        threshold: 0,
      },
    );

    const handleFooterAreaChange = () => {
      window.requestAnimationFrame(updateFooterTimer);
    };

    updateFooterTimer();
    footerWatchIntervalId = window.setInterval(updateFooterTimer, 500);
    window.addEventListener('scroll', handleFooterAreaChange, { passive: true });
    window.addEventListener('resize', handleFooterAreaChange);
    window.addEventListener('hashchange', handleFooterAreaChange);
    observer.observe(footer);

    return () => {
      window.clearTimeout(scrollAnimationTimerRef.current);
      clearFooterTimer();
      window.clearTimeout(returnHomeTimerId);
      window.clearInterval(footerWatchIntervalId);
      window.removeEventListener('scroll', handleFooterAreaChange);
      window.removeEventListener('resize', handleFooterAreaChange);
      window.removeEventListener('hashchange', handleFooterAreaChange);
      observer.disconnect();
    };
  }, [scrollToSection]);

  return (
    <main className="landing">
      <Header onNavigate={scrollToSection} />
      <HeroSection />
      <AboutSection />
      <IntroFramesSection />
      <TargetSection targetUsers={targetUsers} />
      <FeaturesSection features={features} />
      <DeveloperSection />
      <FinalCta />
      <Footer onNavigate={scrollToSection} />
    </main>
  );
}

export default LandingPage;
