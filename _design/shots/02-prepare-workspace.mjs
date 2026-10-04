import { session, open, capture } from './capture-helpers.mjs';
const chapter = '02-prepare-workspace';
const context = await session();
const drive = await open(context, 'https://jsasraf-my.sharepoint.com/my?id=%2Fpersonal%2Fasraf%5Fjsasraf%5Fonmicrosoft%5Fcom%2FDocuments%2FPower%20Automate%20Training&viewid=4106d504%2Dccf6%2D4500%2Db3b6%2D25fe4165caac');
await drive.getByText('Attachments', { exact: true }).waitFor();
await capture(drive, chapter, '02-01-folders.png');
const workbook = await open(context, 'https://jsasraf-my.sharepoint.com/:x:/r/personal/asraf_jsasraf_onmicrosoft_com/_layouts/15/Doc.aspx?sourcedoc=%7B9EFE85BD-BB0A-4DBD-A426-94B6FE1829CF%7D&file=TrainingRegister.xlsx&action=default&mobileredirect=true');
const frame = workbook.frameLocator('iframe').first();
await frame.getByRole('tab', { name: 'Home', exact: true }).click();
await capture(workbook, chapter, '02-02-workbook-rows.png');
await frame.getByRole('tab', { name: 'Table Design', exact: true }).click();
await capture(workbook, chapter, '02-03-table-name.png');
const outlook = await open(context, 'https://outlook.office.com/mail/drafts');
await outlook.getByText('[PA TRAINING] Attachment test', { exact: true }).first().click();
await outlook.locator('[aria-label="Subject"]').waitFor();
await outlook.locator('[aria-label="Subject"]').scrollIntoViewIfNeeded();
await capture(outlook, chapter, '02-04-draft-email.png');
// Reuse the existing draft; never send it in Chapter 02.
process.exit(0);
