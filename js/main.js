/* ============================================================
   Portfolio interactions: theme, gallery, filter, lightbox, reveal
   ============================================================ */

/* ---- Year ---- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---- Theme toggle (remembers choice) ---- */
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("navToggle");
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  if (saved) root.setAttribute("data-theme", saved);
  else if (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches) {
    root.setAttribute("data-theme", "dark");
  }
  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();

/* ---- Gallery ----
   To use YOUR photos: drop image files into assets/gallery/ and
   list their filenames in GALLERY_IMAGES below. Leave the array
   empty to show styled placeholders.
*/
const GALLERY_IMAGES = [
  // "assets/gallery/photo1.jpg",
  // "assets/gallery/photo2.jpg",
];
(function () {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;

  if (GALLERY_IMAGES.length) {
    GALLERY_IMAGES.forEach((src, i) => {
      const fig = document.createElement("figure");
      fig.className = "gallery__item";
      fig.innerHTML = `<img src="${src}" alt="Photograph ${i + 1}" loading="lazy" />`;
      grid.appendChild(fig);
    });
  } else {
    const tints = ["#e8d8c4", "#cddfe0", "#d9cfe6", "#e6d3d3", "#cfe0d0", "#d6d9e6", "#e6dccf", "#dcd4c9"];
    for (let i = 0; i < 8; i++) {
      const fig = document.createElement("figure");
      fig.className = "gallery__item";
      fig.innerHTML = `<div class="gallery__ph" style="--tint:${tints[i % tints.length]}">Your photo here<br>(assets/gallery/)</div>`;
      grid.appendChild(fig);
    }
  }
})();

/* ---- Project filter ---- */
(function () {
  const filter = document.getElementById("projectFilter");
  const cards = document.querySelectorAll("#projectGrid .card");
  if (!filter) return;
  filter.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter__btn");
    if (!btn) return;
    filter.querySelectorAll(".filter__btn").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const f = btn.dataset.filter;
    cards.forEach((c) => {
      c.classList.toggle("is-hidden", f !== "all" && c.dataset.status !== f);
    });
  });
})();

/* ---- Lightbox (click any real gallery image) ---- */
(function () {
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  const close = document.getElementById("lightboxClose");
  const galleryGrid = document.getElementById("gallery-grid");
  if (galleryGrid) {
    galleryGrid.addEventListener("click", (e) => {
      const img = e.target.closest("img");
      if (!img) return;
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lb.classList.add("is-open");
      lb.setAttribute("aria-hidden", "false");
    });
  }
  function hide() { lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true"); }
  close.addEventListener("click", hide);
  lb.addEventListener("click", (e) => { if (e.target === lb) hide(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") hide(); });
})();

/* ---- Reveal on scroll ---- */
(function () {
  const targets = document.querySelectorAll(".section, .contact");
  targets.forEach((t) => t.classList.add("reveal"));
  if (!("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }),
    { threshold: 0.08 }
  );
  targets.forEach((t) => io.observe(t));
})();

/* ---- Reliable in-page anchor scrolling ----
   scroll-behavior:smooth fights the scroll-reveal (sections shift as they
   reveal mid-scroll, landing short). So intercept #-links: settle all
   reveals first, then smooth-scroll to the target with the nav offset. */
(function () {
  const NAV_OFFSET = 90;
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    // settle every reveal so the layout can't shift during the scroll
    document.querySelectorAll(".reveal, .rise").forEach((x) => x.classList.add("is-in", "in"));
    const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    history.pushState(null, "", id);
  });
})();

/* ---- "This Website" card: cross-fade slideshow of site features ---- */
(function () {
  const box = document.getElementById("siteSlides");
  if (!box) return;
  const slides = [...box.querySelectorAll(".cardslide")];
  const cap = box.querySelector(".cardslide__cap");
  if (slides.length < 2) { if (cap && slides[0]) cap.textContent = slides[0].dataset.cap || ""; return; }
  const load = (s) => { if (!s.getAttribute("src") && s.dataset.src) s.setAttribute("src", s.dataset.src); };
  let i = 0;
  if (cap) cap.textContent = slides[0].dataset.cap || "";
  setInterval(() => {
    const next = (i + 1) % slides.length;
    load(slides[next]);
    slides[i].classList.remove("is-on");
    slides[next].classList.add("is-on");
    if (cap) cap.textContent = slides[next].dataset.cap || "";
    i = next;
  }, 3600);
})();

/* ---- Lazy-build the inline interactive globe when its section opens ---- */
(function () {
  const d = document.querySelector(".travelmap");
  if (!d) return;
  let started = false;
  const loadScript = (src) =>
    new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  d.addEventListener("toggle", async () => {
    if (!d.open || started) return;
    started = true;
    try {
      if (typeof d3 === "undefined") await loadScript("https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js");
      if (typeof topojson === "undefined") await loadScript("https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js");
      if (typeof PLACES === "undefined") await loadScript("js/places.js?v=4");
      if (typeof renderGlobe === "undefined") await loadScript("js/globe.js?v=10");
      else renderGlobe();
    } catch (e) {
      console.warn("Globe failed to load", e);
      started = false;
    }
  });
})();

/* ---- Scrollspy: light up the nav link for the section in view ---- */
(function () {
  const links = [...document.querySelectorAll('.nav__links a[href^="#"]:not(.nav__cta)')];
  const map = new Map();
  links.forEach((a) => {
    const el = document.querySelector(a.getAttribute("href"));
    if (el) map.set(el, a);
  });
  if (!map.size || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const a = map.get(en.target);
        if (!a) return;
        links.forEach((l) => l.classList.remove("is-active"));
        a.classList.add("is-active");
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  map.forEach((a, el) => io.observe(el));
})();
