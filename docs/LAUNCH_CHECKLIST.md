# EHL Website — Launch Checklist

Items that must be done at cutover, not before (the legacy site is still
live until then).

- [ ] **Update PayPal donate button return/cancel URLs** — the PayPal
      Hosted Donate Button (`hosted_button_id=J3JALMAXU6E28`, see
      `src/lib/config.ts`) currently has its return and cancel URLs set to
      pages on the legacy site. Update both in the PayPal dashboard to
      point at the new site's post-donation page.
      **Owner:** Jess Morton.
      **Timing:** at cutover.
      **Risk if skipped:** donors who complete a payment get redirected to
      a dead page on the legacy site instead of back to the new one.
