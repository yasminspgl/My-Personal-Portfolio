/* ============================================================
   Populate hobby galleries (photography, food, ceramics) and
   open any hobby / gallery photo in the shared lightbox.
   ============================================================ */
(function () {
  const SETS = {
    "hg-photography": { prefix: "assets/hobbies/photography/photography", start: 2, count: 12 }, // -01 is the preview
    "hg-food":        { prefix: "assets/hobbies/food/food",        start: 2, count: 15 }, // -01 is the preview
    "hg-ceramics":    { prefix: "assets/hobbies/ceramics/ceramics", start: 1, count: 8 },
  };
  const pad = (n) => String(n).padStart(2, "0");

  // Skiing photos come from the trip galleries (explicit paths)
  const SKIING = [
    "assets/zermatt/zermatt-04.jpg", "assets/zermatt/zermatt-06.jpg",
    "assets/zermatt/zermatt-07.jpg", "assets/zermatt/zermatt-08.jpg",
    "assets/trips/verbier/verbier-01.jpg", "assets/trips/verbier/verbier-03.jpg",
    "assets/trips/verbier/verbier-05.jpg", "assets/trips/bansko/bansko-02.jpg",
    "assets/trips/bansko/bansko-04.jpg", "assets/trips/bansko/bansko-06.jpg",
    "assets/trips/valgardena/valgardena-02.jpg", "assets/trips/valgardena/valgardena-03.jpg",
  ];

  // Jewellery design: my own pieces first, then the Baku trip that inspired
  // them (Zaha Hadid architecture + eastern jewellery traditions). jewellery-01
  // is the preview shown above the gallery.
  const JEWELLERY = [
    "assets/hobbies/jewellery/jewellery-02.jpg", "assets/hobbies/jewellery/jewellery-03.jpg",
    "assets/hobbies/jewellery/jewellery-05.jpg", "assets/hobbies/jewellery/jewellery-06.jpg",
    "assets/hobbies/jewellery/jewellery-04.jpg",
    "assets/hobbies/baku/baku-16.jpg", "assets/hobbies/baku/baku-19.jpg",
    "assets/hobbies/baku/baku-17.jpg", "assets/hobbies/baku/baku-20.jpg",
    "assets/hobbies/baku/baku-21.jpg", "assets/hobbies/baku/baku-01.jpg",
    "assets/hobbies/baku/baku-06.jpg", "assets/hobbies/baku/baku-03.jpg",
    "assets/hobbies/baku/baku-09.jpg", "assets/hobbies/baku/baku-05.jpg",
    "assets/hobbies/baku/baku-12.jpg", "assets/hobbies/baku/baku-14.jpg",
    "assets/hobbies/baku/baku-18.jpg",
  ];

  const addShot = (el, src) => {
    const fig = document.createElement("figure");
    fig.className = "hobbyshot";
    fig.innerHTML = `<img src="${src}" alt="" loading="lazy" />`;
    el.appendChild(fig);
  };

  for (const [id, s] of Object.entries(SETS)) {
    const el = document.getElementById(id);
    if (!el) continue;
    for (let i = s.start; i <= s.count; i++) addShot(el, `${s.prefix}-${pad(i)}.jpg`);
  }
  const ski = document.getElementById("hg-skiing");
  if (ski) SKIING.forEach((src) => addShot(ski, src));
  const jew = document.getElementById("hg-jewellery");
  if (jew) JEWELLERY.forEach((src) => addShot(jew, src));

  // Load more: show a first batch, reveal the rest on click
  const LIMIT = 6;
  ["hg-photography", "hg-food", "hg-skiing", "hg-ceramics", "hg-jewellery"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const shots = [...el.querySelectorAll(".hobbyshot")];
    if (shots.length <= LIMIT) return;
    shots.slice(LIMIT).forEach((s) => s.classList.add("is-hidden"));
    const btn = document.createElement("button");
    btn.className = "loadmore";
    btn.textContent = `Load more (${shots.length - LIMIT})`;
    btn.addEventListener("click", () => {
      el.querySelectorAll(".hobbyshot.is-hidden").forEach((s) => s.classList.remove("is-hidden"));
      btn.remove();
    });
    el.after(btn);
  });

  // Shared lightbox for hobby + gallery photos
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  if (lb && lbImg) {
    document.addEventListener("click", (e) => {
      const img = e.target.closest(".hobbyshot img, .hobbyshot--preview img, .ceramwall img, .scrollgal__shot img");
      if (!img) return;
      lbImg.src = img.src;
      lbImg.alt = img.alt || "";
      lb.classList.add("is-open");
      lb.setAttribute("aria-hidden", "false");
    });
  }
})();
