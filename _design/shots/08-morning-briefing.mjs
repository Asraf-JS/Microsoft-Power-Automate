import { session, open, capture } from './capture-helpers.mjs';
const context = await session();
const chapter = '08-morning-briefing';
const env = 'https://make.powerautomate.com/environments/b3c2cece-31a3-e316-bdc9-540bfc327e87';
const page = await open(context, `${env}/flows/ea03b97d-17b9-a720-8d1b-351b2076a069?v3=true`);
await page.getByRole('button', { name: 'Expand all action groups', exact: true }).click();
const action = async (name, file) => {
  await page.getByRole('button', { name, exact: true }).click();
  await page.waitForTimeout(750);
  await capture(page, chapter, file);
};
await action('Recurrence operation, Schedule connector', '08-01-recurrence.png');
await page.locator('#msla-panel-header-collapse-nav').click();
await page.getByRole('button', { name: 'Zoom view to fit', exact: true }).click();
await capture(page, chapter, '08-02-variables.png');
await action('Get current weather operation, MSN Weather connector', '08-03-weather.png');
await page.getByRole('button', { name: 'Insert a new action between Initialize variable 3 and Get current weather or right click for more options.', exact: true }).click({ button: 'right' });
await capture(page, chapter, '08-04-add-parallel.png');
await page.keyboard.press('Escape');
await page.locator('#msla-panel-header-collapse-nav').click();
await page.getByRole('button', { name: 'Zoom view to fit', exact: true }).click();
await capture(page, chapter, '08-05-meetings-branch.png');
await capture(page, chapter, '08-06-three-branches.png');
await capture(page, chapter, '08-07-join.png');
await action('Busy day operation', '08-08-set-variable.png');
await action('Send an email (V2) operation, Office 365 Outlook connector', '08-09-email.png');
// One successful manual test has already sent the briefing to the signed-in account.
// Leave the scheduled flow OFF. This replay does not send another message.
// Always mask private meeting/email details in both message body and list preview.
{
  const mail = context.pages().find(p => p.url().startsWith('https://outlook.cloud.microsoft/mail/') && !p.url().includes('compose'));
  const search = mail.getByLabel('Search for email, meetings, files and more.', { exact: true });
  await search.fill('subject:"Your day ahead"');
  await search.press('Enter');
  await mail.getByText('Your day ahead', { exact: true }).first().click();
  await mail.getByText('Good morning,', { exact: true }).waitFor();
  const body = mail.getByRole('document').filter({ hasText: /^Good morning/ });
  await capture(mail, chapter, '08-10-email-received.png', {
    mask: [
      body.locator('p').filter({ hasText: /^Meetings in the next 12 hours/ }),
      body.locator('p').filter({ hasText: /^Important unread email:\s*\S/ }),
      mail.getByText(/^Good morning, Weather in Kuala Lumpur:/),
    ],
    maskColor: '#d9d9d9',
  });
}
process.exit(0);
