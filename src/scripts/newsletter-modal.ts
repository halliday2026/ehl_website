function initRegionCheckboxes(dialog: HTMLDialogElement) {
  const checkboxes = Array.from(
    dialog.querySelectorAll<HTMLInputElement>('input[name="regions"]'),
  );
  const noneCheckbox = checkboxes.find((cb) => cb.value === "None");
  if (!noneCheckbox) return;
  const otherCheckboxes = checkboxes.filter((cb) => cb !== noneCheckbox);

  function setOthersDisabled(disabled: boolean) {
    otherCheckboxes.forEach((cb) => {
      cb.disabled = disabled;
      cb.closest("label")?.classList.toggle("opacity-50", disabled);
    });
  }

  noneCheckbox.addEventListener("change", () => {
    if (noneCheckbox.checked) {
      otherCheckboxes.forEach((cb) => {
        cb.checked = false;
      });
    }
    setOthersDisabled(noneCheckbox.checked);
  });

  otherCheckboxes.forEach((cb) => {
    cb.addEventListener("change", () => {
      if (cb.checked) noneCheckbox.checked = false;
    });
  });
}

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

  initRegionCheckboxes(dialog);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNewsletterModal);
} else {
  initNewsletterModal();
}
