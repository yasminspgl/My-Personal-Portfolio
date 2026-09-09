# Yasmin Sapoglu — Portfolio

A static, design-forward personal portfolio. No build step, no dependencies to install.
Open `index.html` in a browser and it works.

## Structure
```
portfolio/
├─ index.html         ← all the content / sections live here
├─ css/style.css      ← the design (colors, fonts, layout)
├─ js/
│  ├─ places.js       ← the list of places on the map — edit freely
│  ├─ map.js          ← map logic (rarely need to touch)
│  └─ main.js         ← gallery, filters, theme toggle
├─ assets/
│  ├─ gallery/        ← drop your photography here
│  └─ hobbies/        ← photos for hobby cards (optional)
└─ cv/                ← put your CV here as YasminSapoglu-CV.pdf
```

## How to customize (the 5 things you'll actually do)

1. **Your CV** — currently `cv/YasminSapoglu-CV.docx` (the Download CV buttons point to it).
   For a PDF, open the .docx in Word/Pages → Export as PDF, save it as `cv/YasminSapoglu-CV.pdf`,
   and change the two `href="cv/YasminSapoglu-CV.docx"` links in `index.html` to `.pdf`.

2. **Gallery photos** — drop image files into `assets/gallery/`, then open `js/main.js`
   and list them in `GALLERY_IMAGES`, e.g.:
   ```js
   const GALLERY_IMAGES = [
     "assets/gallery/venice.jpg",
     "assets/gallery/bali-sunset.jpg",
   ];
   ```
   Leave it empty and it shows styled placeholders.

3. **Projects** — edit the `<article class="card">` blocks in `index.html` (Projects section).
   Set `data-status="ongoing"` or `data-status="completed"` so the filter works.

4. **Experience / CV timeline** — edit the `.tl__item` blocks in `index.html`.

5. **Map places** — add or edit entries in `js/places.js`. Each is:
   ```js
   { name: "City", country: "Country", cat: "travel", lat: 0.0, lng: 0.0, note: "optional" }
   ```
   Use `cat: "ski"` for ski spots. Find coordinates by right-clicking a spot in Google Maps.

6. **Social links** — update the LinkedIn / Instagram `href="#"` links in the Contact section.

## The Zermatt page
A standalone minimalist trip page lives at `zermatt.html` (linked from the Gallery and Slopes
sections). Its photos/videos are in `assets/zermatt/` and are listed in order in
`js/zermatt.js` (`ZERMATT_MEDIA`). Food emoji "stickers" are auto-placed on the seams between
photos — edit the `FOOD` array in the same file to change them.

> Media note: your originals were HEIC photos and HEVC/H.264 videos (which don't play in all
> browsers). I converted the photos to JPG (max 2000px) and transcoded the videos to 720p
> H.264 MP4 so they work everywhere. To add more: drop files in `assets/zermatt/`, convert with
> `sips -s format jpeg -Z 2000 in.heic --out out.jpg` (photos) and
> `avconvert -p Preset1280x720 -s in.mov -o out.mp4` (videos), then add them to `ZERMATT_MEDIA`.

## Trip galleries
Zermatt has its own bespoke page (`zermatt.html`, with food stickers). The other trips share one
reusable page, `trip.html?t=<slug>`, driven by `js/trips.js`. To add a new trip:
1. Drop resized photos in `assets/trips/<slug>/` named `<slug>-01.jpg`, `<slug>-02.jpg`, …
   (resize with `sips -s format jpeg -Z 2000 in.jpg --out out.jpg`).
2. Add an entry to `TRIPS` in `js/trips.js` (title, flag, location, date, blurb, photos count).
   Optional: `stats: [[22,"runs"],…]` and `stickers: ["🍫","🧀"]` to sprinkle emoji on the seams.
3. Add a chip link in the Gallery section of `index.html`: `<a href="trip.html?t=<slug>">🇽🇽 Name</a>`.

## University project (MyShop)
The clean source for the Xamarin.Forms app is bundled at
`projects/MyShop-Xamarin-Solution.zip` and linked from the Projects section (build artifacts
stripped, ~312 KB).

## Colors & fonts
All in `css/style.css` at the top under `:root`. Change `--accent` to reskin the whole site.

## Publish it for free

### Option A — Netlify Drop (easiest, 30 seconds)
1. Go to https://app.netlify.com/drop
2. Drag the whole `portfolio` folder onto the page.
3. You get a live URL instantly. (You can rename it / add a custom domain later.)

### Option B — GitHub Pages
```bash
cd ~/Desktop/portfolio
git init && git add . && git commit -m "Portfolio"
# create a repo named  yourusername.github.io  on GitHub, then:
git remote add origin https://github.com/YOURUSERNAME/YOURUSERNAME.github.io.git
git push -u origin main
```
Live at `https://YOURUSERNAME.github.io` within a minute.

> Note: the map needs an internet connection to load map tiles + the Leaflet library.
> Everything else works fully offline.
