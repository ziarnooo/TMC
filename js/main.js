/* The Maintenance Company — UI interactions */

(() => {
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ----- Header scroll state ----- */
  const header = $(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ----- Mobile nav toggle ----- */
  const toggle  = $(".nav-toggle");
  const mobile  = $("#nav-mobile");
  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const isOpen = mobile.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    $$("a", mobile).forEach(a => a.addEventListener("click", () => {
      mobile.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }));
  }

  /* ----- Reveal on scroll ----- */
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(el => io.observe(el));
  } else {
    $$(".reveal").forEach(el => el.classList.add("is-visible"));
  }

  /* ----- Lightbox ----- */
  const lightbox = $(".lightbox");
  if (lightbox) {
    const lbImg   = $(".lightbox img", lightbox);
    const lbClose = $(".lightbox-close", lightbox);
    const lbPrev  = $(".lightbox-prev",  lightbox);
    const lbNext  = $(".lightbox-next",  lightbox);
    let items = [];
    let idx   = 0;

    const open = (i) => {
      idx = i;
      const src = items[idx].getAttribute("data-full") || items[idx].querySelector("img").currentSrc || items[idx].querySelector("img").src;
      lbImg.src = src;
      lbImg.alt = items[idx].querySelector("img").alt || "";
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };
    const close = () => {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    };
    const navigate = (delta) => open((idx + delta + items.length) % items.length);

    const wire = () => {
      items = $$(".gv-tile");
      items.forEach((el, i) => el.addEventListener("click", () => open(i)));
    };
    wire();

    lbClose?.addEventListener("click", close);
    lbPrev ?.addEventListener("click", (e) => { e.stopPropagation(); navigate(-1); });
    lbNext ?.addEventListener("click", (e) => { e.stopPropagation(); navigate(1); });
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft")  navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    });
  }

  /* ----- Footer year ----- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----- Contact form (mailto fallback) ----- */
  const form = $("#contact-form");
  if (form) {
    const status = $(".form-status", form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name    = (data.get("name")    || "").toString().trim();
      const email   = (data.get("email")   || "").toString().trim();
      const phone   = (data.get("phone")   || "").toString().trim();
      const address = (data.get("address") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();

      if (!name || !email || !message) {
        if (status) status.textContent = "Please fill in your name, email and a message.";
        return;
      }

      const subject = encodeURIComponent(`Inquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\n\nMessage:\n${message}`
      );
      window.location.href = `mailto:services@tmc-tn.com?subject=${subject}&body=${body}`;
      if (status) {
        status.textContent = "Opening your email app… If nothing happens, please write us directly at services@tmc-tn.com.";
        status.classList.add("success");
      }
    });
  }
})();
