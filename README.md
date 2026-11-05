# Aisance Money Breed Quiz

A mobile-friendly financial behaviour quiz with six dog characters and downloadable result artwork. Built with plain HTML, CSS and JavaScript. No build step, account, backend or bank connection is required. Answers stay in memory in the visitor's browser.

## Run locally

From this directory:

```sh
python3 -m http.server 8080 --directory dist
```

Open http://localhost:8080. Serve through HTTPS in production for native sharing and clipboard support.

## Files

- `dist/index.html`: page structure and CTA integration note.
- `dist/styles.css`: Aisance colours, TASA Orbiter typography and responsive styles.
- `dist/app.js`: eight questions, scoring, six breed outcomes, result rendering and sharing.
- `dist/assets/`: character illustrations, result artwork and font.

## Editing

Questions and answer scores are in `questions`; breed thresholds and copy are in `breeds`. Total scores range from 0 to 24. Thresholds are 22 Border Collie, 18 Doberman, 14 German Shepherd, 10 Labrador, 6 Poodle, and 0 Husky.

`resultPanels` defines the six artwork regions in `dog-result-designs.png`, in the same order as `breeds`. `drawPoster()` adds the result name and generates the shareable PNG. The sharing panel provides native sharing where supported, a copyable quiz link, and an image download.

## App Store integration pending

The “Meet your money assistant” button currently opens https://aisance.io/. An HTML TODO records the intended breed-specific App Store custom product pages. Approved App Store URLs and matching store assets are required before enabling those redirects. No store redirect has been activated.

## Deployment

Deploy the contents of `dist/` to any static HTTPS host. The current hosted quiz is https://aisance-money-breed.endshpill.chatgpt.site. This handoff repository does not automatically publish to that site.

## Assets

Artwork is included for the Aisance project. Confirm applicable font and artwork usage rights before redistribution. Inter is loaded from Google Fonts; TASA Orbiter is bundled locally.
