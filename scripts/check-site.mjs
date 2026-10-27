import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const origin = 'https://muitra.com';
const languages = ['en', 'fr', 'es'];
const pages = ['home', 'tutorial', 'mission', 'solo', 'couples', 'roommates'];
const english = { home: '/', tutorial: '/tutorial', mission: '/mission', solo: '/solo/', couples: '/couples/', roommates: '/roommates/' };
const sitePath = (page, lang) => lang === 'en' ? english[page] : `/${lang}/${page === 'home' ? '' : `${page}/`}`;
const outputPath = (urlPath) => {
  if (urlPath === '/') return 'index.html';
  if (urlPath === '/tutorial' || urlPath === '/mission') return `${urlPath.slice(1)}.html`;
  return path.join(urlPath.slice(1), 'index.html');
};

for (const page of pages) {
  for (const lang of languages) {
    const urlPath = sitePath(page, lang);
    const html = fs.readFileSync(outputPath(urlPath), 'utf8');
    const label = `${lang}:${page}`;
    assert.match(html, new RegExp(`<html lang="${lang}">`), label);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${label} needs one H1`);
    assert.equal((html.match(/<title>/g) || []).length, 1, `${label} needs one title`);
    assert.match(html, /<meta name="description" content="[^"]+"/, `${label} needs description`);
    assert.match(html, new RegExp(`<link rel="canonical" href="${origin}${urlPath}"`), `${label} canonical`);
    const scriptVersion = page === 'tutorial' ? '20261025journey' : '20261011lang';
    assert.match(html, new RegExp(`<script src="/site\\.js\\?v=${scriptVersion}"><\\/script>[\\s\\S]*?<\\/head>`), `${label} needs language selection before the page renders`);
    assert.doesNotMatch(html, /data-i18n|src=""|href=""/, `${label} has unrendered content`);
    if (page === 'tutorial') {
      assert.match(html, /<section class="badge-guide" id="achievements"/, `${label} is missing the badge guide`);
      assert.equal((html.match(/class="badge-timeline"/g) || []).length, 2, `${label} needs solo and household timelines`);
      assert.equal((html.match(/class="badge-medallion"/g) || []).length, 12, `${label} needs six stops per timeline`);
      const badgeArt = [...html.matchAll(/src="(\/assets\/progress\/badges\/[^\"]+\.png)"/g)].map((match) => match[1]);
      assert.equal(badgeArt.length, 21, `${label} needs every current app achievement illustration`);
      assert.equal(new Set(badgeArt).size, 21, `${label} repeats an achievement illustration`);
      assert.doesNotMatch(html, /class="badge-medallion"[^>]*>[✦✧]/, `${label} still uses placeholder stars`);
      assert.equal((html.match(/<details class="badge-rules">/g) || []).length, 2, `${label} needs mode-specific exact rules`);
      assert.match(html, /70\s?%/, `${label} is missing the balanced-week limit`);
    }
    if (page === 'mission') {
      const choices = html.match(/<section class="audience-section audience-section-top"[\s\S]*?<\/section>/)?.[0];
      assert.ok(choices, `${label} is missing its top household choices`);
      assert.ok(html.indexOf(choices) < html.indexOf('<section class="values grid-2"'), `${label} household choices must precede the mission values`);
      assert.equal((choices.match(/class="audience-card"/g) || []).length, 3, `${label} needs three household choices`);
      assert.equal((choices.match(/class="audience-card-icon"/g) || []).length, 3, `${label} needs an icon for each household choice`);
    }
    if (['solo', 'couples', 'roommates'].includes(page)) {
      const featureSection = html.match(/<section class="values grid-2 audience-values"[\s\S]*?<\/section>/)?.[0];
      assert.ok(featureSection, `${label} is missing its feature section`);
      assert.equal((featureSection.match(/<article class="value">/g) || []).length, 4, `${label} needs four feature cards`);
      assert.match(html, /<a class="btn btn-dark btn-lg" href="https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.imch\.muitra">/, `${label} needs a direct Google Play link`);
    }
    for (const other of languages) {
      const alternate = `${origin}${sitePath(page, other)}`;
      assert.ok(html.includes(`<link rel="alternate" hreflang="${other}" href="${alternate}"`), `${label} missing ${other} alternate`);
      assert.ok(html.includes(`href="${sitePath(page, other)}" hreflang="${other}"`), `${label} missing ${other} switch link`);
    }
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const target = match[1];
      if (!target.startsWith('/') || target.startsWith('//')) continue;
      const pathname = target.split(/[?#]/)[0];
      if (!pathname) continue;
      const file = pathname.endsWith('.png') || pathname.endsWith('.css') || pathname.endsWith('.js') || pathname.endsWith('.webmanifest') ? pathname.slice(1) : outputPath(pathname);
      assert.ok(fs.existsSync(file), `${label} broken local link: ${target}`);
    }
    for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
  }
}

const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
for (const lang of languages) {
  const home = fs.readFileSync(outputPath(sitePath('home', lang)), 'utf8');
  const valueSection = home.match(/<section class="values values-editorial"[\s\S]*?<\/section>/)?.[0];
  assert.ok(valueSection, `${lang} homepage is missing its feature section`);
  assert.equal((valueSection.match(/<article class="value /g) || []).length, 4, `${lang} homepage needs four feature cards`);
  assert.match(home, /<img id="heroShot"[^>]*width="\d+" height="\d+"/, `${lang} hero image needs its intrinsic dimensions`);
}
assert.match(fs.readFileSync('styles.css', 'utf8'), /\.hero-phone-card img\s*\{[^}]*width:\s*100%;[^}]*height:\s*auto;/, 'Hero image must keep its aspect ratio');
assert.equal((sitemap.match(/<url>/g) || []).length, pages.length * languages.length);
assert.doesNotMatch(sitemap, /invite|404|\.html/);
assert.match(fs.readFileSync('robots.txt', 'utf8'), /Sitemap: https:\/\/muitra\.com\/sitemap\.xml/);
assert.match(fs.readFileSync('invite/index.html', 'utf8'), /name="robots" content="noindex/);
assert.match(fs.readFileSync('404.html', 'utf8'), /name="robots" content="noindex/);
console.log(`Checked ${pages.length * languages.length} indexable pages, sitemap, robots and excluded pages.`);
