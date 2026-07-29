function validateField(field: HTMLInputElement | HTMLTextAreaElement): string {
  if (field.validity.valueMissing) return "This field is required.";
  if (field.validity.typeMismatch && field.type === "email")
    return "Enter a valid email address.";
  if (field.validity.patternMismatch) return "Enter a valid value.";
  return "";
}

function setFieldError(
  field: HTMLInputElement | HTMLTextAreaElement,
  message: string,
) {
  const errorId = field.getAttribute("aria-describedby");
  const errorEl = errorId ? document.getElementById(errorId) : null;
  if (errorEl) errorEl.textContent = message;
  if (message) field.setAttribute("aria-invalid", "true");
  else field.removeAttribute("aria-invalid");
}

function initForm(form: HTMLFormElement) {
  const endpoint = form.dataset.endpoint;
  const status = form.querySelector<HTMLElement>("[data-form-status]");
  const submitBtn = form.querySelector<HTMLButtonElement>(
    'button[type="submit"]',
  );
  const successMessage =
    form.dataset.successMessage || "Thanks — your submission was received.";
  if (!endpoint) return;

  const fields = Array.from(
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      "input[required], textarea[required]",
    ),
  );

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let firstInvalid: HTMLInputElement | HTMLTextAreaElement | null = null;
    fields.forEach((field) => {
      const message = validateField(field);
      setFieldError(field, message);
      if (message && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      (firstInvalid as HTMLInputElement | HTMLTextAreaElement).focus();
      if (status)
        status.textContent =
          "Please fix the highlighted field before submitting.";
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute("aria-busy", "true");
      submitBtn.dataset.originalText =
        submitBtn.dataset.originalText || submitBtn.textContent || "";
      submitBtn.textContent = "Sending…";
    }
    if (status) status.textContent = "";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (response.ok) {
        form.reset();
        if (status) status.textContent = successMessage;
      } else {
        const data = await response.json().catch(() => null);
        const message =
          data?.errors?.map((e: { message: string }) => e.message).join(" ") ||
          "Something went wrong. Please try again.";
        if (status) status.textContent = message;
      }
    } catch {
      if (status) status.textContent = "Network error — please try again.";
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.removeAttribute("aria-busy");
        submitBtn.textContent = submitBtn.dataset.originalText || "Submit";
      }
    }
  });
}

function initForms() {
  document
    .querySelectorAll<HTMLFormElement>("form[data-formspree-form]")
    .forEach(initForm);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initForms);
} else {
  initForms();
}
