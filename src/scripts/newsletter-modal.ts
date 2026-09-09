function initNewsletterModal() {
  const dialog = document.querySelector<HTMLDialogElement>("[data-newsletter-dialog]");
  if (!dialog) return;

  const openButtons = document.querySelectorAll<HTMLButtonElement>("[data-newsletter-open]");
  const closeButton = dialog.querySelector<HTMLButtonElement>("[data-newsletter-close]");

  openButtons.forEach((button) => {
    button.addEventListener("click", () => dialog.showModal());
  });

  closeButton?.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNewsletterModal);
} else {
  initNewsletterModal();
}
