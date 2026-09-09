/* ============================================================
   Trip galleries. Each key is the ?t= slug in trip.html.
   To add photos: drop them in assets/trips/<slug>/ and list here.
   Optional: stats [ [num,label], ... ], stickers ["🍫", ...]
   ============================================================ */
const TRIPS = {
  verbier: {
    title: "Verbier",
    flag: "🇨🇭",
    location: "Switzerland · Les 4 Vallées",
    date: "2014",
    blurb: "High above the Rhône valley in one of the Alps' great ski areas — long descents, big views, and bluebird days across the 4 Vallées.",
    photos: 9,
  },
  bansko: {
    title: "Bansko",
    flag: "🇧🇬",
    location: "Bulgaria · Pirin Mountains",
    date: "2014",
    blurb: "Skiing in the Pirin range above the old town of Bansko — pine forests, quiet pistes, and mountain air.",
    photos: 9,
  },
  valgardena: {
    title: "Val Gardena",
    flag: "🇮🇹",
    location: "Italy · Dolomites",
    date: "January 2020",
    blurb: "The Sella Ronda and the pink Dolomite peaks of Val Gardena — arguably the most beautiful place I've ever put skis on.",
    photos: 6,
  },
};
