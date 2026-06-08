# Muitra — landing site

Static one-page marketing site for muitra.com. No build step: plain HTML/CSS/JS.

## Structure
- `index.html` — markup
- `styles.css` — styles (brand: purple #7C6FF7 / orange, DM Sans + Instrument Serif)
- `app.js` — EN/FR/ES translations, language auto-detect + switcher, screenshot carousel
- `assets/icon.png`, `assets/favicon.png` — logo
- `assets/screens/{en,fr,es}/1..6.png` — localized store slides (the showcase)
- `CNAME` — custom domain for GitHub Pages (remove if hosting on Cloudflare Pages)

## Preview locally
Just open `index.html` in a browser, or serve it:
```
python -m http.server 8080   # then visit http://localhost:8080
```

## Deploy — Cloudflare Pages (recommended)
1. Push this folder to a GitHub repo (e.g. `imch1/muitra-site`).
2. Cloudflare dashboard → Pages → Connect to Git → pick the repo.
3. Build command: *(none)* · Output directory: `/` (root).
4. After first deploy, add custom domain `muitra.com` (Pages → Custom domains).
5. Point the domain's nameservers at Cloudflare (one-time, at your registrar).
   - With Cloudflare you can delete the `CNAME` file (that file is a GitHub Pages thing).

## Deploy — GitHub Pages (alternative)
1. Push to a repo, e.g. `imch1/muitra-site`, branch `main`.
2. Repo → Settings → Pages → Source: `main` / root.
3. Keep the `CNAME` file (it sets the custom domain).
4. At your registrar, add DNS records for `muitra.com` per GitHub's docs
   (4 A records to GitHub's IPs + a `www` CNAME).

## TODO before launch
- Confirm the privacy-policy URL in `index.html` footer
  (currently `https://imch1.github.io/muitra-legal/`).
- Swap the "Coming soon" CTA for a real Google Play badge once the app is public.
- Optional: buy `muitra.app` and 301-redirect it to `muitra.com`.
