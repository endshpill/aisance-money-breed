# What’s Your Money Breed? | Aisance

This static quiz contains eight questions, 32 answer choices and six possible breed results. This package contains the English version. Quiz amounts are in US dollars.

## Run locally

Extract the ZIP and open a terminal in the folder containing this README and `dist/`. With Python 3 installed, run:

```sh
python3 -m http.server 8080 --directory dist
```

Open <http://localhost:8080/>. Python is only needed for this local preview. The quiz runs in the browser and requires no build step, package installation, backend or environment variables.

## Publish online

1. If uploading to GitHub, place `README.md`, `dist/` and `docs/` at the repository root. Keep all files and subfolders inside `dist/`.
2. Configure your static host to publish `dist/` as the site root with HTTPS enabled. For a manual upload, upload the contents of `dist/` to the site's web root. The public quiz URL should open `index.html` directly.
3. Open the public URL on desktop and mobile. Complete all eight questions, check that the result image renders, then test **Share my breed**, **Copy link**, and saving the dog image. Test native sharing on a browser that supports it and verify the Facebook, LinkedIn, X and WhatsApp links on the published site. For Instagram, users can save the image and upload it in the app. The copied link opens the quiz, and the saved image shows the result breed.
4. Check that **Meet your money assistant** opens <https://aisance.io/>. Breed-specific App Store URLs and store screenshots are pending.

## Source files

- `dist/index.html` is the entry point and includes the final call to action.
- `dist/app.js` contains the quiz logic, scoring, result images and sharing behaviour.
- `dist/styles.css` and `dist/assets/` contain the styling, wide cover illustration, six breed images and local font.
- `docs/QUIZ.md` documents the quiz copy and scoring.
