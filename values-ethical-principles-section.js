document.addEventListener("DOMContentLoaded", () => {
  const valueCards = document.querySelectorAll(".value-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.2 }
  );

  valueCards.forEach((card) => observer.observe(card));
});

