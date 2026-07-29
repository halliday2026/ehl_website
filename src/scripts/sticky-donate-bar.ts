function initStickyDonateBar() {
  const bar = document.querySelector<HTMLElement>("[data-donate-bar]");
  if (!bar) return;

  let ticking = false;

  function update() {
    const shouldShow = window.scrollY > 420;
    bar!.classList.toggle("translate-y-[130%]", !shouldShow);
    bar!.classList.toggle("opacity-0", !shouldShow);
    bar!.classList.toggle("translate-y-0", shouldShow);
    bar!.classList.toggle("opacity-100", shouldShow);
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

  update();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initStickyDonateBar);
} else {
  initStickyDonateBar();
}
