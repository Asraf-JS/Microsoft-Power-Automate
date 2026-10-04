import { session, open, capture } from './capture-helpers.mjs';
const context = await session();
const chapter = '10-environments-and-solutions';
const env = 'https://make.powerautomate.com/environments/b3c2cece-31a3-e316-bdc9-540bfc327e87';
const page = await open(context, `${env}/solutions`);
const frame = page.frameLocator('iframe[name="widgetIFrame"]');
// This script creates only the named temporary demonstration container.
// The capstone and connection references are existing objects and remain OFF.
await frame.getByText('New solution', { exact: true }).click();
await frame.getByRole('textbox').nth(0).fill('Power Automate Training Migration');
await frame.getByRole('textbox').nth(1).fill('PowerAutomateTrainingMigration');
await frame.getByRole('combobox').fill('Asraf');
await frame.getByRole('combobox').press('ArrowDown');
await frame.getByRole('combobox').press('Enter');
await capture(page, chapter, '10-01-new-solution.png');
await frame.getByRole('button', { name: 'Create', exact: true }).click();
await frame.getByText('Add existing', { exact: true }).click();
await frame.getByRole('menuitem', { name: /Automation/ }).hover();
await frame.getByRole('menuitem', { name: /Cloud flow/ }).click();
// This environment already stores the capstone in Dataverse.
await frame.getByRole('tab', { name: /From Dataverse/ }).click();
await frame.getByRole('row').filter({ hasText: 'PA - Weekly training capstone' }).click();
await capture(page, chapter, '10-02-add-existing.png');
await frame.getByRole('button', { name: 'Add', exact: true }).click();
const row = frame.getByRole('row').filter({ hasText: 'PA - Weekly training capstone' });
await row.getByRole('button', { name: 'More commands', exact: true }).click();
await frame.getByRole('menuitem', { name: /Advanced/ }).last().hover();
await frame.getByRole('menuitem', { name: /Add required objects/ }).click();
await frame.getByRole('button', { name: 'OK', exact: true }).click();
await frame.getByText('new_sharedoffice365_0fca9', { exact: true }).first().waitFor();
await capture(page, chapter, '10-03-components.png');
await frame.getByRole('menuitem', { name: 'Overview', exact: true }).click();
await frame.getByText('Export', { exact: true }).click();
// The saved cloud flow needs no global Publish all changes for this review.
await frame.getByRole('button', { name: 'Next', exact: true }).click();
await frame.getByText('Unmanaged', { exact: true }).last().click();
await capture(page, chapter, '10-04-export.png');
await frame.getByRole('button', { name: 'Cancel', exact: true }).last().click();
// Never select the final Export button or import any package.
await frame.getByText('Delete', { exact: true }).click();
await frame.getByRole('button', { name: 'Delete', exact: true }).last().click();
await frame.getByText('Power Automate Training Migration', { exact: true }).waitFor({ state: 'hidden', timeout: 30000 });
process.exit(0);
