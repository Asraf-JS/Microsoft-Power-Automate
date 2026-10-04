import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const output = resolve(root, '01-understand-power-automate/images');
mkdirSync(output, { recursive: true });
const context = await chromium.launchPersistentContext(resolve(root, '.pa-profile'), {
  channel: 'msedge', headless: false, viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1,
});
const page = context.pages()[0] || await context.newPage();
await page.goto('https://make.powerautomate.com');
console.log('Sign in manually with the training account. Waiting up to five minutes.');
try {
  await page.getByText('Create', { exact: true }).first().waitFor({ timeout: 300000 });
  await page.getByText('Home', { exact: true }).first().click();
  const avatar = page.locator('#mectrl_main_trigger').or(page.getByRole('button', { name: /account manager|account menu|your account/i })).first();
  await avatar.waitFor({ timeout: 15000 });
  const capture = async name => {
    await page.getByRole('progressbar').waitFor({ state: 'hidden', timeout: 30000 });
    await page.screenshot({ path: resolve(output, name), mask: [avatar], maskColor: '#ffffff' });
    console.log(`Saved ${name}`);
  };
  await capture('01-01-home.png');
  await capture('01-02-environment.png');
  await page.getByText('Create', { exact: true }).first().click();
  await page.getByText('Automated cloud flow', { exact: true }).first().waitFor();
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(2500);
  await capture('01-03-create-tiles.png');
  await page.getByText('My flows', { exact: true }).first().click();
  await page.getByRole('tab', { name: 'Cloud flows', exact: true }).waitFor();
  await page.waitForTimeout(2500);
  await capture('01-04-my-flows.png');
  await page.getByText('Home', { exact: true }).first().click();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await context.close();
}
