import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // Force scroll to top on reload to replay logo animation
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  setupNavigation();
  setupStickyCta();
  setupScrollAnimations();
  setupHeroInteractions();
  setupLogoAnimation();
  setupInfrastructureChallenges();
  setupPurposeBridgeAnimation();
  setupMovableChargerBenefitsMotion();
  setupBackToTop();
});

/**
 * Handle navigation header transformations on scroll and mobile menu toggle
 */
function setupNavigation() {
  const header = document.querySelector('header');
  if (!header) return;

  // Detect theme of the page
  const isDarkPage = document.body.classList.contains('dark-theme') || document.querySelector('.hero-dark');
  
  // Set initial class
  if (isDarkPage) {
    header.classList.add('header-dark');
  } else {
    header.classList.add('header-light');
  }

  // Scroll handler
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      if (isDarkPage) {
        header.classList.add('scrolled');
      } else {
        header.classList.add('scrolled-light');
        header.classList.add('scrolled');
      }
    } else {
      header.classList.remove('scrolled');
      header.classList.remove('scrolled-light');
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
}

/**
 * Handle display and animation of the sticky bottom CTA bar
 */
function setupStickyCta() {
  const stickyCta = document.querySelector('.sticky-cta-bar');
  const hero = document.querySelector('.hero') || document.querySelector('.premium-hero');
  
  if (!stickyCta || !hero) return;

  const showStickyBar = () => {
    const heroHeight = hero.offsetHeight;
    if (window.scrollY > heroHeight - 100) {
      stickyCta.classList.add('visible');
    } else {
      stickyCta.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', showStickyBar);
  // Initial check on load
  showStickyBar();
}

/**
 * Scroll triggered animations using Intersection Observer
 */
function setupScrollAnimations() {
  // Add animation class to cards and headers dynamically
  const animatedElements = document.querySelectorAll(
    '.card, .cta-box, .stat-item, .timeline-step, .flow-node, .flow-arrow, .calculator-card, .spec-table-container, section:not([data-movable-charger-benefits]) h2, section .subheadline'
  );

  // Set initial state
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        target.style.opacity = '1';
        target.style.transform = 'translateY(0)';
        
        // Custom animation triggers if needed (e.g. starting a count-up)
        if (target.classList.contains('flow-node') || target.classList.contains('flow-arrow')) {
          target.style.transitionDelay = '0.1s';
        }
        
        observer.unobserve(target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));
}

function setupMovableChargerBenefitsMotion() {
  const section = document.querySelector('[data-movable-charger-benefits]');
  if (!section) return;

  const eyebrow = section.querySelector('.section-subtitle');
  const heading = section.querySelector('h2');
  const copy = section.querySelector('p');
  const cards = gsap.utils.toArray(section.querySelectorAll('.adv-card'));
  const icons = gsap.utils.toArray(section.querySelectorAll('.adv-icon-wrapper'));

  if (!cards.length) return;

  gsap.set([eyebrow, heading, copy].filter(Boolean), {
    autoAlpha: 0,
    y: 28
  });

  gsap.set(cards, {
    autoAlpha: 0,
    x: 96,
    y: 36,
    scale: 0.96,
    rotateZ: 1.5,
    transformOrigin: 'center bottom',
    willChange: 'transform, opacity'
  });

  gsap.set(icons, {
    autoAlpha: 0,
    scale: 0.82,
    rotate: -8,
    transformOrigin: 'center center'
  });

  const timeline = gsap.timeline({
    defaults: {
      ease: 'power3.out'
    },
    scrollTrigger: {
      trigger: section,
      start: 'top 72%',
      once: true
    }
  });

  timeline
    .to([eyebrow, heading, copy].filter(Boolean), {
      autoAlpha: 1,
      y: 0,
      duration: 0.72,
      stagger: 0.12
    })
    .to(cards, {
      autoAlpha: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotateZ: 0,
      duration: 0.9,
      stagger: 0.11
    }, '-=0.28')
    .to(icons, {
      autoAlpha: 1,
      scale: 1,
      rotate: 0,
      duration: 0.48,
      stagger: 0.08
    }, '-=0.68');
}

function setupHeroInteractions() {
  const leftCard = document.querySelector('.selection-card.left-card');
  const rightCard = document.querySelector('.selection-card.right-card');
  const leftBg = document.querySelector('.hero-bg-half.left');
  const rightBg = document.querySelector('.hero-bg-half.right');

  if (leftCard && leftBg && rightBg) {
    leftCard.addEventListener('mouseenter', () => {
      leftBg.classList.add('hover-active');
      rightBg.classList.add('hover-inactive');
    });
    leftCard.addEventListener('mouseleave', () => {
      leftBg.classList.remove('hover-active');
      rightBg.classList.remove('hover-inactive');
    });
  }

  if (rightCard && leftBg && rightBg) {
    rightCard.addEventListener('mouseenter', () => {
      rightBg.classList.add('hover-active');
      leftBg.classList.add('hover-inactive');
    });
    rightCard.addEventListener('mouseleave', () => {
      rightBg.classList.remove('hover-active');
      leftBg.classList.remove('hover-inactive');
    });
  }
}

function setupLogoAnimation() {
  const scrollWrapper = document.querySelector('.hero-scroll-wrapper');
  const premiumHero = document.querySelector('.premium-hero');
  const brandLogo = document.querySelector('#brand-logo');
  const measureTarget = document.querySelector('#logo-measure-target');
  const navSlot = document.querySelector('#nav-logo-slot');
  const heroContent = document.querySelector('.hero-content-wrapper');
  const leftBg = document.querySelector('.hero-bg-half.left');
  const rightBg = document.querySelector('.hero-bg-half.right');
  const scrollDownHint = document.querySelector('.scroll-down-hint');
  const navContainer = document.querySelector('nav');
  const navActions = document.querySelector('.nav-actions');

  if (!scrollWrapper || !premiumHero || !brandLogo || !measureTarget || !navSlot) return;

  // Expose initial transform data
  let initialTransform = { scale: 1, x: 0, y: 0 };

  function initializeLogoTransform() {
    const targetRect = measureTarget.getBoundingClientRect();
    const slotRect = navSlot.getBoundingClientRect();

    const scale = targetRect.width / slotRect.width;
    const deltaX = targetRect.left - slotRect.left;
    const deltaY = targetRect.top - slotRect.top;

    initialTransform = { scale, x: deltaX, y: deltaY };

    gsap.set(brandLogo, {
      x: deltaX,
      y: deltaY,
      scale: scale,
      transformOrigin: "top left"
    });
  }

  // Set initial states to prevent flash of content
  initializeLogoTransform();
  gsap.set([leftBg, rightBg], { opacity: 0 });
  gsap.set(heroContent, {
    opacity: 0,
    y: 30
  });
  gsap.set([navContainer, navActions].filter(Boolean), {
    opacity: 0
  });

  // Re-initialize on resize if animation is not finished
  let animationCompleted = false;
  const handleResize = () => {
    if (!animationCompleted) {
      initializeLogoTransform();
    }
  };
  window.addEventListener('resize', handleResize);

  // Create autoplaying timeline
  const tl = gsap.timeline({
    delay: 0.6, // Short elegant pause on load
    onComplete: () => {
      animationCompleted = true;
      window.removeEventListener('resize', handleResize);
      // Only clear GSAP properties on the logo so it aligns correctly with normal CSS slots on window resize
      gsap.set(brandLogo, { clearProps: "all" });
      
      // Initialize hero scroll transitions after intro completes
      setupHeroScrollTransition();
    }
  });

  // 1. Logo Animation: Smoothly shrink and move into navbar slot
  tl.to(brandLogo, {
    x: 0,
    y: 0,
    scale: 1,
    duration: 1.4,
    ease: "power4.inOut"
  }, 0);

  // 2. Background split halves fade in
  tl.to([leftBg, rightBg], {
    opacity: 0.4,
    duration: 1.0,
    ease: "power2.out"
  }, 0.5);

  // 3. Hero content (What best describes you?, selection cards) slides up and fades in
  tl.to(heroContent, {
    opacity: 1,
    y: 0,
    duration: 1.0,
    ease: "power3.out"
  }, 0.7);

  // 4. Navbar links fade in
  tl.to([navContainer, navActions].filter(Boolean), {
    opacity: 1,
    duration: 0.8,
    ease: "power2.out"
  }, 0.9);
}

/**
 * Smooth parallax and fade transition for the Hero section as you scroll down
 */
function setupHeroScrollTransition() {
  const heroSection = document.querySelector('.premium-hero');
  const heroContent = document.querySelector('.hero-content-wrapper');
  const leftBg = document.querySelector('.hero-bg-half.left');
  const rightBg = document.querySelector('.hero-bg-half.right');
  const bgGrid = document.querySelector('.hero-bg-grid');
  const neonGlows = document.querySelectorAll('.neon-glow-left, .neon-glow-right');

  if (!heroSection) return;

  // 1. Content wrapper (text and buttons) moves up and fades out slowly
  if (heroContent) {
    gsap.to(heroContent, {
      yPercent: -15,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // 2. Background halves zoom slightly and fade out
  const splitBgs = [leftBg, rightBg].filter(Boolean);
  if (splitBgs.length > 0) {
    gsap.to(splitBgs, {
      scale: 1.05,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // 3. Grid and glow overlays fade out completely
  const overlays = [bgGrid, ...neonGlows].filter(Boolean);
  if (overlays.length > 0) {
    gsap.to(overlays, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }
}

/**
 * Redesigned section: Infrastructure Challenges sticky scroll, parallax, progress bar, and transition screen
 */
function setupInfrastructureChallenges() {
  const section = document.querySelector('.infrastructure-challenges-section');
  const slides = document.querySelectorAll('.challenge-slide-new');
  const navItems = document.querySelectorAll('.nav-item-new');
  const navList = document.querySelector('.challenges-nav-list-new');

  if (!section || slides.length === 0 || navItems.length === 0) return;

  let scrollTriggers = [];
  let desktopTimeline = null;

  // Function to set active tab & slide classes
  const updateActiveSegment = (index) => {
    navItems.forEach((btn, i) => {
      if (i === index) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Scroll mobile horizontal nav to active item if needed
    if (window.innerWidth <= 1024 && navList) {
      const activeBtn = navItems[index];
      if (activeBtn) {
        const navRect = navList.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();
        if (btnRect.left < navRect.left || btnRect.right > navRect.right) {
          navList.scrollTo({
            left: activeBtn.offsetLeft - 32,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  const initAnimations = () => {
    // Kill existing triggers
    scrollTriggers.forEach(t => t.kill());
    scrollTriggers = [];
    if (desktopTimeline) {
      desktopTimeline.kill();
      desktopTimeline = null;
    }

    // Reset styles
    gsap.set([slides, navItems], { clearProps: "all" });
    slides.forEach(slide => {
      const heading = slide.querySelector('.challenge-heading') || slide.querySelector('.transition-headline-merged');
      const desc = slide.querySelector('.challenge-desc') || slide.querySelector('.transition-subheadline-merged');
      const affects = slide.querySelector('.challenge-affects');
      const img = slide.querySelector('.challenge-image-container img');
      gsap.set([heading, desc, affects, img, slide].filter(Boolean), { clearProps: "all" });
    });

    const isDesktop = window.innerWidth > 1024;

    if (isDesktop) {
      // DESKTOP: Pinned layout with smooth card overlay fade
      slides.forEach((slide, i) => {
        gsap.set(slide, {
          opacity: i === 0 ? 1 : 0,
          yPercent: 0,
          zIndex: i + 1
        });
      });

      desktopTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${slides.length * 150}%`,
          pin: true,
          scrub: 1, // 1-second smoothing delay for buttery soft scroll interactions
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (slides.length - 1),
            duration: { min: 0.5, max: 1.0 }, // Calmer, smoother snapping
            delay: 0.08, // Subtle pause to let scrolling settle
            ease: 'power2.out' // Clean deceleration curve
          }
        }
      });

      // Construct timeline transitions where subsequent panels fade in directly on top of previous panels
      const segmentDuration = 2.0;
      const slideDuration = 1.0; // 50% fade-in, 50% static hold/read time

      for (let i = 0; i < slides.length - 1; i++) {
        const nextSlide = slides[i + 1];
        const startOffset = i * segmentDuration;

        // Fade in the next slide on top of the current slide (which remains solid underneath)
        desktopTimeline.to(nextSlide, {
          opacity: 1,
          duration: slideDuration,
          ease: 'power1.inOut'
        }, startOffset);

        // Update active nav indicators immediately at the start of the scroll transition
        desktopTimeline
          .call(() => {
            updateActiveSegment(i);
          }, null, startOffset)
          .call(() => {
            updateActiveSegment(i + 1);
          }, null, startOffset + 0.1);
      }

      // Handle nav clicks to jump to corresponding timeline position (to the hold state of each slide)
      navItems.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          if (desktopTimeline && desktopTimeline.scrollTrigger) {
            const st = desktopTimeline.scrollTrigger;
            const totalDuration = (slides.length - 1) * segmentDuration;
            const targetProgress = (index * segmentDuration) / totalDuration;
            const targetScroll = st.start + targetProgress * (st.end - st.start);
            window.scrollTo({
              top: targetScroll,
              behavior: 'smooth'
            });
          }
        });
      });

    } else {
      // MOBILE: Normal vertical scrolling with ScrollSpy to highlight top horizontal nav
      slides.forEach((slide, index) => {
        const spyTrigger = ScrollTrigger.create({
          trigger: slide,
          start: 'top center+=80',
          end: 'bottom center+=80',
          onEnter: () => updateActiveSegment(index),
          onEnterBack: () => updateActiveSegment(index)
        });
        scrollTriggers.push(spyTrigger);
      });

      // Handle mobile nav clicks to scroll to target element
      navItems.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetSlide = slides[index];
          if (targetSlide) {
            const headerOffset = 140;
            const elementPosition = targetSlide.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  };

  initAnimations();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initAnimations, 250);
  });
}

/**
 * Subtle and premium reveal animations for the Designed With Purpose transition section
 */
function setupPurposeBridgeAnimation() {
  const section = document.querySelector('.purpose-bridge-section');
  const eyebrow = document.querySelector('.purpose-eyebrow');
  const heading = document.querySelector('.purpose-heading');
  const subText = document.querySelector('.purpose-sub');

  if (!section) return;

  // Set initial states
  gsap.set([eyebrow, heading, subText].filter(Boolean), {
    opacity: 0,
    y: 15
  });

  // Create ScrollTrigger animation
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top center+=150',
      toggleActions: 'play none none reverse'
    }
  });

  tl.to(eyebrow, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out'
  })
  .to(heading, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.4')
  .to(subText, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out'
  }, '+=0.15');
}

/**
 * Setup and initialize back to top button visibility and smooth scrolling
 */
function setupBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  const toggleBackToTop = () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
