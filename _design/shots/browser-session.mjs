import { chromium } from 'playwright';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const context = await chromium.launchPersistentContext(resolve(root, '.pa-profile'), {
  ...(process.platform === 'win32'
    ? { executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' }
    : { channel: 'msedge' }),
  headless: true, viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 1, args: ['--remote-debugging-port=9223'],
});
// The attached Playwright client handles leave/discard dialogs.
for (const page of context.pages()) page.on('dialog', () => {});
context.on('page', page => page.on('dialog', () => {}));
console.log('Training browser ready on localhost:9223');
await new Promise(() => {});
