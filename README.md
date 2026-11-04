# Engineering College

A brochure-style, multi-page static website for a fictional engineering college. The site introduces practical study programs, explains the admissions journey, shares campus updates, and provides prospective students with contact and registration forms.

The visual identity uses a dark-academia palette of midnight blue, charcoal, warm ivory, antique gold, and restrained burgundy, with fine framed borders.

## Page map

- [Home](./index.html) — college introduction, learning approach, and calls to action.
- [Programs](./programs.html) — four program summaries with a client-side category filter.
- [Admissions](./admissions.html) — application steps and an estimated tuition/fees table.
- [Student life](./student-life.html) — campus and club updates with a topic filter.
- [Contact](./contact.html) — contact channels and a validated contact form.
- [Registration](./registration.html) — prospective student registration with inline validation.

## Features

- Fixed, responsive Bootstrap 5 navigation with page-specific active states and a mobile collapse.
- Mobile-first layouts, semantic page structure, skip links, descriptive image alternative text, visible keyboard focus, and reduced-motion support.
- Registration form with required-field checks, email/phone format validation, password confirmation, intake date, study-mode selection, terms agreement, and inline feedback.
- Contact form with required-field validation, a honeypot anti-spam field, and clear demo feedback.
- Two JavaScript enhancements: filter programs by subject area and filter student-life updates by topic. The filters only hide content after JavaScript loads; all entries remain visible without JavaScript.
- Original local campus illustration in `assets/campus.svg`.

## Run locally

Open `index.html` in a browser or serve this folder with any static file server. Bootstrap CSS/JavaScript and the optional Google Fonts are loaded from their public CDNs.

## Deployment

This repository is configured for GitHub Pages from the `main` branch, root folder.

- Repository: https://github.com/Akito140/midterm-engineering-college-akito140
- Live site: https://akito140.github.io/midterm-engineering-college-akito140/

## Known limitations

- This is a static front-end demonstration. Contact and registration forms validate in the browser but do not transmit or persist submitted information.
- Program tuition amounts, contact details, campus address, and dates are sample content for this fictional institution and should not be treated as official information.
- Bootstrap and Google Fonts require an internet connection; the site includes system-font fallbacks.
- The requested annotated quality-evidence PDF is not included in this initial version.

## Attribution

The campus illustration is original SVG artwork created for this project. No third-party photos or code snippets are used. Bootstrap 5.3.3 and Google Fonts (DM Sans and Manrope) are externally hosted dependencies; their respective project and font licenses apply.
