import { chromium } from 'playwright';
import { mkdirSync, appendFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
export const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export async function session() {
  try {
    const browser = await chromium.connectOverCDP('http://127.0.0.1:9223');
    const context = browser.contexts()[0];
    context.setDefaultTimeout(10000);
    return context;
  } catch {
    return chromium.launchPersistentContext(resolve(root, '.pa-profile'), {
      channel: 'msedge', headless: false, viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1,
    });
  }
}
export async function open(context, url) {
  const existing = context.pages().find(p => p.url() === url);
  if (existing) return existing;
  const page = await context.newPage();
  await page.goto(url);
  return page;
}
export async function capture(page, chapter, filename) {
  mkdirSync(resolve(root, chapter, 'images'), { recursive: true });
  await page.keyboard.press('Escape');
  await page.mouse.move(100, 80);
  const masks = page.frames().map(frame => frame.locator('#mectrl_main_trigger, [data-tid="me-control-mini-avatar"], button[aria-label^="Account manager"]'));
  await page.screenshot({ path: resolve(root, chapter, 'images', filename), mask: masks, maskColor: '#ffffff' });
  console.log(`Saved ${chapter}/images/${filename}`);
}
export function note(text) {
  appendFileSync(resolve(root, '_design/shots/NOTES.md'), `\n- ${text}\n`);
}
