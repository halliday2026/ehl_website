function initGalleryLightbox() {
  const dialog = document.querySelector<HTMLDialogElement>("[data-gallery-lightbox]");
  if (!dialog) return;

  const slides = Array.from(dialog.querySelectorAll<HTMLElement>("[data-gallery-slide]"));
  const openButtons = document.querySelectorAll<HTMLButtonElement>("[data-gallery-open]");
  const prevButton = dialog.querySelector<HTMLButtonElement>("[data-gallery-prev]");
  const nextButton = dialog.querySelector<HTMLButtonElement>("[data-gallery-next]");
  const closeButton = dialog.querySelector<HTMLButtonElement>("[data-gallery-close]");

  let currentIndex = 0;

  function showSlide(index: number) {
    currentIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.hidden = i !== currentIndex;
    });
  }

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.galleryOpen);
      showSlide(index);
      dialog.showModal();
    });
  });

  prevButton?.addEventListener("click", () => showSlide(currentIndex - 1));
  nextButton?.addEventListener("click", () => showSlide(currentIndex + 1));
  closeButton?.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showSlide(currentIndex - 1);
    if (event.key === "ArrowRight") showSlide(currentIndex + 1);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGalleryLightbox);
} else {
  initGalleryLightbox();
}
