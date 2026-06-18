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

/**
 * Set up dynamic split hover animations for premium hero
 */
function setupHeroInteractions() {
  const leftCard = document.querySelector('.selection-card.left-card');
  const rightCard = document.querySelector('.selection-card.right-card');
  const leftBg = document.querySelector('.hero-bg-half.left');
  const rightBg = document.querySelector('.hero-bg-half.right');

  if (leftCard && leftBg && rightBg) {
    leftCard.addEventListener('mouseenter', () => {
      leftBg.style.opacity = '0.75';
      rightBg.style.opacity = '0.18';
    });
    leftCard.addEventListener('mouseleave', () => {
      leftBg.style.opacity = '';
      rightBg.style.opacity = '';
    });
  }

  if (rightCard && leftBg && rightBg) {
    rightCard.addEventListener('mouseenter', () => {
      rightBg.style.opacity = '0.75';
      leftBg.style.opacity = '0.18';
    });
    rightCard.addEventListener('mouseleave', () => {
      rightBg.style.opacity = '';
      leftBg.style.opacity = '';
    });
  }
}

/**
 * Set up dynamic logo shrink and direct to navigation placeholder on scroll
 */
function setupLogoAnimation() {
  const placeholder = document.querySelector('.logo-placeholder');
  const animatedLogo = document.querySelector('.animated-scroll-logo');
  const curtain = document.querySelector('.logo-curtain');
  const heroContent = document.querySelector('.hero-content-wrapper');

  if (!placeholder || !animatedLogo) return;

  function updateLogoPosition() {
    // Get boundary of target placeholder in header navigation
    const targetRect = placeholder.getBoundingClientRect();

    // Scroll range to complete the morph transition
    const scrollThreshold = 800;
    const progress = Math.min(1, window.scrollY / scrollThreshold);

    if (curtain) {
      curtain.style.opacity = (1 - progress).toString();
      if (progress >= 1) {
        curtain.style.display = 'none';
      } else {
        curtain.style.display = 'block';
      }
    }

    // Initial position: Center of current screen viewport
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;

    // Target position: Center of placeholder in the navbar
    const targetX = targetRect.left + targetRect.width / 2;
    const targetY = targetRect.top + targetRect.height / 2;

    // Linearly interpolate positions based on scroll progress
    const currentX = startX + (targetX - startX) * progress;
    const currentY = startY + (targetY - startY) * progress;

    // Interpolate scale
    const isMobile = window.innerWidth < 768;
    const startScale = isMobile ? 3.0 : 6.0;
    const targetScale = 1.0;
    const currentScale = startScale + (targetScale - startScale) * progress;

    // Apply styles to overlay logo
    animatedLogo.style.left = `${currentX}px`;
    animatedLogo.style.top = `${currentY}px`;
    animatedLogo.style.transform = `translate(-50%, -50%) scale(${currentScale})`;

    // Activate links and hover interactions only when settled inside navbar
    if (progress >= 0.95) {
      animatedLogo.style.pointerEvents = 'auto';
    } else {
      animatedLogo.style.pointerEvents = 'none';
    }

    // Hero content remains visible and static
  }

  window.addEventListener('scroll', updateLogoPosition);
  window.addEventListener('resize', updateLogoPosition);
  
  // Run on initial load
  updateLogoPosition();

  // Scroll Snapping for the morph zone
  let isSnapping = false;
  let lockEndTime = 0;
  let touchStartY = 0;

  window.addEventListener('wheel', (e) => {
    const scrollY = window.scrollY;
    const threshold = scrollThreshold;
    const roundedScrollY = Math.round(scrollY);
    const now = Date.now();

    // If within the 3-second lock window, block all scrolls
    if (now < lockEndTime) {
      e.preventDefault();
      // Keep viewport locked exactly at threshold
      if (roundedScrollY !== threshold) {
        window.scrollTo({ top: threshold });
      }
      return;
    }

    if (roundedScrollY < threshold) {
      if (e.deltaY > 0 && !isSnapping) {
        isSnapping = true;
        window.scrollTo({
          top: threshold,
          behavior: 'smooth'
        });
        setTimeout(() => {
          isSnapping = false;
          lockEndTime = Date.now() + 3000; // Lock for 3 seconds after animation concludes
        }, 800);
      } else if (e.deltaY < 0 && !isSnapping && scrollY > 0) {
        isSnapping = true;
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        setTimeout(() => { isSnapping = false; }, 800);
      }
      e.preventDefault();
    } else if (roundedScrollY === threshold) {
      if (e.deltaY < 0 && !isSnapping) {
        isSnapping = true;
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        setTimeout(() => { isSnapping = false; }, 800);
        e.preventDefault();
      }
    }
  }, { passive: false });

  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    const scrollY = window.scrollY;
    const threshold = scrollThreshold;
    const roundedScrollY = Math.round(scrollY);
    const now = Date.now();

    // If within 3-second lock window, block all touches
    if (now < lockEndTime) {
      e.preventDefault();
      if (roundedScrollY !== threshold) {
        window.scrollTo({ top: threshold });
      }
      return;
    }

    // Determine if we should intercept the swipe
    const isSwipingDown = touchStartY < e.touches[0].clientY; // Swiping down = scrolling up
    const isSwipingUp = touchStartY > e.touches[0].clientY;   // Swiping up = scrolling down

    let shouldIntercept = false;
    if (roundedScrollY < threshold) {
      shouldIntercept = true;
    } else if (roundedScrollY === threshold && isSwipingDown) {
      shouldIntercept = true;
    }

    if (shouldIntercept) {
      const touchEndY = e.touches[0].clientY;
      const diffY = touchStartY - touchEndY;
      
      if (Math.abs(diffY) > 15) {
        if (diffY > 0) { // Scrolling down
          if (roundedScrollY < threshold && !isSnapping) {
            isSnapping = true;
            window.scrollTo({
              top: threshold,
              behavior: 'smooth'
            });
            setTimeout(() => {
              isSnapping = false;
              lockEndTime = Date.now() + 3000; // Lock for 3 seconds after animation concludes
            }, 800);
          }
        } else if (diffY < 0 && !isSnapping && scrollY > 0) { // Scrolling up
          isSnapping = true;
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          setTimeout(() => { isSnapping = false; }, 800);
        }
        e.preventDefault();
      }
    }
  }, { passive: false });
}
