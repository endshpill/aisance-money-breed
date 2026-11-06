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

Questions are in `dist/styles-quiz.js`. Each question offers six equally weighted preferences, one for each breed. Most frequent preference wins; the most recent preference resolves ties. Display order rotates per question. This is an entertainment quiz, not a validated personality assessment or a financial-health score. Every breed can be reached regardless of income, savings or debt.

`resultPanels` defines the six artwork regions in `dog-result-designs.png`, in the same order as `breeds`. `drawPoster()` adds the result name and generates the shareable PNG. The sharing panel provides native sharing where supported, a copyable quiz link, and an image download.

## App Store integration pending

The result now leads to an illustrative conversation for that breed, followed by “Explore Aisance”, which still opens https://aisance.io/. The example is labelled as illustrative; no breed, answers or personalised plan is promised inside the app. Approved App Store and existing web-paywall URLs are still required. Do not treat the current CTA as either completed conversion variant.

## Sharing and measurement

Shared links include `?ref=<breed>` and the exported poster includes the same readable URL. Native image shares also include the URL in the message text. Shared links strip the original visitor's campaign tags. The final CTA preserves allowlisted UTM tags and the incoming referral tag.

The browser emits `aisance:analytics` CustomEvents for quiz_view, quiz_start, quiz_answer (question number only), quiz_result, aha_view, share_open and outbound_click. These are integration hooks, not collected analytics. Connect an approved consent-aware adapter to a real analytics destination before campaign testing. No pixel ID, consent platform, purchase tracking, analytics endpoint or email collection is configured. Do not send answer choices or financial details to advertising platforms.

## Launch decisions still needed

- Competitor source and proof of paid-ad history: not supplied; treat this as an untested original concept.
- Confirm primary objective, target country, traffic sources, creative owner and quantities. The revised questions use no currency amounts.
- Supply approved breed-specific App Store URLs and existing web-paywall URLs, including activation-code and purchase attribution integration. Use the same campaign conditions for a revenue-per-visitor comparison once both paths are operational.
- Suggested store direction: clearly labelled quiz-character introduction followed by actual app screens; never imply the app contains dogs or receives the breed. Apple submission/review is a separate task.
- Supply aisance.website hosting access, analytics configuration and approved consent handling before migration. The ChatGPT-hosted version is a preview, not the campaign destination. This repository update does not update that preview.
- Decide whether email collection is wanted. No email gate has been added.
- Existing artwork is AI-generated concept material. Bitcoin symbols have been removed from the group portrait, Doberman card and result artwork. Paid-use rights and applicable font licences have not been verified. These assets are not cleared campaign deliverables.

## Deployment

Deploy the contents of `dist/` to any static HTTPS host. The current hosted quiz is https://aisance-money-breed.endshpill.chatgpt.site. This handoff repository does not automatically publish to that site.

## Assets

Artwork is included for the Aisance project. Confirm applicable font and artwork usage rights before redistribution. Inter is loaded from Google Fonts; TASA Orbiter is bundled locally.
