import { session, open, capture } from './capture-helpers.mjs';
const context = await session();
const chapter = '05-weekly-reminders';
const env = 'https://make.powerautomate.com/environments/b3c2cece-31a3-e316-bdc9-540bfc327e87';
const page = await open(context, `${env}/create`);
await page.getByText('Scheduled cloud flow', { exact: true }).click();
await page.getByRole('textbox', { name: 'Flow name', exact: true }).fill('PA - Weekly training reminders');
await page.getByRole('combobox', { name: 'Run this flow: Select the starting time for your flow', exact: true }).click();
await page.getByText('09:00 AM', { exact: true }).click();
await page.getByRole('combobox', { name: 'Repeat every: Select the frequency for how often your flow should occur', exact: true }).click();
await page.getByRole('option', { name: 'Week', exact: true }).click();
for (const day of ['Sunday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']) {
  await page.getByRole('switch', { name: day, exact: true }).click();
}
await capture(page, chapter, '05-01-create-flow.png');
await page.getByText('Cancel', { exact: true }).click();
// Reuse the saved lesson flow. It is OFF. Never Test or Run this chapter.
await page.goto(`${env}/flows/e32fe6f2-6646-68fd-fe98-6ec2f00e0eb3?v3=true`);
await page.getByRole('button', { name: 'Expand all action groups', exact: true }).click();
const action = async name => {
  await page.getByRole('button', { name, exact: true }).click();
  await page.waitForTimeout(500);
};
await action('Recurrence operation, Schedule connector');
await capture(page, chapter, '05-02-recurrence.png');
await action('Convert time zone operation, Date Time connector');
await capture(page, chapter, '05-03-convert-time.png');
await action('List rows present in a table operation, Excel Online (Business) connector');
await capture(page, chapter, '05-04-list-rows.png');
await action('Apply to each operation');
await capture(page, chapter, '05-05-apply-to-each.png');
await action('Send an email (V2) operation, Office 365 Outlook connector');
await capture(page, chapter, '05-06-email.png');
await page.locator('[data-automation-id="flow-token flow-input-token-formatDateTime(...)"]').click();
await page.locator('textarea').first().waitFor();
await capture(page, chapter, '05-07-format-date.png');
await page.getByRole('button', { name: 'Close', exact: true }).click();
await page.getByRole('button', { name: 'Collapse', exact: true }).last().click();
await capture(page, chapter, '05-08-full-flow.png');
process.exit(0);
