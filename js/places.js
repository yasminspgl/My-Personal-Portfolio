/* ============================================================
   Places I've been.
   cat: "travel" or "ski"   |   note: optional caption
   Add / edit freely — the map reads straight from this array.
   ============================================================ */
const PLACES = [
  // ---- Skiing ----
  { name: "Val Gardena", country: "Italy",       cat: "ski", lat: 46.556, lng: 11.678, note: "Dolomites" },
  { name: "Zermatt",     country: "Switzerland", cat: "ski", lat: 46.020, lng: 7.749,  note: "Matterhorn" },
  { name: "Mayrhofen",   country: "Austria",     cat: "ski", lat: 47.163, lng: 11.868, note: "Zillertal" },
  { name: "Bansko",      country: "Bulgaria",    cat: "ski", lat: 41.838, lng: 23.488, note: "Pirin" },

  // ---- Travel ----
  { name: "Bali",           country: "Indonesia",   cat: "travel", lat: -8.340, lng: 115.092 },
  { name: "Singapore",      country: "Singapore",   cat: "travel", lat: 1.352,  lng: 103.820 },
  { name: "Kathmandu",      country: "Nepal",       cat: "travel", lat: 27.717, lng: 85.324 },
  { name: "Los Angeles",    country: "United States",         cat: "travel", lat: 34.052, lng: -118.244 },
  { name: "San Francisco",  country: "United States",         cat: "travel", lat: 37.774, lng: -122.419 },
  { name: "New York City",  country: "United States",         cat: "travel", lat: 40.713, lng: -74.006 },
  { name: "San Diego",      country: "United States",         cat: "travel", lat: 32.716, lng: -117.161 },
  { name: "Toronto",        country: "Canada",      cat: "travel", lat: 43.653, lng: -79.383 },
  { name: "Amalfi Coast",   country: "Italy",       cat: "travel", lat: 40.634, lng: 14.602 },
  { name: "Capri",          country: "Italy",       cat: "travel", lat: 40.551, lng: 14.242 },
  { name: "Rome",           country: "Italy",       cat: "travel", lat: 41.903, lng: 12.496 },
  { name: "Verbier",        country: "Switzerland", cat: "travel", lat: 46.096, lng: 7.228 },
  { name: "Zurich",         country: "Switzerland", cat: "travel", lat: 47.377, lng: 8.542 },
  { name: "Geneva",         country: "Switzerland", cat: "travel", lat: 46.204, lng: 6.143 },
  { name: "Paris",          country: "France",      cat: "travel", lat: 48.857, lng: 2.352 },
  { name: "Berlin",         country: "Germany",     cat: "travel", lat: 52.520, lng: 13.405 },
  { name: "Cologne",        country: "Germany",     cat: "travel", lat: 50.938, lng: 6.960 },
  { name: "Aachen",         country: "Germany",     cat: "travel", lat: 50.776, lng: 6.084 },
  { name: "Düsseldorf",     country: "Germany",     cat: "travel", lat: 51.228, lng: 6.773 },
  { name: "Luxembourg",     country: "Luxembourg",  cat: "travel", lat: 49.611, lng: 6.131 },
  { name: "Edinburgh",      country: "Scotland",    cat: "travel", lat: 55.953, lng: -3.188 },
  { name: "Inverness",      country: "Scotland",    cat: "travel", lat: 57.478, lng: -4.224, note: "Highlands" },
  { name: "Amsterdam",      country: "Netherlands", cat: "travel", lat: 52.370, lng: 4.895 },
  { name: "Tallinn",        country: "Estonia",     cat: "travel", lat: 59.437, lng: 24.754 },
  { name: "Baku",           country: "Azerbaijan",  cat: "travel", lat: 40.409, lng: 49.867 },
  { name: "Marrakech",      country: "Morocco",     cat: "travel", lat: 31.630, lng: -7.981 },
  { name: "Barcelona",      country: "Spain",       cat: "travel", lat: 41.385, lng: 2.173 },
  { name: "San Sebastián",  country: "Spain",       cat: "travel", lat: 43.318, lng: -1.981 },

  // ---- Representative city — rename to the exact place you visited ----
  { name: "Brussels",       country: "Belgium",     cat: "travel", lat: 50.850, lng: 4.352 },
  { name: "Monaco",         country: "Monaco",      cat: "travel", lat: 43.738, lng: 7.425 },
  { name: "Lisbon",         country: "Portugal",    cat: "travel", lat: 38.722, lng: -9.139 },
  { name: "Bucharest",      country: "Romania",     cat: "travel", lat: 44.427, lng: 26.103 },
  { name: "Vatican City",   country: "Vatican City",cat: "travel", lat: 41.903, lng: 12.453 },

  // ---- Greece ----
  { name: "Athens",         country: "Greece",      cat: "travel", lat: 37.984, lng: 23.728 },
  { name: "Thessaloniki",   country: "Greece",      cat: "travel", lat: 40.640, lng: 22.944 },
  { name: "Alexandroupoli", country: "Greece",      cat: "travel", lat: 40.846, lng: 25.874 },
  { name: "Corfu",          country: "Greece",      cat: "travel", lat: 39.624, lng: 19.922 },
  { name: "Paxos",          country: "Greece",      cat: "travel", lat: 39.204, lng: 20.183 },
  { name: "Antipaxos",      country: "Greece",      cat: "travel", lat: 39.145, lng: 20.234 },
  { name: "Lefkada",        country: "Greece",      cat: "travel", lat: 38.831, lng: 20.708 },
  { name: "Hydra",          country: "Greece",      cat: "travel", lat: 37.349, lng: 23.467 },
  { name: "Patmos",         country: "Greece",      cat: "travel", lat: 37.309, lng: 26.548 },
  { name: "Lipsi",          country: "Greece",      cat: "travel", lat: 37.297, lng: 26.762 },
  { name: "Rhodes",         country: "Greece",      cat: "travel", lat: 36.435, lng: 28.218 },

  // ---- Türkiye ----
  { name: "Istanbul",       country: "Türkiye",     cat: "travel", lat: 41.008, lng: 28.978 },
  { name: "Ankara",         country: "Türkiye",     cat: "travel", lat: 39.933, lng: 32.860 },
  { name: "Bursa",          country: "Türkiye",     cat: "travel", lat: 40.188, lng: 29.061 },
  { name: "Kocaeli",        country: "Türkiye",     cat: "travel", lat: 40.765, lng: 29.941 },
  { name: "Bolu",           country: "Türkiye",     cat: "travel", lat: 40.740, lng: 31.611 },
  { name: "Bodrum",         country: "Türkiye",     cat: "travel", lat: 37.034, lng: 27.430 },
  { name: "Gaziantep",      country: "Türkiye",     cat: "travel", lat: 37.066, lng: 37.383 },
  { name: "Trabzon",        country: "Türkiye",     cat: "travel", lat: 41.002, lng: 39.718 },
  { name: "Rize",           country: "Türkiye",     cat: "travel", lat: 41.020, lng: 40.523 },
  { name: "Dorukkaya",      country: "Türkiye",     cat: "ski",    lat: 40.596, lng: 32.081, note: "Kartalkaya" },

  // ---- From travel log ----
  { name: "London",         country: "United Kingdom", cat: "travel", lat: 51.507, lng: -0.128 },
  { name: "Manchester",     country: "United Kingdom", cat: "travel", lat: 53.481, lng: -2.242 },
  { name: "Sofia",          country: "Bulgaria",    cat: "travel", lat: 42.698, lng: 23.322 },
  { name: "Milan",          country: "Italy",       cat: "travel", lat: 45.464, lng: 9.190 },
  { name: "Nice",           country: "France",      cat: "travel", lat: 43.710, lng: 7.262 },
  { name: "Bordeaux",       country: "France",      cat: "travel", lat: 44.838, lng: -0.579 },
  { name: "Biarritz",       country: "France",      cat: "travel", lat: 43.483, lng: -1.559 },
  { name: "Strasbourg",     country: "France",      cat: "travel", lat: 48.573, lng: 7.752 },
  { name: "Chamonix",       country: "France",      cat: "ski",    lat: 45.924, lng: 6.869, note: "Mont Blanc" },
  { name: "Leuven",         country: "Belgium",     cat: "travel", lat: 50.880, lng: 4.701 },
  { name: "Ibiza",          country: "Spain",       cat: "travel", lat: 38.907, lng: 1.421 },
  { name: "Naxos",          country: "Greece",      cat: "travel", lat: 37.104, lng: 25.377 },
  { name: "Liverpool",      country: "United Kingdom", cat: "travel", lat: 53.408, lng: -2.992 },
  { name: "Blackpool",      country: "United Kingdom", cat: "travel", lat: 53.818, lng: -3.036 },
  { name: "Isle of Skye",   country: "United Kingdom", cat: "travel", lat: 57.300, lng: -6.220, note: "Scotland" },
  { name: "Loch Ness",      country: "United Kingdom", cat: "travel", lat: 57.324, lng: -4.424, note: "Scotland" },

  // ---- More ski resorts ----
  { name: "Kayseri",        country: "Türkiye",     cat: "ski",    lat: 38.731, lng: 35.478, note: "Erciyes" },
  { name: "Erzurum",        country: "Türkiye",     cat: "ski",    lat: 39.904, lng: 41.268, note: "Palandöken" },
  { name: "Uludağ",         country: "Türkiye",     cat: "ski",    lat: 40.096, lng: 29.129, note: "Bursa" },

  // ---- More additions ----
  { name: "Washington, D.C.", country: "United States", cat: "travel", lat: 38.907, lng: -77.037 },
  { name: "Las Vegas",      country: "United States", cat: "travel", lat: 36.170, lng: -115.140 },
  { name: "Madrid",         country: "Spain",       cat: "travel", lat: 40.417, lng: -3.704 },
  { name: "Cannes",         country: "France",      cat: "travel", lat: 43.553, lng: 7.017 },
  { name: "Bruges",         country: "Belgium",     cat: "travel", lat: 51.209, lng: 3.225 },
  { name: "Venice",         country: "Italy",       cat: "travel", lat: 45.441, lng: 12.316 },
  { name: "Lausanne",       country: "Switzerland", cat: "travel", lat: 46.520, lng: 6.632 },
  { name: "Bern",           country: "Switzerland", cat: "travel", lat: 46.948, lng: 7.447 },
  { name: "Kitzbühel",      country: "Austria",     cat: "ski",    lat: 47.447, lng: 12.392 },
  { name: "Cortina d'Ampezzo", country: "Italy",    cat: "ski",    lat: 46.540, lng: 12.136, note: "Dolomites" },
  { name: "Brașov",         country: "Romania",     cat: "ski",    lat: 45.593, lng: 25.552, note: "Poiana Brașov" },
];
