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
    '.card, .cta-box, .stat-item, .timeline-step, .flow-node, .flow-arrow, .calculator-card, .spec-table-container, section h2, section .subheadline'
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

  initializeLogoTransform();

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scrollWrapper,
      start: 'top top',
      end: '+=1000', 
      pin: premiumHero,
      scrub: true,
      invalidateOnRefresh: true,
      onRefresh: () => {
        gsap.set(brandLogo, { clearProps: "all" });
        initializeLogoTransform();
      }
    }
  });

  // 1. Scroll hint disappears immediately
  tl.to(scrollDownHint, {
    opacity: 0,
    y: 20,
    duration: 0.1,
    ease: "none"
  }, 0);

  // 2. Logo Animation Stage 1 (0-25%): Shrink to 65% of huge size
  tl.to(brandLogo, {
    x: () => initialTransform.x * 0.65,
    y: () => initialTransform.y * 0.65,
    scale: () => initialTransform.scale * 0.65,
    duration: 0.25,
    ease: "none"
  }, 0);

  // 3. Logo Animation Stage 2 (25-70%): Shrink into navbar slot
  tl.to(brandLogo, {
    x: 0,
    y: 0,
    scale: 1,
    duration: 0.45,
    ease: "none"
  }, 0.25);

  // 4. Content Fade In (70-100%): Fade in hero content, backgrounds, and navbar elements
  tl.to([leftBg, rightBg], {
    opacity: 0.4,
    pointerEvents: 'auto',
    duration: 0.3,
    ease: "none"
  }, 0.7);

  tl.to([heroContent, navContainer, navActions], {
    opacity: 1,
    pointerEvents: 'auto',
    duration: 0.3,
    ease: "none"
  }, 0.7);
}
