 // Thumbnail Swiper
    const thumbsSwiper = new Swiper(".myThumbs", {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
      breakpoints: {
        480: { slidesPerView: 4 },
        320: { slidesPerView: 3 }
      }
    });

    // Main Swiper
    const swiper = new Swiper(".mySwiper", {
      effect: "fade",
      loop: true,
      autoplay: {
        delay: 10000, // 10s per slide
        disableOnInteraction: false
      },
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      thumbs: { swiper: thumbsSwiper },
      on: {
        autoplayTimeLeft(s, time, progress) {
          const fill = document.querySelector(".progress-fill");
          if (fill) fill.style.width = ${(1 - progress) * 100}%;
        },
        slideChangeTransitionStart() {
          const fill = document.querySelector(".progress-fill");
          if (fill) fill.style.width = "0%";
          // reset caption animation for active slide
          document.querySelectorAll(".caption").forEach(caption => {
            caption.style.opacity = 0;
            caption.style.transform = "translateY(20px)";
            caption.style.animation = "none";
          });
        },
        slideChangeTransitionEnd() {
          const activeCaption = document.querySelector(".swiper-slide-active .caption");
          if (activeCaption) {
            // re-trigger fadeInUp animation
            activeCaption.style.animation = "fadeInUp 1.2s ease forwards";
          }
        }
      }
    });

    // Play/Pause toggle
    const toggleBtn = document.getElementById("toggleAutoplay");
    let isPlaying = true;
    toggleBtn.addEventListener("click", () => {
      if (isPlaying) {
        swiper.autoplay.stop();
        toggleBtn.textContent = "▶ Play";
        toggleBtn.setAttribute("aria-pressed", "true");
        const fill = document.querySelector('.progress-fill');
        if (fill) fill.style.transition = "none"; // freeze bar
      } else {
        swiper.autoplay.start();
        toggleBtn.textContent = "⏸ Pause";
        toggleBtn.setAttribute("aria-pressed", "false");
        const fill = document.querySelector('.progress-fill');
        if (fill) fill.style.transition = "width linear"; // resume
      }
      isPlaying = !isPlaying;
    });

    // Parallax on scroll: shift gradient overlay and caption subtly
    window.addEventListener("scroll", () => {
      document.querySelectorAll(".swiper-slide .video-container").forEach(container => {
        const rect = container.getBoundingClientRect();
        const offset = rect.top / window.innerHeight; // -1 to 1 range approx
        const shift = (offset * 20).toFixed(2); // px shift for overlay

        // Update gradient overlay via CSS variable
        container.style.setProperty("--overlay-shift", ${shift}px);

        // Caption parallax (only active slide to avoid jank)
        const activeCaption = container.closest(".swiper-slide").classList.contains("swiper-slide-active")
          ? container.querySelector(".caption")
          : null;
        if (activeCaption) {
          activeCaption.style.transform = translateY(${Math.max(0, 20 - offset * 30)}px);
        }
      });
    });

    // Lightbox elements
    const lightbox = document.getElementById("lightbox");
    const lightboxVideo = document.getElementById("lightbox-video");
    const closeBtn = document.querySelector(".lightbox .close");

    // Open lightbox on iframe click (main slider)
    document.querySelectorAll(".mySwiper .swiper-slide iframe").forEach(iframe => {
      iframe.addEventListener("click", (e) => {
        e.preventDefault();
        const src = iframe.src.replace("mute=1", "mute=0") + "&autoplay=1";
        lightboxVideo.src = src;
        lightbox.style.display = "flex";
        // Pause slider while lightbox is open
        if (isPlaying) {
          swiper.autoplay.stop();
          document.querySelector('.progress-fill').style.transition = "none";
          isPlaying = false;
          toggleBtn.textContent = "▶ Play";
        }
      });
    });

    // Close lightbox handlers
    function closeLightbox() {
      lightbox.style.display = "none";
      lightboxVideo.src = ""; // stop video
    }
    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard controls
    // - ESC closes lightbox
    // - ArrowLeft/ArrowRight navigate slides
    // - Space toggles autoplay
    document.addEventListener("keydown", (e) => {
      const isLightboxOpen = lightbox.style.display === "flex";

      if (e.key === "Escape") {
        if (isLightboxOpen) closeLightbox();
      } else if (e.key === "ArrowRight") {
        if (!isLightboxOpen) swiper.slideNext();
      } else if (e.key === "ArrowLeft") {
        if (!isLightboxOpen) swiper.slidePrev();
      } else if (e.key === " " || e.code === "Space") {
        if (!isLightboxOpen) {
          e.preventDefault();
          toggleBtn.click();
        }
      }
    });

