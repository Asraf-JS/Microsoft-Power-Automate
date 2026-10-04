import { session, open, capture } from './capture-helpers.mjs';
const context = await session();
const chapter = '07-capstone';
const env = 'https://make.powerautomate.com/environments/b3c2cece-31a3-e316-bdc9-540bfc327e87';
const page = await open(context, `${env}/flows/e32fe6f2-6646-68fd-fe98-6ec2f00e0eb3/details`);
await page.getByText('Save As', { exact: true }).click();
await page.getByPlaceholder('Untitled', { exact: true }).fill('PA - Weekly training capstone');
await capture(page, chapter, '07-01-save-as.png');
await page.getByRole('button', { name: 'Cancel', exact: true }).last().click();
// Reuse the saved OFF capstone. Never test or run this chapter.
await page.goto(`${env}/solutions/~preferred/flows/b94b2df8-16c0-f111-aaad-6045bd59e4ff?v3=true`);
await page.getByRole('button', { name: 'Expand all action groups', exact: true }).click();
const action = async (name, file) => {
  await page.getByRole('button', { name, exact: true }).click();
  await page.waitForTimeout(750);
  await capture(page, chapter, file);
};
await action('Filter out completed training operation, Data Operations connector', '07-02-filter-array.png');
await action('Get future time operation, Date Time connector', '07-03-future-time.png');
await action('Initialize reminder count operation, Variable connector', '07-04-variable.png');
await action('Apply to each operation', '07-05-loop-input.png');
await action('Is the session in the next 14 days operation', '07-06-date-condition.png');
await action('Increment variable operation, Variables connector', '07-07-increment.png');
await action('If reminders were prepared operation', '07-08-summary-condition.png');
await action('Send coordinator summary operation, Office 365 Outlook connector', '07-09-summary-email.png');
await page.locator('#msla-panel-header-collapse-nav').click();
await page.getByRole('button', { name: 'Zoom view to fit', exact: true }).click();
await capture(page, chapter, '07-10-full-flow.png');
process.exit(0);
