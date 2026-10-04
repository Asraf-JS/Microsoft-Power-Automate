import { session, open, capture } from './capture-helpers.mjs';
const chapter = '03-save-email-attachments';
const env = 'https://make.powerautomate.com/environments/b3c2cece-31a3-e316-bdc9-540bfc327e87';
const flowId = '4c8d6b35-862f-3cdc-cbc5-44d0a863c337';
const runId = '08584104768337001334421208369CU29';
const context = await session();
const page = await open(context, `${env}/create`);
await page.getByText('Automated cloud flow', { exact: true }).click();
await page.getByRole('textbox', { name: 'Flow name', exact: true }).fill('PA - Save training PDF attachments');
await page.getByRole('searchbox', { name: "Choose your flow's trigger", exact: true }).fill('new email');
await page.waitForTimeout(2000);
await page.getByText('When a new email arrives (V3)', { exact: true }).click();
await page.getByRole('textbox', { name: 'Flow name', exact: true }).scrollIntoViewIfNeeded();
await capture(page, chapter, '03-01-create-flow.png');
await page.getByText('Cancel', { exact: true }).click();
// The lesson flow already exists. Reuse it instead of creating another copy.
await page.goto(`${env}/flows/${flowId}?v3=true`);
await page.getByRole('button', { name: 'Expand all action groups', exact: true }).waitFor();
if (await page.getByRole('button', { name: 'Close', exact: true }).isVisible()) {
  await page.getByRole('button', { name: 'Close', exact: true }).click();
}
await page.getByRole('button', { name: 'Expand all action groups', exact: true }).click();
const action = async name => {
  await page.getByRole('button', { name, exact: true }).click();
  await page.waitForTimeout(400);
};
await action('When a new email arrives (V3) operation, Office 365 Outlook connector');
await capture(page, chapter, '03-02-trigger.png');
await action('Apply to each operation');
await capture(page, chapter, '03-03-apply-to-each.png');
await action('Condition operation');
await capture(page, chapter, '03-04-condition.png');
await action('Create file operation, OneDrive for Business connector');
await capture(page, chapter, '03-05-create-file.png');
await action('Apply to each operation');
const input = page.locator('[contenteditable=true][title="Select an output from previous steps"]');
await input.fill('');
await input.press('/');
await page.getByText('Insert dynamic content', { exact: true }).click();
await capture(page, chapter, '03-00-dynamic-content.png');
await page.getByText('Attachments', { exact: true }).click();
await page.getByRole('button', { name: 'Collapse', exact: true }).last().click();
await page.getByRole('button', { name: 'Flow checker', exact: true }).click();
await capture(page, chapter, '03-06-flow-checker.png');
// The permitted manual test was sent once to the signed-in training account.
// Reuse its successful run; do not resend email on a screenshot rerun.
const run = await open(context, `${env}/flows/${flowId}/runs/${runId}`);
await run.reload();
await run.getByRole('button', { name: 'Expand all action groups', exact: true }).waitFor();
if (await run.getByRole('button', { name: 'Expand all action groups', exact: true }).isVisible()) {
  await run.getByRole('button', { name: 'Expand all action groups', exact: true }).click();
}
await run.getByRole('button', { name: 'Create file operation, OneDrive for Business connector', exact: true }).click();
await capture(run, chapter, '03-07-run-success.png');
await run.getByRole('button', { name: 'Next', exact: true }).click();
await run.getByRole('button', { name: 'Condition operation', exact: true }).click();
const detailed = run.getByRole('switch', { name: 'Toggle to show or hide detailed parameters for this action.', exact: true });
if (await detailed.isChecked()) await detailed.click();
await capture(run, chapter, '03-08-run-skipped.png');
process.exit(0);
