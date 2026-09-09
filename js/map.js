/* ============================================================
   Interactive world map (Leaflet) of every place in places.js
   ============================================================ */
(function () {
  const el = document.getElementById("worldmap");
  if (!el || typeof L === "undefined") return;

  const map = L.map("worldmap", {
    scrollWheelZoom: false,
    worldCopyJump: true,
  }).setView([35, 15], 2);

  // Soft, low-key basemap that suits the warm palette
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(map);

  const colors = { travel: "#2f6ec8", ski: "#3a9bd4" };

  const layers = { travel: L.layerGroup(), ski: L.layerGroup() };

  PLACES.forEach((p) => {
    const marker = L.circleMarker([p.lat, p.lng], {
      radius: 7,
      color: "#fff",
      weight: 2,
      fillColor: colors[p.cat] || "#c8642f",
      fillOpacity: 0.95,
    });
    const label = p.cat === "ski" ? "⛷ Skiing" : "✈ Travel";
    const galleryLink = p.gallery
      ? `<br><a href="${p.gallery}" class="place-pop__link">View gallery →</a>`
      : "";
    marker.bindPopup(
      `<div class="place-pop"><b>${p.name}</b><br>` +
      `<small>${p.country}${p.note ? " · " + p.note : ""}</small><br>` +
      `<small>${label}</small>${galleryLink}</div>`
    );
    marker.on("mouseover", function () { this.openPopup(); });
    layers[p.cat].addLayer(marker);
  });

  layers.travel.addTo(map);
  layers.ski.addTo(map);

  // Fit to all pins
  const bounds = L.latLngBounds(PLACES.map((p) => [p.lat, p.lng]));
  map.fitBounds(bounds.pad(0.15));

  // Headline stats
  const countryCount = new Set(PLACES.map((p) => p.country)).size;
  const skiCount = PLACES.filter((p) => p.cat === "ski").length;
  document.getElementById("placeCount").textContent = PLACES.length;

  const mapStats = document.getElementById("mapStats");
  if (mapStats) {
    const tiles = [
      [PLACES.length, "cities"],
      [countryCount, "countries"],
      [skiCount, "ski resorts"],
    ];
    mapStats.innerHTML = tiles
      .map(
        ([n, label]) =>
          `<div class="stat"><span class="stat__num stat__num--travel">${n}</span><span class="stat__label">${label}</span></div>`
      )
      .join("");
  }

  // Legend filters
  document.querySelectorAll(".legend__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".legend__btn").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const cat = btn.dataset.cat;
      ["travel", "ski"].forEach((c) => {
        if (cat === "all" || cat === c) map.addLayer(layers[c]);
        else map.removeLayer(layers[c]);
      });
    });
  });

  // Leaflet needs a nudge when its container starts hidden/animated
  setTimeout(() => map.invalidateSize(), 300);
})();
