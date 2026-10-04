// Read-only replay after the round-two flow changes have been saved.
import { session, capture } from './capture-helpers.mjs';
const context = await session();
const base = 'https://make.powerautomate.com/environments/b3c2cece-31a3-e316-bdc9-540bfc327e87/flows/';
const briefing = await context.newPage();
await briefing.goto(base + 'ea03b97d-17b9-a720-8d1b-351b2076a069?v3=true', { waitUntil: 'domcontentloaded' });
await briefing.getByRole('button', { name: 'Expand all action groups', exact: true }).click();
async function closePanel(page) {
  const close = page.locator('#msla-panel-header-collapse-nav');
  if (await close.isVisible()) await close.click();
}
async function frame(page, name, zoomClicks, x, y) {
  await closePanel(page);
  await page.getByRole('button', { name: 'Zoom view to fit', exact: true }).click();
  for (let i = 0; i < zoomClicks; i++) await page.getByRole('button', { name: 'Zoom in', exact: true }).click();
  await page.waitForTimeout(500);
  // If the target is virtualized, pan vertically until it enters the viewport.
  const card = page.getByRole('button', { name, exact: true });
  for (let i = 0; i < 6 && !(await card.count()); i++) {
    await page.mouse.move(1450, 350);
    await page.mouse.down();
    await page.mouse.move(1450, name.startsWith('Initialize') ? 650 : 150, { steps: 10 });
    await page.mouse.up();
  }
  const box = await card.boundingBox();
  if (!box) throw new Error('Cannot frame ' + name);
  let dx = x - box.x - box.width / 2;
  let dy = y - box.y - box.height / 2;
  while (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
    const sx = Math.max(-300, Math.min(100, dx));
    const sy = Math.max(-300, Math.min(300, dy));
    await page.mouse.move(1450, 450);
    await page.mouse.down();
    await page.mouse.move(1450 + sx, 450 + sy, { steps: 12 });
    await page.mouse.up();
    dx -= sx; dy -= sy;
  }
}
await frame(briefing, 'Initialize variable operation, Variable connector', 5, 1100, 275);
await briefing.getByRole('button', { name: 'Initialize variable operation, Variable connector', exact: true }).click();
await briefing.getByRole('tab', { name: 'Parameters', exact: true }).click();
await capture(briefing, '08-morning-briefing', '08-02-variables.png');
await frame(briefing, 'Current time operation, Date Time connector', 5, 800, 160);
await capture(briefing, '08-morning-briefing', '08-05-meetings-branch.png');
await frame(briefing, 'Current time operation, Date Time connector', 4, 800, 210);
await capture(briefing, '08-morning-briefing', '08-06-three-branches.png');
await frame(briefing, 'Busy day operation', 4, 1100, 650);
await briefing.getByRole('button', { name: 'Busy day operation', exact: true }).click();
await briefing.getByRole('tab', { name: 'Settings', exact: true }).click();
const panel = briefing.getByRole('dialog', { name: 'Operation details panel' });
for (const name of ['Apply to each', 'Get current weather', 'Apply to each 1']) await panel.getByText(name, { exact: true }).click();
// The current designer misroutes the displayed lines; Settings shows the saved join.
await capture(briefing, '08-morning-briefing', '08-07-join.png');
const note = await context.newPage();
await note.goto(base + 'd86f0c72-efa6-bb42-e07c-8b8abbd3c347?v3=true', { waitUntil: 'domcontentloaded' });
await note.getByRole('button', { name: 'Manually trigger a flow operation, Manually trigger a flow connector', exact: true }).click();
await note.getByRole('tab', { name: 'Parameters', exact: true }).click();
await note.mouse.move(1400, 400);
await note.mouse.down();
await note.mouse.move(1580, 570, { steps: 10 });
await note.mouse.up();
await capture(note, '11-extra-practice', '11-02-input.png');
process.exit(0); // Keep the externally managed training browser open.
