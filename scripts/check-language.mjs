import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync('site.js', 'utf8');

function loadPage({ path = '/', language = 'en', browser = 'en-US', saved, search = '', hash = '', links = [] }) {
  const values = new Map(saved ? [['muitra_lang', saved]] : []);
  let redirect;
  let onReady;
  const document = {
    documentElement: { lang: language },
    body: { classList: { add() {} } },
    addEventListener(event, callback) { if (event === 'DOMContentLoaded') onReady = callback; },
    getElementById() { return null; },
    querySelectorAll(selector) { return selector === '.lang-switch a[hreflang]' ? links : []; },
    querySelector() { return null; },
  };
  const window = { location: { pathname: path, search, hash, replace(url) { redirect = url; } } };
  vm.runInNewContext(source, {
    document, window,
    navigator: { language: browser },
    localStorage: { getItem(key) { return values.get(key) ?? null; }, setItem(key, value) { values.set(key, value); } },
  });
  return { redirect, values, onReady };
}

assert.equal(loadPage({ browser: 'fr-FR' }).redirect, '/fr/');
assert.equal(loadPage({ path: '/solo/', browser: 'es-ES', search: '?from=ad', hash: '#get' }).redirect, '/es/solo/?from=ad#get');
assert.equal(loadPage({ path: '/mission', browser: 'fr-FR', saved: 'es' }).redirect, '/es/mission/');
assert.equal(loadPage({ path: '/tutorial', browser: 'fr-FR' }).redirect, '/fr/tutorial/');
assert.equal(loadPage({ browser: 'fr-FR', saved: 'en' }).redirect, undefined);
assert.equal(loadPage({ browser: 'de-DE' }).redirect, undefined);
assert.equal(loadPage({ path: '/fr/solo/', language: 'fr', browser: 'es-ES' }).values.get('muitra_lang'), 'fr');

let click;
const link = { hreflang: 'en', addEventListener(event, callback) { if (event === 'click') click = callback; } };
const manual = loadPage({ path: '/fr/', language: 'fr', browser: 'fr-FR', links: [link] });
manual.onReady();
click();
assert.equal(manual.values.get('muitra_lang'), 'en');
assert.equal(loadPage({ browser: 'fr-FR', saved: manual.values.get('muitra_lang') }).redirect, undefined);

console.log('Checked browser detection, saved choice, localized routes and manual switching.');
