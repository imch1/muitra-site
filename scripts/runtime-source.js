/* ---------- Menu (hamburger panel) ---------- */
function initMenu() {
  const toggle = document.getElementById("menuToggle");
  const panel = document.getElementById("menuPanel");
  const overlay = document.getElementById("menuOverlay");
  if (!toggle || !panel) return;
  function setOpen(open) {
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    panel.setAttribute("aria-hidden", String(!open));
    if (overlay) overlay.hidden = !open;
  }
  toggle.addEventListener("click", () =>
    setOpen(!document.body.classList.contains("menu-open"))
  );
  if (overlay) overlay.addEventListener("click", () => setOpen(false));
  // Close after picking a destination, but keep the panel open when only
  // switching language or copying the contact email inside it.
  panel.querySelectorAll(".menu-nav a").forEach((a) =>
    a.addEventListener("click", () => { if (a.id !== "menuContact") setOpen(false); })
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

/* ---------- Contact (copy email + still fire mailto) ---------- */
function initContact() {
  const link = document.getElementById("menuContact");
  if (!link) return;
  const flag = link.querySelector(".menu-copied");
  link.addEventListener("click", () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText("muitrapp@gmail.com").catch(() => {});
    }
    if (flag) {
      flag.hidden = false;
      clearTimeout(link._t);
      link._t = setTimeout(() => { flag.hidden = true; }, 2000);
    }
  });
}

/* ---------- Carousel ---------- */
function initCarousel() {
  const track = document.getElementById("carTrack");
  const dotsBox = document.getElementById("carDots");

  // The CSS shows 1 or 2 slides per "screen" depending on viewport width
  // (see the 640px breakpoint in styles.css), so each screen is always
  // exactly one track.clientWidth wide. Dots represent those screens
  // ("pages"), not individual screenshots.
  function pageCount() {
    return Math.max(1, Math.round(track.scrollWidth / track.clientWidth));
  }
  function currentPage() {
    return Math.round(track.scrollLeft / track.clientWidth);
  }
  function goToPage(p, behavior) {
    const max = pageCount() - 1;
    p = Math.min(max, Math.max(0, p));
    // CSS scroll-snap fights a JS-driven smooth scroll: the snap engine
    // re-evaluates mid-animation and can cut it short one page too early.
    // Suspend snapping for the duration of the scroll, then restore it.
    track.style.scrollSnapType = "none";
    const restoreSnap = () => { track.style.scrollSnapType = ""; };
    track.scrollTo({ left: p * track.clientWidth, behavior });
    clearTimeout(track._snapRestoreT);
    if ("onscrollend" in window) {
      track.addEventListener("scrollend", restoreSnap, { once: true });
    } else {
      track._snapRestoreT = setTimeout(restoreSnap, behavior === "smooth" ? 500 : 0);
    }
  }

  let dots = [];
  function buildDots() {
    dotsBox.innerHTML = "";
    dots = Array.from({ length: pageCount() }, (_, p) => {
      const d = document.createElement("button");
      d.type = "button";
      d.addEventListener("click", () => goToPage(p, "smooth"));
      dotsBox.appendChild(d);
      return d;
    });
  }
  function syncDots() {
    const p = currentPage();
    dots.forEach((d, i) => d.classList.toggle("active", i === p));
  }
  buildDots();
  syncDots();

  track.addEventListener("scroll", () => window.requestAnimationFrame(syncDots), { passive: true });
  document.querySelector(".car-prev").addEventListener("click", () => goToPage(currentPage() - 1, "smooth"));
  document.querySelector(".car-next").addEventListener("click", () => goToPage(currentPage() + 1, "smooth"));

  // Slides-per-page changes at the 640px breakpoint, so the page count and
  // dot layout need to be recomputed on resize.
  let resizeT;
  window.addEventListener("resize", () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => {
      const p = currentPage();
      buildDots();
      goToPage(p, "auto");
      syncDots();
    }, 150);
  });
}

/* ---------- Motion (progressive enhancement) ---------- */
function initMotion() {
  document.body.classList.add("motion-ready");
  const reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px" });
    reveals.forEach((el) => observer.observe(el));
  }

  const visual = document.querySelector(".hero-visual");
  if (!visual || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const layers = visual.querySelectorAll("[data-float-layer]");
  visual.addEventListener("pointermove", (event) => {
    const rect = visual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    layers.forEach((layer) => {
      const depth = Number(layer.dataset.floatLayer || 1);
      layer.style.setProperty("--float-x", `${x * depth * 7}px`);
      layer.style.setProperty("--float-y", `${y * depth * 7}px`);
    });
  });
  visual.addEventListener("pointerleave", () => {
    layers.forEach((layer) => {
      layer.style.removeProperty("--float-x");
      layer.style.removeProperty("--float-y");
    });
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  initMenu();
  initContact();
  if (document.getElementById('carTrack')) initCarousel();
  initMotion();
});
