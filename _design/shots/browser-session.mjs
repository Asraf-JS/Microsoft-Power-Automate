import { chromium } from 'playwright';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
await chromium.launchPersistentContext(resolve(root, '.pa-profile'), {
  channel: 'msedge', headless: false, viewport: { width: 1600, height: 900 },
  deviceScaleFactor: 1, args: ['--remote-debugging-port=9223'],
});
console.log('Training browser ready on localhost:9223');
await new Promise(() => {});
