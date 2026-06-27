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
  setupChallengesAnimations();
  setupJuicerBenefitsMotion();
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
    '.card, .cta-box, .stat-item, .timeline-step, .flow-node, .flow-arrow, .calculator-card, .spec-table-container, section:not([data-juicer-benefits]) h2, section .subheadline'
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

function setupJuicerBenefitsMotion() {
  const section = document.querySelector('[data-juicer-benefits]');
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
 * Canvas cursor-following image reveal effect matching produx.design
 */
function setupChallengesAnimations() {
  const section = document.querySelector('.challenges-hover-section');
  const canvas = document.querySelector('.challenge-float-canvas');
  if (!section || !canvas) return;

  const ctx = canvas.getContext('2d');
  const items = document.querySelectorAll('.challenge-list-item');

  // Preload challenge images
  const imageUrls = [
    '/assets/images/challenges/chl1.png',
    '/assets/images/challenges/chl2.png',
    '/assets/images/challenges/chl3.png',
    '/assets/images/challenges/chl4.png'
  ];

  const images = imageUrls.map(url => {
    const img = new Image();
    img.src = url;
    return img;
  });

  // Animation values
  let activeIndex = -1;
  let animState = { opacity: 0, scale: 0.8 };
  let mouse = { x: 0, y: 0 };
  let target = { x: 0, y: 0 };
  let lastTarget = { x: 0, y: 0 };
  let isHovered = false;

  // Size details for drawn image (premium landscape proportion)
  const imgWidth = 380;
  const imgHeight = 250;

  // Resize canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Track mouse coordinates in fixed screen space
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Attach hover events to items
  items.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
      activeIndex = index;
      isHovered = true;
      
      // Animate fade-in and scale-in using GSAP
      gsap.killTweensOf(animState);
      gsap.to(animState, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out'
      });
    });

    item.addEventListener('mouseleave', () => {
      isHovered = false;
      
      // Animate fade-out and scale-down
      gsap.killTweensOf(animState);
      gsap.to(animState, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: 'power3.out',
        onComplete: () => {
          if (!isHovered) activeIndex = -1;
        }
      });
    });
  });

  // Render loop
  function render() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply easing to target coordinates (inertia delay)
    const easeFactor = 0.08;
    target.x += (mouse.x - target.x) * easeFactor;
    target.y += (mouse.y - target.y) * easeFactor;

    // Calculate velocities (speed and direction of translation)
    const vx = target.x - lastTarget.x;
    const vy = target.y - lastTarget.y;
    lastTarget.x = target.x;
    lastTarget.y = target.y;

    if (activeIndex !== -1 && animState.opacity > 0.01) {
      const activeImg = images[activeIndex];
      
      if (activeImg.complete) {
        ctx.save();
        
        // Translate center to active position
        ctx.translate(target.x, target.y);
        
        // Apply rotation (tilt in direction of X velocity)
        const rotation = vx * 0.0018;
        ctx.rotate(rotation);
        
        // Apply shear / skew mapping (jelly warp based on velocity)
        const skewX = vx * 0.0012;
        const skewY = vy * 0.0012;
        ctx.transform(1, skewY, skewX, 1, 0, 0);
        
        // Apply scale & alpha transition values
        ctx.scale(animState.scale, animState.scale);
        ctx.globalAlpha = animState.opacity;
        
        // Draw the image centered
        ctx.drawImage(activeImg, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
        
        ctx.restore();
      }
    }

    requestAnimationFrame(render);
  }

  // Start the draw loop
  render();
}
