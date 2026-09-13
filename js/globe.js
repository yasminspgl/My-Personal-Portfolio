/* ============================================================
   Interactive spinnable globe (D3 orthographic) plotting every
   place in places.js. Drag to rotate, auto-spins otherwise.
   ============================================================ */
async function renderGlobe() {
  const el = document.getElementById("globe");
  if (!el || typeof d3 === "undefined" || el.dataset.rendered) return;
  el.dataset.rendered = "1";

  const size = 640;
  const svg = d3
    .select(el)
    .append("svg")
    .attr("viewBox", `0 0 ${size} ${size}`);

  const projection = d3
    .geoOrthographic()
    .scale(size / 2 - 3)
    .translate([size / 2, size / 2])
    .clipAngle(90)
    .rotate([-20, -25]);
  const path = d3.geoPath(projection);

  // Ocean
  svg.append("circle").attr("class", "ocean")
    .attr("cx", size / 2).attr("cy", size / 2).attr("r", projection.scale());

  const gGrat = svg.append("path").attr("class", "graticule").datum(d3.geoGraticule10());
  const gLand = svg.append("g");
  const gArcs = svg.append("g");

  // Soft sphere shading for a natural, rounded 3D feel (static, 1 cheap node).
  const defs = svg.append("defs");
  const grad = defs.append("radialGradient").attr("id", "gshade")
    .attr("cx", "36%").attr("cy", "30%").attr("r", "80%");
  grad.append("stop").attr("offset", "0%").attr("stop-color", "#ffffff").attr("stop-opacity", 0.30);
  grad.append("stop").attr("offset", "46%").attr("stop-color", "#ffffff").attr("stop-opacity", 0);
  grad.append("stop").attr("offset", "100%").attr("stop-color", "#04121e").attr("stop-opacity", 0.45);
  svg.append("circle").attr("class", "gshade")
    .attr("cx", size / 2).attr("cy", size / 2).attr("r", projection.scale())
    .attr("fill", "url(#gshade)").style("pointer-events", "none");

  const gPts = svg.append("g");

  // Flight-path arcs.
  const EXTRA = { "Naples": [14.268, 40.852] };
  const coordOf = (name) => {
    const p = PLACES.find((x) => x.name === name);
    if (p) return [p.lng, p.lat];
    return EXTRA[name] || null;
  };

  // Before 2021 home was Istanbul, so those trips flew out from Istanbul.
  const HOME = "Istanbul";
  const PRE_2021 = [
    "Amsterdam", "Sofia", "Bucharest", "London", "Geneva", "Los Angeles",
    "New York City", "Rome", "Athens", "Mayrhofen", "Kathmandu", "Bansko",
    "Tallinn", "Chamonix", "Val Gardena",
  ];

  // 2021 onward (uni in the UK) — chronological chain from the visits list.
  const SEQUENCE = [
    "Istanbul", "Manchester", "Paris", "Rome", "Athens", "Istanbul",
    "Manchester", "Bordeaux", "Brussels", "Amsterdam", "Manchester", "Nice",
    "London", "Istanbul", "Athens", "Istanbul", "London", "Ibiza", "London",
    "Istanbul", "London", "Cologne", "London", "Lisbon", "London", "Edinburgh",
    "Rhodes", "Biarritz", "San Sebastián", "Manchester", "Marrakech",
    "Manchester", "Nice", "Manchester", "Toronto", "London", "Manchester",
    "Edinburgh", "London", "Baku", "Strasbourg", "Alexandroupoli", "Zermatt",
    "London", "Athens", "Milan", "Naxos", "Singapore", "Bali",
  ];

  // Explicit intra-trip hops (not captured by the country list).
  const MANUAL = [
    ["Istanbul", "Los Angeles"], ["Los Angeles", "Las Vegas"],
    ["New York City", "Washington, D.C."], ["Singapore", "Bali"],
    ["Athens", "Naxos"], ["Manchester", "Naples"],
    ["Manchester", "Edinburgh"], ["Edinburgh", "Istanbul"],
  ];

  const UK = new Set(["London", "Manchester", "Edinburgh"]);
  const skipPair = (a, b) =>
    (UK.has(a) && UK.has(b)) ||                        // intra-UK: train
    (a === "Biarritz" && b === "San Sebastián") ||     // a drive
    (a === "San Sebastián" && b === "Biarritz");

  const seen = new Set();
  const routes = [];
  const add = (a, b) => {
    if (!a || !b || a === b) return;
    const key = [a, b].sort().join("|");
    if (seen.has(key)) return;
    seen.add(key);
    routes.push([a, b]);
  };
  PRE_2021.forEach((d) => add(HOME, d));
  MANUAL.forEach(([a, b]) => add(a, b));
  for (let i = 1; i < SEQUENCE.length; i++) {
    const a = SEQUENCE[i - 1], b = SEQUENCE[i];
    if (!skipPair(a, b)) add(a, b);
  }

  const arcs = routes.map(([a, b]) => {
    const A = coordOf(a), B = coordOf(b);
    if (!A || !B) return null;
    const interp = d3.geoInterpolate(A, B);
    return { type: "Feature", geometry: { type: "LineString", coordinates: d3.range(0, 1.0001, 0.02).map((t) => interp(t)) } };
  }).filter(Boolean);
  const arcPaths = gArcs.selectAll("path").data(arcs).join("path").attr("class", "arc");

  // Points
  // Approx metro populations (millions) — drives how bright each light is.
  const POP = {
    "Istanbul": 15.5, "Ankara": 5.7, "Bursa": 3.1, "Kocaeli": 2.0, "Bolu": 0.32,
    "Bodrum": 0.18, "Gaziantep": 2.1, "Trabzon": 0.81, "Rize": 0.16, "Kayseri": 1.4,
    "Erzurum": 0.76, "Uludağ": 0.04, "Dorukkaya": 0.02,
    "Los Angeles": 12.5, "San Francisco": 4.7, "New York City": 18.8, "San Diego": 3.3,
    "Washington, D.C.": 6.3, "Las Vegas": 2.3, "Toronto": 6.4,
    "London": 9.5, "Manchester": 2.8, "Edinburgh": 0.55, "Inverness": 0.07,
    "Liverpool": 0.9, "Blackpool": 0.14, "Isle of Skye": 0.01, "Loch Ness": 0.01,
    "Paris": 11.1, "Nice": 0.95, "Bordeaux": 1.0, "Biarritz": 0.03, "Strasbourg": 0.5,
    "Cannes": 0.07, "Chamonix": 0.009,
    "Rome": 4.3, "Milan": 3.1, "Naples": 3.0, "Venice": 0.26, "Amalfi Coast": 0.005,
    "Capri": 0.014, "Val Gardena": 0.01, "Cortina d'Ampezzo": 0.006,
    "Barcelona": 5.6, "Madrid": 6.6, "San Sebastián": 0.19, "Ibiza": 0.15,
    "Zermatt": 0.006, "Verbier": 0.003, "Zurich": 1.4, "Geneva": 0.6, "Bern": 0.42, "Lausanne": 0.42,
    "Berlin": 3.7, "Cologne": 1.1, "Aachen": 0.25, "Düsseldorf": 0.62,
    "Amsterdam": 1.15, "Brussels": 1.2, "Leuven": 0.1, "Bruges": 0.12,
    "Athens": 3.2, "Thessaloniki": 1.0, "Alexandroupoli": 0.07, "Corfu": 0.1,
    "Paxos": 0.0024, "Antipaxos": 0.0001, "Lefkada": 0.023, "Hydra": 0.002,
    "Patmos": 0.003, "Lipsi": 0.0008, "Rhodes": 0.09, "Naxos": 0.02,
    "Luxembourg": 0.13, "Tallinn": 0.45, "Bucharest": 1.8, "Sofia": 1.3,
    "Bansko": 0.008, "Mayrhofen": 0.004, "Kitzbühel": 0.008, "Brașov": 0.29,
    "Baku": 2.3, "Marrakech": 1.0, "Kathmandu": 1.5, "Bali": 0.9, "Singapore": 6.0,
  };
  // City markers: a small cluster per place, dot-count and sprawl scaled by
  // metro population. Kept light (no per-dot filters) so the globe spins
  // smoothly, and warm-toned to sit naturally on the green land.
  const WARM = ["#232323", "#333333", "#1a1a1a", "#3d3d3d", "#2a2a2a"]; // travel — near-black
  const COOL = ["#6f6f6f", "#7f7f7f", "#5f5f5f"];                       // ski — mid grey
  const pick = (a) => a[(Math.random() * a.length) | 0];

  const LIGHTS = [];
  PLACES.forEach((p) => {
    const pop = POP[p.name] ?? 0.05;
    const ski = p.cat === "ski";
    const n = Math.min(ski ? 5 : 14, Math.round(1 + Math.sqrt(pop) * (ski ? 1.4 : 3)));
    const spread = (ski ? 0.18 : 0.25) + Math.sqrt(pop) * (ski ? 0.14 : 0.34); // degrees
    const lngStretch = 1 / Math.max(0.25, Math.cos((p.lat * Math.PI) / 180));
    for (let i = 0; i < n; i++) {
      const core = i === 0;
      const t = Math.pow(Math.random(), 1.6); // concentrate toward the centre
      const a = Math.random() * 2 * Math.PI;
      LIGHTS.push({
        name: p.name, country: p.country, cat: p.cat,
        lng: p.lng + (core ? 0 : Math.sin(a) * spread * t * lngStretch),
        lat: p.lat + (core ? 0 : Math.cos(a) * spread * t),
        r: core ? (ski ? 1.9 : 2.7) : 0.9 + Math.random() * 1.3,
        color: ski ? pick(COOL) : pick(WARM),
      });
    }
  });

  const pts = gPts.selectAll("circle").data(LIGHTS).join("circle")
    .attr("r", (d) => d.r)
    .attr("class", "lt")
    .style("fill", (d) => d.color);

  // Tooltip
  const tip = document.getElementById("gtip");
  if (tip) {
    pts.on("mouseenter", (e, d) => { tip.textContent = d.name + " · " + d.country; tip.style.opacity = 1; })
       .on("mousemove", (e) => { tip.style.left = e.clientX + 14 + "px"; tip.style.top = e.clientY + 14 + "px"; })
       .on("mouseleave", () => { tip.style.opacity = 0; });
  }

  function render() {
    gGrat.attr("d", path);
    gLand.selectAll("path").attr("d", path);
    arcPaths.attr("d", path);
    const r = projection.rotate();
    const center = [-r[0], -r[1]];
    // Project each marker once (cached on the datum) — cheaper than a
    // per-node d3.select wrapper every frame.
    pts
      .attr("cx", (d) => ((d._p = d3.geoDistance([d.lng, d.lat], center) < 1.5708 ? projection([d.lng, d.lat]) : null)) ? d._p[0] : -99)
      .attr("cy", (d) => (d._p ? d._p[1] : -99))
      .style("display", (d) => (d._p ? null : "none"));
  }

  // Load world map
  try {
    const world = await d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
    const land = topojson.feature(world, world.objects.countries);
    gLand.selectAll("path").data(land.features).join("path").attr("class", "land");
  } catch (err) {
    console.warn("World map failed to load; showing dots only.", err);
  }
  render();

  const gc = document.getElementById("gCount");
  if (gc) gc.textContent =
    PLACES.length + " cities · " + new Set(PLACES.map((p) => p.country)).size + " countries";

  // Drag to rotate
  let auto = true;
  const sens = 0.24;
  svg.call(
    d3.drag()
      .on("start", () => { auto = false; })
      .on("drag", (e) => {
        const r = projection.rotate();
        projection.rotate([r[0] + e.dx * sens, r[1] - e.dy * sens]);
        render();
      })
  );
  svg.on("dblclick", () => { auto = true; });

  // Gentle auto-rotation — time-based so the spin stays smooth and even
  // regardless of frame rate (no jumpy catch-up when a frame is slow).
  let last = 0;
  d3.timer((elapsed) => {
    const dt = elapsed - last;
    last = elapsed;
    if (!auto) return;
    const r = projection.rotate();
    projection.rotate([r[0] + dt * 0.006, r[1]]); // ~6°/sec
    render();
  });
}
if (typeof window !== "undefined") window.renderGlobe = renderGlobe;
renderGlobe();
