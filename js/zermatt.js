/* ============================================================
   Zermatt page: media grid, click-to-play video, lightbox,
   and food stickers dropped onto the photo intersections.
   ============================================================ */

/* Media in display order. type: "photo" | "video" */
const ZERMATT_MEDIA = [
  { type: "photo", src: "assets/zermatt/zermatt-02.jpg" },
  { type: "photo", src: "assets/zermatt/zermatt-01.jpg" },
  { type: "video", src: "assets/zermatt/zermatt-vid-01.mp4" },
  { type: "photo", src: "assets/zermatt/zermatt-06.jpg" },
  { type: "photo", src: "assets/zermatt/zermatt-03.jpg" },
  { type: "photo", src: "assets/zermatt/zermatt-08.jpg" },
  { type: "video", src: "assets/zermatt/zermatt-vid-03.mp4" },
  { type: "photo", src: "assets/zermatt/zermatt-04.jpg" },
  { type: "photo", src: "assets/zermatt/zermatt-07.jpg" },
  { type: "photo", src: "assets/zermatt/zermatt-05.jpg" },
  { type: "video", src: "assets/zermatt/zermatt-vid-02.mp4" },
  { type: "photo", src: "assets/zermatt/zermatt-09.jpg" },
  { type: "photo", src: "assets/zermatt/zermatt-10.jpg" },
];

/* Foodie stickers — Swiss/alpine treats */
const FOOD = ["🫕", "🧀", "🍫", "🥐", "☕", "🍷", "🥔", "🍎", "🥖", "🍜"];

const grid = document.getElementById("zGallery");

ZERMATT_MEDIA.forEach((m, i) => {
  const tile = document.createElement("figure");
  tile.className = "z-tile " + (m.type === "photo" ? "is-photo" : "is-video");
  if (m.type === "photo") {
    tile.innerHTML = `<img src="${m.src}" alt="Zermatt ${i + 1}" loading="lazy" />`;
  } else {
    tile.innerHTML =
      `<video src="${m.src}" muted loop playsinline preload="metadata"></video>` +
      `<div class="z-play"><span>▶</span></div>`;
  }
  grid.appendChild(tile);
});

/* ---- Click to play/pause videos ---- */
grid.addEventListener("click", (e) => {
  const tile = e.target.closest(".z-tile.is-video");
  if (!tile) return;
  const v = tile.querySelector("video");
  if (v.paused) { v.play(); tile.classList.add("is-playing"); }
  else { v.pause(); tile.classList.remove("is-playing"); }
});

/* ---- Lightbox for photos ---- */
const lb = document.getElementById("zLb");
const lbImg = document.getElementById("zLbImg");
grid.addEventListener("click", (e) => {
  const tile = e.target.closest(".z-tile.is-photo");
  if (!tile) return;
  lbImg.src = tile.querySelector("img").src;
  lb.classList.add("is-open");
});
function closeLb() { lb.classList.remove("is-open"); lbImg.src = ""; }
document.getElementById("zLbClose").addEventListener("click", closeLb);
lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLb(); });

/* ---- Location map at the bottom of the page ---- */
(function () {
  const el = document.getElementById("zermattMap");
  if (!el || typeof L === "undefined") return;
  const map = L.map("zermattMap", { scrollWheelZoom: false }).setView([46.02, 7.749], 11);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap &copy; CARTO",
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(map);
  L.circleMarker([46.02, 7.749], {
    radius: 8, color: "#fff", weight: 2, fillColor: "#3a9bd4", fillOpacity: 0.95,
  }).addTo(map).bindPopup("<b>Zermatt</b><br><small>Switzerland · Matterhorn</small>");
  setTimeout(() => map.invalidateSize(), 300);
})();
