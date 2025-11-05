document.addEventListener("DOMContentLoaded", () => {
  const programCards = document.querySelectorAll(".program-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  programCards.forEach((card) => observer.observe(card));
});

