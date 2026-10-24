/**
 * Contact form submit → `POST /api/contact` (lead 2026-10-01; Resend
 * 2026-10-05). Shared by the `/contact` page form and the ContactModal.
 *
 * Native validation first (`reportValidity`), then JSON POST of every field
 * (honeypot `website` included: the endpoint drops bot submissions). The
 * submit button is disabled while sending, the `[data-contact-status]` line
 * (`role="status"`) shows the result and the form resets on success.
 */

// TODO: COPY — status messages.
const MESSAGES = {
  sending: "Sending…",
  success: "Thanks! We'll be in touch within 24 hours.",
  error: "Something went wrong. Please try again or email us at info@benor.media.",
};

export function initContactForm(form: HTMLFormElement | null | undefined): void {
  if (!form) return;
  const status = form.querySelector<HTMLElement>("[data-contact-status]");
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');

  const setStatus = (message: string, state: "sending" | "success" | "error"): void => {
    if (!status) return;
    status.textContent = message;
    status.dataset["state"] = state;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    if (submit) submit.disabled = true;
    form.setAttribute("aria-busy", "true");
    setStatus(MESSAGES.sending, "sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus(MESSAGES.success, "success");
    } catch {
      setStatus(MESSAGES.error, "error");
    } finally {
      if (submit) submit.disabled = false;
      form.removeAttribute("aria-busy");
    }
  });
}
