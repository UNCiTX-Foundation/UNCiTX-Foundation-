// ========================================
// STORIES IN MOTION - JAVASCRIPT FILE
// ========================================

// Initialize thumbnails swiper
const thumbsSwiper = new Swiper(".myThumbs", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
  breakpoints: { 
    320: { slidesPerView: 3 }, 
    480: { slidesPerView: 4 } 
  }
});

// Initialize main swiper
const swiper = new Swiper(".mySwiper", {
  effect: "fade",
  loop: true,
  autoplay: { 
    delay: 10000, 
    disableOnInteraction: false 
  },
  pagination: { 
    el: ".swiper-pagination", 
    clickable: true 
  },
  navigation: { 
    nextEl: ".swiper-button-next", 
    prevEl: ".swiper-button-prev" 
  },
  thumbs: { 
    swiper: thumbsSwiper 
  },
  on: {
    // Update progress bar during autoplay
    autoplayTimeLeft(s, time, progress) {
      const fill = document.querySelector(".progress-fill");
      if (fill) {
        fill.style.width = `${(1 - progress) * 100}%`;
      }
    },
    
    // On slide change start - reset animations and pause videos
    slideChangeTransitionStart() {
      const fill = document.querySelector(".progress-fill");
      if (fill) fill.style.width = "0%";
      
      // Reset all captions
      document.querySelectorAll(".caption").forEach(c => { 
        c.style.opacity = 0; 
        c.style.transform = "translateY(20px)"; 
        c.style.animation = "none"; 
      });
      
      // Pause all videos
      document.querySelectorAll(".slide-video").forEach(v => { 
        try { 
          v.pause(); 
        } catch(_){} 
      });
    },
    
    // On slide change end - animate caption and play video
    slideChangeTransitionEnd() {
      const activeCaption = document.querySelector(".swiper-slide-active .caption");
      if (activeCaption) {
        activeCaption.style.animation = "fadeInUp 1.1s ease forwards";
      }
      
      // Play active slide video
      const activeVideo = document.querySelector(".swiper-slide-active .slide-video");
      if (activeVideo) { 
        activeVideo.currentTime = 0; 
        activeVideo.play().catch(()=>{}); 
      }
    }
  }
});

// Ensure first active slide video plays on page load
document.addEventListener("DOMContentLoaded", () => {
  const v = document.querySelector(".swiper-slide-active .slide-video");
  if (v) {
    v.play().catch(()=>{});
  }
});

// ========================================
// AUTOPLAY TOGGLE FUNCTIONALITY
// ========================================

const toggleBtn = document.getElementById("toggleAutoplay");
let isPlaying = true;

toggleBtn.addEventListener("click", () => {
  const fill = document.querySelector(".progress-fill");
  
  if (isPlaying) {
    // Pause autoplay
    swiper.autoplay.stop();
    toggleBtn.textContent = "▶ Play";
    toggleBtn.setAttribute("aria-pressed", "true");
    if (fill) fill.style.transition = "none";
  } else {
    // Resume autoplay
    swiper.autoplay.start();
    toggleBtn.textContent = "⏸ Pause";
    toggleBtn.setAttribute("aria-pressed", "false");
    if (fill) fill.style.transition = "width linear";
  }
  
  isPlaying = !isPlaying;
});

// ========================================
// PARALLAX SCROLL EFFECT
// ========================================

window.addEventListener("scroll", () => {
  document.querySelectorAll(".video-container").forEach(container => {
    const rect = container.getBoundingClientRect();
    const offset = rect.top / window.innerHeight;
    const shift = (offset * 18).toFixed(2);
    container.style.setProperty("--overlay-shift", `${shift}px`);
    
    // Animate caption on active slide
    if (container.closest(".swiper-slide").classList.contains("swiper-slide-active")) {
      const cap = container.querySelector(".caption");
      if (cap) {
        cap.style.transform = `translateY(${Math.max(0, 18 - offset * 22)}px)`;
      }
    }
  });
});

// ========================================
// LIGHTBOX FUNCTIONALITY
// ========================================

const lightbox = document.getElementById("lightbox");
const lightboxVideo = document.getElementById("lightbox-video");
const closeBtn = document.querySelector(".lightbox .close");

// Open lightbox when clicking on video
document.querySelectorAll(".mySwiper .slide-video").forEach(video => {
  video.addEventListener("click", (e) => {
    e.preventDefault();
    
    // Get video source
    const src = video.querySelector('source') 
      ? video.querySelector('source').src 
      : video.currentSrc;
    
    if (!src) return;
    
    // Set lightbox video and play with sound
    lightboxVideo.src = src;
    lightboxVideo.muted = false;
    lightbox.style.display = "flex";
    lightboxVideo.play().catch(()=>{});
    
    // Pause autoplay when lightbox opens
    if (isPlaying) { 
      swiper.autoplay.stop(); 
      toggleBtn.textContent = "▶ Play"; 
      isPlaying = false; 
    }
  });
});

// Close lightbox function
function closeLightbox() {
  lightbox.style.display = "none";
  lightboxVideo.pause();
  lightboxVideo.src = "";
}

// Close button click
closeBtn.addEventListener("click", closeLightbox);

// Close when clicking outside video
lightbox.addEventListener("click", (e) => { 
  if (e.target === lightbox) {
    closeLightbox(); 
  }
});

// ========================================
// KEYBOARD CONTROLS
// ========================================

document.addEventListener("keydown", (e) => {
  const lightOpen = lightbox.style.display === "flex";
  
  // ESC key - Close lightbox
  if (e.key === "Escape" && lightOpen) {
    closeLightbox();
  } 
  // Right Arrow - Next slide
  else if (e.key === "ArrowRight" && !lightOpen) {
    swiper.slideNext();
  } 
  // Left Arrow - Previous slide
  else if (e.key === "ArrowLeft" && !lightOpen) {
    swiper.slidePrev();
  } 
  // Space - Toggle autoplay
  else if ((e.key === " " || e.code === "Space") && !lightOpen) { 
    e.preventDefault(); 
    toggleBtn.click(); 
  }
});
