# Muitra website

Static marketing site for [muitra.com](https://muitra.com), deployed from this repository to GitHub Pages. No server or build step runs on the host.

## Edit and regenerate

- Edit the English HTML structure in `templates/*.template` and existing page translations in `content/*.json`.
- Edit the three audience page translations and SEO metadata in `scripts/build-site.mjs`.
- Edit shared behavior in `scripts/runtime-source.js` and styling in `styles.css`.
- Run `node scripts/build-site.mjs` from this directory. Commit the generated HTML, `site.js`, `robots.txt` and `sitemap.xml` together with their sources.
- Run `node scripts/check-site.mjs` to validate the generated pages and local links.

The English homepage, tutorial and mission retain their existing public URLs. French and Spanish pages live under `/fr/` and `/es/`. The language links point to equivalent pages. The invite fallback and `404.html` remain outside the sitemap and are marked `noindex`.

## Preview

Run `node scripts/serve.mjs`, then open `http://127.0.0.1:8080/` and check English, French and Spanish navigation. Opening generated HTML directly with `file://` will not resolve root-relative assets.

## Deploy

Push the reviewed generated files to the GitHub Pages source branch. Keep `CNAME` with `muitra.com`; check the live canonical URLs, sitemap and invite flow after deployment. If Google Search Console is verified for the domain, submit `https://muitra.com/sitemap.xml` and monitor indexing and search queries there.
