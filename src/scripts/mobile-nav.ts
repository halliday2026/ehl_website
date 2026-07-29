function initMobileNav() {
  const toggle = document.querySelector<HTMLButtonElement>("[data-hamburger-toggle]");
  const panel = document.querySelector<HTMLElement>("[data-mobile-nav-panel]");
  const closeBtn = document.querySelector<HTMLButtonElement>("[data-mobile-nav-close]");
  if (!toggle || !panel || !closeBtn) return;

  function open() {
    panel!.hidden = false;
    toggle!.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    panel!.querySelector<HTMLElement>("nav a")?.focus();
  }

  function close(returnFocus = true) {
    panel!.hidden = true;
    toggle!.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (returnFocus) toggle!.focus();
  }

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen) close();
    else open();
  });

  closeBtn.addEventListener("click", () => close());

  panel.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => close(false));
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMobileNav);
} else {
  initMobileNav();
}
