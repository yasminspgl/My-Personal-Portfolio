/* ============================================================
   Generic trip-gallery renderer. Reads ?t=<slug> and renders
   the matching entry from trips.js. Shares the Zermatt styles.
   ============================================================ */
(function () {
  const slug = new URLSearchParams(location.search).get("t");
  const trip = (typeof TRIPS !== "undefined" && TRIPS[slug]) || null;

  if (!trip) {
    document.getElementById("tTitle").textContent = "Trip not found";
    document.getElementById("tIntro").innerHTML =
      'That trip doesn\'t exist yet. <a href="index.html">Back to portfolio</a>.';
    return;
  }

  // Header
  document.title = trip.title + " — Yasmin Sapoglu";
  document.getElementById("tFlag").textContent = trip.flag || "";
  document.getElementById("tTitle").textContent = trip.title;
  document.getElementById("tSub").textContent = [trip.location, trip.date]
    .filter(Boolean)
    .join(" · ");
  document.getElementById("tIntro").textContent = trip.blurb || "";

  // Optional stats
  if (trip.stats && trip.stats.length) {
    const wrap = document.createElement("div");
    wrap.className = "z-stats";
    wrap.innerHTML = trip.stats.map(([n, l]) => `<span><b>${n}</b> ${l}</span>`).join("");
    document.getElementById("tSub").after(wrap);
  }

  // Gallery
  const grid = document.getElementById("zGallery");
  const pad = (n) => String(n).padStart(2, "0");
  for (let i = 1; i <= trip.photos; i++) {
    const src = `assets/trips/${slug}/${slug}-${pad(i)}.jpg`;
    const fig = document.createElement("figure");
    fig.className = "z-tile is-photo";
    fig.innerHTML = `<img src="${src}" alt="${trip.title} ${i}" loading="lazy" />`;
    grid.appendChild(fig);
  }

  // Lightbox
  const lb = document.getElementById("zLb");
  const lbImg = document.getElementById("zLbImg");
  grid.addEventListener("click", (e) => {
    const img = e.target.closest(".z-tile.is-photo img");
    if (!img) return;
    lbImg.src = img.src;
    lb.classList.add("is-open");
  });
  function closeLb() { lb.classList.remove("is-open"); lbImg.src = ""; }
  document.getElementById("zLbClose").addEventListener("click", closeLb);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLb(); });

  // Optional food/emoji stickers at photo intersections
  if (trip.stickers && trip.stickers.length) {
    const place = () => {
      grid.querySelectorAll(".z-sticker").forEach((s) => s.remove());
      const tiles = [...grid.querySelectorAll(".z-tile")];
      if (!tiles.length) return;
      const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
      const gr = grid.getBoundingClientRect();
      let f = 0, k = 0;
      tiles.forEach((tile, i) => {
        const col = i % cols;
        if (col < cols - 1 && i + 1 < tiles.length && i + cols < tiles.length) {
          if (k++ % 2 === 0) {
            const r = tile.getBoundingClientRect();
            const s = document.createElement("span");
            s.className = "z-sticker";
            s.textContent = trip.stickers[f % trip.stickers.length];
            s.style.left = r.right - gr.left + "px";
            s.style.top = r.bottom - gr.top + "px";
            s.style.setProperty("--rot", (f % 2 ? 1 : -1) * (6 + (f % 3) * 5) + "deg");
            grid.appendChild(s);
            f++;
          }
        }
      });
    };
    window.addEventListener("load", place);
    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(place, 150); });
    setTimeout(place, 400);
  }
})();
