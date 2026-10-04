# Screenshot capture notes

- 01-understand-power-automate, section 1.5, Find the three cloud-flow choices step 2: README describes five Start from blank tiles; the UI shows six, including Describe it to design it between Scheduled cloud flow and Desktop flow.

- 02-prepare-workspace, section 2.2 step 4: README specifies six fictional records; the existing training workbook has those six plus a seventh record for the signed-in user. Reused the workbook and preserved its contents.

- 03-save-email-attachments, section 3.2 step 7: saving a trigger-only flow now reports "Your flow should contain at least one trigger and one action." Completed the remaining actions before saving; final Flow checker has zero errors and warnings.
- 03-save-email-attachments, section 3.7 step 2: the run's detailed Parameters view renders the attachment-name token as an unknown token; switched Parameters view off to show expressionResult false and the skipped Create file action.

- 04-excel-summary, sections 4.4 and 4.8: reused the existing summary flow and aligned its headings, subject and row-count expression; the preserved workbook contains seven records, so the received report correctly states seven sessions. Retained its existing date formatting as dd/MM/yyyy.
- 04-excel-summary, section 4.7: the expression editor uses Monaco; keyboard input is required to update its model before Add. The expression screenshot rerun opens the saved token with an Update button.

- 05-weekly-reminders, section 5.2: the format selector is labelled Time unit instead of Format string; selected Full date/time pattern (short time) [f].
- 05-weekly-reminders, section 5.3: the Excel file picker requires selecting the folder's right-hand arrow (Navigate to Power Automate Training folder); clicking the folder name does not navigate.
- 05-weekly-reminders, section 5.5: To initially uses a people picker; its Settings menu > Use dynamic content exposes the Email-token editor. The screenshot script replays the saved final email with its formatted date expression. No tests were run; the flow is off.
