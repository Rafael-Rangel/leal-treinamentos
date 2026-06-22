(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Preloader ─── */
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    document.body.classList.add('loading');

    const hide = () => {
      preloader.classList.add('hidden');
      document.body.classList.remove('loading');
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    };

    const minShow = 380;
    const start = performance.now();

    const tryHide = () => {
      const elapsed = performance.now() - start;
      if (elapsed >= minShow) hide();
      else setTimeout(hide, minShow - elapsed);
    };

    if (document.readyState === 'complete') tryHide();
    else window.addEventListener('load', tryHide, { once: true });

    /* Garante que scroll nunca fique bloqueado */
    setTimeout(() => {
      if (document.body.classList.contains('loading')) hide();
    }, 2500);
  }

  /* ─── Scroll Progress ─── */
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }, { passive: true });
  }

  /* ─── Header ─── */
  function initHeader() {
    const header = document.getElementById('main-header');
    const hero = document.querySelector('.hero-section, .page-hero--dark');
    if (!header) return;

    const heroHeight = hero ? hero.offsetHeight : 0;

    function updateHeader() {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      header.classList.toggle('scrolled', scrollY > 80);
      if (hero) {
        header.classList.toggle('hero-mode', scrollY < heroHeight - 100);
      }
    }

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburger?.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu?.classList.toggle('open');
      document.body.style.overflow = mobileMenu?.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger?.classList.remove('open');
        mobileMenu?.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─── Hero — animação via CSS (.hero-animate) ─── */
  function initHeroAnimations() {
    /* Reservado: hero usa classes CSS hero-animate */
  }

  /* ─── Scroll Reveal (Intersection Observer — fallback sem GSAP) ─── */
  function initScrollReveal() {
    const selectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children, .image-reveal-wrap, .section-divider';

    const run = () => {
      if (document.documentElement.classList.contains('leal-anim')) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      document.querySelectorAll(selectors).forEach(el => observer.observe(el));
    };

    setTimeout(run, 50);
  }

  /* ─── Parallax Hero ─── */
  function initParallax() {
    if (prefersReducedMotion) return;
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && document.querySelector('.hero-section')) return;

    const heroBg = document.querySelector('.hero-bg img');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrollY * 0.35}px)`;
      }
    }, { passive: true });
  }

  /* ─── Animated Counters ─── */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const start = performance.now();

        function animate(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          el.textContent = Math.floor(target * eased).toLocaleString('pt-BR') + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  /* ─── 3D Card Tilt ─── */
  function initCardTilt() {
    if (prefersReducedMotion || window.innerWidth < 768) return;

    document.querySelectorAll('[data-tilt]').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ─── Testimonial Carousel ─── */
  function initCarousel() {
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dotsContainer = document.getElementById('carousel-dots');

    if (!track || !slides.length) return;

    let current = 0;
    const isMobile = () => window.innerWidth < 768;
    const visibleCount = () => isMobile() ? 1 : 3;
    const maxIndex = () => Math.max(0, slides.length - visibleCount());

    function createDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      for (let i = 0; i <= maxIndex(); i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      dotsContainer?.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    }

    function goTo(index) {
      current = Math.max(0, Math.min(index, maxIndex()));
      const slideWidth = slides[0].offsetWidth;
      track.style.transform = `translateX(-${current * slideWidth}px)`;
      updateDots();
    }

    prevBtn?.addEventListener('click', () => goTo(current - 1));
    nextBtn?.addEventListener('click', () => goTo(current + 1));

    createDots();
    window.addEventListener('resize', () => { createDots(); goTo(0); });

    let autoplay = setInterval(() => goTo(current >= maxIndex() ? 0 : current + 1), 5000);
    track.closest('.testimonial-carousel')?.addEventListener('mouseenter', () => clearInterval(autoplay));
    track.closest('.testimonial-carousel')?.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => goTo(current >= maxIndex() ? 0 : current + 1), 5000);
    });

    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    });
  }

  /* ─── Accordion ─── */
  function initAccordion() {
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion-item');
        const isOpen = item.classList.contains('open');

        item.closest('.accordion')?.querySelectorAll('.accordion-item').forEach(i => {
          i.classList.remove('open');
          i.querySelector('.accordion-trigger')?.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ─── Form Validation ─── */
  function isFieldValid(input) {
    if (input.type === 'checkbox') return input.checked;
    const val = input.value.trim();
    if (!val.length) return false;
    if (input.type === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    return true;
  }

  function initForms() {
    document.querySelectorAll('[data-validate-form]').forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let valid = true;

        form.querySelectorAll('[data-required]').forEach(input => {
          const fieldOk = isFieldValid(input);
          input.classList.toggle('valid', fieldOk);
          input.classList.toggle('invalid', !fieldOk);
          if (!fieldOk) valid = false;
        });

        if (!valid) return;

        const btn = form.querySelector('[type="submit"]');
        btn?.classList.add('btn-loading');
        btn?.setAttribute('disabled', 'true');

        await new Promise(r => setTimeout(r, 1500));

        btn?.classList.remove('btn-loading');
        btn?.removeAttribute('disabled');

        const success = form.querySelector('.form-success');
        if (success) {
          success.classList.remove('hidden');
          success.style.animation = 'wordReveal 0.6s cubic-bezier(0.16,1,0.3,1) forwards';
          form.reset();
          form.querySelectorAll('.form-input').forEach(i => i.classList.remove('valid', 'invalid'));
        }
      });

      form.querySelectorAll('[data-required]').forEach(input => {
        input.addEventListener('blur', () => {
          const fieldOk = isFieldValid(input);
          input.classList.toggle('valid', fieldOk);
          input.classList.toggle('invalid', !fieldOk && (input.type === 'checkbox' || input.value.length > 0));
        });
        if (input.type === 'checkbox') {
          input.addEventListener('change', () => {
            input.classList.toggle('valid', input.checked);
            input.classList.toggle('invalid', !input.checked);
          });
        }
      });
    });
  }

  /* ─── Smooth Scroll ─── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const headerH = document.getElementById('main-header')?.offsetHeight || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ─── Active Nav Link ─── */
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
      });
    }, { passive: true });
  }

  /* ─── Particles ─── */
  function initParticles() {
    const container = document.querySelector('.hero-particles');
    if (!container || prefersReducedMotion) return;

    for (let i = 0; i < 15; i++) {
      const span = document.createElement('span');
      span.style.left = Math.random() * 100 + '%';
      span.style.top = Math.random() * 100 + '%';
      span.style.animationDelay = Math.random() * 6 + 's';
      span.style.animationDuration = (4 + Math.random() * 4) + 's';
      container.appendChild(span);
    }
  }

  /* ─── Course Filters ─── */
  function initCourseFilters() {
    const filters = document.querySelectorAll('#course-filters .filter-chip');
    const cards = document.querySelectorAll('#course-grid [data-category]');
    if (!filters.length) return;

    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        filters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        cards.forEach(card => {
          const show = cat === 'all' || card.dataset.category === cat;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ─── Init ─── */
  document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initScrollProgress();
    initHeader();
    initScrollReveal();
    initParallax();
    initCounters();
    initCardTilt();
    initCarousel();
    initAccordion();
    initForms();
    initSmoothScroll();
    initActiveNav();
    initParticles();
    initCourseFilters();

    /* Fallback: garante visibilidade se animações falharem */
    setTimeout(() => {
      document.querySelectorAll('.stagger-children').forEach((wrap) => {
        wrap.style.opacity = '1';
        wrap.style.transform = 'none';
        wrap.classList.add('revealed');
      });

      if (!document.documentElement.classList.contains('leal-anim')) {
        document.documentElement.classList.add('leal-no-motion');
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
          el.classList.add('revealed');
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
        document.querySelectorAll('.stagger-children').forEach(el => el.classList.add('revealed'));
        document.querySelectorAll('.stagger-children > *').forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
        document.querySelectorAll('.image-reveal-wrap').forEach(el => el.classList.add('revealed'));
      }
    }, 2500);
  });
})();
