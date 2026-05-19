# The Maintenance Company

A modern, responsive redesign of [tmc-tn.com](https://tmc-tn.com/) — a Nashville-based home maintenance, renovation and construction company.

**Live site:** https://ziarnooo.github.io/TMC/

## Stack

Plain HTML, CSS and vanilla JavaScript. No build step, no dependencies. Served as a static site via GitHub Pages.

## Structure

```
index.html          Home — hero, services overview, editorial gallery, CTA
services.html       Maintenance & remodeling details, project grid
about.html          Company intro, stats, team
contact.html        Form, contact info, map
css/styles.css      Design tokens, components, responsive grid
js/main.js          Mobile nav, lightbox, reveal-on-scroll, contact form
images/             Optimized photos in WebP + JPG (480/800/1400 widths)
images/raw/         Originals as backup
```

## Local preview

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```
