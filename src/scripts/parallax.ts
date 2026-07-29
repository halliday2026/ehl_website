function initParallax() {
  const prefersMotion = window.matchMedia(
    "(prefers-reduced-motion: no-preference)",
  ).matches;
  if (!prefersMotion) return;

  const layer = document.querySelector<HTMLElement>("[data-parallax]");
  if (!layer) return;

  let ticking = false;

  function update() {
    const offset = Math.min(window.scrollY * 0.28, 240);
    layer!.style.transform = `translateY(${offset}px)`;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true },
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initParallax);
} else {
  initParallax();
}
