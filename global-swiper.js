/* Global Swiper Init
   - Auto-initializes elements with .swiper-container
   - Per-instance options via data attributes (JSON in data-swiper-options or simple keys)
   - Exposes window.GlobalSwiper API
*/
(function () {
  if (typeof window === 'undefined') return;
  if (typeof Swiper === 'undefined') {
    console.warn('Swiper library not found. Make sure swiper.js is loaded before this script.');
    return;
  }

  const DEFAULT_SELECTOR = '.swiper-container';
  const instances = new Map();

  const DEFAULTS = {
    // Core
    slidesPerView: 1,
    spaceBetween: 16,
    speed: 600,
    loop: false,

    // responsive breakpoints
    breakpoints: {
      // when window width is >= ...
      640: { slidesPerView: 1, spaceBetween: 16 },
      768: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 24 },
      1400: { slidesPerView: 4, spaceBetween: 28 }
    },

    // modules
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets'
    },
    autoplay: false, // set to { delay: 5000, disableOnInteraction: false } via data attrs if needed
    lazy: {
      loadOnTransitionStart: true,
      loadPrevNext: true
    },

    // accessibility & interaction
    keyboard: { enabled: true, onlyInViewport: true },
    mousewheel: false,
    a11y: {
      enabled: true,
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      firstSlideMessage: 'This is the first slide',
      lastSlideMessage: 'This is the last slide'
    },

    // performance
    preloadImages: false,
    watchSlidesProgress: true,
    watchSlidesVisibility: true
  };

  // Helper: parse JSON safely
  function parseJSON(attr) {
    if (!attr) return null;
    try {
      return JSON.parse(attr);
    } catch (e) {
      // try to convert simple attribute format: key:value;key2:value2
      const obj = {};
      attr.split(';').forEach(part => {
        const [k, v] = part.split(':').map(s => s && s.trim());
        if (!k) return;
        // convert booleans and numbers
        if (v === 'true') obj[k] = true;
        else if (v === 'false') obj[k] = false;
        else if (!isNaN(v) && v !== '') obj[k] = Number(v);
        else obj[k] = v;
      });
      return obj;
    }
  }

  // Build per-instance options from data attributes
  function buildOptions(el) {
    const attrJson = el.getAttribute('data-swiper-options');
    const parsedJson = parseJSON(attrJson) || {};

    // individual simple attributes (data-*)
    const autoplayAttr = el.getAttribute('data-autoplay'); // "true" or "5000"
    const loopAttr = el.getAttribute('data-loop'); // "true"/"false"
    const slidesPerViewAttr = el.getAttribute('data-slides-per-view');

    const options = JSON.parse(JSON.stringify(DEFAULTS)); // shallow clone

    // override from JSON attribute
    Object.assign(options, parsedJson);

    // simple overrides
    if (autoplayAttr) {
      if (autoplayAttr === 'true') options.autoplay = { delay: 5000, disableOnInteraction: false };
      else if (!isNaN(autoplayAttr)) options.autoplay = { delay: Number(autoplayAttr), disableOnInteraction: false };
    }
    if (loopAttr) options.loop = loopAttr === 'true';
    if (slidesPerViewAttr && !isNaN(slidesPerViewAttr)) options.slidesPerView = Number(slidesPerViewAttr);

    // Ensure navigation/pagination selectors are scoped to this container
    // If the container has its own elements, prefer them
    const navNext = el.querySelector('.swiper-button-next');
    const navPrev = el.querySelector('.swiper-button-prev');
    if (navNext && navPrev) {
      options.navigation = { nextEl: navNext, prevEl: navPrev };
    }

    const paginationEl = el.querySelector('.swiper-pagination');
    if (paginationEl) {
      options.pagination = Object.assign({}, options.pagination, { el: paginationEl });
    }

    // Lazy: make sure lazy is enabled if slides contain data-src or .swiper-lazy classes
    if (el.querySelector('[data-src], .swiper-lazy')) {
      options.lazy = Object.assign({}, options.lazy, { enabled: true });
    }

    return options;
  }

  // Initialize a single container
  function initContainer(container) {
    if (instances.has(container)) return instances.get(container);

    // wrap required structure detection
    const options = buildOptions(container);

    // instantiate Swiper
    const swiper = new Swiper(container, options);

    // keep reference
    instances.set(container, swiper);

    // attach instance id to element for debugging
    container.dataset.swiperInstance = swiper.el ? swiper.el.className || 'swiper' : 'swiper';

    return swiper;
  }

  // Initialize all
  function initAll(selector = DEFAULT_SELECTOR) {
    const els = Array.from(document.querySelectorAll(selector));
    return els.map(initContainer);
  }

  // Destroy helper
  function destroyAll() {
    instances.forEach((swiper, el) => {
      try {
        swiper.destroy(true, true);
      } catch (e) {
        console.warn('Error destroying swiper instance', e);
      }
    });
    instances.clear();
  }

  // Auto init on DOMContentLoaded (defer also fine)
  function autoInit() {
    // init existing
    initAll();

    // watch for added containers (useful for SPA)
    if ('MutationObserver' in window) {
      const observer = new MutationObserver(mutations => {
        mutations.forEach(m => {
          m.addedNodes && m.addedNodes.forEach(node => {
            if (!(node instanceof HTMLElement)) return;
            if (node.matches && node.matches(DEFAULT_SELECTOR)) initContainer(node);
            // also check descendants
            node.querySelectorAll && node.querySelectorAll(DEFAULT_SELECTOR).forEach(initContainer);
          });
          m.removedNodes && m.removedNodes.forEach(node => {
            if (!(node instanceof HTMLElement)) return;
            if (node.matches && node.matches(DEFAULT_SELECTOR) && instances.has(node)) {
              const s = instances.get(node);
              s && s.destroy && s.destroy(true, true);
              instances.delete(node);
            }
          });
        });
      });
      observer.observe(document.documentElement, { childList: true, subtree: true });
      // keep observer reference for potential external use
      window._globalSwiperMutationObserver = observer;
    }
  }

  // Expose API
  window.GlobalSwiper = {
    initAll,
    initContainer,
    destroyAll,
    getInstance(el) { return instances.get(el) || null; },
    getInstances() { return Array.from(instances.values()); },
    defaults: DEFAULTS
  };

  // run auto init after a tick so markup is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    // small timeout helps with deferred assets
    setTimeout(autoInit, 30);
  }
})();

