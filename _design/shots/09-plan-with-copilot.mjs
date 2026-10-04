import { session, open, capture } from './capture-helpers.mjs';
const context = await session();
const chapter = '09-plan-with-copilot';
const env = 'https://make.powerautomate.com/environments/b3c2cece-31a3-e316-bdc9-540bfc327e87';
const page = await open(context, `${env}/home`);
await page.getByText('Create with Copilot', { exact: true }).waitFor();
await capture(page, chapter, '09-01-create-with-copilot.png');
await page.getByText('Create with Copilot', { exact: true }).click();
const prompts = [
  "Every Friday at 4:00 PM Singapore time, read rows from the tblTraining table in TrainingRegister.xlsx in OneDrive for Business. Keep rows whose Status is Registered and SessionDate is within the next 14 days. Email the training coordinator a summary count. Do not send participant emails.",
  "Use Filter array to keep rows where Status is Registered and SessionDate is between today and 14 days from today. Calculate the count with length(body('FilteredRows')). Send one summary email only to coordinator@example.com. Do not add an Apply to each or any participant email.",
  "Remove Get file metadata using path because List rows present in a table can select the workbook directly. Keep only Recurrence, List rows present in a table, Filter array named FilteredRows, Compose named Count using length(body('FilteredRows')), and one Send an email action to coordinator@example.com.",
];
await page.locator('textarea').fill(prompts[0]);
await capture(page, chapter, '09-02-first-prompt.png');
await page.getByRole('button', { name: 'Submit', exact: true }).click();
await page.getByText('Version 1 of 1', { exact: true }).waitFor({ timeout: 60000 });
await capture(page, chapter, '09-03-first-suggestion.png');
for (let i = 1; i < 3; i++) {
  await page.getByLabel('Add more details to improve the flow', { exact: true }).fill(prompts[i]);
  await page.getByRole('button', { name: 'Send', exact: true }).click();
  await page.getByText(`Version ${i + 1} of ${i + 1}`, { exact: true }).waitFor({ timeout: 60000 });
  await capture(page, chapter, i === 1 ? '09-04-second-suggestion.png' : '09-05-final-suggestion.png');
}
// Planning only. Do not keep the plan or create a flow.
await page.getByRole('button', { name: 'Cancel', exact: true }).click();
process.exit(0);
