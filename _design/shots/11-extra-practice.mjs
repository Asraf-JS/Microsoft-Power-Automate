import { session, open, capture } from './capture-helpers.mjs';
const context = await session();
const chapter = '11-extra-practice';
const env = 'https://make.powerautomate.com/environments/b3c2cece-31a3-e316-bdc9-540bfc327e87';
// Replay saved practice flows only; never flag an email or test A or D.
const shots = [
  ['PA - Flagged email to To Do', 'Add a to-do (V3)', '11-01-todo.png'],
  ['PA - Send me a note', 'Manually trigger a flow', '11-02-input.png'],
  ['PA - Save email to OneDrive', 'Create file', '11-03-save-email.png'],
  ['PA - Power Platform news', 'Send an email (V2)', '11-04-rss.png'],
];
const page = await open(context, `${env}/flows`);
for (const [name, action, file] of shots) {
  await page.goto(`${env}/flows`);
  await page.getByText(name, { exact: true }).first().waitFor({ timeout: 60000 });
  await page.getByText(name, { exact: true }).first().click();
  await page.getByText('Edit', { exact: true }).first().click();
  await page.getByRole('button', { name: new RegExp(`^${action.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} operation`) }).click();
  await page.waitForTimeout(750);
  await capture(page, chapter, file);
}
// B was tested once but delivery fails because the mobile app is retired.
// C was tested once with a fictional self-sent booking confirmation and succeeded.
// All saved practice flows are OFF. Replay does not send or write anything.
process.exit(0);
