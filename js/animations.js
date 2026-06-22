/** GSAP ScrollTrigger — animações (scroll nativo, sem Lenis) */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function boot() {
    if (reduced) {
      document.documentElement.classList.add('leal-no-motion');
      revealAllStatic();
      return;
    }

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      document.documentElement.classList.add('leal-no-motion');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add('leal-anim');

    initReveals();
    initStaggers();
    initImageWraps();
    initImageZoom();
    initDividers();

    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    }, { once: true });
  }

  function revealAllStatic() {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .image-reveal-wrap').forEach((el) => {
      el.classList.add('revealed', 'is-visible');
    });
    document.querySelectorAll('.stagger-children').forEach((el) => el.classList.add('revealed'));
  }

  function isHeroContent(el) {
    return el.closest('.hero-section') || el.hasAttribute('data-hero-delay') || el.hasAttribute('data-reveal-words');
  }

  function st(el, opts) {
    return {
      trigger: el,
      start: 'top 88%',
      toggleActions: 'play none none none',
      once: true,
      ...opts,
    };
  }

  function initReveals() {
    gsap.utils.toArray('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
      if (el.closest('.stagger-children') || isHeroContent(el)) return;

      const from = { autoAlpha: 0 };
      const to = { autoAlpha: 1, duration: 1, ease: 'power3.out' };

      if (el.classList.contains('reveal-left')) {
        from.x = -36;
        to.x = 0;
      } else if (el.classList.contains('reveal-right')) {
        from.x = 36;
        to.x = 0;
      } else if (el.classList.contains('reveal-scale')) {
        from.scale = 0.96;
        to.scale = 1;
      } else {
        from.y = 32;
        to.y = 0;
      }

      gsap.fromTo(el, from, { ...to, scrollTrigger: st(el) });
    });
  }

  function initStaggers() {
    gsap.utils.toArray('.stagger-children').forEach((wrap) => {
      if (wrap.closest('.hero-section')) return;
      const kids = gsap.utils.toArray(wrap.children);
      if (!kids.length) return;

      gsap.fromTo(
        kids,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: st(wrap, { start: 'top 86%' }),
        }
      );
    });
  }

  function initImageWraps() {
    gsap.utils.toArray('.image-reveal-wrap').forEach((wrap) => {
      ScrollTrigger.create({
        ...st(wrap, { start: 'top 90%' }),
        onEnter: () => wrap.classList.add('revealed'),
      });
    });
  }

  function initImageZoom() {
    gsap.utils.toArray('.course-card-image img, .gallery-mosaic-item img').forEach((img) => {
      if (img.closest('.hero-section')) return;
      gsap.fromTo(
        img,
        { scale: 1.05 },
        { scale: 1, duration: 1.2, ease: 'power2.out', scrollTrigger: st(img, { start: 'top 92%' }) }
      );
    });
  }

  function initDividers() {
    gsap.utils.toArray('.section-divider').forEach((el) => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: st(el) }
      );
      el.classList.add('revealed');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
