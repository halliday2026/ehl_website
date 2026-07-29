function initReveal() {
  const prefersMotion = window.matchMedia(
    "(prefers-reduced-motion: no-preference)",
  ).matches;
  if (!prefersMotion) return; // leave elements in their default, fully-visible state

  const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!elements.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-reveal", "visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  elements.forEach((el) => {
    el.setAttribute("data-reveal", "pending");
    io.observe(el);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initReveal);
} else {
  initReveal();
}
