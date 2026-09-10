# Yasmin Sapoglu — Portfolio

A static, design-forward personal portfolio. No build step and no dependencies to install —
open `index.html` in a browser and it works. It's a single page covering About, CV, Projects,
Travels, Skills, Volunteering, Writing, the Slopes stats, a photo Gallery, and Hobbies. Some aspects of
my life on one scrollable page you can explore.

## Structure
```
portfolio/
├─ index.html          ← the whole single-page site (all sections)
├─ css/
│  ├─ style.css        ← core design: colors, fonts, layout, cards
│  ├─ feed.css         ← kinetic hero/story/feed + the Gallery masonry
│  └─ globe.css        ← the interactive Travels globe
├─ js/
│  ├─ main.js          ← theme toggle, filters, lightbox, scroll/anchor logic
│  ├─ feed.js          ← scroll-reveal for the story/feed
│  ├─ hobbies.js       ← builds the hobby galleries + "Load more"
│  ├─ globe.js         ← the D3 orthographic Travels globe (city lights + flight arcs)
│  └─ places.js        ← every place plotted on the globe — edit freely
├─ assets/             ← all images/videos used by the site
├─ projects/           ← project decks (PDFs) + the MyShop source zip
├─ writing/            ← dissertation, presentation and report PDFs
└─ cv/                 ← CV: PDF is what the site links; .docx kept as the editable source
```

## The 5 things you'll actually edit

1. **Projects** — the `<article class="card">` blocks in `index.html` (Projects section).
   Set `data-status="ongoing"` or `data-status="completed"` so the filter works.
2. **Experience / CV timeline** — the `.tl__item` blocks in `index.html`.
3. **Travels globe** — add or edit entries in `js/places.js`:
   ```js
   { name: "City", country: "Country", cat: "travel", lat: 0.0, lng: 0.0 }
   ```
   Use `cat: "ski"` for ski spots. Marker clusters scale with city population (see the `POP`
   table in `js/globe.js`). Grab coordinates by right-clicking a spot in Google Maps.
4. **Hobbies** — the `<details class="hobbyacc">` blocks in `index.html`; photos live in
   `assets/hobbies/<hobby>/` and are wired up in `js/hobbies.js`.
5. **Contact / social** — update the LinkedIn link in the Contact section of `index.html`.

## Gallery photos
The Gallery is a masonry of trip photos in the `.scrollgal__stream` block of `index.html`, drawn
from `assets/`. To add one, drop a resized image in `assets/` and add a `<figure class="scrollgal__shot">`.

> Media note: originals were HEIC photos / HEVC videos. Photos were converted to JPG and videos
> transcoded to 720p H.264 MP4 so they play everywhere:
> `sips -s format jpeg -Z 2000 in.heic --out out.jpg` and
> `avconvert -p Preset1280x720 -s in.mov -o out.mp4`.

## University project (MyShop)
The Xamarin.Forms source is bundled at `projects/MyShop-Xamarin-Solution.zip` and linked from the
Projects section (build artifacts stripped). A demo of the app is available on the website.

## Colors & fonts
All in `css/style.css` under `:root`. Change `--accent` to reskin the whole site.


> The Travels globe loads D3 and a world map from a CDN, so it needs an internet connection.
> Everything else works fully offline.
